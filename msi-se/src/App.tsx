import QuizEngine from './components/QuizEngine.tsx';
import './App.css';

function App() {
    return (

        <div className="flex flex-col min-h-screen shadow-xl bg-gray-50">

            <header className="bg-blue-900 text-white p-10 shadow-lg flex-shrink-0">
                <h1 className="text-5xl font-light tracking-wide text-center">
                    System Ekspercki: Kompas Edukacyjny
                </h1>
            </header>


            <main className="flex-grow flex items-center justify-start">
                <QuizEngine />
            </main>


            <footer className="bg-gray-200 text-gray-600 p-4 text-center text-sm border-t border-gray-300 flex-shrink-0">
                <p>&copy; Msi SI/SE 2025 <br />Kamil Pasierki, Wiktor Semp</p>
            </footer>
        </div>
    );
}

export default App;