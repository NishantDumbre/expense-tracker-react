import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/redux/userSlice";
import { NavbarProps } from "../utils/interfaces/DashboardInterface";
import { StoreState } from "../utils/redux/appStore";

const Navbar: React.FC<NavbarProps> = ({ toggleNavbar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isPremium = useSelector((store:StoreState)=>store.user.premium)

  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(removeUser());
    navigate("/", { replace: true });
  };

  

  return (
    <div className="fixed z-30 h-lvh w-2/6 bg-formBorder">
      <div className="flex justify-end py-5 px-10 ">
        <button
          className="py-2 px-3 bg-primaryButton shadow-lg rounded-md text-lg block hover:bg-primaryButton-hover active:bg-primaryButton-active active:shadow-none"
          onClick={toggleNavbar}
        >
          Close
        </button>
      </div>
      <ul className="flex flex-col justify-between items-center">
        <div className=" w-9/12">
          <Link to="/dashboard">
            <li className="text-2xl py-3 px-5 mb-3 bg-formBg shadow-lg hover:bg-slate-100 active:bg-slate-300 active:shadow-none cursor-pointer" onClick={toggleNavbar}>
              Dashboard
            </li>
          </Link>
          {isPremium && <Link to="/premium">
            <li className="text-2xl py-3 px-5 mb-3 bg-formBg shadow-lg hover:bg-slate-100 active:bg-slate-300 active:shadow-none cursor-pointer" onClick={toggleNavbar}>
              Premium
            </li>
          </Link>}
          <Link to="/profile">
            <li className="text-2xl py-3 px-5 mb-3 bg-formBg shadow-lg hover:bg-slate-100 active:bg-slate-300 active:shadow-none cursor-pointer" onClick={toggleNavbar}>
              Profile
            </li>
          </Link>
        </div>
        <div className=" w-9/12">
          <li className="text-2xl py-3 px-5 mb-3 bg-formBg shadow-lg hover:bg-slate-100 active:bg-slate-300 active:shadow-none cursor-pointer">
            <button type="button" onClick={logoutHandler}>
              Logout
            </button>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
