import { toast } from "react-toastify";

const showToastMessage = (
  title: string,
  type: "success" | "error" | "info"
) => {
  if (type == "success") {
    toast.success(title, {
      position: "top-center",
    });
  } else if (type == "error") {
    toast.error(title, {
      position: "top-center",
    });
  } else {
    toast.info(title, {
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

export const showInfoToastMessage = (title: string) => {
  showToastMessage(title, "info");
};
