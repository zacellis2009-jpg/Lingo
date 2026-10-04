import type { Word } from "./types";

type Entry = Omit<Word, "id" | "source">;

// Stress is marked with an acute accent (е́). Native texts don't show it,
// but it's a big help while learning.
const entries: Entry[] = [
  { word: "приве́т", translation: "hi (informal)", example: "Приве́т! Как дела́?", exampleTranslation: "Hi! How are you?" },
  { word: "здра́вствуйте", translation: "hello (formal)", example: "Здра́вствуйте! Меня́ зову́т А́нна.", exampleTranslation: "Hello! My name is Anna.", translit: "zdrástvuyte", note: "The first в is silent." },
  { word: "пока́", translation: "bye", example: "Пока́, до за́втра!", exampleTranslation: "Bye, see you tomorrow!" },
  { word: "спаси́бо", translation: "thank you", example: "Спаси́бо большо́е!", exampleTranslation: "Thank you very much!" },
  { word: "пожа́луйста", translation: "please / you're welcome", example: "Ко́фе, пожа́луйста.", exampleTranslation: "Coffee, please.", translit: "pozháluysta" },
  { word: "да", translation: "yes", example: "Да, я хочу́ чай.", exampleTranslation: "Yes, I want tea." },
  { word: "нет", translation: "no", example: "Нет, спаси́бо.", exampleTranslation: "No, thank you.", translit: "nyet" },
  { word: "извини́те", translation: "excuse me / sorry", example: "Извини́те, где туале́т?", exampleTranslation: "Excuse me, where is the restroom?" },
  { word: "меня́ зову́т…", translation: "my name is…", example: "Меня́ зову́т Зак.", exampleTranslation: "My name is Zac.", note: "Literally \"they call me…\"." },
  { word: "как дела́?", translation: "how are you?", example: "Приве́т, как дела́?", exampleTranslation: "Hi, how are you?" },
  { word: "хорошо́", translation: "good / well / OK", example: "Всё хорошо́.", exampleTranslation: "Everything is fine.", translit: "kharashó", note: "Unstressed о sounds like \"a\"." },
  { word: "вода́", translation: "water", example: "Я пью во́ду.", exampleTranslation: "I drink water.", translit: "vadá" },
  { word: "еда́", translation: "food", example: "Еда́ о́чень вку́сная.", exampleTranslation: "The food is very tasty." },
  { word: "чай", translation: "tea", example: "Я люблю́ чай.", exampleTranslation: "I love tea." },
  { word: "ко́фе", translation: "coffee", example: "Я пью ко́фе у́тром.", exampleTranslation: "I drink coffee in the morning." },
  { word: "хлеб", translation: "bread", example: "Хлеб на столе́.", exampleTranslation: "The bread is on the table.", translit: "khlep" },
  { word: "дом", translation: "house / home", example: "Мой дом большо́й.", exampleTranslation: "My house is big." },
  { word: "друг", translation: "friend", example: "Он мой друг.", exampleTranslation: "He is my friend.", translit: "druk" },
  { word: "ма́ма", translation: "mom", example: "Ма́ма до́ма.", exampleTranslation: "Mom is at home." },
  { word: "па́па", translation: "dad", example: "Па́па рабо́тает.", exampleTranslation: "Dad is working." },
  { word: "ко́шка", translation: "cat", example: "Ко́шка спит.", exampleTranslation: "The cat is sleeping." },
  { word: "соба́ка", translation: "dog", example: "У меня́ есть соба́ка.", exampleTranslation: "I have a dog.", translit: "sabáka" },
  { word: "кни́га", translation: "book", example: "Э́то хоро́шая кни́га.", exampleTranslation: "This is a good book." },
  { word: "оди́н", translation: "one", example: "Оди́н ко́фе, пожа́луйста.", exampleTranslation: "One coffee, please.", translit: "adín" },
  { word: "два", translation: "two", example: "Два ча́я, пожа́луйста.", exampleTranslation: "Two teas, please." },
  { word: "три", translation: "three", example: "У меня́ три кни́ги.", exampleTranslation: "I have three books." },
  { word: "я", translation: "I", example: "Я студе́нт.", exampleTranslation: "I am a student." },
  { word: "ты", translation: "you (informal)", example: "Ты говори́шь по-англи́йски?", exampleTranslation: "Do you speak English?" },
  { word: "есть", translation: "to eat", example: "Я хочу́ есть.", exampleTranslation: "I'm hungry. (I want to eat.)", note: "Also means \"there is / to have\" in у меня́ есть." },
  { word: "пить", translation: "to drink", example: "Я хочу́ пить.", exampleTranslation: "I'm thirsty. (I want to drink.)" },
  { word: "говори́ть", translation: "to speak", example: "Я говорю́ по-англи́йски.", exampleTranslation: "I speak English." },
  { word: "я хочу́", translation: "I want", example: "Я хочу́ ко́фе.", exampleTranslation: "I want coffee." },
  { word: "большо́й", translation: "big", example: "Э́то большо́й го́род.", exampleTranslation: "This is a big city.", translit: "bal'shóy" },
  { word: "ма́ленький", translation: "small", example: "У меня́ ма́ленькая ко́шка.", exampleTranslation: "I have a small cat.", note: "Ending changes with gender: -ий (m), -ая (f), -ое (n)." },
  { word: "сего́дня", translation: "today", example: "Сего́дня хоро́шая пого́да.", exampleTranslation: "The weather is nice today.", translit: "sivódnya", note: "The г is pronounced like a v." },
  { word: "за́втра", translation: "tomorrow", example: "До за́втра!", exampleTranslation: "See you tomorrow!" },
  { word: "где?", translation: "where?", example: "Где метро́?", exampleTranslation: "Where is the metro?" },
  { word: "что?", translation: "what?", example: "Что э́то?", exampleTranslation: "What is this?", translit: "shto" },
  { word: "туале́т", translation: "restroom / toilet", example: "Где туале́т?", exampleTranslation: "Where is the restroom?" },
  { word: "счёт", translation: "the bill / check", example: "Счёт, пожа́луйста.", exampleTranslation: "The check, please.", translit: "shchyot" },
];

export const RUSSIAN_STARTER: Word[] = entries.map((e, i) => ({
  ...e,
  id: `ru-starter-${i}`,
  source: "starter",
}));
