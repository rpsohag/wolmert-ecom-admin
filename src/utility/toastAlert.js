// create toast

import { toast } from "react-toastify";

export const createToast = (msg, type) => {
  toast[type](msg, {
    position: toast.POSITION.TOP_LEFT,
    autoClose: 3000,
  });
};
