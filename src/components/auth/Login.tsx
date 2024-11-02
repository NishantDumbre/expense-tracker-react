import React from 'react'
import { LoginProps } from '../../utils/interfaces/AuthInterface'

const Login: React.FC<LoginProps> = ({ emailRef, passwordRef, toggleAuthType, handleSubmit }) => {
  return (
    <>
            <h1 className="text-center text-2xl font-semibold pb-5">Login</h1>
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
              <div className="my-5">
                <input
                  type="password"
                  id="password"
                  ref={passwordRef}
                  minLength={3}
                  className="border border-secondary border-solid rounded-md w-full p-2"
                  placeholder="Enter password"
                />
              </div>
              <div className="flex flex-col md:flex-row justify-between items-center">
                <button
                  onClick={() => toggleAuthType("Signup")}
                  className="mb-2 hover:text-accent"
                >
                  Create Account
                </button>
                <button
                  onClick={() => toggleAuthType("ForgotPwd")}
                  className="mb-5 hover:text-accent"
                >
                  Forgot password?
                </button>
              </div>
              <div className="flex justify-evenly">
                <button
                  type="submit"
                  className="py-2 px-3 bg-green-200 shadow-lg rounded-md text-lg block hover:bg-green-300 active:bg-accent active:shadow-none"
                >
                  Login
                </button>
              </div>
            </form>
          </>
  )
}

export default Login