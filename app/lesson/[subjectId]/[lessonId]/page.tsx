"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, CheckCircle2, Heart, Volume2, XCircle, Star, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function LessonPage({ params }: { params: { subjectId: string; lessonId: string } }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [lives, setLives] = useState(5)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [showCelebration, setShowCelebration] = useState(false)
  const [score, setScore] = useState(0)
  const [pulseEffect, setPulseEffect] = useState(false)
  const [showMascot, setShowMascot] = useState(false)

  // Trigger pulse effect periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseEffect(true)
      setTimeout(() => setPulseEffect(false), 1000)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Show mascot after a delay when answering correctly
  useEffect(() => {
    if (isCorrect) {
      const timeout = setTimeout(() => {
        setShowMascot(true)

        // Hide mascot after 3 seconds
        const hideTimeout = setTimeout(() => {
          setShowMascot(false)
        }, 3000)

        return () => clearTimeout(hideTimeout)
      }, 500)

      return () => clearTimeout(timeout)
    }
  }, [isCorrect])

  const subjectId = Number.parseInt(params.subjectId)
  const lessonId = Number.parseInt(params.lessonId)

  const subjectData = {
    1: { name: "Matemáticas", color: "#8b5cf6" },
    2: { name: "Ciencias", color: "#3b82f6" },
    3: { name: "Historia", color: "#f59e0b" },
  }

  const currentSubject = subjectData[subjectId] || subjectData[1]

  const exercises = [
    {
      type: "select",
      question:
        subjectId === 1
          ? "¿Cuál es el resultado de 7 × 8?"
          : subjectId === 2
            ? "¿Cuál NO es un estado de la materia?"
            : "¿En qué año llegó Colón a América?",
      options:
        subjectId === 1
          ? ["54", "56", "64", "48"]
          : subjectId === 2
            ? ["Sólido", "Líquido", "Gas", "Roca"]
            : ["1492", "1776", "1066", "1500"],
      correctAnswer: subjectId === 1 ? 1 : subjectId === 2 ? 3 : 0,
    },
    {
      type: "select",
      question:
        subjectId === 1
          ? "Resuelve para x: 2x + 5 = 15"
          : subjectId === 2
            ? "¿Qué planeta está más cerca del Sol?"
            : "¿Quién escribió la Declaración de Independencia?",
      options:
        subjectId === 1
          ? ["5", "10", "7.5", "5.5"]
          : subjectId === 2
            ? ["Tierra", "Venus", "Mercurio", "Marte"]
            : ["George Washington", "Thomas Jefferson", "Benjamin Franklin", "John Adams"],
      correctAnswer: subjectId === 1 ? 0 : subjectId === 2 ? 2 : 1,
    },
    {
      type: "select",
      question:
        subjectId === 1
          ? "¿Cuál es el área de un cuadrado con lados de 6 unidades?"
          : subjectId === 2
            ? "¿Qué es la fotosíntesis?"
            : "¿Qué país NO participó en la Primera Guerra Mundial?",
      options:
        subjectId === 1
          ? ["12", "24", "36", "42"]
          : subjectId === 2
            ? ["Proceso de respiración", "Producción de energía en plantas", "Digestión animal", "División celular"]
            : ["Alemania", "Francia", "España", "Rusia"],
      correctAnswer: subjectId === 1 ? 2 : subjectId === 2 ? 1 : 2,
    },
  ]

  const currentExercise = exercises[currentStep]
  const progress = ((currentStep + 1) / exercises.length) * 100

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index)

    if (currentExercise.type === "select") {
      const correct = index === currentExercise.correctAnswer
      setIsCorrect(correct)

      if (correct) {
        setScore(score + 10)
      } else {
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
      setShowCelebration(true)
    }
  }

  // Confetti effect for celebration
  const [confetti, setConfetti] = useState<{ x: number; y: number; color: string }[]>([])

  useEffect(() => {
    if (showCelebration) {
      const newConfetti = Array.from({ length: 100 }).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * -100,
        color: ["#FF5733", "#33FF57", "#3357FF", "#F3FF33", "#FF33F3", "#33FFF3"][Math.floor(Math.random() * 6)],
      }))
      setConfetti(newConfetti)
    }
  }, [showCelebration])

  return (
    <div className="flex flex-col min-h-screen bg-[#2D0A5F] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Animated circles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              width: `${Math.random() * 300 + 50}px`,
              height: `${Math.random() * 300 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: ["#FF5733", "#33FF57", "#3357FF", "#F3FF33", "#FF33F3"][Math.floor(Math.random() * 5)],
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 10 + Math.random() * 20,
              ease: "easeInOut",
              repeatType: "reverse",
            }}
          />
        ))}

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgb3BhY2l0eT0iMC4wNSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-10 bg-violet-600 text-white shadow-lg">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto">
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ x: -5, scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="bg-white/20 p-1 rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.div>
          </Link>
          <div className="flex flex-col items-center">
            <span className="text-sm font-medium">
              {currentSubject.name} - Lección {lessonId}
            </span>
            <Progress value={progress} className="w-32 h-2 bg-white/30" indicatorClassName="bg-white" />
          </div>
          <motion.div
            className="flex items-center gap-1 px-3 py-1 bg-white/20 rounded-full"
            whileHover={{
              scale: 1.2,
              backgroundColor: "rgba(255,255,255,0.3)",
              boxShadow: "0 0 20px 5px rgba(255,100,100,0.7)",
            }}
            animate={
              pulseEffect
                ? {
                    scale: [1, 1.3, 1],
                    boxShadow: [
                      "0 0 0px rgba(255,100,100,0)",
                      "0 0 20px 5px rgba(255,100,100,0.7)",
                      "0 0 0px rgba(255,100,100,0)",
                    ],
                  }
                : {}
            }
          >
            <motion.div
              animate={
                pulseEffect
                  ? {
                      scale: [1, 1.5, 1],
                      rotate: [0, 15, -15, 0],
                    }
                  : {}
              }
              transition={{ duration: 0.5 }}
            >
              <Heart className="w-5 h-5 text-red-300 fill-red-300" />
            </motion.div>
            <span className="font-bold">{lives}</span>
          </motion.div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 relative z-1">
        <div className="container flex flex-col items-center px-4 py-8 mx-auto">
          {/* Mascot character (appears when answering correctly) */}
          <AnimatePresence>
            {showMascot && (
              <motion.div
                className="absolute top-0 right-4 z-20"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                transition={{ type: "spring" }}
              >
                <div className="relative">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
                  >
                    <div className="w-20 h-20 bg-teal-500 rounded-full flex items-center justify-center relative overflow-hidden border-4 border-teal-600">
                      {/* Owl body */}
                      <div className="w-16 h-16 bg-teal-400 rounded-full absolute bottom-0"></div>

                      {/* Eyes */}
                      <div className="absolute top-4 left-3 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                        <motion.div
                          className="w-2 h-2 bg-black rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3, repeatType: "reverse" }}
                        ></motion.div>
                      </div>
                      <div className="absolute top-4 right-3 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                        <motion.div
                          className="w-2 h-2 bg-black rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3, repeatType: "reverse" }}
                        ></motion.div>
                      </div>

                      {/* Beak */}
                      <div className="absolute top-9 w-4 h-3 bg-orange-400 rounded-md"></div>
                    </div>
                  </motion.div>

                  {/* Speech bubble */}
                  <motion.div
                    className="absolute -left-32 top-8 bg-white p-3 rounded-xl w-32 text-sm text-gray-800 shadow-lg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                  >
                    ¡Muy bien! ¡Sigue así!
                    <div className="absolute right-0 top-1/2 transform translate-x-2 -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-l-8 border-t-transparent border-b-transparent border-l-white"></div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!showCelebration ? (
            <motion.div
              className="w-full max-w-md p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.2)] border border-white/20"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.h1
                className="mb-6 text-xl font-bold text-center text-white"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {currentExercise.question}
              </motion.h1>

              {currentExercise.type === "select" && (
                <div className="space-y-4">
                  {currentExercise.options.map((option, index) => (
                    <motion.button
                      key={index}
                      className={`flex items-center justify-between w-full p-4 text-left border-2 rounded-lg ${
                        selectedOption === index
                          ? isCorrect
                            ? "border-green-500 bg-green-500/30 text-white"
                            : "border-red-500 bg-red-500/30 text-white"
                          : "border-white/30 bg-white/10 text-white hover:border-violet-300 hover:bg-violet-500/20"
                      }`}
                      onClick={() => !selectedOption && handleOptionSelect(index)}
                      disabled={selectedOption !== null}
                      whileHover={
                        selectedOption === null
                          ? {
                              scale: 1.05,
                              x: 10,
                              boxShadow: "0 0 15px rgba(255,255,255,0.3)",
                              backgroundColor: "rgba(139,92,246,0.3)",
                            }
                          : {}
                      }
                      whileTap={selectedOption === null ? { scale: 0.98 } : {}}
                    >
                      <div className="flex items-center gap-3">
                        <motion.div
                          className={`flex items-center justify-center w-8 h-8 rounded-full ${
                            selectedOption === index ? (isCorrect ? "bg-green-500/50" : "bg-red-500/50") : "bg-white/20"
                          }`}
                          whileHover={
                            selectedOption === null
                              ? {
                                  rotate: 10,
                                  scale: 1.2,
                                  backgroundColor: "rgba(255,255,255,0.3)",
                                }
                              : {}
                          }
                        >
                          {selectedOption === index ? (
                            isCorrect ? (
                              <CheckCircle2 className="w-5 h-5 text-white" />
                            ) : (
                              <XCircle className="w-5 h-5 text-white" />
                            )
                          ) : (
                            <span className="font-bold text-white">{String.fromCharCode(65 + index)}</span>
                          )}
                        </motion.div>
                        <span className="font-medium">{option}</span>
                      </div>

                      <motion.div className="flex items-center" whileHover={{ scale: 1.2, rotate: 10 }}>
                        <Volume2 className="w-5 h-5 text-white/70" />
                      </motion.div>
                    </motion.button>
                  ))}
                </div>
              )}

              <AnimatePresence>
                {isCorrect !== null && (
                  <motion.div
                    className="mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        className={`w-full py-6 text-lg font-bold text-white ${
                          isCorrect ? "bg-green-500" : "bg-amber-500"
                        } hover:opacity-90 shadow-[0_0_20px_rgba(255,255,255,0.3)]`}
                        onClick={handleContinue}
                      >
                        {isCorrect ? "¡Increíble! Continuar" : "Intentar de nuevo"}
                      </Button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              className="w-full max-w-md p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.3)] border border-white/20 text-center relative overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              {/* Confetti animation */}
              {confetti.map((c, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full"
                  style={{ backgroundColor: c.color, left: `${c.x}%` }}
                  initial={{ y: c.y, opacity: 1 }}
                  animate={{ y: "100vh", opacity: 0 }}
                  transition={{ duration: 2 + Math.random() * 2, ease: "easeOut" }}
                />
              ))}

              {/* Mascot celebration */}
              <motion.div
                className="absolute -top-4 -right-4 z-10"
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
              >
                <div className="w-24 h-24 bg-teal-500 rounded-full flex items-center justify-center relative overflow-hidden border-4 border-teal-600">
                  {/* Owl body */}
                  <div className="w-20 h-20 bg-teal-400 rounded-full absolute bottom-0"></div>

                  {/* Eyes */}
                  <div className="absolute top-5 left-4 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <motion.div
                      className="w-3 h-3 bg-black rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, repeatType: "reverse" }}
                    ></motion.div>
                  </div>
                  <div className="absolute top-5 right-4 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <motion.div
                      className="w-3 h-3 bg-black rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, repeatType: "reverse" }}
                    ></motion.div>
                  </div>

                  {/* Beak */}
                  <div className="absolute top-12 w-6 h-4 bg-orange-400 rounded-md"></div>

                  {/* Happy eyebrows */}
                  <motion.div
                    className="absolute top-3 left-5 w-4 h-1 bg-teal-700 rounded-full"
                    animate={{ rotate: -15 }}
                  ></motion.div>
                  <motion.div
                    className="absolute top-3 right-5 w-4 h-1 bg-teal-700 rounded-full"
                    animate={{ rotate: 15 }}
                  ></motion.div>
                </div>
              </motion.div>

              <motion.div
                animate={{
                  rotate: [0, 10, -10, 10, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                className="inline-block mb-4"
              >
                <Sparkles className="w-20 h-20 text-yellow-300 drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]" />
              </motion.div>

              <motion.h1
                className="mb-2 text-3xl font-bold text-white"
                animate={{
                  scale: [1, 1.1, 1],
                  textShadow: [
                    "0 0 10px rgba(255,255,255,0.5)",
                    "0 0 20px rgba(255,255,255,0.8)",
                    "0 0 10px rgba(255,255,255,0.5)",
                  ],
                }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
              >
                ¡Lección Completada!
              </motion.h1>

              <motion.p
                className="mb-6 text-white text-lg"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
              >
                Has ganado <span className="font-bold text-yellow-300">{score} XP</span> y desbloqueado nuevo contenido!
              </motion.p>

              <div className="flex justify-center gap-4 mb-8">
                {[1, 2, 3].map((star) => (
                  <motion.div
                    key={star}
                    initial={{ scale: 0 }}
                    animate={{
                      scale: 1,
                      rotate: [0, 20, 0],
                      filter:
                        star <= 2
                          ? [
                              "drop-shadow(0 0 5px rgba(255,215,0,0.5))",
                              "drop-shadow(0 0 15px rgba(255,215,0,0.8))",
                              "drop-shadow(0 0 5px rgba(255,215,0,0.5))",
                            ]
                          : "none",
                    }}
                    transition={{
                      delay: 0.2 * star,
                      type: "spring",
                      filter: { repeat: Number.POSITIVE_INFINITY, duration: 2 },
                    }}
                  >
                    <Star
                      className={`w-16 h-16 ${star <= 2 ? "text-yellow-300 fill-yellow-300" : "text-gray-500/30"}`}
                    />
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 15px rgba(255,255,255,0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    className="w-full border-2 border-white/50 text-white bg-white/10 hover:bg-white/20"
                    onClick={() => window.location.reload()}
                  >
                    Intentar de nuevo
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 15px rgba(139,92,246,0.8)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/">
                    <Button className="w-full bg-violet-500 text-white border-none">Continuar</Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* Score display */}
      {!showCelebration && (
        <motion.div
          className="fixed top-20 right-4 bg-violet-500 text-white px-4 py-2 rounded-lg shadow-[0_0_15px_rgba(139,92,246,0.5)] border border-white/20"
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          whileHover={{
            scale: 1.1,
            boxShadow: "0 0 20px rgba(139,92,246,0.8)",
          }}
        >
          <div className="flex items-center gap-2">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3 }}
            >
              <Star className="w-5 h-5 text-yellow-300 fill-yellow-300 drop-shadow-[0_0_5px_rgba(255,215,0,0.8)]" />
            </motion.div>
            <span className="font-bold">{score} XP</span>
          </div>
        </motion.div>
      )}
    </div>
  )
}

