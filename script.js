/**
 * MR SIGNS & DESIGNS LLC — MAIN INTERACTIVE SCRIPT (ENGLISH)
 * Handles WhatsApp Quote Generator, Gallery Filters, Lightbox, and Mobile Menu.
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('active')) {
          icon.className = 'fa-solid fa-xmark';
        } else {
          icon.className = 'fa-solid fa-bars';
        }
      }
    });

    // Close menu when clicking links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });
  }

  // 2. Active Scroll Highlight
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        if (navLink) navLink.classList.add('active');
      } else {
        if (navLink) navLink.classList.remove('active');
      }
    });
  });

  // 3. Interactive Gallery Filtering
  const tabBtns = document.querySelectorAll('.tab-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
          item.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 4. Image Lightbox Zoom
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const title = item.querySelector('.item-title')?.textContent || '';
      const category = item.querySelector('.item-category')?.textContent || '';

      if (lightboxModal && lightboxImg && img) {
        lightboxImg.src = img.src;
        if (lightboxCaption) lightboxCaption.textContent = `${category}: ${title}`;
        lightboxModal.classList.add('active');
      }
    });
  });

  if (lightboxClose && lightboxModal) {
    lightboxClose.addEventListener('click', () => {
      lightboxModal.classList.remove('active');
    });

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('active');
      }
    });
  }

  // 5. WhatsApp Quote Generator Form
  const productSelect = document.getElementById('product-select');
  const quantityInput = document.getElementById('quantity-input');
  const artSelect = document.getElementById('art-select');
  const zipInput = document.getElementById('zip-input');
  const obsInput = document.getElementById('obs-input');
  const summaryPreview = document.getElementById('summary-preview');
  const quoteForm = document.getElementById('quote-form');

  function updateSummary() {
    if (!summaryPreview) return;
    const prod = productSelect ? productSelect.value : '';
    const qty = quantityInput ? quantityInput.value || '1' : '1';
    const art = artSelect && artSelect.value.includes('ready') ? 'Logo Ready' : 'Free Design Help';
    const zip = zipInput && zipInput.value ? ` • Ship to ${zipInput.value}` : ' • USA Shipping';

    summaryPreview.textContent = `${qty}x ${prod} • ${art}${zip}`;
  }

  if (productSelect) productSelect.addEventListener('change', updateSummary);
  if (quantityInput) quantityInput.addEventListener('input', updateSummary);
  if (artSelect) artSelect.addEventListener('change', updateSummary);
  if (zipInput) zipInput.addEventListener('input', updateSummary);

  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const prod = productSelect ? productSelect.value : 'Custom Uniforms';
      const qty = quantityInput ? quantityInput.value || '15' : '15';
      const art = artSelect ? artSelect.value : 'Logo ready';
      const zip = zipInput && zipInput.value ? zipInput.value : 'Not specified';
      const obs = obsInput && obsInput.value ? obsInput.value : 'No additional notes';

      const message = `*CUSTOM QUOTE REQUEST — MR SIGNS & DESIGNS LLC*%0A%0A` +
        `📦 *Service:* ${prod}%0A` +
        `🔢 *Quantity:* ${qty}%0A` +
        `🎨 *Artwork Status:* ${art}%0A` +
        `📍 *Zip Code / City:* ${zip}%0A` +
        `📝 *Notes:* ${obs}%0A%0A` +
        `_Sent via Mr Signs official website!_`;

      const whatsappUrl = `https://wa.me/17747722028?text=${message}`;
      window.open(whatsappUrl, '_blank');
    });
  }

  // 6. Direct Contact Form Handler
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name-input')?.value || '';
      const phone = document.getElementById('phone-input')?.value || '';
      const msg = document.getElementById('message-input')?.value || '';

      const formattedMessage = `*NEW WEBSITE INQUIRY*%0A%0A` +
        `👤 *Name / Company:* ${name}%0A` +
        `📲 *Phone / WhatsApp:* ${phone}%0A` +
        `💬 *Message:* ${msg}`;

      const whatsappUrl = `https://wa.me/17747722028?text=${formattedMessage}`;
      window.open(whatsappUrl, '_blank');
      contactForm.reset();
    });
  }
});
