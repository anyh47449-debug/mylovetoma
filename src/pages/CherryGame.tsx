import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Gamepad2, Heart, Timer, Zap } from "lucide-react";
import { Link } from "react-router-dom";

// صفحة ميني غيمز فعلية بدون حكي طويل:
// 1) لعبة صيد القلوب في شبكة مربعات
// 2) لعبة كرز طاير تحاولين تصيدينه
// 3) لعبة ردة فعل سريعة تقيس سرعة ضغطك

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
                لعبة كرز طاير
              </TabButton>
              <TabButton id="spam" activeTab={activeTab} onClick={setActiveTab}>
                لعبة ردة الفعل
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

// 2) لعبة كرز طاير: قطعة كرز تطير في المساحة وتحاولين تصيدينها
const ReactionGame = () => {
  const [running, setRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const [hits, setHits] = useState(0);
  const [shots, setShots] = useState(0);
  const [pos, setPos] = useState({ x: 50, y: 50 }); // نسبة مئوية داخل الصندوق
  const timerRef = useRef<number | null>(null);
  const moveRef = useRef<number | null>(null);

  const reset = () => {
    setRunning(false);
    setTimeLeft(20);
    setHits(0);
    setShots(0);
    setPos({ x: 50, y: 50 });
    if (timerRef.current) window.clearInterval(timerRef.current);
    if (moveRef.current) window.clearInterval(moveRef.current);
  };

  const start = () => {
    reset();
    setRunning(true);

    timerRef.current = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setRunning(false);
          if (timerRef.current) window.clearInterval(timerRef.current);
          if (moveRef.current) window.clearInterval(moveRef.current);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    moveRef.current = window.setInterval(() => {
      setPos({
        x: 10 + Math.random() * 80,
        y: 10 + Math.random() * 80,
      });
    }, 700);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      if (moveRef.current) window.clearInterval(moveRef.current);
    };
  }, []);

  const handleHit = () => {
    if (!running) return;
    setHits((h) => h + 1);
    setShots((s) => s + 1);
    setPos({ x: 10 + Math.random() * 80, y: 10 + Math.random() * 80 });
  };

  const accuracy = useMemo(() => {
    if (shots === 0) return 0;
    return Math.round((hits / shots) * 100);
  }, [hits, shots]);

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="inline-flex items-center gap-2 rounded-full bg-secondary/60 px-3 py-1 text-[0.65rem] font-medium text-muted-foreground">
            <Zap className="h-3.5 w-3.5 text-primary" aria-hidden />
            <span>Game · كرز طاير</span>
          </p>
          <p className="text-[0.75rem] text-muted-foreground">
            قطعة كرز صغيرة تطير في المساحة، كل ما قدرتِ تضغطينها قبل ما تغيّر مكانها يزيد عدّاد الكرز
            الملتقط. عندك 20 ثانية، أنتي وتوما تتسابقون مين يجمع أكثر كرز.
          </p>
        </div>
        <button
          type="button"
          onClick={start}
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
          عدد الكرز: <span className="font-semibold text-primary">{hits}</span> · الدقة: {accuracy}%
        </span>
      </div>

      <div className="relative mt-2 flex-1 rounded-2xl border border-border/60 bg-background/80">
        <button
          type="button"
          onClick={handleHit}
          style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: "translate(-50%, -50%)" }}
          className="absolute flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--romantic-heart-soft))] text-primary-foreground shadow-md hover:scale-105 transition"
        >
          <span className="text-lg" aria-hidden>
            🍒
          </span>
        </button>
      </div>

      {!running && timeLeft === 0 && (
        <p className="pt-1 text-center text-[0.75rem] text-[hsl(var(--romantic-text-soft))]">
          الجلسة خلصت! سجّلي عدد حبات الكرز اللي جمعتِها أنتي وتوما، وشوفي مين صيّاد الكرز الأسطوري.
        </p>
      )}
    </div>
  );
};

// 3) لعبة ردة فعل سريعة: تقيسين سرعة ضغطك بعد إشارة الانطلاق
const HeartSpamGame = () => {
  const [running, setRunning] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [message, setMessage] = useState<string>("لما تضغطين ابدأ، انتظري كلمة (اضغطي الآن!) ثم اضغطي بأسرع ما تقدرين.");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const reset = () => {
    setRunning(false);
    setWaiting(false);
    setMessage("لما تضغطين ابدأ، انتظري كلمة (اضغطي الآن!) ثم اضغطي بأسرع ما تقدرين.");
    setStartTime(null);
    setReactionTime(null);
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
  };

  const start = () => {
    reset();
    setRunning(true);
    setWaiting(true);
    const delay = 1000 + Math.random() * 2000; // من 1 إلى 3 ثواني
    timeoutRef.current = window.setTimeout(() => {
      setWaiting(false);
      setMessage("اضغطي الآن!");
      setStartTime(performance.now());
    }, delay);
  };

  const handleClick = () => {
    if (!running) return;

    // ضغطتِ بدري قبل الإشارة
    if (waiting) {
      setMessage("استعجلتِ! لا تضغطين إلا لما تشوفين (اضغطي الآن!). جربي من جديد.");
      setRunning(false);
      setWaiting(false);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      return;
    }

    if (startTime != null) {
      const end = performance.now();
      const time = Math.round(end - startTime);
      setReactionTime(time);
      setBestTime((prev) => (prev == null || time < prev ? time : prev));
      setRunning(false);
      setMessage("حلو! جربي تعيدين وتشوفين إذا تقدرين تصيرين أسرع.");
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="inline-flex items-center gap-2 rounded-full bg-secondary/60 px-3 py-1 text-[0.65rem] font-medium text-muted-foreground">
            <Zap className="h-3.5 w-3.5 text-primary" aria-hidden />
            <span>Game · ردة فعل الحب</span>
          </p>
          <p className="text-[0.75rem] text-muted-foreground">
            أنتي وتوما تشوفون مين أسرع واحد في ردة الفعل. اضغطي ابدأ، انتظري الإشارة، واضغطي الزر بأسرع ما
            تقدرين بعد كلمة (اضغطي الآن!).
          </p>
        </div>
        <button
          type="button"
          onClick={start}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-[0.75rem] font-semibold text-primary-foreground shadow-sm hover:shadow-[var(--romantic-card-glow)]"
        >
          <Timer className="h-3.5 w-3.5" aria-hidden />
          {running ? "إعادة" : "ابدئي الجولة"}
        </button>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
        <p className="max-w-xs text-[0.8rem] text-[hsl(var(--romantic-text-soft))]">{message}</p>

        <button
          type="button"
          onClick={handleClick}
          className="inline-flex min-w-[200px] items-center justify-center rounded-full bg-[hsl(var(--romantic-heart-soft))] px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md hover:scale-105 transition"
        >
          {waiting ? "... استعدي" : running ? "اضغطي الآن!" : "اضغطي لقياس ردّة الفعل"}
        </button>

        <div className="space-y-1 text-[0.8rem] text-muted-foreground">
          <p>
            آخر نتيجة:
            <span className="ml-1 font-semibold text-primary">
              {reactionTime != null ? `${reactionTime}ms` : "—"}
            </span>
          </p>
          <p>
            أسرع نتيجة لك:
            <span className="ml-1 font-semibold text-primary">
              {bestTime != null ? `${bestTime}ms` : "—"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CherryGame;
