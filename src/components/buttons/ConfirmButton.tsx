import React from "react";
import { useTranslation } from "react-i18next";
import { Button, ButtonProps, Confirm } from "semantic-ui-react";

interface Props {
  content?: string;
  cancelButton?: string;
  confirmButton?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

const ConfirmButton: React.FC<Props & ButtonProps> = ({
  content,
  cancelButton,
  confirmButton,
  onConfirm,
  onCancel,
  children,
  ...props
}) => {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation("common");

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
        content={content || t("buttons.confirm_proceed")}
        cancelButton={cancelButton || t("buttons.revert_proceed")}
        confirmButton={confirmButton || t("buttons.proceed")}
        onCancel={onCloseLocal}
        onConfirm={onConfirmLocal}
      />
    </React.Fragment>
  );
};

export default ConfirmButton;
