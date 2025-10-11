import React from "react";
import { useEffect, useState } from "react";
import Header from "./Components/Header";
import { useNavigate } from "react-router-dom";
import auth from "./Auth";
import { StatusCard, TrendChart, Chart } from "./Components/Charts&Graphs";
import IdeaForm from "./IdeaForm";
import UserIdeasPage from "./UserStats";
import IdeaButton from "./Components/IdeaButton";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [user, Setuser] = useState("");
  const [SavingsData, SetSavingsData] = useState({});
  const [StatusData, SetStatusData] = useState({});
  const navigate = useNavigate();
  const FetchAdminStats = async () => {
    try {
      const data = await fetch("http://localhost:3000/api/admin/stats", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data2 = await data.json();
      SetSavingsData(data2.data.SavingsData);
      SetStatusData(data2.data.StatusData);
    } catch (err) {
      toast.error(err.msg);
    }
  };
  useEffect(() => {
    const fetchdata = async () => {
      const result = await auth();
      console.log(result);
      Setuser(result.user);
      if (!result.ok) navigate("/login");
      if (result.user.role === "Admin") FetchAdminStats();
    };
    fetchdata();
  }, []);
  return user.role === "Admin" ? (
    <div>
      <Header userRole={user.role} />
      <Chart
        HardSavingPercent={SavingsData.TotalHardSavings}
        SoftSavingPercent={SavingsData.TotalSoftSavings}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {Object.keys(StatusData).map((i, index) => (
          <StatusCard key={index} label={i} count={StatusData[i]}></StatusCard>
        ))}
      </div>
    </div>
  ) : (
    <div>
      <Header userRole={user.role} />
      <UserIdeasPage />
    </div>
  );
};

export default Dashboard;
