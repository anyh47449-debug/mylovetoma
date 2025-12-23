import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Gamepad2 } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [kisses, setKisses] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [combo, setCombo] = useState(0);
  const [comboTimer, setComboTimer] = useState<NodeJS.Timeout | null>(null);

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

  const handleKissClick = () => {
    setKisses((prev) => prev + 1);
    setCombo((prev) => {
      const next = prev + 1;
      setBestCombo((best) => (next > best ? next : best));
      return next;
    });

    if (comboTimer) clearTimeout(comboTimer);
    const timeout = setTimeout(() => setCombo(0), 1200);
    setComboTimer(timeout);
  };

  const romanceLevel = useMemo(() => {
    if (kisses > 150) return "مجنونة بحب توما";
    if (kisses > 80) return "روح توما";
    if (kisses > 40) return "أقرب لقلب توما";
    if (kisses > 10) return "دلع توما";
    if (kisses > 0) return "قبلة لعيون توما";
    return "إهدي لتوما أول قبلة في اللعبة";
  }, [kisses]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* SEO main heading */}
      <h1 className="sr-only">موقع هدية رومنسية بنفسجي لحبيبي توما مع ميني غيمز</h1>

      {/* Mouse-follow glow */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-60 blur-3xl transition-opacity duration-500"
        style={glowStyle}
      />

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
            هذه الصفحة هدية خاصة لك يا توما؛ كل ضغطة، كل قلب، وكل لعبة هنا مكتوبة بحبّ، ومصممة فقط لتقول: أنت عالمي البنفسجي.
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
              اختبرت مشاعري في كوكب الألعاب: قبّلات بنظام الككرز، رسائل حب مخفيّة، وتحديات لطيفة لك أنت فقط.
            </p>
            <Link
              to="/games"
              className="mt-3 inline-flex items-center gap-2 rounded-full border border-border/70 bg-secondary/60 px-5 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[hsl(var(--romantic-text-soft))] shadow-[var(--romantic-card-glow)] transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              ادخلي صفحة الألعاب الكاملة
              <Gamepad2 className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </header>

          <div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)]">
            {/* Kisses clicker game */}
            <article className="relative overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br from-card/90 via-secondary/80 to-card/80 p-5 shadow-[var(--romantic-card-glow)] backdrop-blur-xl">
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--accent))_0%,transparent_70%)] opacity-50" />

              <div className="relative flex flex-col gap-4">
                <header className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">لعبة الككرز · Kiss Clicker</h3>
                    <p className="text-xs text-muted-foreground">
                      كُل ضغطة على القلب = قبلة توصل لتوما، شوفي قدّيش في قلب واحد يتحمّل حبّك.
                    </p>
                  </div>
                  <div className="flex flex-col items-end text-xs text-muted-foreground">
                    <span className="font-medium text-[hsl(var(--romantic-text-soft))]">{romanceLevel}</span>
                    <span>أفضل كومبو: {bestCombo}</span>
                  </div>
                </header>

                <div className="mt-2 flex flex-col items-center gap-3">
                  <AnimatePresence initial={false}>
                    <motion.button
                      type="button"
                      key={kisses}
                      onClick={handleKissClick}
                      className="relative inline-flex h-28 w-28 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_20%,hsl(var(--accent)),hsl(var(--primary)))] text-primary-foreground shadow-[0_18px_55px_rgba(0,0,0,0.55)] outline-none ring-2 ring-primary/60 ring-offset-2 ring-offset-background"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.92 }}
                    >
                      <Heart className="h-10 w-10" fill="currentColor" />
                      <motion.span
                        className="pointer-events-none absolute -bottom-8 text-xs font-semibold uppercase tracking-[0.22em] text-[hsl(var(--romantic-text-soft))]"
                        animate={{ opacity: [0.6, 1, 0.7] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        اضغطي للقبلة
                      </motion.span>
                    </motion.button>
                  </AnimatePresence>

                  <div className="mt-4 grid w-full grid-cols-2 gap-3 text-center text-xs sm:text-sm">
                    <div className="rounded-xl border border-border/60 bg-secondary/40 px-3 py-2">
                      <p className="text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">عدد القبلات</p>
                      <p className="text-xl font-bold text-primary">{kisses}</p>
                    </div>
                    <div className="rounded-xl border border-border/60 bg-secondary/40 px-3 py-2">
                      <p className="text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">الكومبو الحالي</p>
                      <p className="text-xl font-bold text-accent">{combo}</p>
                    </div>
                  </div>
                </div>

                <footer className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[0.7rem] text-muted-foreground">
                  <p>إذا وصلتي لمستوى "مجنونة بحب توما" لازم توريه له النتيجة فوراً.</p>
                  <span className="rounded-full bg-secondary/40 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-[hsl(var(--romantic-text-soft))]">
                    love level · {kisses} ♥
                  </span>
                </footer>
              </div>
            </article>

            {/* Other romantic mini-games (concept cards) */}
            <div className="space-y-4">
              <article className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card/90 p-4 shadow-[0_18px_40px_rgba(0,0,0,0.55)] backdrop-blur-xl">
                <div className="pointer-events-none absolute inset-x-0 -top-10 h-24 bg-[radial-gradient(circle_at_top,_hsl(var(--primary))_0%,_transparent_70%)] opacity-50 transition-opacity duration-500 group-hover:opacity-70" />
                <div className="relative flex flex-col gap-2">
                  <h3 className="text-sm font-semibold text-foreground">رسالة حب عشوائية</h3>
                  <p className="text-xs text-muted-foreground">
                    اضغطي ليطلع لك اقتباس حب عشوائي مكتوب لتوما فقط؛ كل مرة جملة أدفى من اللي قبلها.
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
                    لعبة بسيطة: تختاري من خيارات صفات، والصفحة تقول لك نسبة تطابق قلبك مع قلب توما (دائماً النتيجة: 100%).
                  </p>
                  <p className="mt-1 text-[0.7rem] text-muted-foreground/90">
                    ملاحظة: هذي أفكار لألعاب ثانية نقدر نكملها لك لو حبيتي توسّعين هدية توما.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
