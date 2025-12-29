import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const getRandomDelay = () => 1000 + Math.random() * 3000; // 1–4 ثواني

const ReactionGame = () => {
  const [status, setStatus] = useState<"idle" | "waiting" | "ready" | "clicked">("idle");
  const [message, setMessage] = useState("لما تكوني جاهزة، اضغطي ابدأ وخلي يدك على الماوس.");
  const [bg, setBg] = useState<"default" | "waiting" | "go">("default");
  const [reaction, setReaction] = useState<number | null>(null);
  const [best, setBest] = useState<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const startRound = () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    setStatus("waiting");
    setReaction(null);
    setBg("waiting");
    setMessage("استعدي… لما تصير الشاشة خضرا اضغطي بأسرع ما تقدرين!");

    const delay = getRandomDelay();
    timeoutRef.current = window.setTimeout(() => {
      setStatus("ready");
      setBg("go");
      setMessage("الحين! اضغطي الحين بسرعة 😈");
      startTimeRef.current = performance.now();
    }, delay);
  };

  const handleClickArea = () => {
    if (status === "waiting") {
      // ضغطت بدري
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      setStatus("idle");
      setBg("default");
      setMessage("استعجلتي 😅 انتظري اللون الأخضر بعدين اضغطي.");
      return;
    }

    if (status === "ready" && startTimeRef.current) {
      const end = performance.now();
      const diff = Math.round(end - startTimeRef.current);
      setStatus("clicked");
      setBg("default");
      setReaction(diff);
      setMessage(`ردة فعلك: ${diff}ms، تقدرين تحسنين أكثر؟`);
      if (best == null || diff < best) setBest(diff);
    }
  };

  const bgClass =
    bg === "go"
      ? "bg-emerald-500/80"
      : bg === "waiting"
        ? "bg-muted"
        : "bg-card";

  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto flex max-w-xl flex-col gap-6 px-4 py-10 md:px-6">
        <header className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            لعبة ردة الفعل الخاطفة ⚡
          </h1>
          <p className="text-sm text-muted-foreground">
            انتظري لين تصير المنطقة خضراء، بعدين اضغطي بأسرع ما تقدرين وشوفي من فيكم أسرع واحد.
          </p>
        </header>

        <Card className="border-border/60 bg-card/80 shadow-md">
          <CardHeader>
            <CardTitle className="text-base">جاهزة للتحدي؟</CardTitle>
            <CardDescription className="text-xs text-muted-foreground sm:text-sm">
              لا تضغطين بدري! ركزي على اللون بس.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              className={`flex h-56 cursor-pointer items-center justify-center rounded-lg text-center text-sm font-medium text-foreground transition-colors ${bgClass}`}
              onClick={handleClickArea}
            >
              <p className="max-w-xs leading-relaxed">{message}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="rounded-md border border-border/70 bg-muted/40 p-3">
                <p className="text-[11px] text-muted-foreground">آخر نتيجة</p>
                <p className="text-lg font-semibold text-foreground">
                  {reaction != null ? `${reaction}ms` : "—"}
                </p>
              </div>
              <div className="rounded-md border border-border/70 bg-muted/40 p-3">
                <p className="text-[11px] text-muted-foreground">أفضل نتيجة</p>
                <p className="text-lg font-semibold text-foreground">
                  {best != null ? `${best}ms` : "—"}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button size="sm" onClick={startRound} className="w-full sm:w-auto">
              ابدأ جولة جديدة
            </Button>
            <p className="text-[11px] text-muted-foreground sm:text-xs">
              نصيحة: جربي تمسكين الماوس بنفس الطريقة دائماً عشان تشوفين تحسنك الحقيقي.
            </p>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
};

export default ReactionGame;
