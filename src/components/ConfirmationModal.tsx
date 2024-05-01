import React, { FC } from "react";
import {
  ModalContent,
  ModalActions,
  Button,
  Header,
  Icon,
  Modal,
} from "semantic-ui-react";

interface ConfirmationModalModalProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: () => void;
  title: string;
  body?: string;
}

const ConfirmationModal: FC<ConfirmationModalModalProps> = ({
  setOpen,
  onConfirm,
  title,
  body,
}) => {
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    onConfirm();
    handleClose();
  };

  return (
    <Modal closeIcon open={true} onClose={() => setOpen(false)}>
      <Header content={title} />
      <ModalContent>{body ?? "This action cannot be reversed"}</ModalContent>
      <ModalActions>
        <Button color="red" onClick={handleClose}>
          <Icon name="remove" /> No
        </Button>
        <Button
          color="green"
          onClick={() => {
            handleSubmit();
          }}
        >
          <Icon name="checkmark" /> Yes
        </Button>
      </ModalActions>
    </Modal>
  );
};

export default ConfirmationModal;
