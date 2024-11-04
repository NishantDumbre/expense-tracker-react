import React, { useEffect, useState } from "react";
import { BACKGROUND_IMG } from "../utils/constants";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyDetails } from "../utils/redux/userSlice";
import { StoreState } from "../utils/redux/appStore";

const VerifiedDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [premium] = useState(
    useSelector((store: StoreState) => store.user.premium)
  );
  const [verified] = useState(
    useSelector((store: StoreState) => store.user.verified)
  );
  const queryParams = new URLSearchParams(location.search);
  const isVerified = queryParams.get("verified") === "true";
  const isPremium = queryParams.get("premium") === "true";

  useEffect(() => {
    dispatch(verifyDetails({ verified: isVerified, premium: isPremium }));
    console.log(verified, premium)
    setTimeout(()=>{
      navigate("/dashboard");
    }, 2000)
  }, []);

  return (
    <div
      className="h-screen bg-cover bg-fixed flex justify-center items-center text-primaryText"
      style={{ backgroundImage: BACKGROUND_IMG }}
    >
      {verified !== isVerified && (
        <h1 className="text-3xl">
          Email verified! Redirecting you to dashboard
        </h1>
      )}
      {premium !== isPremium && (
        <h1 className="text-3xl">
          You're a premium user! Redirecting
        </h1>
      )}
    </div>
  );
};

export default VerifiedDetails;
