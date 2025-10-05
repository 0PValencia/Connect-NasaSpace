"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { QuestionCard } from "@/components/question-card"
import { ResultModal } from "@/components/result-modal"
import { DepartmentSelection } from "@/components/department-selection"
import { ParticlesBackground } from "@/components/particles-background"
import { questionsByDepartment } from "@/lib/questions-by-department"
import { departments } from "@/lib/departments"

export function TriviaApp() {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)

  const currentQuestions = selectedDepartment ? questionsByDepartment[selectedDepartment] : []
  const currentDepartmentInfo = departments.find((d) => d.id === selectedDepartment)

  const handleSelectDepartment = (departmentId: string) => {
    setSelectedDepartment(departmentId)
    setCurrentQuestionIndex(0)
    setScore(0)
    setShowResults(false)
  }

  const handleAnswer = (selectedIndex: number) => {
    const currentQuestion = currentQuestions[currentQuestionIndex]

    if (selectedIndex === currentQuestion.correctAnswer) {
      setScore(score + 1)
    }

    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setShowResults(true)
    }
  }

  const handleRestart = () => {
    setSelectedDepartment(null)
    setCurrentQuestionIndex(0)
    setScore(0)
    setShowResults(false)
  }

  const handleBackToDepartments = () => {
    setSelectedDepartment(null)
    setCurrentQuestionIndex(0)
    setScore(0)
    setShowResults(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#2F1746] relative overflow-hidden">
      <ParticlesBackground />

      <div className="w-full max-w-6xl relative z-10">
        <AnimatePresence mode="wait">
          {!selectedDepartment ? (
            <motion.div
              key="department-selection"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <DepartmentSelection onSelectDepartment={handleSelectDepartment} />
            </motion.div>
          ) : (
            <motion.div key="trivia-game" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="text-center mb-8">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center gap-4 mb-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-5xl">{currentDepartmentInfo?.icon}</span>
                    <div className="text-left">
                      <h2 className="text-3xl font-bold text-[#88F4FF]">{currentDepartmentInfo?.name}</h2>
                      <p className="text-[#219BE4]">{currentDepartmentInfo?.description}</p>
                    </div>
                  </div>
                </motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-[#88F4FF] text-sm"
                >
                  Datos del satélite Terra de la NASA
                </motion.p>
              </div>

              <div className="flex items-center justify-center">
                {!showResults ? (
                  <QuestionCard
                    question={currentQuestions[currentQuestionIndex]}
                    currentQuestion={currentQuestionIndex + 1}
                    totalQuestions={currentQuestions.length}
                    onAnswer={handleAnswer}
                  />
                ) : (
                  <ResultModal
                    score={score}
                    totalQuestions={currentQuestions.length}
                    onRestart={handleRestart}
                    onNewTrivia={handleBackToDepartments}
                  />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
