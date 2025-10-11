import React from "react";
import Header from "./Components/Header";
import IdeaForm from "./IdeaForm";
import IdeaButton from "./Components/IdeaButton";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import auth from "./Auth";

const IdeaPage = () => {
  const [user, Setuser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchdata = async () => {
      const result = await auth();
      console.log(result);
      Setuser(result.user);
      if (!result.ok) navigate("/login");
    };
    fetchdata();
  }, []);
  return (
    <div>
      <Header userRole={user.role} />
      <IdeaForm />
    </div>
  );
};

export default IdeaPage;
