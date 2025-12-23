import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, Gamepad2, Music, Pause } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const LOVE_MUSIC_TRACK = "/audio/Niall_Horan_-_Heaven_Official_Video.mp3";

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const LYRICS_TIMED = [
    { time: 0, text: "♪♪♪" },
    { time: 15, text: "♪ STRANGE LIGHT REVOLVES AROUND YOU ♪" },
    { time: 18, text: "♪ YOU FLOAT ACROSS THE ROOM ♪" },
    { time: 20, text: "♪ YOUR TOUCH IS MADE OF SOMETHING ♪" },
    { time: 23, text: "♪ HEAVEN CAN’T HOLD A CANDLE TO ♪" },
    { time: 28, text: "♪ YOU’RE MADE OF SOMETHIN’ NEW ♪" },
    { time: 31, text: "♪ LET’S NOT GET COMPLICATED ♪" },
    { time: 33, text: "♪ LET’S JUST ENJOY THE VIEW ♪" },
    { time: 36, text: "♪ IT’S HARD TO BE A HUMAN ♪" },
    { time: 39, text: "♪ SO MUCH TO PUT AN ANSWER TO ♪" },
    { time: 44, text: "♪ BUT THAT’S JUST WHAT WE DO ♪" },
    { time: 46, text: "♪ GOD ONLY KNOWS WHERE THIS COULD GO ♪" },
    { time: 50, text: "♪ AND EVEN IF OUR LOVE STARTS TO GROW OUTTA CONTROL ♪" },
    { time: 55, text: "♪ AND YOU AND ME GO UP IN FLAMES ♪" },
    { time: 60, text: "♪ HEAVEN WON’T BE THE SAME ♪" },
    { time: 67, text: "♪ I’M HAVIN’ REVELATIONS ♪" },
    { time: 70, text: "♪ YOU DANCE ACROSS THE FLOOR ♪" },
    { time: 73, text: "♪ BEYOND INFATUATION ♪" },
    { time: 75, text: "♪ HOW I OBSESSIVELY ADORE YOU ♪" },
    { time: 81, text: "♪ THAT’S WHAT I DO ♪" },
    { time: 85, text: "♪ I COULD DIE IN YOUR KISS ♪" },
    { time: 88, text: "♪ NO IT DOESN’T GET, DOESN’T GET BETTER THAN THIS ♪" },
    { time: 93, text: "♪ GOD ONLY KNOWS WHERE THIS COULD GO ♪" },
    { time: 97, text: "♪ AND EVEN IF OUR LOVE STARTS TO GROW OUTTA CONTROL ♪" },
    { time: 102, text: "♪ AND YOU AND ME GO UP IN FLAMES ♪" },
    { time: 107, text: "♪ HEAVEN WON’T BE THE SAME ♪" },
    { time: 109, text: "♪ GOD ONLY KNOWS WHERE THIS COULD GO ♪" },
    { time: 113, text: "♪ AND EVEN IF OUR LOVE STARTS TO GROW OUTTA CONTROL ♪" },
    { time: 118, text: "♪ AND YOU AND ME GO UP IN FLAMES ♪" },
    { time: 122, text: "♪ HEAVEN WON’T BE THE SAME ♪" },
    { time: 127, text: "♪ (HEAVEN WON’T BE THE SAME) ♪" },
    { time: 135, text: "♪ I BELIEVE I BELIEVE, I COULD DIE IN YOUR KISS ♪" },
    { time: 140, text: "♪ NO IT DOESN’T GET, DOESN’T GET BETTER THAN, BETTER THAN THIS ♪" },
    { time: 148, text: "♪ GOD ONLY KNOWS WHERE THIS COULD GO ♪" },
    { time: 152, text: "♪ AND EVEN IF OUR LOVE STARTS TO GROW OUTTA CONTROL ♪" },
    { time: 157, text: "♪ AND YOU AND ME GO UP IN FLAMES ♪" },
    { time: 161, text: "♪ HEAVEN WON’T BE THE SAME ♪" },
    { time: 163, text: "♪ GOD ONLY KNOWS WHERE THIS COULD GO ♪" },
    { time: 167, text: "♪ AND EVEN IF OUR LOVE STARTS TO GROW OUTTA CONTROL ♪" },
    { time: 172, text: "♪ AND YOU AND ME GO UP IN FLAMES ♪" },
    { time: 177, text: "♪ HEAVEN WON’T BE THE SAME ♪" },
  ];

  const EXTRA_MESSAGES = [
    "احبج مريتي",
    "اعشقج",
    "خلنتزوج",
    "عليج الله مو شغلي حلو استاهل حلك",
    "ترا انت حلوه",
    "يعني شوفي عيونج واو",
    "شسمه يعني احبج",
  ];

  type ExtraEvent = {
    time: number;
    text: string;
    x: number; // نسبة أفقية على الشاشة
    y: number; // نسبة عمودية على الشاشة
  };
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
  const [extraEvents, setExtraEvents] = useState<ExtraEvent[]>([]);
  const [activeExtraIndex, setActiveExtraIndex] = useState<number | null>(null);
  const glowStyle = useMemo(
    () => ({
      background: `radial-gradient(circle at ${cursorPos.x}px ${cursorPos.y}px, hsl(var(--primary) / 0.55), transparent 60%)`,
    }),
    [cursorPos.x, cursorPos.y]
  );

  useEffect(() => {
    // جهّز أوقات عشوائية للرسائل الإضافية بناءً على طول الأغنية
    const audio = audioRef.current;
    if (!audio || extraEvents.length > 0) return;

    const duration = isFinite(audio.duration) && audio.duration > 0 ? audio.duration : 180;
    const minTime = 12; // ما نخليها في أول ثواني مرة
    const maxTime = Math.max(duration - 10, minTime + 10);

    const usedTimes: number[] = [];

    const generateRandomTime = () => {
      let t = minTime + Math.random() * (maxTime - minTime);
      // نحاول نخلي بينهم على الأقل 6 ثواني
      let tries = 0;
      while (usedTimes.some((u) => Math.abs(u - t) < 6) && tries < 10) {
        t = minTime + Math.random() * (maxTime - minTime);
        tries++;
      }
      usedTimes.push(t);
      return t;
    };

    const events: ExtraEvent[] = EXTRA_MESSAGES.map((text) => ({
      text,
      time: generateRandomTime(),
      x: 10 + Math.random() * 80,
      y: 15 + Math.random() * 65,
    })).sort((a, b) => a.time - b.time);

    setExtraEvents(events);
  }, [extraEvents.length]);

  useEffect(() => {
    let frameId: number;

    const syncLyricsAndExtras = () => {
      const audio = audioRef.current;
      if (!audio) return;

      const current = audio.currentTime;
      let activeLyricIndex = 0;

      for (let i = 0; i < LYRICS_TIMED.length; i++) {
        if (current >= LYRICS_TIMED[i].time) {
          activeLyricIndex = i;
        } else {
          break;
        }
      }

      setCurrentLyricIndex(activeLyricIndex);

      // ابحث عن رسالة عاطفية مناسبة للوقت الحالي
      if (extraEvents.length > 0) {
        const visibleWindow = 3; // مدة ظهور كل رسالة تقريباً
        const foundIndex = extraEvents.findIndex(
          (event) => current >= event.time && current <= event.time + visibleWindow
        );
        setActiveExtraIndex(foundIndex >= 0 ? foundIndex : null);
      }

      frameId = requestAnimationFrame(syncLyricsAndExtras);
    };

    if (isMusicPlaying) {
      frameId = requestAnimationFrame(syncLyricsAndExtras);
    }

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [isMusicPlaying, extraEvents]);

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
        className={`pointer-events-none fixed inset-0 -z-10 blur-3xl transition-opacity duration-700 ${
          isMusicPlaying ? "opacity-0" : "opacity-60"
        }`}
        style={glowStyle}
      />

      {/* Floating romantic hearts background */}
      <div
        className="romantic-hearts-layer transition-opacity duration-700 opacity-100"
        aria-hidden
      >
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

      {/* Floating random love messages layer */}
      {isMusicPlaying && activeExtraIndex !== null && extraEvents[activeExtraIndex] && (
        <motion.span
          className="pointer-events-none fixed z-0 max-w-[60vw] text-xs font-semibold text-[hsl(var(--romantic-text-soft))] sm:text-sm"
          style={{
            top: `${extraEvents[activeExtraIndex].y}vh`,
            left: `${extraEvents[activeExtraIndex].x}vw`,
          }}
          initial={{ opacity: 0, y: 12, x: -8 }}
          animate={{
            opacity: [0, 0.9, 0],
            y: [12, 0, -12],
            x: [-8, 0, 8],
          }}
          transition={{ duration: 3.2, ease: "easeInOut" }}
        >
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent drop-shadow-[0_0_14px_hsl(var(--romantic-heart-soft)/0.85)]">
            {extraEvents[activeExtraIndex]?.text}
          </span>
        </motion.span>
      )}

      {/* Background video layer (preloaded, tightly synced with music) */}
      <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
        <video
          ref={videoRef}
          className={`h-full w-full object-cover transition-opacity duration-75 ${
            isMusicPlaying ? "opacity-40 mix-blend-screen" : "opacity-0"
          }`}
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src="/video/love-bg.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Grain & overlay */}
      <div className="pointer-events-none fixed inset-0 -z-30 bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.35),_transparent_60%)]" />
      <div className="pointer-events-none fixed inset-0 -z-30 bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.35),_transparent_60%)]" />

      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-10 px-4 py-10">
        {/* Music control & hidden player */}
        <div className="pointer-events-none absolute right-4 top-4 z-30 flex items-center justify-end sm:right-6 sm:top-6">
          <button
            type="button"
            onClick={() => {
              const audioEl = audioRef.current;
              const vidEl = videoRef.current;
              if (!audioEl) return;

              if (isMusicPlaying) {
                audioEl.pause();
                vidEl?.pause();
                setIsMusicPlaying(false);
              } else {
                // ابدئي الاثنين من نفس اللحظة تقريبًا
                audioEl.currentTime = 0;
                if (vidEl) {
                  vidEl.currentTime = 0;
                }

                void audioEl
                  .play()
                  .then(() => {
                    setIsMusicPlaying(true);
                    if (vidEl) {
                      vidEl.play().catch(() => {});
                    }
                  })
                  .catch(() => {
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
        <motion.section
          className="flex w-full max-w-4xl flex-col items-center gap-6 text-center animate-fade-in"
          initial={{ opacity: 1, y: 0 }}
          animate={isMusicPlaying ? { y: 140 } : { y: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        >
          <motion.div
            className="relative inline-flex items-center justify-center"
            animate={isMusicPlaying ? { scale: 1.02 } : { scale: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {/* Outer glow – يتحرك فقط مع الموسيقى */}
            <motion.div
              className="absolute -inset-7 rounded-[2.7rem]"
              style={{
                backgroundImage:
                  "var(--romantic-gradient), radial-gradient(circle at 10% 0%, hsl(var(--accent) / 0.7), transparent 60%)",
              }}
              animate={
                isMusicPlaying
                  ? {
                      opacity: [0.45, 0.9, 0.65],
                      scale: [0.98, 1.04, 1],
                    }
                  : { opacity: 0.55, scale: 1 }
              }
              transition={{ duration: 5, repeat: isMusicPlaying ? Infinity : 0, ease: "easeInOut" }}
            />

            {/* Soft ring on the edges */}
            <div
              className={`pointer-events-none absolute -inset-1 rounded-[2.4rem] border border-primary/50 shadow-[0_0_28px_hsl(var(--romantic-heart-soft)/0.6)] transition-opacity duration-500 ${
                isMusicPlaying ? "opacity-100" : "opacity-0"
              }`}
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
                        "0 0 30px hsl(312 82% 72% / 0.7)",
                        "0 0 22px hsl(260 90% 70% / 0.6)",
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

              {/* Equalizer lines – على طول الحافة السفلية بدون تضارب مع الاسم */}
              {isMusicPlaying && (
                <div className="pointer-events-none absolute inset-x-10 bottom-2 flex items-end justify-center gap-[4px]">
                  {Array.from({ length: 11 }).map((_, index) => {
                    const base = 0.7 + ((index % 4) * 0.15);
                    return (
                      <motion.span
                        key={index}
                        className="h-4 w-[3px] origin-bottom rounded-full bg-gradient-to-t from-primary via-accent to-primary shadow-[0_0_10px_hsl(var(--romantic-heart-soft)/0.6)]"
                        animate={{ scaleY: [base, base + 0.3, base - 0.18, base] }}
                        transition={{
                          duration: 1.4,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.06,
                        }}
                        style={{ opacity: 0.95 - index * 0.04 }}
                      />
                    );
                  })}
                </div>
              )}

              <Heart className="h-7 w-7 text-primary" aria-hidden />
            </motion.button>
          </motion.div>

          <motion.div
            className="mt-6 max-w-xl rounded-2xl border border-border/60 bg-background/40 px-5 py-4 text-sm text-muted-foreground shadow-[var(--romantic-card-glow)] backdrop-blur-xl sm:text-base"
            initial={{ opacity: 1, y: 0 }}
            animate={isMusicPlaying ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <p className="leading-relaxed">
              هذه الصفحة هدية خاصة لك يا توما؛ كل لمعة، كل قلب، وكل حركة هنا مكتوبة بحبّ، ومصممة فقط لتقول:
            </p>
            <p className="mt-2 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-base font-semibold text-transparent sm:text-lg">
              أنت عالمي البنفسجي.
            </p>
          </motion.div>

          {/* Lyrics section – منفصل عن الكرت، يشتغل مع الأغنية بدون نشاز */}
          {isMusicPlaying && (
            <section className="mt-6 w-full max-w-2xl rounded-2xl border border-border/60 bg-background/55 px-4 py-3 text-center text-sm text-[hsl(var(--romantic-text-soft))] shadow-[var(--romantic-card-glow)] backdrop-blur-xl sm:text-base">
              <p className="mb-1 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                Heaven · Lyrics
              </p>
              <div className="space-y-0.5">
                {LYRICS_TIMED.map((line, index) => {
                  const distance = Math.abs(index - currentLyricIndex);
                  if (distance > 2) return null;
                  const isActive = index === currentLyricIndex;
                  const opacity = distance === 0 ? 1 : distance === 1 ? 0.6 : 0.32;

                  return (
                    <motion.p
                      key={index}
                      className={`text-xs sm:text-sm ${
                        isActive
                          ? "bg-gradient-to-r from-primary via-accent to-primary bg-clip-text font-semibold text-transparent"
                          : "text-[hsl(var(--romantic-text-soft))]"
                      }`}
                      style={{ opacity }}
                      initial={false}
                      animate={{ y: isActive ? -2 : 0 }}
                    >
                      {line.text}
                    </motion.p>
                  );
                })}
              </div>
            </section>
          )}
        </motion.section>
 
        {/* Mini games + sections overview */}
        <motion.section
          className="w-full max-w-5xl animate-enter"
          initial={{ opacity: 1, y: 0 }}
          animate={isMusicPlaying ? { opacity: 0, y: 40 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
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
        </motion.section>
      </main>

    </div>
  );
};

export default Index;
