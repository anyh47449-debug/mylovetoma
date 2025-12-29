import { useMemo, useState } from "react";
import { ArrowLeft, Gamepad2, Heart, Shuffle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

// صفحة ميني غيمز جديدة بالكامل بدون ماريو ولا كرز
// فيها ثلاث ألعاب بسيطة ورومانسية تلعبونها أنتي وتوما مع بعض

const LOVE_DARES = [
  "ارسلي لتوما فويس قصير تقولين فيه أول شيء حبيتيه فيه.",
  "اختاري صورة قديمة لكم وأرسليها له مع جملة: (شوف وين بدأنا).",
  "اكتبي رسالة قصيرة لتوما تبدأ بـ: (أحب فيك...) وكملّيها بدون تفكير.",
  "اسألي توما: (لو نروح أي مكان الآن، وين تاخذني؟) ولازم يجاوب فورًا.",
  "اختاري أغنية تذكركم ببعض، وشغليها له وأنتِ فاتحة اللعبة.",
] as const;

const MEMORY_QUESTIONS = [
  "أول لحظة حسّيتي فيها إن توما شخص مختلف عن الباقين؟",
  "موقف بسيط من يومكم العادي، بس خلاك تحبيه أكثر؟",
  "لو توصفين علاقتكم في جملة واحدة، إيش بتكون؟",
  "إيش أكثر شيء تتمنين تحققونه سوا في المستقبل؟",
  "إيش كلمة لو سمعتِها منه الآن، بتصلح مودك فورًا؟",
] as const;

const COMPLIMENT_TEMPLATES = [
  "كل ضغطة قلب هنا هي مرة قلتِ فيها (يا حظي في توما) حتى لو ما نطقْتيها.",
  "كل مرة تزيدين العدّاد، تذكّري موقف بسيط خلاك تبتسمي بسببه.",
  "هذا العدّاد مو رقم، هذا عدد المرات اللي تستاهلين تنسمّين فيها أميرة توما.",
];

const CherryGame = () => {
  const [activeTab, setActiveTab] = useState<"dares" | "memory" | "counter">("dares");

  return (
    <div className="relative min-h-screen overflow-hidden">
      <h1 className="sr-only">ميني غيمز رومنسية لتوما بدون ماريو ولا كرز</h1>

      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.5),_transparent_65%)]"
      />

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-4 py-10">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[hsl(var(--romantic-text-soft))] backdrop-blur">
              <Gamepad2 className="h-4 w-4 text-primary" aria-hidden />
              <span>toma galaxy · mini games</span>
            </div>
            <h2 className="text-lg font-semibold text-foreground">
              ميني غيمز ناعمة لتوما
            </h2>
            <p className="text-xs text-muted-foreground">
              ثلاث ألعاب بسيطة ولطيفة: تحديات حب، أسئلة ذكريات، وعدّاد قلوب؛ كل شيء هنا معموله مخصوص لكم أنتم الاثنين.
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
              <button
                type="button"
                onClick={() => setActiveTab("dares")}
                className={`rounded-full px-4 py-1.5 transition ${
                  activeTab === "dares"
                    ? "bg-primary text-primary-foreground shadow"
                    : "text-muted-foreground hover:bg-background/40"
                }`}
              >
                تحديات حب لطيفة
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("memory")}
                className={`rounded-full px-4 py-1.5 transition ${
                  activeTab === "memory"
                    ? "bg-primary text-primary-foreground shadow"
                    : "text-muted-foreground hover:bg-background/40"
                }`}
              >
                أسئلة ذكريات
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("counter")}
                className={`rounded-full px-4 py-1.5 transition ${
                  activeTab === "counter"
                    ? "bg-primary text-primary-foreground shadow"
                    : "text-muted-foreground hover:bg-background/40"
                }`}
              >
                عدّاد القلوب
              </button>
            </div>

            <div className="rounded-2xl border border-border/70 bg-card/90 p-5 shadow-[var(--romantic-card-glow)] backdrop-blur-xl min-h-[260px]">
              {activeTab === "dares" && <LoveDaresGame />}
              {activeTab === "memory" && <MemoryQuestionsGame />}
              {activeTab === "counter" && <HeartCounterGame />}
            </div>
          </div>

          <aside className="space-y-4 rounded-2xl border border-border/70 bg-secondary/40 p-5 text-[0.75rem] text-[hsl(var(--romantic-text-soft))] backdrop-blur-xl">
            <h3 className="flex items-center gap-2 text-xs font-semibold tracking-wide text-foreground">
              <Sparkles className="h-4 w-4 text-accent" aria-hidden />
              كيف تلعبون؟
            </h3>
            <ul className="space-y-2 list-disc list-inside">
              <li>اختاري تبويب واحد، واقرئي التحدّي أو السؤال بصوت مسموع لتوما.</li>
              <li>جاوبوا أو نفّذوا التحدّي مع بعض، حتى لو كنتم بعاد؛ صوتكم يكفي.</li>
              <li>ممكن كل يوم تختارين سؤال واحد أو تحدّي واحد وترسلينه له.</li>
              <li>الهدف مو إنكم "تفوزون"… الهدف إنكم تضحكون وتتكلمون من قلبكم.</li>
            </ul>
            <p className="pt-1 text-[0.7rem] text-muted-foreground">
              لو حبيتي النمط هذا، نقدر نضيف لاحقاً ميني غيمز زيادة بنفس الأسلوب وبأفكار منك أنت.
            </p>
          </aside>
        </section>
      </main>
    </div>
  );
};

const LoveDaresGame = () => {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % LOVE_DARES.length);
  };

  return (
    <div className="flex h-full flex-col justify-between gap-4">
      <div className="space-y-2">
        <p className="inline-flex items-center gap-2 rounded-full bg-secondary/60 px-3 py-1 text-[0.65rem] font-medium text-muted-foreground">
          <Shuffle className="h-3.5 w-3.5 text-primary" aria-hidden />
          <span>Game · تحديات حب</span>
        </p>
        <h3 className="text-sm font-semibold text-foreground">اضغطي وتطلع لكم جرعة حب جديدة</h3>
        <p className="text-[0.75rem] text-muted-foreground">
          كل ضغطة زر تطلع تحدّي صغير تسوينه لتوما الآن أو ترسلينه له، حسّسيه إن الدنيا هديّة وهو نصّها.
        </p>
      </div>

      <div className="relative mt-2 flex-1 rounded-xl border border-border/60 bg-background/70 p-4">
        <div className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_60%)]" />
        <div className="relative flex h-full items-center justify-center text-center">
          <p className="max-w-md text-sm leading-relaxed text-[hsl(var(--romantic-text-soft))]">
            {LOVE_DARES[index]}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 pt-1">
        <button
          type="button"
          onClick={handleNext}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-1.5 text-[0.75rem] font-semibold text-primary-foreground shadow-sm hover:shadow-[var(--romantic-card-glow)]"
        >
          <Shuffle className="h-3.5 w-3.5" aria-hidden />
          تحدّي حب جديد
        </button>
        <span className="text-[0.7rem] text-muted-foreground">
          التحدّي رقم {index + 1} من {LOVE_DARES.length}
        </span>
      </div>
    </div>
  );
};

const MemoryQuestionsGame = () => {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % MEMORY_QUESTIONS.length);
  };

  return (
    <div className="flex h-full flex-col justify-between gap-4">
      <div className="space-y-2">
        <p className="inline-flex items-center gap-2 rounded-full bg-secondary/60 px-3 py-1 text-[0.65rem] font-medium text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden />
          <span>Game · ذكرياتنا</span>
        </p>
        <h3 className="text-sm font-semibold text-foreground">سؤال واحد يفتح ألف ذكرى</h3>
        <p className="text-[0.75rem] text-muted-foreground">
          جاوبي على السؤال بصوت مسموع أو برسالة طويلة لتوما. مافي إجابة صح أو خطأ، في قلب يحكي وقلب يسمع.
        </p>
      </div>

      <div className="relative mt-2 flex-1 rounded-xl border border-border/60 bg-background/70 p-4">
        <div className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_60%)]" />
        <div className="relative flex h-full items-center justify-center text-center">
          <p className="max-w-md text-sm leading-relaxed text-[hsl(var(--romantic-text-soft))]">
            {MEMORY_QUESTIONS[index]}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 pt-1">
        <button
          type="button"
          onClick={handleNext}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-1.5 text-[0.75rem] font-semibold text-primary-foreground shadow-sm hover:shadow-[var(--romantic-card-glow)]"
        >
          سؤال جديد
        </button>
        <span className="text-[0.7rem] text-muted-foreground">
          السؤال رقم {index + 1} من {MEMORY_QUESTIONS.length}
        </span>
      </div>
    </div>
  );
};

const HeartCounterGame = () => {
  const [count, setCount] = useState(0);

  const message = useMemo(() => {
    if (count === 0) return "كل مرة تضغطي قلب، تخيّلي ابتسامة صغيرة على وجه توما.";
    if (count < 10) return "هذه بداية عدّاد حب صغير… بس مع الوقت يصير مجرة كاملة.";
    if (count < 25)
      return "العدد هذا يمثل كم مرة تستحقين فيها حضن طويل بدون ما يقول ولا كلمة.";
    return COMPLIMENT_TEMPLATES[count % COMPLIMENT_TEMPLATES.length];
  }, [count]);

  return (
    <div className="flex h-full flex-col justify-between gap-4">
      <div className="space-y-2">
        <p className="inline-flex items-center gap-2 rounded-full bg-secondary/60 px-3 py-1 text-[0.65rem] font-medium text-muted-foreground">
          <Heart className="h-3.5 w-3.5 text-primary" aria-hidden />
          <span>Game · عدّاد القلوب</span>
        </p>
        <h3 className="text-sm font-semibold text-foreground">كل ضغطة قلب = لحظة حب</h3>
        <p className="text-[0.75rem] text-muted-foreground">
          استخدمي العدّاد هذا كـ "عداد امتنان"؛ كل ما تذكّرتي موقف حلو بينكم، زيدي رقم واحد.
        </p>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => setCount((c) => c + 1)}
          className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-[0_0_40px_rgba(0,0,0,0.6)] transition hover:scale-105 hover:shadow-[var(--romantic-card-glow)]"
        >
          <Heart className="h-10 w-10" aria-hidden />
        </button>
        <div className="text-center">
          <div className="text-2xl font-semibold text-foreground">{count}</div>
          <p className="mt-1 max-w-xs text-[0.75rem] text-[hsl(var(--romantic-text-soft))]">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CherryGame;
