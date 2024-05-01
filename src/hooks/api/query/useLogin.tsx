import { useState } from "react";

import { AxiosResponse } from "axios";
import { getAxiosInstance } from "../../../utils/axios";
import { ApiRoutes } from "../../../constants/api.constants";
import { saveAuthToken } from "../../../utils/localStorage";
import {
  showErrorToastMessage,
  showSuccessToastMessage,
} from "../../../utils/toast";
import useGetUserProfile from "./useGetUserProfile";

type ILoginResponse = {
  access_token: string;
};

const useLoginMutation = () => {
  const [loading, setLoading] = useState(false);
  const { getUserProfile } = useGetUserProfile();

  const login = async (email: string, password: string) => {
    setLoading(true);
    const axiosInstance = await getAxiosInstance();

    const payload = {
      email,
      password,
    };

    let result = false;

    try {
      const response: AxiosResponse<ILoginResponse> = await axiosInstance.post(
        ApiRoutes.NoAuth.Login,
        payload
      );
      const data = response.data;
      saveAuthToken(data.access_token);
      showSuccessToastMessage("Logged in");
      await getUserProfile();
    } catch (err) {
      showErrorToastMessage("Invalid Credentials");
    } finally {
      setLoading(false);
    }

    return result;
  };

  return { login, loading };
};

export default useLoginMutation;
