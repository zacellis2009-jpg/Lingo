# 🦜 Lingo Buddy

A friendly language buddy for **Spanish 🇪🇸, German 🇩🇪 and Russian 🇷🇺**, built for complete beginners. Works on your phone and computer. **No API key, no account, no cost.**

- **Today's words**: 7 new beginner words a day (70 per language) with audio, example sentences and tips.
- **Conversations**: 7 real-life role-plays per language (introductions, café, directions, shopping, hotel, restaurant, small talk). Your buddy speaks a line, then you answer by speaking 🎙️ or typing, and the app checks your answer.
  - *Easy* mode shows the phrases you can say.
  - *Challenge* mode only shows the English, so you say it from memory.
- **Review**: spaced-repetition flashcards, so words come back right before you'd forget them.
- **Free talk**: copy-ready tutor instructions for the Claude app's voice mode, for open conversation about anything. They include the words you're learning in Lingo.
- **Russian helpers**: stress marks (приве́т), Latin letters under the Cyrillic (*privét*), an on-screen Cyrillic keyboard, and you can type answers in Latin letters ("menya zovut Zac").
- **Progress**: day streak, words known, and phrases you got stuck on.
- **Phone ↔ computer**: copy a progress code (or save a file) on one device and add it on the other. Progress from both is combined, so nothing is lost.

## Run it on your computer

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Put it online (phone + computer)

The easiest way is [Vercel](https://vercel.com), which is free for personal projects:

1. Sign in to Vercel with GitHub and click **Add New → Project**.
2. Import this repo.
3. Click **Deploy**. You get a link like `https://lingo-xxxx.vercel.app`.

On your phone, open the link and use **Share → Add to Home Screen** (iPhone) or **⋮ → Add to Home screen** (Android) so it opens like an app.

## Voice notes

Voice uses your browser's built-in speech features (free, no setup):

| Browser | Listening (speech → text) | Speaking (text → speech) |
|---|---|---|
| Chrome (computer, Android) | ✅ | ✅ |
| Safari (iPhone, iPad, Mac) | ✅ | ✅ |
| Firefox | ❌ (type instead) | ✅ |

Tips:
- Allow microphone access when your browser asks.
- If a voice sounds wrong, install that language's voice in your phone or computer settings (e.g. iPhone: Settings → Accessibility → Spoken Content → Voices).
- Speech recognition (on both Chrome and Safari) may send audio to Apple's or Google's servers to turn it into text.

## How it's built

- [Next.js](https://nextjs.org) (App Router) + TypeScript + Tailwind CSS, all running in the browser
- Progress is saved in the browser's local storage (`lib/store.ts`)
- Conversations: `lib/dialogues/`; answer checking that forgives accents, typos and small speech-recognition slips: `lib/match.ts`
- Spaced repetition: a small SM-2 style scheduler (`lib/srs.ts`)
- Word lists: `lib/words/`

## Roadmap

- [ ] Automatic syncing between devices (needs a free account, e.g. Supabase)
- [ ] More conversations and words
- [ ] Hands-free mode (auto-listen after each line)
