import React, { FC, useState } from "react";
import {
  ModalContent,
  ModalActions,
  Button,
  Header,
  Icon,
  Modal,
} from "semantic-ui-react";
import AppInput from "./Input";
import { showErrorToastMessage } from "../utils/toast";

interface CreateChatModalProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (name: string) => void;
}

const CreateChatModal: FC<CreateChatModalProps> = ({ setOpen, onSubmit }) => {
  const [name, setName] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const MIN_NAME_LENGTH = 5;

    if (name.length < MIN_NAME_LENGTH) {
      showErrorToastMessage("Name length must be at least 5 characters");
      return;
    }

    onSubmit(name);
    handleClose();
  };

  return (
    <Modal closeIcon open={true} onClose={() => setOpen(false)}>
      <Header content="Create Chat" />
      <ModalContent>
        <AppInput
          type="text"
          placeholder="Chat name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </ModalContent>
      <ModalActions>
        <Button color="red" onClick={handleClose}>
          <Icon name="remove" /> Cancel
        </Button>
        <Button
          color="green"
          onClick={() => {
            handleSubmit();
          }}
        >
          <Icon name="checkmark" /> Create
        </Button>
      </ModalActions>
    </Modal>
  );
};

export default CreateChatModal;
