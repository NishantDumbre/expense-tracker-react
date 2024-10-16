import React, { useRef, useState } from "react";
import axios from "axios";
import { LOGIN_URL, SIGNUP_URL } from "../constants";
import { Auth } from "../Interfaces/LoginInterface";

const AuthPage = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [isLogin, setIsLogin] = useState<Boolean>(true);
  const [isForgotPwd, setForgotPwd] = useState<Boolean>(false);

  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const obj: Auth = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      returnSecureToken: true,
    };

    try {
      const request = await axios.post(LOGIN_URL, obj);
      console.log(request);
    } catch (error) {
      console.log(error);
    }
  };

  const signupUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwordRef.current?.value !== confirmPasswordRef.current?.value) {
      return alert("passwords do not match");
    }

    const obj: Auth = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      returnSecureToken: true,
    };

    try {
      const request = await axios.post(SIGNUP_URL, obj);
      console.log(request);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleLoginSignup = () => {
    if (emailRef.current && passwordRef.current && confirmPasswordRef.current) {
      emailRef.current.value = "";
      passwordRef.current.value = "";
      confirmPasswordRef.current.value = "";
    }
    setIsLogin((prev) => !prev);
  };

  return (
    <div className="flex w-screen h-screen bg-slate-500 items-center justify-center">
      <div>
        <form onSubmit={isLogin ? loginUser : signupUser}>
          <div className="">
            <label htmlFor="email">Enter Email</label>
            <input type="email" id="email" ref={emailRef} required />
          </div>
          {!isForgotPwd && (
            <div className="">
              <label htmlFor="password">Enter Password</label>
              <input
                type="password"
                id="password"
                ref={passwordRef}
                minLength={3}
                required
              />
            </div>
          )}
          {!isLogin && !isForgotPwd && (
            <div className="">
              <label htmlFor="password">Confirm Password</label>
              <input
                type="password"
                id="password"
                ref={confirmPasswordRef}
                minLength={3}
                required
              />
            </div>
          )}
          {isLogin && !isForgotPwd && <button type="submit">Login</button>}
          {!isLogin && !isForgotPwd && <button type="submit">Signup</button>}
        </form>
        {isLogin && !isForgotPwd && (
          <button onClick={toggleLoginSignup}>Forgot password?</button>
        )}
        {isLogin && !isForgotPwd && (
          <button onClick={toggleLoginSignup}>Create account </button>
        )}
        {!isLogin && !isForgotPwd && (
          <button onClick={toggleLoginSignup}>Already have an account? </button>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
