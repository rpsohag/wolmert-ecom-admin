// create toast

import { toast } from "react-toastify";

export const createToast = (msg, type) => {
  toast[type](msg);
};
