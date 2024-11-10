import React from 'react';
import TopNavigation from '../main pages/TopNavigation';
import { useProgress } from '../../context/ProgressContext';
import useDarkMode from '../../hooks/useDarkMode';

const MainMonitor = () => {
    const { progress, setProgress } = useProgress();
    const [darkTheme, setDarkTheme] = useDarkMode();
    const handleMode = () => setDarkTheme(!darkTheme);

    const phases = [
        { label: 'Preproduction phase', id: 1 },
        { label: 'Cooking phase', id: 2 },
        { label: 'Storage phase', id: 3 },
    ];

    // Define background colors for each phase
    const getBackgroundColor = (id) => {
        switch (id) {
            case 1:
                return 'bg-green-300';
            case 2:
                return 'bg-blue-300';
            case 3:
                return 'bg-yellow-300';
            default:
                return 'bg-gray-300';
        }
    };

    return (
        <>
        <TopNavigation darkTheme={darkTheme} handleMode={handleMode} />
        <div className="flex flex-col items-center justify-center min-w-dvw min-h-dvh bg-white dark:bg-secondary_login_dark">
            <h1 className="text-5xl mb-8 text-black dark:text-white">Choose a phase to monitor</h1>
            <div className="w-[80vw]">
                <div className="flex w-full bg-gray-200 rounded-lg overflow-hidden">
                    {phases.map((phase) => (
                        <button
                            key={phase.id}
                            onClick={() => setProgress(phase.id)}
                            className={`flex-1 p-4 text-center ${getBackgroundColor(phase.id)}`}
                        >
                            <a href={`/monitor/${phase.id}`}>
                                <div className="flex justify-center items-center text-black">
                                    {phase.label}
                                </div>
                            </a>
                        </button>
                    ))}
                </div>
            </div>
        </div>
        </>
    );
};

export default MainMonitor;
