import React from "react";
import {
  BackdropProps,
  ModalOverlayProps,
  ModalProps,
} from "../utils/interfaces/DashboardInterface";
import ReactDOM from "react-dom";

const Backdrop: React.FC<BackdropProps> = ({ onClick }) => {
  return (
    <div
      className="h-screen w-screen bg-slate-400 bg-opacity-50 z-20 top-0 fixed"
      onClick={onClick}
    ></div>
  );
};

const ModalOverlay: React.FC<ModalOverlayProps> = (props) => {
  return <div className="w-2/4 p-5 bg-formBg rounded-lg shadow-lg absolute top-40 left-1/2 transform -translate-x-1/2 -translate-y-24 z-30">{props.children}</div>;
};

const Modal: React.FC<ModalProps> = (props) => {
  const portaOverlay = document.getElementById("overlay");
  if (!portaOverlay) {
    console.error("Overlay element not found.");
    return null
  }

  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.onClick} />,
        portaOverlay
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portaOverlay
      )}
    </React.Fragment>
  );
};

export default Modal;
