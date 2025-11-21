import React from 'react';

interface StartingPageProps {
    onStartQuiz: () => void;
}

const StartingPage: React.FC<StartingPageProps> = ({ onStartQuiz }) => {
    return (
        <div className="p-15 bg-white rounded-xl shadow-2xl w-full text-center">

            <h2 className="text-7xl font-extrabold text-blue-800 mb-4">
                Witaj!
            </h2>

            <p className="text-5xl text-gray-700 mb-8">
                Naciśnij poniższy przycisk, aby rozpocząć.
            </p>

            <button
                onClick={onStartQuiz}
                className="bg-green-500 hover:bg-green-600 text-white text-xl font-bold py-3 px-8 rounded-lg shadow-md transition duration-300 transform hover:scale-[1.02]"
            >
                START
            </button>
        </div>
    );
};

export default StartingPage;