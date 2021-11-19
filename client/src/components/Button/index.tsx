import React from "react";
import "./style.css";

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {};
const Button: React.FC<ButtonProps> = (props) => {
  const { children, ...rest } = props;
  return (
    <button {...rest} className="button">
      {children}
    </button>
  );
};

export default Button;
