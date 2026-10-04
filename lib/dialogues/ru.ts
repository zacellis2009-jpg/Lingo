import type { Dialogue } from "./types";

export const RUSSIAN_DIALOGUES: Dialogue[] = [
  {
    id: "intro",
    title: "Introductions",
    emoji: "👋",
    description: "Say hi, give your name and say where you're from.",
    lines: [
      {
        buddy: "Приве́т! Как тебя́ зову́т?",
        english: "Hi! What's your name?",
        replies: [
          { text: "Меня́ зову́т {x}.", english: "My name is …" },
          { text: "Я {x}.", english: "I'm …" },
        ],
        tip: "Say \"Меня́ зову́т\" (menyá zovút) and then your name.",
      },
      {
        buddy: "О́чень прия́тно! Как дела́?",
        english: "Nice to meet you! How are you?",
        replies: [
          { text: "Хорошо́, спаси́бо. А у тебя́?", english: "Good, thanks. And you?" },
          { text: "Хорошо́, спаси́бо.", english: "Good, thanks." },
        ],
      },
      {
        buddy: "То́же хорошо́. Отку́да ты?",
        english: "Good too. Where are you from?",
        replies: [{ text: "Я из {x}.", english: "I'm from …" }],
        tip: "Say \"Я из\" and then your country. Russian changes the ending (из Аме́рики), but any try counts here.",
      },
      {
        buddy: "Здо́рово! Ты говори́шь по-ру́сски?",
        english: "Cool! Do you speak Russian?",
        replies: [
          { text: "Немно́го.", english: "A little." },
          { text: "Я немно́го говорю́ по-ру́сски.", english: "I speak a little Russian." },
        ],
      },
      {
        buddy: "Ты хорошо́ говори́шь! Ну, пока́!",
        english: "You speak well! Well, bye!",
        replies: [
          { text: "Пока́! До встре́чи!", english: "Bye! See you!" },
          { text: "Пока́!", english: "Bye!" },
        ],
      },
      { buddy: "До встре́чи!", english: "See you!" },
    ],
  },
  {
    id: "cafe",
    title: "At the café",
    emoji: "☕",
    description: "Order a drink, ask for the check and pay.",
    lines: [
      {
        buddy: "Здра́вствуйте! Что вы хоти́те?",
        english: "Hello! What would you like?",
        replies: [
          { text: "Ко́фе, пожа́луйста.", english: "Coffee, please." },
          { text: "Я хочу́ чай, пожа́луйста.", english: "I want tea, please." },
        ],
      },
      {
        buddy: "Хорошо́. Что́-нибудь ещё?",
        english: "OK. Anything else?",
        replies: [
          { text: "Да, во́ду, пожа́луйста.", english: "Yes, water, please." },
          { text: "Нет, спаси́бо.", english: "No, thank you." },
        ],
        tip: "вода́ (water) becomes во́ду when you ask for it.",
      },
      {
        buddy: "Вот, пожа́луйста.",
        english: "Here you go.",
        replies: [
          { text: "Спаси́бо большо́е.", english: "Thank you very much." },
          { text: "Спаси́бо.", english: "Thank you." },
        ],
      },
      {
        buddy: "Всё хорошо́?",
        english: "Is everything OK?",
        replies: [
          { text: "Да, о́чень вку́сно. Счёт, пожа́луйста.", english: "Yes, very tasty. The check, please." },
          { text: "Счёт, пожа́луйста.", english: "The check, please." },
        ],
      },
      {
        buddy: "Две́сти рубле́й.",
        english: "Two hundred rubles.",
        replies: [
          { text: "Вот, пожа́луйста. Спаси́бо.", english: "Here you go. Thanks." },
          { text: "Спаси́бо.", english: "Thanks." },
        ],
      },
      { buddy: "Спаси́бо! До свида́ния!", english: "Thank you! Goodbye!" },
    ],
  },
  {
    id: "directions",
    title: "Asking the way",
    emoji: "🗺️",
    description: "Find the metro and understand left, right and straight.",
    lines: [
      {
        buddy: "Здра́вствуйте! Вам помо́чь?",
        english: "Hello! Can I help you?",
        replies: [
          { text: "Да, пожа́луйста. Где метро́?", english: "Yes, please. Where is the metro?" },
          { text: "Где метро́?", english: "Where is the metro?" },
        ],
      },
      {
        buddy: "Метро́ пря́мо и пото́м напра́во.",
        english: "The metro is straight ahead and then right.",
        replies: [
          { text: "Пря́мо и напра́во?", english: "Straight and right?" },
          { text: "Извини́те, я не понима́ю.", english: "Sorry, I don't understand." },
        ],
      },
      {
        buddy: "Да, пря́мо и напра́во. Э́то бли́зко.",
        english: "Yes, straight and right. It's close.",
        replies: [
          { text: "Спаси́бо большо́е!", english: "Thank you very much!" },
          { text: "Спаси́бо.", english: "Thanks." },
        ],
      },
      {
        buddy: "Не́ за что. Хоро́шего дня!",
        english: "You're welcome. Have a good day!",
        replies: [
          { text: "Спаси́бо, до свида́ния!", english: "Thanks, goodbye!" },
          { text: "До свида́ния!", english: "Goodbye!" },
        ],
      },
      { buddy: "До свида́ния!", english: "Goodbye!" },
    ],
  },
  {
    id: "shopping",
    title: "Shopping",
    emoji: "🛍️",
    description: "Buy bread and milk and ask how much it costs.",
    lines: [
      {
        buddy: "Здра́вствуйте! Что вам ну́жно?",
        english: "Hello! What do you need?",
        replies: [
          { text: "Хлеб, пожа́луйста.", english: "Bread, please." },
          { text: "Мне ну́жен хлеб.", english: "I need bread." },
        ],
      },
      {
        buddy: "Вот, пожа́луйста. Что́-нибудь ещё?",
        english: "Here you go. Anything else?",
        replies: [
          { text: "Да, молоко́, пожа́луйста.", english: "Yes, milk, please." },
          { text: "Нет, спаси́бо.", english: "No, thank you." },
        ],
      },
      {
        buddy: "Хорошо́. Э́то всё?",
        english: "OK. Is that all?",
        replies: [
          { text: "Да, э́то всё. Ско́лько сто́ит?", english: "Yes, that's all. How much is it?" },
          { text: "Ско́лько сто́ит?", english: "How much is it?" },
        ],
      },
      {
        buddy: "Сто рубле́й.",
        english: "One hundred rubles.",
        replies: [
          { text: "Вот, пожа́луйста.", english: "Here you go." },
          { text: "Спаси́бо.", english: "Thank you." },
        ],
      },
      {
        buddy: "Спаси́бо! Хоро́шего дня!",
        english: "Thank you! Have a good day!",
        replies: [
          { text: "Спаси́бо, вам то́же!", english: "Thanks, you too!" },
          { text: "До свида́ния!", english: "Goodbye!" },
        ],
      },
      { buddy: "До свида́ния!", english: "Goodbye!" },
    ],
  },
];
