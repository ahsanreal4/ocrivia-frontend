import { useState } from "react";

import { AxiosResponse } from "axios";
import { getAxiosInstance } from "../../../utils/axios";
import { ApiRoutes } from "../../../constants/api.constants";
import {
  showErrorToastMessage,
  showSuccessToastMessage,
} from "../../../utils/toast";
import { Chat } from "../../../types/user.type";

const useDeleteChat = () => {
  const [loading, setLoading] = useState(false);

  const deleteChat = async (chatId: string) => {
    setLoading(true);
    const axiosInstance = await getAxiosInstance(true);

    try {
      const response: AxiosResponse<Chat> = await axiosInstance.delete(
        ApiRoutes.Auth.DeleteChat + "/" + chatId
      );
      const data = response.data;
      showSuccessToastMessage("Chat deleted!");
    } catch (err) {
      showErrorToastMessage("Chat not deleted");
    } finally {
      setLoading(false);
    }
  };

  return { deleteChat, loading };
};

export default useDeleteChat;
