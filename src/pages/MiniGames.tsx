import { Heart, Gamepad2, Sparkles, MessagesSquare, Stars } from "lucide-react";

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
          {/* Game 1: Kiss Clicker */}
          <article className="group relative flex flex-col justify-between rounded-2xl border border-border/70 bg-gradient-to-br from-card/90 via-secondary/80 to-card/80 p-5 shadow-[var(--romantic-card-glow)] backdrop-blur-xl">
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--accent)),transparent_70%)] opacity-60 group-hover:opacity-80" />
            <div className="relative space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary/60 px-3 py-1 text-[0.65rem] font-medium text-muted-foreground">
                <Heart className="h-3.5 w-3.5 text-primary" aria-hidden />
                <span>Game 1 · Kiss Clicker</span>
              </div>
              <h2 className="text-base font-semibold text-foreground">لعبة الككرز · عدّاد القبلات</h2>
              <p className="text-xs text-muted-foreground">
                نفس اللعبة الرئيسية لكن هنا بنطوّرها لاحقاً بمستويات وتحديات؛ كل قبلة تحفظيها كتذكار بينك وبين توما.
              </p>
            </div>
            <p className="mt-4 text-[0.7rem] text-[hsl(var(--romantic-text-soft))]">
              لاحقاً: نقدر نضيف نظام مراحل، وجوائز صغيرة مع رسائل حب بعد كل رقم مميّز من القبلات.
            </p>
          </article>

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

export default MiniGames;
