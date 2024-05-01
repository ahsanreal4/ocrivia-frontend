import { useContext, useEffect, useState } from "react";

import { AxiosResponse } from "axios";
import { getAxiosInstance } from "../../../utils/axios";
import { ApiRoutes } from "../../../constants/api.constants";
import { saveAuthToken } from "../../../utils/localStorage";
import { showErrorToastMessage } from "../../../utils/toast";
import { Chat } from "../../../types/user.type";
import { UserContext } from "../../../context/user.context";

const useGetUserChats = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Chat[]>([]);
  const { user } = useContext(UserContext);

  const getUserChats = async () => {
    setLoading(true);
    const axiosInstance = await getAxiosInstance(true);

    try {
      const response: AxiosResponse = await axiosInstance.get(
        ApiRoutes.Auth.GetUserChats + "/" + user._id
      );
      const data = response.data;
      setData(data);
    } catch (err) {
      showErrorToastMessage("Error getting user chats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserChats();
  }, []);

  return { loading, data, setData, getUserChats };
};

export default useGetUserChats;
