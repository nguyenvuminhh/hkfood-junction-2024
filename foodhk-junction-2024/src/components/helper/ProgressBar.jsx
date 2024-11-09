import React from 'react';
import { useProgress } from '../../context/ProgressContext';

const ProgressBar = () => {
    const { progress, setProgress } = useProgress();

    const phases = [
        { label: 'Preproduction phase', id: 1 },
        { label: 'Cooking phase', id: 2 },
        { label: 'Storage phase', id: 3 },
        { label: 'Packing phase', id: 4 }
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
            case 4:
                return 'bg-red-300';
            default:
                return 'bg-gray-300';
        }
    };

    return (
        <div className="flex flex-col items-center w-[80vw] mt-24 mb-4">
            <div className="flex w-full bg-gray-200 rounded-lg overflow-hidden">
                {phases.map((phase) => (
                    <div
                        key={phase.id}
                        onClick={() => setProgress(phase.id)}
                        className={`flex-1 p-4 text-center cursor-pointer ${
                            progress === phase.id ? 'font-semibold' : ''
                        } ${getBackgroundColor(phase.id)}`}
                    >
                        <div className={`flex justify-center items-center ${progress === phase.id ? 'text-black' : 'text-gray-400'}`}>
                            {phase.label}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProgressBar;
