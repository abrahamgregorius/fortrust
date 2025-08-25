document.addEventListener("DOMContentLoaded", function () {
  // --- 1. ELEMENT SELECTORS ---
  // Group all element selections at the top for easier management.
  const elements = {
    header: document.querySelector(".header"),
    hamburgerBtn: document.getElementById("hamburger-btn"),
    navMenu: document.getElementById("main-nav"),
    dropdownItem: document.querySelector(".nav-item--dropdown"),
    carousel: document.querySelector(".hero-carousel"),
    testimonialSliderWrapper: document.querySelector(".slider__wrapper"),
    tabsContainer: document.querySelector(".tabs-nav"),
    floatingWhatsApp: document.querySelector(".floating-whatsapp"),
    yearSpan: document.getElementById("current-year"),
  };

  // --- 2. INITIALIZATION ---
  // This is the main function that runs everything.
  function init() {
    lucide.createIcons();
    initStickyHeader();
    initMobileNav();
    initHeroCarousel();
    initTestimonials();
    initDestinationTabs();
    initFloatingWhatsApp();
    updateCopyrightYear();
  }

  // --- 3. FUNCTIONS ---

  /**
   * Handles the sticky header effect on scroll.
   */
  function initStickyHeader() {
    if (!elements.header) return;
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        elements.header.classList.add("scrolled");
      } else {
        elements.header.classList.remove("scrolled");
      }
    });
  }

  /**
   * Manages the hamburger menu and the mobile dropdown functionality.
   */
  function initMobileNav() {
    if (!elements.hamburgerBtn || !elements.navMenu) return;

    // Hamburger toggle logic
    elements.hamburgerBtn.addEventListener("click", () => {
      elements.navMenu.classList.toggle("active");
      const menuIcon = elements.hamburgerBtn.querySelector("i");
      if (elements.navMenu.classList.contains("active")) {
        menuIcon.setAttribute("data-lucide", "x");
      } else {
        menuIcon.setAttribute("data-lucide", "menu");
        // Close dropdown if menu is closed
        if (elements.dropdownItem) {
          elements.dropdownItem.classList.remove("active");
        }
      }
      lucide.createIcons();
    });

    // Mobile dropdown toggle logic
    if (elements.dropdownItem) {
      const dropdownLink = elements.dropdownItem.querySelector(".nav__link");
      dropdownLink.addEventListener("click", function (e) {
        if (window.innerWidth <= 1024) {
          e.preventDefault(); // Prevent page navigation on tap
          elements.dropdownItem.classList.toggle("active");
        }
      });
    }

    // Close menu when a non-dropdown link is clicked
    elements.navMenu.querySelectorAll(".nav__link").forEach((link) => {
      if (!link.closest(".nav-item--dropdown")) {
        link.addEventListener("click", () => {
          elements.navMenu.classList.remove("active");
          elements.hamburgerBtn.querySelector("i").setAttribute("data-lucide", "menu");
          lucide.createIcons();
        });
      }
    });
  }

  /**
   * Initializes and controls the main hero carousel.
   */
  function initHeroCarousel() {
    if (!elements.carousel) return;

    const slides = elements.carousel.querySelectorAll(".carousel-slide");
    const nextBtn = elements.carousel.querySelector(".carousel-btn.next");
    const prevBtn = elements.carousel.querySelector(".carousel-btn.prev");
    const dots = elements.carousel.querySelectorAll(".dot");
    let currentSlide = 0;
    let slideInterval;

    const goToSlide = (slideIndex) => {
      slides.forEach((slide) => slide.classList.remove("active"));
      dots.forEach((dot) => dot.classList.remove("active"));
      slides[slideIndex].classList.add("active");
      dots[slideIndex].classList.add("active");
      currentSlide = slideIndex;
    };

    const nextSlide = () => goToSlide((currentSlide + 1) % slides.length);
    const prevSlide = () => goToSlide((currentSlide - 1 + slides.length) % slides.length);
    
    const startSlideShow = () => {
      slideInterval = setInterval(nextSlide, 7000);
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
        goToSlide(parseInt(e.target.dataset.slide));
        resetInterval();
      });
    });

    startSlideShow();
  }

  /**
   * Initializes and controls the testimonials slider.
   */
  function initTestimonials() {
    if (!elements.testimonialSliderWrapper) return;

    const testimonials = [
      {
        quote: "Fortrust made my dream of studying in the UK a reality. Their end-to-end service was flawless, and my counsellor was incredibly supportive throughout the entire process.",
        author: "Anya Lestari",
        role: "UCL Alumni, UK (2024)",
        img: "https://via.placeholder.com/50",
      },
      {
        quote: "The guidance for my visa application was crystal clear. I was nervous, but the team handled everything professionally, making it a stress-free experience.",
        author: "Budi Santoso",
        role: "Monash University Student, Australia (2025)",
        img: "https://via.placeholder.com/50",
      },
      {
        quote: "As parents, we needed reassurance about the process and safety. Fortrust provided all the answers and secured great accommodation for our son. Highly recommended!",
        author: "Mr. & Mrs. Wijaya",
        role: "Parents of a UNSW Student, Australia (2024)",
        img: "https://via.placeholder.com/50",
      },
    ];
    let currentTestimonial = 0;

    function render() {
      elements.testimonialSliderWrapper.innerHTML = "";
      testimonials.forEach((testimonial, index) => {
        const card = document.createElement("div");
        card.className = `card testimonial-card ${index === currentTestimonial ? "active" : ""}`;
        card.innerHTML = `
          <p class="testimonial-card__content">"${testimonial.quote}"</p>
          <div class="testimonial-card__author">
            <img src="${testimonial.img}" alt="Photo of ${testimonial.author}">
            <div class="author-info">
              <strong>${testimonial.author}</strong>
              <p>${testimonial.role}</p>
            </div>
          </div>`;
        elements.testimonialSliderWrapper.appendChild(card);
      });
    }

    function show(index) {
      const slides = elements.testimonialSliderWrapper.querySelectorAll(".testimonial-card");
      slides.forEach((slide) => slide.classList.remove("active"));
      slides[index].classList.add("active");
    }

    const nextBtn = document.querySelector(".slider__btn--next");
    const prevBtn = document.querySelector(".slider__btn--prev");

    nextBtn.addEventListener("click", () => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      show(currentTestimonial);
    });

    prevBtn.addEventListener("click", () => {
      currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
      show(currentTestimonial);
    });

    render();
  }

  /**
   * Manages the tab functionality on the destinations page.
   */
  function initDestinationTabs() {
    if (!elements.tabsContainer) return;

    const tabLinks = elements.tabsContainer.querySelectorAll(".tab-link");
    const tabPanes = document.querySelectorAll(".tab-pane");

    elements.tabsContainer.addEventListener("click", (e) => {
      const clickedTab = e.target.closest(".tab-link");
      if (!clickedTab) return;
      e.preventDefault();

      tabLinks.forEach((link) => link.classList.remove("active"));
      clickedTab.classList.add("active");

      const tabId = clickedTab.dataset.tab;
      tabPanes.forEach((pane) => {
        pane.classList.toggle("active", pane.id === tabId);
      });
    });
  }

  /**
   * Controls the visibility of the floating WhatsApp button.
   */
  function initFloatingWhatsApp() {
    // The code is here but commented out as in your original file.
    // if (elements.floatingWhatsApp) {
    //   window.addEventListener("scroll", () => {
    //     if (window.scrollY > 300) {
    //       elements.floatingWhatsApp.classList.add("visible");
    //     } else {
    //       elements.floatingWhatsApp.classList.remove("visible");
    //     }
    //   });
    // }
  }

  /**
   * Updates the copyright year in the footer.
   */
  function updateCopyrightYear() {
    if (elements.yearSpan) {
      elements.yearSpan.textContent = new Date().getFullYear();
    }
  }

  // --- 4. RUN EVERYTHING ---
  init();
});
