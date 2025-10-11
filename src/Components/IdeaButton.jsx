import React from "react";
import { useNavigate } from "react-router-dom";

const IdeaButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/ideaform")}
      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-blue-700 transition rounded-md"
    >
      New Idea
    </button>
  );
};

export default IdeaButton;
