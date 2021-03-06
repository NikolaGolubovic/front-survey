import React, { useState, useEffect } from "react";

import * as Survey from "survey-react";
import Result from "./Result.js";
import surveyServices from "../services/surveyServices";
import { useParams } from "react-router-dom";

function SingleSurvey(props) {
  const [complete, setComplete] = useState(false);
  const [voted, setVoted] = useState(false);
  const [json, setJson] = useState({});
  const [title, setTitle] = useState("");
  const [resultsDisplay, setResultsDisplay] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    surveyServices.getSingle(id).then((res) => {
      const stringQuestions = JSON.parse(res.surveyString);
      setJson({ questions: stringQuestions });
      setTitle(res.surveyTitle);
    });
  }, [id]);

  useEffect(() => {
    const checkItem = window.localStorage.getItem(`chartVoted-${id}`);
    if (checkItem) {
      setVoted(true);
    }
    // eslint-disable-next-line
  }, []);

  function onComplete(result) {
    surveyServices.updateVotes({
      data: result.data,
      id,
    });
    window.localStorage.setItem(`chartVoted-${id}`, true);
    setComplete(true);
    setTimeout(() => {
      window.location.reload();
    }, 1100);
  }
  return (
    <main className="survey-page">
      {complete && <p className="survey-finished"></p>}
      {!voted ? (
        <>
          <Survey.Survey
            json={json}
            showCompletePage={false}
            onComplete={(result) => onComplete(result)}
          />
          <div className="show-results">
            <button
              className="btn-results"
              onClick={() => setResultsDisplay(!resultsDisplay)}
            >
              {resultsDisplay ? "Hide Charts" : "Show Charts"}
            </button>
            {resultsDisplay && (
              <div>
                <Result id={id} title={title} />
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="just-results">
          <Result id={id} title={title} />
        </div>
      )}
    </main>
  );
}

export default SingleSurvey;
