import { useState } from "react";

import { AxiosResponse } from "axios";
import { getAxiosInstance } from "../../../utils/axios";
import { ApiRoutes } from "../../../constants/api.constants";
import { saveAuthToken } from "../../../utils/localStorage";
import {
  showErrorToastMessage,
  showSuccessToastMessage,
} from "../../../utils/toast";
import useGetUserProfile from "../query/useGetUserProfile";

type SignUpResponse = {
  access_token: string;
};

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const { getUserProfile } = useGetUserProfile();

  const signUp = async (email: string, password: string, name: string) => {
    setLoading(true);
    const axiosInstance = await getAxiosInstance();

    const payload = {
      email,
      name,
      password,
    };

    let result = false;

    try {
      const response: AxiosResponse<SignUpResponse> = await axiosInstance.post(
        ApiRoutes.NoAuth.Register,
        payload
      );
      const data = response.data;
      saveAuthToken(data.access_token);
      showSuccessToastMessage("Signed up!");
      await getUserProfile();
    } catch (err) {
      showErrorToastMessage("Invalid Credentials");
    } finally {
      setLoading(false);
    }

    return result;
  };

  return { signUp, loading };
};

export default useSignUp;
