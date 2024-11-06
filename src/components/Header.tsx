import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { StoreState } from "../utils/redux/appStore";
import axios from "axios";
import { GET_RECORD_DATA_URL, GET_USER_DATA_URL } from "../utils/constants";
import { fetchUserData } from "../utils/redux/userSlice";
import { fetchRecordsDetails } from "../utils/redux/recordsSlice";
import { useSelector } from "react-redux";
import useGetUserData from "../hooks/useGetUserData";

const Header = () => {
  const navigate = useNavigate();
  const verified = useSelector((store: StoreState) => store.user.verified);
  const location = useLocation().pathname;
  const [isShowNav, setIsShowNav] = useState(false);

  const toggleNavbar = () => {
    setIsShowNav((prev) => !prev);
  };

  const locationName = (location: string) => {
    let updatedLocation =
      location.replace("/", "").charAt(0).toUpperCase() + location.slice(2);
    return updatedLocation;
  };

  // const getUserData = async () => {
  //   const userDataPromise = axios.get(GET_USER_DATA_URL, {
  //     headers: { Authorization: token },
  //   });

  //   const recordsDataPromise = axios.get(GET_RECORD_DATA_URL, {
  //     headers: { Authorization: token },
  //   });

  //   const [userData, recordsData] = await Promise.all([
  //     userDataPromise, recordsDataPromise
  //   ])

  //   dispatch(fetchUserData(userData.data));
  //   dispatch(fetchRecordsDetails(recordsData.data))
  // };

  const getUserData = useGetUserData();

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  return (
    <React.Fragment>
      {isShowNav && (
        <>
          <Navbar toggleNavbar={toggleNavbar} />
          <div
            className="bg-slate-500 h-screen w-screen opacity-40 fixed z-20"
            onClick={toggleNavbar}
          ></div>
        </>
      )}
      <div className="absolute w-full h-16 shadow-md flex justify-between items-center text-primaryText bg-formBg z-10">
        <button
          className="bg-slate-400 p-2 rounded shadow-md m-7"
          onClick={toggleNavbar}
        >
          Menu
        </button>
        <h1 className="text-2xl relative mx-auto">{locationName(location)}</h1>
        <div className="flex justify-center items-center">
          {!verified && (
            <div
              className="p-2 bg-primaryButton shadow-lg rounded-md text-md block hover:bg-primaryButton-hover active:bg-primaryButton-active active:shadow-none"
              onClick={() => navigate("profile")}
            >
              <p>Verify your email</p>
            </div>
          )}
          <h1 className="mx-10 text-lg">Hi Nishant!</h1>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Header;
