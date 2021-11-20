import React from "react";
import "./style.css";

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  disabled?: boolean;
};
const Button: React.FC<ButtonProps> = (props) => {
  const { children, disabled, ...rest } = props;
  return (
    <button
      {...rest}
      disabled={disabled}
      onClick={(e) => {
        if (!disabled && rest.onClick) rest.onClick(e);
      }}
      className={`button ` + rest.className ?? ""}
    >
      {children}
    </button>
  );
};

export default Button;
