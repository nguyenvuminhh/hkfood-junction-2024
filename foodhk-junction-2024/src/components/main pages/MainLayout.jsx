import React from 'react';
import Stage1 from "../stages/Stage1";
import Stage2 from "../stages/Stage2";
import Stage3 from "../stages/Stage3";
import Stage4 from "../stages/Stage4";
import ProgressBar from "../helper/ProgressBar";
import { ProgressProvider, useProgress } from '../../context/ProgressContext';
import useDarkMode from '../../hooks/useDarkMode';
import TopNavigation from './TopNavigation'; // Import the new component

function MainLayout() {
  const { progress } = useProgress();
  const [darkTheme, setDarkTheme] = useDarkMode();
  const handleMode = () => setDarkTheme(!darkTheme);

  return (
    <>
    <TopNavigation darkTheme={darkTheme} handleMode={handleMode} />
    <div className="dark:bg-primary_login_dark bg-white flex flex-col items-center min-h-dvh">
      <ProgressBar />
      {progress === 1 && <Stage1 />}
      {progress === 2 && <Stage2 />}
      {progress === 3 && <Stage3 />}
      {progress === 4 && <Stage4 />}
    </div>
    </>
  );
}

export default MainLayout;
