import { useEffect } from "react";
import useGetUserProfile from "../hooks/api/query/useGetUserProfile";

const GetUser = () => {
  const { getUserProfile } = useGetUserProfile();

  const performOperations = async () => {
    await getUserProfile();
  };

  useEffect(() => {
    performOperations();
  }, []);

  return null;
};

export default GetUser;
