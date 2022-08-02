import React from "react";
import { Button, ButtonProps, Confirm } from "semantic-ui-react";

interface Props {
  onConfirm: () => void;
  onCancel?: () => void;
}

const ConfirmButton: React.FC<Props & ButtonProps> = ({
  onConfirm,
  onCancel,
  children,
  ...props
}) => {
  const [open, setOpen] = React.useState(false);

  const onCloseLocal = () => {
    setOpen(false);
    onCancel && onCancel();
  };
  const onConfirmLocal = () => {
    setOpen(false);
    onConfirm && onConfirm();
  };

  return (
    <React.Fragment>
      <Button onClick={() => setOpen(true)} {...props}>
        {children}
      </Button>
      <Confirm
        open={open}
        content="Sei sicuro di voler eliminare la Leaderboard?"
        cancelButton="Annulla"
        confirmButton="Procedi"
        onCancel={onCloseLocal}
        onConfirm={onConfirmLocal}
      />
    </React.Fragment>
  );
};

export default ConfirmButton;
