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
const WORLD_WIDTH = 1600;
const VIEWPORT_WIDTH = 640;

const CHERRIES = [
  { id: 1, x: 80, y: 180 },
  { id: 2, x: 260, y: 150 },
  { id: 3, x: 430, y: 130 },
  { id: 4, x: 620, y: 170 },
  { id: 5, x: 780, y: 150 },
  { id: 6, x: 980, y: 160 },
  { id: 7, x: 1180, y: 140 },
  { id: 8, x: 1380, y: 180 },
  { id: 9, x: 220, y: 120 },
  { id: 10, x: 520, y: 110 },
  { id: 11, x: 860, y: 125 },
  { id: 12, x: 1120, y: 115 },
  { id: 13, x: 1450, y: 135 },
  { id: 14, x: 300, y: 190 },
  { id: 15, x: 690, y: 185 },
  { id: 16, x: 910, y: 175 },
  { id: 17, x: 1290, y: 165 },
  { id: 18, x: 1520, y: 150 },
  { id: 19, x: 1380, y: 120 },
  { id: 20, x: 1040, y: 135 },
] as const;

const PLATFORMS = [
  { x: 160, y: 200, width: 130, height: 10 },
  { x: 340, y: 175, width: 130, height: 10 },
  { x: 540, y: 190, width: 140, height: 10 },
  { x: 760, y: 170, width: 150, height: 10 },
  { x: 1000, y: 185, width: 150, height: 10 },
  { x: 1240, y: 165, width: 150, height: 10 },
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

      <main className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col gap-8 px-4 py-10">
        <header className="flex items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[hsl(var(--romantic-text-soft))] backdrop-blur">
              <Gamepad2 className="h-4 w-4 text-primary" aria-hidden />
              <span>cherry runner · toma edition</span>
            </div>
            <h2 className="text-lg font-semibold text-foreground">لعبة جمع الكرز للبنت الكارتونية الصغيرة</h2>
            <p className="text-xs text-muted-foreground">
              اجمعي حبات الكرز في عالم بنفسجي كبير، وكل ١٠ كرزات يظهر بوس داخل نفس العالم تقاتليه.
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
  type Mode = "world" | "boss1" | "boss2";

  const [mode, setMode] = useState<Mode>("world");
  const [state, setState] = useState<CherryCollectorGameState>({
    x: 40,
    y: FLOOR_Y,
    vx: 0,
    vy: 0,
    onGround: true,
  });
  const [collected, setCollected] = useState<number[]>([]);
  const [hasWon, setHasWon] = useState(false);
  const [boss1Defeated, setBoss1Defeated] = useState(false);
  const [boss2Defeated, setBoss2Defeated] = useState(false);
  const [bossHealth, setBossHealth] = useState(0);
  const [bossX, setBossX] = useState(1300);
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

        // لو فيه بوس، نحبس المنطقة حوله شوي عشان يكون قتال في ساحة
        if (mode === "boss1" || mode === "boss2") {
          const arenaLeft = bossX - 120;
          const arenaRight = bossX + 120;
          if (nextX < arenaLeft) nextX = arenaLeft;
          if (nextX > arenaRight) nextX = arenaRight;
        } else {
          nextX = Math.max(10, Math.min(WORLD_WIDTH - 10, nextX));
        }

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
  }, [mode, bossX]);

  // تجميع الكرز + تفعيل البوسات
  useEffect(() => {
    const hitRadius = 26;
    const girlX = state.x;
    const girlY = state.y - 12;

    let newCollected: number[] | null = null;

    CHERRIES.forEach((cherry) => {
      if (collected.includes(cherry.id)) return;
      const dx = girlX - cherry.x;
      const dy = girlY - cherry.y;
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

      const total = newCollected.length;

      if (total >= 10 && !boss1Defeated && mode === "world") {
        // فعّل بوس علم العراق داخل العالم
        setMode("boss1");
        setBossHealth(5);
        setBossX(1150);
        // نقرّب البنت من ساحة البوس
        setState((prev) => ({ ...prev, x: 1100 }));
      } else if (total >= 20 && boss1Defeated && !boss2Defeated && mode === "world") {
        // فعّل بوس ماريو البنفسجي داخل العالم
        setMode("boss2");
        setBossHealth(7);
        setBossX(1450);
        setState((prev) => ({ ...prev, x: 1400 }));
      }
    }
  }, [state, collected, boss1Defeated, boss2Defeated, mode]);

  // منطق هزيمة البوس: قفزة فوق رأسه
  useEffect(() => {
    if (mode === "world" || bossHealth <= 0) return;

    const girlWidth = 18;
    const girlHeight = 28;
    const bossWidth = 70;
    const bossHeight = 60;

    const girlLeft = state.x - girlWidth / 2;
    const girlRight = state.x + girlWidth / 2;
    const girlTop = state.y - girlHeight;
    const girlBottom = state.y;

    const bossLeft = bossX - bossWidth / 2;
    const bossRight = bossX + bossWidth / 2;
    const bossTop = FLOOR_Y - bossHeight;

    const overlapX = girlRight > bossLeft && girlLeft < bossRight;
    const hittingFromTop = girlBottom >= bossTop && girlTop < bossTop && state.vy > 0;

    if (overlapX && hittingFromTop) {
      setBossHealth((h) => Math.max(0, h - 1));
      // نطّة ارتداد خفيفة بعد الضربة
      setState((prev) => ({ ...prev, vy: JUMP_FORCE * 0.7 }));
    }
  }, [state, mode, bossHealth, bossX]);

  // لما ينتهي دم البوس، نرجع للوضع العادي
  useEffect(() => {
    if (bossHealth <= 0 && (mode === "boss1" || mode === "boss2")) {
      if (mode === "boss1") setBoss1Defeated(true);
      if (mode === "boss2") setBoss2Defeated(true);
      setMode("world");
    }
  }, [bossHealth, mode]);

  useEffect(() => {
    if (
      !hasWon &&
      collected.length === CHERRIES.length &&
      boss1Defeated &&
      boss2Defeated
    ) {
      setHasWon(true);
    }
  }, [collected, hasWon, boss1Defeated, boss2Defeated]);

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
        {mode === "world" && hasWon && (
          <span className="text-[0.7rem] text-[hsl(var(--romantic-heart-soft))]">
            يا سلام! خلصتي المرحلة الأولى وهزمتي كل البوسات 💜
          </span>
        )}
        {mode === "boss1" && (
          <span className="text-[0.7rem] text-[hsl(var(--romantic-text-soft))]">
            بوس ١: علم العراق – اقفزي على العلم من فوق عشان تنقصي دمه
          </span>
        )}
        {mode === "boss2" && (
          <span className="text-[0.7rem] text-[hsl(var(--romantic-text-soft))]">
            بوس ٢: مخلوق ماريو البنفسجي – اقفزي على رأسه أكثر من مرة
          </span>
        )}
      </div>

      <WorldView
        state={state}
        collected={collected}
        cameraOffset={cameraOffset}
        mode={mode}
        bossHealth={bossHealth}
        bossX={bossX}
      />
    </div>
  );
};

type WorldViewProps = {
  state: CherryCollectorGameState;
  collected: number[];
  cameraOffset: number;
  mode: "world" | "boss1" | "boss2";
  bossHealth: number;
  bossX: number;
};

const WorldView = ({ state, collected, cameraOffset, mode, bossHealth, bossX }: WorldViewProps) => {
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
        <div className="absolute bottom-5 left-0 right-0 h-6 bg-[linear-gradient(to_top,_rgba(40,20,60,1),_rgba(40,20,60,0.2))] shadow-[0_-6px_20px_rgba(0,0,0,0.7)]">
          <div className="h-full w-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.15),_transparent_70%)] opacity-40" />
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

        {/* شخصية البنت */}
        <div
          className="absolute -translate-x-1/2 -translate-y-full transition-transform duration-100"
          style={{ left: state.x, top: state.y }}
        >
          <div className="relative h-16 w-11">
            <div className="absolute -bottom-1 left-1 right-1 h-2 rounded-full bg-black/40 blur-sm" />

            <div className="absolute left-0 right-0 top-1 h-6 rounded-t-3xl bg-[hsl(var(--romantic-heart-soft))] shadow-[0_2px_6px_rgba(0,0,0,0.55)]" />
            <div className="absolute left-1.5 right-1.5 top-1 h-3 rounded-t-3xl bg-[hsl(var(--romantic-heart-soft))]" />
            <div className="absolute -top-1 right-0 h-3.5 w-5 -rotate-6 rounded-full bg-[hsl(var(--accent))] shadow-[0_1px_4px_rgba(0,0,0,0.6)]" />

            <div className="absolute left-1.5 right-1.5 top-3 h-6 rounded-2xl bg-[hsl(var(--romantic-skin-soft))] shadow-[0_1px_4px_rgba(0,0,0,0.55)]">
              <div className="mt-2 flex flex-col items-center gap-0.5">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[rgba(30,20,60,0.98)]" />
                  <div className="h-1.5 w-1.5 rounded-full bg-[rgba(30,20,60,0.98)]" />
                </div>
                <div className="h-0.5 w-3 rounded-full bg-[rgba(30,20,60,0.7)]" />
              </div>
              <div className="absolute inset-x-1 bottom-0 flex justify-between px-1">
                <div className="h-1.5 w-2 rounded-full bg-[rgba(255,140,170,0.8)]" />
                <div className="h-1.5 w-2 rounded-full bg-[rgba(255,140,170,0.8)]" />
              </div>
            </div>

            <div className="absolute bottom-3 left-0 right-0 h-8 rounded-b-3xl bg-[hsl(var(--primary))] shadow-[0_4px_10px_rgba(0,0,0,0.6)]">
              <div className="absolute inset-x-2 top-1 h-1.5 rounded-full bg-[hsl(var(--primary-foreground))]/20" />
              <div className="absolute inset-x-1 bottom-1 h-1 rounded-full bg-[hsl(var(--accent))]/40" />
            </div>

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

        {/* البوسات داخل العالم */}
        {mode !== "world" && bossHealth > 0 && (
          <div
            className="absolute -translate-x-1/2"
            style={{ left: bossX, top: FLOOR_Y - 60 }}
          >
            {mode === "boss1" ? (
              <div className="relative h-16 w-24 overflow-hidden rounded-md shadow-[0_0_25px_rgba(0,0,0,0.8)]">
                <div className="absolute inset-0">
                  <div className="h-1/3 w-full bg-[hsl(0,80%,50%)]" />
                  <div className="flex h-1/3 w-full items-center justify-center bg-[hsl(0,0%,100%)] text-[9px] font-bold text-[hsl(120,70%,30%)]">
                    الله أكبر
                  </div>
                  <div className="h-1/3 w-full bg-[hsl(0,0%,0%)]" />
                </div>
                <div className="pointer-events-none absolute inset-0 border border-[hsl(var(--accent))]/40 shadow-[0_0_26px_rgba(255,120,170,0.8)]" />
              </div>
            ) : (
              <div className="relative h-16 w-20">
                <div className="absolute bottom-0 left-2 right-2 h-4 rounded-full bg-black/50 blur-sm" />
                <div className="absolute bottom-2 left-3 right-3 h-8 rounded-t-3xl rounded-b-2xl bg-[hsl(var(--primary))] shadow-[0_0_22px_rgba(120,80,220,0.9)]" />
                <div className="absolute bottom-6 left-4 right-4 h-4 rounded-t-3xl bg-[hsl(var(--accent))]" />
                <div className="absolute bottom-6 left-5 flex gap-3">
                  <div className="h-3 w-3 rounded-full bg-white" />
                  <div className="h-3 w-3 rounded-full bg-white" />
                </div>
                <div className="absolute bottom-4 left-6 h-1 w-6 rounded-full bg-black/60" />
              </div>
            )}

            {/* شريط حياة بسيط فوق البوس */}
            <div className="mt-1 flex justify-center gap-0.5">
              {Array.from({ length: bossHealth }).map((_, i) => (
                <span
                  key={i}
                  className="h-2 w-2 rounded-full bg-[hsl(var(--romantic-heart-soft))] shadow-[0_0_8px_rgba(255,120,170,0.9)]"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CherryGame;
