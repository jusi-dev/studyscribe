import { ArrowLeft, ArrowRight, Redo } from "lucide-react";
import { useState } from "react";

export const FlashCards = () => {
    const [flashCardIndex, setFlashCardIndex] = useState(0);
    const [flip, setFlip] = useState(false);
    const [flashcards, setFlashcards] = useState([
        {
            question: "What is the capital of France?",
            answer: "Paris",
        },
        {
            question: "What is the capital of Germany?",
            answer: "Berlin",
        },
        {
            question: "What is the capital of Italy?",
            answer: "Rome",
        },
        {
            question: "What is the capital of Spain?",
            answer: "Madrid",
        },
        {
            question: "What is the capital of Portugal?",
            answer: "Lisbon",
        },
    ]);

    const changeFlashCard = (newIndex) => {
        setFlip(false);

        if (newIndex < 0) {
            setFlashCardIndex(flashcards.length - 1);
        } else if (newIndex >= flashcards.length) {
            setFlashCardIndex(0);
        } else {
            setFlashCardIndex(newIndex);
        }
    };

    const remixFlashCards = () => {
        const shuffledFlashcards = [...flashcards];
        for (let i = shuffledFlashcards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledFlashcards[i], shuffledFlashcards[j]] = [shuffledFlashcards[j], shuffledFlashcards[i]];
        }
        setFlashcards(shuffledFlashcards);
        setFlashCardIndex(0);
        setFlip(false);
    };

    return (
        <div>
            <h1>Flash Cards</h1>
            <div>
                {flashcards.map((flashcard, index) => (
                    flashCardIndex === index && (
                        <div key={index} className="flex flex-col w-[50vw] items-center justify-center ">
                            <div
                                onClick={() => setFlip(!flip)}
                                className={`my-20 w-full flex items-center justify-center perspective`}
                            >
                                <div className={`relative w-full h-36 text-center cursor-pointer flex items-center justify-center transition-transform shadow-xl duration-500 transform-style-preserve-3d ${flip ? 'rotate-y-180' : ''}`}>
                                    <div className="absolute w-full h-full flex items-center justify-center backface-hidden">
                                        <h2>{flashcard.question}</h2>
                                    </div>
                                    <div className="absolute w-full h-full flex items-center justify-center backface-hidden rotate-y-180">
                                        <h2>{flashcard.answer}</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between w-full px-10">
                                <ArrowLeft className="w-16 h-16 cursor-pointer" onClick={() => changeFlashCard(index - 1)} />
                                <Redo className="w-16 h-16 cursor-pointer" onClick={() => remixFlashCards()} />
                                <ArrowRight className="w-16 h-16 cursor-pointer" onClick={() => changeFlashCard(index + 1)} />
                            </div>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};

export default FlashCards;
