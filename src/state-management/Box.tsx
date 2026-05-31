import { useState } from 'react';
import type { Theme } from './App';
import Title from './Title';

interface Props {
  width: number;
  height: number;
  theme: Theme;
}
const Box = ({ theme, height, width }: Props) => {
  const [name, setName] = useState<string>('');
  console.log('box');

  const handleChangeName = () => {
    console.log('changeName');

    setName('Ali');
  };
  return (
    <div
      style={{
        width: width,
        height: height,
        background: theme === 'Dark' ? 'black' : 'white',
      }}
    >
      <Title name={name} onChangeName={handleChangeName} />
    </div>
  );
};

export default Box;
