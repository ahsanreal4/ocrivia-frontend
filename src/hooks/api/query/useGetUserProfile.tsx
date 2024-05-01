import { useContext, useState } from "react";

import { AxiosResponse } from "axios";
import { getAxiosInstance } from "../../../utils/axios";
import { ApiRoutes } from "../../../constants/api.constants";
import { showErrorToastMessage } from "../../../utils/toast";
import { UserContext } from "../../../context/user.context";

const useGetUserProfile = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);

  const getUserProfile = async () => {
    setLoading(true);
    const axiosInstance = await getAxiosInstance(true);

    try {
      const response: AxiosResponse = await axiosInstance.get(
        ApiRoutes.Auth.GetProfile
      );
      const data = response.data;
      setUser(data);
    } catch (err) {
      showErrorToastMessage("Error while getting user");
    } finally {
      setLoading(false);
    }
  };

  return { getUserProfile, loading };
};

export default useGetUserProfile;
