import React from "react";

interface Props {
  type: string;
  placeholder: string;
}

const Input: React.FC<Props> = ({ type, placeholder }) => (
  <input
    className="p-4 w-full bg-gray-100 rounded-xl border transition-colors focus:bg-white focus:outline-none"
    type={type}
    placeholder={placeholder}
  />
);

export default Input;
