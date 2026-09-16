// Main Home Page JavaScript powered by centralized data.js
const $ = (s) => document.querySelector(s);
if (typeof loadSiteData === 'function') loadSiteData();
const data = typeof siteData !== 'undefined' ? siteData : (window.siteData || {});

// Render Category Type Cards on Home Page (Product Guide Section)
const productGrid = $('#productGrid');
const filters = $('#filters');
let selectedCategory = 'الكل';

function renderFilters() {
  if (!filters || !data.categories) return;
  const filterOptions = ['الكل', ...data.categories.map(c => c.badge || c.title)];
  filters.innerHTML = filterOptions.map(catBadge => {
    const isActive = catBadge === selectedCategory;
    return `<button class="filter ${isActive ? 'active' : ''}" data-filter="${catBadge}">${catBadge}</button>`;
  }).join('');
}

function renderCategoryCards() {
  const currentData = typeof siteData !== 'undefined' ? siteData : (window.siteData || {});
  if (!productGrid || !currentData.categories) return;
  const filteredCategories = selectedCategory === 'الكل'
    ? currentData.categories
    : currentData.categories.filter(c => (c.badge === selectedCategory || c.title === selectedCategory));

  productGrid.innerHTML = filteredCategories.map(c => `
    <a href="category.html?cat=${encodeURIComponent(c.slug)}" class="category-type-card" aria-label="عرض منتجات ${c.title}">
      <div class="category-type-header" style="${c.image && (c.image.startsWith('http') || c.image.startsWith('data:')) ? `background-image: url('${c.image}'); background-size: cover; background-position: center;` : ''}">
        <span class="category-type-badge">${c.badge || c.title}</span>
        <span class="category-type-icon">${c.icon}</span>
      </div>
      <div class="category-type-body">
        <h3>${c.title}</h3>
        <p>${c.text}</p>
        <span class="category-type-action">عرض التفاصيل ←</span>
      </div>
    </a>
  `).join('');
}

if (filters && productGrid) {
  renderFilters();
  renderCategoryCards();

  filters.addEventListener('click', (e) => {
    if (e.target.dataset.filter) {
      selectedCategory = e.target.dataset.filter;
      renderFilters();
      renderCategoryCards();
    }
  });
}

// Product Details Dialog
const dialog = $('#productDialog');
function showProduct(id) {
  const p = getProductById(id);
  if (!p || !dialog) return;

  const currentData = typeof siteData !== 'undefined' ? siteData : (window.siteData || {});
  const waNum = (currentData.contact && currentData.contact.whatsapp) ? currentData.contact.whatsapp : '201000000000';
  const waMessage = encodeURIComponent(`السلام عليكم، استفسار عن منتج: ${p.name} (${p.category})`);
  const waUrl = `https://wa.me/${waNum}?text=${waMessage}`;

  const usesHTML = p.uses && p.uses.length > 0
    ? `<div class="quick-info-box"><h3>معلومات واستخدامات سريعة</h3><ul>${p.uses.map(x => `<li>${x}</li>`).join('')}</ul></div>`
    : '';

  $('#dialogContent').innerHTML = `
    <div class="product-image">
      <span>${p.category}</span>
      ${p.image && (p.image.startsWith('http') || p.image.startsWith('data:'))
        ? `<img src="${p.image}" alt="${p.name}" style="width:100%; height:100%; object-fit:cover;" />`
        : p.icon}
    </div>
    <p class="eyebrow">${p.category}</p>
    <h2>${p.name}</h2>
    <p class="product-dialog-desc">${p.details || p.text || ''}</p>
    
    ${usesHTML}

    <div class="dialog-actions">
      <a class="button primary wa-button" href="${waUrl}" target="_blank" rel="noopener">
        <span>◉</span> استفسر عبر واتساب
      </a>
      <a class="button secondary" href="category.html?cat=${encodeURIComponent(p.categorySlug || p.category)}">
        تصفح الفئة الكاملة ←
      </a>
    </div>
  `;
  dialog.showModal();
}

if (productGrid) {
  productGrid.addEventListener('click', e => {
    const card = e.target.closest('.product-card');
    if (card) showProduct(card.dataset.id);
  });

  productGrid.addEventListener('keydown', e => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.closest('.product-card')) {
      showProduct(e.target.closest('.product-card').dataset.id);
    }
  });
}

if ($('.dialog-close')) {
  $('.dialog-close').addEventListener('click', () => dialog.close());
}

// Ads Rendering & Modal Popup
const adGrid = $('#adGrid');
const adDialog = $('#adDialog');

function showAdDetails(id) {
  const a = typeof getAdById === 'function' ? getAdById(id) : (data.ads ? data.ads.find(x => x.id === Number(id)) : null);
  if (!a || !adDialog) return;

  const currentData = typeof siteData !== 'undefined' ? siteData : (window.siteData || {});
  const waNum = (currentData.contact && currentData.contact.whatsapp) ? currentData.contact.whatsapp : '201000000000';
  const waMessage = encodeURIComponent(`السلام عليكم، استفسار بخصوص إعلان: ${a.title}`);
  const waUrl = `https://wa.me/${waNum}?text=${waMessage}`;

  const highlightsHTML = a.highlights && a.highlights.length > 0
    ? `<div class="quick-info-box"><h3>أبرز النقاط والمزايا:</h3><ul>${a.highlights.map(h => `<li>${h}</li>`).join('')}</ul></div>`
    : '';

  $('#adDialogContent').innerHTML = `
    <div class="ad-dialog-banner">
      <span class="ad-dialog-icon">${a.icon || '📢'}</span>
      <span class="category-badge">${a.tag || a.date}</span>
    </div>
    <h2>${a.title}</h2>
    <p class="ad-dialog-desc">${a.fullDetails || a.text}</p>
    
    ${a.promoPhrase ? `<div class="ad-promo-box"><p>${a.promoPhrase}</p></div>` : ''}
    ${highlightsHTML}

    <div class="dialog-actions">
      <a class="button primary wa-button" href="${waUrl}" target="_blank" rel="noopener">
        <span>◉</span> تواصل معنا للاستفسار
      </a>
      <button class="button secondary" onclick="if(document.querySelector('#adDialog'))document.querySelector('#adDialog').close();">
        إغلاق
      </button>
    </div>
  `;
  adDialog.showModal();
}

function renderAds() {
  const currentData = typeof siteData !== 'undefined' ? siteData : (window.siteData || {});
  if (!adGrid || !currentData.ads) return;

  adGrid.innerHTML = currentData.ads.map(a => `
    <article class="ad ${a.featured ? 'featured' : ''}" data-ad-id="${a.id}" tabindex="0" role="button" aria-label="عرض تفاصيل ${a.title}">
      ${a.image && (a.image.startsWith('http') || a.image.startsWith('data:'))
        ? `<div class="ad-card-cover" style="height:120px; background-image:url('${a.image}'); background-size:cover; background-position:center; border-radius:12px 12px 0 0; margin:-22px -22px 16px;"></div>`
        : ''}
      <div>
        <small>${a.tag || a.date}</small>
        <h3>${a.title}</h3>
        <p>${a.text}</p>
      </div>
      <span class="ad-read-more">اعرف المزيد ←</span>
    </article>
  `).join('');
}

if (adGrid) {
  renderAds();

  adGrid.addEventListener('click', e => {
    const card = e.target.closest('.ad');
    if (card && card.dataset.adId) {
      showAdDetails(card.dataset.adId);
    }
  });

  adGrid.addEventListener('keydown', e => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.closest('.ad')) {
      showAdDetails(e.target.closest('.ad').dataset.adId);
    }
  });
}

if ($('.ad-dialog-close')) {
  $('.ad-dialog-close').addEventListener('click', () => {
    if (adDialog) adDialog.close();
  });
}

// Partners Companies Rendering
function renderPartners() {
  const currentData = typeof siteData !== 'undefined' ? siteData : (window.siteData || {});
  const partnerGrid = $('#partnerGrid');
  if (partnerGrid && currentData.partners) {
    partnerGrid.innerHTML = currentData.partners.map(p => `
      <div class="partner-company-card">
        <span class="partner-company-logo">${p.logo && (p.logo.length > 5 || p.logo.startsWith('http') || p.logo.startsWith('data:')) ? `<img src="${p.logo}" alt="${p.name}" />` : (p.logo || '🏢')}</span>
        <div class="partner-company-info">
          <b>${p.name}</b>
          <small>${p.type || 'شركة شريكة'}</small>
        </div>
      </div>
    `).join('');
  }
}
renderPartners();

// Mobile Menu Toggle
if ($('.menu-toggle')) {
  $('.menu-toggle').addEventListener('click', e => {
    const nav = $('.main-nav');
    nav.classList.toggle('open');
    e.currentTarget.setAttribute('aria-expanded', nav.classList.contains('open'));
  });
}

document.querySelectorAll('.main-nav a').forEach(a => a.addEventListener('click', () => {
  if ($('.main-nav')) $('.main-nav').classList.remove('open');
}));

// Render Dynamic Location Info
function renderLocationInfo() {
  const currentData = typeof siteData !== 'undefined' ? siteData : (window.siteData || {});
  if (currentData.location) {
    const locAddr = $('#locationAddress');
    if (locAddr && currentData.location.address) locAddr.textContent = currentData.location.address;
    const locHours = $('#locationHours');
    if (locHours && currentData.location.hours) locHours.textContent = currentData.location.hours;

    const mapUrl = currentData.location.mapUrl || 'https://maps.google.com';
    const mapCard = $('#locationMapCardLink');
    if (mapCard) mapCard.href = mapUrl;
    const mapDirLink = $('#locationDirectionsLink');
    if (mapDirLink) mapDirLink.href = mapUrl;
  }
}
renderLocationInfo();

// Render Dynamic Contact Info (Phone & WhatsApp Links)
function renderContactInfo() {
  const currentData = typeof siteData !== 'undefined' ? siteData : (window.siteData || {});
  if (currentData.contact) {
    const phoneLink = $('#contactPhoneLink');
    if (phoneLink) {
      phoneLink.href = `tel:${currentData.contact.phone}`;
      const b = phoneLink.querySelector('b');
      if (b) b.textContent = currentData.contact.phone;
    }
    const waLink = $('#contactWaLink');
    if (waLink) {
      const cleanWa = (currentData.contact.whatsapp || '').replace(/[^0-9]/g, '');
      waLink.href = `https://wa.me/${cleanWa}`;
    }
  }
}
renderContactInfo();

// Contact Form Handler with Admin Notification Sync
if ($('#contactForm')) {
  $('#contactForm').addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name') || 'زائر';
    const phone = formData.get('phone') || '';
    const subject = formData.get('subject') || 'استفسار جديد';
    const message = formData.get('message') || '';

    const newMsg = {
      id: Date.now(),
      name,
      phone,
      subject,
      message,
      date: 'الآن',
      read: false
    };

    const submitButton = e.target.querySelector('button[type="submit"]');
    if (submitButton) submitButton.disabled = true;
    fetch('/api/messages',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(newMsg)}).then(response=>{if(!response.ok)throw new Error('Message failed');return response.json();}).then(()=>{$('#formNote').textContent='شكرًا لتواصلك مع المركز البيطري الحديث. تم إرسال استفسارك بنجاح وسيتواصل معك فريق د. حسام جعفر.';e.target.reset();}).catch(()=>{$('#formNote').textContent='تعذر إرسال الاستفسار الآن. يرجى المحاولة لاحقًا أو التواصل عبر واتساب.';}).finally(()=>{if(submitButton)submitButton.disabled=false;});
  });
}

// Copyright Year
if ($('#year')) {
  $('#year').textContent = new Date().getFullYear();
}

window.addEventListener('sitedataupdated', () => {
  if (typeof renderFilters === 'function') renderFilters();
  if (typeof renderCategoryCards === 'function') renderCategoryCards();
  if (typeof renderAds === 'function') renderAds();
  if (typeof renderPartners === 'function') renderPartners();
  if (typeof renderLocationInfo === 'function') renderLocationInfo();
  if (typeof renderContactInfo === 'function') renderContactInfo();
});
