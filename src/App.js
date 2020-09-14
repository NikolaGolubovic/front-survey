import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "survey-react/survey.css";
import Homepage from "./components/Homepage";
import Header from "./components/Header";
import Notification from "./components/Notification";
import CreateSurvey from "./components/CreateSurvey";
import SingleSurvey from "./components/SingleSurvey";
import Register from "./components/Register";
import Login from "./components/Login";
import NotFound from "./components/NotFound";

import * as Survey from "survey-react";

import surveyServices from "./services/surveyServices";

(function () {
  return Survey.StylesManager.applyTheme("modern");
})();

function App() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const logged = JSON.parse(window.localStorage.getItem("loggedUser"));
    if (logged && logged.username) {
      surveyServices.setToken(logged.token);
      setUser(logged.username);
    }
  }, []);
  return (
    <Router>
      <Header user={user} />
      <Notification />
      <Switch>
        <Route exact path="/api/survey/create" component={CreateSurvey} />
        <Route exact path="/api/survey/single/:id" component={SingleSurvey} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route exact path="/" component={Homepage} />
        <Route patch="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
