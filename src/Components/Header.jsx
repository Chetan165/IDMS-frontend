import React, { useState } from "react";
import Logout from "../Logout";
import { useNavigate } from "react-router-dom";

const AdminMenuItems = [
  { title: "Dashboard", path: "/" },
  { title: "Idea Mgmt", path: "/admin/ideaform" },
  { title: "Qualification", path: "/qualification" },
  { title: "Project Mgmt", path: "/project-mgmt" },
  { title: "Control Room", path: "/control-room" },
];

const UserMenuItems = [
  { title: "Dashboard", path: "/" },
  { title: "Idea Mgmt", path: "/ideaform" },
];

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-blue-700"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

// Simplified SVG for the User icon (used inline for single-file safety)
const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-white hover:text-blue-200 cursor-pointer transition-colors"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const Header = ({ userRole }) => {
  const [highlight, sethighlight] = useState("Dashboard");
  const navigate = useNavigate();
  const updatehighlight = (item) => {
    navigate(`${item.path}`);
    sethighlight(item.title);
  };

  const MenuItems = userRole === "Admin" ? AdminMenuItems : UserMenuItems;
  return (
    <header className="bg-blue-700 text-white p-3 shadow-lg flex items-center justify-between sticky top-0 z-10 w-full font-inter">
      {/* Logo Area */}
      <div className="flex items-center space-x-6">
        <h1 className="text-xl font-bold cursor-default">IDMS</h1>

        {/* Dynamic Navigation Menu (Hidden on small screens) */}
        <nav className="hidden md:flex items-center space-x-1 flex-grow">
          {MenuItems.map((item, index) => (
            <a
              key={index}
              onClick={() => {
                updatehighlight(item);
              }}
              className={`
                px-3 py-2 rounded-lg text-sm font-medium transition-colors 
                hover:bg-blue-600 
                ${
                  item.title === `${highlight}`
                    ? "bg-blue-600"
                    : "bg-transparent"
                }
              `}
            >
              {item.title}
            </a>
          ))}
        </nav>
      </div>

      {/* User/Search Area (Responsive) */}
      <div className="flex items-center space-x-4">
        {/* Search Input Container */}
        <div className="relative flex items-center bg-white rounded-lg p-1 shadow-inner max-w-[200px] md:max-w-xs">
          <input
            type="search"
            placeholder="Search.."
            className="w-full text-gray-800 placeholder-gray-500 text-sm focus:outline-none focus:ring-0 rounded-l-lg"
          />
          <button className="p-1 rounded-r-lg">
            <SearchIcon />
          </button>
        </div>

        {/* Info Icon */}
        <span className="text-xl p-1 rounded-full hover:bg-blue-600 transition-colors cursor-pointer">
          i
        </span>

        {/* User Icon */}
        <UserIcon />
        <Logout />
      </div>
    </header>
  );
};

export default Header;
