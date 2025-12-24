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

const CherryGame = () => {
  const [started, setStarted] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <h1 className="sr-only">لعبة جمع الكرز لتوما بأسلوب ماريو</h1>

      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.55),_transparent_65%)]"
      />

      <main className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col gap-8 px-4 py-10">
        <header className="flex items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[hsl(var(--romantic-text-soft))] backdrop-blur">
              <Gamepad2 className="h-4 w-4 text-primary" aria-hidden />
              <span>cherry runner · toma edition</span>
            </div>
            <h2 className="text-lg font-semibold text-foreground">لعبة جمع الكرز للبنت الكارتونية الصغيرة</h2>
            <p className="text-xs text-muted-foreground">
              اجمعي كل حبات الكرز في هذا العالم البنفسجي الصغير، وكل كرز تجمعيه يعتبر نقطة حب إضافية لتوما.
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
        {hasWon && (
          <span className="text-[0.7rem] text-[hsl(var(--romantic-heart-soft))]">
            يا سلام! جمعتي كل الكرز لتوما 💜
          </span>
        )}
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

        {/* girl character - more detailed cartoon */}
        <div
          className="absolute -translate-x-1/2 -translate-y-full transition-transform duration-75"
          style={{ left: state.x, top: state.y }}
        >
          <div className="relative h-14 w-9">
            {/* hair back */}
            <div className="absolute left-0 right-0 top-1 h-5 rounded-t-3xl bg-[hsl(var(--romantic-heart-soft))] shadow-[0_2px_6px_rgba(0,0,0,0.5)]" />
            {/* hair bangs */}
            <div className="absolute left-1 right-1 top-1 h-3 rounded-t-3xl bg-[hsl(var(--romantic-heart-soft))]" />
            {/* hair bow */}
            <div className="absolute -top-1 right-1 h-3 w-4 rounded-full bg-[hsl(var(--accent))] shadow-[0_1px_4px_rgba(0,0,0,0.6)]" />

            {/* face */}
            <div className="absolute left-1 right-1 top-3 h-5 rounded-2xl bg-[hsl(var(--romantic-skin-soft))] shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
              {/* eyes */}
              <div className="mt-2 flex items-center justify-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-[rgba(30,20,60,0.95)]" />
                <div className="h-1.5 w-1.5 rounded-full bg-[rgba(30,20,60,0.95)]" />
              </div>
              {/* blush */}
              <div className="absolute inset-x-1 bottom-0 flex justify-between px-1">
                <div className="h-1.5 w-2 rounded-full bg-[rgba(255,120,150,0.7)]" />
                <div className="h-1.5 w-2 rounded-full bg-[rgba(255,120,150,0.7)]" />
              </div>
            </div>

            {/* dress */}
            <div className="absolute bottom-2 left-0 right-0 h-7 rounded-b-3xl bg-[hsl(var(--primary))] shadow-[0_4px_10px_rgba(0,0,0,0.6)]">
              <div className="absolute inset-x-2 top-1 h-1.5 rounded-full bg-[hsl(var(--primary-foreground))]/20" />
            </div>

            {/* legs */}
            <div className="absolute bottom-0 left-2 right-2 flex justify-between gap-1">
              <div className="h-3.5 w-1.5 rounded-full bg-[rgba(35,25,60,0.9)]" />
              <div className="h-3.5 w-1.5 rounded-full bg-[rgba(35,25,60,0.9)]" />
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

export default CherryGame;
