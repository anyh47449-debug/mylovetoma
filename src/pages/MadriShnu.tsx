import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Cake, Heart, Sparkles } from "lucide-react";

const MadriShnu = () => {
  useEffect(() => {
    document.title = "مدري شنو – رسالة حب عيد ميلاد لتوما";
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      {/* خلفيات وأجواء عيد ميلاد */}
      <div className="pointer-events-none fixed inset-0 -z-30 bg-[radial-gradient(circle_at_top,_hsl(var(--primary)/0.3),_transparent_60%)]" />
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[radial-gradient(circle_at_bottom,_hsl(var(--accent)/0.25),_transparent_55%)]" />
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

      <main className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-4 py-8 animate-fade-in sm:px-6 sm:py-12">
        {/* ترويسة عيد الميلاد */}
        <header className="flex items-center justify-between gap-3">
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
          <div className="flex flex-col items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-secondary/70 px-3 py-1 text-[0.65rem] font-semibold text-muted-foreground">
              <Sparkles className="h-3 w-3 text-accent" aria-hidden />
              <span>Happy 17th Birthday</span>
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary shadow-[0_0_22px_hsl(var(--primary)/0.9)]">
              <Cake className="h-5 w-5 text-primary-foreground" aria-hidden />
            </div>
          </div>
        </header>

        {/* كرت الرسالة */}
        <section className="relative flex-1 overflow-hidden rounded-2xl border border-border/70 bg-card/95 p-4 shadow-[var(--romantic-card-glow)] backdrop-blur-xl sm:p-6">
          {/* هالة قلوب وبالونات خفيفة */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_hsl(var(--accent))_0%,_transparent_55%),radial-gradient(circle_at_bottom_left,_hsl(var(--primary))_0%,_transparent_60%)] opacity-40" />
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
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary/70 px-3 py-1 text-[0.7rem] font-medium text-muted-foreground">
              <Heart className="h-3.5 w-3.5 text-primary" aria-hidden />
              <span>من قلب يحبج اكثر مما يتخيل الكون</span>
            </div>

            <div className="max-h-[70vh] space-y-4 overflow-y-auto pr-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
              <p>توتي الحلوه الاموت عليها الاعشقها يا احلا بنوته شافتها عيوني.</p>
              <p>كل عام وانت بالف خير وهابي بيرث دي واحبج واموت عليج.</p>
              <p>
                والله احلا 17 سنه مرت عله الكرة الارضيه كلها وغصبا عله الكون كامل همين انت احلا شي اجه بهذا
                العالم.
              </p>
              <p>
                اعرف هذا المدري شنو قليل ومو كافي ابد حته اوصفج وافرحج بشكل كامل، بس وعد، هاي البداية وبس وبعدج
                ماشفتي شي.
              </p>
              <p>
                ماعرف شحجي، زربه عالعراق بس يعني اموت بيج واعشقج بالحسين، كلشي بحياتي هاي انت، كلشي يخليني سعيج
                انت وماكو غير انت، احبج واموت عليج يا روحي انت.
              </p>
              <p>احبج اموتتتتتت عليجججججججج.</p>
              <p>
                لهسه اتذكر الموسم الفات… شنو الموسم الفات اقصد يعني السنه الفاتت يوم الخميس عيد ميلادج كتبتلج
                هيج او شي قريب منه مامتاكد، بس كتبت:
              </p>
              <p>"توما الاسطورة كل عام وانت بالف خير ياخوش بنيه، وهاج كيكة وهاج ورده".</p>
              <p>وانت رديتي علي: "يااا كيوتي انت وانت بالف خير".</p>
              <p>
                يعنييييييي احجبج واموت عليج، لهسه اتذكر شكد كزكزت عالموضوع، خرب يومج بس احبج، اموت عليج يا احلا
                بنيه بهذا العالم، والكون احلا انثى بالكون، يعني حته لو اكو انثى فضائية انت عابرتها.
              </p>
              <p>
                شوكت يجي اليوم ونصير سوه، خرب روحج ونحتفل بعيد ميلادج واجيبلج ورده واطيج بوسه ونلعب فيفا ونباوع
                برشلونه.
              </p>
              <p>
                تدرين بعد يومين لعبة برشلونة، حته من يجي عيد ميلادج ترجع برشلونة، شكد وجهج خير عالعالم.
              </p>
              <p>
                اكلج، شو خل اتغزل؟ شو جني صاير فاهي ماعرف احجي. انت شايفه عيونج؟ شايفتهن شكد حلوات؟ والله الله
                يساعد قلبي، انا كل مره اشوف صورة الج اتعب نفسياً لان ماكدر الزمج، ابوس عيونج للصبح، كمية الجمال
                الي بيهم تنسّيني اني منو وليش عايش. احبج.
              </p>
              <p>
                ويعني نبدي بخصرج لو ما نبدي؟ يعني ترا اذا ابدي بخصرج ما اكمل، لو ارجع اكمل بعقليتج الحلوه، لو ارجع
                اكمل بشعرج؟ انت بحر مايخلص من الجمال.
              </p>
              <p>
                ماكدر احجي شي هواي واحجي شي قليل لان اضلمج، انت من كل ناحية متكامله ومثاليه، انت الافضل في تاريخ
                الكون، ونسبة ضهورج كلش ضئيله، واني كنت المحظوظ زايد، كلش كلش محظوظ.
              </p>
              <p>صدق يعني نسبة ضهورج 0.000000000000000000000000001.</p>
              <p>
                ماعرف شحجي والله، مادري شكول اكثر يكدر يعبر عن الشعور الي احسه وياج وكمية حبي الج. احبج من كل عقلي
                وقلبي، واحبج من اعماق اعماق اعماق قاع قلبي الصغير.
              </p>
              <p>
                احبج يا روحي، اموت عليج، اعشقج كلش هواي، انت فوك كل غزل وسبب كل شعور حلو احس بيه، انت اول دفعه
                وحافز يجيني اكمل بيه حياتي وشغلي وافكر بمستقبلي. انت مستقبلي وحياتي وروحي وعقلي وقلبي وكلشي حلو
                بحياتي.
              </p>
              <p>
                طولج الحلو وشعراتج الناعمات، خرب روحج، اريد ازمج واجعصج جعصصصصصصصصصصصص. صدك يعني فدوه اروحلج، اموت
                بيج اموت بيج اموت بيج يا توما، احبج.
              </p>
              <p>
                اعذريني عله المدري شنو هذا، انت تستاهلين اضعاف، بس والله لوما هذا الذكاء الاصطناعي والاشتراك، جان
                كل شوي اغير وافكار اكثر. بس الأهم: أحبج هواي.
              </p>
            </div>
          </div>
        </section>

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
