import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  return (
    <div className="absolute h-lvh w-2/6 bg-violet-300">
        <button >Close</button>
      <ul>
        <li>
          <Link to="/home/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/home/profile">Profile</Link>
        </li>
        <li>
          <button type="button" onClick={logoutHandler}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
