import { memo } from "react";

const FormInput = ({ type, placeholder, value, onChange, name }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      className="border-b outline-none p-2"
    />
  );
};

export default memo(FormInput);
