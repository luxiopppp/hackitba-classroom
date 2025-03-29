"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Award,
  BookOpen,
  Brain,
  Crown,
  FlameIcon as Fire,
  Heart,
  LayoutGrid,
  Map,
  MessageCircle,
  Rocket,
  Settings,
  Sparkles,
  Star,
  Trophy,
  User,
  CheckCircle2,
  Lock,
} from "lucide-react"
import { motion } from "framer-motion"

export default function Home() {
  const [hoveredSubject, setHoveredSubject] = useState<number | null>(null)
  const [pulseEffect, setPulseEffect] = useState(false)
  const [showMascotTip, setShowMascotTip] = useState(false)

  // Trigger pulse effect periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseEffect(true)
      setTimeout(() => setPulseEffect(false), 1000)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Show mascot tip after a delay
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowMascotTip(true)

      // Hide tip after 5 seconds
      const hideTimeout = setTimeout(() => {
        setShowMascotTip(false)
      }, 5000)

      return () => clearTimeout(hideTimeout)
    }, 2000)

    return () => clearTimeout(timeout)
  }, [])

  const subjects = [
    {
      id: 1,
      name: "Matemáticas",
      icon: <Brain className="w-6 h-6" />,
      color: "#8b5cf6",
      progress: 70,
      lessons: 6,
      completed: 4,
    },
    {
      id: 2,
      name: "Ciencias",
      icon: <Rocket className="w-6 h-6" />,
      color: "#3b82f6",
      progress: 40,
      lessons: 6,
      completed: 2,
    },
    {
      id: 3,
      name: "Historia",
      icon: <BookOpen className="w-6 h-6" />,
      color: "#f59e0b",
      progress: 20,
      lessons: 6,
      completed: 1,
    },
  ]

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
          <div className="flex items-center gap-2">
            <motion.div
              className="flex items-center justify-center w-10 h-10 bg-white rounded-xl"
              whileHover={{
                scale: 1.2,
                rotate: 10,
                boxShadow: "0 0 15px 5px rgba(255,255,255,0.5)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Sparkles className="w-6 h-6 text-violet-600" />
            </motion.div>
            <span className="text-xl font-bold">EduQuest</span>
          </div>
          <div className="flex items-center gap-4">
            <motion.div
              className="flex items-center gap-1 px-3 py-2 bg-white/20 rounded-full"
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
              transition={{ duration: 0.5 }}
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
                <Heart className="w-6 h-6 text-red-400 fill-red-400" />
              </motion.div>
              <span className="font-bold">5</span>
            </motion.div>
            <motion.div
              className="flex items-center gap-1 px-3 py-2 bg-white/20 rounded-full"
              whileHover={{
                scale: 1.2,
                backgroundColor: "rgba(255,255,255,0.3)",
                boxShadow: "0 0 20px 5px rgba(255,150,50,0.7)",
              }}
              animate={
                pulseEffect
                  ? {
                      scale: [1, 1.3, 1],
                      boxShadow: [
                        "0 0 0px rgba(255,150,50,0)",
                        "0 0 20px 5px rgba(255,150,50,0.7)",
                        "0 0 0px rgba(255,150,50,0)",
                      ],
                    }
                  : {}
              }
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <motion.div
                animate={{
                  y: [0, -1, 1, -1, 0],
                }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.5 }}
                whileHover={{
                  rotate: [0, -10, 10, -10, 0],
                  transition: { duration: 0.5, repeat: Number.POSITIVE_INFINITY },
                }}
              >
                <Fire className="w-6 h-6 text-orange-400 fill-orange-400" />
              </motion.div>
              <span className="font-bold">7</span>
            </motion.div>
            <motion.div
              className="flex items-center gap-1 px-3 py-2 bg-white/20 rounded-full"
              whileHover={{
                scale: 1.2,
                backgroundColor: "rgba(255,255,255,0.3)",
                boxShadow: "0 0 20px 5px rgba(255,215,0,0.7)",
              }}
              animate={
                pulseEffect
                  ? {
                      scale: [1, 1.3, 1],
                      boxShadow: [
                        "0 0 0px rgba(255,215,0,0)",
                        "0 0 20px 5px rgba(255,215,0,0.7)",
                        "0 0 0px rgba(255,215,0,0)",
                      ],
                    }
                  : {}
              }
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div
                animate={{ rotate: [0, 5, -5, 5, 0] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                whileHover={{ rotate: 360, transition: { duration: 0.5 } }}
              >
                <Crown className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              </motion.div>
              <span className="font-bold">320</span>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 relative z-1">
        <div className="container px-4 py-6 mx-auto">
          {/* Mascot character */}
          <div className="relative mb-6">
            <motion.div
              className="absolute -top-6 right-0 md:right-10 z-20"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", delay: 0.5 }}
            >
              <div className="relative">
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}>
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-teal-500 rounded-full flex items-center justify-center relative overflow-hidden border-4 border-teal-600">
                    {/* Owl body */}
                    <div className="w-20 h-20 md:w-28 md:h-28 bg-teal-400 rounded-full absolute bottom-0"></div>

                    {/* Eyes */}
                    <div className="absolute top-5 md:top-7 left-4 md:left-6 w-6 md:w-8 h-6 md:h-8 bg-white rounded-full flex items-center justify-center">
                      <motion.div
                        className="w-3 md:w-4 h-3 md:h-4 bg-black rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3, repeatType: "reverse" }}
                      ></motion.div>
                    </div>
                    <div className="absolute top-5 md:top-7 right-4 md:right-6 w-6 md:w-8 h-6 md:h-8 bg-white rounded-full flex items-center justify-center">
                      <motion.div
                        className="w-3 md:w-4 h-3 md:h-4 bg-black rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3, repeatType: "reverse" }}
                      ></motion.div>
                    </div>

                    {/* Beak */}
                    <div className="absolute top-12 md:top-16 w-6 md:w-8 h-4 md:h-5 bg-orange-400 rounded-md"></div>

                    {/* Eyebrows */}
                    <motion.div
                      className="absolute top-2 md:top-3 left-5 md:left-7 w-4 md:w-6 h-1 md:h-2 bg-teal-700 rounded-full"
                      animate={{ rotate: [0, 10, 0] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, repeatType: "reverse" }}
                    ></motion.div>
                    <motion.div
                      className="absolute top-2 md:top-3 right-5 md:right-7 w-4 md:w-6 h-1 md:h-2 bg-teal-700 rounded-full"
                      animate={{ rotate: [0, -10, 0] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, repeatType: "reverse" }}
                    ></motion.div>
                  </div>
                </motion.div>

                {/* Speech bubble */}
                {showMascotTip && (
                  <motion.div
                    className="absolute -left-32 md:-left-40 top-10 bg-white p-3 rounded-xl w-32 md:w-40 text-sm text-gray-800 shadow-lg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring" }}
                  >
                    ¡Hola! Soy Teco. ¡Completa tu meta diaria!
                    <div className="absolute right-0 top-1/2 transform translate-x-2 -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-l-8 border-t-transparent border-b-transparent border-l-white"></div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Daily goal */}
          <motion.div
            className="p-4 mb-6 bg-violet-500 rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.5)] border border-violet-400/30"
            whileHover={{
              y: -8,
              boxShadow: "0 0 30px rgba(168,85,247,0.8)",
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold text-white">Meta Diaria</h2>
              <motion.div className="flex items-center gap-1" whileHover={{ scale: 1.1 }}>
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 10, 0],
                    scale: [1, 1.1, 1, 1.1, 1],
                  }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                >
                  <Fire className="w-5 h-5 text-orange-300 fill-orange-300" />
                </motion.div>
                <span className="font-bold text-orange-300">7 días seguidos! 🔥</span>
              </motion.div>
            </div>
            <Progress
              value={60}
              className="h-5 mb-2 bg-white/30 rounded-full overflow-hidden"
              indicatorClassName="bg-green-400 rounded-full"
            />
            <div className="flex justify-between text-sm text-white">
              <p>60 XP Hoy</p>
              <p>Meta: 100 XP</p>
            </div>
          </motion.div>

          {/* Subject Roadmaps */}
          <div className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-white flex items-center gap-2">
              <Map className="w-5 h-5 text-yellow-300" />
              Ruta de Aprendizaje
            </h2>

            {subjects.map((subject) => (
              <motion.div
                key={subject.id}
                className="mb-6 p-4 bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/10"
                whileHover={{
                  y: -5,
                  boxShadow: `0 0 20px ${subject.color}80`,
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: subject.color }}
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      {subject.icon}
                    </motion.div>
                    <h3 className="font-bold text-lg text-white">{subject.name}</h3>
                  </div>
                  <Progress
                    value={subject.progress}
                    className="w-24 h-3 bg-white/20 rounded-full"
                    indicatorClassName="bg-white rounded-full"
                  />
                </div>

                {/* Roadmap visualization */}
                <div className="relative">
                  {/* Path line */}
                  <div className="absolute top-10 left-4 right-4 h-2 bg-white/20 rounded-full z-0"></div>

                  {/* Units */}
                  <div className="flex justify-between relative z-10">
                    {[
                      { name: "Básico", completed: true, current: false },
                      {
                        name: "Intermedio",
                        completed: subject.id === 1,
                        current: subject.id === 2 || subject.id === 3,
                      },
                      { name: "Avanzado", completed: false, current: false },
                    ].map((unit, index) => (
                      <div key={index} className="flex flex-col items-center w-1/3">
                        <motion.div
                          className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                            unit.completed ? "bg-green-500" : unit.current ? `bg-${subject.color}` : "bg-white/20"
                          }`}
                          whileHover={{ scale: 1.2 }}
                        >
                          {unit.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-white" />
                          ) : (
                            <span className="text-white font-bold">{index + 1}</span>
                          )}
                        </motion.div>
                        <span className={`text-sm ${unit.current ? "text-white font-bold" : "text-white/70"}`}>
                          {unit.name}
                        </span>

                        {/* Lessons count */}
                        <span className="text-xs text-white/50 mt-1">
                          {unit.completed ? "6/6" : unit.current ? `${subject.completed}/6` : "0/6"}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Current lessons */}
                  {(subject.id === 1 || subject.id === 2) && (
                    <div className="mt-6 grid grid-cols-6 gap-2">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <motion.div key={i} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                          <Link
                            href={`/lesson/${subject.id}/${i + 1}`}
                            className={`flex items-center justify-center w-full h-12 rounded-lg ${
                              i < subject.completed
                                ? "bg-green-500 text-white"
                                : i === subject.completed
                                  ? `bg-${subject.color} text-white`
                                  : "bg-white/10 text-white/50"
                            }`}
                          >
                            {i < subject.completed ? (
                              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            ) : (
                              <span>{i + 1}</span>
                            )}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Locked subject */}
                  {subject.id === 3 && subject.completed < 2 && (
                    <div className="mt-6 text-center py-3 bg-white/5 rounded-lg border border-white/10">
                      <Lock className="w-5 h-5 text-white/50 mx-auto mb-1" />
                      <p className="text-sm text-white/70">Completa más lecciones para desbloquear</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Leaderboard preview */}
          <motion.div
            className="p-4 mb-6 bg-blue-500 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.5)] border border-blue-400/30"
            whileHover={{
              y: -8,
              boxShadow: "0 0 30px rgba(59,130,246,0.8)",
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-300" />
                Clasificación de la Clase
              </h2>
              <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-none">
                Ver Todo
              </Button>
            </div>
            <div className="space-y-3">
              {[
                { name: "Alex", xp: 340, position: 1 },
                { name: "Tú", xp: 280, position: 2, isUser: true },
                { name: "Maria", xp: 265, position: 3 },
              ].map((user) => (
                <motion.div
                  key={user.position}
                  className={`flex items-center p-3 rounded-lg ${
                    user.isUser ? "bg-white/30 border border-white/50" : "bg-white/10"
                  }`}
                  whileHover={{
                    x: 8,
                    backgroundColor: "rgba(255,255,255,0.4)",
                    boxShadow: "0 0 15px rgba(255,255,255,0.3)",
                  }}
                >
                  <div className="w-6 font-bold text-white">{user.position}</div>
                  <motion.div
                    className={`flex items-center justify-center w-8 h-8 mx-3 rounded-full ${
                      user.position === 1 ? "bg-yellow-400" : user.position === 2 ? "bg-gray-300" : "bg-amber-700"
                    }`}
                    whileHover={{
                      scale: 1.3,
                      rotate: 10,
                      boxShadow:
                        user.position === 1
                          ? "0 0 15px rgba(255,215,0,0.8)"
                          : user.position === 2
                            ? "0 0 15px rgba(255,255,255,0.8)"
                            : "0 0 15px rgba(180,83,9,0.8)",
                    }}
                  >
                    {user.position === 1 ? (
                      <Crown className="w-4 h-4 text-yellow-900" />
                    ) : (
                      <User className="w-4 h-4 text-white" />
                    )}
                  </motion.div>
                  <div className="flex-1 font-medium text-white">{user.name}</div>
                  <div className="font-bold text-white">{user.xp} XP</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Achievement unlocked */}
          <motion.div
            className="p-4 bg-amber-500 rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.5)] border border-amber-400/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 0 30px rgba(245,158,11,0.8)",
            }}
          >
            <div className="flex items-center gap-4">
              <motion.div
                className="p-3 bg-white/20 rounded-full"
                animate={{
                  rotate: [0, 10, -10, 10, 0],
                  boxShadow: ["0 0 0px rgba(255,215,0,0)", "0 0 20px rgba(255,215,0,0.8)", "0 0 0px rgba(255,215,0,0)"],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Award className="w-8 h-8 text-yellow-300 drop-shadow-[0_0_5px_rgba(255,215,0,0.8)]" />
              </motion.div>
              <div>
                <h3 className="font-bold text-white">¡Nuevo Logro Desbloqueado!</h3>
                <p className="text-sm text-white/80">Completa 5 lecciones de Matemáticas seguidas</p>
              </div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="secondary"
                  size="sm"
                  className="ml-auto bg-white/20 hover:bg-white/30 text-white border-none"
                >
                  Reclamar 50 XP
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Bottom navigation */}
      <nav className="sticky bottom-0 z-10 bg-violet-600 shadow-lg">
        <div className="container flex items-center justify-around h-16 px-4 mx-auto">
          {[
            { icon: <LayoutGrid className="w-6 h-6" />, label: "Inicio", active: true, href: "/" },
            { icon: <BookOpen className="w-6 h-6" />, label: "Materias", active: false, href: "/subjects" },
            { icon: <Trophy className="w-6 h-6" />, label: "Práctica", active: false, href: "/practice" },
            { icon: <MessageCircle className="w-6 h-6" />, label: "Ayuda", active: false, href: "/help" },
            { icon: <Settings className="w-6 h-6" />, label: "Perfil", active: false, href: "/profile" },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{
                y: -8,
                backgroundColor: "rgba(255,255,255,0.2)",
                boxShadow: "0 0 15px rgba(255,255,255,0.3)",
              }}
              whileTap={{ scale: 0.9 }}
              className="px-3 py-1 rounded-full"
            >
              <Link
                href={item.href}
                className={`flex flex-col items-center ${
                  item.active ? "text-white" : "text-white/60 hover:text-white"
                }`}
              >
                <motion.div
                  whileHover={{
                    rotate: [0, 10, -10, 0],
                    scale: 1.2,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {item.icon}
                </motion.div>
                <span className="text-xs font-medium">{item.label}</span>
                {item.active && (
                  <motion.div
                    className="w-1 h-1 mt-1 bg-white rounded-full"
                    layoutId="activeIndicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      </nav>

      {/* Floating mascot for quick help */}
      <motion.div
        className="fixed bottom-20 right-4 z-20"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <button
          className="w-14 h-14 bg-teal-500 rounded-full flex items-center justify-center shadow-lg border-2 border-teal-600"
          onClick={() => setShowMascotTip((prev) => !prev)}
        >
          <div className="relative">
            {/* Simplified mascot face */}
            <div className="w-10 h-5 bg-white rounded-full flex justify-between items-center px-1">
              <div className="w-2 h-2 bg-black rounded-full"></div>
              <div className="w-2 h-2 bg-black rounded-full"></div>
            </div>
            <div className="w-3 h-2 bg-orange-400 rounded-sm mx-auto mt-1"></div>
          </div>
        </button>
      </motion.div>
    </div>
  )
}

