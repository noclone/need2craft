import NewCraftPage from "./components/pages/NewCraftPage";
import LoginPage from "./components/pages/LoginPage";
import MainNavigation from "./components/layout/MainNavigation";

import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import RegisterPage from "./components/pages/RegisterPage";
import { useState } from "react";
import ResourcesPage from "./components/pages/ResourcesPage";

function App() {

  const navigate = useNavigate()

  const [ user, setUser ] = useState(null)

  return (
    <div>
      <MainNavigation loggedIn={user} disconnect = {() => {setUser(null); navigate("/login")}}/>
      <Routes>
        <Route path="/" element={<ResourcesPage loggedIn={user} />}></Route>
        <Route path="/login" element={<LoginPage onLogIn={(user) => setUser(user)}/>}></Route>
        <Route path="/register" element={<RegisterPage onLogIn={(user) => setUser(user)}/>}></Route>
        <Route path="/newCraft" element={<NewCraftPage loggedIn={user}/>}></Route>
        <Route path="/404" element={<div className="not_found">404: Not found</div>} />
        <Route path="*" element={<Navigate replace to="/404"/>} />
      </Routes>
    </div>
  );
}

export default App;
