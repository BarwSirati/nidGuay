import type { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  type: string;
  placeholder: string;
  register: UseFormRegisterReturn;
}

const Input: React.FC<Props> = ({ type, placeholder, register }) => (
  <input
    className="md:p-2 p-4 w-full bg-gray-100 rounded-xl border transition-colors focus:bg-white focus:outline-none"
    type={type}
    placeholder={placeholder}
    {...register}
  />
);

export default Input;
