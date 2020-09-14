import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import userService from "../services/userServices";
import { newInfo, newError } from "../reducers/notificationReducer";

function Login({ user }) {
  const dispatch = useDispatch();

  const history = useHistory();
  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, [user, history]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signIn, setSignIn] = useState(false);

  async function loginUser(e) {
    e.preventDefault();
    const errors = [];
    try {
      if (!username) {
        errors.push("Username is missing");
      }
      if (!password) {
        errors.push("Password is missing");
      }
      if (errors.length !== 0) {
        throw errors;
      }
      const response = await userService.login({ username, password });
      const token = JSON.stringify(response);
      window.localStorage.setItem("loggedUser", token);
      dispatch(newInfo(`Hello ${username}`));
      setTimeout(() => {
        history.push("/");
        window.location.reload();
      }, 1500);
      setSignIn(true);
    } catch (err) {
      if (Array.isArray(err)) {
        err.forEach((singleError) => {
          dispatch(newError(singleError));
        });
      } else if (err.response && err.response.data) {
        dispatch(newError(err.response.data.message));
      } else {
        dispatch(newError(err.message));
      }
    }
  }
  return (
    <div className="credentials-container">
      {!signIn && (
        <form onSubmit={loginUser}>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />{" "}
          <br />
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />{" "}
          <br />
          <button>Login</button>
        </form>
      )}
    </div>
  );
}

export default Login;
