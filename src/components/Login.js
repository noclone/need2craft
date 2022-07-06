import { useState } from "react";
import classes from "./Login.module.css";

import { HOST, PORT } from "../utils/env"

import { useNavigate } from "react-router-dom";

function Login(props) {

  const navigate = useNavigate()

  const [ identifier, setIdentifier ] = useState("");
  const [ password, setPassword ] = useState("");

  const [ invalid, setInvalid ] = useState(false)

  const login = (event) => {
    event.preventDefault()
    fetch(`http://${HOST}:${PORT}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              identifier: identifier,
              password: password,
            })
        })
        .then(response => {
            return response.text();
        })
        .then(data => {
          const array = JSON.parse(data)
          if (array.length === 0)
            setInvalid(true)
          else
          {
            props.onLogIn(array[0])
            navigate('/')
          }
        });
  }

  return (
    <div className={classes.all}>
      <div className={classes.title}>Welcome to need2craft</div>
      <div className={classes.box}>
        <div className={classes.box_title}>Login</div>
        <div className={classes.form}>
          <form onSubmit={login}>
            <input type="text" name="identifier" placeholder="Username/Email" onChange={(e) => setIdentifier(e.target.value)} />
            <input type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            {invalid && <div className={classes.invalid}>Invalid Credentials</div>}
            <button type="submit">Log in</button>
          </form>
        </div>
        <div className={classes.register} onClick={() => navigate('/register')}>No account ? Register here !</div>
      </div>
    </div>
  );
}

export default Login;
