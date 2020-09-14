var arr = [
  {
    question_name: "What is your Favorite tv Show?",
    choice: "Shameless",
    score: 0,
  },
  {
    question_name: "What is your Favorite tv Show?",
    choice: "Better Call Saul",
    score: 0,
  },
  {
    question_name: "What is your Favorite tv Show?",
    choice: "Leftovers",
    score: 0,
  },
  {
    question_name: "Who is your favorite actor?",
    choice: "Joaquin Phoenix",
    score: 0,
  },
  {
    question_name: "Who is your favorite actor?",
    choice: "Daniel Day Lewis",
    score: 0,
  },
  {
    question_name: "Who is your favorite actor?",
    choice: "Philip Seymour Hoffman",
    score: 0,
  },
  {
    question_name: "What is your Favorite tv Show?",
    choice: "Breaking Bad",
    score: 1,
  },
  {
    question_name: "Who is your favorite actor?",
    choice: "Gary Oldman",
    score: 1,
  },
];

var questions = [...new Set(arr.map((elem) => elem.question_name))];
var finalArr = Array.from(
  { length: questions.length },
  (v, i) => Object.create({ question: questions[i], labels: [], data: [] }))
);
for (let i = 0; i < finalArr.length; i++) {
  arr.forEach((elem, index) => {
    if (elem["question_name"] == finalArr[i].question) {
      finalArr[i].labels.push(elem.choice);
      finalArr[i].data.push(elem.score);
    }
  });
}
