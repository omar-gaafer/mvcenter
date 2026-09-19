// Administrative Dashboard Logic for Modern Veterinary Center (المركز البيطري الحديث)
const $ = (s) => document.querySelector(s);
const data = typeof siteData !== 'undefined' ? siteData : (window.siteData || {});

// Auth Guard Check
function getStoredToken() {
  return localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
}

function checkAdminAuth() {
  const token = getStoredToken();
  if (!token) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

// Perform Auth Check immediately before rendering
checkAdminAuth();

function logoutAdmin() {
  const token = getStoredToken();
  if (token) {
    fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ token })
    }).catch(() => {});
  }
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminUser');
  sessionStorage.removeItem('adminToken');
  sessionStorage.removeItem('adminUser');
  window.location.href = 'login.html';
}

// Ensure siteData is loaded from localStorage
if (typeof loadSiteData === 'function') loadSiteData();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAdminDashboard);
} else {
  initAdminDashboard();
}

if (window) {
  window.addEventListener('sitedataupdated', initAdminDashboard);
}

function initAdminDashboard() {
  if (!checkAdminAuth()) return;

  // Render User Info if present
  const userJson = localStorage.getItem('adminUser') || sessionStorage.getItem('adminUser');
  if (userJson) {
    try {
      const u = JSON.parse(userJson);
      const nameEl = $('.admin-user b');
      const roleEl = $('.admin-user small');
      const avatarEl = $('.admin-user > span');
      if (nameEl && u.name) nameEl.textContent = u.name;
      if (roleEl && u.role) roleEl.textContent = u.role;
      if (avatarEl && u.name) avatarEl.textContent = u.name.charAt(0);
    } catch(e) {}
  }

  renderAdminProducts();
  renderAdminCategories();
  renderAdminPartners();
  renderAdminAds();
  renderAdminLocationForm();
  renderAdminContactForm();
  renderAdminMessages();

  setupModalHandlers();
  setupSidebarNavigation();
}

// -------------------------------------------------------------
// 1. PRODUCTS / TREATMENTS ADMIN
// -------------------------------------------------------------
function renderAdminProducts() {
  const tbody = $('#adminProductTable');
  if (!tbody || !data.products) return;

  tbody.innerHTML = data.products.map(p => `
    <tr>
      <td><b>${p.name}</b></td>
      <td><span class="category-type-badge">${p.category}</span></td>
      <td>
        ${p.image && (p.image.startsWith('http') || p.image.startsWith('data:'))
          ? `<img src="${p.image}" alt="${p.name}" style="height:32px; width:32px; object-fit:cover; border-radius:6px;" />`
          : `<span class="product-mini">${p.icon || '⚕'}</span>`}
      </td>
      <td style="max-width:200px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${p.text || ''}</td>
      <td>
        <button class="button secondary" onclick="editProduct(${p.id})">تعديل</button>
        <button class="button secondary" style="color:red; border-color:#fca5a5;" onclick="deleteProduct(${p.id})">حذف</button>
      </td>
    </tr>
  `).join('');
}

function editProduct(id) {
  const p = getProductById(id);
  if (!p) return;
  $('#productIdInput').value = p.id;
  $('#productNameInput').value = p.name;
  $('#productCategorySelect').value = p.categorySlug || 'vet-treatments';
  $('#productImageInput').value = p.image || p.icon || '';
  $('#productFileInput').value = '';
  const prev = $('#productFilePreview');
  if (prev) {
    if (p.image && (p.image.startsWith('http') || p.image.startsWith('data:'))) {
      prev.src = p.image;
      prev.style.display = 'block';
    } else {
      prev.style.display = 'none';
    }
  }
  $('#productTextInput').value = p.text || '';
  $('#productDetailsInput').value = p.details || '';
  $('#productUsesInput').value = p.uses ? p.uses.join(', ') : '';

  $('#productModalTitle').textContent = 'تعديل العلاج / المنتج';
  openModal('#productModal');
}

function deleteProduct(id) {
  if (!confirm('هل أنت تأكد من حذف هذا المنتج/العلاج؟')) return;
  const targetId = String(id);
  const currentData = typeof siteData !== 'undefined' ? siteData : (window.siteData || data);
  if (currentData.products) {
    currentData.products = currentData.products.filter(p => String(p.id) !== targetId && p.id != id);
    if (typeof siteData !== 'undefined') siteData.products = currentData.products;
    if (typeof window !== 'undefined' && window.siteData) window.siteData.products = currentData.products;
    if (typeof data !== 'undefined' && data) data.products = currentData.products;
  }
  renderAdminProducts();
  if (typeof saveSiteData === 'function') {
    saveSiteData(() => {
      renderAdminProducts();
    });
  }
}

// -------------------------------------------------------------
// 2. CATEGORY COVER IMAGES ADMIN
// -------------------------------------------------------------
function renderAdminCategories() {
  const tbody = $('#adminCategoryTable');
  if (!tbody || !data.categories) return;

  tbody.innerHTML = data.categories.map(c => `
    <tr>
      <td><b>${c.badge || c.title}</b></td>
      <td>${c.title}</td>
      <td>
        ${c.image && (c.image.startsWith('http') || c.image.startsWith('data:'))
          ? `<img src="${c.image}" alt="${c.title}" style="height:40px; width:60px; object-fit:cover; border-radius:6px;" />`
          : `<span class="category-type-badge">${c.icon} لا توجد صورة غلاف</span>`}
      </td>
      <td>
        <button class="button secondary" onclick="editCategoryCover('${c.slug}')">تعديل الغلاف والتفاصيل</button>
      </td>
    </tr>
  `).join('');
}

function editCategoryCover(slug) {
  const c = getCategoryBySlug(slug);
  if (!c) return;
  $('#categorySlugInput').value = c.slug;
  $('#categoryTitleInput').value = c.title;
  $('#categoryImageInput').value = c.image || '';
  $('#categoryFileInput').value = '';
  const prev = $('#categoryFilePreview');
  if (prev) {
    if (c.image && (c.image.startsWith('http') || c.image.startsWith('data:'))) {
      prev.src = c.image;
      prev.style.display = 'block';
    } else {
      prev.style.display = 'none';
    }
  }
  $('#categoryTextInput').value = c.text || '';
  $('#categoryDetailsInput').value = c.details || '';

  $('#categoryModalTitle').textContent = `تعديل غلاف فئة (${c.badge || c.title})`;
  openModal('#categoryModal');
}

// -------------------------------------------------------------
// 3. PARTNERS & SUPPLIERS ADMIN
// -------------------------------------------------------------
function renderAdminPartners() {
  const tbody = $('#adminPartnerTable');
  if (!tbody || !data.partners) return;

  tbody.innerHTML = data.partners.map(p => `
    <tr>
      <td><b>${p.name}</b></td>
      <td>
        ${p.logo && (p.logo.startsWith('http') || p.logo.startsWith('data:'))
          ? `<img src="${p.logo}" alt="${p.name}" style="height:32px; width:32px; object-fit:contain;" />`
          : `<span class="partner-company-logo" style="width:32px; height:32px;">${p.logo || '🏢'}</span>`}
      </td>
      <td>${p.type || 'شركة شريكة'}</td>
      <td>
        <button class="button secondary" onclick="editPartner(${p.id})">تعديل</button>
        <button class="button secondary" style="color:red; border-color:#fca5a5;" onclick="deletePartner(${p.id})">حذف</button>
      </td>
    </tr>
  `).join('');
}

function editPartner(id) {
  const p = data.partners.find(x => x.id === Number(id));
  if (!p) return;
  $('#partnerIdInput').value = p.id;
  $('#partnerNameInput').value = p.name;
  $('#partnerLogoInput').value = p.logo || '';
  $('#partnerFileInput').value = '';
  const prev = $('#partnerFilePreview');
  if (prev) {
    if (p.logo && (p.logo.startsWith('http') || p.logo.startsWith('data:'))) {
      prev.src = p.logo;
      prev.style.display = 'block';
    } else {
      prev.style.display = 'none';
    }
  }
  $('#partnerTypeInput').value = p.type || '';

  $('#partnerModalTitle').textContent = 'تعديل شركة شريكة';
  openModal('#partnerModal');
}

function deletePartner(id) {
  if (!confirm('هل أنت تأكد من حذف هذه الشركة الشريكة؟')) return;
  const targetId = String(id);
  const currentData = typeof siteData !== 'undefined' ? siteData : (window.siteData || data);
  if (currentData.partners) {
    currentData.partners = currentData.partners.filter(p => String(p.id) !== targetId && p.id != id);
    if (typeof siteData !== 'undefined') siteData.partners = currentData.partners;
    if (typeof window !== 'undefined' && window.siteData) window.siteData.partners = currentData.partners;
    if (typeof data !== 'undefined' && data) data.partners = currentData.partners;
  }
  renderAdminPartners();
  if (typeof saveSiteData === 'function') {
    saveSiteData(() => {
      renderAdminPartners();
    });
  }
}

// -------------------------------------------------------------
// 4. ADS & AWARENESS ADMIN
// -------------------------------------------------------------
function renderAdminAds() {
  const currentData = typeof siteData !== 'undefined' ? siteData : (window.siteData || {});
  const tbody = $('#adminAdTable');
  if (!tbody || !currentData.ads) return;

  tbody.innerHTML = currentData.ads.map((a, index) => `
    <tr>
      <td>
        <div style="display:flex; gap:4px; align-items:center;">
          <button class="button secondary" style="padding:4px 8px; font-size:12px;" onclick="moveAd(${index}, -1)" ${index === 0 ? 'disabled style="opacity:0.3; cursor:not-allowed;"' : ''} title="تحريك لأعلى">▲</button>
          <button class="button secondary" style="padding:4px 8px; font-size:12px;" onclick="moveAd(${index}, 1)" ${index === currentData.ads.length - 1 ? 'disabled style="opacity:0.3; cursor:not-allowed;"' : ''} title="تحريك لأسفل">▼</button>
        </div>
      </td>
      <td><b>${a.title}</b></td>
      <td><span class="category-badge">${a.tag || a.date}</span></td>
      <td>
        ${a.image && (a.image.startsWith('http') || a.image.startsWith('data:'))
          ? `<img src="${a.image}" alt="${a.title}" style="height:32px; width:50px; object-fit:cover; border-radius:6px;" />`
          : `<span>${a.icon || '📢'} صورة غلاف</span>`}
      </td>
      <td style="max-width:180px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${a.promoPhrase || a.fullDetails || ''}</td>
      <td>
        <button class="button secondary" onclick="editAd('${a.id}')">تعديل الـ Pop-Up</button>
        <button class="button secondary" style="color:red; border-color:#fca5a5;" onclick="deleteAd('${a.id}')">حذف</button>
      </td>
    </tr>
  `).join('');
}

function moveAd(index, direction) {
  const currentData = typeof siteData !== 'undefined' ? siteData : (window.siteData || {});
  if (!currentData.ads || index < 0 || index >= currentData.ads.length) return;
  const targetIndex = index + direction;
  if (targetIndex < 0 || targetIndex >= currentData.ads.length) return;

  const temp = currentData.ads[index];
  currentData.ads[index] = currentData.ads[targetIndex];
  currentData.ads[targetIndex] = temp;

  if (typeof siteData !== 'undefined') siteData.ads = currentData.ads;
  if (typeof window !== 'undefined') window.siteData = siteData;
  if (typeof data !== 'undefined' && data) data.ads = currentData.ads;

  renderAdminAds();
  if (typeof saveSiteData === 'function') saveSiteData();
}

function editAd(id) {
  const currentData = typeof siteData !== 'undefined' ? siteData : (window.siteData || {});
  const adsList = currentData.ads || (typeof siteData !== 'undefined' ? siteData.ads : []);
  const a = (typeof getAdById === 'function' ? getAdById(id) : null) || adsList.find(x => x.id == id || String(x.id) === String(id));
  if (!a) return;

  $('#adIdInput').value = a.id;
  $('#adTitleInput').value = a.title || '';
  $('#adTagInput').value = a.tag || a.date || '';
  $('#adImageInput').value = a.image || a.icon || '';
  if ($('#adFileInput')) $('#adFileInput').value = '';
  const prev = $('#adFilePreview');
  if (prev) {
    if (a.image && (a.image.startsWith('http') || a.image.startsWith('data:'))) {
      prev.src = a.image;
      prev.style.display = 'block';
    } else {
      prev.style.display = 'none';
    }
  }
  $('#adTextInput').value = a.text || '';
  $('#adFullDetailsInput').value = a.fullDetails || '';
  $('#adPromoPhraseInput').value = a.promoPhrase || '';
  if ($('#adHighlightsInput')) $('#adHighlightsInput').value = (a.highlights && Array.isArray(a.highlights)) ? a.highlights.join('\n') : '';
  if ($('#adFeaturedInput')) $('#adFeaturedInput').checked = !!a.featured;

  if ($('#adModalTitle')) $('#adModalTitle').textContent = 'تعديل الإعلان والـ Pop-Up';
  openModal('#adModal');
}

function deleteAd(id) {
  if (!confirm('هل أنت تأكد من حذف هذا الإعلان؟')) return;
  const targetId = String(id);
  const currentData = typeof siteData !== 'undefined' ? siteData : (window.siteData || data);
  if (currentData.ads) {
    currentData.ads = currentData.ads.filter(a => String(a.id) !== targetId && a.id != id);
    if (typeof siteData !== 'undefined') siteData.ads = currentData.ads;
    if (typeof window !== 'undefined' && window.siteData) window.siteData.ads = currentData.ads;
    if (typeof data !== 'undefined' && data) data.ads = currentData.ads;
  }
  renderAdminAds();
  if (typeof saveSiteData === 'function') {
    saveSiteData(() => {
      renderAdminAds();
    });
  }
}

// -------------------------------------------------------------
// 5. LOCATION & CONTACT FORMS ADMIN
// -------------------------------------------------------------
function renderAdminLocationForm() {
  const currentData = typeof siteData !== 'undefined' ? siteData : (window.siteData || {});
  if (!currentData.location) return;

  const form = $('#locationForm');
  if (form && document.activeElement && form.contains(document.activeElement)) {
    return;
  }

  const locAddr = $('#locationAddressInput');
  if (locAddr) locAddr.value = currentData.location.address || '';
  const locHours = $('#locationHoursInput');
  if (locHours) locHours.value = currentData.location.hours || '';
  const locMapUrl = $('#locationMapUrlInput');
  if (locMapUrl) locMapUrl.value = currentData.location.mapUrl || '';

  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      currentData.location.address = locAddr.value;
      currentData.location.hours = locHours.value;
      if (locMapUrl) currentData.location.mapUrl = locMapUrl.value;
      if (typeof saveSiteData === 'function') saveSiteData();
      alert('تم تحديث بيانات عنوان المركز وساعات العمل ورابط الخريطة بنجاح!');
    };
  }
}

function renderAdminContactForm() {
  if (!data.contact) return;
  const form = $('#contactSettingsForm');

  if (form && document.activeElement && form.contains(document.activeElement)) {
    return;
  }

  const phoneIn = $('#contactPhoneInput');
  if (phoneIn) phoneIn.value = data.contact.phone || '';
  const waIn = $('#contactWaInput');
  if (waIn) waIn.value = data.contact.whatsapp || '';
  const fbIn = $('#contactFbInput');
  if (fbIn) fbIn.value = data.contact.facebook || '';

  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      data.contact.phone = phoneIn.value;
      data.contact.whatsapp = waIn.value.replace(/[^0-9]/g, '');
      if (fbIn) data.contact.facebook = fbIn.value.trim();
      if (typeof saveSiteData === 'function') saveSiteData();
      alert('تم تحديث أرقام التواصل ورابط صفحة الفيسبوك بنجاح!');
    };
  }
}

// -------------------------------------------------------------
// 6. MESSAGES ADMIN & NOTIFICATIONS
// -------------------------------------------------------------
function renderAdminMessages() {
  const tbody = $('#adminMessageTable');
  if (!tbody || !data.messages) return;

  const unreadCount = data.messages.filter(m => !m.read).length;
  const badge = $('#unreadBadge');
  if (badge) {
    badge.textContent = unreadCount;
    badge.style.display = unreadCount > 0 ? 'inline-block' : 'none';
  }

  tbody.innerHTML = data.messages.map(m => `
    <tr style="${!m.read ? 'font-weight:700; background:#fff7ed;' : ''}">
      <td><b>${m.name}</b></td>
      <td>${m.phone}</td>
      <td>${m.subject}</td>
      <td>${m.date}</td>
      <td>${m.read ? '<span class="status live">● تمت القراءة</span>' : '<span class="status draft" style="background:#ffedd5; color:#c2410c;">● جديد</span>'}</td>
      <td>
        <button class="button secondary" onclick="viewMessage(${m.id})">عرض الاستفسار</button>
      </td>
    </tr>
  `).join('');
}

function viewMessage(id) {
  const m = data.messages.find(x => x.id === Number(id));
  if (!m) return;
  m.read = true;
  if (typeof saveSiteData === 'function') saveSiteData();
  renderAdminMessages();

  $('#messageModalSender').textContent = `استفسار من: ${m.name} (${m.phone})`;
  $('#messageModalBody').textContent = m.message || 'لا يوجد نص رسالة.';

  const cleanPhone = m.phone.replace(/[^0-9]/g, '');
  const waMessage = encodeURIComponent(`أهلاً ${m.name}، بخصوص استفسارك عبر موقع المركز البيطري الحديث: (${m.subject})`);
  $('#messageModalWaBtn').href = `https://wa.me/${cleanPhone}?text=${waMessage}`;

  const deleteBtn = $('#deleteMsgBtn');
  if (deleteBtn) {
    deleteBtn.onclick = () => {
      const targetId = String(id);
      const currentData = typeof siteData !== 'undefined' ? siteData : (window.siteData || data);
      if (currentData.messages) {
        currentData.messages = currentData.messages.filter(x => String(x.id) !== targetId && x.id != id);
        if (typeof siteData !== 'undefined') siteData.messages = currentData.messages;
        if (typeof window !== 'undefined' && window.siteData) window.siteData.messages = currentData.messages;
        if (typeof data !== 'undefined' && data) data.messages = currentData.messages;
      }
      closeModal('#messageModal');
      renderAdminMessages();
      if (typeof saveSiteData === 'function') {
        saveSiteData(() => {
          renderAdminMessages();
        });
      }
    };
  }

  openModal('#messageModal');
}

// Image compression helper to keep Base64 sizes small and avoid localStorage quota limits
function compressImage(file, maxWidth, maxHeight, quality, callback) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
      if (height > maxHeight) {
        width = Math.round((width * maxHeight) / height);
        height = maxHeight;
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
      callback(compressedDataUrl);
    };
    img.onerror = () => {
      callback(e.target.result);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// Helper to handle local file upload to Base64 data URL
function bindFileUpload(fileInputId, textInputId, previewImgId) {
  const fileIn = $(fileInputId);
  const textIn = $(textInputId);
  const previewImg = $(previewImgId);
  if (!fileIn || !textIn) return;

  fileIn.addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    compressImage(file, 900, 900, 0.75, (base64Url) => {
      textIn.value = base64Url;
      if (previewImg) {
        previewImg.src = base64Url;
        previewImg.style.display = 'block';
      }
    });
  });

  textIn.addEventListener('input', () => {
    if (previewImg) {
      const val = textIn.value.trim();
      if (val.startsWith('http') || val.startsWith('data:')) {
        previewImg.src = val;
        previewImg.style.display = 'block';
      } else {
        previewImg.style.display = 'none';
      }
    }
  });
}

function openProductModalForNew() {
  $('#productIdInput').value = '';
  $('#productNameInput').value = '';
  $('#productImageInput').value = '';
  if ($('#productFileInput')) $('#productFileInput').value = '';
  if ($('#productFilePreview')) $('#productFilePreview').style.display = 'none';
  $('#productTextInput').value = '';
  $('#productDetailsInput').value = '';
  $('#productUsesInput').value = '';
  if ($('#productModalTitle')) $('#productModalTitle').textContent = 'إضافة علاج / منتج جديد';
  openModal('#productModal');
}

function saveProductData() {
  const idVal = $('#productIdInput').value;
  const name = $('#productNameInput').value;
  const catSlug = $('#productCategorySelect').value;
  const image = $('#productImageInput').value;
  const text = $('#productTextInput').value;
  const details = $('#productDetailsInput').value;
  const usesStr = $('#productUsesInput').value;

  if (!name) { alert('يرجى كتابة اسم المنتج أو العلاج'); return; }

  const catObj = getCategoryBySlug(catSlug);
  const categoryTitle = catObj ? catObj.badge || catObj.title : 'الأدوية البيطرية';
  const uses = usesStr ? usesStr.split(',').map(x => x.trim()).filter(Boolean) : [];

  if (idVal) {
    const p = getProductById(idVal);
    if (p) {
      p.name = name;
      p.categorySlug = catSlug;
      p.category = categoryTitle;
      p.image = image;
      p.text = text;
      p.details = details;
      p.uses = uses;
    }
  } else {
    const newProd = {
      id: Date.now(),
      category: categoryTitle,
      categorySlug: catSlug,
      icon: '⚕',
      name,
      image,
      text,
      details,
      uses
    };
    if (!data.products) data.products = [];
    data.products.unshift(newProd);
  }

  if (typeof saveSiteData === 'function') saveSiteData();
  closeModal('#productModal');
  renderAdminProducts();
  alert('تم حفظ المنتج وتحديث بياناته بنجاح!');
}

function saveCategoryData() {
  const slug = $('#categorySlugInput').value;
  let c = getCategoryBySlug(slug);
  if (!c) {
    const titleVal = $('#categoryTitleInput').value;
    c = data.categories ? data.categories.find(x => x.slug === slug || x.title === titleVal || x.badge === titleVal) : null;
  }
  if (c) {
    c.title = $('#categoryTitleInput').value || c.title;
    c.image = $('#categoryImageInput').value;
    c.text = $('#categoryTextInput').value;
    c.details = $('#categoryDetailsInput').value;
    if (typeof saveSiteData === 'function') saveSiteData();
    renderAdminCategories();
    closeModal('#categoryModal');
    alert('تم تحديث غلاف الفئة وتفاصيلها بنجاح!');
  } else {
    alert('تعذر العثور على الفئة المحددة لتعديلها.');
  }
}

function openPartnerModalForNew() {
  $('#partnerIdInput').value = '';
  $('#partnerNameInput').value = '';
  $('#partnerLogoInput').value = '';
  if ($('#partnerFileInput')) $('#partnerFileInput').value = '';
  if ($('#partnerFilePreview')) $('#partnerFilePreview').style.display = 'none';
  $('#partnerTypeInput').value = '';
  if ($('#partnerModalTitle')) $('#partnerModalTitle').textContent = 'إضافة شركة شريكة جديدة';
  openModal('#partnerModal');
}

function savePartnerData() {
  const pId = $('#partnerIdInput').value;
  const name = $('#partnerNameInput').value;
  const logo = $('#partnerLogoInput').value || '🏢';
  const type = $('#partnerTypeInput').value || 'شركة شريكة';

  if (!name) { alert('يرجى إدخال اسم الشركة الشريكة'); return; }

  if (pId) {
    const p = data.partners ? data.partners.find(x => x.id === Number(pId)) : null;
    if (p) {
      p.name = name;
      p.logo = logo;
      p.type = type;
    }
  } else {
    if (!data.partners) data.partners = [];
    data.partners.push({
      id: Date.now(),
      name,
      logo,
      type
    });
  }

  if (typeof saveSiteData === 'function') saveSiteData();
  closeModal('#partnerModal');
  renderAdminPartners();
  alert('تم حفظ وإضافة الشركة الشريكة بنجاح!');
}

function openAdModalForNew() {
  $('#adIdInput').value = '';
  $('#adTitleInput').value = '';
  $('#adTagInput').value = '';
  $('#adImageInput').value = '';
  if ($('#adFileInput')) $('#adFileInput').value = '';
  if ($('#adFilePreview')) $('#adFilePreview').style.display = 'none';
  $('#adTextInput').value = '';
  $('#adFullDetailsInput').value = '';
  $('#adPromoPhraseInput').value = '';
  if ($('#adHighlightsInput')) $('#adHighlightsInput').value = '';
  if ($('#adFeaturedInput')) $('#adFeaturedInput').checked = false;
  if ($('#adModalTitle')) $('#adModalTitle').textContent = 'إضافة إعلان جديد';
  openModal('#adModal');
}

function saveAdData() {
  const currentData = typeof siteData !== 'undefined' ? siteData : (window.siteData || {});
  if (!currentData.ads) currentData.ads = [];

  const adId = $('#adIdInput').value;
  const title = $('#adTitleInput').value ? $('#adTitleInput').value.trim() : '';
  const tag = ($('#adTagInput') && $('#adTagInput').value) ? $('#adTagInput').value.trim() : 'إعلان جديد';
  const image = ($('#adImageInput') && $('#adImageInput').value) ? $('#adImageInput').value.trim() : '';
  const text = ($('#adTextInput') && $('#adTextInput').value) ? $('#adTextInput').value.trim() : '';
  const fullDetails = ($('#adFullDetailsInput') && $('#adFullDetailsInput').value) ? $('#adFullDetailsInput').value.trim() : '';
  const promoPhrase = ($('#adPromoPhraseInput') && $('#adPromoPhraseInput').value) ? $('#adPromoPhraseInput').value.trim() : '';
  const rawHighlights = ($('#adHighlightsInput') && $('#adHighlightsInput').value) ? $('#adHighlightsInput').value : '';
  const highlights = rawHighlights ? rawHighlights.split('\n').map(s => s.trim()).filter(Boolean) : [];
  const featured = $('#adFeaturedInput') ? $('#adFeaturedInput').checked : false;

  if (!title) { alert('يرجى إدخال عنوان الإعلان'); return; }

  if (adId) {
    let a = (typeof getAdById === 'function' ? getAdById(adId) : null) || currentData.ads.find(x => x.id == adId || String(x.id) === String(adId));
    if (a) {
      a.title = title;
      a.tag = tag;
      a.date = tag;
      a.image = image;
      a.text = text;
      a.fullDetails = fullDetails;
      a.promoPhrase = promoPhrase;
      a.highlights = highlights;
      a.featured = featured;
    }
  } else {
    currentData.ads.unshift({
      id: Date.now(),
      tag,
      date: tag,
      title,
      image,
      icon: '📢',
      text,
      fullDetails,
      promoPhrase,
      featured,
      highlights: highlights.length > 0 ? highlights : ['متابعة بيطرية متخصصة', 'دعم مستمر للمزارع والمربين']
    });
  }

  // Ensure references are synced
  if (typeof siteData !== 'undefined') siteData.ads = currentData.ads;
  if (typeof window !== 'undefined') window.siteData = siteData;
  if (typeof data !== 'undefined' && data) data.ads = currentData.ads;

  if (typeof saveSiteData === 'function') saveSiteData();
  renderAdminAds();
  closeModal('#adModal');
  alert('تم حفظ الإعلان وتحديث بيانات الـ Pop-Up بنجاح!');
}

// -------------------------------------------------------------
// 7. MODALS & SIDEBAR HANDLERS
// -------------------------------------------------------------
function setupModalHandlers() {
  // Bind file inputs
  bindFileUpload('#productFileInput', '#productImageInput', '#productFilePreview');
  bindFileUpload('#categoryFileInput', '#categoryImageInput', '#categoryFilePreview');
  bindFileUpload('#partnerFileInput', '#partnerLogoInput', '#partnerFilePreview');
  bindFileUpload('#adFileInput', '#adImageInput', '#adFilePreview');

  const addProdBtn = $('#addProductBtn');
  if (addProdBtn) addProdBtn.onclick = openProductModalForNew;

  const saveProdBtn = $('#saveProductBtn');
  if (saveProdBtn) saveProdBtn.onclick = saveProductData;

  const saveCatBtn = $('#saveCategoryBtn');
  if (saveCatBtn) saveCatBtn.onclick = saveCategoryData;

  const addPartnerBtn = $('#addPartnerBtn');
  if (addPartnerBtn) addPartnerBtn.onclick = openPartnerModalForNew;

  const savePartnerBtn = $('#savePartnerBtn');
  if (savePartnerBtn) savePartnerBtn.onclick = savePartnerData;

  const addAdBtn = $('#addAdBtn');
  if (addAdBtn) addAdBtn.onclick = openAdModalForNew;

  const saveAdBtn = $('#saveAdBtn');
  if (saveAdBtn) saveAdBtn.onclick = saveAdData;

  const globalAddBtn = $('#globalAddBtn');
  const globalAddDropdown = $('#globalAddDropdown');

  if (globalAddBtn && globalAddDropdown) {
    globalAddBtn.onclick = (e) => {
      e.stopPropagation();
      globalAddDropdown.classList.toggle('show');
    };

    document.addEventListener('click', (e) => {
      if (!globalAddBtn.contains(e.target) && !globalAddDropdown.contains(e.target)) {
        globalAddDropdown.classList.remove('show');
      }
    });

    globalAddDropdown.querySelectorAll('.dropdown-item').forEach(item => {
      item.addEventListener('click', () => {
        globalAddDropdown.classList.remove('show');
      });
    });
  }

  // Close buttons setup
  ['#closeProductModal', '#closeCategoryModal', '#closePartnerModal', '#closeAdModal', '#closeMessageModal'].forEach(selector => {
    const el = $(selector);
    if (el) {
      el.onclick = () => {
        const modal = el.closest('.admin-modal');
        if (modal) closeModal(`#${modal.id}`);
      };
    }
  });

  // Close modal when tapping outside content box
  document.querySelectorAll('.admin-modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(`#${modal.id}`);
      }
    });
  });
}

function openModal(selector) {
  const modal = $(selector);
  if (modal) {
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    modal.style.display = 'grid';
  }
}

function closeModal(selector) {
  const modal = $(selector);
  if (modal) {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    modal.style.display = 'none';
  }
}

function setupSidebarNavigation() {
  const menuBtn = $('#adminMenuBtn');
  const sidebar = $('#adminSidebar');
  const backdrop = $('#adminSidebarBackdrop');
  const navLinks = document.querySelectorAll('.admin-nav a');
  const sections = document.querySelectorAll('.admin-panel');

  function closeMobileSidebar() {
    if (sidebar) sidebar.classList.remove('sidebar-open');
    if (backdrop) backdrop.classList.remove('active');
  }

  function toggleMobileSidebar() {
    if (sidebar) {
      sidebar.classList.toggle('sidebar-open');
      const isOpen = sidebar.classList.contains('sidebar-open');
      if (backdrop) {
        if (isOpen) backdrop.classList.add('active');
        else backdrop.classList.remove('active');
      }
    }
  }

  if (menuBtn) menuBtn.onclick = toggleMobileSidebar;
  if (backdrop) backdrop.onclick = closeMobileSidebar;

  function updateActiveNav(targetHash) {
    const currentHash = targetHash || window.location.hash || '#products-admin';
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentHash || (!window.location.hash && href === '#products-admin')) {
        link.classList.add('selected');
      } else {
        link.classList.remove('selected');
      }
    });
  }

  // Auto-close sidebar on mobile & update highlight box on link click
  navLinks.forEach(a => {
    a.addEventListener('click', () => {
      const targetHash = a.getAttribute('href');
      updateActiveNav(targetHash);
      closeMobileSidebar();
    });
  });

  // Listen to window hash changes
  window.addEventListener('hashchange', () => {
    updateActiveNav();
  });

  // Track active section on scroll via IntersectionObserver
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          if (id) {
            updateActiveNav('#' + id);
          }
        }
      });
    }, {
      root: null,
      rootMargin: '-20% 0px -50% 0px',
      threshold: 0
    });

    sections.forEach(section => observer.observe(section));
  }

  // Initial highlight setup
  updateActiveNav();

  // Date
  const dateEl = $('#currentAdminDate');
  if (dateEl) {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateEl.textContent = now.toLocaleDateString('ar-EG', options);
  }
}

// Global scope export for inline event handlers
if (typeof window !== 'undefined') {
  window.editProduct = editProduct;
  window.deleteProduct = deleteProduct;
  window.openProductModalForNew = openProductModalForNew;
  window.saveProductData = saveProductData;
  window.editCategoryCover = editCategoryCover;
  window.saveCategoryData = saveCategoryData;
  window.editPartner = editPartner;
  window.deletePartner = deletePartner;
  window.openPartnerModalForNew = openPartnerModalForNew;
  window.savePartnerData = savePartnerData;
  window.editAd = editAd;
  window.deleteAd = deleteAd;
  window.openAdModalForNew = openAdModalForNew;
  window.saveAdData = saveAdData;
  window.viewMessage = viewMessage;
  window.openModal = openModal;
  window.closeModal = closeModal;
  window.logoutAdmin = logoutAdmin;
}
