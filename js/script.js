/**
 * Main script for Fortrust Website Interactivity
 *
 * This script handles:
 * 1. Sticky Header
 * 2. Mobile Navigation (Hamburger & Dropdowns)
 * 3. Hero Carousel
 * 4. Testimonials Slider
 * 5. Destination Page Tabs
 * 6. Floating WhatsApp Button
 * 7. Dynamic Copyright Year
 * 8. Icon Initialization
 */
document.addEventListener("DOMContentLoaded", function () {
  // --- 1. ELEMENT SELECTORS ---
  // Group all element selections at the top for easier management.
  const elements = {
    header: document.querySelector(".header"),
    hamburgerBtn: document.getElementById("hamburger-btn"),
    navMenu: document.getElementById("main-nav"),
    dropdownItems: document.querySelectorAll(".nav-item--dropdown"),
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
      elements.header.classList.toggle("scrolled", window.scrollY > 50);
    });
  }

  /**
   * Manages the hamburger menu and the mobile dropdown functionality.
   */
  function initMobileNav() {
    if (!elements.hamburgerBtn || !elements.navMenu) return;

    // Hamburger toggle logic
    elements.hamburgerBtn.addEventListener("click", () => {
      const isActive = elements.navMenu.classList.toggle("active");
      const menuIcon = elements.hamburgerBtn.querySelector("i");

      menuIcon.setAttribute("data-lucide", isActive ? "x" : "menu");
      lucide.createIcons();

      // Close all dropdowns if the main menu is closed
      if (!isActive) {
        elements.dropdownItems.forEach((item) =>
          item.classList.remove("active")
        );
      }
    });

    // Mobile dropdown toggle logic for each dropdown item
    elements.dropdownItems.forEach((item) => {  
      const link = item.querySelector(".nav__link");
      link.addEventListener("click", function (e) {
        // Only activate click behavior on mobile
        if (window.innerWidth <= 1024) {
          e.preventDefault(); // Prevent page navigation on tap

          // Close other open dropdowns before opening the new one
          elements.dropdownItems.forEach((otherItem) => {
            if (otherItem !== item) {
              otherItem.classList.remove("active");
            }
          });

          // Toggle the current dropdown
          item.classList.toggle("active");
        }
      });
    });

    // Close menu when a non-dropdown link is clicked
    elements.navMenu.querySelectorAll(".nav__link").forEach((link) => {
      if (!link.closest(".nav-item--dropdown")) {
        link.addEventListener("click", () => {
          elements.navMenu.classList.remove("active");
          // FIX: Check if hamburger button and its icon exist before changing attributes
          if (elements.hamburgerBtn) {
            const menuIcon = elements.hamburgerBtn.querySelector("i");
            if (menuIcon) {
              menuIcon.setAttribute("data-lucide", "menu");
              lucide.createIcons();
            }
          }
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
      slides.forEach((slide, index) =>
        slide.classList.toggle("active", index === slideIndex)
      );
      dots.forEach((dot, index) =>
        dot.classList.toggle("active", index === slideIndex)
      );
      currentSlide = slideIndex;
    };

    const nextSlide = () => goToSlide((currentSlide + 1) % slides.length);
    const prevSlide = () =>
      goToSlide((currentSlide - 1 + slides.length) % slides.length);

    const startSlideShow = () => {
      clearInterval(slideInterval); // Clear previous interval
      slideInterval = setInterval(nextSlide, 7000);
    };

    nextBtn.addEventListener("click", () => {
      nextSlide();
      startSlideShow(); // Reset interval on manual navigation
    });
    prevBtn.addEventListener("click", () => {
      prevSlide();
      startSlideShow(); // Reset interval on manual navigation
    });
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        goToSlide(index);
        startSlideShow(); // Reset interval on manual navigation
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
        quote:
          "All good with Fortrust, I got advice and suggestions that I needed during application to NZ universities. Fortrust staff, mbak Sarah also have assisted me throughout my application journey to several universities until I decided AIS is the most suitable for me. I'm thankful to be given the opportunity to live my NZ dreams with my family. Thank you, Fortrust!",
        author: "Oltariani Laswinta Fitri",
        role: "Auckland Institute of Studies - Master of Business",
        img: "./public/people/Oltariani-Laswinta-Fitri.jpg",
      },
      {
        quote: "Fortrust made the whole process of deciding on a career that future proof and picking the right university program super easy. Not only did they consider what I wanted to study, but they also made sure it fit our budget.",
        author: "Joshua Moshe Djuandi",
        role: "Teesside University - Bachelor of Artificial Intelligence",
        img: "./public/people/Joshua-Moshe-Djuandi.jpg",
      },
      {
        quote:
          "Fortrust provided excellent support throughout my University of Melbourne application process. Their quick responses and insightfuil guidance made the entire experience smooth and stress-free. They were always available to answer questions, offering personalized advice and ensuring I understood each step. Highly recommend their efficient and professional service!",
        author: "Listiawati",
        role: "University of Melbourne - Bachelor of Commerce",
        img: "./public/people/Listiawati.png",
      },
      {
        quote:
          "Sangat membantu dalam memilih jurusan dan sekolah yang cocok berdasarkan dengan jurusannya. Counsellor juga sangat membantu sepanjang proses registrasi ke sekolah tersebut juga memberikan informasi yang detail.",
        author: "Charlotte Erika Javly",
        role: "Amity Global Institute - Finance and Accounting",
        img: "./public/people/Charlotte-Erika-Javly.jpg",
      },
    ];
    let currentTestimonial = 0;

    function render() {
      elements.testimonialSliderWrapper.innerHTML = "";
      testimonials.forEach((testimonial, index) => {
        const card = document.createElement("div");
        card.className = `card testimonial-card ${
          index === currentTestimonial ? "active" : ""
        }`;
        card.innerHTML = `
          <p class="testimonial-card__content">"${testimonial.quote}"</p>
          <div class="testimonial-card__author">
            <img src="${testimonial.img}" alt="Photo of ${testimonial.author}">
            <div class="author-info"><strong>${testimonial.author}</strong><p>${testimonial.role}</p></div>
          </div>`;
        elements.testimonialSliderWrapper.appendChild(card);
      });
    }

    function show(index) {
      const slides =
        elements.testimonialSliderWrapper.querySelectorAll(".testimonial-card");
      slides.forEach((slide, i) =>
        slide.classList.toggle("active", i === index)
      );
    }

    const nextBtn = document.querySelector(".slider__btn--next");
    const prevBtn = document.querySelector(".slider__btn--prev");

    nextBtn.addEventListener("click", () => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      show(currentTestimonial);
    });

    prevBtn.addEventListener("click", () => {
      currentTestimonial =
        (currentTestimonial - 1 + testimonials.length) % testimonials.length;
      show(currentTestimonial);
    });

    setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      show(currentTestimonial);
    }, 5000);

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
      tabPanes.forEach((pane) =>
        pane.classList.toggle("active", pane.id === tabId)
      );
    });
  }

  /**
   * Controls the visibility of the floating WhatsApp button.
   */
  function initFloatingWhatsApp() {
    // if (elements.floatingWhatsApp) {
    //   window.addEventListener("scroll", () => {
    //     elements.floatingWhatsApp.classList.toggle("visible", window.scrollY > 300);
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
