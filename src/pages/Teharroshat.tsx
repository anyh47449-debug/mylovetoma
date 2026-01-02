import { motion } from "framer-motion";

type PhraseGroup = {
  group: string;
  phrases: string[];
};

const lovePhraseGroups: PhraseGroup[] = [
  {
    group: "أوروبا",
    phrases: [
      "Je t'aime (French)",
      "Te amo (Spanish)",
      "Ti amo (Italian)",
      "Ich liebe dich (German)",
      "Ik hou van jou (Dutch)",
      "Jeg elsker deg (Norwegian)",
      "Te iubesc (Romanian)",
      "Seni seviyorum (Turkish)",
      "Σ' αγαπώ (Greek)",
      "Ich liebe di (Swiss German)",
      "T'estimo (Catalan)",
      "Te dua (Albanian)",
    ],
  },
  {
    group: "آسيا",
    phrases: [
      "أحبك (Arabic)",
      "愛してる (Japanese)",
      "사랑해 (Korean)",
      "我爱你 (Chinese – Simplified)",
      "我愛你 (Chinese – Traditional)",
      "मैं तुमसे प्यार करता हूँ / करती हूँ (Hindi)",
      "ฉันรักคุณ (Thai)",
      "Aku cinta kamu (Indonesian)",
      "Saranghaeyo (Korean – formal)",
    ],
  },
  {
    group: "الأمريكتان",
    phrases: [
      "I love you (English)",
      "Eu te amo (Portuguese – Brazil)",
      "Te quiero (Spanish – Latin America)",
      "Mi ta stimabo (Papiamento)",
    ],
  },
  {
    group: "أفريقيا وباقي العالم",
    phrases: [
      "Nakupenda (Swahili)",
      "Ngiyakuthanda (Zulu)",
      "Ek is lief vir jou (Afrikaans)",
      "Aloha wau ia 'oe (Hawaiian)",
    ],
  },
];

const birthdayPhraseGroups: PhraseGroup[] = [
  {
    group: "أوروبا",
    phrases: [
      "Joyeux anniversaire (French)",
      "Feliz cumpleaños (Spanish)",
      "Buon compleanno (Italian)",
      "Alles Gute zum Geburtstag (German)",
      "Gefeliciteerd met je verjaardag (Dutch)",
      "Gratulerer med dagen (Norwegian)",
      "La multi ani (Romanian)",
      "Doğum günün kutlu olsun (Turkish)",
      "Χρόνια πολλά (Greek)",
      "Alles Gueti zum Geburtstag (Swiss German)",
      "Per molts anys (Catalan)",
      "Gëzuar ditëlindjen (Albanian)",
    ],
  },
  {
    group: "آسيا",
    phrases: [
      "عيد ميلاد سعيد (Arabic)",
      "お誕生日おめでとう (Japanese)",
      "생일 축하해 (Korean)",
      "生日快乐 (Chinese – Simplified)",
      "生日快樂 (Chinese – Traditional)",
      "जन्मदिन मुबारक हो (Hindi)",
      "สุขสันต์วันเกิด (Thai)",
      "Selamat ulang tahun (Indonesian)",
    ],
  },
  {
    group: "الأمريكتان",
    phrases: [
      "Happy Birthday (English)",
      "Feliz aniversário (Portuguese – Brazil)",
      "Feliz cumpleaños (Spanish – Latin America)",
      "Happy Earthstrong (Caribbean English)",
    ],
  },
  {
    group: "أفريقيا وباقي العالم",
    phrases: [
      "Herzlichen Glückwunsch zum Geburtstag (German – extended)",
      "Veels geluk met jou verjaarsdag (Afrikaans)",
      "Ndinokushuvira zuva rekuzvarwa rakanaka (Shona)",
      "Happy bornday (Slang)",
    ],
  },
];

const Teharroshat = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Hidden SEO heading */}
      <h1 className="sr-only">تحرشات حب رومانسية لتوما بكلمة أحبج وهابي بيرث داي بكل لغات العالم</h1>

      <main className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col gap-8 px-4 py-10">
        {/* Title section */}
        <section className="animate-fade-in text-center">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="inline-flex flex-col items-center gap-3 rounded-3xl border border-border/70 bg-background/80 px-6 py-4 shadow-[var(--romantic-card-glow)] backdrop-blur-xl"
          >
            <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Soft teasing · تحرشات حب</p>
            <p className="text-sm text-[hsl(var(--romantic-text-soft))]">
              هذه الصفحة مخصصة للتحرشات النظيفة: نفس الجملة مرتين، مرة تقول أحبج بكل اللغات، ومرة تهنّي توما بعيد ميلاده
              بكل اللغات .
            </p>
          </motion.div>
        </section>

        {/* Grid sections */}
        <section className="grid gap-6 md:grid-cols-2">
          {/* أحبج بكل لغات العالم */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
            className="group relative overflow-hidden rounded-3xl border border-border/70 bg-card/90 p-5 shadow-[var(--romantic-card-glow)] backdrop-blur-xl animate-enter"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_hsl(var(--primary))_0%,_transparent_70%)] opacity-40 transition-opacity duration-500 group-hover:opacity-80" />
            <div className="relative flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary/60 px-3 py-1 text-[0.7rem] font-medium text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-primary" aria-hidden />
                <span>احبج بكل لغات العالم</span>
              </div>
              <h2 className="text-sm font-semibold text-foreground">أحبج بكل اللغات</h2>
              <p className="text-xs text-muted-foreground">بعنيييييي أاحببججج اننجبي اموت عليج.</p>
              <div className="mt-3 max-h-80 space-y-3 overflow-y-auto pr-1 text-[0.75rem] text-[hsl(var(--romantic-text-soft))]">
                {lovePhraseGroups.map((group) => (
                  <div key={group.group} className="space-y-1.5">
                    <h3 className="text-[0.7rem] font-semibold text-muted-foreground/90">{group.group}</h3>
                    <ul className="space-y-1.5">
                      {group.phrases.map((phrase) => (
                        <li
                          key={phrase}
                          className="hover-scale rounded-full border border-border/40 bg-background/60 px-3 py-1 text-start shadow-sm"
                        >
                          {phrase}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.article>

          {/* Happy Birthday بكل لغات العالم */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.12 }}
            className="group relative overflow-hidden rounded-3xl border border-border/70 bg-card/90 p-5 shadow-[var(--romantic-card-glow)] backdrop-blur-xl animate-enter"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,_hsl(var(--accent))_0%,_transparent_70%)] opacity-40 transition-opacity duration-500 group-hover:opacity-80" />
            <div className="relative flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary/60 px-3 py-1 text-[0.7rem] font-medium text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
                <span>Happy Birthday بكل لغات العالم</span>
              </div>
              <h2 className="text-sm font-semibold text-foreground">هابي بيرث داي بكل اللغات</h2>
              <p className="text-xs text-muted-foreground">
                هنا نفس الفكرة بس مخصوصة لعيد ميلادج ، ويعني هابي بيرث دي وكذا.
              </p>
              <div className="mt-3 max-h-80 space-y-3 overflow-y-auto pr-1 text-[0.75rem] text-[hsl(var(--romantic-text-soft))]">
                {birthdayPhraseGroups.map((group) => (
                  <div key={group.group} className="space-y-1.5">
                    <h3 className="text-[0.7rem] font-semibold text-muted-foreground/90">{group.group}</h3>
                    <ul className="space-y-1.5">
                      {group.phrases.map((phrase) => (
                        <li
                          key={phrase}
                          className="hover-scale rounded-full border border-border/40 bg-background/60 px-3 py-1 text-start shadow-sm"
                        >
                          {phrase}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.article>
        </section>

        {/* Bottom teasing text */}
        <section className="mb-4 animate-fade-in text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="mx-auto max-w-xl rounded-3xl border border-dashed border-border/70 bg-background/80 px-5 py-3 text-sm text-[hsl(var(--romantic-text-soft))] shadow-[var(--romantic-card-glow)] backdrop-blur-xl"
          >
            احبج جذب ماكو تحرشات، من تكملين "المدري شنو" نتحرش هعيهعيعه
          </motion.p>
        </section>
      </main>
    </div>
  );
};

export default Teharroshat;
