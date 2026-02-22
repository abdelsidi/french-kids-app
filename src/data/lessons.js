export const lessons = [
  {
    id: 1,
    title: 'الحروف والأصوات',
    description: 'تعلم نطق الحروف الفرنسية بطريقة ممتعة',
    icon: '🔤',
    reward: 50,
    questions: [
      {
        type: 'letter',
        question: 'ما هو حرف "A"؟',
        hint: 'أول حرف في اللغة الفرنسية',
        options: ['أ', 'ب', 'ت', 'ث'],
        correct: 0,
        audio: '/audio/a.mp3'
      },
      {
        type: 'letter',
        question: 'ما هو حرف "B"؟',
        hint: 'بِ comme bébé',
        options: ['أ', 'ب', 'ت', 'ث'],
        correct: 1,
        audio: '/audio/b.mp3'
      },
      {
        type: 'match',
        question: 'اربط الحرف بالصوت الصحيح',
        hint: 'استمع جيداً',
        options: ['C = س', 'C = ك', 'C = ش', 'C = ج'],
        correct: 1,
        audio: '/audio/c.mp3'
      },
      {
        type: 'sound',
        question: 'أي كلمة تبدأ بصوت "D"؟',
        hint: 'دِ comme dinosaure',
        options: ['chat', 'chien', 'dinosaure', 'éléphant'],
        correct: 2,
        image: '🦕'
      },
      {
        type: 'letter',
        question: 'ما هو حرف "E"؟',
        hint: 'comme éléphant',
        options: ['أ', 'إ', 'ى', 'ا'],
        correct: 1,
        image: '🐘'
      }
    ]
  },
  {
    id: 2,
    title: 'الألوان 🎨',
    description: 'تعلم أسماء الألوان بالفرنسية',
    icon: '🌈',
    reward: 60,
    questions: [
      {
        type: 'color',
        question: 'ما لون "Rouge"؟',
        hint: 'اللون الحار',
        options: ['أزرق', 'أحمر', 'أخضر', 'أصفر'],
        correct: 1,
        color: '#ff4444'
      },
      {
        type: 'color',
        question: 'ما لون "Bleu"؟',
        hint: 'لون السماء',
        options: ['أزرق', 'أحمر', 'أخضر', 'أصفر'],
        correct: 0,
        color: '#4444ff'
      },
      {
        type: 'color',
        question: 'ما لون "Vert"؟',
        hint: 'لون العشب',
        options: ['أزرق', 'أحمر', 'أخضر', 'أصفر'],
        correct: 2,
        color: '#44ff44'
      },
      {
        type: 'match',
        question: 'اربط اللون بالاسم',
        hint: '🟡 = ?',
        options: ['Blanc', 'Noir', 'Jaune', 'Rose'],
        correct: 2,
        image: '💛'
      }
    ]
  },
  {
    id: 3,
    title: 'الأرقام 1-10 🔢',
    description: 'تعلم العد من 1 إلى 10',
    icon: '🔢',
    reward: 70,
    questions: [
      {
        type: 'number',
        question: 'كم عدد التفاحات؟',
        hint: '🍎 = ?',
        options: ['Un (1)', 'Deux (2)', 'Trois (3)', 'Quatre (4)'],
        correct: 0,
        image: '🍎'
      },
      {
        type: 'number',
        question: '🍎🍎 كم تفاحة؟',
        hint: 'Deux = ?',
        options: ['1', '2', '3', '4'],
        correct: 1,
        image: '🍎🍎'
      },
      {
        type: 'count',
        question: 'حدد الرقم 3',
        hint: 'Trois',
        options: ['1', '2', '3', '4'],
        correct: 2,
        visual: ['⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐']
      },
      {
        type: 'sequence',
        question: 'أكمل العد: 1, 2, 3, __',
        hint: 'ما الرقم التالي؟',
        options: ['3', '4', '5', '6'],
        correct: 1
      }
    ]
  },
  {
    id: 4,
    title: 'الحيوانات 🐾',
    description: 'تعرف على أسماء الحيوانات',
    icon: '🦁',
    reward: 80,
    questions: [
      {
        type: 'animal',
        question: 'ما اسم الحيوان؟ 🐕',
        hint: 'Chien = ?',
        options: ['قطة', 'كلب', 'أسد', 'فيل'],
        correct: 1
      },
      {
        type: 'animal',
        question: 'Chat = 🐱',
        hint: 'ما معنى Chat؟',
        options: ['كلب', 'أسد', 'قطة', 'دب'],
        correct: 2
      },
      {
        type: 'sound',
        question: 'ما صوت "Lion"؟',
        hint: '🦁 = ؟',
        options: ['Miaou', 'Wouf', 'Rugissement', 'Cocorico'],
        correct: 2,
        audio: '/audio/lion.mp3'
      },
      {
        type: 'match',
        question: 'اربط الحيوان بمنزله',
        hint: '🐟 = ?',
        options: ['Sur la terre', 'Dans l\'eau', 'Dans les airs', 'Dans la forêt'],
        correct: 1
      }
    ]
  },
  {
    id: 5,
    title: 'العائلة 👨‍👩‍👧‍👦',
    description: 'تعلم أفراد العائلة',
    icon: '👨‍👩‍👧‍👦',
    reward: 90,
    questions: [
      {
        type: 'family',
        question: 'Père = 👨',
        hint: 'من هو؟',
        options: ['الأب', 'الأم', 'الجد', 'الخال'],
        correct: 0
      },
      {
        type: 'family',
        question: 'Mère = 👩',
        hint: 'من هي؟',
        options: ['الأم', 'الأخت', 'العمة', 'الجدة'],
        correct: 0
      },
      {
        type: 'match',
        question: '👧 Frère ou Sœur؟',
        hint: 'بنت = ؟',
        options: ['Frère', 'Sœur', 'Père', 'Mère'],
        correct: 1
      }
    ]
  },
  {
    id: 6,
    title: 'الطعام 🍕',
    description: 'تعلم أسماء الأطعمة',
    icon: '🍕',
    reward: 100,
    questions: [
      {
        type: 'food',
        question: '🍎 Pomme = ؟',
        hint: 'فاكهة حمراء',
        options: ['برتقال', 'تفاح', 'موز', 'عنب'],
        correct: 1
      },
      {
        type: 'food',
        question: '🥖 Baguette = ؟',
        hint: 'خبز فرنسي طويل',
        options: ['كعكة', 'خبز', 'بسكويت', 'كرواسان'],
        correct: 1
      },
      {
        type: 'like',
        question: 'J\'aime les 🍕',
        hint: 'Pizza = ؟',
        options: ['معكرونة', 'بيتزا', 'سلطة', 'شوربة'],
        correct: 1
      }
    ]
  },
  {
    id: 7,
    title: 'الجسم 🫁',
    description: 'أجزاء الجسم بالفرنسية',
    icon: '👤',
    reward: 110,
    questions: [
      {
        type: 'body',
        question: '👁️ Oeil = ؟',
        hint: 'نرى بها',
        options: ['الأذن', 'العين', 'الأنف', 'الفم'],
        correct: 1
      },
      {
        type: 'body',
        question: '👂 Oreille = ؟',
        hint: 'نسمع بها',
        options: ['الأذن', 'اليد', 'القدم', 'الرأس'],
        correct: 0
      },
      {
        type: 'action',
        question: 'Je touche avec ma 👋',
        hint: 'Main = ؟',
        options: ['رأسي', 'يدي', 'قدمي', 'عيني'],
        correct: 1
      }
    ]
  },
  {
    id: 8,
    title: 'الطقس ☀️',
    description: 'تعابير الطقس والفصول',
    icon: '🌤️',
    reward: 120,
    questions: [
      {
        type: 'weather',
        question: '☀️ Il fait soleil = ؟',
        hint: 'حار ومشرق',
        options: ['ممطر', 'مشمس', 'غائم', 'عاصف'],
        correct: 1
      },
      {
        type: 'weather',
        question: '🌧️ Il pleut = ؟',
        hint: 'نحتاج مظلة',
        options: ['ثلج', 'مطر', 'شمس', 'رياح'],
        correct: 1
      },
      {
        type: 'season',
        question: '🌸 Printemps = ؟',
        hint: 'الزهور تتفتح',
        options: ['الصيف', 'الربيع', 'الخريف', 'الشتاء'],
        correct: 1
      }
    ]
  },
  {
    id: 9,
    title: 'المدرسة 📚',
    description: 'أدوات وموقع المدرسة',
    icon: '🎒',
    reward: 130,
    locked: true,
    questions: [
      {
        type: 'school',
        question: '📖 Livre = ؟',
        hint: 'نقرأ فيه',
        options: ['قلم', 'كتاب', 'دفتر', 'ممحاة'],
        correct: 1
      },
      {
        type: 'school',
        question: '✏️ Crayon = ؟',
        hint: 'نكتب به',
        options: ['قلم رصاص', 'قلم حبر', 'فرشاة', 'مسطرة'],
        correct: 0
      },
      {
        type: 'place',
        question: '🏫 École = ؟',
        hint: 'نتعلم فيها',
        options: ['المستشفى', 'المدرسة', 'المنزل', 'المتجر'],
        correct: 1
      }
    ]
  },
  {
    id: 10,
    title: 'الرياضة ⚽',
    description: 'أنواع الرياضة والحركة',
    icon: '⚽',
    reward: 150,
    locked: true,
    questions: [
      {
        type: 'sport',
        question: '⚽ Je joue au foot',
        hint: 'رياضة بالكرة',
        options: ['كرة السلة', 'كرة القدم', 'التنس', 'السباحة'],
        correct: 1
      },
      {
        type: 'action',
        question: '🏃 Je cours = ؟',
        hint: 'حركة سريعة',
        options: ['أمشي', 'أجري', 'أقفز', 'أسبح'],
        correct: 1
      },
      {
        type: 'sport',
        question: '🏊 La natation = ؟',
        hint: 'في الماء',
        options: ['الجري', 'السباحة', 'القفز', 'الركوب'],
        correct: 1
      }
    ]
  }
]

export const badges = [
  { id: 'first-lesson', name: 'أول خطوة', desc: 'أكمل أول درس', icon: '🌟' },
  { id: 'lesson-1', name: 'قارئ ماهر', desc: 'أتقن الحروف', icon: '🔤' },
  { id: 'lesson-2', name: 'رسام صغير', desc: 'تعلم الألوان', icon: '🎨' },
  { id: 'lesson-3', name: 'رياضياتي', desc: 'أتقن الأعداد', icon: '🔢' },
  { id: 'lesson-4', name: 'عالم حيوانات', desc: 'تعرف على الحيوانات', icon: '🦁' },
  { id: 'lesson-5', name: 'عائلي', desc: 'عرفت العائلة', icon: '👨‍👩‍👧‍👦' },
  { id: 'lesson-6', name: 'شهي!', desc: 'تعلم الطعام', icon: '🍕' },
  { id: 'lesson-7', name: 'طبيب صغير', desc: 'عرفت الجسم', icon: '🫁' },
  { id: 'lesson-8', name: 'راصد جوي', desc: 'تعلم المناخ', icon: '🌤️' },
  { id: 'lesson-9', name: 'طالب مجتهد', desc: 'أحببت المدرسة', icon: '🎒' },
  { id: 'lesson-10', name: 'رياضي', desc: 'أحببت الرياضة', icon: '🏆' },
  { id: 'streak-3', name: 'متسلق', desc: '3 دروس متتالية', icon: '🔥' },
  { id: 'streak-7', name: 'متفوق', desc: '7 دروس متتالية', icon: '⚡' },
  { id: 'points-500', name: 'ثري', desc: '500 نقطة', icon: '💎' },
  { id: 'points-1000', name: 'مليونير', desc: '1000 نقطة', icon: '👑' },
  { id: 'perfect', name: 'كامل', desc: 'درس بعلامة كاملة', icon: '💯' },
  { id: 'speed', name: 'سريع', desc: 'أنهيت درساً بسرعة', icon: '⚡' },
  { id: 'collector', name: 'جامع', desc: '10 شارات', icon: '🏅' },
  { id: 'master', name: 'خبير فرنسية', desc: 'أكمل كل الدروس', icon: '🥇' },
  { id: 'champion', name: 'بطل', desc: '2000 نقطة', icon: '🏆' }
]