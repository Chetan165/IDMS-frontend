import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const IdeaButton = () => {
  const navigate = useNavigate();

  //   const submitIdea = async () => {
  //     try {
  //       const result = await fetch("http://localhost:3000/api/ideas", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ Title, Description, SoftSavings, HardSavings }),
  //       });
  //       const result2 = result.json();
  //       if (result2.ok) {
  //         toast.success("Idea submitted successfully!");
  //       }
  //     } catch (err) {
  //       toast.error(err.msg);
  //     }
  //   };
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
