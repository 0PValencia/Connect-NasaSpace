"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { QuestionCardProps } from "@/types/trivia"

export function QuestionCard({ question, currentQuestion, totalQuestions, onAnswer }: QuestionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -20 }}
      transition={{ duration: 0.4 }}
      className="w-[90%] max-w-7xl"
    >
      <Card className="bg-[#2F1746] border-[#6241FA] border-4 shadow-2xl">
        <CardHeader className="pb-8">
          <motion.div
            className="flex justify-between items-center mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-[#88F4FF] text-base font-medium">
              Pregunta {currentQuestion} de {totalQuestions}
            </span>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <CardTitle className="text-3xl md:text-4xl text-[#88F4FF] text-balance leading-tight">
              {question.question}
            </CardTitle>
          </motion.div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 px-8 pb-8">
          {question.options.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <Button
                onClick={() => onAnswer(index)}
                className="w-full h-auto py-5 px-8 text-left text-lg md:text-xl bg-[#6241FA] hover:bg-[#219BE4] text-[#88F4FF] border-none transition-all duration-300 hover:scale-105 hover:shadow-lg font-medium"
                variant="default"
              >
                <motion.span whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                  {option}
                </motion.span>
              </Button>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  )
}
