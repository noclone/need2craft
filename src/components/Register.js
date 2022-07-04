import { useState } from "react";
import classes from "./Register.module.css";

import { HOST, PORT } from "../utils/env";

import { useNavigate } from "react-router-dom";

function Register(props) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [invalidUsername, setInvalidUsername] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidConfirmPassword, setInvalidConfirmPassword] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);

  const register = (event) => {
    event.preventDefault();
    checkUsername(username)
    checkEmail(email)
    checkPassword(password)
    checkConfirmPassword(confirmPassword)
    if (invalidUsername || invalidEmail || invalidPassword || invalidConfirmPassword)
      return;
    fetch(`http://${HOST}:${PORT}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        const array = JSON.parse(data);
        props.onLogIn(array[0]);
        navigate("/newCraft");
      });
  };

  const checkUsername = (value) => {
    if (value.length < 4) {
      setInvalidUsername(true);
      return;
    }
    fetch(`http://${HOST}:${PORT}/users/${value}`)
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        const array = JSON.parse(data);
        if (array.length !== 0)
        {
          setInvalidUsername(true);
        }
        else {
          setInvalidUsername(false);
        }
      });
  };
  const checkEmail = (value) => {
    const emailExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailExp.test(value)) {
      setInvalidEmail(true);
      return;
    }
    fetch(`http://${HOST}:${PORT}/users/${value}`)
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        const array = JSON.parse(data);
        if (array.length !== 0) 
        {
          setInvalidEmail(true);
        }
        else {
          setInvalidEmail(false);
        }
      });
  };
  const checkPassword = (value) => {
    if (value.length < 6) 
    {
      setInvalidPassword(true);
    }
    else {
      setInvalidPassword(false);
    }
  };
  const checkConfirmPassword = (value) => {
    if (value !== password) 
    {
      setInvalidConfirmPassword(true);
    }
    else {
      setInvalidConfirmPassword(false);
    }
  };

  return (
    <div className={classes.all}>
      <div className={classes.title}>Welcome to need2craft</div>
      <div className={classes.box}>
        <div className={classes.box_title}>Register</div>
        <div className={classes.form}>
          <form onSubmit={register}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            {invalidUsername && (
              <div className={classes.invalid}>Invalid/Taken Username</div>
            )}
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {invalidEmail && (
              <div className={classes.invalid}>Invalid/Taken Email</div>
            )}
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {invalidPassword && (
              <div className={classes.invalid}>Invalid Password</div>
            )}
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {invalidConfirmPassword && (
              <div className={classes.invalid}>Not equal</div>
            )}
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
