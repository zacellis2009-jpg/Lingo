import type { Dialogue } from "./types";

export const SPANISH_DIALOGUES: Dialogue[] = [
  {
    id: "intro",
    title: "Introductions",
    emoji: "👋",
    description: "Say hi, give your name and say where you're from.",
    lines: [
      {
        buddy: "¡Hola! ¿Cómo te llamas?",
        english: "Hi! What's your name?",
        replies: [
          { text: "Me llamo {x}.", english: "My name is …" },
          { text: "Soy {x}.", english: "I'm …" },
        ],
        tip: "Say \"Me llamo\" and then your name.",
      },
      {
        buddy: "¡Mucho gusto! ¿Cómo estás?",
        english: "Nice to meet you! How are you?",
        replies: [
          { text: "Bien, gracias. ¿Y tú?", english: "Fine, thanks. And you?" },
          { text: "Muy bien, gracias.", english: "Very well, thanks." },
        ],
      },
      {
        buddy: "Muy bien, gracias. ¿De dónde eres?",
        english: "Very well, thanks. Where are you from?",
        replies: [{ text: "Soy de {x}.", english: "I'm from …" }],
        tip: "Say \"Soy de\" and then your country or city.",
      },
      {
        buddy: "¡Qué bien! ¿Hablas español?",
        english: "How nice! Do you speak Spanish?",
        replies: [
          { text: "Un poco.", english: "A little." },
          { text: "Hablo un poco de español.", english: "I speak a little Spanish." },
        ],
      },
      {
        buddy: "¡Hablas muy bien! Bueno, ¡hasta luego!",
        english: "You speak very well! Well, see you later!",
        replies: [
          { text: "Adiós, ¡hasta luego!", english: "Bye, see you later!" },
          { text: "¡Hasta luego!", english: "See you later!" },
        ],
      },
      { buddy: "¡Adiós!", english: "Bye!" },
    ],
  },
  {
    id: "cafe",
    title: "At the café",
    emoji: "☕",
    description: "Order a drink, ask for the check and pay.",
    lines: [
      {
        buddy: "¡Buenos días! ¿Qué quiere tomar?",
        english: "Good morning! What would you like to have?",
        replies: [
          { text: "Un café, por favor.", english: "A coffee, please." },
          { text: "Quiero un té, por favor.", english: "I want a tea, please." },
        ],
      },
      {
        buddy: "Muy bien. ¿Algo más?",
        english: "Very good. Anything else?",
        replies: [
          { text: "Sí, agua, por favor.", english: "Yes, water, please." },
          { text: "No, gracias.", english: "No, thank you." },
        ],
      },
      {
        buddy: "Aquí tiene.",
        english: "Here you go.",
        replies: [
          { text: "Muchas gracias.", english: "Thank you very much." },
          { text: "Gracias.", english: "Thank you." },
        ],
      },
      {
        buddy: "¿Está todo bien?",
        english: "Is everything OK?",
        replies: [
          { text: "Sí, muy rico. La cuenta, por favor.", english: "Yes, very tasty. The check, please." },
          { text: "La cuenta, por favor.", english: "The check, please." },
        ],
      },
      {
        buddy: "Son cuatro euros.",
        english: "That's four euros.",
        replies: [
          { text: "Aquí tiene. Gracias.", english: "Here you go. Thanks." },
          { text: "Gracias.", english: "Thanks." },
        ],
      },
      { buddy: "¡Gracias a usted! ¡Adiós!", english: "Thank you! Goodbye!" },
    ],
  },
  {
    id: "directions",
    title: "Asking the way",
    emoji: "🗺️",
    description: "Find the metro and understand left, right and straight.",
    lines: [
      {
        buddy: "Hola, ¿necesitas ayuda?",
        english: "Hi, do you need help?",
        replies: [
          { text: "Sí, por favor. ¿Dónde está el metro?", english: "Yes, please. Where is the metro?" },
          { text: "¿Dónde está el metro?", english: "Where is the metro?" },
        ],
      },
      {
        buddy: "El metro está todo recto y a la derecha.",
        english: "The metro is straight ahead and to the right.",
        replies: [
          { text: "¿Todo recto y a la derecha?", english: "Straight ahead and to the right?" },
          { text: "Perdón, no entiendo.", english: "Sorry, I don't understand." },
        ],
      },
      {
        buddy: "Sí, todo recto y a la derecha. Está cerca.",
        english: "Yes, straight ahead and to the right. It's close.",
        replies: [
          { text: "Muchas gracias.", english: "Thank you very much." },
          { text: "Gracias.", english: "Thanks." },
        ],
      },
      {
        buddy: "De nada. ¡Buen viaje!",
        english: "You're welcome. Have a good trip!",
        replies: [
          { text: "Gracias, ¡adiós!", english: "Thanks, bye!" },
          { text: "Adiós.", english: "Bye." },
        ],
      },
      { buddy: "¡Adiós!", english: "Bye!" },
    ],
  },
  {
    id: "shopping",
    title: "Shopping",
    emoji: "🛍️",
    description: "Buy bread and milk and ask how much it costs.",
    lines: [
      {
        buddy: "¡Hola! ¿Qué necesita?",
        english: "Hi! What do you need?",
        replies: [
          { text: "Necesito pan, por favor.", english: "I need bread, please." },
          { text: "Pan, por favor.", english: "Bread, please." },
        ],
      },
      {
        buddy: "Aquí tiene. ¿Algo más?",
        english: "Here you go. Anything else?",
        replies: [
          { text: "Sí, leche, por favor.", english: "Yes, milk, please." },
          { text: "No, gracias.", english: "No, thank you." },
        ],
      },
      {
        buddy: "Muy bien. ¿Es todo?",
        english: "Very good. Is that all?",
        replies: [
          { text: "Sí, es todo. ¿Cuánto cuesta?", english: "Yes, that's all. How much is it?" },
          { text: "¿Cuánto cuesta?", english: "How much is it?" },
        ],
      },
      {
        buddy: "Son tres euros.",
        english: "That's three euros.",
        replies: [
          { text: "Aquí tiene.", english: "Here you go." },
          { text: "Gracias.", english: "Thank you." },
        ],
      },
      {
        buddy: "Gracias. ¡Que tenga un buen día!",
        english: "Thank you. Have a nice day!",
        replies: [
          { text: "Igualmente, ¡adiós!", english: "You too, bye!" },
          { text: "Gracias, adiós.", english: "Thanks, bye." },
        ],
      },
      { buddy: "¡Adiós!", english: "Bye!" },
    ],
  },
];
