import { useContext, useState } from "react";

import { AxiosResponse } from "axios";
import { getAxiosInstance } from "../../../utils/axios";
import { ApiRoutes } from "../../../constants/api.constants";
import { showErrorToastMessage } from "../../../utils/toast";
import { Message } from "../../../types/user.type";

const useWriteUserMessage = () => {
  const [loading, setLoading] = useState(false);

  const writeMessage = async (content: string, chatId: string) => {
    setLoading(true);
    const axiosInstance = await getAxiosInstance(true);

    const payload = {
      content,
      chatId,
    };

    try {
      const response: AxiosResponse<Message> = await axiosInstance.post(
        ApiRoutes.Auth.WriteUserMessage,
        payload
      );
      const data = response.data;
      return data;
    } catch (err) {
      showErrorToastMessage("Some error occurred");
    } finally {
      setLoading(false);
    }

    return null;
  };

  return { writeMessage, loading };
};

export default useWriteUserMessage;
