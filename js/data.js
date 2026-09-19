// Centralized Product & Category Data Source for Modern Veterinary Center (المركز البيطري الحديث)
var siteData = {
  categories: [
    {
      id: 'vet-treatments',
      badge: 'الأدوية البيطرية',
      title: 'علاجات بيطرية متخصصة',
      slug: 'vet-treatments',
      icon: '⚕',
      text: 'خيارات علاجية للحيوانات وفق الإرشاد البيطري.',
      details: 'نوفر باقة شاملة من العلاجات البيطرية المتخصصة لمختلف أنواع الماشية والدواجن، مع إرشاد بيطري دقيق لضمان الجودة والسلامة.'
    },
    {
      id: 'vaccines',
      badge: 'اللقاحات',
      title: 'لقاحات وقائية',
      slug: 'vaccines',
      icon: '◎',
      text: 'خيارات وقائية موثوقة لحماية القطيع.',
      details: 'حلول وقائية متقدمة تشمل لقاحات الدواجن والمواشي من أفضل المصادر العالمية والمحلية المسجلة، لدعم برامج الوقاية.'
    },
    {
      id: 'poultry-feed',
      badge: 'أعلاف الدواجن',
      title: 'أعلاف دواجن',
      slug: 'poultry-feed',
      icon: '🌾',
      text: 'تركيبات علفية متوازنة لدواجن التسمين والبياض.',
      details: 'تركيبات علفية عالية الجودة مصممة لتلبية الاحتياجات الغذائية لدواجن التسمين والبياض وتوفير معدلات تحويل غذائي ممتازة.'
    },
    {
      id: 'livestock-feed',
      badge: 'أعلاف المواشي',
      title: 'أعلاف مواشي',
      slug: 'livestock-feed',
      icon: '♞',
      text: 'تغذية متكاملة لمواشي التسمين وإنتاج الألبان.',
      details: 'أعلاف ومكملات تغذوية مخصصة للأبقار والجاموس والأغنام والماعز، تضمن كفاءة عالية في التسمين وزيادة إدرار الحليب.'
    },
    {
      id: 'farm-supplies',
      badge: 'مستلزمات المزارع',
      title: 'مستلزمات الرعاية',
      slug: 'farm-supplies',
      icon: '⌂',
      text: 'تجهيزات ومستلزمات تشغيلية للمزارع والمربين.',
      details: 'تجهيزات عملية ومستلزمات تشغيلية أساسية لأصحاب المزارع والمربين، تشمل أدوات السقاية والتغذية والأجهزة التشخيصية.'
    },
    {
      id: 'supplements',
      badge: 'مكملات ودعم إنتاجي',
      title: 'مكملات ودعم إنتاجي',
      slug: 'supplements',
      icon: '✚',
      text: 'فيتامينات وأملاح معدنية لدعم الإنتاجية والمناعة.',
      details: 'مستحضرات مساندة تعزز الجهاز المناعي ومعدلات التحويل، وتساعد الحيوان على تجاوز فترات الإجهاد وتغيرات الفصول.'
    }
  ],
  products: [
    {
      id: 1,
      category: 'الأدوية البيطرية',
      categorySlug: 'vet-treatments',
      icon: '⚕',
      name: 'مضاد حيوي واسع المجال (أوكسي تيتراسيكلين)',
      text: 'علاج مخصص للعدوى البكتيرية في التسمين والماشية.',
      details: 'مستحضر بيطري يغطي طيفًا واسعًا من البكتيريا المسببة للالتهابات الرئوية والمعوية في المواشي والدواجن. يُستخدم بناءً على توصية الطبيب البيطري.',
      uses: [
        'علاج التهابات الجهاز التنفسي',
        'مكافحة العدوى المعوية والبكتيرية',
        'جرعات مخصصة حسب الوزن والنوع',
        'منتج محلي ومستورد معتمد'
      ]
    },
    {
      id: 2,
      category: 'الأدوية البيطرية',
      categorySlug: 'vet-treatments',
      icon: '✚',
      name: 'مطهرات ومعقمات عنابر المزارع',
      text: 'محلول تعقيم مكثف للأرضيات وأجهزة السقاية.',
      details: 'تركيبة مطهرة قوية للقضاء على الفيروسات والبكتيريا والفطريات داخل عنابر التربية قبل وبعد التسكين، لضمان بيئة صحية خالية من المسببات المرضية.',
      uses: [
        'تطهير عنابر التسمين والبياض',
        'تعقيم خطوط المياه والسقايات',
        'آمن وموثوق لبيئة المزرعة'
      ]
    },
    {
      id: 3,
      category: 'اللقاحات',
      categorySlug: 'vaccines',
      icon: '◉',
      name: 'لقاح الوقاية من النيوكاسل والجمبورو',
      text: 'لقاحات حية ومثبطة لدواجن التسمين والبياض.',
      details: 'جرعات وقائية تحفظ تحت درجات حرارة محددة وتُستخدم وفق برنامج التحصين الدوري الموصى به للمزارع لحماية الدواجن من الأمراض الفيروسية الشائعة.',
      uses: [
        'حماية عالية ضد مرض النيوكاسل',
        'دعم مناعة القطيع في الأعمار الأولى',
        'تخزين مبرد دقيق لحفظ الفاعلية'
      ]
    },
    {
      id: 4,
      category: 'اللقاحات',
      categorySlug: 'vaccines',
      icon: '◉',
      name: 'لقاح الحمى القلاعية للمواشي',
      text: 'تحصين وقائي دوري للأبقار والجاموس والأغنام.',
      details: 'لقاح زيتي معتمد يوفر مناعة طويلة الأمد ضد عترات مرض الحمى القلاعية، ويحمي الأبقار والأغنام من الخسائر الإنتاجية.',
      uses: [
        'تحصين للأبقار والجاموس والأغنام',
        'برنامج تحصين نصف سنوي',
        'حماية الثروة الحيوانية من الأوبئة'
      ]
    },
    {
      id: 5,
      category: 'أعلاف الدواجن',
      categorySlug: 'poultry-feed',
      icon: '♧',
      name: 'علف بادي دواجن 23% بروتين',
      text: 'علف متكامل للمرحلة الأولى من عمر الدواجن (1-20 يوم).',
      details: 'علف محبب يحتوي على نسبة عالية من البروتين الخام والفيتامينات لدعم الهيكل العظمي والنمو السريع للكتاكيت خلال الأسابيع الأولى.',
      uses: [
        'نسبة بروتين 23% محددة بدقة',
        'مدعم بالأحماض الأمينية الأساسية',
        'معدل هضم وتحويل متفوق'
      ]
    },
    {
      id: 6,
      category: 'أعلاف الدواجن',
      categorySlug: 'poultry-feed',
      icon: '♧',
      name: 'علف نامي وناهي دواجن 21%-19%',
      text: 'تغذية مرحلية لدواجن التسمين لزيادة الوزن النهائي.',
      details: 'تركيبة علفية ختامية تساعد على بناء الكتلة العضلية وتحقيق أقصى زيادة وزنية قبل التسويق مع المحافظة على تجانس القطيع.',
      uses: [
        'تناسب المرحلة المتوسطة والنهائية',
        'تحسين جودة لحوم التسمين',
        'مكونات طبيعية خالية من الهرمونات'
      ]
    },
    {
      id: 7,
      category: 'أعلاف المواشي',
      categorySlug: 'livestock-feed',
      icon: '♞',
      name: 'علف تسمين مواشي مركز 16% بروتين',
      text: 'خلطة متوازنة لتسمين العجول والأغنام بسرعة وكفاءة.',
      details: 'علف مركز غني بالألياف المهضومة والطاقة والبروتين، يحفز معدل النمو اليومي للعجول مع الحفاظ على الكرش وصحة الجهاز الهضمي.',
      uses: [
        'معدل نمو يومي ممتاز',
        'خلطة آمنة لمنع التخمر والحموضة',
        'معد خصيصًا لمزارع التسمين'
      ]
    },
    {
      id: 8,
      category: 'أعلاف المواشي',
      categorySlug: 'livestock-feed',
      icon: '♞',
      name: 'علف حلاب عالي الإنتاج 18% بروتين',
      text: 'تركيبة خريفي/شتوي لدعم إدرار الحليب في الأبقار.',
      details: 'علف مخصص للأبقار والجاموس الحلاب يحتوي على عناصر نادرة وفيتامينات تزيد من كمية الحليب ونسبة الدسم دون التأثير على صحة الأم.',
      uses: [
        'رفع إنتاجية الحليب اليومية',
        'تحسين نسبة الدهون والبروتين بالحليب',
        'دعم التوازن الغذائي للأمهات'
      ]
    },
    {
      id: 9,
      category: 'مستلزمات المزارع',
      categorySlug: 'farm-supplies',
      icon: '⌂',
      name: 'سقايات وأعلاف أوتوماتيكية للدواجن',
      text: 'تجهيزات توزيع المياه والأعلاف داخل العنابر.',
      details: 'مستلزمات عالية المتانة مصنوعة من البلاستيك الغذائي المقاوم للصدمات والمطهرات، توفر توزيعًا منتظمًا للماء والعلف وتقليل الهدر.',
      uses: [
        'تقليل هدر المياه والعلف',
        'سهلة التنظيف والتطوير',
        'مقاسات متنوعة للعنابر'
      ]
    },
    {
      id: 10,
      category: 'مستلزمات المزارع',
      categorySlug: 'farm-supplies',
      icon: '⌂',
      name: 'محاقن بيطرية ومعدات الرش والتطهير',
      text: 'أدوات حقن أوتوماتيكية وأجهزة رش دقيقة.',
      details: 'معدات حقن مدرجة بدقة ومعدات رش رذاذي لتطهير العنابر والمواشي، تضمن سهولة العمل وتوفير الوقت والمجهود.',
      uses: [
        'دقة عالية في تحديد الجرعات',
        'خامات مقاومة للتآكل والمطهرات',
        'مستلزمات مريحة للاستخدام اليومي'
      ]
    },
    {
      id: 11,
      category: 'مكملات ودعم إنتاجي',
      categorySlug: 'supplements',
      icon: '✚',
      name: 'مجمع فيتامينات (أ د3 هـ) مع الأملاح المعدنية',
      text: 'سائل يضاف للماء لرفع المناعة وتجاوز الإجهاد الحراري.',
      details: 'مكمل غذائي سائل شديد التركيز يُضاف لمياه الشرب في فترات التحصين، تغير الفصول، أو ارتفاع درجات الحرارة لحماية القطيع من الإجهاد.',
      uses: [
        'تقليل آثار الإجهاد الحراري',
        'رفع معدل النشاط والمناعة',
        'سريع الذوبان والامتصاص'
      ]
    },
    {
      id: 12,
      category: 'مكملات ودعم إنتاجي',
      categorySlug: 'supplements',
      icon: '✚',
      name: 'منشط كبد ومغسل كلى بيطري',
      text: 'مستحضر سائل لحماية الكبد وطرد السموم الفطرية.',
      details: 'تركيبة متميزة تحتوي على الأحماض العضوية والسوربيتول لمنع تراكم السموم الفطرية وتنشيط وظائف الكبد والكلى بعد العلاجات المكثفة.',
      uses: [
        'طرد السموم الفطرية من الجسم',
        'تحسين الهضم والكفاءة الغذائية',
        'يُستخدم دوريًا بعد العلاجات'
      ]
    }
  ],
  ads: [
    {
      id: 1,
      tag: 'إعلان جديد',
      title: 'استشر المختص قبل اختيار المنتج',
      text: 'اختيار المنتج المناسب يبدأ بفهم احتياج الحيوان أو المزرعة.',
      icon: '📢',
      featured: true,
      fullDetails: 'نوفر بالمركز البيطري الحديث خدمة استشارية بيطرية متخصصة لمساعدتك في تحديد البروتوكولات العلاجية ومواعيد الجرعات الدقيقة التي تناسب قطيعك أو مزرعتك.',
      promoPhrase: '✦ استشارة بيطرية دقيقة لضمان أعلى معدل سلامة وتحويل غذائي!',
      highlights: [
        'تقييم شامل للحالة أو المزرعة',
        'تحديد الجرعات والمستحضرات المعتمدة',
        'متابعة دورية مع الفريق البيطري'
      ]
    },
    {
      id: 2,
      tag: 'توعية للمربين',
      title: 'الوقاية أساس الإنتاج المستدام',
      text: 'التزم ببرنامج رعاية ووقاية منظم بالتعاون مع طبيبك البيطري.',
      icon: '🛡',
      featured: false,
      fullDetails: 'التطعيم والتحصين المنظم في المواعيد المقررة يقلل من مخاطر الأمراض الوبائية ويحافظ على كفاءة القطيع واستمرارية الإنتاجية.',
      promoPhrase: '✦ خطط الوقاية والبرامج الموسمية متوفرة الآن بالمركز!',
      highlights: [
        'برامج تحصين مخصصة لدواجن التسمين والبياض',
        'جدول رعاية وتغذية متوازن للمواشي',
        'إرشادات الأمان الحيوي للعنابر'
      ]
    },
    {
      id: 3,
      tag: 'خدمات المزارع',
      title: 'حلول أقرب لااحتياجات مزرعتك',
      text: 'نسعى لتوفير المستلزمات والمنتجات التي تدعم عملك اليومي.',
      icon: '🚜',
      featured: false,
      fullDetails: 'نؤمن كافة التجهيزات والمستلزمات التشغيلية للمزارع الكبيرة والصغيرة، مع إمكانية التوريد المباشر والدعم الفني المستمر.',
      promoPhrase: '✦ توريد مباشر بأسعار ممتازة لخدمة كافة المزارع والمربين!',
      highlights: [
        'توفير المستلزمات والمعدات التشغيلية',
        'تسهيلات وتوريدات خاصة للمزارع',
        'دعم فني وتواصل مباشر عبر الواتساب'
      ]
    }
  ],
  partners: [
    { id: 1, name: 'سيفا بيطري (Ceva)', logo: '🌐', type: 'مورد دولي معتمد' },
    { id: 2, name: 'فاركو بيطري (Pharco)', logo: '⚕', type: 'أدوية ومستحضرات' },
    { id: 3, name: 'أفيكو للتحصينات (Avico)', logo: '◉', type: 'لقاحات وحماية' },
    { id: 4, name: 'إفابيكو (Evapco)', logo: '🧪', type: 'مطهرات ووقاية' },
    { id: 5, name: 'كايرو فيد للأعلاف', logo: '🌾', type: 'تغذية ودواجن' },
    { id: 6, name: 'إنترسفيل (Intervet)', logo: '🛡', type: 'رعاية حيوانية' }
  ],
  location: {
    title: 'عنوان المركز البيطري الحديث بالسنطة',
    address: 'السنطة، الشارع الرئيسي (بجوار الصيدلية المركزية)، محافظة الغربية، مصر',
    hours: 'يوميًا من 9:00 صباحًا حتى 10:00 مساءً',
    mapUrl: 'https://www.google.com/maps/place/%D8%A7%D9%84%D9%85%D8%B1%D9%83%D8%B2+%D8%A7%D9%84%D8%A8%D9%8A%D8%B7%D8%B1%D9%8A+%D8%A7%D9%84%D8%AD%D8%AF%D9%8A%D8%AB+%D8%A8%D8%A7%D9%84%D8%B3%D9%86%D8%B7%D8%A9%E2%80%AD/@30.7282547,31.1148443,17z/data=!4m14!1m7!3m6!1s0x14f7c56df9ddceab:0xeef2fa61f7a8f3d!2z2KfZhNmF2LHZg9iyINin2YTYqNmK2LfYsdmKINin2YTYrdiv2YrYqyDYqNin2YTYs9mG2LfYqQ!8m2!3d30.7282547!4d31.1148443!16s%2Fg%2F11zys2km5n!3m5!1s0x14f7c56df9ddceab:0xeef2fa61f7a8f3d!8m2!3d30.7282547!4d31.1148443!16s%2Fg%2F11zys2km5n?hl=ar&entry=ttu&g_ep=EgoyMDI2MDkxNS4wIKXMDSoASAFQAw%3D%3D',
    mapNotes: 'موقع وتوجيهات خريطة Google بالسنطة'
  },
  contact: {
    phone: '+201000000000',
    whatsapp: '201000000000',
    email: 'contact@mvc-vet.com',
    facebook: 'https://www.facebook.com/profile.php?id=61594079684250'
  },
  messages: [
    { id: 1, name: 'محمد السيد', phone: '01012345678', subject: 'استفسار عن لقاحات الدواجن', message: 'السلام عليكم، هل متوفر لقاح الجمبورو لدفعة دجاج تسمين عمر 14 يوم؟', date: 'منذ 10 دقائق', read: false },
    { id: 2, name: 'أحمد مراد', phone: '01123456789', subject: 'خدمة للمزرعة', message: 'أرغب في الاستفسار عن توريد أعلاف دواجن وأدوية بيطرية لمزرعة في الشرقية.', date: 'منذ ساعة', read: false },
    { id: 3, name: 'سارة محمد', phone: '01234567890', subject: 'شراكة أو توريد', message: 'طلب تعاون لتزويد العيادة بمكملات غذائية بيطرية ومطهرات.', date: 'منذ 3 ساعات', read: true }
  ]
};

// Helper Utilities
// Neon PostgreSQL Cloud DB Configuration for Production Live Sync
// Database access lives in Vercel serverless functions. Never put connection
// strings or database credentials in this browser-delivered file.
const SITE_DATA_API = '/api/site-data';

function saveSiteData(callback) {
  const token = (typeof localStorage !== 'undefined' && localStorage.getItem('adminToken')) || (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('adminToken')) || '';
  if (!token) { if (typeof callback === 'function') callback(false); return Promise.resolve(false); }
  return fetch(SITE_DATA_API, { method:'PUT', headers:{'Content-Type':'application/json',Authorization:`Bearer ${token}`}, body:JSON.stringify({payload:siteData}) }).then(response=>{if(!response.ok)throw new Error('Save failed');return response.json();}).then(()=>{if(typeof callback==='function')callback(true);return true;}).catch(error=>{console.error('Site data save error:',error);if(typeof callback==='function')callback(false);return false;});
}

/* Legacy implementation retained below only for line-history compatibility; it is unreachable. */
function legacySaveSiteData(callback) {
  const globalWin = typeof window !== 'undefined' ? window : null;
  if (globalWin) globalWin._isSavingApiData = true;

  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem('mvc_siteData', JSON.stringify(siteData));
    } catch (e) {
      console.error('Error saving siteData to localStorage:', e);
    }
  }

  if (typeof fetch !== 'undefined') {
    const jsonStr = JSON.stringify(siteData).replace(/'/g, "''");
    const sqlQuery = `INSERT INTO mvc_site_data (id, payload) VALUES (1, '${jsonStr}') ON CONFLICT (id) DO UPDATE SET payload = '${jsonStr}', updated_at = NOW();`;

    // 1. Sync to Neon DB (Production Postgres Cloud)
    fetch('/api/legacy-disabled', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: sqlQuery })
    })
    .then(res => res.json())
    .then(cloudRes => {
      console.log('Site data & media successfully saved to Neon DB:', cloudRes);
      if (globalWin) globalWin._isSavingApiData = false;
      if (typeof callback === 'function') callback(true);
    })
    .catch(err => {
      console.warn('Neon DB sync warning:', err);
      if (globalWin) globalWin._isSavingApiData = false;
      if (typeof callback === 'function') callback(true);
    });

    // 2. Also sync to Local Node Server API if running server.js
    const token = (typeof localStorage !== 'undefined' && localStorage.getItem('adminToken'))
      || (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('adminToken')) || '';
    const headers = { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    fetch('/api/save-data', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(siteData)
    }).catch(() => {});
  } else {
    if (globalWin) globalWin._isSavingApiData = false;
    if (typeof callback === 'function') callback(true);
  }
}

function legacyLoadSiteData(onComplete) {
  const globalWin = typeof window !== 'undefined' ? window : null;

  // 1. Load from localStorage for instant zero-latency rendering
  if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem('mvc_siteData');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object' && parsed.categories) Object.assign(siteData, parsed);
      } catch (e) {
        console.error('Error loading siteData from localStorage:', e);
      }
    }
  }

  // 2. Async load live state from Neon DB
  if (typeof fetch !== 'undefined' && globalWin && !globalWin._isFetchingApiData && !globalWin._isSavingApiData) {
    globalWin._isFetchingApiData = true;

    fetch('/api/legacy-disabled', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: 'SELECT payload FROM mvc_site_data WHERE id = 1;' })
    })
      .then(res => {
        if (!res.ok) throw new Error('Neon DB response not ok');
        return res.json();
      })
      .then(neonData => {
        if (globalWin && globalWin._isSavingApiData) return;
        if (neonData && neonData.rows && neonData.rows[0] && neonData.rows[0].payload) {
          const payloadRaw = neonData.rows[0].payload;
          const payload = typeof payloadRaw === 'string' ? JSON.parse(payloadRaw) : payloadRaw;

          if (payload && typeof payload === 'object' && payload.categories && payload.products) {
            siteData.categories = payload.categories || siteData.categories;
            siteData.products = payload.products || siteData.products;
            siteData.ads = payload.ads || siteData.ads;
            siteData.partners = payload.partners || siteData.partners;
            siteData.messages = payload.messages || siteData.messages;
            if (payload.location) siteData.location = payload.location;
            if (payload.contact) siteData.contact = payload.contact;

            if (typeof localStorage !== 'undefined') {
              try {
                localStorage.setItem('mvc_siteData', JSON.stringify(siteData));
              } catch (e) {}
            }
            if (globalWin) {
              globalWin.dispatchEvent(new CustomEvent('sitedataupdated'));
            }
            if (typeof onComplete === 'function') onComplete(siteData);
          }
        }
      })
      .catch(err => {
        console.warn('Neon DB load error, using local fallback:', err);
        if (typeof onComplete === 'function') onComplete(siteData);
      })
      .finally(() => {
        if (globalWin) globalWin._isFetchingApiData = false;
      });
  }
}

function loadSiteData(onComplete) {
  if (typeof fetch === 'undefined') return Promise.resolve(siteData);
  return fetch(SITE_DATA_API,{cache:'no-store'}).then(response=>{if(!response.ok)throw new Error('Load failed');return response.json();}).then(result=>{const payload=result&&result.payload;if(payload&&typeof payload==='object'&&Array.isArray(payload.categories)&&Array.isArray(payload.products)){Object.assign(siteData,payload);window.dispatchEvent(new CustomEvent('sitedataupdated'));}if(typeof onComplete==='function')onComplete(siteData);return siteData;}).catch(error=>{console.warn('Site data load error:',error);if(typeof onComplete==='function')onComplete(siteData);return siteData;});
}
loadSiteData();

// Enable automatic background live polling (every 10 seconds & when tab gets focus)
if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
  window.addEventListener('focus', function() { loadSiteData(); });
  setInterval(function() { loadSiteData(); }, 10000);
}

function getCategoryBySlug(slugOrTitle) {
  if (!slugOrTitle) return null;
  const normalized = decodeURIComponent(slugOrTitle).trim();
  return siteData.categories.find(
    c => c.slug === normalized || c.title === normalized || c.badge === normalized || c.id === normalized
  );
}

function getProductsByCategory(categorySlugOrTitle) {
  if (!categorySlugOrTitle || categorySlugOrTitle === 'الكل') return siteData.products;
  const category = getCategoryBySlug(categorySlugOrTitle);
  if (!category) return siteData.products;
  return siteData.products.filter(
    p => p.categorySlug === category.slug || p.category === category.badge || p.category === category.title
  );
}

function getProductById(id) {
  return siteData.products.find(p => p.id === Number(id));
}

function getAdById(id) {
  if (!siteData || !siteData.ads) return null;
  return siteData.ads.find(a => a.id === Number(id) || a.id == id || String(a.id) === String(id));
}

if (typeof window !== 'undefined') {
  window.siteData = siteData;
  window.saveSiteData = saveSiteData;
  window.loadSiteData = loadSiteData;
  window.getCategoryBySlug = getCategoryBySlug;
  window.getProductsByCategory = getProductsByCategory;
  window.getProductById = getProductById;
  window.getAdById = getAdById;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { siteData, saveSiteData, loadSiteData, getCategoryBySlug, getProductsByCategory, getProductById, getAdById };
}

