document.addEventListener("DOMContentLoaded", function () {
  // --- 1. ICON REPLACEMENT (LUCIDE) ---
  lucide.createIcons();

  // --- 2. STICKY HEADER ---
  const header = document.querySelector(".header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // --- 3. HAMBURGER MENU ---
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const navMenu = document.getElementById("main-nav");
  hamburgerBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    // Optional: Change icon to 'X' when menu is open
    const menuIcon = hamburgerBtn.querySelector("i");
    if (navMenu.classList.contains("active")) {
      menuIcon.setAttribute("data-lucide", "x");
    } else {
      menuIcon.setAttribute("data-lucide", "menu");
    }
    lucide.createIcons(); // Re-render icons
  });

  // Close menu when a link is clicked
  navMenu.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      hamburgerBtn.querySelector("i").setAttribute("data-lucide", "menu");
      lucide.createIcons();
    });
  });

  // --- 4. HERO CAROUSEL ---
  const carousel = document.querySelector(".hero-carousel");
  if (carousel) {
    const slides = document.querySelectorAll(".carousel-slide");
    const nextBtn = document.querySelector(".carousel-btn.next");
    const prevBtn = document.querySelector(".carousel-btn.prev");
    const dots = document.querySelectorAll(".dot");
    let currentSlide = 0;
    let slideInterval;

    const goToSlide = (slideIndex) => {
      slides.forEach((slide) => slide.classList.remove("active"));
      dots.forEach((dot) => dot.classList.remove("active"));

      slides[slideIndex].classList.add("active");
      dots[slideIndex].classList.add("active");
      currentSlide = slideIndex;
    };

    const nextSlide = () => {
      let newSlide = (currentSlide + 1) % slides.length;
      goToSlide(newSlide);
    };

    const prevSlide = () => {
      let newSlide = (currentSlide - 1 + slides.length) % slides.length;
      goToSlide(newSlide);
    };

    const startSlideShow = () => {
      slideInterval = setInterval(nextSlide, 7000); // Ganti slide setiap 7 detik
    };

    const resetInterval = () => {
      clearInterval(slideInterval);
      startSlideShow();
    };

    nextBtn.addEventListener("click", () => {
      nextSlide();
      resetInterval();
    });

    prevBtn.addEventListener("click", () => {
      prevSlide();
      resetInterval();
    });

    dots.forEach((dot) => {
      dot.addEventListener("click", (e) => {
        const slideIndex = parseInt(e.target.dataset.slide);
        goToSlide(slideIndex);
        resetInterval();
      });
    });

    startSlideShow(); // Mulai carousel otomatis
  }

  // --- 5. TESTIMONIALS SLIDER ---
  const testimonials = [
    {
      quote:
        "Fortrust made my dream of studying in the UK a reality. Their end-to-end service was flawless, and my counsellor was incredibly supportive throughout the entire process.",
      author: "Anya Lestari",
      role: "UCL Alumni, UK (2024)",
      img: "https://via.placeholder.com/50",
    },
    {
      quote:
        "The guidance for my visa application was crystal clear. I was nervous, but the team handled everything professionally, making it a stress-free experience.",
      author: "Budi Santoso",
      role: "Monash University Student, Australia (2025)",
      img: "https://via.placeholder.com/50",
    },
    {
      quote:
        "As parents, we needed reassurance about the process and safety. Fortrust provided all the answers and secured great accommodation for our son. Highly recommended!",
      author: "Mr. & Mrs. Wijaya",
      role: "Parents of a UNSW Student, Australia (2024)",
      img: "https://via.placeholder.com/50",
    },
  ];

  const sliderWrapper = document.querySelector(".slider__wrapper");
  let currentTestimonial = 0;

  function renderTestimonials() {
    if (!sliderWrapper) return;
    sliderWrapper.innerHTML = "";
    testimonials.forEach((testimonial, index) => {
      const card = document.createElement("div");
      card.className = `card testimonial-card ${
        index === currentTestimonial ? "active" : ""
      }`;
      card.innerHTML = `
                <p class="testimonial-card__content">"${testimonial.quote}"</p>
                <div class="testimonial-card__author">
                    <img src="${testimonial.img}" alt="Photo of ${testimonial.author}">
                    <div class="author-info">
                        <strong>${testimonial.author}</strong>
                        <p>${testimonial.role}</p>
                    </div>
                </div>
            `;
      sliderWrapper.appendChild(card);
    });
  }

  function showTestimonial(index) {
    const slides = document.querySelectorAll(".testimonial-card");
    slides.forEach((slide) => slide.classList.remove("active"));
    slides[index].classList.add("active");
  }

  if (sliderWrapper) {
    renderTestimonials();

    const nextBtn = document.querySelector(".slider__btn--next");
    const prevBtn = document.querySelector(".slider__btn--prev");

    nextBtn.addEventListener("click", () => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(currentTestimonial);
    });

    prevBtn.addEventListener("click", () => {
      currentTestimonial =
        (currentTestimonial - 1 + testimonials.length) % testimonials.length;
      showTestimonial(currentTestimonial);
    });
  }
  
  // --- KODE BARU: DESTINATIONS PAGE TABS ---
  const tabsContainer = document.querySelector('.tabs-nav');
  if (tabsContainer) {
      const tabLinks = tabsContainer.querySelectorAll('.tab-link');
      const tabPanes = document.querySelectorAll('.tab-pane');

      tabsContainer.addEventListener('click', (e) => {
          const clickedTab = e.target.closest('.tab-link');
          if (!clickedTab) return;
          
          e.preventDefault();
          
          tabLinks.forEach(link => link.classList.remove('active'));
          clickedTab.classList.add('active');

          const tabId = clickedTab.dataset.tab;
          tabPanes.forEach(pane => {
              if (pane.id === tabId) {
                  pane.classList.add('active');
              } else {
                  pane.classList.remove('active');
              }
          });
      });
  }

  // --- 6. FLOATING WHATSAPP BUTTON ---
  const floatingWhatsApp = document.querySelector(".floating-whatsapp");
  // if (floatingWhatsApp) {
  //   window.addEventListener("scroll", () => {
  //     if (window.scrollY > 300) {
  //       floatingWhatsApp.classList.add("visible");
  //     } else {
  //       floatingWhatsApp.classList.remove("visible");
  //     }
  //   });
  // }


  // --- 7. AUTOMATICALLY UPDATE YEAR in Footer ---
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
