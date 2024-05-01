import { createContext, Dispatch, SetStateAction } from "react";
import { UserType } from "../types/user.type";

interface UserContext {
  user: UserType;
  setUser: Dispatch<SetStateAction<UserType>>;
}

const INITIAL_STATE: UserContext = {
  user: { _id: "", chats: [], email: "", name: "" },
  setUser: () => {},
};

export const UserContext = createContext(INITIAL_STATE);

export default UserContext;
