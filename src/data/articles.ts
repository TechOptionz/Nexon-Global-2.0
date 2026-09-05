// Article content lifted verbatim from the design source (Article.dc.html).
// Each field carries both languages, exactly as the artboards did.

export type Bi = { en: string; ar: string };
export type BiList = { en: string[]; ar: string[] };

export type Block =
  | { type: "h2" | "p" | "quote"; en: string; ar: string }
  | { type: "list"; en: string[]; ar: string[] };

export type Article = {
  slug: string;
  href: string;
  readMins?: number;
  tag: Bi;
  date: Bi;
  photo: string;
  authorSlot: string;
  authorPhoto: string;
  author: Bi;
  authorRole: Bi;
  title: Bi;
  excerpt: Bi;
  blocks: Block[];
};

export const ARTICLES: Article[] = [
  {
    "slug": "portugal",
    "href": "/insights/portugal",
    "readMins": 6,
    "tag": {
      "en": "Europe",
      "ar": "أوروبا"
    },
    "date": {
      "en": "Aug 2026",
      "ar": "أغسطس 2026"
    },
    "photo": "Lisbon tram street",
    "authorSlot": "layla",
    "authorPhoto": "Layla Haddad",
    "author": {
      "en": "Layla Haddad",
      "ar": "ليلى حداد"
    },
    "authorRole": {
      "en": "Managing Partner · 12 years in investment migration",
      "ar": "الشريكة الإدارية · 12 عامًا في هجرة الاستثمار"
    },
    "title": {
      "en": "Portugal’s Golden Visa in 2026: what changed and who still qualifies",
      "ar": "التأشيرة الذهبية البرتغالية في 2026: ما الذي تغيّر ومن لا يزال مؤهلًا"
    },
    "excerpt": {
      "en": "The fund route now dominates. Here is what the current rules mean for applicants weighing Portugal against Greece.",
      "ar": "مسار الصناديق يهيمن الآن. إليك ما تعنيه القواعد الحالية للمتقدمين الذين يقارنون بين البرتغال واليونان."
    },
    "blocks": [
      {
        "type": "h2",
        "en": "Property is out; regulated funds lead",
        "ar": "العقارات خرجت؛ والصناديق المنظَّمة تتصدر"
      },
      {
        "type": "p",
        "en": "Since the reforms that closed the real-estate route, almost every new Portuguese Golden Visa application runs through a regulated investment fund, a research contribution, a cultural donation or a job-creating company. The fund route dominates because it is the most straightforward to document and the easiest to hold for the five years the program requires.",
        "ar": "منذ الإصلاحات التي أغلقت مسار العقارات، يمرّ معظم طلبات التأشيرة الذهبية البرتغالية الجديدة عبر صندوق استثماري منظَّم، أو مساهمة بحثية، أو تبرع ثقافي، أو شركة تخلق وظائف. ويتصدر مسار الصناديق لأنه الأسهل توثيقًا والأيسر احتفاظًا به طوال السنوات الخمس التي يشترطها البرنامج."
      },
      {
        "type": "p",
        "en": "Choosing a fund is now the heart of the decision. Regulated funds differ sharply in strategy, lock-up period and liquidity, so the selection should be driven by your risk appetite and exit timeline, not by the residency permit alone.",
        "ar": "أصبح اختيار الصندوق جوهر القرار. تختلف الصناديق المنظَّمة اختلافًا كبيرًا في الاستراتيجية ومدة التجميد والسيولة، لذلك ينبغي أن يقود الاختيارَ مستوى تقبّلك للمخاطر وأفق الخروج، لا تصريح الإقامة وحده."
      },
      {
        "type": "quote",
        "en": "The question is no longer which apartment to buy, but which fund fits your risk appetite and timeline.",
        "ar": "لم يعد السؤال أي شقة تشتري، بل أي صندوق يناسب تقبّلك للمخاطر وجدولك الزمني."
      },
      {
        "type": "h2",
        "en": "What did not change",
        "ar": "ما الذي لم يتغيّر"
      },
      {
        "type": "p",
        "en": "The features that made Portugal popular are intact: a physical-presence requirement of about seven days a year, the ability to include your spouse, dependent children and dependent parents in one application, and a path to permanent residency or citizenship after five years of legal residency while keeping your original nationality.",
        "ar": "المزايا التي جعلت البرتغال خيارًا شائعًا ما زالت قائمة: شرط حضور فعلي نحو سبعة أيام في السنة، وإمكانية ضمّ الزوج/الزوجة والأبناء المعالين والوالدين المعالين في طلب واحد، ومسار إلى الإقامة الدائمة أو الجنسية بعد خمس سنوات من الإقامة القانونية مع الاحتفاظ بالجنسية الأصلية."
      },
      {
        "type": "h2",
        "en": "Portugal or Greece?",
        "ar": "البرتغال أم اليونان؟"
      },
      {
        "type": "p",
        "en": "Greece still offers a property route, no stay requirement and a faster decision. Portugal asks for a small annual presence and a longer wait, but leads to an EU passport. If your priority is a second home with minimal obligations, Greece usually wins; if your priority is citizenship for the family, Portugal remains the clearer route.",
        "ar": "لا تزال اليونان تقدّم مسارًا عقاريًا، بلا شرط إقامة، وبقرار أسرع. أما البرتغال فتطلب حضورًا سنويًا بسيطًا وانتظارًا أطول، لكنها تقود إلى جواز سفر أوروبي. إذا كانت أولويتك منزلًا ثانيًا بأقل الالتزامات فاليونان تتفوق عادةً؛ وإذا كانت أولويتك جنسية للعائلة فالبرتغال تبقى المسار الأوضح."
      },
      {
        "type": "h2",
        "en": "Who still qualifies",
        "ar": "من لا يزال مؤهلًا"
      },
      {
        "type": "list",
        "en": [
          "Non-EU / EEA / Swiss nationals aged 18 or over",
          "Clean criminal record in Portugal and country of residence",
          "Funds of lawful, documented origin",
          "Ability to maintain the investment for at least five years"
        ],
        "ar": [
          "مواطنو الدول من خارج الاتحاد الأوروبي / المنطقة الاقتصادية الأوروبية / سويسرا بعمر 18 عامًا أو أكثر",
          "سجل جنائي خالٍ في البرتغال وبلد الإقامة",
          "أموال ذات مصدر مشروع وموثّق",
          "القدرة على الاحتفاظ بالاستثمار لمدة خمس سنوات على الأقل"
        ]
      },
      {
        "type": "p",
        "en": "Current routes and minimums are listed on our Portugal Golden Visa page and confirmed in writing at consultation.",
        "ar": "المسارات والحدود الدنيا الحالية مدرجة في صفحة التأشيرة الذهبية البرتغالية لدينا، وتُؤكَّد كتابيًا في الاستشارة."
      }
    ]
  },
  {
    "slug": "caribbean",
    "href": "/insights/caribbean",
    "tag": {
      "en": "Caribbean",
      "ar": "الكاريبي"
    },
    "date": {
      "en": "Aug 2026",
      "ar": "أغسطس 2026"
    },
    "photo": "Caribbean harbour",
    "authorSlot": "omar",
    "authorPhoto": "Omar Al Farsi",
    "author": {
      "en": "Omar Al Farsi",
      "ar": "عمر الفارسي"
    },
    "authorRole": {
      "en": "Head of Investment Migration · former liaison for two Caribbean CBI units",
      "ar": "رئيس قسم هجرة الاستثمار · منسق سابق لدى وحدتَين كاريبيتَين للجنسية بالاستثمار"
    },
    "title": {
      "en": "Comparing the five Caribbean citizenship programs, side by side",
      "ar": "مقارنة برامج الجنسية الكاريبية الخمسة جنبًا إلى جنب"
    },
    "excerpt": {
      "en": "Donation levels, real-estate options, family costs and travel access — one table, no spin.",
      "ar": "مستويات التبرع، وخيارات العقارات، وتكاليف العائلة، وحرية السفر؛ في جدول واحد بلا تجميل."
    },
    "blocks": [
      {
        "type": "h2",
        "en": "Donation or real estate",
        "ar": "تبرع أم عقار"
      },
      {
        "type": "p",
        "en": "Antigua & Barbuda, Dominica, Grenada, St Kitts & Nevis and St Lucia all offer two main routes: a non-refundable contribution to a government fund, or the purchase of approved real estate that must be held for a set number of years. The donation is cheaper upfront and simpler to close; real estate costs more but leaves you with an asset to sell later.",
        "ar": "تقدّم أنتيغوا وبربودا، ودومينيكا، وغرينادا، وسانت كيتس ونيفيس، وسانت لوسيا مسارَين رئيسيَّين: مساهمة غير قابلة للاسترداد في صندوق حكومي، أو شراء عقار معتمد يجب الاحتفاظ به لعدد محدد من السنوات. التبرع أقل تكلفة مقدمًا وأسهل إتمامًا؛ أما العقار فأعلى تكلفة لكنه يترك لك أصلًا يمكن بيعه لاحقًا."
      },
      {
        "type": "h2",
        "en": "Family costs decide the ranking",
        "ar": "تكاليف العائلة تحدّد الترتيب"
      },
      {
        "type": "p",
        "en": "The headline figure is for a single applicant. Once a spouse, children and parents are added, the order changes: Antigua & Barbuda is usually the best value for larger families, while other programs charge per dependant. Always compare the total for your household, including due-diligence and government processing fees.",
        "ar": "الرقم الرئيسي يخصّ متقدمًا واحدًا. وبإضافة الزوج/الزوجة والأبناء والوالدين يتغيّر الترتيب: أنتيغوا وبربودا عادةً الخيار الأنسب للعائلات الكبيرة، بينما تفرض برامج أخرى رسومًا عن كل معال. قارن دائمًا المجموع لأسرتك، بما في ذلك رسوم العناية الواجبة والرسوم الحكومية."
      },
      {
        "type": "quote",
        "en": "The cheapest program on paper is rarely the cheapest for a family of five.",
        "ar": "أرخص برنامج على الورق نادرًا ما يكون الأرخص لعائلة من خمسة أفراد."
      },
      {
        "type": "h2",
        "en": "Travel access and extras",
        "ar": "حرية السفر والمزايا الإضافية"
      },
      {
        "type": "p",
        "en": "All five passports offer broad visa-free travel, but the exact list changes with diplomatic decisions and should be checked at the time of application rather than assumed. Grenada adds a distinctive benefit: its E-2 treaty with the United States lets citizens apply for an investor visa there.",
        "ar": "توفّر الجوازات الخمسة سفرًا واسعًا بلا تأشيرة، لكن القائمة الدقيقة تتغيّر مع القرارات الدبلوماسية ويجب التحقق منها وقت التقديم لا افتراضها. وتضيف غرينادا ميزة مختلفة: معاهدة E-2 مع الولايات المتحدة تتيح لمواطنيها التقدم لتأشيرة مستثمر هناك."
      },
      {
        "type": "h2",
        "en": "Timelines and vetting",
        "ar": "المدد الزمنية والتدقيق"
      },
      {
        "type": "p",
        "en": "Expect four to nine months from submission to passport. Vetting has tightened across the region, with interviews now a standard step, so a clean, consistent file matters more than ever. Our pre-submission screening exists to find and fix gaps before a government unit does.",
        "ar": "توقّع من أربعة إلى تسعة أشهر من التقديم حتى جواز السفر. تشدّد التدقيق في المنطقة كلها، وأصبحت المقابلات خطوة معتادة، لذا يهمّ الملف النظيف والمتّسق أكثر من أي وقت مضى. وفحصنا قبل التقديم موجود لرصد الفجوات ومعالجتها قبل أن ترصدها وحدة حكومية."
      },
      {
        "type": "list",
        "en": [
          "Grenada — from $235,000 · 6–9 months · E-2 treaty with the US",
          "St Kitts & Nevis — from $250,000 · 4–6 months · longest-running program",
          "Antigua & Barbuda — from $230,000 · 6–9 months · best value for larger families"
        ],
        "ar": [
          "غرينادا — من 235,000 دولار · 6–9 أشهر · معاهدة E-2 مع الولايات المتحدة",
          "سانت كيتس ونيفيس — من 250,000 دولار · 4–6 أشهر · أقدم برنامج",
          "أنتيغوا وبربودا — من 230,000 دولار · 6–9 أشهر · الخيار الأنسب للعائلات الكبيرة"
        ]
      }
    ]
  },
  {
    "slug": "uae",
    "href": "/insights/uae",
    "tag": {
      "en": "UAE",
      "ar": "الإمارات"
    },
    "date": {
      "en": "Jul 2026",
      "ar": "يوليو 2026"
    },
    "photo": "Dubai skyline at dusk",
    "authorSlot": "nexon",
    "authorPhoto": "author",
    "author": {
      "en": "NEXON consultants",
      "ar": "مستشارو نكسون"
    },
    "authorRole": {
      "en": "Residency, citizenship and global mobility consultancy · Dubai",
      "ar": "استشارات الإقامة والجنسية والتنقل العالمي · دبي"
    },
    "title": {
      "en": "Every UAE Golden Visa category explained — investors to specialists",
      "ar": "شرح كل فئات التأشيرة الذهبية الإماراتية، من المستثمرين إلى المتخصصين"
    },
    "excerpt": {
      "en": "Investors, entrepreneurs, specialists, students: the thresholds and documents for each route.",
      "ar": "المستثمرون ورواد الأعمال والمتخصصون والطلاب: الحدود والمستندات لكل مسار."
    },
    "blocks": [
      {
        "type": "h2",
        "en": "What the Golden Visa gives you",
        "ar": "ما الذي تمنحه التأشيرة الذهبية"
      },
      {
        "type": "p",
        "en": "A ten-year renewable residency that does not depend on an employer or local sponsor. Holders can sponsor their spouse and children, stay outside the UAE for extended periods without losing status, and in most categories sponsor domestic staff as well.",
        "ar": "إقامة لعشر سنوات قابلة للتجديد لا تعتمد على جهة عمل أو كفيل محلي. يمكن لحاملها كفالة الزوج/الزوجة والأبناء، والإقامة خارج الإمارات لفترات طويلة دون فقدان الوضع، وفي معظم الفئات كفالة العمالة المنزلية أيضًا."
      },
      {
        "type": "h2",
        "en": "Investors",
        "ar": "المستثمرون"
      },
      {
        "type": "p",
        "en": "The investor category is the most common route for our clients. It is open to those who place a qualifying public investment or hold property that meets the threshold, currently from AED 2,000,000. Decisions are fast, typically two to four weeks once the file is complete.",
        "ar": "فئة المستثمر هي المسار الأكثر شيوعًا بين عملائنا. وهي متاحة لمن يضع استثمارًا عامًا مؤهلًا أو يمتلك عقارًا يستوفي الحد المطلوب، حاليًا من 2,000,000 درهم. القرارات سريعة، عادةً بين أسبوعَين وأربعة أسابيع بعد اكتمال الملف."
      },
      {
        "type": "h2",
        "en": "Entrepreneurs",
        "ar": "رواد الأعمال"
      },
      {
        "type": "p",
        "en": "Founders of approved startups or projects with demonstrable economic value can apply through the entrepreneur route. Approval letters from a recognised incubator or authority carry most of the weight here.",
        "ar": "يمكن لمؤسسي الشركات الناشئة أو المشاريع المعتمدة ذات القيمة الاقتصادية الملموسة التقدم عبر مسار رواد الأعمال. وتحمل خطابات الاعتماد من حاضنة أو جهة معترف بها معظم الثقل في هذه الفئة."
      },
      {
        "type": "quote",
        "en": "The right category is the one you can document today, not the one with the most attractive label.",
        "ar": "الفئة الصحيحة هي التي يمكنك توثيقها اليوم، لا التي تحمل العنوان الأجذب."
      },
      {
        "type": "h2",
        "en": "Specialists, professionals and talent",
        "ar": "المتخصصون والمهنيون وأصحاب المواهب"
      },
      {
        "type": "p",
        "en": "Doctors, scientists, engineers and senior executives qualify through accredited degrees, salary thresholds and employment contracts; outstanding students, graduates and creative talent have their own tracks with nominations from recognised bodies. Each track has a distinct document list, which is where most delays occur.",
        "ar": "يتأهل الأطباء والعلماء والمهندسون والتنفيذيون عبر الشهادات المعتمدة وحدود الرواتب وعقود العمل؛ وللطلاب المتفوقين والخريجين وأصحاب المواهب الإبداعية مسارات خاصة بترشيحات من جهات معترف بها. ولكل مسار قائمة مستندات مختلفة، وهنا تحدث معظم حالات التأخير."
      },
      {
        "type": "list",
        "en": [
          "Investor · from AED 2,000,000 · 2–4 weeks",
          "Entrepreneur · approved startup or project",
          "Specialist · accredited degree, salary threshold, contract",
          "Student and talent · nomination from a recognised body"
        ],
        "ar": [
          "المستثمر · من 2,000,000 درهم · 2–4 أسابيع",
          "رائد الأعمال · شركة ناشئة أو مشروع معتمد",
          "المتخصص · شهادة معتمدة، حد راتب، عقد عمل",
          "الطالب والموهبة · ترشيح من جهة معترف بها"
        ]
      }
    ]
  },
  {
    "slug": "canada",
    "href": "/insights/canada",
    "tag": {
      "en": "Skilled",
      "ar": "الهجرة المهنية"
    },
    "date": {
      "en": "Jul 2026",
      "ar": "يوليو 2026"
    },
    "photo": "engineer at a Toronto office",
    "authorSlot": "priya",
    "authorPhoto": "Priya Nair",
    "author": {
      "en": "Priya Nair",
      "ar": "بريا نائير"
    },
    "authorRole": {
      "en": "Senior Consultant, Skilled Migration · regulated adviser for Canada and Australia routes",
      "ar": "مستشارة أولى، الهجرة المهنية · مستشارة مرخّصة لمسارات كندا وأستراليا"
    },
    "title": {
      "en": "Express Entry vs provincial nomination: which gets you to Canada faster?",
      "ar": "Express Entry أم الترشيح الإقليمي: أيهما يوصلك إلى كندا أسرع؟"
    },
    "excerpt": {
      "en": "Why a lower CRS score with the right province can beat a higher one without it.",
      "ar": "لماذا قد تتفوق درجة CRS أقل مع المقاطعة المناسبة على درجة أعلى من دونها."
    },
    "blocks": [
      {
        "type": "h2",
        "en": "How Express Entry scores you",
        "ar": "كيف يقيّمك Express Entry"
      },
      {
        "type": "p",
        "en": "Express Entry ranks candidates on the Comprehensive Ranking System: age, education, language results, work experience and a few bonus factors. Invitations go to the highest scores in periodic draws, and many draws now target specific categories such as healthcare or trades. If your score sits below recent cut-offs, waiting rarely helps.",
        "ar": "يرتّب Express Entry المتقدمين وفق نظام الترتيب الشامل (CRS): العمر، والتعليم، ونتائج اللغة، والخبرة العملية، وبعض العوامل الإضافية. تذهب الدعوات إلى أعلى الدرجات في سحوبات دورية، وتستهدف سحوبات كثيرة الآن فئات محددة مثل الرعاية الصحية أو المهن الحرفية. وإذا كانت درجتك أدنى من حدود السحوبات الأخيرة، فنادرًا ما يفيد الانتظار."
      },
      {
        "type": "h2",
        "en": "What a provincial nomination does",
        "ar": "ما الذي يفعله الترشيح الإقليمي"
      },
      {
        "type": "p",
        "en": "A nomination from a Provincial Nominee Program adds 600 points to your CRS score, which effectively guarantees an invitation in the next draw. Provinces nominate candidates whose occupation and experience match their labour needs, so the route depends less on your raw score and more on the fit between your profile and a province.",
        "ar": "يضيف الترشيح من برنامج المرشحين الإقليميين 600 نقطة إلى درجتك في CRS، وهو ما يضمن عمليًا دعوة في السحب التالي. ترشّح المقاطعات المتقدمين الذين تتوافق مهنتهم وخبرتهم مع احتياجات سوق العمل لديها، لذا يعتمد المسار على مدى توافق ملفك مع المقاطعة أكثر من اعتماده على درجتك الخام."
      },
      {
        "type": "quote",
        "en": "A lower score with the right province beats a higher score without it.",
        "ar": "درجة أقل مع المقاطعة المناسبة تتفوق على درجة أعلى من دونها."
      },
      {
        "type": "h2",
        "en": "Which is faster in practice",
        "ar": "أيهما أسرع عمليًا"
      },
      {
        "type": "p",
        "en": "For a candidate above the cut-off, Express Entry alone is fastest. For everyone else, a targeted nomination usually wins even though it adds a provincial step. One of our clients, a software engineer whose score fell short, retook his language test and entered a nomination stream matched to his stack: 620 extra points, an invitation in four months and permanent residence confirmed in eleven.",
        "ar": "لمن تتجاوز درجته الحد، يكون Express Entry وحده الأسرع. ولمن عداهم، يتفوق الترشيح الموجَّه عادةً رغم أنه يضيف خطوة إقليمية. أحد عملائنا، مهندس برمجيات لم تكفِ درجته، أعاد اختبار اللغة ودخل مسار ترشيح يناسب تخصصه: 620 نقطة إضافية، ودعوة في أربعة أشهر، وتأكيد الإقامة الدائمة في أحد عشر شهرًا."
      },
      {
        "type": "h2",
        "en": "The trade-offs",
        "ar": "المقايضات"
      },
      {
        "type": "list",
        "en": [
          "A nomination carries an intention to settle in that province",
          "Provincial processing adds weeks or months before the federal stage",
          "Language retakes and credential assessments can lift the score on their own",
          "Category-based draws can change the calculation quickly"
        ],
        "ar": [
          "يحمل الترشيح نية للاستقرار في تلك المقاطعة",
          "تضيف المعالجة الإقليمية أسابيع أو أشهرًا قبل المرحلة الفدرالية",
          "قد ترفع إعادة اختبار اللغة وتقييم المؤهلات الدرجة بمفردها",
          "قد تغيّر السحوبات القائمة على الفئات الحساب بسرعة"
        ]
      }
    ]
  },
  {
    "slug": "diligence",
    "href": "/insights/diligence",
    "tag": {
      "en": "Guides",
      "ar": "أدلة"
    },
    "date": {
      "en": "Jun 2026",
      "ar": "يونيو 2026"
    },
    "photo": "documents on a desk",
    "authorSlot": "omar",
    "authorPhoto": "Omar Al Farsi",
    "author": {
      "en": "Omar Al Farsi",
      "ar": "عمر الفارسي"
    },
    "authorRole": {
      "en": "Head of Investment Migration · former liaison for two Caribbean CBI units",
      "ar": "رئيس قسم هجرة الاستثمار · منسق سابق لدى وحدتَين كاريبيتَين للجنسية بالاستثمار"
    },
    "title": {
      "en": "Due diligence: what citizenship units actually check",
      "ar": "العناية الواجبة: ما الذي تتحقق منه وحدات الجنسية فعلًا"
    },
    "excerpt": {
      "en": "Source of funds, past refusals, name matches — and how to prepare a clean file.",
      "ar": "مصدر الأموال، والرفض السابق، وتطابق الأسماء؛ وكيف تجهّز ملفًا نظيفًا."
    },
    "blocks": [
      {
        "type": "h2",
        "en": "Source of funds",
        "ar": "مصدر الأموال"
      },
      {
        "type": "p",
        "en": "Units want a documentary trail from where the money was earned to the account it will leave from: employment contracts and payslips, company accounts and dividend records, sale agreements, inheritance documents and tax filings. Wealth is not the issue; an unexplained step in the chain is.",
        "ar": "تريد الوحدات سلسلة مستندية من مكان كسب المال إلى الحساب الذي سيخرج منه: عقود العمل وقسائم الرواتب، وحسابات الشركات وسجلات توزيعات الأرباح، واتفاقيات البيع، ومستندات الإرث، والإقرارات الضريبية. الثروة ليست المشكلة؛ المشكلة خطوة غير مفسَّرة في السلسلة."
      },
      {
        "type": "h2",
        "en": "Past refusals and travel history",
        "ar": "الرفض السابق وسجل السفر"
      },
      {
        "type": "p",
        "en": "Every program asks whether you have been refused a visa anywhere. Answers are verified against shared databases, so an omission is treated far more seriously than the refusal itself. Disclose, explain and document the outcome.",
        "ar": "يسأل كل برنامج عمّا إذا رُفضت لك تأشيرة في أي مكان. تُراجع الإجابات مقابل قواعد بيانات مشتركة، لذا يُعامَل الإخفاء بجدية أكبر بكثير من الرفض نفسه. أفصح، واشرح، ووثّق النتيجة."
      },
      {
        "type": "quote",
        "en": "Wealth is not the issue; an unexplained step in the chain is.",
        "ar": "الثروة ليست المشكلة؛ المشكلة خطوة غير مفسَّرة في السلسلة."
      },
      {
        "type": "h2",
        "en": "Name matches and screening",
        "ar": "تطابق الأسماء والفحص"
      },
      {
        "type": "p",
        "en": "Independent firms screen applicants and family members against sanctions lists, politically exposed person registers, litigation records and adverse media. Common names produce false matches; the file should anticipate them with full names, dates of birth and identity documents that make the distinction obvious.",
        "ar": "تفحص شركات مستقلة المتقدمين وأفراد عائلاتهم مقابل قوائم العقوبات، وسجلات الأشخاص المعرَّضين سياسيًا، وسجلات التقاضي، والأخبار السلبية. تُنتج الأسماء الشائعة تطابقات زائفة؛ وينبغي أن يستبقها الملف بالأسماء الكاملة وتواريخ الميلاد ووثائق الهوية التي تجعل الفرق واضحًا."
      },
      {
        "type": "h2",
        "en": "How to prepare a clean file",
        "ar": "كيف تجهّز ملفًا نظيفًا"
      },
      {
        "type": "list",
        "en": [
          "Start collecting documents before choosing the program",
          "Translate and attest everything the program requires, in the required format",
          "Keep names, dates and addresses consistent across every document",
          "Run a pre-submission screening so issues surface with you, not with the unit"
        ],
        "ar": [
          "ابدأ جمع المستندات قبل اختيار البرنامج",
          "ترجم وصدّق كل ما يطلبه البرنامج، وبالصيغة المطلوبة",
          "حافظ على اتساق الأسماء والتواريخ والعناوين في كل مستند",
          "أجرِ فحصًا قبل التقديم لتظهر المشكلات معك، لا مع الوحدة"
        ]
      }
    ]
  },
  {
    "slug": "greece",
    "href": "/insights/greece",
    "tag": {
      "en": "Europe",
      "ar": "أوروبا"
    },
    "date": {
      "en": "Jun 2026",
      "ar": "يونيو 2026"
    },
    "photo": "Athens rooftops",
    "authorSlot": "layla",
    "authorPhoto": "Layla Haddad",
    "author": {
      "en": "Layla Haddad",
      "ar": "ليلى حداد"
    },
    "authorRole": {
      "en": "Managing Partner · 12 years in investment migration",
      "ar": "الشريكة الإدارية · 12 عامًا في هجرة الاستثمار"
    },
    "title": {
      "en": "Greece Golden Visa: the zones and thresholds in force now",
      "ar": "التأشيرة الذهبية اليونانية: المناطق والحدود المعمول بها الآن"
    },
    "excerpt": {
      "en": "Where €250,000 still works, where it doesn’t, and what counts as one qualifying property.",
      "ar": "أين لا يزال مبلغ 250,000 يورو كافيًا، وأين لم يعد كذلك، وما الذي يُعدّ عقارًا مؤهلًا واحدًا."
    },
    "blocks": [
      {
        "type": "h2",
        "en": "Thresholds now depend on the zone",
        "ar": "الحدود تعتمد الآن على المنطقة"
      },
      {
        "type": "p",
        "en": "Greece replaced its single national minimum with tiers. The highest threshold applies in and around Athens, Thessaloniki and the most popular islands; a middle tier covers the rest of the country. The exact figures move with legislation, so treat any number you read online as a starting point to be confirmed.",
        "ar": "استبدلت اليونان حدّها الأدنى الوطني الواحد بمستويات. يطبَّق الحد الأعلى في أثينا وثيسالونيكي والجزر الأكثر شعبية وما حولها؛ ويغطي مستوى متوسط بقية البلاد. وتتغيّر الأرقام الدقيقة مع التشريعات، لذا اعتبر أي رقم تقرأه على الإنترنت نقطة بداية تحتاج إلى تأكيد."
      },
      {
        "type": "h2",
        "en": "Where €250,000 still works",
        "ar": "أين لا يزال مبلغ 250,000 يورو كافيًا"
      },
      {
        "type": "p",
        "en": "The €250,000 entry point survives for two specific cases anywhere in Greece: converting a commercial building into a residence, and restoring a listed heritage property. Both come with conditions on completing the works before or shortly after the permit, which is why they suit patient investors more than buyers looking for a ready home.",
        "ar": "يبقى الحد 250,000 يورو قائمًا لحالتَين محددتَين في أي مكان في اليونان: تحويل مبنى تجاري إلى مسكن، وترميم عقار تراثي مُدرج. وتأتي الحالتان بشروط لإتمام الأعمال قبل التصريح أو بعده بقليل، ولهذا تناسبان المستثمرين الصبورين أكثر من الباحثين عن منزل جاهز."
      },
      {
        "type": "quote",
        "en": "One property, one threshold, one permit — Greece rewards a simple purchase and punishes a clever one.",
        "ar": "عقار واحد، وحد واحد، وتصريح واحد؛ تكافئ اليونان الشراء البسيط وتعاقب الشراء الملتوي."
      },
      {
        "type": "h2",
        "en": "What counts as one qualifying property",
        "ar": "ما الذي يُعدّ عقارًا مؤهلًا واحدًا"
      },
      {
        "type": "p",
        "en": "In the higher tiers the investment must be a single property, not a portfolio of smaller units added together, and minimum-size rules apply. Short-term letting of the property is restricted. These rules changed precisely to stop the splitting of purchases, so structure the investment around them from the start.",
        "ar": "في المستويات الأعلى يجب أن يكون الاستثمار عقارًا واحدًا، لا محفظة من وحدات أصغر تُجمَع معًا، وتنطبق قواعد للحد الأدنى للمساحة. كما يُقيَّد التأجير قصير المدى للعقار. تغيّرت هذه القواعد تحديدًا لمنع تقسيم المشتريات، فهيكل الاستثمار حولها من البداية."
      },
      {
        "type": "h2",
        "en": "Why Greece still attracts",
        "ar": "لماذا لا تزال اليونان جاذبة"
      },
      {
        "type": "list",
        "en": [
          "No stay requirement to keep the permit",
          "Decisions typically in 3–4 months",
          "Spouse, dependent children and parents can be included",
          "A property route where Portugal no longer offers one"
        ],
        "ar": [
          "لا شرط إقامة للاحتفاظ بالتصريح",
          "قرارات عادةً في 3–4 أشهر",
          "يمكن ضمّ الزوج/الزوجة والأبناء المعالين والوالدين",
          "مسار عقاري حيث لم تعد البرتغال تقدّمه"
        ]
      }
    ]
  },
  {
    "slug": "family",
    "href": "/insights/family",
    "tag": {
      "en": "Family",
      "ar": "العائلة"
    },
    "date": {
      "en": "May 2026",
      "ar": "مايو 2026"
    },
    "photo": "three generations at home",
    "authorSlot": "nexon",
    "authorPhoto": "author",
    "author": {
      "en": "NEXON consultants",
      "ar": "مستشارو نكسون"
    },
    "authorRole": {
      "en": "Residency, citizenship and global mobility consultancy · Dubai",
      "ar": "استشارات الإقامة والجنسية والتنقل العالمي · دبي"
    },
    "title": {
      "en": "Adding parents and adult children to your application",
      "ar": "إضافة الوالدين والأبناء البالغين إلى طلبك"
    },
    "excerpt": {
      "en": "Dependency rules differ sharply by program. Here’s who qualifies where.",
      "ar": "تختلف قواعد الإعالة اختلافًا كبيرًا بين البرامج. إليك من يستوفي الشروط وأين."
    },
    "blocks": [
      {
        "type": "h2",
        "en": "Who counts as a dependant",
        "ar": "من يُعدّ معالًا"
      },
      {
        "type": "p",
        "en": "A spouse and minor children qualify almost everywhere. Beyond that, programs diverge: adult children usually qualify only while in full-time education and financially dependent, up to an age cap; parents must generally be financially dependent and living with or supported by the main applicant.",
        "ar": "يتأهل الزوج/الزوجة والأبناء القصّر في كل البرامج تقريبًا. وبعد ذلك تتباين البرامج: يتأهل الأبناء البالغون عادةً فقط أثناء الدراسة بدوام كامل وطالما كانوا معالين ماليًا، حتى حدّ عمري معيّن؛ ويجب أن يكون الوالدان معالَين ماليًا في العموم ويعيشان مع المتقدم الرئيسي أو يعتمدان على دعمه."
      },
      {
        "type": "h2",
        "en": "Caribbean programs are the most generous",
        "ar": "البرامج الكاريبية هي الأكثر سخاءً"
      },
      {
        "type": "p",
        "en": "Grenada, St Kitts & Nevis and Antigua & Barbuda allow parents and grandparents, and in some cases unmarried siblings, on a single application. Fees rise with each dependant, which is why the total household cost, not the headline figure, should drive the comparison.",
        "ar": "تسمح غرينادا وسانت كيتس ونيفيس وأنتيغوا وبربودا بضمّ الوالدين والأجداد، وفي بعض الحالات الأشقاء غير المتزوجين، في طلب واحد. وترتفع الرسوم مع كل معال، ولهذا ينبغي أن يقود المقارنةَ إجمالي تكلفة الأسرة، لا الرقم الرئيسي."
      },
      {
        "type": "quote",
        "en": "Add the family at the start: it is almost always cheaper, and sometimes it is the only chance.",
        "ar": "أضِف العائلة من البداية: فهذا أقل تكلفة على الأغلب، وأحيانًا يكون الفرصة الوحيدة."
      },
      {
        "type": "h2",
        "en": "Europe and the UAE",
        "ar": "أوروبا والإمارات"
      },
      {
        "type": "p",
        "en": "Portugal and Greece admit the spouse, dependent children and dependent parents of the main applicant. The UAE Golden Visa lets holders sponsor their spouse and children regardless of age, and parents as well, with separate rules for domestic staff.",
        "ar": "تقبل البرتغال واليونان الزوج/الزوجة والأبناء المعالين والوالدين المعالين للمتقدم الرئيسي. وتتيح التأشيرة الذهبية الإماراتية لحاملها كفالة الزوج/الزوجة والأبناء بصرف النظر عن العمر، والوالدين أيضًا، مع قواعد منفصلة للعمالة المنزلية."
      },
      {
        "type": "h2",
        "en": "Timing matters",
        "ar": "التوقيت مهم"
      },
      {
        "type": "list",
        "en": [
          "Dependants added at application usually cost less than those added after approval",
          "Children close to an age cap should be included before their birthday, not after",
          "Some programs do not allow parents to be added later at all",
          "Evidence of dependency must be current at the date of submission"
        ],
        "ar": [
          "المعالون المضافون عند التقديم أقل تكلفة عادةً ممن يُضافون بعد الموافقة",
          "ينبغي ضمّ الأبناء القريبين من الحد العمري قبل عيد ميلادهم، لا بعده",
          "لا تسمح بعض البرامج بإضافة الوالدين لاحقًا على الإطلاق",
          "يجب أن تكون أدلة الإعالة سارية في تاريخ التقديم"
        ]
      }
    ]
  }
];

export const ARTICLE_BY_SLUG: Record<string, Article> = Object.fromEntries(
  ARTICLES.map((a) => [a.slug, a]),
);
