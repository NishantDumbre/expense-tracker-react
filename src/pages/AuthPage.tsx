import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKGROUND_IMG } from "../utils/constants";

import { LOGIN_URL, SIGNUP_URL } from "../constants";
import {
  AuthInterface,
  ForgotPwdInterface,
} from "../utils/interfaces/AuthInterface";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import ForgotPwd from "../components/auth/ForgotPwd";

const AuthPage = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [authType, setAuthType] = useState<String>("Login");
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
      const request = await axios.post(LOGIN_URL, obj);
      console.log(request);
      localStorage.setItem("token", request.data.idToken);
      navigate("/dashboard", { replace: true });
    } catch (error: any) {
      console.log(error);
      notify(error.response.data.error.message);
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
      const request = await axios.post(SIGNUP_URL, obj);
      console.log(request);
      notify("Account Created!");
      toggleAuthType("Login");
    } catch (error: any) {
      console.log(error);
      notify(error.response.data.error.message);
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
      toggleAuthType("Login")
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
      className="h-screen bg-cover bg-fixed flex justify-center items-center text-secondary"
      style={{ backgroundImage: BACKGROUND_IMG }}
    >
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
      <div className="bg-primary w-full md:w-2/5 p-8 shadow-lg rounded-lg">
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
      </div>
    </div>
  );
};

export default AuthPage;
