import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Cake, Heart, Sparkles, Music2, PauseCircle } from "lucide-react";
import { motion } from "framer-motion";
import birthdayMusic from "@/assets/HAPPY_BIRTHDAY_INSTRUMENTAL.mp3";
import birthdayBg from "@/assets/madri-birthday-bg.jpg";

const MadriShnu = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    document.title = "مدري شنو – رسالة حب عيد ميلاد لتوما";

    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.4;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // تجاهل الخطأ لو المتصفح منع التشغيل التلقائي
        });
    }
  };
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <audio
        ref={audioRef}
        src={birthdayMusic}
        loop
        autoPlay
        className="hidden"
      />
      {/* خلفيات وأجواء عيد ميلاد */}
      <div className="pointer-events-none fixed inset-0 -z-40 bg-[radial-gradient(circle_at_top,_hsl(var(--primary)/0.38),_transparent_58%),radial-gradient(circle_at_bottom,_hsl(var(--accent)/0.3),_transparent_60%)]" />
      {/* هالة كيكة كبيرة في الخلفية */}
      <div className="pointer-events-none fixed inset-x-0 top-10 -z-30 flex justify-center">
        <div className="h-64 w-64 rounded-full bg-[radial-gradient(circle,_hsl(var(--card))_0%,_transparent_70%)] shadow-[0_0_120px_hsl(var(--primary)/0.7)] opacity-40" />
      </div>
      {/* أعمدة شموع ناعمة مع توهج */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 -z-20 flex justify-center gap-6 px-8 pb-4">
        {Array.from({ length: 7 }).map((_, index) => (
          <div
            key={index}
            className="relative flex h-20 w-2 items-end justify-center sm:h-24"
            style={{ animation: `flicker-${index % 3} 3.2s ease-in-out infinite` }}
          >
            <div className="h-16 w-full rounded-full bg-[linear-gradient(to_top,_hsl(var(--primary)/0.75),_hsl(var(--accent)/0.2))] shadow-[0_0_30px_hsl(var(--primary)/0.6)]" />
            <div className="absolute -top-3 h-4 w-4 rounded-full bg-[radial-gradient(circle,_hsl(var(--accent))_0%,_transparent_65%)] shadow-[0_0_25px_hsl(var(--accent)/0.9)]" />
          </div>
        ))}
      </div>
      {/* شرارات قلوب خفيفة */}
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-60">
        {Array.from({ length: 18 }).map((_, index) => (
          <span
            key={index}
            className="pulse absolute text-xs text-[hsl(var(--romantic-heart-soft))]"
            style={{
              left: `${5 + ((index * 11) % 90)}%`,
              top: `${10 + ((index * 7) % 80)}%`,
            }}
          >
            ✦
          </span>
        ))}
      </div>

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-6 px-4 py-8 animate-fade-in sm:px-6 sm:py-12">
        {/* ترويسة عيد الميلاد */}
        <motion.header
          className="flex items-center justify-between gap-3"
          initial={{ opacity: 0, y: -30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
              Birthday Letter · رسالة عيد ميلاد
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              خانة "مدري شنو" الخاصة بعيد ميلاد توما
            </h1>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
              رسالة سرّية، بس لقلب توما الي أحبّه اكثر من كل شي بهالدنيا.
            </p>
          </div>
          <motion.div
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 160, damping: 12 }}
          >
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary/70 px-3 py-1 text-[0.65rem] font-semibold text-muted-foreground shadow-[0_0_20px_hsl(var(--accent)/0.6)]">
              <Sparkles className="h-3 w-3 text-accent" aria-hidden />
              <span>Happy 17th Birthday</span>
            </span>
            <div className="relative flex h-12 w-12 items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_180deg,_hsl(var(--primary)),_hsl(var(--accent)),_hsl(var(--primary)))] opacity-70 blur-[6px]" />
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary shadow-[0_0_32px_hsl(var(--primary)/0.9)]">
                <Cake className="h-5 w-5 text-primary-foreground" aria-hidden />
              </div>
            </div>
            <button
              type="button"
              onClick={togglePlay}
              className="hover-scale mt-1 inline-flex items-center gap-1 rounded-full bg-primary/85 px-2.5 py-1 text-[0.65rem] font-semibold text-primary-foreground shadow-[0_0_18px_hsl(var(--primary)/0.85)]"
            >
              {isPlaying ? (
                <>
                  <PauseCircle className="h-3.5 w-3.5" aria-hidden />
                  <span>أوقفي موسيقى عيد الميلاد</span>
                </>
              ) : (
                <>
                  <Music2 className="h-3.5 w-3.5" aria-hidden />
                  <span>شغّلي موسيقى عيد الميلاد</span>
                </>
              )}
            </button>
          </motion.div>
        </motion.header>

        {/* كرت الرسالة على اليمين */}
        <div className="flex flex-1 items-stretch gap-4 sm:gap-6">
          <motion.div
            className="flex w-24 flex-shrink-0 items-center justify-center sm:w-28 md:w-32"
            initial={{ opacity: 0, x: -26, rotate: -6, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.25 }}
            whileHover={{ scale: 1.08, rotate: -4 }}
          >
            <div className="relative flex aspect-[3/5] w-full items-center justify-center overflow-hidden rounded-3xl bg-[radial-gradient(circle_at_top,_hsl(var(--primary)),_hsl(var(--accent)))] shadow-[0_0_55px_hsl(var(--primary)/0.7)]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_hsl(var(--accent)/0.3),_transparent_60%)]" />
              <span className="relative text-5xl font-black tracking-tight text-primary-foreground drop-shadow-[0_0_20px_hsl(var(--background)/0.85)]">
                T
              </span>
              <span className="pointer-events-none absolute inset-x-1 bottom-3 mx-auto rounded-full bg-background/35 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-primary-foreground/90 backdrop-blur-sm">
                Happy Birthday
              </span>
            </div>
          </motion.div>

          {/* كرت الرسالة على اليمين */}
          <motion.section
            className="relative ml-auto flex max-w-xl flex-1 overflow-hidden rounded-2xl border border-border/60 bg-background/88 p-4 shadow-[var(--romantic-card-glow)] backdrop-blur-2xl sm:p-6"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          >
            {/* هالة قلوب وبالونات خفيفة داخل الكرت */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_hsl(var(--accent))_0%,_transparent_55%),radial-gradient(circle_at_bottom_left,_hsl(var(--primary))_0%,_transparent_60%)] opacity-30" />

            {/* كيكة كبيرة في الخلفية داخل الكرت */}
            <div className="pointer-events-none absolute inset-x-4 bottom-[-4.25rem] flex justify-center sm:bottom-[-5.5rem]">
              <div className="relative h-40 w-full max-w-md">
                {/* طبقات الكيكة */}
                <div className="absolute bottom-0 left-1/2 h-20 w-[92%] -translate-x-1/2 rounded-3xl bg-[linear-gradient(to_top,_hsl(var(--card)),_hsl(var(--secondary)))] shadow-[0_18px_60px_hsl(var(--primary)/0.7)] opacity-90" />
                <div className="absolute bottom-10 left-1/2 h-10 w-[70%] -translate-x-1/2 rounded-3xl bg-[linear-gradient(to_top,_hsl(var(--card)),_hsl(var(--primary)/0.5))] shadow-[0_10px_40px_hsl(var(--accent)/0.7)]" />

                {/* الشموع فوق الكيكة */}
                <div className="absolute -top-1 left-1/2 flex -translate-x-1/2 gap-3">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-end"
                      style={{ animation: `flicker-${index % 3} 2.7s ease-in-out infinite` }}
                    >
                      <div className="h-10 w-1.5 rounded-full bg-[linear-gradient(to_top,_hsl(var(--primary)/0.8),_hsl(var(--accent)/0.3))] shadow-[0_0_18px_hsl(var(--primary)/0.7)]" />
                      <div className="-mt-3 h-3 w-3 rounded-full bg-[radial-gradient(circle,_hsl(var(--accent))_0%,_transparent_65%)] shadow-[0_0_22px_hsl(var(--accent)/0.95)]" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* بالونات قلوب تطلع لفوق */}
            <div className="pointer-events-none absolute inset-0">
              {Array.from({ length: 9 }).map((_, index) => (
                <span
                  key={index}
                  className="floating-heart text-[11px] text-[hsl(var(--romantic-heart-soft))]"
                  style={{
                    left: `${6 + ((index * 13) % 88)}%`,
                    animationDelay: `${index * 0.9}s`,
                  }}
                >
                  🎈
                </span>
              ))}
            </div>

            <div className="relative flex h-full flex-col gap-4">
              <motion.div
                className="inline-flex items-center gap-2 rounded-full bg-secondary/70 px-3 py-1 text-[0.7rem] font-medium text-muted-foreground"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
              >
                <Heart className="h-3.5 w-3.5 text-primary" aria-hidden />
                <span>من قلب يحبج اكثر مما يتخيل الكون</span>
              </motion.div>

              <motion.div
                className="max-h-[70vh] space-y-4 overflow-y-auto pr-2 text-sm leading-relaxed text-muted-foreground sm:text-base"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { staggerChildren: 0.045, delayChildren: 0.3 },
                  },
                }}
              >
                {[
                  "توتي الحلوه الاموت عليها الاعشقها يا احلا بنوته شافتها عيوني.",
                  "كل عام وانت بالف خير وهابي بيرث دي واحبج واموت عليج.",
                  "والله احلا 17 سنه مرت عله الكرة الارضيه كلها وغصبا عله الكون كامل همين انت احلا شي اجه بهذا العالم.",
                  "اعرف هذا المدري شنو قليل ومو كافي ابد حته اوصفج وافرحج بشكل كامل، بس وعد، هاي البداية وبس وبعدج ماشفتي شي.",
                  "ماعرف شحجي، زربه عالعراق بس يعني اموت بيج واعشقج بالحسين، كلشي بحياتي هاي انت، كلشي يخليني سعيج انت وماكو غير انت، احبج واموت عليج يا روحي انت.",
                  "احبج اموتتتتتت عليجججججججج.",
                  "لهسه اتذكر الموسم الفات… شنو الموسم الفات اقصد يعني السنه الفاتت يوم الخميس عيد ميلادج كتبتلج هيج او شي قريب منه مامتاكد، بس كتبت:",
                  '"توما الاسطورة كل عام وانت بالف خير ياخوش بنيه، وهاج كيكة وهاج ورده".',
                  'وانت رديتي علي: "يااا كيوتي انت وانت بالف خير".',
                  "يعنييييييي احجبج واموت عليج، لهسه اتذكر شكد كزكزت عالموضوع، خرب يومج بس احبج، اموت عليج يا احلا بنيه بهذا العالم، والكون احلا انثى بالكون، يعني حته لو اكو انثى فضائية انت عابرتها.",
                  "شوكت يجي اليوم ونصير سوه، خرب روحج ونحتفل بعيد ميلادج واجيبلج ورده واطيج بوسه ونلعب فيفا ونباوع برشلونه.",
                  "تدرين بعد يومين لعبة برشلونة، حته من يجي عيد ميلادج ترجع برشلونة، شكد وجهج خير عالعالم.",
                  "اكلج، شو خل اتغزل؟ شو جني صاير فاهي ماعرف احجي. انت شايفه عيونج؟ شايفتهن شكد حلوات؟ والله الله يساعد قلبي، انا كل مره اشوف صورة الج اتعب نفسياً لان ماكدر الزمج، ابوس عيونج للصبح، كمية الجمال الي بيهم تنسّيني اني منو وليش عايش. احبج.",
                  "ويعني نبدي بخصرج لو ما نبدي؟ يعني ترا اذا ابدي بخصرج ما اكمل، لو ارجع اكمل بعقليتج الحلوه، لو ارجع اكمل بشعرج؟ انت بحر مايخلص من الجمال.",
                  "ماكدر احجي شي هواي واحجي شي قليل لان اضلمج، انت من كل ناحية متكامله ومثاليه، انت الافضل في تاريخ الكون، ونسبة ضهورج كلش ضئيله، واني كنت المحظوظ زايد، كلش كلش محظوظ.",
                  "صدق يعني نسبة ضهورج 0.000000000000000000000000001.",
                  "ماعرف شحجي والله، مادري شكول اكثر يكدر يعبر عن الشعور الي احسه وياج وكمية حبي الج. احبج من كل عقلي وقلبي، واحبج من اعماق اعماق اعماق قاع قلبي الصغير.",
                  "احبج يا روحي، اموت عليج، اعشقج كلش هواي، انت فوك كل غزل وسبب كل شعور حلو احس بيه، انت اول دفعه وحافز يجيني اكمل بيه حياتي وشغلي وافكر بمستقبلي. انت مستقبلي وحياتي وروحي وعقلي وقلبي وكلشي حلو بحياتي.",
                  "طولج الحلو وشعراتج الناعمات، خرب روحج، اريد ازمج واجعصج جعصصصصصصصصصصصص. صدك يعني فدوه اروحلج، اموت بيج اموت بيج اموت بيج يا توما، احبج.",
                  "اعذريني عله المدري شنو هذا، انت تستاهلين اضعاف، بس والله لوما هذا الذكاء الاصطناعي والاشتراك، جان كل شوي اغير وافكار اكثر. بس الأهم: أحبج هواي.",
                ].map((paragraph, index) => (
                  <motion.p
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 8 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </motion.div>
            </div>
          </motion.section>
        </div>

        {/* فوتر بسيط */}
        <footer className="flex items-center justify-between gap-4 pt-2 text-xs text-muted-foreground">
          <span>من قلب شايل اسم توما بكل نبضة.</span>
          <Link
            to="/"
            className="hover-scale inline-flex items-center gap-1 rounded-full border border-border/70 bg-background/70 px-3 py-1 font-medium text-[0.7rem] hover:bg-secondary/60"
          >
            ارجعي للصفحه الرئيسيه
          </Link>
        </footer>
      </main>
    </div>
  );
};

export default MadriShnu;
