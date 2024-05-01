import { FC, useState } from "react";
import { Chat } from "../../../types/user.type";
import { Button, Icon } from "semantic-ui-react";
import CreateChatModal from "../../../components/CreateChatModal";
import useCreateChat from "../../../hooks/api/mutation/useCreateChat";
import useDeleteChat from "../../../hooks/api/mutation/useDeleteChat";
import ConfirmationModal from "../../../components/ConfirmationModal";

interface ChatsSectionProps {
  chats: Chat[];
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
  activeChat: Chat | null;
  setAcitveChat: React.Dispatch<React.SetStateAction<Chat | null>>;
}

interface ChatItem {
  chat: Chat;
}

const ChatsSection: FC<ChatsSectionProps> = ({
  chats,
  setChats,
  activeChat,
  setAcitveChat,
}) => {
  const [openCreateChatModal, setOpenCreateChatModal] = useState(false);
  const [openDeleteConfirmationModal, setOpenDeleteConfirmationModal] =
    useState(false);

  const { createChat } = useCreateChat();
  const { deleteChat } = useDeleteChat();

  const openModal = () => {
    setOpenCreateChatModal(true);
  };

  const onSubmitCreateChat = async (name: string) => {
    const createdChat: Chat | null = await createChat(name);

    if (createdChat) {
      setChats([...chats, createdChat]);
      setAcitveChat(createdChat);
    }
  };

  const deleteChatUtil = async (chat: Chat) => {
    await deleteChat(chat._id);
    setChats(chats.filter((currChat: Chat) => currChat._id != chat._id));
    setAcitveChat(null);
  };

  const onDeleteConfirm = () => {
    if (!activeChat) return;

    deleteChatUtil(activeChat);
  };

  const ChatItem = ({ chat }: ChatItem) => {
    const isActive = activeChat?._id == chat._id;

    return (
      <div
        className={`chat_item ${isActive ? "chat_item_active" : ""}`}
        onClick={() => {
          setAcitveChat(chat);
        }}
      >
        <p>{chat.name}</p>

        {isActive ? (
          <div
            onClick={() => {
              setOpenDeleteConfirmationModal(true);
            }}
            className="chat_item_delete_icon_container"
          >
            <Icon name="trash" />
          </div>
        ) : null}
      </div>
    );
  };

  const ChatItems = () => (
    <div className={"chat_items"}>
      {chats.map((chat: Chat) => (
        <ChatItem key={`${chat._id}`} chat={chat} />
      ))}
    </div>
  );

  return (
    <div className="chats_section">
      {openCreateChatModal ? (
        <CreateChatModal
          setOpen={setOpenCreateChatModal}
          onSubmit={onSubmitCreateChat}
        />
      ) : null}
      {openDeleteConfirmationModal ? (
        <ConfirmationModal
          setOpen={setOpenDeleteConfirmationModal}
          onConfirm={onDeleteConfirm}
          title="Are you sure?"
        />
      ) : null}
      <div className="chats_section_button_container">
        <Button onClick={openModal} primary>
          Create Chat
        </Button>
      </div>
      {chats.length == 0 ? <p>No created chats found</p> : <ChatItems />}
    </div>
  );
};

export default ChatsSection;
