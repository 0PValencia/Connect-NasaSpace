"use client"

import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { departments } from "@/lib/departments"
import type { DepartmentSelectionProps } from "@/types/trivia"

export function DepartmentSelection({ onSelectDepartment }: DepartmentSelectionProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    show: { opacity: 1, y: 0, scale: 1 },
  }

  return (
    <div className="w-full max-w-6xl mx-auto relative">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute top-0 left-0 z-20"
      >
        <Button
          onClick={() => window.history.back()}
          className="bg-[#6241FA] hover:bg-[#219BE4] text-[#88F4FF] transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a mapa
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <motion.h1
          className="text-5xl md:text-6xl font-bold text-[#88F4FF] mb-4"
          animate={{
            textShadow: [
              "0 0 20px rgba(136, 244, 255, 0.5)",
              "0 0 40px rgba(136, 244, 255, 0.8)",
              "0 0 20px rgba(136, 244, 255, 0.5)",
            ],
          }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          Terra Trivia
        </motion.h1>
        <motion.p
          className="text-[#219BE4] text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Datos satelitales de la NASA sobre Bolivia
        </motion.p>
        <motion.p
          className="text-[#88F4FF] text-lg mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Selecciona un departamento para comenzar
        </motion.p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {departments.map((dept) => (
          <motion.div key={dept.id} variants={item}>
            <Card
              className="relative overflow-hidden cursor-pointer group border-2 border-[#6241FA] bg-[#2F1746]/80 backdrop-blur-sm hover:border-[#219BE4] transition-all duration-300"
              onClick={() => onSelectDepartment(dept.id)}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#6241FA]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                whileHover={{ scale: 1.05 }}
              />

              <div className="relative p-6 text-center">
                <motion.div
                  className="text-6xl mb-4"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {dept.icon}
                </motion.div>

                <h3 className="text-2xl font-bold text-[#88F4FF] mb-2 group-hover:text-[#219BE4] transition-colors">
                  {dept.name}
                </h3>

                <p className="text-[#219BE4] text-sm">{dept.description}</p>

                <motion.div
                  className="mt-4 h-1 rounded-full"
                  style={{ backgroundColor: dept.color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
