import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import IdeaButton from "./Components/IdeaButton";

// Mock function to simulate generating a user ID.

/**
 * Mock data structure for the ideas retrieved from the backend.
 * In a real application, this would be fetched via GET /api/ideas?userId={id}
 */

const UserIdeasPage = ({}) => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulate fetching only the user's ideas from the API
    const fetchUserIdeas = async () => {
      setLoading(true);
      try {
        // Simulate network delay
        const result = await fetch("http://localhost:3000/api/getideas", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // --- MOCK API RESPONSE ---
        const result2 = await result.json();
        console.log(result2);
        if (result2.ok) {
          setIdeas(result2.ideas);
          setUser(result2.user);
        }
        // -------------------------
      } catch (error) {
        console.error("Error fetching user ideas:", error);
        toast.error(error.msg);
      } finally {
        setLoading(false);
      }
    };

    fetchUserIdeas();
  }, []);

  // Calculate aggregated metrics
  const totalIdeas = ideas.length;
  const totalHardSavings = ideas.reduce(
    (sum, idea) => sum + idea.HardSavings,
    0
  );
  const ideasInDraft = ideas.filter((idea) => idea.Status === "Draft").length;

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">Loading your ideas...</div>
    );
  }

  return ideas.length > 0 ? (
    <div className="p-6 min-h-screen bg-gray-50 font-inter">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
        My Idea Submissions (User ID: {user.id.substring(0, 10)}...)
      </h2>

      {/* --- Key Statistics Tiles --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatTile label="Total Ideas Submitted" value={totalIdeas} />
        <StatTile
          label="Total Estimated Hard Savings"
          value={`$${totalHardSavings.toLocaleString()}`}
        />
        <StatTile label="Ideas Currently in Draft" value={ideasInDraft} />
      </div>

      {/* --- Ideas Table --- */}
      <h3 className="text-xl font-semibold text-gray-700 mb-4">
        All Submissions
      </h3>
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <TableHeader>ID</TableHeader>
              <TableHeader>Title</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Hard Savings ($)</TableHeader>
              <TableHeader>Soft Savings (RWH)</TableHeader>
              <TableHeader>Submitted Date</TableHeader>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {ideas.map((idea) => (
              <tr
                key={idea.id}
                className="hover:bg-blue-50 transition duration-100"
              >
                <TableData>{idea.id}</TableData>
                <TableData className="font-medium text-blue-700">
                  {idea.Title}
                </TableData>
                <TableData>
                  <StatusBadge status={idea.Status} />
                </TableData>
                <TableData>${idea.HardSavings.toLocaleString()}</TableData>
                <TableData>{idea.SoftSavings} hrs</TableData>
                <TableData>{idea.CreatedAt}</TableData>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {ideas.length === 0 && (
        <p className="text-center text-gray-500 p-8">
          You haven't submitted any ideas yet. Click '+ New Idea' to get
          started!
        </p>
      )}
    </div>
  ) : (
    <div>
      <p className="text-center text-gray-500 p-8">
        You haven't submitted any ideas yet. Click '+ New Idea' to get started!
      </p>
      <span className="flex flex-row justify-center items-center ">
        <IdeaButton />
      </span>
    </div>
  );
};

// Helper Components
const TableHeader = ({ children }) => (
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    {children}
  </th>
);

const TableData = ({ children, className = "" }) => (
  <td
    className={`px-6 py-4 whitespace-nowrap text-sm text-gray-800 ${className}`}
  >
    {children}
  </td>
);

const StatTile = ({ label, value }) => (
  <div className="bg-white p-5 rounded-xl shadow-md border-t-4 border-blue-500">
    <p className="text-sm font-medium text-gray-500 truncate">{label}</p>
    <p className="mt-1 text-3xl font-bold text-gray-900">{value}</p>
  </div>
);

const StatusBadge = ({ status }) => {
  const baseClasses =
    "px-2 inline-flex text-xs leading-5 font-semibold rounded-full";
  let colorClass = "";

  switch (status) {
    case "Deployed":
      colorClass = "bg-green-100 text-green-800";
      break;
    case "Development":
      colorClass = "bg-indigo-100 text-indigo-800";
      break;
    case "Qualification":
      colorClass = "bg-blue-100 text-blue-800";
      break;
    case "In Approval":
      colorClass = "bg-yellow-100 text-yellow-800";
      break;
    case "Draft":
    default:
      colorClass = "bg-gray-100 text-gray-800";
  }

  return <span className={`${baseClasses} ${colorClass}`}>{status}</span>;
};

export default UserIdeasPage;
