document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     手機版導覽選單
  ========================= */

  const menuButton = document.querySelector(
    ".menu-toggle, #menu-toggle, [data-menu-toggle]"
  );

  const navigation = document.querySelector(
    ".nav-links, #nav-menu, [data-nav-menu]"
  );

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("active");

      menuButton.classList.toggle("active", isOpen);
      menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navigation.classList.remove("active");
        menuButton.classList.remove("active");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* =========================
     點擊導覽列後平滑捲動
  ========================= */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        event.preventDefault();

        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  /* =========================
     頁面區塊進場動畫
  ========================= */

  const animatedElements = document.querySelectorAll(
    ".reveal, section, .feature-card, .project-card"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    animatedElements.forEach((element) => {
      element.classList.add("reveal");
      observer.observe(element);
    });
  } else {
    animatedElements.forEach((element) => {
      element.classList.add("show");
    });
  }

  /* =========================
     捲動時改變導覽列外觀
  ========================= */

  const header = document.querySelector("header, .site-header");

  function updateHeader() {
    if (!header) return;

    header.classList.toggle("scrolled", window.scrollY > 40);
  }

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  /* =========================
     回到頂端按鈕
  ========================= */

  const backToTopButton = document.querySelector(
    "#back-to-top, .back-to-top"
  );

  if (backToTopButton) {
    function updateBackToTopButton() {
      backToTopButton.classList.toggle(
        "visible",
        window.scrollY > 500
      );
    }

    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    updateBackToTopButton();
    window.addEventListener("scroll", updateBackToTopButton, {
      passive: true,
    });
  }

  /* =========================
     自動顯示目前年份
  ========================= */

  const yearElement = document.querySelector("#current-year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
