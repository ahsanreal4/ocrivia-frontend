import { useContext, useState } from "react";

import { AxiosResponse } from "axios";
import { getAxiosInstance } from "../../../utils/axios";
import { ApiRoutes } from "../../../constants/api.constants";
import {
  showErrorToastMessage,
  showSuccessToastMessage,
} from "../../../utils/toast";
import { Chat } from "../../../types/user.type";
import { UserContext } from "../../../context/user.context";

const useCreateChat = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  const createChat = async (name: string) => {
    setLoading(true);
    const axiosInstance = await getAxiosInstance(true);

    const payload = {
      userId: user._id,
      name,
    };

    try {
      const response: AxiosResponse<Chat> = await axiosInstance.post(
        ApiRoutes.Auth.CreateChat,
        payload
      );
      const data = response.data;
      showSuccessToastMessage("Chat created!");
      return data;
    } catch (err) {
      showErrorToastMessage("Chat not created");
    } finally {
      setLoading(false);
    }

    return null;
  };

  return { createChat, loading };
};

export default useCreateChat;
