import "./App.css";
import { UserProvider } from "./context/user.provider";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Routing from "./components/Routing";
import GetUser from "./components/GetUser";

function App() {
  return (
    <UserProvider>
      <div>
        <ToastContainer />
        <Routing />
        <GetUser />
      </div>
    </UserProvider>
  );
}

export default App;
