// Category Page JavaScript Logic
const $ = (s) => document.querySelector(s);

// Parse URL Parameters
function getSelectedCategoryFromURL() {
  const params = new URLSearchParams(window.location.search);
  const catParam = params.get('cat') || params.get('slug') || params.get('id');
  if (catParam) return decodeURIComponent(catParam);
  
  const hash = window.location.hash.replace('#', '');
  if (hash) return decodeURIComponent(hash);

  return 'الكل';
}

let activeCategoryKey = getSelectedCategoryFromURL();

function renderCategoryPage() {
  const data = typeof siteData !== 'undefined' ? siteData : (window.siteData || {});
  const categoryObj = getCategoryBySlug(activeCategoryKey);
  const products = getProductsByCategory(activeCategoryKey);
  
  // Update Header & Breadcrumb
  const displayTitle = categoryObj ? (categoryObj.badge || categoryObj.title) : (activeCategoryKey === 'الكل' ? 'جميع الفئات' : activeCategoryKey);
  const displayIcon = categoryObj ? categoryObj.icon : '◫';
  const displayDesc = categoryObj ? categoryObj.details : 'استكشف كافة الحلول والمستحضرات البيطرية المتاحة لخدمة الرعاية والإنتاج.';
  
  document.title = `${displayTitle} | المركز البيطري الحديث`;
  $('#breadcrumbCategoryTitle').textContent = displayTitle;
  $('#categoryTitle').textContent = displayTitle;

  const iconEl = $('#categoryIcon');
  if (categoryObj && categoryObj.image && (categoryObj.image.startsWith('http') || categoryObj.image.startsWith('data:'))) {
    iconEl.innerHTML = `<img src="${categoryObj.image}" alt="${displayTitle}" style="width:100%; height:100%; object-fit:cover; border-radius:14px;" />`;
  } else {
    iconEl.textContent = displayIcon;
  }

  $('#categoryDescription').textContent = displayDesc;
  $('#categoryCountBadge').textContent = `${products.length} منتجات متاحة`;
  $('#sectionSubTitle').textContent = categoryObj ? `منتجات ${displayTitle}` : 'جميع منتجات المركز';

  // Render Category Tabs Switcher
  const categoriesList = data.categories || [];
  const allTabs = [{ title: 'الكل', icon: '◫', slug: 'الكل', badge: 'الكل' }, ...categoriesList];
  $('#categoryTabs').innerHTML = allTabs.map(t => {
    const isActive = (t.title === displayTitle || t.badge === displayTitle || t.slug === activeCategoryKey || (activeCategoryKey === 'الكل' && (t.title === 'الكل' || t.badge === 'الكل')));
    return `<button class="category-tab ${isActive ? 'active' : ''}" data-cat="${t.slug}">${t.icon} ${t.badge || t.title}</button>`;
  }).join('');

  // Render Products Grid
  const grid = $('#categoryProductGrid');
  if (products.length === 0) {
    grid.innerHTML = `<div class="empty-state"><p>لا توجد منتجات مسجلة حاليًا في هذه الفئة.</p><a href="category.html?cat=الكل" class="button primary">عرض جميع المنتجات</a></div>`;
    return;
  }

  grid.innerHTML = products.map(p => `
    <article class="product-card" data-id="${p.id}" tabindex="0" role="button" aria-label="عرض تفاصيل ${p.name}">
      <div class="product-image">
        <span>${p.category}</span>
        ${p.image && (p.image.startsWith('http') || p.image.startsWith('data:'))
          ? `<img src="${p.image}" alt="${p.name}" style="width:100%; height:100%; object-fit:cover;" />`
          : p.icon}
      </div>
      <div class="product-body">
        <h3>${p.name}</h3>
        <p>${p.text || ''}</p>
        <button class="details-btn">عرض التفاصيل ←</button>
      </div>
    </article>
  `).join('');
}

// Category Tab Navigation Event Handler
if ($('#categoryTabs')) {
  $('#categoryTabs').addEventListener('click', (e) => {
    const btn = e.target.closest('.category-tab');
    if (btn && btn.dataset.cat) {
      activeCategoryKey = btn.dataset.cat;
      const newUrl = `${window.location.pathname}?cat=${encodeURIComponent(activeCategoryKey)}`;
      window.history.pushState({ cat: activeCategoryKey }, '', newUrl);
      renderCategoryPage();
    }
  });
}

// Product Details Dialog View
const dialog = $('#productDialog');
function showProductDetails(id) {
  const p = getProductById(id);
  if (!p) return;

  const data = typeof siteData !== 'undefined' ? siteData : (window.siteData || {});
  const waNum = (data.contact && data.contact.whatsapp) ? data.contact.whatsapp : '201000000000';
  const waMessage = encodeURIComponent(`السلام عليكم، استفسار عن منتج: ${p.name} (${p.category})`);
  const waUrl = `https://wa.me/${waNum}?text=${waMessage}`;

  const usesHTML = p.uses && p.uses.length > 0
    ? `<div class="quick-info-box"><h3>معلومات واستخدامات سريعة:</h3><ul>${p.uses.map(u => `<li>${u}</li>`).join('')}</ul></div>`
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
      <a class="button secondary" href="index.html#contact" onclick="if(document.querySelector('#productDialog'))document.querySelector('#productDialog').close()">
        نموذج التواصل ←
      </a>
    </div>
  `;
  dialog.showModal();
}

if ($('#categoryProductGrid')) {
  $('#categoryProductGrid').addEventListener('click', e => {
    const card = e.target.closest('.product-card');
    if (card) showProductDetails(card.dataset.id);
  });

  $('#categoryProductGrid').addEventListener('keydown', e => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.closest('.product-card')) {
      showProductDetails(e.target.closest('.product-card').dataset.id);
    }
  });
}

if ($('.dialog-close')) {
  $('.dialog-close').addEventListener('click', () => {
    if (dialog) dialog.close();
  });
}

// Initial Page Load Execution
document.addEventListener('DOMContentLoaded', () => {
  renderCategoryPage();
});

window.addEventListener('sitedataupdated', () => {
  if (typeof renderCategoryPage === 'function') renderCategoryPage();
});
