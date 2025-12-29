import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Gamepad2, Heart, Timer, Zap } from "lucide-react";
import { Link } from "react-router-dom";

// صفحة ميني غيمز فعلية بدون حكي طويل:
// 1) لعبة صيد القلوب في شبكة مربعات
// 2) لعبة نمط الذاكرة (لمعان مربعات)
// 3) لعبة موازنة أرقام بسيطة بينك وبين توما

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
                لعبة نمط الذاكرة
              </TabButton>
              <TabButton id="spam" activeTab={activeTab} onClick={setActiveTab}>
                لعبة موازنة الأرقام
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

// 2) لعبة نمط الذاكرة: مربعات تومض بتسلسل وتحاولين تعيدينها
const ReactionGame = () => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerInput, setPlayerInput] = useState<number[]>([]);
  const [showing, setShowing] = useState(false);
  const [level, setLevel] = useState(1);
  const [status, setStatus] = useState<string>("اضغطي ابدأ عشان يطلع أول نمط، وحاولي تحفظينه.");

  const GRID = 3; // شبكة 3x3

  const generateNextSequence = (prev: number[]) => {
    const nextCell = Math.floor(Math.random() * GRID * GRID);
    return [...prev, nextCell];
  };

  const playSequence = (seq: number[]) => {
    setShowing(true);
    setPlayerInput([]);
    let index = 0;
    setStatus("ركّزي، المربعات تومض بالترتيب...");

    const interval = window.setInterval(() => {
      if (index >= seq.length) {
        window.clearInterval(interval);
        setShowing(false);
        setStatus("حان دورك، اضغطي على المربعات بنفس الترتيب.");
        return;
      }
      setPlayerInput((prev) => prev); // مجرد تحديث بسيط لتحفيز إعادة الرسم إذا احتجنا
      index += 1;
    }, 650);
  };

  const startGame = () => {
    const firstSeq = generateNextSequence([]);
    setSequence(firstSeq);
    setLevel(1);
    playSequence(firstSeq);
  };

  const handleCellClick = (index: number) => {
    if (showing || sequence.length === 0) return;

    const nextInput = [...playerInput, index];
    setPlayerInput(nextInput);

    const expected = sequence[nextInput.length - 1];
    if (index !== expected) {
      setStatus("غلط بسيط، لا بأس! ارجعي اضغطي ابدأ وجربي من جديد من ليفل 1.");
      setSequence([]);
      setPlayerInput([]);
      setLevel(1);
      return;
    }

    if (nextInput.length === sequence.length) {
      const newLevel = level + 1;
      setLevel(newLevel);
      const newSeq = generateNextSequence(sequence);
      setSequence(newSeq);
      playSequence(newSeq);
      setStatus("برافو! زودنا خطوة جديدة، ركّزي في النمط الجديد.");
    }
  };

  const isHighlighted = (index: number) => {
    if (!showing || sequence.length === 0) return false;
    const currentStep = playerInput.length;
    return sequence[currentStep] === index;
  };

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="inline-flex items-center gap-2 rounded-full bg-secondary/60 px-3 py-1 text-[0.65rem] font-medium text-muted-foreground">
            <Heart className="h-3.5 w-3.5 text-primary" aria-hidden />
            <span>Game · نمط الذاكرة</span>
          </p>
          <p className="text-[0.75rem] text-muted-foreground">
            مربعات صغيرة تومض بترتيب معيّن، وتحاولين تعيدين نفس الترتيب. أنتي وتوما تشوفون مين يوصل لليفل أعلى
            بدون ما يغلط.
          </p>
        </div>
        <button
          type="button"
          onClick={startGame}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-[0.75rem] font-semibold text-primary-foreground shadow-sm hover:shadow-[var(--romantic-card-glow)]"
        >
          <Timer className="h-3.5 w-3.5" aria-hidden />
          ابدأي النمط
        </button>
      </div>

      <div className="flex items-center justify-between text-[0.75rem] text-muted-foreground">
        <span>
          المستوى الحالي: <span className="font-semibold text-primary">Lv {level}</span>
        </span>
        <span className="text-[0.7rem] text-[hsl(var(--romantic-text-soft))]">{status}</span>
      </div>

      <div className="mt-2 grid flex-1 grid-cols-3 gap-2">
        {Array.from({ length: GRID * GRID }).map((_, index) => {
          const highlighted = isHighlighted(index);
          return (
            <button
              key={index}
              type="button"
              onClick={() => handleCellClick(index)}
              className={`flex items-center justify-center rounded-lg border border-border/60 bg-background/70 transition-colors ${
                highlighted ? "bg-[hsl(var(--romantic-heart-soft))]/80" : "hover:bg-secondary/60"
              }`}
            />
          );
        })}
      </div>

      {sequence.length === 0 && (
        <p className="pt-1 text-center text-[0.75rem] text-[hsl(var(--romantic-text-soft))]">
          اضغطي ابدأ عشان يبدأ أول نمط، وكل مرة تنجحين نزود خطوة جديدة وتكبر الذكرى.
        </p>
      )}
    </div>
  );
};

// 3) لعبة موازنة الأرقام: توصّلين لرقم الهدف بعدد حركات محدود
const HeartSpamGame = () => {
  const [target, setTarget] = useState<number>(20 + Math.floor(Math.random() * 21)); // من 20 إلى 40
  const [current, setCurrent] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [maxMoves, setMaxMoves] = useState<number>(7);
  const [status, setStatus] = useState<string>("استخدمي الأزرار عشان توصّلين للرقم الهدف بالضبط قبل ما تخلص الحركات.");

  const reset = () => {
    setTarget(20 + Math.floor(Math.random() * 21));
    setCurrent(0);
    setMoves(0);
    setMaxMoves(7);
    setStatus("جولة جديدة! جربي توصلين للهدف بحسابات ذكية.");
  };

  const applyMove = (delta: number) => {
    if (moves >= maxMoves) {
      setStatus("خلصت حركاتك! اضغطي إعادة المحاولة عشان تبدأون رقم جديد.");
      return;
    }

    const next = current + delta;
    setCurrent(next);
    setMoves((m) => m + 1);

    if (next === target) {
      setStatus("يا سلام! وصلتي للرقم بالضبط، سجّلي عدد الحركات وشوفي مين فيكم الأذكى.");
    } else if (next > target) {
      setStatus("تعديتي الهدف شوي، حاولي تعدلين بالحركات الجاية.");
    } else {
      setStatus("لسا أقل من الهدف، كم حركة تحتاجين عشان توصّلين له؟");
    }
  };

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="inline-flex items-center gap-2 rounded-full bg-secondary/60 px-3 py-1 text-[0.65rem] font-medium text-muted-foreground">
            <Heart className="h-3.5 w-3.5 text-primary" aria-hidden />
            <span>Game · موازنة الأرقام</span>
          </p>
          <p className="text-[0.75rem] text-muted-foreground">
            لعبة هادية تعتمد على التفكير بدل السرعة. أنتي وتوما تحاولون توصلون للرقم الهدف باستخدام أزرار + و-
            بعدد حركات أقل.
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-[0.75rem] font-semibold text-primary-foreground shadow-sm hover:shadow-[var(--romantic-card-glow)]"
        >
          <Timer className="h-3.5 w-3.5" aria-hidden />
          إعادة التحدّي
        </button>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
        <div className="flex flex-col items-center gap-1">
          <p className="text-[0.8rem] text-muted-foreground">الهدف</p>
          <div className="rounded-full bg-secondary/60 px-5 py-2 text-sm font-semibold text-primary">
            {target}
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <p className="text-[0.8rem] text-muted-foreground">رقمك الحالي</p>
          <div className="rounded-full bg-background px-6 py-3 text-lg font-bold text-foreground shadow-md">
            {current}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => applyMove(-3)}
            className="rounded-full bg-secondary/70 px-4 py-1.5 text-sm text-foreground hover:bg-secondary/90"
          >
            -3
          </button>
          <button
            type="button"
            onClick={() => applyMove(-1)}
            className="rounded-full bg-secondary/70 px-4 py-1.5 text-sm text-foreground hover:bg-secondary/90"
          >
            -1
          </button>
          <button
            type="button"
            onClick={() => applyMove(+1)}
            className="rounded-full bg-secondary/70 px-4 py-1.5 text-sm text-foreground hover:bg-secondary/90"
          >
            +1
          </button>
          <button
            type="button"
            onClick={() => applyMove(+3)}
            className="rounded-full bg-secondary/70 px-4 py-1.5 text-sm text-foreground hover:bg-secondary/90"
          >
            +3
          </button>
        </div>

        <div className="space-y-1 text-[0.8rem] text-muted-foreground">
          <p>
            عدد الحركات المستخدمة:
            <span className="ml-1 font-semibold text-primary">{moves}</span> / {maxMoves}
          </p>
          <p className="max-w-xs text-[0.75rem] text-[hsl(var(--romantic-text-soft))]">{status}</p>
        </div>
      </div>
    </div>
  );
};

export default CherryGame;
