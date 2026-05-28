interface ButtonProps {
  onClick: () => void;
  disabled: boolean;
  text: string;
  background: string;
}

const Button = ({ onClick, disabled, text, background }: ButtonProps) => {
  return (
    <button
      disabled={!disabled}
      onClick={onClick}
      className={`px-4 cursor-pointer py-1.5 rounded-md  ${background} text-sm text-white`}
    >
      {text}
    </button>
  );
};

export default Button;
