import { toast } from "react-toastify";

const showToastMessage = (title: string, type: "success" | "error") => {
  if (type == "success") {
    toast.success(title, {
      position: "top-center",
    });
  } else {
    toast.error(title, {
      position: "top-center",
    });
  }
};

export const showSuccessToastMessage = (title: string) => {
  showToastMessage(title, "success");
};

export const showErrorToastMessage = (title: string) => {
  showToastMessage(title, "error");
};
