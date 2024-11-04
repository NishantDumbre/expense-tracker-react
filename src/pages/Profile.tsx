import React, { useRef, useState } from "react";
import {
  BACKGROUND_IMG,
  UPDATE_DETAILS_URL,
  VERIFY_EMAIL_URL,
} from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../utils/redux/appStore";
import { MdMode } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { updateUser } from "../utils/redux/userSlice";

const Profile = () => {
  const [isChangePwd, setIsChangePwd] = useState<Boolean>(false);
  const [isNameDisabled, setIsNameDisabled] = useState<boolean>(true);
  const dispatch = useDispatch();
  const { name, email, profileUrl } = useSelector(
    (store: StoreState) => store.user.details
  );
  const verified = useSelector((store: StoreState) => store.user.verified);
  const { token } = useSelector((store: StoreState) => store.user);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const profileURL = useRef<HTMLInputElement>(null);
  const notify = (note: string) => toast(note);

  const changePasswordHander = () => {
    setIsChangePwd(false);
  };

  const handleNameChange = () => {
    if (nameRef.current) {
      nameRef.current.focus();
      setIsNameDisabled(false);
    }
  };

  const updateUserDetails = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    console.log(nameRef.current?.value, "name");
    const obj = {
      name: nameRef.current?.value,
      profileURL: profileURL.current?.value,
    };
    try {
      const response = await axios.post(UPDATE_DETAILS_URL, obj, {
        headers: { Authorization: token },
      });
      notify(response.data.message);
      setIsNameDisabled(true);
      dispatch(updateUser({ name: obj.name, profileURL: obj.profileURL }));
    } catch (error: any) {
      console.log(error);
      notify(error.response.data.message);
    }
  };

  const verifyEmail = async () => {
    try {
      const response = await axios.get(VERIFY_EMAIL_URL, {
        headers: { Authorization: token },
      });
      notify(response.data.message);
    } catch (error: any) {
      console.log(error);
      notify(error.response.data.message);
    }
  };

  return (
    <div
      className="h-screen bg-cover bg-fixed flex justify-center items-center text-primaryText"
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
      <div className=" w-full md:w-2/5 p-8 bg-formBg border border-formBorder border-solid rounded-md shadow-lg">
        <div className="mb-5">
          <label className="block mb-3">Name</label>
          <div className="flex justify-center items-center">
            <input
              className={`rounded-md w-full p-2 ${
                isNameDisabled ? "bg-secondaryButton" : "bg-lightGray"
              }`}
              type="email"
              defaultValue={name}
              disabled={isNameDisabled}
              ref={nameRef}
            />
            {isNameDisabled && (
              <MdMode
                className="ml-5 text-2xl text-gray-500 hover:text-gray-700 cursor-pointer"
                onClick={handleNameChange}
              />
            )}
          </div>
        </div>
        <div className="mb-5">
          <p className="block mb-3">Email</p>
          <p className="rounded-md p-2 bg-secondaryButton">{email}</p>
        </div>

        {isChangePwd && (
          <div className="mb-5">
            <div className="mb-5">
              <label className="block mb-3">Password</label>
              <input
                className="rounded-md w-full p-2 bg-lightGray"
                type="password"
                ref={passwordRef}
              />
            </div>
            <div className="mb-5">
              <label className="block mb-3">Confirm Password</label>
              <input
                className="rounded-md w-full p-2 bg-lightGray"
                type="password"
                ref={confirmPasswordRef}
              />
            </div>
          </div>
        )}
        <div className="flex justify-between">
         {!verified && <button
            type="button"
            className="py-2 px-3 bg-primaryButton shadow-lg rounded-md text-lg block hover:bg-primaryButton-hover active:bg-primaryButton-active active:shadow-none"
            onClick={verifyEmail}
          >
            Verify email
          </button>}
          {!isChangePwd && (
            <button
              type="button"
              className="py-2 px-3 bg-primaryButton shadow-lg rounded-md text-lg block hover:bg-primaryButton-hover active:bg-primaryButton-active active:shadow-none"
              onClick={() => setIsChangePwd(true)}
            >
              Reset password
            </button>
          )}
          {isChangePwd && (
            <button
              type="button"
              className="py-2 px-3 bg-primaryButton shadow-lg rounded-md text-lg block hover:bg-primaryButton-hover active:bg-primaryButton-active active:shadow-none"
              onClick={changePasswordHander}
            >
              Change password
            </button>
          )}
        </div>
        <button
          type="button"
          className="py-2 px-12 mt-5 mx-auto bg-primaryButton shadow-lg rounded-md text-lg block hover:bg-primaryButton-hover active:bg-primaryButton-active active:shadow-none"
          onClick={updateUserDetails}
        >
          Save changes
        </button>
      </div>
    </div>
  );
};

export default Profile;
