"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { ResultModalProps } from "@/types/trivia"

export function ResultModal({ score, totalQuestions, onRestart, onNewTrivia }: ResultModalProps) {
  const percentage = Math.round((score / totalQuestions) * 100)

  const getMessage = () => {
    if (percentage === 100) return "¡Perfecto! 🎉"
    if (percentage >= 80) return "¡Excelente! 🌟"
    if (percentage >= 60) return "¡Muy bien! 👏"
    if (percentage >= 40) return "¡Buen intento! 💪"
    return "¡Sigue practicando! 📚"
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      >
        <Card className="w-full max-w-md bg-[#2F1746] border-[#6241FA] border-2 shadow-2xl">
          <CardHeader className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <CardTitle className="text-3xl md:text-4xl text-[#88F4FF] mb-2">{getMessage()}</CardTitle>
            </motion.div>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="space-y-2">
              <motion.p
                className="text-5xl md:text-6xl font-bold text-[#219BE4]"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 150 }}
              >
                {score}/{totalQuestions}
              </motion.p>
              <motion.p
                className="text-xl text-[#88F4FF]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {percentage}% de respuestas correctas
              </motion.p>
            </div>
            <div className="w-full bg-[#3d2157] rounded-full h-4 overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-[#6241FA] to-[#219BE4] h-full"
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3">
            <motion.div
              className="w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <Button
                onClick={onRestart}
                className="w-full py-6 text-lg bg-[#6241FA] hover:bg-[#219BE4] text-[#88F4FF] transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Jugar de nuevo
              </Button>
            </motion.div>
            <motion.div
              className="w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              <Button
                onClick={onNewTrivia}
                variant="outline"
                className="w-full py-6 text-lg bg-transparent border-2 border-[#6241FA] hover:bg-[#6241FA] text-[#88F4FF] transition-all duration-300 hover:scale-105"
              >
                Hacer otra trivia
              </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  )
}
