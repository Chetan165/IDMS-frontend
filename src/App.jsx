import "./App.css";
import Header from "./Components/Header";
import Dashboard from "./Dashboard";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage";
import IdeaPage from "./IdeaPage";
import AdminIdeaMgmt from "./AdminIdeaMgmt";

function App() {
  return (
    <div>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/ideaform" element={<IdeaPage />}></Route>
        <Route path="/admin/ideaform" element={<AdminIdeaMgmt />}></Route>
      </Routes>
    </div>
  );
}

export default App;
