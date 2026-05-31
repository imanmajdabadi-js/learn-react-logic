interface Props {
  onClickDark: () => void;
  onClickLight: () => void;
}
const Buttons = ({ onClickDark, onClickLight }: Props) => {
  console.log('buttons');

  return (
    <div>
      <button onClick={onClickDark}>Dark</button>
      <button onClick={onClickLight}>Light</button>
    </div>
  );
};

export default Buttons;
