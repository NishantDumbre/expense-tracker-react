import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Header = () => {
  const navigate = useNavigate();
  const [isShowNav, setIsShowNav] = useState(false);

  const toggleNavbar = () =>{
    setIsShowNav(prev => !prev)
  }

  return (
    <React.Fragment>
      {isShowNav && <Navbar onToggleNavbar={toggleNavbar} />}
      <div className="w-full h-16 shadow-md flex justify-between items-center">
        <button className="bg-slate-400 p-2 rounded shadow-md m-7" onClick={toggleNavbar}>Menu</button>
        <div className="flex justify-center items-center">
          <div
            className="p-2 rounded-md mr-7 bg-red-300"
            onClick={() => navigate("profile")}
          >
            <p>Verify your email</p>
          </div>
          <p className="mr-10">Hi Nishant!</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Header;
