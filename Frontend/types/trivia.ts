export interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
}

export interface QuestionCardProps {
  question: Question
  currentQuestion: number
  totalQuestions: number
  onAnswer: (selectedIndex: number) => void
}

export interface ResultModalProps {
  score: number
  totalQuestions: number
  onRestart: () => void
  onNewTrivia: () => void
}

export interface Department {
  id: string
  name: string
  icon: string
  description: string
  color: string
}

export interface DepartmentSelectionProps {
  onSelectDepartment: (departmentId: string) => void
}
