import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PopupMessage = ({ type, message }) => {
  React.useEffect(() => {
    if (message) {
      if (type === "success") toast.success(message, { position: "bottom-right" });
      else if (type === "error") toast.error(message, { position: "bottom-right" });
      else if (type === "warning") toast.warning(message, { position: "bottom-right" });
      else if (type === "info") toast.info(message, {position: "top-center",});
    }
    
  }, [type, message]);

  return <ToastContainer />;
};

export default PopupMessage;
