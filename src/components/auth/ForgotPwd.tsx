import React from "react";
import { ForgotPwdProps } from "../../utils/interfaces/AuthInterface";

const ForgotPwd: React.FC<ForgotPwdProps> = ({
  emailRef,
  toggleAuthType,
  handleSubmit,
}) => {
  return (
    <>
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
            className="mb-2 hover:text-accent"
          >
            Remembered password?
          </button>
          <button
            onClick={() => toggleAuthType("Signup")}
            className="mb-5 hover:text-accent"
          >
            Create new account
          </button>
        </div>
        <div className="flex justify-evenly">
          <button
            type="submit"
            className="py-2 px-3 bg-green-200 shadow-lg rounded-md text-lg block hover:bg-green-300 active:bg-accent active:shadow-none"
          >
            Send reset email
          </button>
        </div>
      </form>
    </>
  );
};

export default ForgotPwd;
