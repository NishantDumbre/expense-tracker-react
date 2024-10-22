import React, { useState } from "react";

const Profile = () => {
  const [isChangePwd, setIsChangePwd] = useState<Boolean>(false);

  const changePasswordHander = () =>{
    setIsChangePwd(false)
  }

  return (
    <div className="flex w-full h-screen justify-center items-center bg-slate-300">
      <div className="h-full max-h-96 w-full max-w-96 bg-neutral-300 p-10 rounded-md shadow-lg">
        <div className="mb-5">
          <label className="block mb-3">Your email</label>
          <input
            className="block w-full max-w-96 p-2 rounded-md"
            type="email"
            value={"Nishant"}
            disabled
          />
        </div>
        {isChangePwd && <div className="mb-5">
          <label className="block mb-3">Set new password</label>
          <input
            className="block mb-2 w-full max-w-96 p-2 rounded-md"
            type="password"
            placeholder="Enter new password"
          ></input>
          <input
            className="block w-full max-w-96 p-2 rounded-md"
            type="password"
            placeholder="Confirm new password"
          ></input>
        </div>}
        <div className="flex justify-between">
          <button
            type="button"
            className="bg-red-400 p-2 rounded-md shadow-md active:shadow-none active:bg-violet-400"
          >
            Verify email
          </button>
          {!isChangePwd && <button
            type="button"
            className="bg-red-400 p-2 rounded-md shadow-md active:shadow-none active:bg-violet-400"
            onClick={() => setIsChangePwd(true)}
          >
            Reset password
          </button>}
          {isChangePwd && (
            <button
              type="button"
              className="bg-red-400 p-2 rounded-md shadow-md active:shadow-none active:bg-violet-400"
              onClick={changePasswordHander}
            >
              Change password
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
