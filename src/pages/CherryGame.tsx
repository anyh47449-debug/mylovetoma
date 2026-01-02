import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Gamepad2, Heart, Timer, Zap } from "lucide-react";
import { Link } from "react-router-dom";

// صفحة ميني غيمز فعلية بدون حكي طويل:
// 1) لعبة صيد القلوب في شبكة مربعات
// 2) لعبة تحريك شخصية تجمع كرز
// 3) لعبة لغز قلوب تضوينها كلها

type TabId = "catch" | "reaction" | "spam";

const CherryGame = () => {
  const [activeTab, setActiveTab] = useState<TabId>("catch");

  return (
    <div className="relative min-h-screen overflow-hidden">
      <h1 className="sr-only">ميني غيمز شافطه الي ولمريتي</h1>

      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.5),_transparent_65%)]"
      />

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-4 py-10">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[hsl(var(--romantic-text-soft))] backdrop-blur">
              <Gamepad2 className="h-4 w-4 text-primary" aria-hidden />
              <span>toma galaxy · real mini games</span>
            </div>
            <h2 className="text-lg font-semibold text-foreground">ميني غيمز حقيقية وسريعة</h2>
            <p className="text-xs text-muted-foreground">اختاري لعبة واحدة، وضيعي وقتج الجميل والثمين.</p>
          </div>

          <Link
            to="/games"
            className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-3 py-1 text-xs text-muted-foreground hover:bg-secondary/40"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            رجوع لصفحة الميني غيمز
          </Link>
        </header>

        <section className="grid gap-5 lg:grid-cols-[1.2fr,1fr]">
          <div className="space-y-4">
            {/* Tabs */}
            <div className="inline-flex gap-1 rounded-full bg-secondary/50 p-1 text-[0.7rem]">
              <TabButton id="catch" activeTab={activeTab} onClick={setActiveTab}>
                لعبة صيد القلوب
              </TabButton>
              <TabButton id="reaction" activeTab={activeTab} onClick={setActiveTab}>
                لعبة تجميع الكرز
              </TabButton>
              <TabButton id="spam" activeTab={activeTab} onClick={setActiveTab}>
                لعبة لغز شافط
              </TabButton>
            </div>

            <div className="rounded-2xl border border-border/70 bg-card/90 p-5 shadow-[var(--romantic-card-glow)] backdrop-blur-xl min-h-[280px]">
              {activeTab === "catch" && <HeartCatchGame />}
              {activeTab === "reaction" && <ReactionGame />}
              {activeTab === "spam" && <HeartSpamGame />}
            </div>
          </div>

          <aside className="space-y-4 rounded-2xl border border-border/70 bg-secondary/40 p-5 text-[0.75rem] text-[hsl(var(--romantic-text-soft))] backdrop-blur-xl">
            <h3 className="flex items-center gap-2 text-xs font-semibold tracking-wide text-foreground">
              <Heart className="h-4 w-4 text-primary" aria-hidden />
              طريقة اللعب
            </h3>
            <ul className="space-y-2 list-disc list-inside">
              <li>اختاري لعبة، اقرأي التعليمات القصيرة اللي فوق، وابدئي فوراً.</li>
              <li>سجّلي النقاط أو الوقت لك وله في ورقة أو نوت بالجوال وتحدّوا بعض.</li>
              <li>كل مرة تملّون، بدّلوا اللعبة أو سووا ريمي ماتش على نفس اللعبة.</li>
            </ul>
            <p className="pt-1 text-[0.7rem] text-muted-foreground">اريد حلك.</p>
          </aside>
        </section>
      </main>
    </div>
  );
};

interface TabButtonProps {
  id: TabId;
  activeTab: TabId;
  onClick: (id: TabId) => void;
  children: React.ReactNode;
}

const TabButton = ({ id, activeTab, onClick, children }: TabButtonProps) => (
  <button
    type="button"
    onClick={() => onClick(id)}
    className={`rounded-full px-4 py-1.5 transition ${
      activeTab === id ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:bg-background/40"
    }`}
  >
    {children}
  </button>
);

// 1) لعبة صيد القلوب: قلب واحد يظهر كل نصف ثانية في شبكة 4x4، تحاولين تضغطينه قبل يختفي
const GRID_SIZE = 4;

const HeartCatchGame = () => {
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // ثواني
  const [activeCell, setActiveCell] = useState<number | null>(null);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);

  const resetGame = () => {
    setScore(0);
    setMissed(0);
    setTimeLeft(30);
    setActiveCell(null);
    setRunning(false);
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    if (timerRef.current) window.clearInterval(timerRef.current);
  };

  const startGame = () => {
    resetGame();
    setRunning(true);

    // تحريك القلب بين الخلايا
    intervalRef.current = window.setInterval(() => {
      setActiveCell((prev) => {
        const next = Math.floor(Math.random() * GRID_SIZE * GRID_SIZE);
        if (prev !== null && prev === next) return (next + 1) % (GRID_SIZE * GRID_SIZE);
        return next;
      });
      setMissed((m) => m + 1);
    }, 600);

    // عدّاد الوقت
    timerRef.current = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setRunning(false);
          if (intervalRef.current) window.clearInterval(intervalRef.current);
          if (timerRef.current) window.clearInterval(timerRef.current);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, []);

  const handleCellClick = (index: number) => {
    if (!running) return;
    if (index === activeCell) {
      setScore((s) => s + 1);
      setMissed((m) => (m > 0 ? m - 1 : 0));
      setActiveCell(null);
    }
  };

  const accuracy = useMemo(() => {
    const total = score + missed;
    if (total === 0) return 0;
    return Math.round((score / total) * 100);
  }, [score, missed]);

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="inline-flex items-center gap-2 rounded-full bg-secondary/60 px-3 py-1 text-[0.65rem] font-medium text-muted-foreground">
            <Heart className="h-3.5 w-3.5 text-primary" aria-hidden />
            <span>Game · صيد القلوب</span>
          </p>
          <p className="text-[0.75rem] text-muted-foreground">
            كل شوي يطلع قلب في مربع مختلف. حاولي تضغطينه قبل يروح.والله مادري جت افكر من سويت هيج لعبات يعني كي.
          </p>
        </div>
        <button
          type="button"
          onClick={startGame}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-[0.75rem] font-semibold text-primary-foreground shadow-sm hover:shadow-[var(--romantic-card-glow)]"
        >
          <Timer className="h-3.5 w-3.5" aria-hidden />
          {running ? "إعادة" : "ابدئي الجولة"}
        </button>
      </div>

      <div className="flex items-center justify-between text-[0.75rem] text-muted-foreground">
        <span>
          الوقت المتبقي: <span className="font-semibold text-primary">{timeLeft}s</span>
        </span>
        <span>
          السكور: <span className="font-semibold text-primary">{score}</span> · الدقة: {accuracy}%
        </span>
      </div>

      <div className="mt-2 grid flex-1 grid-cols-4 gap-2">
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
          const isActive = index === activeCell && running;
          return (
            <button
              key={index}
              type="button"
              onClick={() => handleCellClick(index)}
              className={`flex items-center justify-center rounded-lg border border-border/60 bg-background/70 transition-colors ${
                isActive
                  ? "bg-[hsl(var(--romantic-heart-soft))] shadow-[0_0_16px_hsl(var(--romantic-heart-soft))]"
                  : "hover:bg-secondary/60"
              }`}
            >
              {isActive && <Heart className="h-6 w-6 text-primary" aria-hidden />}
            </button>
          );
        })}
      </div>

      {!running && timeLeft === 0 && (
        <p className="pt-1 text-center text-[0.75rem] text-[hsl(var(--romantic-text-soft))]">
          انتهت الجولة!......احبج.
        </p>
      )}
    </div>
  );
};

// 2) لعبة تحريك شخصية تجمع كرز في شبكة 7x7
const ReactionGame = () => {
  const GRID = 7;
  const START_POS = Math.floor((GRID * GRID) / 2);

  const [running, setRunning] = useState(false);
  const [playerPos, setPlayerPos] = useState<number>(START_POS);
  const [cherries, setCherries] = useState<number[]>([]);
  const [movesLeft, setMovesLeft] = useState<number>(20);
  const [score, setScore] = useState<number>(0);

  const generateCherries = () => {
    const positions = new Set<number>();
    while (positions.size < 5) {
      const cell = Math.floor(Math.random() * GRID * GRID);
      if (cell !== START_POS) positions.add(cell);
    }
    return Array.from(positions);
  };

  const startGame = () => {
    setRunning(true);
    setPlayerPos(START_POS);
    setCherries(generateCherries());
    setMovesLeft(20);
    setScore(0);
  };

  const movePlayer = (dx: number, dy: number) => {
    if (!running || movesLeft <= 0) return;

    const row = Math.floor(playerPos / GRID);
    const col = playerPos % GRID;
    const newRow = row + dy;
    const newCol = col + dx;

    if (newRow < 0 || newRow >= GRID || newCol < 0 || newCol >= GRID) return;

    const newPos = newRow * GRID + newCol;
    setPlayerPos(newPos);
    setMovesLeft((m) => m - 1);

    setCherries((prev) => {
      if (prev.includes(newPos)) {
        setScore((s) => s + 1);
        return prev.filter((c) => c !== newPos);
      }
      return prev;
    });
  };

  const isCherry = (index: number) => cherries.includes(index);

  const isOver = !running || movesLeft <= 0 || cherries.length === 0;

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="inline-flex items-center gap-2 rounded-full bg-secondary/60 px-3 py-1 text-[0.65rem] font-medium text-muted-foreground">
            <Heart className="h-3.5 w-3.5 text-primary" aria-hidden />
            <span>Game · تجميع الكرز</span>
          </p>
          <p className="text-[0.75rem] text-muted-foreground">
            حرّكي الشخصية الصغيرة داخل الشبكة عشان تجمعين أكبر عدد ممكن من الكرز قبل ما تخلص حركاتك. هاي جانت المفروض
            تكونن ماريو والله كي
          </p>
        </div>
        <button
          type="button"
          onClick={startGame}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-[0.75rem] font-semibold text-primary-foreground shadow-sm hover:shadow-[var(--romantic-card-glow)]"
        >
          <Timer className="h-3.5 w-3.5" aria-hidden />
          {running ? "إعادة" : "ابدئي الجولة"}
        </button>
      </div>

      <div className="flex items-center justify-between text-[0.75rem] text-muted-foreground">
        <span>
          عدد الكرز: <span className="font-semibold text-primary">{score}</span>
        </span>
        <span>
          الحركات المتبقية: <span className="font-semibold text-primary">{movesLeft}</span>
        </span>
      </div>

      <div className="mt-2 grid flex-1 grid-cols-7 gap-1.5">
        {Array.from({ length: GRID * GRID }).map((_, index) => {
          const isPlayer = index === playerPos;
          const hasCherry = isCherry(index);

          return (
            <div
              key={index}
              className="flex items-center justify-center rounded-lg border border-border/60 bg-background/80 text-sm"
            >
              {isPlayer ? <span aria-hidden>🧸</span> : hasCherry ? <span aria-hidden>🍒</span> : null}
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-2 pt-2 text-sm">
        <button
          type="button"
          onClick={() => movePlayer(0, -1)}
          className="rounded-full bg-secondary/70 px-4 py-1.5 text-foreground hover:bg-secondary/90"
        >
          ↑
        </button>
      </div>
      <div className="flex items-center justify-center gap-4 text-sm">
        <button
          type="button"
          onClick={() => movePlayer(-1, 0)}
          className="rounded-full bg-secondary/70 px-4 py-1.5 text-foreground hover:bg-secondary/90"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => movePlayer(1, 0)}
          className="rounded-full bg-secondary/70 px-4 py-1.5 text-foreground hover:bg-secondary/90"
        >
          →
        </button>
      </div>
      <div className="flex items-center justify-center gap-2 pb-1 text-sm">
        <button
          type="button"
          onClick={() => movePlayer(0, 1)}
          className="rounded-full bg-secondary/70 px-4 py-1.5 text-foreground hover:bg-secondary/90"
        >
          ↓
        </button>
      </div>

      {isOver && (
        <p className="pt-1 text-center text-[0.75rem] text-[hsl(var(--romantic-text-soft))]">الجولة انتهت!هم احبج.</p>
      )}
    </div>
  );
};

// 3) لعبة لغز القلوب: تضوين كل القلوب عن طريق قلب الخانات والجيران
const HeartSpamGame = () => {
  const SIZE = 3;
  const [grid, setGrid] = useState<boolean[]>(() => Array(SIZE * SIZE).fill(false));
  const [moves, setMoves] = useState<number>(0);

  const randomize = () => {
    const next = Array(SIZE * SIZE)
      .fill(false)
      .map(() => Math.random() < 0.5);
    setGrid(next);
    setMoves(0);
  };

  const toggleAt = (index: number) => {
    setGrid((prev) => {
      const next = [...prev];
      const toggle = (i: number) => {
        if (i < 0 || i >= SIZE * SIZE) return;
        next[i] = !next[i];
      };

      const row = Math.floor(index / SIZE);
      const col = index % SIZE;

      toggle(index);
      if (col > 0) toggle(index - 1);
      if (col < SIZE - 1) toggle(index + 1);
      if (row > 0) toggle(index - SIZE);
      if (row < SIZE - 1) toggle(index + SIZE);

      return next;
    });
    setMoves((m) => m + 1);
  };

  const allOn = grid.every((cell) => cell);

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="inline-flex items-center gap-2 rounded-full bg-secondary/60 px-3 py-1 text-[0.65rem] font-medium text-muted-foreground">
            <Heart className="h-3.5 w-3.5 text-primary" aria-hidden />
            <span>Game · لغز القلوب</span>
          </p>
          <p className="text-[0.75rem] text-muted-foreground">
            كل خانة فيها قلب يطفي ويولع، وإذا ضغطتي وحدة يتأثر معها جيرانها. الهدف تضوين كل القلوب بأقل عدد ممكن من
            الحركات.
          </p>
        </div>
        <button
          type="button"
          onClick={randomize}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-[0.75rem] font-semibold text-primary-foreground shadow-sm hover:shadow-[var(--romantic-card-glow)]"
        >
          <Timer className="h-3.5 w-3.5" aria-hidden />
          لغز جديد
        </button>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
        <div className="grid grid-cols-3 gap-2">
          {grid.map((on, index) => (
            <button
              key={index}
              type="button"
              onClick={() => toggleAt(index)}
              className={`flex h-14 w-14 items-center justify-center rounded-xl border border-border/70 text-xl transition-colors ${
                on
                  ? "bg-[hsl(var(--romantic-heart-soft))] text-primary-foreground"
                  : "bg-background/80 text-muted-foreground hover:bg-secondary/60"
              }`}
            >
              <Heart className="h-6 w-6" aria-hidden />
            </button>
          ))}
        </div>

        <div className="space-y-1 text-[0.8rem] text-muted-foreground">
          <p>
            عدد الحركات:
            <span className="ml-1 font-semibold text-primary">{moves}</span>
          </p>
          <p className="max-w-xs text-[0.75rem] text-[hsl(var(--romantic-text-soft))]">
            {allOn
              ? "لوّعتي كل القلوب! سجّلي عدد الحركات لك وله وشوفي مين يحل اللغز بأقل عدد."
              : "حاولي ترتبين ضغطاتك عشان توصّلين لوضع كل القلوب منوّرة."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CherryGame;
