import NewCraftPage from "./components/pages/NewCraftPage";
import LoginPage from "./components/pages/LoginPage";
import MainNavigation from "./components/layout/MainNavigation";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <MainNavigation />
      <Routes>
        <Route exact path="/login" element={<LoginPage />}></Route>
        <Route exact path="/newCraft" element={<NewCraftPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
