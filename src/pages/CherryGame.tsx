import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Gamepad2 } from "lucide-react";
import { Link } from "react-router-dom";
import marioCoinSfx from "../assets/mario-coin.mp3";

interface CherryCollectorGameState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  onGround: boolean;
}

const GRAVITY = 0.35;
const MOVE_SPEED = 3.2;
const JUMP_FORCE = -10.5;
const FLOOR_Y = 220;
// نخلي العالم أطول بكثير عشان إحساس 2D محترم
const WORLD_WIDTH = 2600;
const VIEWPORT_WIDTH = 640;

// نوزّع الكرز على طول المرحلة بدل ما يكون متقارب
const CHERRIES = [
  { id: 1, x: 140, y: 185 },
  { id: 2, x: 320, y: 150 },
  { id: 3, x: 520, y: 130 },
  { id: 4, x: 720, y: 175 },
  { id: 5, x: 910, y: 150 },
  { id: 6, x: 1120, y: 165 },
  { id: 7, x: 1320, y: 140 },
  { id: 8, x: 1520, y: 180 },
  { id: 9, x: 1720, y: 150 },
  { id: 10, x: 1880, y: 130 },
  { id: 11, x: 2040, y: 165 },
  { id: 12, x: 2180, y: 150 },
  { id: 13, x: 2340, y: 135 },
  { id: 14, x: 420, y: 195 },
  { id: 15, x: 780, y: 190 },
  { id: 16, x: 1280, y: 185 },
  { id: 17, x: 1680, y: 175 },
  { id: 18, x: 1960, y: 170 },
  { id: 19, x: 2220, y: 165 },
  { id: 20, x: 2460, y: 155 },
] as const;

// منصات موزّعة على طول العالم
const PLATFORMS = [
  { x: 260, y: 200, width: 140, height: 10 },
  { x: 520, y: 175, width: 140, height: 10 },
  { x: 760, y: 190, width: 150, height: 10 },
  { x: 1040, y: 180, width: 150, height: 10 },
  { x: 1320, y: 170, width: 160, height: 10 },
  { x: 1600, y: 185, width: 150, height: 10 },
  { x: 1880, y: 175, width: 150, height: 10 },
  { x: 2160, y: 165, width: 150, height: 10 },
] as const;

const CherryGame = () => {
  const [started, setStarted] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <h1 className="sr-only">لعبة جمع الكرز لتوما بأسلوب ماريو مع بوسات داخل العالم</h1>

      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.55),_transparent_65%)]"
      />

      <main className="relative z-10 mx-auto flex min-h-screen w-full flex-col gap-8 px-4 py-10">
        <header className="flex items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[hsl(var(--romantic-text-soft))] backdrop-blur">
              <Gamepad2 className="h-4 w-4 text-primary" aria-hidden />
              <span>mario · cherry edition</span>
            </div>
            <h2 className="text-lg font-semibold text-foreground">لعبة ماريو البسيطة لجمع الكرز</h2>
            <p className="text-xs text-muted-foreground">
              تحكم في ماريو، امشِ على الأرض واقفز بين الحواجز واجمع أكبر عدد ممكن من حبات الكرز.
            </p>
            <p className="text-[0.7rem] text-[hsl(var(--romantic-text-soft))]">
              التحكم: الأسهم لليمين واليسار، و زر المسافة أو السهم ↑ للقفز.
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

        <section className="mt-2 flex flex-1 flex-col gap-4">
          {!started ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 rounded-2xl border border-border/70 bg-background/80 p-6 text-center shadow-[var(--romantic-card-glow)]">
              <p className="text-sm text-muted-foreground">
                اضغطي زر البداية عشان تدخل البنت الكارتونية عالم الكرز وتبدأ المغامرة البنفسجية.
              </p>
              <button
                type="button"
                onClick={() => setStarted(true)}
                className="rounded-full bg-primary px-6 py-2 text-xs font-semibold text-primary-foreground shadow-lg transition hover:shadow-[var(--romantic-card-glow)]"
              >
                Start · ابدئي جمع الكرز
              </button>
            </div>
          ) : (
            <CherryCollectorGame />
          )}
        </section>
      </main>
    </div>
  );
};

const CherryCollectorGame = () => {
  const [state, setState] = useState<CherryCollectorGameState>({
    x: 60,
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

        let nextX = x + vx;
        let nextY = y + vy;

        // حدود عالم ماريو البسيط
        nextX = Math.max(10, Math.min(WORLD_WIDTH - 10, nextX));

        // التصادم مع المنصات
        onGround = false;
        PLATFORMS.forEach((p) => {
          const withinX = nextX + 12 > p.x && nextX - 12 < p.x + p.width;
          const wasAbove = y <= p.y;
          const nowBelowOrOn = nextY >= p.y;
          const fallingDown = vy >= 0;

          if (withinX && wasAbove && nowBelowOrOn && fallingDown) {
            nextY = p.y;
            vy = 0;
            onGround = true;
          }
        });

        // الأرض مثل ماريو: توقف عندها ولا تسقط
        if (nextY >= FLOOR_Y) {
          nextY = FLOOR_Y;
          vy = 0;
          onGround = true;
        }

        return { x: nextX, y: nextY, vx, vy, onGround };
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

  // تجميع الكرز
  useEffect(() => {
    const hitRadius = 26;
    const marioX = state.x;
    const marioY = state.y - 12;

    let newCollected: number[] | null = null;

    CHERRIES.forEach((cherry) => {
      if (collected.includes(cherry.id)) return;
      const dx = marioX - cherry.x;
      const dy = marioY - cherry.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < hitRadius) {
        if (!newCollected) newCollected = [...collected];
        newCollected.push(cherry.id);
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(() => {});
        }
      }
    });

    if (newCollected) {
      setCollected(newCollected);
    }
  }, [state, collected]);

  useEffect(() => {
    if (!hasWon && collected.length === CHERRIES.length) {
      setHasWon(true);
    }
  }, [collected, hasWon]);

  const cameraOffset = Math.max(
    0,
    Math.min(state.x - VIEWPORT_WIDTH / 2, WORLD_WIDTH - VIEWPORT_WIDTH)
  );

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-[0.7rem] text-muted-foreground">
        <span>
          الكرز المجموع: <span className="font-semibold text-primary">{collected.length}</span> / {CHERRIES.length}
        </span>
        {hasWon && (
          <span className="text-[0.7rem] text-[hsl(var(--romantic-heart-soft))]">
            يا سلام! خلصت كل الكرز في المرحلة 🎉
          </span>
        )}
      </div>

      <WorldView state={state} collected={collected} cameraOffset={cameraOffset} />
    </div>
  );
};

type WorldViewProps = {
  state: CherryCollectorGameState;
  collected: number[];
  cameraOffset: number;
};

const WorldView = ({ state, collected, cameraOffset }: WorldViewProps) => {
  return (
    <div className="relative h-64 w-full overflow-hidden rounded-xl border border-border/70 bg-[radial-gradient(circle_at_top,_rgba(120,81,169,0.4),_transparent_60%),_linear-gradient(to_top,_hsl(var(--background))_10%,_rgba(12,10,24,0.95)_100%)]">
      {/* خلفية قلوب ونجوم */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_55%)] opacity-60" />
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="absolute text-[10px] text-[hsl(var(--romantic-heart-soft))] opacity-60 animate-[float_10s_ease-in-out_infinite]"
            style={{
              left: `${(i * 7) % 100}%`,
              top: `${10 + ((i * 13) % 70)}%`,
              animationDelay: `${i * 0.6}s`,
            }}
          >
            ♥
          </span>
        ))}
      </div>

      {/* عالم اللعب */}
      <div
        className="absolute inset-y-0 left-0 flex"
        style={{ width: WORLD_WIDTH, transform: `translateX(${-cameraOffset}px)` }}
      >
        {/* الأرض */}
        <div className="absolute bottom-5 left-0 right-0 h-6 bg-[repeating-linear-gradient(135deg,_rgba(220,80,120,1)_0px,_rgba(220,80,120,1)_8px,_rgba(40,20,60,1)_8px,_rgba(40,20,60,1)_16px)] shadow-[0_-6px_20px_rgba(0,0,0,0.7)]">
          <div className="h-full w-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.25),_transparent_70%)] opacity-60" />
        </div>

        {/* المنصات */}
        {PLATFORMS.map((p) => (
          <div
            key={`${p.x}-${p.y}`}
            className="absolute rounded-lg bg-[linear-gradient(to_top,_rgba(90,60,140,1),_rgba(120,90,170,0.6))] shadow-[0_6px_16px_rgba(0,0,0,0.6)]"
            style={{ left: p.x, top: p.y, width: p.width, height: p.height }}
          >
            <div className="h-full w-full bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.25),_transparent_70%)] opacity-60" />
          </div>
        ))}

        {/* شخصية ماريو بشكل مبسّط مع أنيميشن للجري */}
        <div
          className={`absolute -translate-x-1/2 -translate-y-full transition-transform duration-100 ${
            isRunning ? "animate-bounce" : ""
          } ${state.vx < 0 ? "-scale-x-100" : "scale-x-100"}`}
          style={{ left: state.x, top: state.y }}
        >
          <div className="relative h-16 w-11">
            <div className="absolute -bottom-1 left-1 right-1 h-2 rounded-full bg-black/40 blur-sm" />

            {/* قبعة حمراء */}
            <div className="absolute left-0 right-0 top-1 h-4 rounded-t-3xl bg-[hsl(0,80%,55%)] shadow-[0_2px_6px_rgba(0,0,0,0.55)]" />
            <div className="absolute left-1.5 right-1.5 top-1 h-2.5 rounded-t-3xl bg-[hsl(0,80%,60%)]" />

            {/* وجه */}
            <div className="absolute left-1.5 right-1.5 top-3 h-6 rounded-2xl bg-[hsl(var(--romantic-skin-soft))] shadow-[0_1px_4px_rgba(0,0,0,0.55)]">
              <div className="mt-2 flex flex-col items-center gap-0.5">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[rgba(30,20,60,0.98)]" />
                  <div className="h-1.5 w-1.5 rounded-full bg-[rgba(30,20,60,0.98)]" />
                </div>
                <div className="h-0.5 w-3 rounded-full bg-[rgba(30,20,60,0.7)]" />
              </div>
            </div>

            {/* جسم أزرق بأزرار صفراء (أوفرول) */}
            <div className="absolute bottom-3 left-0 right-0 h-8 rounded-b-3xl bg-[hsl(220,70%,50%)] shadow-[0_4px_10px_rgba(0,0,0,0.6)]">
              <div className="absolute inset-x-2 top-1 flex justify-between">
                <div className="h-1.5 w-1.5 rounded-full bg-[hsl(50,90%,60%)]" />
                <div className="h-1.5 w-1.5 rounded-full bg-[hsl(50,90%,60%)]" />
              </div>
            </div>

            {/* الأرجل */}
            <div className="absolute bottom-0 left-2 right-2 flex justify-between gap-1">
              <div className="h-4 w-1.5 rounded-full bg-[rgba(40,28,70,0.95)]" />
              <div className="h-4 w-1.5 rounded-full bg-[rgba(40,28,70,0.95)]" />
            </div>
          </div>
        </div>

        {/* الكرز */}
        {CHERRIES.map((cherry) => {
          const isCollected = collected.includes(cherry.id);
          if (isCollected) return null;
          return (
            <div
              key={cherry.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 animate-[float_2.2s_ease-in-out_infinite]"
              style={{ left: cherry.x, top: cherry.y }}
            >
              <div className="relative h-7 w-8">
                <div className="absolute bottom-0 left-0 h-4 w-4 rounded-full bg-[radial-gradient(circle_at_top,_hsl(var(--accent)),_hsl(var(--romantic-heart-soft)))] shadow-[0_0_18px_rgba(255,120,170,0.95)]" />
                <div className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-[radial-gradient(circle_at_top,_hsl(var(--accent)),_hsl(var(--romantic-heart-soft)))] shadow-[0_0_18px_rgba(255,120,170,0.95)]" />
                <div className="absolute left-1 top-1 h-2 w-2 rounded-full bg-[rgba(255,255,255,0.9)] opacity-80" />
                <div className="absolute -top-1 left-1 h-4 w-3 -rotate-12 rounded-t-full border-t-2 border-l-2 border-[rgba(90,220,150,0.95)]" />
                <div className="absolute -top-1 right-1 h-4 w-3 rotate-12 rounded-t-full border-t-2 border-r-2 border-[rgba(90,220,150,0.95)]" />
                <div className="absolute -top-2 left-3 h-2 w-3 rotate-[-18deg] rounded-full bg-[rgba(90,220,150,0.95)]" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CherryGame;
