import { Header, Icon } from "semantic-ui-react";
import useGetUserChats from "../../hooks/api/query/useGetUserChats";
import "./chats.css";
import ChatsSection from "./components/ChatsSection";
import useLogout from "../../hooks/useLogout";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/user.context";
import { Chat } from "../../types/user.type";
import MessagesSection from "./components/MessagesSection";
import InputSection from "./components/InputSection";
import ConfirmationModal from "../../components/ConfirmationModal";
import useGetChatMessages from "../../hooks/api/query/useGetChatMessages";

const Chats = () => {
  const { data: chats, setData: setChats } = useGetUserChats();
  const {
    data: messages,
    setData: setMessages,
    getChatMessages,
  } = useGetChatMessages();

  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const { user } = useContext(UserContext);
  const { logout } = useLogout();

  const [openLogoutConfirmationModal, setOpenLogoutConfirmationModal] =
    useState(false);

  const onLogoutConfirm = () => {
    logout();
  };

  useEffect(() => {
    if (
      !activeChat ||
      typeof activeChat.fileContent != "string" ||
      activeChat?.fileContent.length == 0
    )
      return;

    getChatMessages(activeChat._id);
  }, [activeChat]);

  return (
    <div className="chats_container">
      {openLogoutConfirmationModal ? (
        <ConfirmationModal
          title="Are you sure?"
          onConfirm={onLogoutConfirm}
          setOpen={setOpenLogoutConfirmationModal}
        />
      ) : null}
      <ChatsSection
        chats={chats}
        setChats={setChats}
        activeChat={activeChat}
        setAcitveChat={setActiveChat}
      />
      <div className="user_input_section">
        <div className="header_container">
          <Header size="medium">Ocrivia</Header>
          <div className="user_info_icon_container">
            <p>{user.name}</p>
            <Icon
              onClick={() => {
                setOpenLogoutConfirmationModal(true);
              }}
              name="log out"
              size="big"
            />
          </div>
        </div>
        <MessagesSection activeChat={activeChat} messages={messages} />
        <InputSection
          activeChat={activeChat}
          setActiveChat={setActiveChat}
          setChats={setChats}
          chats={chats}
          messages={messages}
          setMessages={setMessages}
        />
      </div>
    </div>
  );
};

export default Chats;
