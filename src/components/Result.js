import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import surveyServices from "../services/surveyServices";

function Result({ id, title }) {
  const [chartData, setChartData] = useState([]);
  const [chartQuestions, setChartQuestions] = useState([]);

  function getRandomColor(leng) {
    const arr = [];
    while (arr.length <= leng) {
      var color = "#" + (((1 << 24) * Math.random()) | 0).toString(16);
      arr.push(color);
    }
    return arr;
  }

  //  question name, choices, choices_votes, title
  const chart = () => {
    surveyServices.getResults(id).then((arr) => {
      var questions = [...new Set(arr.map((elem) => elem.question_name))];
      setChartQuestions([...chartQuestions, ...questions]);
      var finalArr = Array.from({ length: questions.length }, (v, i) => {
        return { question: questions[i], labels: [], data: [] };
      });

      for (let i = 0; i < finalArr.length; i++) {
        arr.forEach((elem) => {
          if (elem["question_name"] === finalArr[i].question) {
            finalArr[i].labels.push(elem.choice);
            finalArr[i].data.push(elem.score);
          }
        });
      }
      setChartData(
        chartData.concat(
          finalArr.map((elem) => {
            return {
              labels: elem.labels,
              datasets: [
                {
                  label: "level of something",
                  data: elem.data,
                  backgroundColor: getRandomColor(elem.data.length),
                  borderWidth: 4,
                },
              ],
            };
          })
        )
      );
    });
  };

  useEffect(() => {
    chart();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="charts">
      <p className="chart-title">
        <small>{title}</small>
      </p>
      {chartData.map((chart, index) => {
        return (
          <div key={index} className="chart">
            <h2 className="chart-question">{chartQuestions[index]}</h2>
            <Pie
              data={chart}
              options={{
                responsive: true,
                responsiveAnimationDuration: 1000,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

export default Result;
