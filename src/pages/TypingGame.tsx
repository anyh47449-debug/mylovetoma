import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import FloatingHeartsBackground from "../components/FloatingHeartsBackground";

const SENTENCES = [
  "أحبك أكثر مما أقدر أشرح بالكلام",
  "وجودك في يومي يخلي كل شي ألطف",
  "أنتي أجمل صدفة صارت في حياتي",
  "ضحكتك هي الصوت المفضل عندي",
  "معاك أحس الدنيا أبسط وأحلى",
  "اموت عليج",
  "اعشقج",
  "اموت عله شعرج",
  "اريد حلك",
  "تريدين جاي",
  "ادري المدري شننو كي ومو ذاك الواو بس يعني والله احبج",
  "اريد بنوته",
  "بتول كي",
  "الذكاء الاصطناعي خسيس",
  "هعيهيعهيعهيعيهعي",
];

const GAME_DURATION = 30; // ثواني

const TypingGame = () => {
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [isRunning, setIsRunning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const target = useMemo(() => SENTENCES[currentIndex], [currentIndex]);

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
      if (score > bestScore) setBestScore(score);
    }
  }, [timeLeft, isRunning, score, bestScore]);

  const handleStart = () => {
    setTimeLeft(GAME_DURATION);
    setIsRunning(true);
    setScore(0);
    setInput("");
    setCurrentIndex(0);
  };

  const handleChange = (value: string) => {
    if (!isRunning) return;
    setInput(value);

    const maxLen = Math.min(value.length, target.length);
    let correct = 0;
    for (let i = 0; i < maxLen; i++) {
      if (value[i] === target[i]) correct++;
    }

    // مجموع الحروف الصحيحة اللي كتبتها
    const total = score - (score % 1) + correct; // بس للتأكيد أنه رقم صحيح
    setScore(total);

    if (value.length >= target.length) {
      // انتقلي للجملة اللي بعدها
      setCurrentIndex((prev) => (prev + 1) % SENTENCES.length);
      setInput("");
    }
  };

  const progress = ((GAME_DURATION - timeLeft) / GAME_DURATION) * 100;

  // تلوين الجملة الهدف حسب الكتابة
  const coloredTarget = useMemo(() => {
    const chars = target.split("");
    return chars.map((ch, i) => {
      const typed = input[i];
      let cls = "text-muted-foreground";
      if (typed != null) {
        cls = typed === ch ? "text-primary" : "text-destructive";
      }
      return (
        <span key={i} className={cls}>
          {ch}
        </span>
      );
    });
  }, [target, input]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <FloatingHeartsBackground />
      <section className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-10 md:px-6">
        <header className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            سباق كتابه ....الذكاء الاصطاعي كي وبتول كي
          </h1>
          <p className="text-sm text-muted-foreground">
            عندج 30 ثانية تكتبين أكبر عدد ممكن من الحروف الصحيحة في جمل لطيفة مثل عيونج.
          </p>
        </header>

        <Card className="border-border/60 bg-card/80 shadow-md">
          <CardHeader className="space-y-3">
            <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
              <div className="flex flex-col">
                <span className="text-[11px] text-muted-foreground">الوقت المتبقي</span>
                <span className="text-lg font-semibold text-foreground">{timeLeft}s</span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-[11px] text-muted-foreground">أفضل نتيجة لك</span>
                <span className="text-lg font-semibold text-foreground">{bestScore} حرف</span>
              </div>
            </div>

            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-primary transition-[width]" style={{ width: `${progress}%` }} />
            </div>

            <CardTitle className="text-base">اكتبي الجملة الظاهرة قدامج وبس </CardTitle>
            <CardDescription className="text-xs text-muted-foreground sm:text-sm">
              كل ما خلصتي جملة كاملة، يطلع لك سطر جديد تلقائيًا.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md border border-border/70 bg-muted/40 px-3 py-2 text-sm leading-relaxed">
              {coloredTarget}
            </div>

            <Textarea
              value={input}
              onChange={(e) => handleChange(e.target.value)}
              disabled={!isRunning}
              className="min-h-[120px] resize-none text-sm"
              placeholder={isRunning ? "اكتبي هنا…" : "اضغطي ابدأ فوق أول"}
            />

            <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="rounded-md border border-border/70 bg-muted/40 p-3">
                <p className="text-[11px] text-muted-foreground">الحروف الصحيحة في الجولة</p>
                <p className="text-lg font-semibold text-foreground">{score}</p>
              </div>
              <div className="rounded-md border border-border/70 bg-muted/40 p-3">
                <p className="text-[11px] text-muted-foreground">وضع اللعبة</p>
                <p className="text-lg font-semibold text-foreground">
                  {isRunning ? "شغالة" : timeLeft === 0 ? "انتهت" : "جاهزة"}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button size="sm" onClick={handleStart} className="w-full sm:w-auto">
              {isRunning ? "إعادة من جديد" : "ابدأي السباق"}
            </Button>
            <p className="text-[11px] text-muted-foreground sm:text-xs">
              تقدرين تتحدين شريكك: كل واحد يلعب جولة وتشوفون مين يطلع بأعلى عدد حروف...انا فايز مايحتاج.
            </p>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
};

export default TypingGame;
