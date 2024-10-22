import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { LOGIN_URL, SIGNUP_URL } from "../constants";
import {
  AuthInterface,
  ForgotPwdInterface,
} from "../Interfaces/LoginInterface";

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
      navigate("/home/dashboard", { replace: true });
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
    <div className="flex w-screen h-screen bg-slate-100 items-center justify-center">
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
      <div className="bg-slate-50 w-full max-w-lg p-8 shadow-lg">
        {authType === "Login" && (
          <h1 className="text-center text-2xl font-semibold">Login</h1>
        )}
        {authType === "Signup" && (
          <h1 className="text-center text-2xl font-semibold">Signup</h1>
        )}
        {authType === "ForgotPwd" && (
          <h1 className="text-center text-2xl font-semibold">
            Forgot Password
          </h1>
        )}
        <form onSubmit={handleSubmit}>
          <div className="bg-slate-300 my-5">
            <input
              type="email"
              id="email"
              ref={emailRef}
              className="border-2 border-slate-950 border-solid rounded-md w-full p-2"
              placeholder="Enter email"
              required
            />
          </div>
          {(authType === "Login" || authType === "Signup") && (
            <div className="bg-blue-200 my-5">
              <input
                type="password"
                id="password"
                ref={passwordRef}
                minLength={3}
                className="border-2 border-slate-950 border-solid rounded-md w-full p-2"
                placeholder="Enter password"
                required
              />
            </div>
          )}
          {authType === "Signup" && (
            <div className="bg-slate-700 my-5">
              <input
                type="password"
                id="confirm-password"
                ref={confirmPasswordRef}
                minLength={3}
                className="border-2 border-slate-950 border-solid rounded-md w-full p-2"
                placeholder="Confirm password"
                required
              />
            </div>
          )}
          {authType === "Signup" && (
            <button
              onClick={() => toggleAuthType("Login")}
              className="mb-5 hover:text-cyan-500"
            >
              Already have an account?
            </button>
          )}
          {authType === "Login" && (
            <button
              onClick={() => toggleAuthType("ForgotPwd")}
              className="mb-5 hover:text-cyan-500"
            >
              Forgot password?
            </button>
          )}
          {authType === "Login" && (
            <button
              onClick={() => toggleAuthType("Signup")}
              className="mb-5 hover:text-cyan-500 ml-5"
            >
              Create account{" "}
            </button>
          )}
          {authType === "ForgotPwd" && (
            <button
              onClick={() => toggleAuthType("Login")}
              className="mb-5 hover:text-cyan-500"
            >
              Remembered Password?{" "}
            </button>
          )}
          <div className="flex justify-evenly">
            {authType === "Signup" && (
              <button
                type="submit"
                className="p-2 bg-green-200 rounded-md text-lg block hover:bg-green-600 shadow-lg active:bg-violet-300"
              >
                Signup
              </button>
            )}
            {authType === "Login" && (
              <button
                type="submit"
                className="p-2 bg-green-200 rounded-md text-lg block hover:bg-green-600 shadow-lg active:bg-violet-300"
              >
                Login
              </button>
            )}
            {authType === "ForgotPwd" && (
              <button
                type="submit"
                className="p-2 bg-green-200 rounded-md text-lg block hover:bg-green-600 shadow-lg active:bg-violet-300"
              >
                Send Email
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
