import type { Dialogue } from "./types";

export const GERMAN_DIALOGUES: Dialogue[] = [
  {
    id: "intro",
    title: "Introductions",
    emoji: "👋",
    description: "Say hi, give your name and say where you're from.",
    lines: [
      {
        buddy: "Hallo! Wie heißt du?",
        english: "Hi! What's your name?",
        replies: [
          { text: "Ich heiße {x}.", english: "My name is …" },
          { text: "Ich bin {x}.", english: "I'm …" },
        ],
        tip: "Say \"Ich heiße\" and then your name.",
      },
      {
        buddy: "Freut mich! Wie geht's?",
        english: "Nice to meet you! How are you?",
        replies: [
          { text: "Gut, danke. Und dir?", english: "Good, thanks. And you?" },
          { text: "Sehr gut, danke.", english: "Very good, thanks." },
        ],
      },
      {
        buddy: "Auch gut, danke. Woher kommst du?",
        english: "Good too, thanks. Where are you from?",
        replies: [{ text: "Ich komme aus {x}.", english: "I come from …" }],
        tip: "Say \"Ich komme aus\" and then your country or city.",
      },
      {
        buddy: "Toll! Sprichst du Deutsch?",
        english: "Great! Do you speak German?",
        replies: [
          { text: "Ein bisschen.", english: "A little." },
          { text: "Ich spreche ein bisschen Deutsch.", english: "I speak a little German." },
        ],
      },
      {
        buddy: "Du sprichst schon gut! Also, tschüss!",
        english: "You already speak well! Well, bye!",
        replies: [
          { text: "Tschüss, bis bald!", english: "Bye, see you soon!" },
          { text: "Tschüss!", english: "Bye!" },
        ],
      },
      { buddy: "Bis bald!", english: "See you soon!" },
    ],
  },
  {
    id: "cafe",
    title: "At the café",
    emoji: "☕",
    description: "Order a drink, ask for the check and pay.",
    lines: [
      {
        buddy: "Guten Morgen! Was möchten Sie?",
        english: "Good morning! What would you like?",
        replies: [
          { text: "Einen Kaffee, bitte.", english: "A coffee, please." },
          { text: "Ich möchte einen Tee, bitte.", english: "I would like a tea, please." },
        ],
      },
      {
        buddy: "Gern. Sonst noch etwas?",
        english: "Sure. Anything else?",
        replies: [
          { text: "Ja, ein Wasser, bitte.", english: "Yes, a water, please." },
          { text: "Nein, danke.", english: "No, thank you." },
        ],
      },
      {
        buddy: "Bitte schön.",
        english: "Here you go.",
        replies: [
          { text: "Danke schön.", english: "Thank you very much." },
          { text: "Danke.", english: "Thanks." },
        ],
      },
      {
        buddy: "Schmeckt es Ihnen?",
        english: "Do you like it? (Does it taste good?)",
        replies: [
          { text: "Ja, sehr lecker. Die Rechnung, bitte.", english: "Yes, very tasty. The check, please." },
          { text: "Die Rechnung, bitte.", english: "The check, please." },
        ],
      },
      {
        buddy: "Das macht vier Euro.",
        english: "That's four euros.",
        replies: [
          { text: "Bitte schön. Danke.", english: "Here you go. Thanks." },
          { text: "Danke.", english: "Thanks." },
        ],
      },
      { buddy: "Danke! Auf Wiedersehen!", english: "Thank you! Goodbye!" },
    ],
  },
  {
    id: "directions",
    title: "Asking the way",
    emoji: "🗺️",
    description: "Find the train station and understand left, right and straight.",
    lines: [
      {
        buddy: "Hallo, kann ich helfen?",
        english: "Hi, can I help?",
        replies: [
          { text: "Ja, bitte. Wo ist der Bahnhof?", english: "Yes, please. Where is the train station?" },
          { text: "Wo ist der Bahnhof?", english: "Where is the train station?" },
        ],
      },
      {
        buddy: "Der Bahnhof ist geradeaus und dann rechts.",
        english: "The train station is straight ahead and then right.",
        replies: [
          { text: "Geradeaus und dann rechts?", english: "Straight ahead and then right?" },
          { text: "Entschuldigung, ich verstehe nicht.", english: "Sorry, I don't understand." },
        ],
      },
      {
        buddy: "Ja, geradeaus und dann rechts. Es ist nicht weit.",
        english: "Yes, straight ahead and then right. It's not far.",
        replies: [
          { text: "Vielen Dank!", english: "Thanks a lot!" },
          { text: "Danke.", english: "Thanks." },
        ],
      },
      {
        buddy: "Gern geschehen. Gute Reise!",
        english: "You're welcome. Have a good trip!",
        replies: [
          { text: "Danke, tschüss!", english: "Thanks, bye!" },
          { text: "Tschüss!", english: "Bye!" },
        ],
      },
      { buddy: "Tschüss!", english: "Bye!" },
    ],
  },
  {
    id: "shopping",
    title: "Shopping",
    emoji: "🛍️",
    description: "Buy bread and milk and ask how much it costs.",
    lines: [
      {
        buddy: "Guten Tag! Was brauchen Sie?",
        english: "Hello! What do you need?",
        replies: [
          { text: "Ich brauche Brot, bitte.", english: "I need bread, please." },
          { text: "Brot, bitte.", english: "Bread, please." },
        ],
      },
      {
        buddy: "Bitte schön. Sonst noch etwas?",
        english: "Here you go. Anything else?",
        replies: [
          { text: "Ja, Milch, bitte.", english: "Yes, milk, please." },
          { text: "Nein, danke.", english: "No, thank you." },
        ],
      },
      {
        buddy: "Gut. Ist das alles?",
        english: "Good. Is that all?",
        replies: [
          { text: "Ja, das ist alles. Was kostet das?", english: "Yes, that's all. How much is it?" },
          { text: "Was kostet das?", english: "How much is it?" },
        ],
      },
      {
        buddy: "Das kostet drei Euro.",
        english: "That costs three euros.",
        replies: [
          { text: "Bitte schön.", english: "Here you go." },
          { text: "Danke.", english: "Thank you." },
        ],
      },
      {
        buddy: "Danke! Schönen Tag noch!",
        english: "Thanks! Have a nice day!",
        replies: [
          { text: "Danke, gleichfalls!", english: "Thanks, you too!" },
          { text: "Danke, tschüss!", english: "Thanks, bye!" },
        ],
      },
      { buddy: "Tschüss!", english: "Bye!" },
    ],
  },
];
