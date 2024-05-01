import { useContext } from "react";
import { UserContext } from "../context/user.context";
import { Route, Routes } from "react-router-dom";
import Auth from "../pages/Auth/Auth";
import Chats from "../pages/Chats/Chats";

const Routing = () => {
  const { user } = useContext(UserContext);

  return (
    <Routes>
      {!user ? (
        <Route path="/" element={<Auth />} />
      ) : (
        <Route path="/" element={<Chats />} />
      )}
    </Routes>
  );
};

export default Routing;
