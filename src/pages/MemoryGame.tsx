import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ICONS = ["💖", "🌙", "⭐", "🌹"];

interface Tile {
  id: number;
  icon: string;
  matched: boolean;
}

const createShuffledTiles = (): Tile[] => {
  const base = ICONS.flatMap((icon, index) => [
    { id: index * 2, icon, matched: false },
    { id: index * 2 + 1, icon, matched: false },
  ]);

  // خلط بسيط
  for (let i = base.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [base[i], base[j]] = [base[j], base[i]];
  }
  return base;
};

const MemoryGame = () => {
  const [tiles, setTiles] = useState<Tile[]>(() => createShuffledTiles());
  const [openTiles, setOpenTiles] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [bestMoves, setBestMoves] = useState<number | null>(null);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const allMatched = tiles.every((t) => t.matched);

  useEffect(() => {
    if (!isRunning || allMatched) return;

    const id = window.setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);

    return () => window.clearInterval(id);
  }, [isRunning, allMatched]);

  useEffect(() => {
    if (allMatched && isRunning) {
      setIsRunning(false);
      if (bestMoves == null || moves < bestMoves) setBestMoves(moves);
      if (bestTime == null || time < bestTime) setBestTime(time);
    }
  }, [allMatched, isRunning, bestMoves, bestTime, moves, time]);

  const handleTileClick = (index: number) => {
    if (allMatched) return;
    if (!isRunning) setIsRunning(true);

    if (openTiles.includes(index)) return;
    if (openTiles.length === 2) return;

    const newOpen = [...openTiles, index];
    setOpenTiles(newOpen);

    if (newOpen.length === 2) {
      setMoves((m) => m + 1);
      const [first, second] = newOpen;
      const firstTile = tiles[first];
      const secondTile = tiles[second];

      if (firstTile.icon === secondTile.icon) {
        // تطابق
        setTiles((prev) =>
          prev.map((tile, i) =>
            i === first || i === second ? { ...tile, matched: true } : tile,
          ),
        );
        setTimeout(() => setOpenTiles([]), 400);
      } else {
        // مو متطابقين
        setTimeout(() => setOpenTiles([]), 700);
      }
    }
  };

  const handleReset = () => {
    setTiles(createShuffledTiles());
    setOpenTiles([]);
    setMoves(0);
    setTime(0);
    setIsRunning(false);
  };

  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-10 md:px-6">
        <header className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            لعبة كروت القلوب 🎴
          </h1>
          <p className="text-sm text-muted-foreground">
            افتحي الكروت المقلوبة وحاولي تجمعين كل زوج من الأيقونات المتشابهة بأقل عدد حركات.
          </p>
        </header>

        <Card className="border-border/60 bg-card/80 shadow-md">
          <CardHeader className="space-y-3">
            <CardTitle className="text-base">اختبري تركيزك</CardTitle>
            <CardDescription className="text-xs text-muted-foreground sm:text-sm">
              كل جولة الكروت تنخلط من جديد، حاولي تكسرين رقمك في الوقت وعدد التحركات.
            </CardDescription>

            <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="rounded-md border border-border/70 bg-muted/40 p-3">
                <p className="text-[11px] text-muted-foreground">الوقت الحالي</p>
                <p className="text-lg font-semibold text-foreground">{time}s</p>
              </div>
              <div className="rounded-md border border-border/70 bg-muted/40 p-3">
                <p className="text-[11px] text-muted-foreground">عدد الحركات</p>
                <p className="text-lg font-semibold text-foreground">{moves}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="rounded-md border border-border/70 bg-muted/40 p-3">
                <p className="text-[11px] text-muted-foreground">أفضل وقت لك</p>
                <p className="text-lg font-semibold text-foreground">
                  {bestTime != null ? `${bestTime}s` : "—"}
                </p>
              </div>
              <div className="rounded-md border border-border/70 bg-muted/40 p-3">
                <p className="text-[11px] text-muted-foreground">أقل حركات مسجلة</p>
                <p className="text-lg font-semibold text-foreground">
                  {bestMoves != null ? bestMoves : "—"}
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-4 gap-3 sm:gap-4">
              {tiles.map((tile, index) => {
                const isOpen = openTiles.includes(index) || tile.matched;
                return (
                  <button
                    key={tile.id}
                    type="button"
                    onClick={() => handleTileClick(index)}
                    className={`flex aspect-square items-center justify-center rounded-lg border text-2xl transition-all sm:text-3xl ${
                      isOpen
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border bg-muted/40 text-muted-foreground"
                    }`}
                  >
                    {isOpen ? tile.icon : "?"}
                  </button>
                );
              })}
            </div>

            {allMatched && (
              <p className="mt-2 text-center text-xs font-medium text-primary sm:text-sm">
                خلصتي اللعبة! جربي تعيدين وتشوفين إذا تقدرين تكسرين رقمك 👀
              </p>
            )}
          </CardContent>

          <CardFooter className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button size="sm" onClick={handleReset} className="w-full sm:w-auto">
              {allMatched ? "لعبة جديدة" : "إعادة من البداية"}
            </Button>
            <p className="text-[11px] text-muted-foreground sm:text-xs">
              تقدرون تلعبون بالتناوب: كل واحد يحاول يكمل بأقل حركات وأقل وقت.
            </p>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
};

export default MemoryGame;
