import React from "react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AdminStats = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserIdeas = async () => {
      setLoading(true);
      try {
        const result = await fetch("http://localhost:3000/api/getideasAll", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const result2 = await result.json();
        console.log(result2);
        if (result2.ok) {
          setIdeas(result2.ideas);
          setUser(result2.user);
          console.log(ideas);
        }
      } catch (error) {
        console.error("Error fetching user ideas:", error);
        toast.error(error.msg);
      } finally {
        setLoading(false);
      }
    };

    fetchUserIdeas();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">Loading your ideas...</div>
    );
  }

  return ideas?.length > 0 ? (
    <div className="p-6 min-h-screen bg-gray-50 font-inter">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
        All Idea Submissions
      </h2>

      {/* --- Ideas Table --- */}
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
              <TableHeader>Attachment</TableHeader>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {ideas.map((idea) => (
              <tr
                key={idea.id}
                className="hover:bg-blue-50 transition duration-100"
              >
                <TableData>{idea._id}</TableData>
                <TableData className="font-medium text-blue-700">
                  {idea.Title}
                </TableData>
                <TableData>
                  <StatusBadge status={idea.Status} />
                </TableData>
                <TableData>${idea.HardSavings.toLocaleString()}</TableData>
                <TableData>{idea.SoftSavings} hrs</TableData>
                <TableData>{idea.CreatedAt}</TableData>
                <TableData>
                  {idea.URL != "" ? (
                    <a
                      className="font-semibold bg-blue-400 rounded-md p-2"
                      href={idea.URL}
                    >
                      View Attachment
                    </a>
                  ) : (
                    <span className="font-thin text-gray-500">
                      No Attachments
                    </span>
                  )}
                </TableData>
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
      <p className="text-center text-gray-500 p-8">No Submissions Found</p>
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
    case "in-Approval":
      colorClass = "bg-yellow-100 text-yellow-800";
      break;
    case "Draft":
    default:
      colorClass = "bg-gray-100 text-gray-800";
  }

  return <span className={`${baseClasses} ${colorClass}`}>{status}</span>;
};

export default AdminStats;
