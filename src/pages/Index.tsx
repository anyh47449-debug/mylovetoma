import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, Gamepad2, Music, Pause } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const LOVE_MUSIC_TRACK = "/audio/Niall_Horan_-_Heaven_Official_Video.mp3";

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const glowStyle = useMemo(
    () => ({
      background: `radial-gradient(circle at ${cursorPos.x}px ${cursorPos.y}px, hsl(var(--primary) / 0.55), transparent 60%)`,
    }),
    [cursorPos.x, cursorPos.y]
  );

  const playSfx = (type: "games" | "memories" | "letter") => {
    const sources: Record<typeof type, string> = {
      games: "/audio/sfx-games.mp3",
      memories: "/audio/sfx-memories.mp3",
      letter: "/audio/sfx-letter.mp3",
    } as const;

    const audio = new Audio(sources[type]);
    audio.volume = 0.6;
    void audio.play().catch(() => {
      // ignore play errors (e.g. if user blocked sound)
    });
  };


  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* SEO main heading */}
      <h1 className="sr-only">
        موقع هدية رومنسية بنفسجي لحبيبي توما مع تفاعل بصري مبهر وخانة ميني غيمز خاصة
      </h1>

      {/* Mouse-follow glow */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-60 blur-3xl transition-opacity duration-500"
        style={glowStyle}
      />

      {/* Floating romantic hearts background */}
      <div className="romantic-hearts-layer" aria-hidden>
        {Array.from({ length: 16 }).map((_, index) => (
          <span
            key={index}
            className="floating-heart"
            style={{
              left: `${5 + ((index * 6) % 90)}%`,
              animationDelay: `${index * 0.9}s`,
              animationDuration: `${16 + (index % 5)}s`,
              opacity: 0.35 + (index % 3) * 0.18,
            }}
          >
            ♥
          </span>
        ))}
      </div>

      {/* Grain & overlay */}
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.35),_transparent_60%)]" />

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-10 px-4 py-10">
        {/* Music control & hidden player */}
        <div className="pointer-events-none absolute right-4 top-4 z-30 flex items-center justify-end sm:right-6 sm:top-6">
          <button
            type="button"
            onClick={() => {
              const el = audioRef.current;
              if (!el) return;
              if (isMusicPlaying) {
                el.pause();
                setIsMusicPlaying(false);
              } else {
                void el.play().then(() => setIsMusicPlaying(true)).catch(() => {
                  // ignore play errors
                });
              }
            }}
            className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-3 py-1.5 text-xs font-medium text-foreground shadow-[var(--romantic-card-glow)] backdrop-blur-xl transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {isMusicPlaying ? (
              <Pause className="h-3.5 w-3.5 text-primary" aria-hidden />
            ) : (
              <Music className="h-3.5 w-3.5 text-primary" aria-hidden />
            )}
            <span className="hidden sm:inline">موسيقى الحب</span>
          </button>

          <audio
            ref={(el) => {
              if (el) {
                audioRef.current = el;
                el.loop = true;
              }
            }}
            src={LOVE_MUSIC_TRACK}
            className="hidden"
          />
        </div>

        {/* Toma hero name */}
        <section className="flex w-full max-w-4xl flex-col items-center gap-6 text-center animate-fade-in">

          <div className="relative inline-flex items-center justify-center">
            <motion.div
              className="absolute -inset-6 rounded-[2.5rem] opacity-70"
              style={{
                backgroundImage:
                  "var(--romantic-gradient), radial-gradient(circle at 10% 0%, hsl(var(--accent) / 0.7), transparent 60%)",
              }}
              animate={{
                opacity: [0.4, 0.9, 0.6],
                scale: [0.98, 1.03, 1],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.button
              type="button"
              whileHover={{ scale: 1.04, rotate: -0.5 }}
              whileTap={{ scale: 0.97, rotate: 0.5 }}
              className="relative flex items-center gap-3 rounded-[2rem] border border-border/60 bg-gradient-to-br from-secondary/70 via-card/90 to-secondary/40 px-10 py-5 shadow-[var(--romantic-card-glow)] backdrop-blur-xl"
            >
              <Sparkles className="h-7 w-7 text-accent" aria-hidden />
              <div className="flex flex-col items-start">
                <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">My endless love</span>
                <div className="flex items-baseline gap-2">
                  <motion.span
                    className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-5xl font-extrabold leading-none text-transparent sm:text-6xl"
                    animate={{
                      textShadow: [
                        "0 0 18px hsl(278 84% 64% / 0.8)",
                        "0 0 36px hsl(312 82% 72% / 0.9)",
                        "0 0 24px hsl(260 90% 70% / 0.7)",
                      ],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    Toma
                  </motion.span>
                  <motion.span
                    className="text-sm font-medium text-[hsl(var(--romantic-text-soft))]"
                    animate={{ y: [-2, 1, -2] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    قلبي البنفسجي
                  </motion.span>
                </div>
              </div>
              <Heart className="h-7 w-7 text-primary" aria-hidden />
            </motion.button>
          </div>

          <div className="mt-6 max-w-xl rounded-2xl border border-border/60 bg-background/40 px-5 py-4 text-sm text-muted-foreground shadow-[var(--romantic-card-glow)] backdrop-blur-xl sm:text-base">
            <p className="leading-relaxed">
              هذه الصفحة هدية خاصة لك يا توما؛ كل لمعة، كل قلب، وكل حركة هنا مكتوبة بحبّ، ومصممة فقط لتقول:
            </p>
            <p className="mt-2 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-base font-semibold text-transparent sm:text-lg">
              أنت عالمي البنفسجي.
            </p>
          </div>
        </section>
 
        {/* Mini games + sections overview */}
        <section className="w-full max-w-5xl animate-enter">
          <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-3">
            {/* خانة: الميني غيمز البنفسجية */}
            <article
              className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/90 p-4 shadow-[0_18px_40px_rgba(0,0,0,0.55)] backdrop-blur-xl"
              onClick={() => playSfx("games")}
            >
              <div className="pointer-events-none absolute inset-x-0 -top-10 h-24 bg-[radial-gradient(circle_at_top,_hsl(var(--primary))_0%,_transparent_70%)] opacity-50 transition-opacity duration-500 group-hover:opacity-80" />
              <div className="relative flex flex-col gap-2">
                <div className="inline-flex items-center gap-2 rounded-full bg-secondary/60 px-3 py-1 text-[0.7rem] font-medium text-muted-foreground">
                  <Gamepad2 className="h-3.5 w-3.5 text-primary" aria-hidden />
                  <span>Mini Games · ألعاب حب لتوما</span>
                </div>
                <h3 className="text-sm font-semibold text-foreground">خانة الميني غيمز البنفسجية</h3>
                <p className="text-xs text-muted-foreground">
                  خانة الألعاب الخاصة بتوما: كل ميني غيم هناك تكمل قصة حبّنا البنفسجية بطريقتها.
                </p>
                <Link
                  to="/games"
                  className="mt-3 inline-flex items-center justify-center gap-2 rounded-full border border-border/70 bg-secondary/60 px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[hsl(var(--romantic-text-soft))] shadow-[var(--romantic-card-glow)] transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  ادخلي صفحة الألعاب الكاملة
                  <Gamepad2 className="h-3.5 w-3.5" aria-hidden />
                </Link>
              </div>
            </article>


            {/* خانة: ألبوم / ذكريات توما */}
            <article
              className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/90 p-4 backdrop-blur-xl"
              onClick={() => playSfx("memories")}
            >
              <div className="pointer-events-none absolute -right-8 -bottom-10 h-28 w-28 rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--romantic-heart-soft)),transparent_70%)] opacity-60 group-hover:opacity-80" />
              <div className="relative flex flex-col gap-2">
                <div className="inline-flex items-center gap-2 rounded-full bg-secondary/60 px-3 py-1 text-[0.7rem] font-medium text-muted-foreground">
                  <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden />
                  <span>Memory · ألبوم ذكرياتنا</span>
                </div>
                <h3 className="text-sm font-semibold text-foreground">ألبوم / ذكريات توما</h3>
                <p className="text-xs text-muted-foreground">
                  مكان مخصص نقدر نسوي فيه لاحقاً ألبوم لحظاتكم وصوركم وكلمات صغيرة تحت كل ذكرى.
                </p>
                <button
                  type="button"
                  className="mt-3 inline-flex items-center justify-center gap-2 rounded-full border border-dashed border-border/70 bg-background/40 px-3 py-1.5 text-[0.7rem] font-semibold text-muted-foreground/90 backdrop-blur-sm"
                >
                  قريباً: افتحي ألبوم ذكرياتنا البنفسجية
                </button>
              </div>
            </article>


            {/* خانة: رسالة لتوما */}
            <article
              className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/90 p-4 backdrop-blur-xl"
              onClick={() => playSfx("letter")}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),_transparent_55%)] opacity-70 group-hover:opacity-90" />
              <div className="relative flex flex-col gap-2">
                <div className="inline-flex items-center gap-2 rounded-full bg-secondary/60 px-3 py-1 text-[0.7rem] font-medium text-muted-foreground">
                  <Heart className="h-3.5 w-3.5 text-primary" aria-hidden />
                  <span>Letter · رسالة لتوما</span>
                </div>
                <h3 className="text-sm font-semibold text-foreground">رسالة قلبك الطويلة لتوما</h3>
                <p className="text-xs text-muted-foreground">
                  خانة خاصة نقدر نحولها لاحقاً لرسالة مكتوبة منك له، مع أنيميشن بسيط يمشي مع سطور الكلام.
                </p>
                <button
                  type="button"
                  className="mt-3 inline-flex items-center justify-center gap-2 rounded-full border border-dashed border-border/70 bg-background/40 px-3 py-1.5 text-[0.7rem] font-semibold text-muted-foreground/90 backdrop-blur-sm"
                >
                  قريباً: افتحي رسالة قلبي المكتوبة لك
                </button>
              </div>
            </article>

          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
