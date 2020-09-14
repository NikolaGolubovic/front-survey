import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import surveyServices from "../services/surveyServices";

function CreateSurvey() {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    { id: 1, title: "", choices: [""] },
  ]);

  useEffect(() => {
    console.log(questions);
  }, [questions]);

  const addQuestion = (e) => {
    e.preventDefault();
    setQuestions(
      questions.concat({
        id: questions.length + 1,
        title: "",
        choices: [""],
      })
    );
  };

  const removeQuestion = (questIndex) => {
    setQuestions(questions.filter((_quest, index) => questIndex !== index));
  };

  const addChoice = (e, id) => {
    e.preventDefault();
    setQuestions(
      questions.map((question) =>
        question.id === id
          ? { ...question, choices: question.choices.concat("") }
          : question
      )
    );
  };

  const updateQuestion = (e, id) => {
    setQuestions(
      questions.map((question) =>
        question.id === id
          ? { id, title: e.target.value, choices: [...question["choices"]] }
          : question
      )
    );
  };

  const updateChoice = (e, id, index) => {
    setQuestions(
      questions.map((question) =>
        question.id === id
          ? {
              ...question,
              choices: question["choices"].map((choice, choiceIndex) =>
                choiceIndex === index ? e.target.value : choice
              ),
            }
          : question
      )
    );
  };

  const removeChoice = (questIndex, choiceIndex) => {
    console.log(choiceIndex);
    setQuestions(
      questions.map((question) =>
        question.id === questIndex
          ? {
              ...question,
              choices: question["choices"].filter(
                (_elem, i) => i !== choiceIndex
              ),
            }
          : question
      )
    );
  };

  const submitForm = async (e) => {
    e.preventDefault();

    let finalQuestions = questions.map((question) => {
      return {
        type: "radiogroup",
        name: question.title,
        title: question.title,
        isRequired: true,
        colCount: 2,
        choices: question.choices.filter(Boolean),
      };
    });
    const finalJSON = JSON.stringify(finalQuestions);
    try {
      // await axios.post("http://localhost:3001/questions", finalQuestions);
      await surveyServices.create({
        survey: finalJSON,
      });
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <div className="create-survey-container">
      <form onSubmit={submitForm}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {questions.map((question, index) => {
          let inputName = `title${index}`;
          let btnRemoveKey = `removeChoice${index}`;
          return (
            <div key={inputName} className="new-question">
              <label htmlFor="">
                Ask Survey Question:
                <input
                  type="text"
                  name={inputName}
                  onChange={(e) => updateQuestion(e, question.id)}
                />
              </label>
              <button key={index} onClick={() => removeQuestion(index)}>
                X
              </button>
              {question.choices.map((choice, choiceIndex) => {
                const inputChoice = `choice${choiceIndex}`;
                return (
                  <div className="new-choices" key={inputChoice}>
                    <label htmlFor="">
                      Choice Input
                      <input
                        type="text"
                        name={inputChoice}
                        onChange={(e) => updateChoice(e, question.id, index)}
                        autoFocus
                      />
                    </label>
                    <button
                      key={btnRemoveKey}
                      onClick={() => removeChoice(index + 1, choiceIndex)}
                    >
                      X
                    </button>
                  </div>
                );
              })}
              <button onClick={(e) => addChoice(e, question.id)}>
                Add Choice
              </button>
            </div>
          );
        })}
        <button onClick={addQuestion}>Add Question</button>
        <button style={{ width: "200px", margin: "10px" }}>Submit</button>
        <Link to="/api/survey/single">Cancel</Link>
      </form>
    </div>
  );
}

export default CreateSurvey;
