import React from "react";
import { useEffect } from "react";
import Header from "./Components/Header";
import { useNavigate } from "react-router-dom";
import auth from "./Auth";

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(
    () => async () => {
      const result = await auth();
      console.log(result);
      if (!result.ok) navigate("/login");
    },
    []
  );
  return (
    <div>
      <Header />
    </div>
  );
};

export default Dashboard;
