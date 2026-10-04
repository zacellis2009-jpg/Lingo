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
  {
    id: "hotel",
    title: "At the hotel",
    emoji: "🏨",
    description: "Check in, say how many nights, and ask about breakfast.",
    lines: [
      {
        buddy: "¡Buenas tardes! Bienvenido al hotel.",
        english: "Good afternoon! Welcome to the hotel.",
        replies: [
          { text: "Buenas tardes. Tengo una reserva.", english: "Good afternoon. I have a reservation." },
          { text: "Hola, tengo una reserva.", english: "Hi, I have a reservation." },
        ],
      },
      {
        buddy: "Muy bien. ¿Cómo se llama?",
        english: "Very good. What's your name?",
        replies: [
          { text: "Me llamo {x}.", english: "My name is …" },
          { text: "Soy {x}.", english: "I'm …" },
        ],
        tip: "\"¿Cómo se llama?\" is the polite way to ask someone's name.",
      },
      {
        buddy: "Perfecto. ¿Para cuántas noches?",
        english: "Perfect. For how many nights?",
        replies: [
          { text: "Para {x} noches.", english: "For … nights." },
          { text: "Para una noche.", english: "For one night." },
        ],
        tip: "Use a number: dos, tres, cuatro…",
      },
      {
        buddy: "Aquí tiene la llave. Es la habitación diez.",
        english: "Here's the key. It's room ten.",
        replies: [
          { text: "Gracias. ¿A qué hora es el desayuno?", english: "Thanks. What time is breakfast?" },
          { text: "¿A qué hora es el desayuno?", english: "What time is breakfast?" },
        ],
      },
      {
        buddy: "El desayuno es a las ocho.",
        english: "Breakfast is at eight.",
        replies: [
          { text: "Muy bien, gracias.", english: "Very good, thanks." },
          { text: "Perfecto, gracias.", english: "Perfect, thanks." },
        ],
      },
      { buddy: "¡De nada! Que disfrute su estancia.", english: "You're welcome! Enjoy your stay." },
    ],
  },
  {
    id: "restaurant",
    title: "At a restaurant",
    emoji: "🍽️",
    description: "Get a table, order food and a drink, and say it was tasty.",
    lines: [
      {
        buddy: "¡Hola! ¿Mesa para cuántos?",
        english: "Hi! A table for how many?",
        replies: [
          { text: "Para dos, por favor.", english: "For two, please." },
          { text: "Para uno, por favor.", english: "For one, please." },
        ],
      },
      {
        buddy: "Aquí está la carta. ¿Qué quiere comer?",
        english: "Here's the menu. What would you like to eat?",
        replies: [
          { text: "Quiero la paella, por favor.", english: "I want the paella, please." },
          { text: "Una ensalada, por favor.", english: "A salad, please." },
        ],
      },
      {
        buddy: "¿Y para beber?",
        english: "And to drink?",
        replies: [
          { text: "Agua, por favor.", english: "Water, please." },
          { text: "Una cerveza, por favor.", english: "A beer, please." },
          { text: "Un vino tinto, por favor.", english: "A red wine, please." },
        ],
      },
      {
        buddy: "¿Qué tal la comida?",
        english: "How's the food?",
        replies: [
          { text: "¡Está muy rica!", english: "It's very tasty!" },
          { text: "Muy buena, gracias.", english: "Very good, thanks." },
        ],
      },
      {
        buddy: "Me alegro. ¿Quiere un postre?",
        english: "I'm glad. Would you like a dessert?",
        replies: [
          { text: "No, gracias. La cuenta, por favor.", english: "No, thanks. The check, please." },
          { text: "Sí, un helado, por favor.", english: "Yes, an ice cream, please." },
        ],
      },
      {
        buddy: "Muy bien. Aquí tiene.",
        english: "Very good. Here you go.",
        replies: [
          { text: "Gracias, ¡todo muy rico!", english: "Thanks, everything was delicious!" },
          { text: "Gracias.", english: "Thanks." },
        ],
      },
      { buddy: "¡Gracias a usted! ¡Hasta pronto!", english: "Thank you! See you soon!" },
    ],
  },
  {
    id: "smalltalk",
    title: "Small talk",
    emoji: "☀️",
    description: "Chat with a new friend about hobbies, family and coffee.",
    lines: [
      {
        buddy: "¡Hola! ¿Qué tal?",
        english: "Hi! How's it going?",
        replies: [
          { text: "Bien, ¿y tú?", english: "Good, and you?" },
          { text: "Muy bien, gracias.", english: "Very good, thanks." },
        ],
      },
      {
        buddy: "Muy bien. ¿Qué te gusta hacer?",
        english: "Very good. What do you like to do?",
        replies: [
          { text: "Me gusta leer.", english: "I like reading." },
          { text: "Me gusta la música.", english: "I like music." },
          { text: "Me gusta {x}.", english: "I like …" },
        ],
      },
      {
        buddy: "¡Qué bien! ¿Tienes hermanos?",
        english: "Nice! Do you have brothers or sisters?",
        replies: [
          { text: "Sí, tengo un hermano.", english: "Yes, I have a brother." },
          { text: "Sí, tengo una hermana.", english: "Yes, I have a sister." },
          { text: "No, no tengo hermanos.", english: "No, I don't have siblings." },
        ],
      },
      {
        buddy: "¿Te gusta más el café o el té?",
        english: "Do you like coffee or tea more?",
        replies: [
          { text: "Me gusta más el café.", english: "I like coffee more." },
          { text: "Me gusta más el té.", english: "I like tea more." },
        ],
      },
      {
        buddy: "¡Yo también! Bueno, tengo que irme. ¡Hasta mañana!",
        english: "Me too! Well, I have to go. See you tomorrow!",
        replies: [
          { text: "¡Hasta mañana!", english: "See you tomorrow!" },
          { text: "Adiós, ¡hasta mañana!", english: "Bye, see you tomorrow!" },
        ],
      },
      { buddy: "¡Chao!", english: "Bye!" },
    ],
  },
];
