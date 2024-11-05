import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/redux/userSlice";
import { NavbarProps } from "../utils/interfaces/DashboardInterface";

const Navbar:React.FC<NavbarProps> = ({toggleNavbar}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(removeUser())  
    navigate("/", { replace: true });
  };

  return (
    <div className="absolute z-30 h-lvh w-2/6 bg-violet-300">
        <button onClick={toggleNavbar} >Close</button>
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
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
