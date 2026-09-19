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


/* =========================================
   中文／英文語言切換
========================================= */

const translations = {
  "zh-Hant": {
    navMission: "守護使命",
    navFeatures: "核心功能",
    navWisdom: "在地智慧",
    navProcess: "運作流程",
    navFuture: "未來計畫",

    heroTitleOne: "智慧潮間帶",
    heroTitleTwo: "巡邏與導覽機器人",

    heroDescription:
      "結合環境感測、影像辨識、語音提醒與在地智慧，用科技守護潮間帶，讓遊客與生態和諧共存。",

    exploreFeatures: "探索機器人功能",
    viewData: "查看專案數據",

    missionTitle: "為什麼潮間帶需要被守護？",
    missionDescription:
      "潮間帶生物十分脆弱，遊客的無意行為也可能影響牠們的棲息環境。",

    strongLight: "強光干擾",
    noise: "噪音干擾",
    crossing: "踩踏與越線",

    featuresTitle: "智慧巡邏核心功能",
    environmentSensing: "環境感測",
    imageRecognition: "影像辨識",
    trackedPatrol: "履帶巡邏",
    voiceAlert: "語音提醒",

    futureTitle: "守護更大的海岸線",
    footerMessage: "科技守護潮間帶，從我們做起。"
  },

  en: {
    navMission: "Mission",
    navFeatures: "Features",
    navWisdom: "Local Wisdom",
    navProcess: "How It Works",
    navFuture: "Future Plans",

    heroTitleOne: "Smart Intertidal",
    heroTitleTwo: "Patrol & Guide Robot",

    heroDescription:
      "Combining environmental sensing, image recognition, voice alerts, and local knowledge to protect the intertidal zone and help visitors coexist with nature.",

    exploreFeatures: "Explore Robot Features",
    viewData: "View Project Data",

    missionTitle: "Why Protect the Intertidal Zone?",
    missionDescription:
      "Intertidal wildlife is fragile, and even unintentional visitor behavior can affect its natural habitat.",

    strongLight: "Strong Light",
    noise: "Noise",
    crossing: "Crossing",

    featuresTitle: "Smart Patrol Features",
    environmentSensing: "Environment Sensing",
    imageRecognition: "Image Recognition",
    trackedPatrol: "Tracked Patrol",
    voiceAlert: "Voice Alerts",

    futureTitle: "Protecting More Coastlines",
    footerMessage:
      "Protecting the intertidal zone through technology."
  }
};

const languageModal =
  document.getElementById("language-modal");

const languageOptionButtons =
  document.querySelectorAll("[data-language]");

const languageSwitchButtons =
  document.querySelectorAll("[data-switch-language]");

/* 套用語言 */
function applyLanguage(language) {
  const selectedTranslations = translations[language];

  if (!selectedTranslations) {
    return;
  }

  document
    .querySelectorAll("[data-i18n]")
    .forEach((element) => {
      const translationKey =
        element.getAttribute("data-i18n");

      const translatedText =
        selectedTranslations[translationKey];

      if (translatedText !== undefined) {
        element.textContent = translatedText;
      }
    });

  /* 修改 HTML 語言屬性 */
  document.documentElement.lang = language;

  /* 儲存使用者選擇 */
  localStorage.setItem(
    "intertidalLanguage",
    language
  );

  /* 關閉語言選擇視窗 */
  languageModal.classList.add("is-hidden");

  /* 更新語言按鈕狀態 */
  languageSwitchButtons.forEach((button) => {
    const isActive =
      button.dataset.switchLanguage === language;

    button.classList.toggle(
      "is-active",
      isActive
    );
  });
}

/* 首次語言選擇 */
languageOptionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyLanguage(button.dataset.language);
  });
});

/* 導覽列語言切換 */
languageSwitchButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyLanguage(
      button.dataset.switchLanguage
    );
  });
});

/* 讀取之前選擇的語言 */
const savedLanguage =
  localStorage.getItem("intertidalLanguage");

if (savedLanguage && translations[savedLanguage]) {
  applyLanguage(savedLanguage);
}


