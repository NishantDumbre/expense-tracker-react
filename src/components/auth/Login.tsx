import React from "react";
import { motion } from "framer-motion";

import { LoginProps } from "../../utils/interfaces/AuthInterface";
import { AUTH_DIV_ANIMATION } from "../../utils/animations";

const Login: React.FC<LoginProps> = ({
  emailRef,
  passwordRef,
  toggleAuthType,
  handleSubmit,
}) => {
  return (
    <motion.div
      className="bg-formBg w-full md:w-2/5 p-8 shadow-lg rounded-lg border border-formBorder border-solid"
      {...AUTH_DIV_ANIMATION}
    >
      <h1 className="text-center text-2xl font-semibold pb-5">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="">
          <input
            type="email"
            id="email"
            ref={emailRef}
            className="rounded-md w-full p-2 bg-lightGray"
            placeholder="Enter email"
          />
        </div>
        <div className="my-5">
          <input
            type="password"
            id="password"
            ref={passwordRef}
            minLength={3}
            className="rounded-md w-full p-2 bg-lightGray"
            placeholder="Enter password"
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <button
            onClick={() => toggleAuthType("Signup")}
            className="mb-2 hover:text-hoverLink active:text-activeLink"
          >
            Create Account
          </button>
          <button
            onClick={() => toggleAuthType("ForgotPwd")}
            className="mb-5 hover:text-hoverLink active:text-activeLink"
          >
            Forgot password?
          </button>
        </div>
        <div className="flex justify-evenly">
          <button
            type="submit"
            className="py-2 px-3 bg-primaryButton shadow-lg rounded-md text-lg block hover:bg-primaryButton-hover active:bg-primaryButton-active active:shadow-none"
          >
            Login
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default Login;
