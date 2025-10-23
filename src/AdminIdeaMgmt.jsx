import React from "react";
import auth from "./Auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Components/Header";
import AdminStats from "./AdminStats";
const AdminIdeaMgmt = () => {
  const [user, Setuser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchdata = async () => {
      const data = await auth();
      Setuser(data.user);
      if (!data.ok || data.user.role === "User") navigate("/");
    };
    fetchdata();
  }, []);
  return (
    <div>
      <Header userRole={user.role} />
      <AdminStats />
    </div>
  );
};

export default AdminIdeaMgmt;
