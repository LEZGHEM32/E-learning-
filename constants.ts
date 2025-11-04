import { Course, Field } from './types';
import { PhilosophyIcon, ArabicIcon } from './components/icons';

export const VALID_ACTIVATION_CODES: Record<string, string[]> = {
  philosophy: ['PHIL-1234', 'PHIL-5678', 'ALKholasa-PHIL'],
  arabic: ['ARAB-1234', 'ARAB-5678', 'ALKholasa-ARAB'],
};

const DUMMY_PDF = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

// --- Content for Arts & Philosophy Specialization ---
const artsPhiloContent: Field[] = [
  {
    id: 'field1-arts',
    title: 'الإشكالية الأولى: في إدراك العالم الخارجي',
    introLesson: {
      id: 'p-intro-arts', title: 'مدخل إلى إشكالية إدراك العالم الخارجي', type: 'intro',
      description: 'نظرة عامة على أول إشكالية كبرى في البرنامج: كيف نتصل بالعالم الخارجي وندركه؟',
      videoId: 'Jm3X1oXl8-Y', pdfUrl: DUMMY_PDF, isFreePreview: true,
    },
    units: [
      { id: 'unit1-arts', title: 'الوحدة 1: الإحساس والإدراك', lessons: [
          { id: 'p1-u1-theory-arts', title: 'الدرس النظري: طبيعة العلاقة بين الإحساس والإدراك', type: 'theory', description: 'شرح مفصل للنظريات العقلية، الحسية، الجشطالتية والظواهرية.', videoId: 'S01Z8DWE50g', pdfUrl: DUMMY_PDF, isFreePreview: true },
          { id: 'p1-u1-app1-arts', title: 'تطبيق 01: مقالة مقارنة بين الإحساس والإدراك', type: 'application', description: 'تحليل منهجي لمقالة مقارنة مع خطة عمل واضحة.', videoId: 'S01Z8DWE50g', pdfUrl: DUMMY_PDF, isFreePreview: true },
          { id: 'p1-u1-app2-arts', title: 'تطبيق 02: عوامل الإدراك (ذاتية أم موضوعية)', type: 'application', description: 'مقالة جدلية حول العوامل المتحكمة في عملية الإدراك.', videoId: 's5e7q_2fK7c', pdfUrl: DUMMY_PDF, isFreePreview: true },
      ]},
      { id: 'unit2-arts', title: 'الوحدة 2: اللغة والفكر', lessons: [
          { id: 'p1-u2-theory-arts', title: 'الدرس النظري: علاقة اللغة بالفكر ووظائفها', type: 'theory', description: 'استعراض الاتجاهات الفلسفية حول علاقة الدال بالمدلول وعلاقة اللغة بالفكر.', videoId: 'dD5o41g_4Ug', pdfUrl: DUMMY_PDF, isFreePreview: true },
          { id: 'p1-u2-app1-arts', title: 'تطبيق 01: مقالة جدلية حول علاقة اللغة بالفكر', type: 'application', description: 'هل اللغة تعيق الفكر أم تخدمه؟ تحليل معمق.', videoId: 'vL5n7Y-W6K4', pdfUrl: DUMMY_PDF, isFreePreview: true },
      ]},
      { id: 'unit3-arts', title: 'الوحدة 3: الشعور واللاشعور', lessons: [
          { id: 'p1-u3-theory-arts', title: 'الدرس النظري: الحياة النفسية بين الشعور واللاشعور', type: 'theory', description: 'دراسة فرضية اللاشعور وأدلتها وانعكاساتها على فهم الحياة النفسية.', videoId: 'p8QJ1T-A-jY', pdfUrl: DUMMY_PDF, isFreePreview: true },
          { id: 'p1-u3-app1-arts', title: 'تطبيق 01: مقالة استقصاء بالوضع (الدفاع عن فرضية اللاشعور)', type: 'application', description: 'منهجية الدفاع عن أطروحة "اللاشعور حقيقة علمية".', videoId: 'd6y6sV9d3Qk', pdfUrl: DUMMY_PDF, isFreePreview: true },
      ]},
       { id: 'unit4-arts', title: 'الوحدة 4: الذاكرة والخيال', lessons: [
          { id: 'p1-u4-theory-arts', title: 'الدرس النظري: طبيعة الذاكرة والإبداع', type: 'theory', description: 'تحليل طبيعة الذاكرة (مادية، نفسية، اجتماعية) وشروط الإبداع.', videoId: 'wB2eR7yL7uM', pdfUrl: DUMMY_PDF, isFreePreview: true },
          { id: 'p1-u4-app1-arts', title: 'تطبيق 01: مقالة جدلية حول طبيعة الذاكرة', type: 'application', description: 'هل الذاكرة ظاهرة فردية أم اجتماعية؟', videoId: 'wB2eR7yL7uM', pdfUrl: DUMMY_PDF, isFreePreview: true },
      ]},
    ],
  },
  {
    id: 'field2-arts',
    title: 'الإشكالية الثانية: في الأخلاق الموضوعية والأخلاق النسبية',
    introLesson: {
      id: 'p2-intro-arts', title: 'مدخل إلى فلسفة الأخلاق', type: 'intro',
      description: 'تمهيد لإشكالية القيم الأخلاقية: هل هي مطلقة أم نسبية؟',
      videoId: 'xZ5t-h5m1jA', pdfUrl: DUMMY_PDF, isFreePreview: true,
    },
    units: [
       { id: 'unit5-arts', title: 'الوحدة 1: الأخلاق بين الثوابت والمتغيرات', lessons: [
          { id: 'p2-u1-theory-arts', title: 'الدرس النظري: أساس القيمة الأخلاقية', type: 'theory', description: 'استعراض النظريات المختلفة حول مصدر الإلزام الخلقي (الدين، العقل، المجتمع، المنفعة).', videoId: 'xZ5t-h5m1jA', pdfUrl: DUMMY_PDF, isFreePreview: true },
      ]},
      { id: 'unit6-arts', title: 'الوحدة 2: الحقوق والواجبات والعدل', lessons: [
          { id: 'p2-u2-theory-arts', title: 'الدرس النظري: العدالة بين المساواة والتفاوت', type: 'theory', description: 'تحليل مفهوم العدل وأسبقية الحق على الواجب والعكس.', videoId: '2xJz-r9g1vE', pdfUrl: DUMMY_PDF, isFreePreview: true },
          { id: 'p2-u2-app1-arts', title: 'تطبيق 01: مقالة جدلية حول أسبقية الحق أم الواجب', type: 'application', description: 'أيهما أولى بالتأسيس في المجتمع: الحقوق أم الواجبات؟', videoId: 'rY-wW-8jG3U', pdfUrl: DUMMY_PDF, isFreePreview: true },
      ]},
    ],
  },
  {
    id: 'field3-arts',
    title: 'الإشكالية الثالثة: في فلسفة العلوم',
     introLesson: {
      id: 'p3-intro-arts', title: 'مدخل إلى فلسفة العلوم', type: 'intro',
      description: 'مقدمة حول طبيعة المعرفة العلمية وحدودها.',
      videoId: 's4_4zV22A_8', pdfUrl: DUMMY_PDF, isFreePreview: true,
    },
    units: [
      { id: 'unit7-arts', title: 'الوحدة 1: الحقيقة العلمية والفلسفية', lessons: [
          { id: 'p3-u1-theory-arts', title: 'الدرس النظري: معايير الحقيقة', type: 'theory', description: 'دراسة الحقيقة بين المطلق والنسبي ومعاييرها المختلفة.', videoId: 'm1W3m-q5_5Q', pdfUrl: DUMMY_PDF, isFreePreview: true },
      ]},
      { id: 'unit8-arts', title: 'الوحدة 2: فلسفة الرياضيات', lessons: [
          { id: 'p3-u2-theory-arts', title: 'الدرس النظري: أصل المفاهيم الرياضية', type: 'theory', description: 'بحث في أصل الرياضيات بين التصور العقلي والتجريبي.', videoId: 'NnujPlI59v8', pdfUrl: DUMMY_PDF, isFreePreview: true },
          { id: 'p3-u2-app1-arts', title: 'تطبيق 01: مقالة جدلية حول أصل الرياضيات', type: 'application', description: 'هل المفاهيم الرياضية عقلية فطرية أم حسية مكتسبة؟', videoId: 'NnujPlI59v8', pdfUrl: DUMMY_PDF, isFreePreview: true },
      ]},
    ],
  }
];

// --- Content for Common Program (Sciences, Tech, Languages) ---
const commonPhiloContent: Field[] = [
  {
    id: 'field1-common',
    title: 'الإشكالية الأولى: السؤال بين المشكلة العلمية والإشكالية الفلسفية',
    introLesson: {
      id: 'p-intro-common', title: 'مدخل إلى طبيعة السؤال الفلسفي والعلمي', type: 'intro',
      description: 'مقدمة تمهيدية للتمييز بين خصائص التفكير الفلسفي والتفكير العلمي.',
      videoId: 's4_4zV22A_8', pdfUrl: DUMMY_PDF, isFreePreview: true,
    },
    units: [
      { id: 'unit1-common', title: 'الوحدة 1: المقارنة بين العلم والفلسفة', lessons: [
          { id: 'p1-u1-theory-common', title: 'الدرس النظري: أوجه التشابه والاختلاف والتداخل', type: 'theory', description: 'شرح معمق لطبيعة كل من المعرفة العلمية والفلسفية والعلاقة بينهما.', videoId: 's4_4zV22A_8', pdfUrl: DUMMY_PDF, isFreePreview: true },
          { id: 'p1-u1-app1-common', title: 'تطبيق 01: مقالة مقارنة بين المشكلة العلمية والإشكالية الفلسفية', type: 'application', description: 'تحليل منهجي لمقالة مقارنة توضح نقاط الالتقاء والافتراق.', videoId: 's4_4zV22A_8', pdfUrl: DUMMY_PDF, isFreePreview: true },
      ]},
    ],
  },
  {
    id: 'field2-common',
    title: 'الإشكالية الثانية: في فلسفة العلوم',
    introLesson: {
      id: 'p2-intro-common', title: 'مدخل إلى فلسفة الرياضيات والعلوم التجريبية', type: 'intro',
      description: 'نظرة عامة على طبيعة المعرفة في الرياضيات والعلوم التجريبية.',
      videoId: 'e7q6n-r1cO8', pdfUrl: DUMMY_PDF, isFreePreview: true,
    },
    units: [
      { id: 'unit2-common', title: 'الوحدة 1: فلسفة الرياضيات', lessons: [
          { id: 'p2-u1-theory-common', title: 'الدرس النظري: أصل المفاهيم الرياضية ونتائجها', type: 'theory', description: 'بحث في مصدر المفاهيم الرياضية بين العقل والتجربة، وطبيعة اليقين فيها.', videoId: 'e7q6n-r1cO8', pdfUrl: DUMMY_PDF, isFreePreview: true },
          { id: 'p2-u1-app1-common', title: 'تطبيق 01: مقالة جدلية حول أصل المفاهيم الرياضية', type: 'application', description: 'هل الرياضيات مستخلصة من التجربة أم هي من إبداع العقل؟', videoId: 'e7q6n-r1cO8', pdfUrl: DUMMY_PDF, isFreePreview: true },
      ]},
      { id: 'unit3-common', title: 'الوحدة 2: العلوم التجريبية والعلوم البيولوجية', lessons: [
          { id: 'p2-u2-theory-common', title: 'الدرس النظري: المنهج التجريبي وحدود تطبيقه', type: 'theory', description: 'تحليل خطوات المنهج التجريبي والعوائق التي تواجهه في علوم المادة الحية.', videoId: 'yT9e_7x4f-I', pdfUrl: DUMMY_PDF, isFreePreview: true },
          { id: 'p2-u2-app1-common', title: 'تطبيق 01: مقالة استقصاء بالوضع (قيمة الفرضية)', type: 'application', description: 'الدفاع عن الأطروحة القائلة بأن الفرضية خطوة ضرورية في المنهج التجريبي.', videoId: 'yT9e_7x4f-I', pdfUrl: DUMMY_PDF, isFreePreview: true },
      ]},
    ],
  },
    {
    id: 'field3-common',
    title: 'الإشكالية الثالثة: في العلاقات بين الناس',
    introLesson: {
      id: 'p3-intro-common', title: 'مدخل إلى الحياة النفسية والحرية', type: 'intro',
      description: 'مقدمة حول الشعور بالأنا والغير وإشكالية الحرية الإنسانية.',
      videoId: '9oJ7F_tYq_U', pdfUrl: DUMMY_PDF, isFreePreview: true,
    },
    units: [
      { id: 'unit4-common', title: 'الوحدة 1: الشعور بالأنا والشعور بالغير', lessons: [
          { id: 'p3-u1-theory-common', title: 'الدرس النظري: معرفة الذات ومعرفة الغير', type: 'theory', description: 'كيف تتشكل معرفتنا بذواتنا؟ وهل معرفة الغير ممكنة؟', videoId: '9oJ7F_tYq_U', pdfUrl: DUMMY_PDF, isFreePreview: true },
      ]},
      { id: 'unit5-common', title: 'الوحدة 2: الحرية والمسؤولية', lessons: [
          { id: 'p3-u2-theory-common', title: 'الدرس النظري: إشكالية الحرية بين الحتمية والإثبات', type: 'theory', description: 'استعراض المواقف الفلسفية المختلفة من قضية الحرية الإنسانية.', videoId: 'Z-p_8-l-9aQ', pdfUrl: DUMMY_PDF, isFreePreview: true },
          { id: 'p3-u2-app1-common', title: 'تطبيق 01: مقالة جدلية حول الحرية والتحرر', type: 'application', description: 'هل الإنسان حر أم مقيد بحتميات؟ تحليل ومناقشة.', videoId: 'Z-p_8-l-9aQ', pdfUrl: DUMMY_PDF, isFreePreview: true },
      ]},
    ],
  }
];

export const COURSES_DATA: Course[] = [
  {
    id: 'philosophy',
    title: 'الفلسفة',
    teacher: 'الأستاذ لزغم عبد الحق',
    price: 3500,
    description: 'مادة شاملة في الفلسفة مصممة خصيصًا لتلاميذ الباكالوريا حسب البرنامج الرسمي لكل شعبة.',
    longDescription: 'انضم إلى مادة الفلسفة الشاملة للأستاذ لزغم عبد الحق، والتي تغطي كل جوانب البرنامج السنوي للباكالوريا. اختر شعبتك أدناه للوصول إلى المحتوى المخصص لك. من خلال دروس فيديو تفصيلية وجزء تطبيقي، ستتمكن من فهم أعمق المفاهيم الفلسفية والاستعداد التام للامتحان.',
    icon: PhilosophyIcon,
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1974&auto=format&fit=crop',
    annualProgramPdfUrl: DUMMY_PDF,
    specializations: [
      {
        id: 'phil-arts',
        name: 'آداب وفلسفة',
        content: artsPhiloContent
      },
      {
        id: 'phil-science',
        name: 'علوم تجريبية و رياضيات',
        content: commonPhiloContent
      },
      {
        id: 'phil-tech',
        name: 'تقني رياضي و تسيير واقتصاد',
        content: commonPhiloContent
      },
      {
        id: 'phil-lang',
        name: 'لغات اجنبية',
        content: commonPhiloContent
      }
    ],
  },
  {
    id: 'arabic',
    title: 'الأدب العربي',
    teacher: 'الأستاذ لزغم عبد الحق',
    price: 3500,
    description: 'تحليل معمق لنصوص الأدب العربي وتطبيقات عملية للباكالوريا.',
    longDescription: 'تقدم هذه المادة في الأدب العربي تحليلاً شاملاً للنصوص الشعرية والنثرية المقررة في امتحان الباكالوريا. مع الأستاذ لزغم عبد الحق، ستتعلم منهجيات التحليل الأدبي وتكتسب المهارات اللازمة للإجابة بثقة في الامتحان.',
    icon: ArabicIcon,
    imageUrl: 'https://images.unsplash.com/photo-1524103416227-969447402c31?q=80&w=2070&auto=format&fit=crop',
    annualProgramPdfUrl: DUMMY_PDF,
    specializations: [
      {
        id: 'arabic-all',
        name: 'برنامج مشترك لجميع الشعب',
        content: [
          {
            id: 'field-a1',
            title: 'المجال: الشعر العربي الحديث',
            introLesson: {
              id: 'a-intro',
              title: 'مدخل إلى مدارس الشعر الحديث',
              type: 'intro',
              description: 'فيديو تمهيدي يقدم نظرة عامة على مدارس الشعر وتطورها.',
              videoId: 's4_4zV22A_8',
              pdfUrl: DUMMY_PDF,
              isFreePreview: true,
            },
            units: [
              {
                id: 'unit-a1',
                title: 'الوحدة الأولى: شعر المنفى',
                lessons: [
                  {
                    id: 'a1-theory',
                    title: 'الدرس النظري: خصائص وسمات شعر المنفى',
                    type: 'theory',
                    description: 'شرح معمق لخصائص شعر المنفى وأبرز رواده.',
                    videoId: 's4_4zV22A_8',
                    pdfUrl: DUMMY_PDF,
                    isFreePreview: true,
                  },
                  {
                    id: 'a1-app1',
                    title: 'تطبيق 01: تحليل قصيدة للبارودي',
                    type: 'application',
                    description: 'فيديو تحليلي للقصيدة مع مطبوعة تحتوي على ملخص ومقال موسع.',
                    videoId: 'Z-p_8-l-9aQ',
                    pdfUrl: DUMMY_PDF,
                    isFreePreview: true,
                  },
                  {
                    id: 'a1-app2',
                    title: 'تطبيق 02: تحليل قصيدة لأحمد شوقي',
                    type: 'application',
                    description: 'فيديو تحليلي للقصيدة مع مطبوعة تحتوي على ملخص ومقال موسع.',
                    videoId: '9oJ7F_tYq_U',
                    pdfUrl: DUMMY_PDF,
                    isFreePreview: true,
                  },
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];