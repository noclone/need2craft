import { Link } from "react-router-dom";

import classes from './MainNavigation.module.css'

function MainNavigation() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>need2craft</div>
      <nav>
        <ul>
          <li>
            <Link to="/newCraft">New Craft</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
