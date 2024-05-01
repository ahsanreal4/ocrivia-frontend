import { Button, Form, Icon } from "semantic-ui-react";
import AppInput from "../../../components/Input";
import { Chat, Message } from "../../../types/user.type";
import { FC, useRef, useState } from "react";
import {
  showErrorToastMessage,
  showInfoToastMessage,
} from "../../../utils/toast";
import useFileUpload from "../../../hooks/api/mutation/useFileUpload";
import useWriteUserMessage from "../../../hooks/api/mutation/useWriteUserMessage";
import { Roles } from "../../../types/roles.types";

interface InputSectionProps {
  activeChat: Chat | null;
  setActiveChat: React.Dispatch<React.SetStateAction<Chat | null>>;

  chats: Chat[];
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>;

  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const InputSection: FC<InputSectionProps> = ({
  activeChat,
  setActiveChat,
  setChats,
  chats,
  messages,
  setMessages,
}) => {
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { uploadFile } = useFileUpload();
  const { writeMessage } = useWriteUserMessage();

  const clickUploadInput = () => {
    if (!activeChat) {
      showErrorToastMessage("Please select a chat first");
      return;
    }

    if (
      activeChat &&
      activeChat.fileContent &&
      activeChat.fileContent.length > 0
    ) {
      showErrorToastMessage("File already uploaded for this chat");
      return;
    }

    fileInputRef.current && fileInputRef.current.click();
  };

  const uploadFileUtil = async (file: File) => {
    showInfoToastMessage("Uploading file");
    const response = await uploadFile(activeChat?._id ?? "", file);

    if (typeof response == "string") {
      const mappedChats = chats.map((chat: Chat) => {
        const cloneObject = { ...chat };

        if (cloneObject._id == activeChat?._id) {
          cloneObject.fileContent = response;

          setActiveChat(cloneObject);
        }

        return cloneObject;
      });

      setChats(mappedChats);
    }
  };

  const submitMessage = async () => {
    const MIN_MESSAGE_LENGTH = 5;

    if (message.trim().length < MIN_MESSAGE_LENGTH) {
      showErrorToastMessage(
        "Prompt must be of at least " + MIN_MESSAGE_LENGTH + " characters"
      );

      return;
    }

    const text = message.trim();

    setMessages((prev) => [
      ...prev,
      {
        role: Roles.USER,
        content: text,
      },
    ]);

    setMessage("");
    const response = await writeMessage(text, activeChat?._id ?? "");

    if (response) {
      console.log(response);
      setMessages((prev) => [
        ...prev,
        {
          role: Roles.ASSISTANT,
          content: response.content,
        },
      ]);
    }
  };

  const onChangeFile = (e: any) => {
    const file: File = e.target.files[0];

    uploadFileUtil(file);
  };

  const openFileLink = () => {
    const newTab = window.open(activeChat?.fileUrl, "_blank");

    if (!newTab) return;

    newTab.focus();
  };

  return (
    <div className="inputs_section">
      {activeChat && activeChat.fileUrl ? (
        <Button onClick={openFileLink} primary>
          Preview
        </Button>
      ) : (
        <Icon
          onClick={clickUploadInput}
          name="cloud upload"
          size="big"
          color="blue"
        />
      )}
      <input type="file" hidden ref={fileInputRef} onChange={onChangeFile} />
      <Form onSubmit={submitMessage} className="inputs_section_input_container">
        <AppInput
          fluid
          size="large"
          placeholder="Say something..."
          icon={<Icon name="send" size="large" onClick={submitMessage} link />}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={
            typeof activeChat?.fileContent != "string" ||
            activeChat?.fileContent.length == 0
          }
          required
        />
      </Form>
    </div>
  );
};

export default InputSection;
