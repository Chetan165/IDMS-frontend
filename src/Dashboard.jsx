import React from "react";
import { useEffect, useState } from "react";
import Header from "./Components/Header";
import { useNavigate } from "react-router-dom";
import auth from "./Auth";
import { StatusCard, TrendChart, Chart } from "./Components/Charts&Graphs";
import IdeaForm from "./IdeaForm";
import UserIdeasPage from "./UserStats";
import IdeaButton from "./Components/IdeaButton";

const Dashboard = () => {
  const [user, Setuser] = useState("");
  const navigate = useNavigate();
  useEffect(
    () => async () => {
      const result = await auth();
      console.log(result);
      Setuser(result.user);
      if (!result.ok) navigate("/login");
    },
    []
  );
  return user.role === "Admin" ? (
    <div>
      <Header />
      <Chart />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        <StatusCard label={"ajhb"} count={12}></StatusCard>
        <StatusCard label={"ajhb"} count={12}></StatusCard>
        <StatusCard label={"ajhb"} count={12}></StatusCard>
        <StatusCard label={"ajhb"} count={12}></StatusCard>
        <StatusCard label={"ajhb"} count={12}></StatusCard>
        <StatusCard label={"ajhb"} count={12}></StatusCard>
      </div>
    </div>
  ) : (
    <div>
      <Header />
      <UserIdeasPage />
    </div>
  );
};

export default Dashboard;
