interface InputProps {
  value: string;
  onChange: () => void;
}
const Input = ({ onChange, value }: InputProps) => {
  return (
    <input
      onChange={onChange}
      value={value}
      className="border rounded-md text-center py-1"
      placeholder="write task..."
      type="text"
    />
  );
};

export default Input;
