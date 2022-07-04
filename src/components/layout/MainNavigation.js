import { useState } from "react";
import { Link } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import ProfileMenu from "../ProfileMenu"

import BackDrop from "../BackDrop"

function MainNavigation(props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link className={classes.logo} to="/">need2Craft</Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/newCraft">New Craft</Link>
          </li>
          {props.loggedIn == null && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
          {props.loggedIn != null && (
            <div className={classes.wrapper}>
              <button
                className={classes.user}
                onClick={() => setIsOpen(true)}
              >
                {props.loggedIn.username}
              </button>
              {isOpen && <BackDrop onClick={() => setIsOpen(false)}/>}
              {isOpen && <ProfileMenu disconnect={props.disconnect} close={() => setIsOpen(false)}/>}
            </div>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
