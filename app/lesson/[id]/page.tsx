"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, CheckCircle2, Heart, Volume2, XCircle } from "lucide-react"

export default function LessonPage({ params }: { params: { id: string } }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [lives, setLives] = useState(5)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  const lessonId = Number.parseInt(params.id)

  const exercises = [
    {
      type: "select",
      question: "Select the correct translation for 'Hello'",
      options: ["Adiós", "Hola", "Gracias", "Por favor"],
      correctAnswer: 1,
    },
    {
      type: "select",
      question: "Which phrase means 'How are you?'",
      options: ["¿Cómo estás?", "¿Dónde está?", "¿Qué hora es?", "¿Cuántos años tienes?"],
      correctAnswer: 0,
    },
    {
      type: "match",
      question: "Match the word to its meaning",
      pairs: [
        { word: "Agua", meaning: "Water" },
        { word: "Pan", meaning: "Bread" },
      ],
    },
  ]

  const currentExercise = exercises[currentStep]
  const progress = ((currentStep + 1) / exercises.length) * 100

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index)

    if (currentExercise.type === "select") {
      const correct = index === currentExercise.correctAnswer
      setIsCorrect(correct)

      if (!correct) {
        setLives(lives - 1)
      }
    }
  }

  const handleContinue = () => {
    if (currentStep < exercises.length - 1) {
      setCurrentStep(currentStep + 1)
      setSelectedOption(null)
      setIsCorrect(null)
    } else {
      // Lesson completed
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f7fb]">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b shadow-sm">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <Progress value={progress} className="w-32 h-2 bg-gray-200" indicatorClassName="bg-green-500" />
          <div className="flex items-center gap-1">
            <Heart className="w-5 h-5 text-red-500" />
            <span className="font-bold">{lives}</span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        <div className="container flex flex-col items-center px-4 py-8 mx-auto">
          <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-sm">
            <h1 className="mb-6 text-xl font-bold text-center">{currentExercise.question}</h1>

            {currentExercise.type === "select" && (
              <div className="space-y-3">
                {currentExercise.options.map((option, index) => (
                  <button
                    key={index}
                    className={`flex items-center justify-between w-full p-4 text-left border rounded-lg ${
                      selectedOption === index
                        ? isCorrect
                          ? "border-green-500 bg-green-50"
                          : "border-red-500 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => !selectedOption && handleOptionSelect(index)}
                    disabled={selectedOption !== null}
                  >
                    <div className="flex items-center gap-3">
                      <Volume2 className="w-5 h-5 text-gray-400" />
                      <span>{option}</span>
                    </div>
                    {selectedOption === index &&
                      (isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      ))}
                  </button>
                ))}
              </div>
            )}

            {isCorrect !== null && (
              <div className="mt-6">
                <Button
                  className="w-full py-6 text-lg font-bold bg-green-500 hover:bg-green-600"
                  onClick={handleContinue}
                >
                  Continue
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

