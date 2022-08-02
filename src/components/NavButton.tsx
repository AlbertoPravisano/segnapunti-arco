import React from "react";
import { useDispatch } from "react-redux";
import { Button, ButtonProps } from "semantic-ui-react";
import { changeView } from "../redux/reducer";
import { View } from "../tools/match";

interface Props {
  children: any;
  view: View;
}

const NavButton: React.FC<Props & ButtonProps> = ({
  view,
  children,
  ...props
}) => {
  const dispatch = useDispatch();

  return (
    <Button onClick={() => dispatch(changeView(view))} {...props}>
      {children}
    </Button>
  );
};

export default NavButton;
