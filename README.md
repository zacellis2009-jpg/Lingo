# 🦜 Lingo Buddy

A friendly AI language buddy for **Spanish 🇪🇸, German 🇩🇪 and Russian 🇷🇺**, built for complete beginners. Works on your phone and computer.

- **Practice chat**: talk (🎙️ voice mode) or type with an AI tutor in role-play scenarios (café, introductions, directions, shopping, hotel). Replies are read aloud, mistakes are corrected gently, and every reply suggests simple things you could say next.
- **Tap any word** in a reply to see what it means and add it to your words.
- **Today's words**: 7 new beginner words a day with audio, example sentences and tips. Tap "Teach me" for more words on any topic.
- **Review**: spaced-repetition flashcards, so words come back right before you'd forget them.
- **Russian helpers**: stress marks (приве́т), Latin letters under the Cyrillic (*privét*), and an on-screen Cyrillic keyboard.
- **Progress**: day streak, words known, and your recent corrections.

Words, flashcards and progress work without an API key. The practice chat, word lookups and "Teach me" need a Claude API key.

## Run it on your computer

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
cp .env.example .env.local   # then put your API key in .env.local
npm run dev
```

Open http://localhost:3000.

## Getting a Claude API key

1. Go to https://console.anthropic.com and sign up.
2. Add some credit under **Billing**. A few dollars lasts a long time for personal practice.
3. Open **API Keys**, create a key, and paste it into `.env.local`:
   ```
   ANTHROPIC_API_KEY=sk-ant-...
   ```
4. Restart `npm run dev`.

Keep the key secret. It only lives on the server and is never sent to the browser.

## Put it online (phone + computer)

The easiest way is [Vercel](https://vercel.com), which is free for personal projects:

1. Sign in to Vercel with GitHub and click **Add New → Project**.
2. Import the `lingo-buddy` repo.
3. Under **Environment Variables**, add `ANTHROPIC_API_KEY` with your key.
4. Click **Deploy**. You get a link like `https://lingo-buddy-xxxx.vercel.app`.

On your phone, open the link and use **Share → Add to Home Screen** (iPhone) or **⋮ → Add to Home screen** (Android) so it opens like an app.

> The link is public, so anyone who has it could use your API credit. Don't share it. Adding a login is on the roadmap.

## Voice mode notes

Voice uses your browser's built-in speech features (free, no extra setup):

| Browser | Listening (speech → text) | Speaking (text → speech) |
|---|---|---|
| Chrome (computer, Android) | ✅ | ✅ |
| Safari (iPhone, iPad, Mac) | ✅ | ✅ |
| Firefox | ❌ | ✅ |

Tips:
- Allow microphone access when your browser asks.
- If a voice sounds wrong, install the language's voice in your phone or computer settings (e.g. iPhone: Settings → Accessibility → Spoken Content → Voices).
- Tap the language name under the mic button to switch to speaking English when you're stuck.

## How it's built

- [Next.js](https://nextjs.org) (App Router) + TypeScript + Tailwind CSS
- Claude API via the official [`@anthropic-ai/sdk`](https://github.com/anthropics/anthropic-sdk-typescript), with structured JSON replies (`lib/claude.ts`, prompts in `lib/prompts.ts`)
- Progress is saved in the browser's local storage (`lib/store.ts`)
- Spaced repetition: a small SM-2 style scheduler (`lib/srs.ts`)
- Starter word lists: `lib/words/`

The model defaults to `claude-opus-5-5` at low effort for fast replies. Set `CLAUDE_MODEL` to use a different one.

## Roadmap

- [ ] Login and syncing progress between phone and computer (Supabase)
- [ ] Higher-quality AI voices
- [ ] Hands-free voice mode (auto-listen after each reply)
- [ ] Pronunciation feedback
