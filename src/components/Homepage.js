import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import surveyServices from "../services/surveyServices";

function Homepage() {
  const [activeSurveys, setActiveSurveys] = useState([]);
  const [offSurveys, setOffSurveys] = useState([]);
  const [recentSurveys, setRecentSurveys] = useState([]);
  const [popularSurveys, setPopularSurveys] = useState([]);
  useEffect(() => {
    surveyServices.getAll().then((response) => {
      const { surveys, popular } = response;
      const newestArr = surveys
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 2);
      const dateNow = new Date();
      const onSurveys = surveys.filter(
        (elem) => new Date(elem.deadline) > dateNow
      );
      const off = surveys.filter((elem) => dateNow > new Date(elem.deadline));
      setActiveSurveys(onSurveys);
      setOffSurveys(off);
      setRecentSurveys([...recentSurveys, ...newestArr]);
      setPopularSurveys([...popularSurveys, ...popular]);
    });
    // eslint-disable-next-line
  }, []);
  return (
    <div className="container">
      <img
        src="/img/happy.jpg"
        alt="Sad Muppet Moss from Sesame Streets"
        className="homepage-img"
      />
      <p>This is big data place and you are here.</p> <br />
      <p>
        Sign up or Log In to create survey. Yup, you are thrilled. I am
        thrilled. This is amazing. Posibility are endless.{" "}
      </p>{" "}
      <br />
      <p>
        Check <Link to="#recent">recent surveys</Link> or{" "}
        <Link to="#popular">popular surveys</Link>
      </p>
      <section className="homepage-survey-block" id="on">
        <p>Active surveys:</p>
        {activeSurveys.map((elem) => (
          <div key={elem.id}>
            <Link to={`/client/survey/single/${elem.id}`}>
              {elem.survey_name}
            </Link>
          </div>
        ))}
      </section>
      <section className="homepage-survey-block" id="off">
        <p>Past surveys:</p>
        {offSurveys.map((elem) => (
          <div>
            <Link key={elem.id} to={`/client/survey/single/${elem.id}`}>
              {elem.survey_name}
            </Link>
          </div>
        ))}
      </section>
      <section className="homepage-survey-block" id="recent">
        <p>Most recent surveys:</p>
        {recentSurveys.map((elem) => (
          <div key={elem.id}>
            <Link to={`/client/survey/single/${elem.id}`}>
              {elem.survey_name}
            </Link>
          </div>
        ))}
      </section>
      <section className="homepage-survey-block" id="popular">
        <p>Most popular surveys:</p>
        {popularSurveys.map((elem) => (
          <div key={elem.id}>
            <Link to={`/client/survey/single/${elem.id}`}>
              {elem.survey_name}
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Homepage;
