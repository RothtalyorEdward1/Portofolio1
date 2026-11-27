document.addEventListener("DOMContentLoaded", () => {
  /* =========================================
     1. AUTO UPDATE TAHUN PADA FOOTER
     ========================================= */
  const yearSpan = document.getElementById("currentYear");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* =========================================
     2. EFEK NAVBAR SAAT HALAMAN DI-SCROLL
     ========================================= */
  const navbar = document.getElementById("mainNavbar");
  const handleNavbarScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };
  window.addEventListener("scroll", handleNavbarScroll);
  handleNavbarScroll();

  /* =========================================
     3. TUTUP MENU HAMBURGER OTOMATIS DI MOBILE
     ========================================= */
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const navbarCollapse = document.getElementById("navbarNav");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navbarCollapse.classList.contains("show")) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    });
  });

  /* =========================================
     4. EFEK MENGETIK (TYPING EFFECT) DI HERO
     ========================================= */
  const typingElement = document.getElementById("typing-role");
  if (typingElement) {
    const roles = [
      "Web Development",
      "UI/UX Design",
      "Casual Game Dev",
      "Python Programming",
    ];
    let roleIndex = 0;
    let charIndex = roles[0].length;
    let isDeleting = true;

    const typeEffect = () => {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        charIndex--;
        typingElement.textContent = currentRole.substring(0, charIndex);
      } else {
        charIndex++;
        typingElement.textContent = currentRole.substring(0, charIndex);
      }

      let typingSpeed = isDeleting ? 55 : 100;

      if (!isDeleting && charIndex === currentRole.length) {
        // Jeda sejenak setelah kata selesai diketik
        typingSpeed = 1800;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        // Pindah ke kata berikutnya
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400;
      }

      setTimeout(typeEffect, typingSpeed);
    };

    // Mulai efek mengetik setelah jeda awal 1.5 detik
    setTimeout(typeEffect, 1500);
  }

  /* =========================================
     5. ANIMASI FADE-IN SAAT ELEMEN MUNCUL (SCROLL REVEAL)
     ========================================= */
  const revealTargets = document.querySelectorAll(
    ".custom-card, .project-card, .timeline-item"
  );

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
    }
  );

  revealTargets.forEach((el) => {
    el.classList.add("reveal-hidden");
    revealObserver.observe(el);
  });
});