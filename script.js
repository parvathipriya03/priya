/* ==========================================
   PARVATHI PRIYA PORTFOLIO - JAVASCRIPT
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Set Copyright Year ---
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // --- 2. Mobile Menu Toggle ---
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      const isExpanded = hamburger.classList.contains('active');
      hamburger.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- 3. Theme Switcher (Light / Dark Mode) ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const sunIcon = document.querySelector('.sun-icon');
  const moonIcon = document.querySelector('.moon-icon');

  // Check saved theme or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  let currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  setTheme(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      currentTheme = currentTheme === 'light' ? 'dark' : 'light';
      setTheme(currentTheme);
      localStorage.setItem('theme', currentTheme);
    });
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      if (sunIcon) sunIcon.style.display = 'none';
      if (moonIcon) moonIcon.style.display = 'block';
    } else {
      if (sunIcon) sunIcon.style.display = 'block';
      if (moonIcon) moonIcon.style.display = 'none';
    }
  }

  // --- 4. Active Navigation Link Highlight on Scroll ---
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      const link = document.querySelector(`.nav-links a[href*="#${sectionId}"]`);

      if (link) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  });

  // --- 5. Project Modal Logic ---
  const projectModal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalOverlay = document.getElementById('modal-overlay');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');

  const projectDetails = {
    fraud: {
      title: "Fraudulent Transactions Detection",
      content: `
        <p><strong>Overview:</strong> High-precision machine learning pipeline for detecting fraudulent activity in financial transaction logs.</p>
        <br>
        <p><strong>Technical Stack:</strong> Python, Scikit-Learn, Pandas, NumPy, SQL, SMOTE Imbalanced Data Handling, Random Forest, XGBoost.</p>
        <br>
        <h4>Key Features & Methods:</h4>
        <ul style="padding-left: 1.25rem; margin-top: 0.5rem; line-height: 1.6;">
          <li>Preprocessed raw transactional data, engineered time and amount features, and eliminated collinear attributes.</li>
          <li>Applied Synthetic Minority Over-sampling Technique (SMOTE) to balance heavily skewed fraud class distribution.</li>
          <li>Optimized hyper-parameters using RandomizedSearchCV, achieving 99.2% ROC-AUC score and high precision-recall.</li>
          <li>Constructed interactive visual reports for financial risk managers.</li>
        </ul>
        <br>
        <a href="https://github.com/parvathipriya/fraudulent-transactions-detection" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary" style="margin-top: 0.5rem;">
          View Repository on GitHub
        </a>
      `
    },
    lip: {
      title: "Lip Reading System using Deep Learning",
      content: `
        <p><strong>Overview:</strong> Computer vision and neural sequence processing pipeline that predicts spoken phonemes and phrases purely from silent video frame sequences of human lip movements.</p>
        <br>
        <p><strong>Technical Stack:</strong> Python, TensorFlow / Keras, OpenCV, 3D CNNs, Bidirectional LSTM/GRU, CTC Loss.</p>
        <br>
        <h4>Key Features & Methods:</h4>
        <ul style="padding-left: 1.25rem; margin-top: 0.5rem; line-height: 1.6;">
          <li>Automated mouth region-of-interest (ROI) detection and alignment across input video frames using OpenCV and Dlib landmarks.</li>
          <li>Extracted spatial feature representations using 3D Convolutional Neural Network (3D CNN) layers.</li>
          <li>Modeled temporal frame dependencies with Bidirectional LSTMs and Connectionist Temporal Classification (CTC) loss for sequence decoding.</li>
          <li>Evaluated Word Error Rate (WER) and Character Error Rate (CER) on standard lip-reading benchmark datasets.</li>
        </ul>
        <br>
        <a href="https://github.com/parvathipriya/lip-reading-system" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary" style="margin-top: 0.5rem;">
          View Repository on GitHub
        </a>
      `
    }
  };

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectKey = btn.getAttribute('data-project');
      const data = projectDetails[projectKey];

      if (data && projectModal) {
        modalTitle.textContent = data.title;
        modalBody.innerHTML = data.content;
        projectModal.classList.add('active');
        projectModal.setAttribute('aria-hidden', 'false');
      }
    });
  });

  function closeModal() {
    if (projectModal) {
      projectModal.classList.remove('active');
      projectModal.setAttribute('aria-hidden', 'true');
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('active')) {
      closeModal();
    }
  });

  // --- 6. Contact Form Simulation ---
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('form-submit-btn');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending Message...';
      }

      setTimeout(() => {
        formStatus.textContent = `Thank you, ${name}! Your message has been sent successfully. I will get back to you soon.`;
        formStatus.className = 'form-status success';
        contactForm.reset();

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message';
        }

        setTimeout(() => {
          formStatus.className = 'form-status';
          formStatus.textContent = '';
        }, 5000);
      }, 800);
    });
  }
});
