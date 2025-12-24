import { useEffect, useRef, useState } from "react";
import { Heart, Gamepad2, Sparkles, MessagesSquare, Stars } from "lucide-react";
import marioCoinSfx from "../assets/mario-coin.mp3";

const MiniGames = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <h1 className="sr-only">صفحة الميني غيمز الرومنسية لتوما</h1>

      {/* subtle background glow */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.45),_transparent_65%)]"
      />

      <main className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-4 py-12">
        <header className="space-y-4 text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[hsl(var(--romantic-text-soft))] backdrop-blur">
            <Gamepad2 className="h-4 w-4 text-primary" aria-hidden />
            <span>toma galaxy · mini games</span>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              هنا كوكب الألعاب البنفسجي حقّك أنتي وتوما؛ اختاري اللعبة اللي تعجبك وخلي قلبك يلعب قبال قلبه.
            </p>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 animate-enter">
          {/* Game 1: Cherry Collector (Mario-style) */}
          <CherryCollectorCard />

          {/* Game 2: Random Love Letters */}
          <article className="group relative flex flex-col justify-between rounded-2xl border border-border/70 bg-card/90 p-5 shadow-[0_18px_40px_rgba(0,0,0,0.55)] backdrop-blur-xl">
            <div className="pointer-events-none absolute inset-x-0 -top-10 h-24 bg-[radial-gradient(circle_at_top,_hsl(var(--primary))_0%,_transparent_70%)] opacity-50 group-hover:opacity-80" />
            <div className="relative space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary/60 px-3 py-1 text-[0.65rem] font-medium text-muted-foreground">
                <MessagesSquare className="h-3.5 w-3.5 text-accent" aria-hidden />
                <span>Game 2 · Love Letters</span>
              </div>
              <h2 className="text-base font-semibold text-foreground">رسائل حب عشوائية لتوما</h2>
              <p className="text-xs text-muted-foreground">
                لعبة زر واحد: كل ضغطة تطلع رسالة مختلفة مصاغة بحب لتوما؛ نقدر نضيف لاحقاً رسائلك الخاصة.
              </p>
            </div>
            <p className="mt-4 rounded-xl bg-secondary/40 px-3 py-2 text-[0.7rem] text-[hsl(var(--romantic-text-soft))]">
              مثال رسالة: "في كل مرّة أغمض عيني، المدينة الوحيدة اللي أشوفها هي مدينة اسمها توما." ✦
            </p>
          </article>

          {/* Game 3: Hearts Match */}
          <article className="group relative flex flex-col justify-between rounded-2xl border border-border/70 bg-card/90 p-5 backdrop-blur-xl">
            <div className="pointer-events-none absolute -right-10 -bottom-12 h-32 w-32 rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--romantic-heart-soft)),transparent_70%)] opacity-60 group-hover:opacity-85" />
            <div className="relative space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary/60 px-3 py-1 text-[0.65rem] font-medium text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden />
                <span>Game 3 · Hearts Match</span>
              </div>
              <h2 className="text-base font-semibold text-foreground">تطابق القلوب البنفسجية</h2>
              <p className="text-xs text-muted-foreground">
                تختاري صفات فيك وفي توما، واللعبة تعطيكم نسبة تطابق (دائماً 100%) مع جملة حب صغيرة.
              </p>
            </div>
            <p className="mt-4 text-[0.7rem] text-muted-foreground/90">
              هنا لاحقاً نضيف اختيارات مثل: "ألطف شيء تحبيه فيه"، "أول موقف ما نسيتيه"… إلخ.
            </p>
          </article>

          {/* Game 4: Memory of Us */}
          <article className="group relative flex flex-col justify-between rounded-2xl border border-border/70 bg-gradient-to-br from-secondary/80 via-card/90 to-secondary/70 p-5 backdrop-blur-xl">
            <div className="relative space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary/60 px-3 py-1 text-[0.65rem] font-medium text-muted-foreground">
                <Stars className="h-3.5 w-3.5 text-accent" aria-hidden />
                <span>Game 4 · Memory Of Us</span>
              </div>
              <h2 className="text-base font-semibold text-foreground">ذكرياتنا البنفسجية</h2>
              <p className="text-xs text-muted-foreground">
                لعبة بطاقات؛ كل كرت فيه سؤال عن ذكرياتكم أو لحظة معيّنة، تجاوبوا عليها مع بعض وأنتم قدام الشاشة.
              </p>
            </div>
            <p className="mt-4 text-[0.7rem] text-[hsl(var(--romantic-text-soft))]">
              لاحقاً: نقدر نضيف أسئلة مخصصة تكتبينها بنفسك، وتطلع بشكل عشوائي في الكروت.
            </p>
          </article>

          {/* Game 5: Secret Message */}
          <article className="group relative flex flex-col justify-between rounded-2xl border border-dashed border-border/70 bg-background/70 p-5 backdrop-blur-xl">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),_transparent_55%)] opacity-70 group-hover:opacity-90" />
            <div className="relative space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary/60 px-3 py-1 text-[0.65rem] font-medium text-muted-foreground">
                <Heart className="h-3.5 w-3.5 text-primary" aria-hidden />
                <span>Game 5 · Secret Message</span>
              </div>
              <h2 className="text-base font-semibold text-foreground">رسالة سرّية من قلبك لقلب توما</h2>
              <p className="text-xs text-muted-foreground">
                مساحة للعبة أخيرة نخصصها تماماً لفكرتك أنت؛ رسالة مشفّرة، أو لعبة تخمين، أو أي شيء تتخيليه.
              </p>
            </div>
            <p className="mt-4 text-[0.7rem] text-muted-foreground/90">
              قولي لي الفكرة اللي في بالك، ونحوّل هذا الكرت للعبة كاملة تلعبوها أنتي وتوما سوا.
            </p>
          </article>
        </section>
      </main>
    </div>
  );
};

interface CherryCollectorGameState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  onGround: boolean;
}

const GRAVITY = 0.35;
const MOVE_SPEED = 3.2;
const JUMP_FORCE = -8.5;
const FLOOR_Y = 220;

const CHERRIES = [
  { id: 1, x: 40, y: 180 },
  { id: 2, x: 180, y: 140 },
  { id: 3, x: 310, y: 110 },
  { id: 4, x: 430, y: 160 },
  { id: 5, x: 540, y: 190 },
] as const;

const PLATFORMS = [
  { x: 120, y: 200, width: 120, height: 10 },
  { x: 280, y: 170, width: 120, height: 10 },
  { x: 430, y: 190, width: 130, height: 10 },
] as const;

const CherryCollectorCard = () => {
  const [showGame, setShowGame] = useState(false);

  return (
    <article className="group relative flex flex-col justify-between rounded-2xl border border-border/70 bg-gradient-to-br from-card/90 via-secondary/80 to-card/80 p-5 shadow-[var(--romantic-card-glow)] backdrop-blur-xl">
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--accent)),transparent_70%)] opacity-60 group-hover:opacity-80" />
      <div className="relative space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-secondary/60 px-3 py-1 text-[0.65rem] font-medium text-muted-foreground">
          <Gamepad2 className="h-3.5 w-3.5 text-primary" aria-hidden />
          <span>Game 1 · Cherry Runner</span>
        </div>
        <h2 className="text-base font-semibold text-foreground">لعبة جمع الكرز · أسلوب ماريو</h2>
        <p className="text-xs text-muted-foreground">
          بنت صغيرة تركض في عالم بنفسجي وتجمع حبات الكرز بدل الكوينز؛ كل كرز تجمعيه يزيد عدّاد الحب لتوما.
        </p>
      </div>
      <div className="mt-4 space-y-3">
        <button
          type="button"
          onClick={() => setShowGame(true)}
          className="w-full rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground shadow-sm transition hover:shadow-[var(--romantic-card-glow)]"
        >
          ابدئي اللعبة (تحكم بالكيبورد)
        </button>
        <p className="text-[0.7rem] text-[hsl(var(--romantic-text-soft))]">
          التحكم: الأسهم لليمين/اليسار، و زر المسافة أو السهم ↑ للقفز. اجمعي كل الكرز عشان تطلع لك رسالة فوز لطيفة.
        </p>
      </div>

      {showGame && (
        <div className="mt-4 rounded-2xl border border-border/60 bg-background/90 p-3">
          <div className="mb-2 flex items-center justify-between text-[0.7rem] text-muted-foreground">
            <span>لوحة لعب جمع الكرز</span>
            <button
              type="button"
              onClick={() => setShowGame(false)}
              className="rounded-full border border-border/70 px-2 py-1 text-[0.65rem] text-muted-foreground hover:bg-secondary/50"
            >
              إغلاق
            </button>
          </div>
          <CherryCollectorGame />
        </div>
      )}
    </article>
  );
};

const CherryCollectorGame = () => {
  const [state, setState] = useState<CherryCollectorGameState>({
    x: 40,
    y: FLOOR_Y,
    vx: 0,
    vy: 0,
    onGround: true,
  });
  const [collected, setCollected] = useState<number[]>([]);
  const [hasWon, setHasWon] = useState(false);
  const keysRef = useRef({ ArrowLeft: false, ArrowRight: false, Space: false, ArrowUp: false });
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(marioCoinSfx);
    audioRef.current = audio;
  }, []);

  useEffect(() => {
    let animationFrame: number;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key in keysRef.current) {
        e.preventDefault();
        (keysRef.current as any)[e.key] = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key in keysRef.current) {
        e.preventDefault();
        (keysRef.current as any)[e.key] = false;
      }
    };

    const loop = () => {
      setState((prev) => {
        let { x, y, vx, vy, onGround } = prev;

        const movingLeft = keysRef.current.ArrowLeft;
        const movingRight = keysRef.current.ArrowRight;
        const wantJump = keysRef.current.Space || keysRef.current.ArrowUp;

        if (movingLeft === movingRight) {
          vx = 0;
        } else if (movingLeft) {
          vx = -MOVE_SPEED;
        } else if (movingRight) {
          vx = MOVE_SPEED;
        }

        if (wantJump && onGround) {
          vy = JUMP_FORCE;
          onGround = false;
        }

        vy += GRAVITY;
        x += vx;
        y += vy;

        // world bounds
        x = Math.max(10, Math.min(590, x));

        // floor collision
        if (y >= FLOOR_Y) {
          y = FLOOR_Y;
          vy = 0;
          onGround = true;
        }

        // platform collisions (simple top collision)
        PLATFORMS.forEach((p) => {
          const withinX = x + 12 > p.x && x - 12 < p.x + p.width;
          const fallingDown = vy >= 0;
          const abovePlatform = y <= p.y && y + vy >= p.y;
          if (withinX && fallingDown && abovePlatform) {
            y = p.y;
            vy = 0;
            onGround = true;
          }
        });

        return { x, y, vx, vy, onGround };
      });

      animationFrame = requestAnimationFrame(loop);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    animationFrame = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    // handle cherry collection
    const radius = 16;
    const girlX = state.x;
    const girlY = state.y;

    CHERRIES.forEach((cherry) => {
      if (collected.includes(cherry.id)) return;
      const dx = girlX - cherry.x;
      const dy = girlY - cherry.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < radius) {
        setCollected((prev) => [...prev, cherry.id]);
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(() => {});
        }
      }
    });
  }, [state, collected]);

  useEffect(() => {
    if (!hasWon && collected.length === CHERRIES.length) {
      setHasWon(true);
    }
  }, [collected, hasWon]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-[0.7rem] text-muted-foreground">
        <span>
          الكرز المجموع: <span className="font-semibold text-primary">{collected.length}</span> / {CHERRIES.length}
        </span>
        {hasWon && <span className="text-[0.7rem] text-[hsl(var(--romantic-heart-soft))]">يا سلام! جمعتي كل الكرز لتوما 💜</span>}
      </div>
      <div className="relative h-64 w-full overflow-hidden rounded-xl border border-border/70 bg-[radial-gradient(circle_at_top,_rgba(120,81,169,0.4),_transparent_60%),_linear-gradient(to_top,_hsl(var(--background))_10%,_rgba(12,10,24,0.95)_100%)]">
        {/* background stars */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_55%)] opacity-60" />

        {/* floor */}
        <div className="absolute bottom-5 left-0 right-0 h-6 bg-[linear-gradient(to_top,_rgba(40,20,60,1),_rgba(40,20,60,0.2))] shadow-[0_-6px_20px_rgba(0,0,0,0.7)]">
          <div className="h-full w-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.15),_transparent_70%)] opacity-40" />
        </div>

        {/* platforms */}
        {PLATFORMS.map((p) => (
          <div
            key={`${p.x}-${p.y}`}
            className="absolute rounded-lg bg-[linear-gradient(to_top,_rgba(90,60,140,1),_rgba(120,90,170,0.6))] shadow-[0_6px_16px_rgba(0,0,0,0.6)]"
            style={{ left: p.x, top: p.y, width: p.width, height: p.height }}
          >
            <div className="h-full w-full bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.25),_transparent_70%)] opacity-60" />
          </div>
        ))}

        {/* girl character */}
        <div
          className="absolute -translate-x-1/2 -translate-y-full transition-transform duration-75"
          style={{ left: state.x, top: state.y }}
        >
          <div className="relative h-10 w-7">
            {/* hair */}
            <div className="absolute left-0 right-0 top-0 h-4 rounded-t-full bg-[hsl(var(--romantic-heart-soft))] shadow-[0_2px_6px_rgba(0,0,0,0.5)]" />
            {/* face */}
            <div className="absolute left-1 right-1 top-2 h-4 rounded-2xl bg-[hsl(var(--romantic-skin-soft))] shadow-[0_1px_3px_rgba(0,0,0,0.5)]" />
            {/* dress */}
            <div className="absolute bottom-0 left-0 right-0 h-6 translate-y-1 rounded-b-2xl bg-[hsl(var(--primary))] shadow-[0_4px_10px_rgba(0,0,0,0.6)]" />
            {/* legs */}
            <div className="absolute bottom-0 left-1 right-1 flex justify-between gap-1">
              <div className="h-3 w-1.5 rounded-full bg-[rgba(35,25,60,0.9)]" />
              <div className="h-3 w-1.5 rounded-full bg-[rgba(35,25,60,0.9)]" />
            </div>
          </div>
        </div>

        {/* cherries */}
        {CHERRIES.map((cherry) => {
          const isCollected = collected.includes(cherry.id);
          if (isCollected) return null;
          return (
            <div
              key={cherry.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 animate-[float_2.2s_ease-in-out_infinite]"
              style={{ left: cherry.x, top: cherry.y }}
            >
              <div className="relative h-6 w-6">
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_top,_#ff6b9c,_#b3125d)] shadow-[0_0_18px_rgba(255,107,156,0.9)]" />
                <div className="absolute left-1 top-1 h-2 w-2 rounded-full bg-[rgba(255,255,255,0.9)] opacity-80" />
                <div className="absolute -top-1 left-1 h-3 w-3 rotate-[-25deg] rounded-t-full border-t-2 border-l-2 border-[rgba(70,200,120,0.9)]" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MiniGames;
