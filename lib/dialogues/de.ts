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
  {
    id: "hotel",
    title: "At the hotel",
    emoji: "🏨",
    description: "Check in, say how many nights, and ask about breakfast.",
    lines: [
      {
        buddy: "Guten Abend! Willkommen im Hotel.",
        english: "Good evening! Welcome to the hotel.",
        replies: [
          { text: "Guten Abend. Ich habe eine Reservierung.", english: "Good evening. I have a reservation." },
          { text: "Hallo, ich habe eine Reservierung.", english: "Hi, I have a reservation." },
        ],
      },
      {
        buddy: "Sehr gut. Wie ist Ihr Name?",
        english: "Very good. What is your name?",
        replies: [
          { text: "Mein Name ist {x}.", english: "My name is …" },
          { text: "Ich heiße {x}.", english: "I'm called …" },
        ],
      },
      {
        buddy: "Danke. Für wie viele Nächte?",
        english: "Thanks. For how many nights?",
        replies: [
          { text: "Für {x} Nächte.", english: "For … nights." },
          { text: "Für eine Nacht.", english: "For one night." },
        ],
        tip: "Use a number: zwei, drei, vier…",
      },
      {
        buddy: "Hier ist Ihr Schlüssel. Zimmer zehn.",
        english: "Here is your key. Room ten.",
        replies: [
          { text: "Danke. Wann gibt es Frühstück?", english: "Thanks. When is breakfast?" },
          { text: "Wann gibt es Frühstück?", english: "When is breakfast?" },
        ],
      },
      {
        buddy: "Frühstück gibt es ab sieben Uhr.",
        english: "Breakfast is from seven o'clock.",
        replies: [
          { text: "Super, danke.", english: "Great, thanks." },
          { text: "Vielen Dank.", english: "Thanks a lot." },
        ],
      },
      { buddy: "Gern geschehen. Einen schönen Aufenthalt!", english: "You're welcome. Enjoy your stay!" },
    ],
  },
  {
    id: "restaurant",
    title: "At a restaurant",
    emoji: "🍽️",
    description: "Get a table, order food and a drink, and say it was tasty.",
    lines: [
      {
        buddy: "Guten Abend! Ein Tisch für wie viele Personen?",
        english: "Good evening! A table for how many people?",
        replies: [
          { text: "Für zwei Personen, bitte.", english: "For two people, please." },
          { text: "Für eine Person, bitte.", english: "For one person, please." },
        ],
      },
      {
        buddy: "Hier ist die Speisekarte. Was möchten Sie essen?",
        english: "Here is the menu. What would you like to eat?",
        replies: [
          { text: "Ich möchte das Schnitzel, bitte.", english: "I'd like the schnitzel, please." },
          { text: "Einen Salat, bitte.", english: "A salad, please." },
        ],
      },
      {
        buddy: "Und zu trinken?",
        english: "And to drink?",
        replies: [
          { text: "Ein Wasser, bitte.", english: "A water, please." },
          { text: "Ein Bier, bitte.", english: "A beer, please." },
          { text: "Ein Glas Rotwein, bitte.", english: "A glass of red wine, please." },
        ],
      },
      {
        buddy: "Schmeckt es Ihnen?",
        english: "Do you like it? (Does it taste good?)",
        replies: [
          { text: "Ja, es ist sehr lecker!", english: "Yes, it's very tasty!" },
          { text: "Sehr gut, danke.", english: "Very good, thanks." },
        ],
      },
      {
        buddy: "Das freut mich. Möchten Sie noch ein Dessert?",
        english: "I'm glad. Would you like a dessert?",
        replies: [
          { text: "Nein, danke. Die Rechnung, bitte.", english: "No, thanks. The check, please." },
          { text: "Ja, ein Eis, bitte.", english: "Yes, an ice cream, please." },
        ],
      },
      {
        buddy: "Sehr gern. Bitte schön.",
        english: "Of course. Here you go.",
        replies: [
          { text: "Danke, alles war sehr lecker!", english: "Thanks, everything was delicious!" },
          { text: "Danke.", english: "Thanks." },
        ],
      },
      { buddy: "Vielen Dank! Bis bald!", english: "Thank you! See you soon!" },
    ],
  },
  {
    id: "smalltalk",
    title: "Small talk",
    emoji: "☀️",
    description: "Chat with a new friend about hobbies, family and coffee.",
    lines: [
      {
        buddy: "Hallo! Wie geht's?",
        english: "Hi! How's it going?",
        replies: [
          { text: "Gut, und dir?", english: "Good, and you?" },
          { text: "Sehr gut, danke.", english: "Very good, thanks." },
        ],
      },
      {
        buddy: "Auch gut. Was machst du gern?",
        english: "Good too. What do you like doing?",
        replies: [
          { text: "Ich lese gern.", english: "I like reading." },
          { text: "Ich höre gern Musik.", english: "I like listening to music." },
          { text: "Ich {x} gern.", english: "I like …ing" },
        ],
        tip: "\"gern\" after a verb means you like doing it: Ich koche gern (I like cooking).",
      },
      {
        buddy: "Cool! Hast du Geschwister?",
        english: "Cool! Do you have siblings?",
        replies: [
          { text: "Ja, ich habe einen Bruder.", english: "Yes, I have a brother." },
          { text: "Ja, ich habe eine Schwester.", english: "Yes, I have a sister." },
          { text: "Nein, ich habe keine Geschwister.", english: "No, I don't have siblings." },
        ],
      },
      {
        buddy: "Trinkst du lieber Kaffee oder Tee?",
        english: "Do you prefer coffee or tea?",
        replies: [
          { text: "Lieber Kaffee.", english: "Coffee." },
          { text: "Lieber Tee.", english: "Tea." },
        ],
      },
      {
        buddy: "Ich auch! Also, ich muss los. Bis morgen!",
        english: "Me too! Well, I have to go. See you tomorrow!",
        replies: [
          { text: "Bis morgen!", english: "See you tomorrow!" },
          { text: "Tschüss, bis morgen!", english: "Bye, see you tomorrow!" },
        ],
      },
      { buddy: "Tschüss!", english: "Bye!" },
    ],
  },
];
