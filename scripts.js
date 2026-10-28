document.addEventListener('DOMContentLoaded', () => {
 
  /* ========================
     LIGHTBOX
     ======================== */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const galleryImgs = Array.from(document.querySelectorAll('.gallery-grid img'));
  const closeBtn = document.querySelector('.lightbox-close');
  const previousBtn = document.querySelector('.lightbox-arrow.left');
  const nextBtn = document.querySelector('.lightbox-arrow.right');
  let currentIndex = 0;

  function showPhoto(index) {
    currentIndex = (index + galleryImgs.length) % galleryImgs.length;
    const photo = galleryImgs[currentIndex];
    lightboxImg.src = photo.src;
    lightboxImg.alt = photo.alt;
  }

  function closeLightbox() {
    lightbox.style.display = 'none';
    lightbox.setAttribute('aria-hidden', 'true');
  }

  galleryImgs.forEach((img, index) => {
    img.addEventListener('click', () => {
      showPhoto(index);
      lightbox.style.display = 'flex';
      lightbox.setAttribute('aria-hidden', 'false');
      closeBtn.focus();
    });
  });

  previousBtn.addEventListener('click', () => showPhoto(currentIndex - 1));
  nextBtn.addEventListener('click', () => showPhoto(currentIndex + 1));
  closeBtn.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (lightbox.getAttribute('aria-hidden') === 'true') return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPhoto(currentIndex - 1);
    if (e.key === 'ArrowRight') showPhoto(currentIndex + 1);
  });
 
 
  /* ========================
     STICKY NAV — scroll effect
     ======================== */
  const header = document.getElementById('main-header');
 
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
 
 
  /* ========================
     ACTIVE NAV LINK on scroll
     ======================== */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('header ul li a');
 
  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',  // fires when section is roughly centred
    threshold: 0
  };
 
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`header ul li a[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }, observerOptions);
 
  sections.forEach(section => observer.observe(section));
 
});