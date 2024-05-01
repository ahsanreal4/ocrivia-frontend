import { FC, useEffect } from "react";
import { Chat, Message } from "../../../types/user.type";

interface MessagesSectionProps {
  activeChat: Chat | null;
  messages: Message[];
}

type MesasgeItem = {
  message: Message;
};

const MessagesSection: FC<MessagesSectionProps> = ({
  activeChat,
  messages,
}) => {
  const scrollContainer = () => {
    const container = document.getElementsByClassName("messages_section")[0];
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  useEffect(() => {
    scrollContainer();
  }, [messages]);

  const NoActiveChat = () => (
    <div className="no_active_chat_container">
      <p>Please select or create a chat to get started</p>
    </div>
  );

  const NoFileUploaded = () => (
    <div className="no_active_chat_container">
      <p>No File Uploaded</p>
      <p>Upload your W-2 form so AI can assist you</p>
    </div>
  );

  const MessageItem = ({ message }: MesasgeItem) => (
    <div className="message_item">
      <p>{message.role}</p>
      <p>{message.content}</p>
    </div>
  );

  const NoMessages = () => (
    <div className="no_active_chat_container">
      <p>No Messages</p>
      <p>Start the conversation</p>
    </div>
  );

  const RenderMessages = () => (
    <>
      {messages.length == 0 ? <NoMessages /> : null}
      <div className="message_items">
        {messages.map((message: Message, index) => (
          <MessageItem message={message} key={`message-${index}`} />
        ))}
      </div>
    </>
  );

  return (
    <div className="messages_section">
      {!activeChat ? <NoActiveChat /> : null}
      {activeChat && typeof activeChat?.fileContent != "string" ? (
        <NoFileUploaded />
      ) : activeChat ? (
        <RenderMessages />
      ) : null}
    </div>
  );
};

export default MessagesSection;
