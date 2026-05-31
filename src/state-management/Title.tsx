interface Props {
  onChangeName: () => void;
  name: string;
}
const Title = ({ onChangeName, name }: Props) => {
  console.log('title');

  return <p onClick={onChangeName}>{name}</p>;
};

export default Title;
