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
  {
    id: "hotel",
    title: "At the hotel",
    emoji: "🏨",
    description: "Check in, say how many nights, and ask about breakfast.",
    lines: [
      {
        buddy: "До́брый ве́чер! Добро́ пожа́ловать в оте́ль.",
        english: "Good evening! Welcome to the hotel.",
        replies: [
          { text: "До́брый ве́чер. У меня́ бронь.", english: "Good evening. I have a reservation." },
          { text: "Здра́вствуйте, у меня́ бронь.", english: "Hello, I have a reservation." },
        ],
      },
      {
        buddy: "Хорошо́. Как ва́ша фами́лия?",
        english: "OK. What is your last name?",
        replies: [
          { text: "Моя́ фами́лия {x}.", english: "My last name is …" },
          { text: "Меня́ зову́т {x}.", english: "My name is …" },
        ],
      },
      {
        buddy: "Спаси́бо. На ско́лько ноче́й?",
        english: "Thank you. For how many nights?",
        replies: [
          { text: "На две но́чи.", english: "For two nights." },
          { text: "На три но́чи.", english: "For three nights." },
          { text: "На одну́ ночь.", english: "For one night." },
        ],
      },
      {
        buddy: "Вот ваш ключ. Ко́мната де́сять.",
        english: "Here is your key. Room ten.",
        replies: [
          { text: "Спаси́бо. Когда́ за́втрак?", english: "Thanks. When is breakfast?" },
          { text: "Когда́ за́втрак?", english: "When is breakfast?" },
        ],
      },
      {
        buddy: "За́втрак в семь часо́в.",
        english: "Breakfast is at seven o'clock.",
        replies: [
          { text: "Хорошо́, спаси́бо.", english: "OK, thanks." },
          { text: "Спаси́бо большо́е.", english: "Thank you very much." },
        ],
      },
      { buddy: "Пожа́луйста. Хоро́шего о́тдыха!", english: "You're welcome. Have a nice stay!" },
    ],
  },
  {
    id: "restaurant",
    title: "At a restaurant",
    emoji: "🍽️",
    description: "Get a table, order food and a drink, and say it was tasty.",
    lines: [
      {
        buddy: "До́брый ве́чер! Сто́лик на ско́лько челове́к?",
        english: "Good evening! A table for how many people?",
        replies: [
          { text: "На двои́х, пожа́луйста.", english: "For two, please." },
          { text: "На одного́, пожа́луйста.", english: "For one, please." },
        ],
      },
      {
        buddy: "Вот меню́. Что бу́дете зака́зывать?",
        english: "Here's the menu. What will you order?",
        replies: [
          { text: "Борщ, пожа́луйста.", english: "Borscht, please." },
          { text: "Я хочу́ сала́т, пожа́луйста.", english: "I want a salad, please." },
        ],
      },
      {
        buddy: "А что бу́дете пить?",
        english: "And what will you drink?",
        replies: [
          { text: "Во́ду, пожа́луйста.", english: "Water, please." },
          { text: "Чай, пожа́луйста.", english: "Tea, please." },
          { text: "Пи́во, пожа́луйста.", english: "Beer, please." },
        ],
      },
      {
        buddy: "Вам нра́вится?",
        english: "Do you like it?",
        replies: [
          { text: "Да, о́чень вку́сно!", english: "Yes, very tasty!" },
          { text: "Да, спаси́бо.", english: "Yes, thank you." },
        ],
      },
      {
        buddy: "Отли́чно! Хоти́те десе́рт?",
        english: "Great! Would you like dessert?",
        replies: [
          { text: "Нет, спаси́бо. Счёт, пожа́луйста.", english: "No, thanks. The check, please." },
          { text: "Да, моро́женое, пожа́луйста.", english: "Yes, ice cream, please." },
        ],
      },
      {
        buddy: "Коне́чно. Вот, пожа́луйста.",
        english: "Of course. Here you go.",
        replies: [
          { text: "Спаси́бо, всё бы́ло о́чень вку́сно!", english: "Thanks, everything was delicious!" },
          { text: "Спаси́бо.", english: "Thanks." },
        ],
      },
      { buddy: "Спаси́бо! Приходи́те ещё!", english: "Thank you! Come again!" },
    ],
  },
  {
    id: "smalltalk",
    title: "Small talk",
    emoji: "☀️",
    description: "Chat with a new friend about hobbies, family and coffee.",
    lines: [
      {
        buddy: "Приве́т! Как дела́?",
        english: "Hi! How are you?",
        replies: [
          { text: "Хорошо́, а у тебя́?", english: "Good, and you?" },
          { text: "Отли́чно, спаси́бо.", english: "Great, thanks." },
        ],
      },
      {
        buddy: "То́же хорошо́. Что ты лю́бишь де́лать?",
        english: "Good too. What do you like to do?",
        replies: [
          { text: "Я люблю́ чита́ть.", english: "I like reading." },
          { text: "Я люблю́ му́зыку.", english: "I love music." },
          { text: "Я люблю́ {x}.", english: "I like …" },
        ],
      },
      {
        buddy: "Здо́рово! У тебя́ есть брат и́ли сестра́?",
        english: "Cool! Do you have a brother or sister?",
        replies: [
          { text: "Да, у меня́ есть брат.", english: "Yes, I have a brother." },
          { text: "Да, у меня́ есть сестра́.", english: "Yes, I have a sister." },
          { text: "Нет, у меня́ нет.", english: "No, I don't." },
        ],
      },
      {
        buddy: "Ты лю́бишь ко́фе и́ли чай?",
        english: "Do you like coffee or tea?",
        replies: [
          { text: "Я люблю́ ко́фе.", english: "I like coffee." },
          { text: "Я люблю́ чай.", english: "I like tea." },
        ],
      },
      {
        buddy: "Я то́же! Ну, мне пора́. До за́втра!",
        english: "Me too! Well, I have to go. See you tomorrow!",
        replies: [
          { text: "До за́втра!", english: "See you tomorrow!" },
          { text: "Пока́, до за́втра!", english: "Bye, see you tomorrow!" },
        ],
      },
      { buddy: "Пока́!", english: "Bye!" },
    ],
  },
];
