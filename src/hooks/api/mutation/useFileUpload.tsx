import { useState } from "react";

import { AxiosResponse } from "axios";
import { getAxiosInstance } from "../../../utils/axios";
import { ApiRoutes } from "../../../constants/api.constants";
import {
  showErrorToastMessage,
  showSuccessToastMessage,
} from "../../../utils/toast";
import { ContentTypes } from "../../../types/content.types";
import { toast } from "react-toastify";

const useFileUpload = () => {
  const [loading, setLoading] = useState(false);

  const uploadFile = async (chatId: string, file: File) => {
    setLoading(true);
    const axiosInstance = await getAxiosInstance(true, {
      "Content-Type": ContentTypes.MultiPartFormData,
    });

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response: AxiosResponse<string> = await axiosInstance.post(
        ApiRoutes.Auth.UploadFile + "/" + chatId + "/file",
        formData
      );
      const data = response.data;
      toast.dismiss();
      showSuccessToastMessage("File uploaded");
      return data;
    } catch (err) {
      toast.dismiss();

      showErrorToastMessage("File upload failed");
    } finally {
      setLoading(false);
    }

    return null;
  };

  return { uploadFile, loading };
};

export default useFileUpload;
