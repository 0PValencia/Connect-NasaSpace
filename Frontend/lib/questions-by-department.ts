import type { Question } from "@/types/trivia"

export const questionsByDepartment: Record<string, Question[]> = {
  "la-paz": [
    {
      id: 1,
      question: "Según Terra, ¿a qué altitud se encuentra La Paz?",
      options: ["2,500 m", "3,200 m", "3,640 m", "4,100 m"],
      correctAnswer: 2,
    },
    {
      id: 2,
      question: "¿Cuál es la temperatura promedio anual registrada por Terra en La Paz?",
      options: ["5°C", "8°C", "11°C", "15°C"],
      correctAnswer: 2,
    },
    {
      id: 3,
      question: "Terra detectó que los glaciares de La Paz han retrocedido:",
      options: ["10%", "25%", "40%", "55%"],
      correctAnswer: 2,
    },
    {
      id: 4,
      question: "¿Cuántos mm de precipitación anual registra Terra en La Paz?",
      options: ["400 mm", "575 mm", "750 mm", "900 mm"],
      correctAnswer: 1,
    },
    {
      id: 5,
      question: "Según Terra, ¿qué porcentaje de cobertura de nieve tiene el Illimani?",
      options: ["45%", "60%", "75%", "90%"],
      correctAnswer: 1,
    },
  ],
  "santa-cruz": [
    {
      id: 1,
      question: "Terra registra que Santa Cruz tiene una temperatura promedio de:",
      options: ["20°C", "24°C", "28°C", "32°C"],
      correctAnswer: 1,
    },
    {
      id: 2,
      question: "¿Qué porcentaje de deforestación anual detecta Terra en Santa Cruz?",
      options: ["1.5%", "2.8%", "4.2%", "5.6%"],
      correctAnswer: 1,
    },
    {
      id: 3,
      question: "La precipitación anual según Terra en Santa Cruz es:",
      options: ["800 mm", "1,200 mm", "1,400 mm", "1,800 mm"],
      correctAnswer: 2,
    },
    {
      id: 4,
      question: "Terra detecta que Santa Cruz tiene cuántos ecosistemas:",
      options: ["3", "5", "7", "9"],
      correctAnswer: 2,
    },
    {
      id: 5,
      question: "¿Cuántos días de sol al año registra Terra en Santa Cruz?",
      options: ["200", "250", "300", "350"],
      correctAnswer: 2,
    },
  ],
  cochabamba: [
    {
      id: 1,
      question: "Según Terra, ¿cuál es la altitud promedio de Cochabamba?",
      options: ["1,800 m", "2,200 m", "2,558 m", "3,000 m"],
      correctAnswer: 2,
    },
    {
      id: 2,
      question: "¿Qué temperatura promedio registra Terra en Cochabamba?",
      options: ["14°C", "18°C", "22°C", "26°C"],
      correctAnswer: 1,
    },
    {
      id: 3,
      question: "Terra detecta que Cochabamba tiene cuántos pisos ecológicos:",
      options: ["2", "3", "4", "5"],
      correctAnswer: 2,
    },
    {
      id: 4,
      question: "La precipitación anual según Terra es:",
      options: ["350 mm", "500 mm", "650 mm", "800 mm"],
      correctAnswer: 1,
    },
    {
      id: 5,
      question: "¿Cuántos días de clima templado al año registra Terra?",
      options: ["250", "300", "330", "365"],
      correctAnswer: 2,
    },
  ],
  potosi: [
    {
      id: 1,
      question: "Terra registra que Potosí está a una altitud de:",
      options: ["3,200 m", "3,600 m", "4,090 m", "4,500 m"],
      correctAnswer: 2,
    },
    {
      id: 2,
      question: "¿Qué temperatura mínima detecta Terra en Potosí?",
      options: ["-5°C", "-10°C", "-15°C", "-20°C"],
      correctAnswer: 1,
    },
    {
      id: 3,
      question: "Según Terra, ¿qué porcentaje del Salar de Uyuni es visible desde el espacio?",
      options: ["80%", "90%", "95%", "100%"],
      correctAnswer: 3,
    },
    {
      id: 4,
      question: "La precipitación anual según Terra en Potosí es:",
      options: ["200 mm", "350 mm", "500 mm", "650 mm"],
      correctAnswer: 1,
    },
    {
      id: 5,
      question: "Terra muestra que el Cerro Rico tiene una elevación de:",
      options: ["4,200 m", "4,500 m", "4,782 m", "5,000 m"],
      correctAnswer: 2,
    },
  ],
  chuquisaca: [
    {
      id: 1,
      question: "Terra registra que Sucre está a una altitud de:",
      options: ["2,200 m", "2,500 m", "2,810 m", "3,100 m"],
      correctAnswer: 2,
    },
    {
      id: 2,
      question: "¿Qué temperatura promedio detecta Terra en Chuquisaca?",
      options: ["12°C", "15°C", "18°C", "21°C"],
      correctAnswer: 1,
    },
    {
      id: 3,
      question: "Según Terra, ¿cuántos días de sol al año tiene Sucre?",
      options: ["250", "280", "310", "340"],
      correctAnswer: 2,
    },
    {
      id: 4,
      question: "La precipitación anual según Terra es:",
      options: ["400 mm", "550 mm", "700 mm", "850 mm"],
      correctAnswer: 1,
    },
    {
      id: 5,
      question: "Terra muestra que Chuquisaca tiene cuántos pisos ecológicos:",
      options: ["2", "3", "4", "5"],
      correctAnswer: 2,
    },
  ],
  oruro: [
    {
      id: 1,
      question: "Terra registra que Oruro está a una altitud de:",
      options: ["3,200 m", "3,500 m", "3,706 m", "4,000 m"],
      correctAnswer: 2,
    },
    {
      id: 2,
      question: "¿Qué temperatura promedio anual detecta Terra en Oruro?",
      options: ["5°C", "8°C", "11°C", "14°C"],
      correctAnswer: 1,
    },
    {
      id: 3,
      question: "Según Terra, el Lago Poopó ha reducido su superficie en:",
      options: ["30%", "50%", "70%", "90%"],
      correctAnswer: 3,
    },
    {
      id: 4,
      question: "La precipitación anual según Terra en Oruro es:",
      options: ["250 mm", "380 mm", "500 mm", "620 mm"],
      correctAnswer: 1,
    },
    {
      id: 5,
      question: "Terra muestra que Oruro tiene cuántos días con heladas al año:",
      options: ["100", "150", "200", "250"],
      correctAnswer: 2,
    },
  ],
  tarija: [
    {
      id: 1,
      question: "Terra registra que Tarija tiene una temperatura promedio de:",
      options: ["14°C", "18°C", "22°C", "26°C"],
      correctAnswer: 1,
    },
    {
      id: 2,
      question: "¿Qué porcentaje de tierra cultivable detecta Terra en Tarija?",
      options: ["25%", "35%", "45%", "55%"],
      correctAnswer: 2,
    },
    {
      id: 3,
      question: "Según Terra, la precipitación anual en Tarija es:",
      options: ["400 mm", "550 mm", "700 mm", "850 mm"],
      correctAnswer: 1,
    },
    {
      id: 4,
      question: "Terra muestra que Tarija tiene cuántos días de sol al año:",
      options: ["250", "280", "310", "340"],
      correctAnswer: 2,
    },
    {
      id: 5,
      question: "¿Cuántos microclimas detecta Terra en Tarija?",
      options: ["3", "5", "7", "9"],
      correctAnswer: 1,
    },
  ],
  beni: [
    {
      id: 1,
      question: "Terra registra que Beni tiene una temperatura promedio de:",
      options: ["22°C", "26°C", "30°C", "34°C"],
      correctAnswer: 1,
    },
    {
      id: 2,
      question: "¿Qué porcentaje de cobertura forestal detecta Terra en Beni?",
      options: ["50%", "60%", "70%", "80%"],
      correctAnswer: 2,
    },
    {
      id: 3,
      question: "Según Terra, la precipitación anual en Beni es:",
      options: ["1,200 mm", "1,600 mm", "2,000 mm", "2,400 mm"],
      correctAnswer: 2,
    },
    {
      id: 4,
      question: "Terra muestra que Beni se inunda anualmente en:",
      options: ["20%", "30%", "40%", "50%"],
      correctAnswer: 2,
    },
    {
      id: 5,
      question: "¿Cuántos ríos principales detecta Terra en Beni?",
      options: ["5", "8", "11", "14"],
      correctAnswer: 2,
    },
  ],
  pando: [
    {
      id: 1,
      question: "Terra registra que Pando tiene una cobertura forestal de:",
      options: ["70%", "80%", "90%", "95%"],
      correctAnswer: 2,
    },
    {
      id: 2,
      question: "¿Qué temperatura promedio detecta Terra en Pando?",
      options: ["22°C", "26°C", "30°C", "34°C"],
      correctAnswer: 1,
    },
    {
      id: 3,
      question: "Según Terra, la precipitación anual en Pando es:",
      options: ["1,400 mm", "1,800 mm", "2,200 mm", "2,600 mm"],
      correctAnswer: 1,
    },
    {
      id: 4,
      question: "Terra muestra que Pando tiene una humedad relativa de:",
      options: ["70%", "80%", "90%", "95%"],
      correctAnswer: 1,
    },
    {
      id: 5,
      question: "¿Cuántas especies de árboles por hectárea detecta Terra en Pando?",
      options: ["100", "150", "200", "250"],
      correctAnswer: 2,
    },
  ],
}
