import React from "react";
import { useDispatch } from "react-redux";
import { Button, ButtonProps } from "semantic-ui-react";
import { cambiaView } from "../redux/reducer";
import { StatoPartita } from "../tools/partita";

interface Props {
  children: any;
  view: StatoPartita;
}

const NavButton: React.FC<Props & ButtonProps> = ({
  view,
  children,
  ...props
}) => {
  const dispatch = useDispatch();
  return (
    <Button onClick={() => dispatch(cambiaView(view))} {...props}>
      {children}
    </Button>
  );
};

export default NavButton;
