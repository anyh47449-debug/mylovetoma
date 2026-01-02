import { useState } from "react";
import { Heart, Gamepad2, Sparkles, MessagesSquare, Stars } from "lucide-react";
import { useNavigate } from "react-router-dom";
import marioCoinSfx from "../assets/mario-coin.mp3";
const MiniGames = () => {
  const navigate = useNavigate();
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
            <p className="text-sm text-muted-foreground"></p>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 animate-enter">
          {/* Game 1: Romantic Mini Games Hub */}
          <RomanticMiniGamesCard />

          {/* Game 2: Random Love Letters */}
          <article className="group relative flex flex-col justify-between rounded-2xl border border-border/70 bg-card/90 p-5 shadow-[0_18px_40px_rgba(0,0,0,0.55)] backdrop-blur-xl">
            <div className="pointer-events-none absolute inset-x-0 -top-10 h-24 bg-[radial-gradient(circle_at_top,_hsl(var(--primary))_0%,_transparent_70%)] opacity-50 group-hover:opacity-80" />
            <div className="relative space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary/60 px-3 py-1 text-[0.65rem] font-medium text-muted-foreground">
                <MessagesSquare className="h-3.5 w-3.5 text-accent" aria-hidden />
                <span>Game 2 · Love Letters</span>
              </div>
              <h2 className="text-base font-semibold text-foreground">
                حان وقت اعذبج بما انو انت ماتعرفين تكتبين بالكيبورد بسرعه{" "}
              </h2>
              <p className="text-xs text-muted-foreground">
                لعبة كتابة سريعة: مادري همين منين اجيت بهاي الفكره بس اتذكر جان اكو موقع اتعلم بي اكتب سريع فااا كلت ليش
                لا نعذب مريتي.
              </p>
              <button
                type="button"
                onClick={() => navigate("/games/typing")}
                className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground shadow-sm transition hover:shadow-[var(--romantic-card-glow)]"
              >
                ادخلي ويعني شسمه ... احبج
              </button>
            </div>
            <p className="mt-4 rounded-xl bg-secondary/40 px-3 py-2 text-[0.7rem] text-[hsl(var(--romantic-text-soft))]">
              مثال رسالة: الرسائل عشوائية من الغباء الاصطناعي انا معلي ." ✦
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
                لعبة كروت قلوب: اكتشفي مكان كل زوج متشابه بأقل عدد حركات وبأسرع وقت.
              </p>
              <button
                type="button"
                onClick={() => navigate("/games/memory")}
                className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground shadow-sm transition hover:shadow-[var(--romantic-card-glow)]"
              >
                ادخلي لعبة القلوب
              </button>
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
                <span>Game 4 · Reaction Duel</span>
              </div>
              <h2 className="text-base font-semibold text-foreground">تحدّي ردة الفعل</h2>
              <p className="text-xs text-muted-foreground">
                شاشة تصير خضراء فجأة؛ أول واحدة تضغط أسرع تاخذ الجولة. اللعبة تحفظ أفضل زمن وصلتِ له.
              </p>
              <button
                type="button"
                onClick={() => navigate("/games/reaction")}
                className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground shadow-sm transition hover:shadow-[var(--romantic-card-glow)]"
              >
                ادخلي لعبة السرعة
              </button>
            </div>
            <p className="mt-4 text-[0.7rem] text-[hsl(var(--romantic-text-soft))]">
              جربي تلعبين أكثر من جولة مع توما وشوفي مين أسرع واحد فيكم فعلًا.
            </p>
          </article>

          {/* Game 5: Secret Message */}
          <article className="group relative flex flex-col justify-between rounded-2xl border border-dashed border-border/70 bg-background/70 p-5 backdrop-blur-xl">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),_transparent_55%)] opacity-70 group-hover:opacity-90" />
            <div className="relative space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary/60 px-3 py-1 text-[0.65rem] font-medium text-muted-foreground">
                <Heart className="h-3.5 w-3.5 text-primary" aria-hidden />
                <span>Game 5 · Spam Hearts</span>
              </div>
              <h2 className="text-base font-semibold text-foreground">رسالة سبام القلوب</h2>
              <p className="text-xs text-muted-foreground">
                لعبة سريعة: سبّمي على زر القلب خلال وقت محدد، وشوفي كم قلب حب تقدرين تطلقين له.
              </p>
              <button
                type="button"
                onClick={() => navigate("/games/spam-hearts")}
                className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground shadow-sm transition hover:shadow-[var(--romantic-card-glow)]"
              >
                ادخلي لعبة سبام القلوب
              </button>
            </div>
            <p className="mt-4 text-[0.7rem] text-muted-foreground/90">
              تقدرين تتحدين توما: كل واحد يلعب جولة وتشوفون مين يجمع قلوب أكثر في نفس الوقت.
            </p>
          </article>
        </section>
      </main>
    </div>
  );
};

const RomanticMiniGamesCard = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();

  const handleEnterGame = () => {
    if (isTransitioning) return;

    const audio = new Audio(marioCoinSfx);
    audio.volume = 0.6;
    void audio.play().catch(() => {});

    setIsTransitioning(true);

    setTimeout(() => {
      navigate("/games/cherry");
    }, 900);
  };

  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br from-card/90 via-secondary/80 to-card/80 p-5 shadow-[var(--romantic-card-glow)] backdrop-blur-xl">
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--accent)),transparent_70%)] opacity-60 group-hover:opacity-80" />
      <div className="relative space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-secondary/60 px-3 py-1 text-[0.65rem] font-medium text-muted-foreground">
          <Gamepad2 className="h-3.5 w-3.5 text-primary" aria-hidden />
          <span>Game 1 · Soft Mini Games</span>
        </div>
        <h2 className="text-base font-semibold text-foreground">ثلاث ميني غيمز ناعمة لتوما</h2>
        <p className="text-xs text-muted-foreground">
          غرفة صغيرة فيها ثلاث ألعاب: تحديات حب، أسئلة ذكريات، وعدّاد قلوب. ما فيها منصات ولا جري، بس كلام ناعم يطلّع
          اللي في قلبك.
        </p>
      </div>
      <div className="mt-4 space-y-3">
        <button
          type="button"
          onClick={handleEnterGame}
          className="w-full rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground shadow-sm transition hover:shadow-[var(--romantic-card-glow)]"
        >
          ادخلي غرفة الميني غيمز
        </button>
        <p className="text-[0.7rem] text-[hsl(var(--romantic-text-soft))]">
          اختاري اللعبة اللي تعجبك من فوق: تحدّي، سؤال، أو عدّاد قلوب… وكل شيء مصمَّم علشان أنتي وتوما.
        </p>
      </div>

      {isTransitioning && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/90 backdrop-blur-md animate-fade-in">
          <div className="flex flex-col items-center gap-3">
            <div className="relative h-16 w-16">
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.14),_transparent_70%)]" />
              <div className="absolute inset-0 animate-[spin_1.2s_ease-in-out_forwards] rounded-full border-2 border-dashed border-[hsl(var(--primary))]" />
              <div className="absolute inset-4 rounded-2xl bg-[radial-gradient(circle_at_top,_hsl(var(--romantic-heart-soft)),_hsl(var(--accent)))] shadow-[0_0_25px_rgba(255,107,156,0.9)]" />
            </div>
            <p className="text-xs text-[hsl(var(--romantic-text-soft))]">
              جاري فتح غرفة الميني غيمز الرومنسية… ركّزي في اللي يحس فيه قلبك 💜
            </p>
          </div>
        </div>
      )}
    </article>
  );
};

export default MiniGames;
