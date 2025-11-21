// types.ts

// Definicja odpowiedzi, zawierająca klucz next_id (reguła przejścia)
export interface Option {
    text: string;
    next_id: string; // ID kolejnego węzła (pytanie lub rekomendacja)
}

// Bazowy interfejs dla wszystkich węzłów (pytań i rekomendacji)
export interface NodeBase {
    id: string;
    type: 'question' | 'recommendation';
}

// Interfejs dla węzła typu 'question'
export interface QuestionNode extends NodeBase {
    type: 'question';
    question_text: string;
    options: Option[];
}

// Interfejs dla węzła typu 'recommendation'
export interface RecommendationNode extends NodeBase {
    type: 'recommendation';
    title: string;
    description: string;
}

// Typ unijny dla węzłów, by Silnik Wnioskujący wiedział, co przetwarza
export type QuizNode = QuestionNode | RecommendationNode;

// Interfejs dla całej Bazy Wiedzy
export interface QuizData {
    start_node: string;
    nodes: { [key: string]: QuizNode }; // Mapa ID na obiekty QuizNode
}