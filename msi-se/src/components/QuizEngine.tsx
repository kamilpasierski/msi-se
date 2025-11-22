import { useState } from 'react';
import quizData from "../data/quizData.json";
import type { QuizData, QuestionNode, RecommendationNode } from '../types.ts';
import '../App.css';
import StartingPage from "./StartingPage.tsx";

// Rzutowanie zaimportowanych danych na interfejs
const data: QuizData = quizData as QuizData;

function QuizEngine() {
    const [isQuizActive, setIsQuizActive] = useState<boolean>(false);

    // data.start_node jako wartość początkowa tylko, gdy quiz jest aktywny.
    const [currentNodeId, setCurrentNodeId] = useState<string>(data.start_node);

    // Pobieranie aktualnego węzła na podstawie stanu currentNodeId.
    const currentNode = data.nodes[currentNodeId];

    // Funkcja wywoływana przez stronę startową
    const handleStartQuiz = () => {
        setIsQuizActive(true);
        setCurrentNodeId(data.start_node);
    };

    const handleAnswer = (nextId: string) => {
        // Logika Silnika Wnioskującego (Forward Chaining)
        setCurrentNodeId(nextId);
    };

    const renderQuestion = (node: QuestionNode) => (
        <div className="w-full mx-auto space-y-8 p-6 bg-white rounded-xl shadow-xl">

            {/* Tekst pytania */}
            <h2 className="text-center text-4xl md:text-5xl font-bold text-gray-800 border-b-2 border-blue-100 pb-4">
                {node.question_text}
            </h2>

            {/* Kontener opcji */}
            <div className="space-y-4">
                {node.options.map((option, index: number) => (
                    <button
                        key={index}
                        className="w-full text-left text-3xl md:text-xl p-20 rounded-xl bg-blue-50 hover:bg-blue-100
                                   border border-blue-300 shadow-md transition duration-300 ease-in-out transform hover:scale-[1.01]"
                        onClick={() => handleAnswer(option.next_id)}
                    >
                        {/* Tekst opcji */}
                        <p className="text-3xl font-semibold text-gray-700">{option.text}</p>
                    </button>
                ))}
            </div>
        </div>
    );

    const renderRecommendation = (node: RecommendationNode) => (
        <div className="w-full bg-green-50 border-l-4 border-green-500 px-8 py-6 rounded-xl shadow-xl">

            <h1 className="text-3xl font-extrabold text-green-700 mb-4">
                Rekomendacja Końcowa:
            </h1>

            {/* Tytuł rekomendacji */}
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">{node.title}</h3>

            <p
                className="py-4 text-lg text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: node.description }}
            />

            {/* Przycisk resetu */}
            <button
                className="mt-6 w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700
                           transition duration-150 font-semibold shadow-md transform hover:scale-[1.01]"
                //Resetowanie stanu isQuizActive
                onClick={() => {
                    setCurrentNodeId(data.start_node);
                    setIsQuizActive(false);
                }}
            >
                Powtórz Quiz
            </button>
        </div>
    );

    if (!isQuizActive) {
        // Jeżeli quiz nie jest aktywny, wyświetl stronę startową
        return <StartingPage onStartQuiz={handleStartQuiz} />;
    }

    // Pozostała logika (wyświetlanie pytań/rekomendacji) uruchamia się tylko, gdy isQuizActive jest true
    if (!currentNode) {
        return <div className="text-red-600 font-bold p-4">Błąd: Nie znaleziono węzła o ID {currentNodeId}</div>;
    }

    return (
        <div className="w-full flex justify-center">
            {currentNode.type === 'question' && renderQuestion(currentNode as QuestionNode)}
            {currentNode.type === 'recommendation' && renderRecommendation(currentNode as RecommendationNode)}
        </div>
    );
}

export default QuizEngine;