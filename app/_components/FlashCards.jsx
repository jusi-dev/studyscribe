"use client";

import { ArrowLeft, ArrowRight, Loader2, RefreshCw } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export const FlashCards = ({ flashcardsText }) => {
    const [flashCardIndex, setFlashCardIndex] = useState(0);
    const [flip, setFlip] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [flashcards, setFlashcards] = useState([]);

    useEffect(() => {
        if (flashcardsText) {
            // Parse flashcards from the text
            const cards = flashcardsText.match(/\*\*Q:.*?\| A:.*?\*\*/g) || [];
            const parsedCards = cards.map(card => {
                const [question, answer] = card.replace(/\*\*/g, '').split('| A:');
                return {
                    question: question.replace('Q:', '').trim(),
                    answer: answer.trim()
                };
            });
            setFlashcards(parsedCards);
        }
    }, [flashcardsText]);

    const changeFlashCard = (newIndex) => {
        setFlip(false);
        setIsLoading(true);

        setTimeout(() => {
            if (newIndex < 0) {
                setFlashCardIndex(flashcards.length - 1);
            } else if (newIndex >= flashcards.length) {
                setFlashCardIndex(0);
            } else {
                setFlashCardIndex(newIndex);
            }
            setIsLoading(false);
        }, 300);
    };

    const remixFlashCards = () => {
        setIsLoading(true);
        const shuffledFlashcards = [...flashcards];
        for (let i = shuffledFlashcards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledFlashcards[i], shuffledFlashcards[j]] = [shuffledFlashcards[j], shuffledFlashcards[i]];
        }
        setTimeout(() => {
            setFlashcards(shuffledFlashcards);
            setFlashCardIndex(0);
            setFlip(false);
            setIsLoading(false);
        }, 300);
    };

    // Only render if we have flashcards
    if (flashcards.length === 0) return null;

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-700">
                    Flashcard {flashCardIndex + 1} of {flashcards.length}
                </h3>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={remixFlashCards}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <>
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Shuffle
                        </>
                    )}
                </Button>
            </div>

            <div className="relative perspective min-h-[200px] mb-6">
                <div
                    onClick={() => !isLoading && setFlip(!flip)}
                    className={`absolute w-full h-full transition-all duration-500 transform-style-preserve-3d cursor-pointer
                        ${flip ? 'rotate-y-180' : ''} ${isLoading ? 'opacity-50' : ''}`}
                >
                    {/* Front of card */}
                    <div className="absolute w-full h-full backface-hidden">
                        <div className="w-full h-full bg-white rounded-xl shadow-lg p-8 flex items-center justify-center text-center">
                            <p className="text-xl text-gray-800">
                                {flashcards[flashCardIndex]?.question}
                            </p>
                        </div>
                    </div>

                    {/* Back of card */}
                    <div className="absolute w-full h-full backface-hidden rotate-y-180">
                        <div className="w-full h-full bg-primary/5 rounded-xl shadow-lg p-8 flex items-center justify-center text-center">
                            <p className="text-xl text-gray-800">
                                {flashcards[flashCardIndex]?.answer}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center">
                <Button
                    variant="outline"
                    onClick={() => changeFlashCard(flashCardIndex - 1)}
                    disabled={isLoading}
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                </Button>

                <Button
                    variant="outline"
                    onClick={() => changeFlashCard(flashCardIndex + 1)}
                    disabled={isLoading}
                >
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
            </div>
        </div>
    );
}

export default FlashCards;
