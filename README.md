# Pomodoro Foco

A pomodoro timer with nothing extra. Start a 25 minute focus block, take a 5 minute break, repeat.

## Why

Every timer I tried had accounts, charts and notifications. This one opens, counts and closes.

## Usage

```bash
npm install
npm run dev
```

## How it works

A single `useEffect` interval drives the countdown. The completed session count is kept in `localStorage` so it survives a refresh. The layout is plain CSS, no UI library.

## License

MIT.
