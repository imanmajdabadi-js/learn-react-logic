import { useEffect, useState } from 'react';
import Box from './Box';
import Buttons from './Buttons';
export type Theme = 'Dark' | 'Light';

const App = () => {
  const [theme, setTheme] = useState<Theme>('Light');

  console.log('app');

  const handleDarkClick = () => {
    setTheme('Dark');
  };

  const handleLightClick = () => {
    setTheme('Light');
  };

  useEffect(() => {
    const div = document.getElementById('container');
    if (div) {
      div.style.border = '1px solid black';
    }
  }, []);
  return (
    <div id="container" className="container">
      <Box width={200} height={200} theme={theme} />
      <Buttons onClickLight={handleLightClick} onClickDark={handleDarkClick} />
    </div>
  );
};

export default App;
