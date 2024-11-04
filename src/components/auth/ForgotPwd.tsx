import React from "react";
import {motion} from 'framer-motion'

import { ForgotPwdProps } from "../../utils/interfaces/AuthInterface";
import { AUTH_DIV_ANIMATION } from "../../utils/animations";

const ForgotPwd: React.FC<ForgotPwdProps> = ({
  emailRef,
  toggleAuthType,
  handleSubmit,
}) => {
  return (
    <motion.div  className="bg-formBg w-full md:w-2/5 p-8 shadow-lg rounded-lg border border-formBorder border-solid" {...AUTH_DIV_ANIMATION}>
      <h1 className="text-center text-2xl font-semibold pb-5">
        Forgot Password?
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="">
          <input
            type="email"
            id="email"
            ref={emailRef}
            className="border border-secondary border-solid rounded-md w-full p-2"
            placeholder="Enter email"
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mt-5">
          <button
            onClick={() => toggleAuthType("Login")}
            className="mb-2 hover:text-hoverLink active:text-activeLink"
          >
            Remembered password?
          </button>
          <button
            onClick={() => toggleAuthType("Signup")}
            className="mb-5 hover:text-hoverLink active:text-activeLink"
          >
            Create new account
          </button>
        </div>
        <div className="flex justify-evenly">
          <button
            type="submit"
            className="py-2 px-3 bg-primaryButton shadow-lg rounded-md text-lg block hover:bg-primaryButton-hover active:bg-primaryButton-active active:shadow-none"
          >
            Send reset email
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default ForgotPwd;
