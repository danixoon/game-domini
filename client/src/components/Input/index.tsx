import { InputHook } from "hooks/useInput";
import React from "react";
import "./style.css";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
} & InputHook;
const Input: React.FC<InputProps> = (props) => {
  const { children, input, ...rest } = props;
  return (
    <input {...rest} value={input[rest.name]} className="input">
      {children}
    </input>
  );
};

export default Input;
