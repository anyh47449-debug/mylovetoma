import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DURATION = 10; // ثواني

const SpamHeartsGame = () => {
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [count, setCount] = useState(0);
  const [best, setBest] = useState(0);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const id = window.setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => window.clearInterval(id);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      if (count > best) setBest(count);
    }
  }, [timeLeft, isRunning, count, best]);

  const start = () => {
    setTimeLeft(DURATION);
    setIsRunning(true);
    setCount(0);
  };

  const handleClick = () => {
    if (!isRunning) return;
    setCount((c) => c + 1);
  };

  const progress = ((DURATION - timeLeft) / DURATION) * 100;

  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto flex max-w-xl flex-col gap-6 px-4 py-10 md:px-6">
        <header className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            لعبة سبام القلوب 💘
          </h1>
          <p className="text-sm text-muted-foreground">
            عندك {DURATION} ثواني بس، سبّمي على الزر قد ما تقدرين وشوفي كم قلب قدرتِ تجمعين.
          </p>
        </header>

        <Card className="border-border/60 bg-card/80 shadow-md">
          <CardHeader className="space-y-3">
            <CardTitle className="text-base">من اللي يقدر يسبّم أكثر؟</CardTitle>
            <CardDescription className="text-xs text-muted-foreground sm:text-sm">
              أنتي وتوما تلعبون بالتناوب، وكل واحد يحاول يكسر رقم الثاني.
            </CardDescription>

            <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="rounded-md border border-border/70 bg-muted/40 p-3">
                <p className="text-[11px] text-muted-foreground">الوقت المتبقي</p>
                <p className="text-lg font-semibold text-foreground">{timeLeft}s</p>
              </div>
              <div className="rounded-md border border-border/70 bg-muted/40 p-3">
                <p className="text-[11px] text-muted-foreground">أفضل عدد قلوب</p>
                <p className="text-lg font-semibold text-foreground">{best}</p>
              </div>
            </div>

            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-[width]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <button
              type="button"
              onClick={handleClick}
              className="flex h-40 w-full items-center justify-center rounded-2xl border border-primary/60 bg-primary/10 text-4xl transition active:scale-95 sm:h-48"
            >
              {isRunning ? "💖" : "جاهزة؟"}
            </button>

            <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="rounded-md border border-border/70 bg-muted/40 p-3">
                <p className="text-[11px] text-muted-foreground">القلوب في هذه الجولة</p>
                <p className="text-lg font-semibold text-foreground">{count}</p>
              </div>
              <div className="rounded-md border border-border/70 bg-muted/40 p-3">
                <p className="text-[11px] text-muted-foreground">حالة اللعبة</p>
                <p className="text-lg font-semibold text-foreground">
                  {isRunning ? "شغالة" : timeLeft === 0 ? "انتهت" : "جاهزة"}
                </p>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button size="sm" onClick={start} className="w-full sm:w-auto">
              {isRunning ? "إعادة من جديد" : "ابدأي جولة سبام"}
            </Button>
            <p className="text-[11px] text-muted-foreground sm:text-xs">
              كل واحد منكم يلعب جولة، وسجّلوا أعلى رقم قلوب عشان تعرفون مين السبّام الحقيقي.
            </p>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
};

export default SpamHeartsGame;
