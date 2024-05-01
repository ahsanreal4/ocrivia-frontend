import { useContext } from "react";
import { UserContext } from "../context/user.context";
import { removeAuthToken } from "../utils/localStorage";

const useLogout = () => {
  const { setUser } = useContext(UserContext);

  const logout = () => {
    setUser(null);
    removeAuthToken();
  };

  return { logout };
};

export default useLogout;
