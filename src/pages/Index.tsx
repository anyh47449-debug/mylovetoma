import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, Gamepad2 } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

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

          <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
            هذه الصفحة هدية خاصة لك يا توما؛ كل لمعة، كل قلب، وكل حركة هنا مكتوبة بحبّ، ومصممة فقط لتقول:
            أنت عالمي البنفسجي.
          </p>
        </section>

        {/* Mini games section */}
        <section className="w-full max-w-5xl space-y-6 animate-enter">
          <header className="flex flex-col items-center gap-2 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/40 px-4 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
              <Gamepad2 className="h-4 w-4 text-primary" aria-hidden />
              <span>Mini Games · ألعاب حب لتوما</span>
            </div>
            <h2 className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-2xl font-semibold text-transparent sm:text-3xl">
              خانة الميني غيمز البنفسجية
            </h2>
            <p className="max-w-2xl text-sm text-muted-foreground">
              خانة الألعاب الخاصة بتوما: كل ميني غيم هناك تكمل قصة حبّنا البنفسجية بطريقتها.
            </p>
            <Link
              to="/games"
              className="mt-3 inline-flex items-center gap-2 rounded-full border border-border/70 bg-secondary/60 px-5 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[hsl(var(--romantic-text-soft))] shadow-[var(--romantic-card-glow)] transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              ادخلي صفحة الألعاب الكاملة
              <Gamepad2 className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </header>

          <div className="mx-auto flex max-w-3xl flex-col gap-4">
            <article className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/90 p-4 shadow-[0_18px_40px_rgba(0,0,0,0.55)] backdrop-blur-xl">
              <div className="pointer-events-none absolute inset-x-0 -top-10 h-24 bg-[radial-gradient(circle_at_top,_hsl(var(--primary))_0%,_transparent_70%)] opacity-50 transition-opacity duration-500 group-hover:opacity-70" />
              <div className="relative flex flex-col gap-2">
                <h3 className="text-sm font-semibold text-foreground">رسالة حب عشوائية</h3>
                <p className="text-xs text-muted-foreground">
                  فكرة لعبة: تضغطي فيطلع لك اقتباس حب عشوائي مكتوب لتوما فقط؛ كل مرة جملة أدفى من اللي قبلها.
                </p>
                <p className="mt-1 rounded-xl bg-secondary/40 px-3 py-2 text-xs text-[hsl(var(--romantic-text-soft))]">
                  مثال: "لو القلب عنده مدينة رئيسية، تكون فيها لافتة باسمك يا توما." ✦
                </p>
              </div>
            </article>

            <article className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/90 p-4 backdrop-blur-xl">
              <div className="pointer-events-none absolute -right-8 -bottom-10 h-28 w-28 rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--romantic-heart-soft)),transparent_70%)] opacity-60 group-hover:opacity-80" />
              <div className="relative flex flex-col gap-2">
                <h3 className="text-sm font-semibold text-foreground">تطابق القلوب</h3>
                <p className="text-xs text-muted-foreground">
                  فكرة لعبة ثانية: تختاري من صفات، والصفحة تقول لك نسبة تطابق قلبك مع قلب توما (دائماً النتيجة: 100%).
                </p>
                <p className="mt-1 text-[0.7rem] text-muted-foreground/90">
                  ملاحظة: هذي الأفكار نقدر نحققها فعلياً لك في صفحة الميني غيمز لو حبيتي.
                </p>
              </div>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
