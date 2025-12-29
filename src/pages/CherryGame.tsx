import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Gamepad2, Heart, Timer, Zap } from "lucide-react";
import { Link } from "react-router-dom";

// صفحة ميني غيمز فعلية بدون حكي طويل:
// 1) لعبة صيد القلوب (تضغطين على قلب يطلع بمكان عشوائي قبل يختفي)
// 2) لعبة سرعة رد الفعل (تنتظرين الإشارة وتضغطين بأسرع ما يمكن)
// 3) لعبة ضغط سريع على القلب خلال 10 ثواني

type TabId = "catch" | "reaction" | "spam";

const CherryGame = () => {
  const [activeTab, setActiveTab] = useState<TabId>("catch");

  return (
    <div className="relative min-h-screen overflow-hidden">
      <h1 className="sr-only">ميني غيمز فعلية بسيطة بينك وبين توما</h1>

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
            <p className="text-xs text-muted-foreground">
              اختاري لعبة واحدة، عدّي الوقت أو النقاط، وتحدّوا بعض أنتي وتوما مين يفوز أكثر.
            </p>
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
                لعبة سرعة رد الفعل
              </TabButton>
              <TabButton id="spam" activeTab={activeTab} onClick={setActiveTab}>
                لعبة عدّاد الضغط
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
            <p className="pt-1 text-[0.7rem] text-muted-foreground">
              لو حبيتي النمط هذا، نقدر نضيف ألعاب زيادة (متاهة بسيطة، لعبة ذاكرة، إلخ) لاحقاً.
            </p>
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
      activeTab === id
        ? "bg-primary text-primary-foreground shadow"
        : "text-muted-foreground hover:bg-background/40"
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
            كل شوي يطلع قلب في مربع مختلف. حاولي تضغطينه قبل يروح. أنتي وتوما تتسابقون مين يجيب سكُور أعلى خلال 30 ثانية.
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
                isActive ? "bg-[hsl(var(--romantic-heart-soft))]/80" : "hover:bg-secondary/50"
              }`}
            >
              {isActive && <Heart className="h-5 w-5 text-primary-foreground" aria-hidden />}
            </button>
          );
        })}
      </div>

      {!running && timeLeft === 0 && (
        <p className="pt-1 text-center text-[0.75rem] text-[hsl(var(--romantic-text-soft))]">
          انتهت الجولة! اكتبي سكُورك وسكُور توما، وشوفي مين بطل صيد القلوب.
        </p>
      )}
    </div>
  );
};

// 2) لعبة سرعة رد الفعل: تنتظرين اللون يتحول للأخضر، ثم تضغطين بأسرع ما يمكن
const ReactionGame = () => {
  const [state, setState] = useState<"idle" | "waiting" | "ready" | "done">("idle");
  const [result, setResult] = useState<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const reset = () => {
    setState("idle");
    setResult(null);
    startTimeRef.current = null;
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
  };

  const start = () => {
    reset();
    setState("waiting");
    const delay = 1000 + Math.random() * 3000; // بين ثانية و4
    timeoutRef.current = window.setTimeout(() => {
      startTimeRef.current = performance.now();
      setState("ready");
    }, delay);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleClickArea = () => {
    if (state === "waiting") {
      // ضغطتِ بدري
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      setState("done");
      setResult(-1);
    } else if (state === "ready" && startTimeRef.current) {
      const diff = performance.now() - startTimeRef.current;
      setResult(Math.round(diff));
      setState("done");
    }
  };

  let message = "اضغطي Start واتبعي التعليمات.";
  if (state === "waiting") message = "لا تضغطين لسه… استعدي.";
  if (state === "ready") message = "اضغطي الآن فوراً!";
  if (state === "done" && result !== null) {
    if (result === -1) message = "ضغطتِ بدري! أعيدي المحاولة وخلي توما يشوف مين أهدى واحد.";
    else if (result < 200) message = `ردّة فعل مجنونة! ${result}ms`;
    else if (result < 350) message = `مرة سريعة، أحس يدك متعودة على الألعاب. ${result}ms`;
    else message = `كويسة، بس تقدرين تحسنين أكثر. ${result}ms`;
  }

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="inline-flex items-center gap-2 rounded-full bg-secondary/60 px-3 py-1 text-[0.65rem] font-medium text-muted-foreground">
            <Zap className="h-3.5 w-3.5 text-primary" aria-hidden />
            <span>Game · سرعة رد الفعل</span>
          </p>
          <p className="text-[0.75rem] text-muted-foreground">
            شغّلوا اللعبة واحد واحد. اضغطي Start، انتظري اللون يتحوّل، ثم اضغطي بأسرع ما تقدرين وشوفي الوقت بالملي ثانية.
          </p>
        </div>
        <button
          type="button"
          onClick={start}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-[0.75rem] font-semibold text-primary-foreground shadow-sm hover:shadow-[var(--romantic-card-glow)]"
        >
          <Timer className="h-3.5 w-3.5" aria-hidden />
          Start
        </button>
      </div>

      <div className="flex-1">
        <button
          type="button"
          onClick={handleClickArea}
          className={`flex h-44 w-full items-center justify-center rounded-2xl border border-border/60 text-sm font-semibold transition-colors ${
            state === "ready"
              ? "bg-emerald-500 text-primary-foreground"
              : state === "waiting"
              ? "bg-yellow-500/80 text-black"
              : "bg-background/80 text-foreground hover:bg-secondary/60"
          }`}
        >
          {state === "idle" && "هنا تضغطين لما يقول لك اضغطي."}
          {state === "waiting" && "لا تضغطين… لسه!"}
          {state === "ready" && "اضغطي الآن الآن الآن!"}
          {state === "done" && result !== null &&
            (result === -1 ? "ضغطتِ بدري!" : `${result}ms`)}
        </button>
      </div>

      <p className="text-center text-[0.75rem] text-[hsl(var(--romantic-text-soft))]">
        جرّبي أكثر من مرة، وخلي توما يسوي نفس الشيء، وشوفوا مين عنده ردّة فعل أسرع.
      </p>
    </div>
  );
};

// 3) لعبة عدّاد الضغط: 10 ثواني تحاولين تضغطين القلب قد ما تقدرين
const HeartSpamGame = () => {
  const [timeLeft, setTimeLeft] = useState(10);
  const [count, setCount] = useState(0);
  const [running, setRunning] = useState(false);
  const timerRef = useRef<number | null>(null);

  const start = () => {
    if (running) return;
    setCount(0);
    setTimeLeft(10);
    setRunning(true);
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setRunning(false);
          if (timerRef.current) window.clearInterval(timerRef.current);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, []);

  const handleClick = () => {
    if (!running) return;
    setCount((c) => c + 1);
  };

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="inline-flex items-center gap-2 rounded-full bg-secondary/60 px-3 py-1 text-[0.65rem] font-medium text-muted-foreground">
            <Heart className="h-3.5 w-3.5 text-primary" aria-hidden />
            <span>Game · عدّاد الضغط</span>
          </p>
          <p className="text-[0.75rem] text-muted-foreground">
            عندك 10 ثواني فقط. اضغطي على القلب بسرعة قد ما تقدرين وشوفي كم توصلي، وبعدين خليه هو يحاول يكسر رقمك.
          </p>
        </div>
        <button
          type="button"
          onClick={start}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-[0.75rem] font-semibold text-primary-foreground shadow-sm hover:shadow-[var(--romantic-card-glow)]"
        >
          <Timer className="h-3.5 w-3.5" aria-hidden />
          ابدئي الجولة
        </button>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <button
          type="button"
          onClick={handleClick}
          className={`inline-flex h-24 w-24 items-center justify-center rounded-full text-primary-foreground shadow-[0_0_40px_rgba(0,0,0,0.6)] transition ${
            running
              ? "bg-gradient-to-br from-primary to-accent hover:scale-105 hover:shadow-[var(--romantic-card-glow)]"
              : "bg-secondary/70 opacity-80"
          }`}
        >
          <Heart className="h-12 w-12" aria-hidden />
        </button>
        <div className="text-center">
          <div className="text-xs text-muted-foreground">الوقت المتبقي</div>
          <div className="text-2xl font-semibold text-primary">{timeLeft}s</div>
          <div className="mt-3 text-xs text-muted-foreground">العدّاد</div>
          <div className="text-2xl font-semibold text-foreground">{count}</div>
        </div>
      </div>

      {!running && timeLeft === 0 && (
        <p className="text-center text-[0.75rem] text-[hsl(var(--romantic-text-soft))]">
          اكتبي رقمك ورقم توما، وشوفي مين عنده أصابع أسرع.
        </p>
      )}
    </div>
  );
};

export default CherryGame;
