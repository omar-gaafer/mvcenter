// Admin Login Logic for Modern Veterinary Center (المركز البيطري الحديث)
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const usernameInput = document.getElementById('loginUsername');
  const passwordInput = document.getElementById('loginPassword');
  const togglePwdBtn = document.getElementById('togglePwdBtn');
  const rememberMe = document.getElementById('rememberMe');
  const loginAlert = document.getElementById('loginAlert');
  const submitBtn = document.getElementById('loginSubmitBtn');

  // 1. Auto-check existing session token
  const existingToken = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
  if (existingToken) {
    fetch('/api/verify-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${existingToken}`
      },
      body: JSON.stringify({ token: existingToken })
    })
    .then(r => {
      if (r.ok) return r.json();
      // On static hosts like Netlify (404), trust local token if valid format
      return { valid: existingToken.startsWith('admin_token_') || existingToken.length >= 10 };
    })
    .then(res => {
      if (res && res.valid) {
        window.location.href = 'admin.html';
      }
    })
    .catch(() => {
      if (existingToken) window.location.href = 'admin.html';
    });
  }

  // 2. Show/Hide Password Toggle
  if (togglePwdBtn && passwordInput) {
    togglePwdBtn.addEventListener('click', () => {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      togglePwdBtn.textContent = type === 'password' ? '👁' : '🙈';
    });
  }

  // Helper: Show Alert
  function showAlert(msg, isSuccess = false) {
    if (!loginAlert) return;
    loginAlert.textContent = msg;
    loginAlert.className = isSuccess ? 'login-alert success' : 'login-alert error';
    loginAlert.style.display = 'block';
  }

  function hideAlert() {
    if (loginAlert) loginAlert.style.display = 'none';
  }

  // Helper: Complete Login Success
  function doLoginSuccess(token, user) {
    showAlert('تم تسجيل الدخول بنجاح! جاري التوجيه...', true);
    const storage = (rememberMe && rememberMe.checked) ? localStorage : sessionStorage;
    storage.setItem('adminToken', token);
    if (user) {
      storage.setItem('adminUser', JSON.stringify(user));
    }

    setTimeout(() => {
      window.location.href = 'admin.html';
    }, 500);
  }

  // 3. Handle Form Submit
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      hideAlert();

      const username = usernameInput.value.trim();
      const password = passwordInput.value.trim();

      if (!username || !password) {
        showAlert('يرجى ملء جميع الحقول المطلوبة');
        return;
      }

      // UI Loading State
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>جاري التحقق...</span>';
      }

      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            doLoginSuccess(data.token, data.user);
            return;
          } else {
            showAlert(data.message || 'بيانات الدخول غير صحيحة');
          }
        } else {
          // If 404 (Netlify static hosting without Node server process)
          fallbackStaticLogin(username, password);
        }
      } catch (err) {
        // Fallback for static Netlify hosting mode
        fallbackStaticLogin(username, password);
      }

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>تسجيل الدخول</span><span class="arrow">➔</span>';
      }
    });
  }

  function fallbackStaticLogin(username, password) {
    // Default Netlify / Static credentials check
    if (username === 'admin' && password === 'admin123') {
      const staticToken = 'admin_token_' + Date.now();
      const staticUser = { name: 'د. حسام جعفر', role: 'مدير النظام' };
      doLoginSuccess(staticToken, staticUser);
    } else {
      showAlert('اسم المستخدم أو كلمة السر غير صحيحة');
    }
  }
});
