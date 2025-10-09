import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./Components/Header";
import Dashboard from "./Dashboard";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage";
import IdeaPage from "./IdeaPage";

function App() {
  return (
    <div>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/ideaform" element={<IdeaPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
