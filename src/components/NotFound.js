import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

function NotFound() {
  return (
    <div className="mainbox">
      <h1 style={{ fontSize: "5em", color: "red" }}>404</h1>
      <h1>There is no page you are looking for!</h1>
      <p style={{ marginTop: 10 }}>
        Back to <a href="/">Home</a>{" "}
      </p>
    </div>
  );
}

export default NotFound;
