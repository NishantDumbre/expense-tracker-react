import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BACKGROUND_IMG } from "../utils/constants";
import { LOGIN_URL, SIGNUP_URL } from "../utils/constants";
import {
  AuthInterface,
  ForgotPwdInterface,
} from "../utils/interfaces/AuthInterface";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import ForgotPwd from "../components/auth/ForgotPwd";
import { useDispatch } from "react-redux";
import { addUser, updateUser } from "../utils/redux/userSlice";

const AuthPage = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [authType, setAuthType] = useState<String>("Login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notify = (note: string) => toast(note);

  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const obj: AuthInterface = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      returnSecureToken: true,
    };

    try {
      const response = await axios.post(LOGIN_URL, obj);
      const { token } = response.data;
      localStorage.setItem("token", token);
      dispatch(addUser({ token, email: obj.email }));
      // navigate("/dashboard", { replace: true });
    } catch (error: any) {
      console.log(error);
      notify(error.response.data.message);
    }
  };

  const signupUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwordRef.current?.value !== confirmPasswordRef.current?.value) {
      notify("Passwords did not match");
      return;
    }

    const obj: AuthInterface = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      returnSecureToken: true,
    };

    try {
      const response = await axios.post(SIGNUP_URL, obj);
      console.log(response);
      notify(response.data.message);
      toggleAuthType("Login");
    } catch (error: any) {
      console.log(error);
      notify(error.response.data.message);
    }
  };

  const forgotPwdUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const obj: ForgotPwdInterface = {
      email: emailRef.current?.value,
    };

    try {
      const request = await axios.post(LOGIN_URL, obj);
      console.log(request);
      toggleAuthType("Login");
    } catch (error) {
      console.log(error);
    }
  };

  const toggleAuthType = (type: string) => {
    if (emailRef.current) {
      emailRef.current.value = "";
    }
    if (passwordRef.current) {
      passwordRef.current.value = "";
    }
    if (confirmPasswordRef.current) {
      confirmPasswordRef.current.value = "";
    }
    setAuthType(type);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (authType === "Login") {
      loginUser(e);
    } else if (authType === "Signup") {
      signupUser(e);
    } else if (authType === "ForgotPwd") {
      forgotPwdUser(e);
    }
  };

  return (
    <div
      className="h-screen bg-cover bg-fixed flex justify-center items-center text-primaryText"
      style={{ backgroundImage: BACKGROUND_IMG }}
    >
      <div className=" w-screen h-screen top-0 left-0 absolute -z-10">
        <img
          src={BACKGROUND_IMG}
          alt="Background Image"
          className="fixed  object-cover"
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-primaryButton h-24">Primary Button</div>
        <div className="bg-secondaryButton h-24">Secondary Button</div>
        <div className="bg-primaryText h-24">Primary Text</div>
        <div className="bg-secondaryText h-24">Secondary Text</div>
        <div className="bg-formBg h-24">Form Background</div>
        <div className="bg-formBorder h-24">Form Border</div>
        <div className="bg-hoverLink h-24">Hover Link</div>
        <div className="bg-activeLink h-24">Active Link</div>
        <div className="bg-lightGold h-24">Light Gold</div>
        <div className="bg-darkGold h-24">Dark Gold</div>
        <div className="bg-lightMaroon h-24">Light Maroon</div>
        <div className="bg-darkMaroon h-24">Dark Maroon</div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {/* <motion.div className="bg-primary w-full md:w-2/5 p-8 shadow-lg rounded-lg" initial={{x:-100, opacity:0}} animate={{x:0, opacity:1}} transition={{delay:0.5}} > */}
      {authType === "Login" && (
        <Login
          emailRef={emailRef}
          passwordRef={passwordRef}
          toggleAuthType={toggleAuthType}
          handleSubmit={handleSubmit}
        />
      )}
      {authType === "Signup" && (
        <Signup
          emailRef={emailRef}
          passwordRef={passwordRef}
          confirmPasswordRef={confirmPasswordRef}
          toggleAuthType={toggleAuthType}
          handleSubmit={handleSubmit}
        />
      )}
      {authType === "ForgotPwd" && (
        <ForgotPwd
          emailRef={emailRef}
          toggleAuthType={toggleAuthType}
          handleSubmit={handleSubmit}
        />
      )}
      {/* </motion.div> */}
    </div>
  );
};

export default AuthPage;
