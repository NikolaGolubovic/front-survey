import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { newError, newInfo } from "../reducers/notificationReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import surveyServices from "../services/surveyServices";

const randomId = () => Math.floor(Math.random() * 100000);

function CreateSurvey() {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(questions);
  }, [questions]);

  const addQuestion = (e) => {
    e.preventDefault();
    try {
      if (questions.length >= 5) {
        throw new Error("You can add up to 5 question");
      }
      setQuestions(
        questions.concat({
          id: randomId(),
          title: "",
          choices: [],
        })
      );
    } catch (err) {
      dispatch(newError(err.message));
    }
  };

  const updateQuestion = (e, id) => {
    try {
      setQuestions(
        questions.map((question) =>
          question.id === id
            ? {
                ...question,
                title: e.target.value,
                choices: [...question["choices"]],
              }
            : question
        )
      );
    } catch (err) {
      dispatch(newError(err.message));
    }
  };

  const removeQuestion = (questionId) => {
    try {
      setQuestions(questions.filter((quest) => questionId !== quest.id));
    } catch (err) {
      dispatch(newError(err.message));
    }
  };

  const addChoice = (e, id) => {
    e.preventDefault();
    try {
      setQuestions(
        questions.map((question) => {
          if (question.id === id && question.choices.length >= 8) {
            throw new Error("You can add up to 8 choices");
          }
          return question.id === id
            ? {
                ...question,
                choices: question.choices.concat({
                  id: randomId(),
                  choice: "",
                }),
              }
            : question;
        })
      );
    } catch (err) {
      dispatch(newError(err.message));
    }
  };

  const updateChoice = (e, id, index) => {
    try {
      if (e.target.value.length > 30) {
        throw new Error("Max choice length is 30 characters");
      }
      setQuestions(
        questions.map((question) =>
          question.id === id
            ? {
                ...question,
                choices: question["choices"].map((choiceObj, choiceIndex) =>
                  choiceObj.id === index
                    ? { ...choiceObj, choice: e.target.value }
                    : choiceObj
                ),
              }
            : question
        )
      );
    } catch (err) {
      dispatch(newError(err.message));
    }
  };

  const removeChoice = (questIndex, choiceIndex) => {
    setQuestions(
      questions.map((question) =>
        question.id === questIndex
          ? {
              ...question,
              choices: question["choices"].filter(
                (elem) => elem.id !== choiceIndex
              ),
            }
          : question
      )
    );
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const errors = [];

      if (!title) {
        errors.push("Select survey's title missing");
      }
      if (title.length > 100) {
        errors.push("Title is too long");
      }
      let finalQuestions = questions.map((question) => {
        if (!question.title) {
          errors.push("Title is missing");
        }
        question.choices.forEach((choice) => {
          if (!choice.choice) {
            errors.push("Choice is empty");
          }
          if (choice.choice.length > 30) {
            errors.push("Choice must be 30 characters long");
          }
          if (errors.length > 0) {
            throw errors;
          }
        });
        return {
          type: "radiogroup",
          name: question.title,
          title: question.title,
          isRequired: true,
          colCount: 1,
          choices: question.choices
            .map((elem) => elem.choice && elem.choice)
            .filter(Boolean),
        };
      });
      finalQuestions = finalQuestions.filter(Boolean);

      if (finalQuestions.length === 0) {
        errors.push("Questions and choices are missing");
      }
      if (errors.length > 0) {
        throw errors;
      }

      const finalJSON = JSON.stringify(finalQuestions);

      await surveyServices.create({
        survey: finalJSON,
        title,
      });

      dispatch(newInfo("Your Survey is successfully created"));
      history.push("/");
    } catch (err) {
      if (Array.isArray(err)) {
        err.map((error) => dispatch(newError(error)));
      } else {
        dispatch(newError(err.response.data.message));
      }
    }
  };

  return (
    <main className="create-survey-container">
      <form onSubmit={submitForm} className="create-form">
        <label>
          <small className="survey-title">Survey Title</small>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        {questions.map((question, index) => {
          let inputName = `title${index}`;
          return (
            <div key={question.id} className="new-question">
              <label>
                <small>Question name</small>
                <input
                  type="text"
                  name={inputName}
                  onChange={(e) => updateQuestion(e, question.id)}
                  autoFocus
                />
              </label>
              <button
                onClick={() => removeQuestion(question.id)}
                className="close-elem-button"
                key={index}
              >
                <FontAwesomeIcon icon={faTimesCircle} />
              </button>
              {question.choices.map((choice, choiceIndex) => {
                const inputChoice = `choice${choiceIndex}`;
                return (
                  <div className="new-choices" key={choice.id}>
                    <label>
                      <small>Add Choice</small>
                      <input
                        type="text"
                        className="input-choice"
                        name={inputChoice}
                        placeholder="Choice Option"
                        onChange={(e) =>
                          updateChoice(e, question.id, choice.id)
                        }
                        autoFocus
                      />
                    </label>
                    <button
                      className="close-elem-button"
                      onClick={() => removeChoice(question.id, choice.id)}
                    >
                      <FontAwesomeIcon icon={faTimesCircle} />
                    </button>
                  </div>
                );
              })}
              <button
                className="btn-form"
                onClick={(e) => addChoice(e, question.id)}
              >
                Add Choice
              </button>
            </div>
          );
        })}
        <button onClick={addQuestion} className="btn-form">
          Add Question
        </button>
        <button className="btn-form submit">Submit</button>
      </form>
    </main>
  );
}

export default CreateSurvey;
