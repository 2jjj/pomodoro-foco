import { useEffect, useState } from 'react';
import './App.css';

const FOCUS = 25 * 60;
const BREAK = 5 * 60;

function format(seconds: number) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return m + ':' + s;
}

export default function App() {
  const [mode, setMode] = useState<'focus' | 'break'>('focus');
  const [left, setLeft] = useState(FOCUS);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(() => Number(localStorage.getItem('sessions') || 0));

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setLeft((value) => {
        if (value > 1) return value - 1;
        const nextMode = mode === 'focus' ? 'break' : 'focus';
        if (mode === 'focus') {
          setSessions((count) => {
            const next = count + 1;
            localStorage.setItem('sessions', String(next));
            return next;
          });
        }
        setMode(nextMode);
        setRunning(false);
        return nextMode === 'focus' ? FOCUS : BREAK;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [running, mode]);

  function reset() {
    setRunning(false);
    setLeft(mode === 'focus' ? FOCUS : BREAK);
  }

  function switchMode(next: 'focus' | 'break') {
    setMode(next);
    setRunning(false);
    setLeft(next === 'focus' ? FOCUS : BREAK);
  }

  return (
    <main className="shell">
      <header>
        <span className="brand">foco</span>
        <span className="sessions">{sessions} sessoes</span>
      </header>

      <section className="timer">
        <div className="tabs">
          <button className={mode === 'focus' ? 'active' : ''} onClick={() => switchMode('focus')}>
            foco
          </button>
          <button className={mode === 'break' ? 'active' : ''} onClick={() => switchMode('break')}>
            pausa
          </button>
        </div>
        <strong className="clock">{format(left)}</strong>
        <div className="controls">
          <button className="primary" onClick={() => setRunning((value) => !value)}>
            {running ? 'pausar' : 'comecar'}
          </button>
          <button onClick={reset}>zerar</button>
        </div>
      </section>

      <footer>um bloco de cada vez</footer>
    </main>
  );
}
