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
  products: [],
  ads: [],
  partners: [],
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
  messages: []
};

// Helper Utilities
// Supabase PostgreSQL Cloud DB Configuration for Production Live Sync
// Database access lives in Vercel serverless functions. Never put connection
// strings or database credentials in this browser-delivered file.
const SITE_DATA_API = '/api/site-data';

function saveSiteData(callback) {
  const token = (typeof localStorage !== 'undefined' && localStorage.getItem('adminToken')) || (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('adminToken')) || '';
  if (!token) { if (typeof callback === 'function') callback(false, 'unauthorized'); return Promise.resolve(false); }
  return fetch(SITE_DATA_API, { method:'PUT', headers:{'Content-Type':'application/json',Authorization:`Bearer ${token}`}, body:JSON.stringify({payload:siteData}) }).then(response=>{if(!response.ok){const err = new Error(response.status === 401 ? 'unauthorized' : 'Save failed'); err.status = response.status; throw err;}return response.json();}).then(()=>{if(typeof callback==='function')callback(true);return true;}).catch(error=>{console.error('Site data save error:',error);const reason = error.message === 'unauthorized' ? 'unauthorized' : 'error';if(typeof callback==='function')callback(false, reason);return false;});
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

// Enable automatic background live polling (every 60 seconds & when tab gets focus)
if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
  window.addEventListener('focus', function() { loadSiteData(); });
  setInterval(function() { loadSiteData(); }, 60000);
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

