import { InputHook } from "hooks/useInput";
import React from "react";
import "./style.css";

type HeaderProps = React.HTMLAttributes<HTMLElement> & { label: string };
const Header: React.FC<HeaderProps> = (props) => {
  const { children, label, ...rest } = props;
  return (
    <header {...rest} className="header">
      <small className="header__label">{label}</small>
      {children}
    </header>
  );
};

export default Header;
