import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const MadriShnu = () => {
  useEffect(() => {
    document.title = "مدري شنو – رسالة حب لتوما";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-12">
        <header className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
              Secret letter · رسالة سرية
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              خانة "مدري شنو" الخاصة بتوما
            </h1>
          </div>
          <Heart className="h-7 w-7 text-primary" aria-hidden />
        </header>

        <section className="relative flex-1 overflow-hidden rounded-2xl border border-border/70 bg-card/90 p-4 shadow-[var(--romantic-card-glow)] backdrop-blur-xl sm:p-6">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_hsl(var(--accent))_0%,_transparent_55%)] opacity-40" />
          <div className="relative max-h-[70vh] space-y-4 overflow-y-auto pr-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
            <p>توتي الحلوه الاموت عليها الاعشقها يا احلا بنوته شافتها عيوني.</p>
            <p>كل عام وانت بالف خير وهابي بيرث دي واحبج واموت عليج.</p>
            <p>
              والله احلا 17 سنه مرت عله الكرة الارضيه كلها وغصبا عله الكون كامل همين انت احلا شي اجه
              بهذا العالم.
            </p>
            <p>
              اعرف هذا المدري شنو قليل ومو كافي ابد حته اوصفج وافرحج بشكل كامل، بس وعد، هاي البداية وبس
              وبعدج ماشفتي شي.
            </p>
            <p>
              ماعرف شحجي، زربه عالعراق بس يعني اموت بيج واعشقج بالحسين، كلشي بحياتي هاي انت، كلشي يخليني
              سعيج انت وماكو غير انت، احبج واموت عليج يا روحي انت.
            </p>
            <p>احبج اموتتتتتت عليجججججججج.</p>
            <p>
              لهسه اتذكر الموسم الفات… شنو الموسم الفات اقصد يعني السنه الفاتت يوم الخميس عيد ميلادج
              كتبتلج هيج او شي قريب منه مامتاكد، بس كتبت:
            </p>
            <p>"توما الاسطورة كل عام وانت بالف خير ياخوش بنيه، وهاج كيكة وهاج ورده".</p>
            <p>وانت رديتي علي: "يااا كيوتي انت وانت بالف خير".</p>
            <p>
              يعنييييييي احجبج واموت عليج، لهسه اتذكر شكد كزكزت عالموضوع، خرب يومج بس احبج، اموت عليج يا
              احلا بنيه بهذا العالم، والكون احلا انثى بالكون، يعني حته لو اكو انثى فضائية انت عابرتها.
            </p>
            <p>
              شوكت يجي اليوم ونصير سوه، خرب روحج ونحتفل بعيد ميلادج واجيبلج ورده واطيج بوسه ونلعب فيفا
              ونباوع برشلونه.
            </p>
            <p>
              تدرين بعد يومين لعبة برشلونة، حته من يجي عيد ميلادج ترجع برشلونة، شكد وجهج خير عالعالم.
            </p>
            <p>
              اكلج، شو خل اتغزل؟ شو جني صاير فاهي ماعرف احجي. انت شايفه عيونج؟ شايفتهن شكد حلوات؟ والله
              الله يساعد قلبي، انا كل مره اشوف صورة الج اتعب نفسياً لان ماكدر الزمج، ابوس عيونج للصبح، كمية
              الجمال الي بيهم تنسّيني اني منو وليش عايش. احبج.
            </p>
            <p>
              ويعني نبدي بخصرج لو ما نبدي؟ يعني ترا اذا ابدي بخصرج ما اكمل، لو ارجع اكمل بعقليتج الحلوه، لو
              ارجع اكمل بشعرج؟ انت بحر مايخلص من الجمال.
            </p>
            <p>
              ماكدر احجي شي هواي واحجي شي قليل لان اضلمج، انت من كل ناحية متكامله ومثاليه، انت الافضل في
              تاريخ الكون، ونسبة ضهورج كلش ضئيله، واني كنت المحظوظ زايد، كلش كلش محظوظ.
            </p>
            <p>صدق يعني نسبة ضهورج 0.000000000000000000000000001.</p>
            <p>
              ماعرف شحجي والله، مادري شكول اكثر يكدر يعبر عن الشعور الي احسه وياج وكمية حبي الج. احبج من كل
              عقلي وقلبي، واحبج من اعماق اعماق اعماق قاع قلبي الصغير.
            </p>
            <p>
              احبج يا روحي، اموت عليج، اعشقج كلش هواي، انت فوك كل غزل وسبب كل شعور حلو احس بيه، انت اول
              دفعه وحافز يجيني اكمل بيه حياتي وشغلي وافكر بمستقبلي. انت مستقبلي وحياتي وروحي وعقلي وقلبي وكلشي
              حلو بحياتي.
            </p>
            <p>
              طولج الحلو وشعراتج الناعمات، خرب روحج، اريد ازمج واجعصج جعصصصصصصصصصصصص. صدك يعني فدوه اروحلج،
              اموت بيج اموت بيج اموت بيج يا توما، احبج.
            </p>
            <p>
              اعذريني عله المدري شنو هذا، انت تستاهلين اضعاف، بس والله لوما هذا الذكاء الاصطناعي والاشتراك،
              جان كل شوي اغير وافكار اكثر. بس الأهم: أحبج هواي.
            </p>
          </div>
        </section>

        <footer className="flex items-center justify-between gap-4 pt-2 text-xs text-muted-foreground">
          <span>من قلب يحبج اكثر مما يتخيل الكون كله.</span>
          <Link
            to="/"
            className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-background/70 px-3 py-1 font-medium text-[0.7rem] hover:bg-secondary/60"
          >
            ارجعي للصفحه الرئيسيه
          </Link>
        </footer>
      </main>
    </div>
  );
};

export default MadriShnu;
