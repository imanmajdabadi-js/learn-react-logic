interface InputProps {
  value: string;
  onChange: () => void;
  className: string;
}
const Input = ({ onChange, value, className }: InputProps) => {
  return (
    <input
      onChange={onChange}
      value={value}
      className={`border rounded-md text-center py-1 ${className}`}
      placeholder="write task..."
      type="text"
    />
  );
};

export default Input;
