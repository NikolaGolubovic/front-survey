const myString = [
  {
    type: "radiogroup",
    title: "Favorite TV SHOW",
    isRequired: true,
    colCount: 2,
    choices: ["Breaking BAd", "Shameless"],
  },
  {
    type: "radiogroup",
    title: "Favorite Actor",
    isRequired: true,
    colCount: 2,
    choices: ["Brad Pit", "Gary Oldman"],
  },
];

export var json = {
  questions: [...myString],
};
