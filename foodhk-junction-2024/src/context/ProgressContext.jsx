import React, { createContext, useContext, useState } from 'react';

// Create a context with default values
export const ProgressContext = createContext({
    progress: 1,
    setProgress: () => {}
});

export const ProgressProvider = ({ children }) => {
    const [progress, setProgress] = useState(1);

    const updateProgress = (newProgress) => {
        if ([1, 2, 3, 4].includes(newProgress)) {
            setProgress(newProgress);
        } else {
            console.error('Invalid progress value');
        }
    };

    return (
        <ProgressContext.Provider value={{ progress, setProgress: updateProgress }}>
            {children}
        </ProgressContext.Provider>
    );
};

// Custom hook to use ProgressContext
export const useProgress = () => useContext(ProgressContext);
