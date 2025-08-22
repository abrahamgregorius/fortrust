document.addEventListener("DOMContentLoaded", function () {
  // --- 1. GLOBAL: ICON REPLACEMENT (LUCIDE) ---
  lucide.createIcons();

  // --- 2. GLOBAL: STICKY HEADER ---
  const header = document.querySelector(".header");
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }

  // --- 3. GLOBAL: HAMBURGER MENU ---
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const navMenu = document.getElementById("main-nav");
  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      const menuIcon = hamburgerBtn.querySelector("i");
      if (navMenu.classList.contains("active")) {
        menuIcon.setAttribute("data-lucide", "x");
      } else {
        menuIcon.setAttribute("data-lucide", "menu");
      }
      lucide.createIcons();
    });

    navMenu.querySelectorAll(".nav__link").forEach((link) => {
      link.addEventListener("click", () => {
        if (navMenu.classList.contains("active")) {
          navMenu.classList.remove("active");
          hamburgerBtn.querySelector("i").setAttribute("data-lucide", "menu");
          lucide.createIcons();
        }
      });
    });
  }

  // --- 4. HOME PAGE: TESTIMONIALS SLIDER ---
  const sliderWrapper = document.querySelector(".slider__wrapper");
  if (sliderWrapper) {
    const testimonials = [
      {
        quote:
          "Fortrust made my dream of studying in the UK a reality. Their end-to-end service was flawless...",
        author: "Anya Lestari",
        role: "UCL Alumni, UK (2024)",
        img: "https://via.placeholder.com/50",
      },
      {
        quote:
          "The guidance for my visa application was crystal clear. I was nervous, but the team handled everything professionally...",
        author: "Budi Santoso",
        role: "Monash Student, Australia (2025)",
        img: "https://via.placeholder.com/50",
      },
      {
        quote:
          "As parents, we needed reassurance. Fortrust provided all the answers and secured great accommodation for our son...",
        author: "Mr. & Mrs. Wijaya",
        role: "Parents of a UNSW Student",
        img: "https://via.placeholder.com/50",
      },
    ];
    let currentSlide = 0;

    function renderTestimonials() {
      sliderWrapper.innerHTML = "";
      testimonials.forEach((t, index) => {
        const card = document.createElement("div");
        card.className = `card testimonial-card ${
          index === currentSlide ? "active" : ""
        }`;
        card.innerHTML = `<p class="testimonial-card__content">"${t.quote}"</p><div class="testimonial-card__author"><img src="${t.img}" alt="${t.author}"><div class="author-info"><strong>${t.author}</strong><p>${t.role}</p></div></div>`;
        sliderWrapper.appendChild(card);
      });
    }

    function showSlide(index) {
      document
        .querySelectorAll(".testimonial-card")
        .forEach((s) => s.classList.remove("active"));
      document
        .querySelectorAll(".testimonial-card")
        [index].classList.add("active");
    }

    renderTestimonials();
    document
      .querySelector(".slider__btn--next")
      .addEventListener("click", () => {
        currentSlide = (currentSlide + 1) % testimonials.length;
        showSlide(currentSlide);
      });
    document
      .querySelector(".slider__btn--prev")
      .addEventListener("click", () => {
        currentSlide =
          (currentSlide - 1 + testimonials.length) % testimonials.length;
        showSlide(currentSlide);
      });
  }

  // --- 5. DESTINATIONS PAGE: TABS ---
  const tabsContainer = document.querySelector(".tabs-nav");
  if (tabsContainer) {
    const tabLinks = tabsContainer.querySelectorAll(".tab-link");
    const tabPanes = document.querySelectorAll(".tab-pane");

    tabsContainer.addEventListener("click", (e) => {
      const clickedTab = e.target.closest(".tab-link");
      if (!clickedTab) return;

      e.preventDefault();

      tabLinks.forEach((link) => link.classList.remove("active"));
      clickedTab.classList.add("active");

      const tabId = clickedTab.dataset.tab;
      tabPanes.forEach((pane) => {
        if (pane.id === tabId) {
          pane.classList.add("active");
        } else {
          pane.classList.remove("active");
        }
      });
    });
  }

  // --- 6. PROGRAMS & SERVICES PAGE: ACCORDION ---
  const accordions = document.querySelectorAll(".accordion-item");
  accordions.forEach((item) => {
    const header = item.querySelector(".accordion-header");
    const content = item.querySelector(".accordion-content");
    header.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      // Optional: Close other accordions when one is opened
      // accordions.forEach(i => {
      //     i.classList.remove('active');
      //     i.querySelector('.accordion-content').style.maxHeight = null;
      // });

      if (!isActive) {
        item.classList.add("active");
        content.style.maxHeight = content.scrollHeight + "px";
      } else {
        item.classList.remove("active");
        content.style.maxHeight = null;
      }
    });
  });

  // --- 7. GLOBAL: AUTOMATICALLY UPDATE YEAR in Footer ---
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // --- 8. SUCCESS STORIES PAGE: FILTERING ---
  const filterContainer = document.querySelector(".story-filters");
  if (filterContainer) {
    const filterTags = filterContainer.querySelectorAll(".filter-tag");
    const storyCards = document.querySelectorAll(".story-card");

    filterContainer.addEventListener("click", (e) => {
      const clickedTag = e.target.closest(".filter-tag");
      if (!clickedTag) return;

      filterTags.forEach((tag) => tag.classList.remove("active"));
      clickedTag.classList.add("active");

      const filter = clickedTag.dataset.filter;

      storyCards.forEach((card) => {
        const cardTags = card.dataset.tags;
        if (filter === "all" || cardTags.includes(filter)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  }
});
