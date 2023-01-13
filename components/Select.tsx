import type { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  options: { name: string; value: number }[];
  register: UseFormRegisterReturn;
}
const Select: React.FC<Props> = ({ options, register }) => {
  return (
    <select
      {...register}
      className="p-4 w-full bg-gray-100 rounded-xl border transition-colors focus:bg-white focus:outline-none"
    >
      {options.map(({ name, value }) => (
        <option value={value} key={value}>
          {name}
        </option>
      ))}
    </select>
  );
};

export default Select;
