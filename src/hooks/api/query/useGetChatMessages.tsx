import { useState } from "react";

import { AxiosResponse } from "axios";
import { getAxiosInstance } from "../../../utils/axios";
import { ApiRoutes } from "../../../constants/api.constants";
import { showErrorToastMessage } from "../../../utils/toast";
import { Message } from "../../../types/user.type";

const useGetChatMessages = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Message[]>([]);

  const getChatMessages = async (chatId: string) => {
    setLoading(true);
    const axiosInstance = await getAxiosInstance(true);

    try {
      const response: AxiosResponse = await axiosInstance.get(
        ApiRoutes.Auth.GetChatMessages + "/" + chatId
      );
      const data = response.data;
      setData(data.messages);
    } catch (err) {
      showErrorToastMessage("Error getting user chats");
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, setData, getChatMessages };
};

export default useGetChatMessages;
