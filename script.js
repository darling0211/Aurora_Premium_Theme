/* ============================================================
   AURORA V2 — Script
   Builds pages from config, handles navigation, swipe,
   music, gallery lightbox, and envelope animation.
   Pure vanilla JavaScript. No dependencies.
   ============================================================ */

(function () {
  "use strict";

  var config = window.AURORA_CONFIG;
  if (!config) {
    console.error("Aurora V2: config.js not loaded");
    return;
  }

  var pages = config.pages || [];
  var currentIndex = 0;
  var isAnimating = false;

  // ---- DOM refs ----
  var book = document.getElementById("book");
  var prevBtn = document.getElementById("prev-btn");
  var nextBtn = document.getElementById("next-btn");
  var dotsContainer = document.getElementById("page-dots");
  var musicBtn = document.getElementById("music-btn");
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightbox-img");
  var lightboxCaption = document.getElementById("lightbox-caption");
  var lightboxClose = document.getElementById("lightbox-close");
  var particlesContainer = document.getElementById("particles");

  // ---- Music ----
  var audio = new Audio(config.backgroundMusic);
  audio.loop = true;
  audio.volume = 0.4;
  var musicPlaying = false;

  function toggleMusic() {
    if (musicPlaying) {
      audio.pause();
      musicBtn.classList.remove("playing");
      musicPlaying = false;
    } else {
      var p = audio.play();
      if (p && typeof p.then === "function") {
        p.then(function () {
          musicBtn.classList.add("playing");
          musicPlaying = true;
        }).catch(function () {
          // Autoplay blocked — user can tap again
          musicBtn.classList.remove("playing");
          musicPlaying = false;
        });
      } else {
        musicBtn.classList.add("playing");
        musicPlaying = true;
      }
    }
  }

  musicBtn.addEventListener("click", toggleMusic);

  // ---- Build pages ----
  function buildPages() {
    pages.forEach(function (page, i) {
      var el = document.createElement("section");
      el.className = "page";
      el.setAttribute("data-index", i);
      el.setAttribute("data-id", page.id);
      el.innerHTML = renderPage(page, i);
      book.appendChild(el);

      // Wire up page-specific interactions
      wirePage(page, el, i);
    });

    buildDots();
    showPage(0, true);
  }

  function renderPage(page, index) {
    switch (page.type) {
      case "welcome":
        return renderWelcome(page);
      case "hello":
        return renderHello(page);
      case "story":
        return renderStory(page);
      case "movie":
        return rendermovie(page);
      case "memories":
        return renderMemories(page);
      case "letter":
        return renderLetter(page);
      case "forever":
        return renderForever(page);
      default:
        return "";
    }
  }

  function renderWelcome(page) {
    return (
      '<div class="welcome-hero">' +
      '<h1 class="welcome-title">' + esc(page.title) + "</h1>" +
      '<div class="welcome-divider"></div>' +
      '<p class="welcome-subtitle">' + esc(page.subtitle) + "</p>" +
      '<button class="enter-btn" data-action="enter">' + esc(page.enterButtonText) + "</button>" +
      "</div>"
    );
  }

  function renderHello(page) {
    var img = page.image ? '<img class="page-image" src="' + page.image + '" alt="" />' : "";
    return (
      '<div>' +
      '<h2 class="page-title">' + esc(page.greeting) + "</h2>" +
      img +
      '<p class="page-message">' + esc(page.message) + "</p>" +
      "</div>"
    );
  }

  function renderStory(page) {
    var img = page.image ? '<img class="page-image" src="' + page.image + '" alt="" />' : "";
    var paras = (page.paragraphs || [])
      .map(function (p) {
        return "<p>" + esc(p) + "</p>";
      })
      .join("");
    return (
      '<div>' +
      '<h2 class="page-title">' + esc(page.title) + "</h2>" +
      img +
      '<div class="story-paragraphs">' + paras + "</div>" +
      "</div>"
    );
  }

  function rendermovie(page) {
    var img = page.image ? '<img class="page-image" src="' + page.image + '" alt="" />' : "";
    return (
      '<div>' +
      '<h2 class="page-title">' + esc(page.title) + "</h2>" +
      '<p class="page-date">' + esc(page.date) + "</p>" +
      img +
      '<p class="page-message">' + esc(page.message) + "</p>" +
      "</div>"
    );
  }

  function renderMemories(page) {
    var items = (page.gallery || [])
      .map(function (g, i) {
        return (
          '<figure class="gallery-item" data-gallery-index="' + i + '">' +
          '<img src="' + g.src + '" alt="' + esc(g.caption || "") + '" />' +
          '<figcaption class="gallery-caption">' + esc(g.caption || "") + "</figcaption>" +
          "</figure>"
        );
      })
      .join("");
    return (
      '<div>' +
      '<h2 class="page-title">' + esc(page.title) + "</h2>" +
      '<div class="gallery-grid">' + items + "</div>" +
      "</div>"
    );
  }

  function renderLetter(page) {
    var body = (page.letter.body || [])
      .map(function (p) {
        return "<p>" + esc(p) + "</p>";
      })
      .join("");
    return (
      '<div>' +
      '<h2 class="page-title">' + esc(page.title) + "</h2>" +
      '<div class="envelope-wrap" data-action="open-envelope">' +
      '<div class="envelope" id="envelope">' +
      '<div class="envelope-body">' +
      '<div class="envelope-pocket"></div>' +
      '<div class="envelope-flap"></div>' +
      '<div class="envelope-seal">&#9829;</div>' +
      '<div class="letter-card">' +
      '<p class="letter-greeting">' + esc(page.letter.greeting) + "</p>" +
      '<div class="letter-body">' + body + "</div>" +
      '<p class="letter-signoff">' + esc(page.letter.signoff) + "</p>" +
      '<p class="letter-signature">' + esc(page.letter.signature) + "</p>" +
      "</div>" +
      "</div>" +
      "</div>" +
      '<p class="envelope-label">' + esc(page.envelopeLabel) + "</p>" +
      "</div>" +
      "</div>"
    );
  }

  function renderForever(page) {
    return (
      '<div>' +
      '<div class="forever-heart">&#9829;</div>' +
      '<h2 class="page-title">' + esc(page.title) + "</h2>" +
      '<p class="page-message">' + esc(page.message) + "</p>" +
      '<button class="replay-btn" data-action="replay">' + esc(page.replayButtonText) + "</button>" +
      "</div>"
    );
  }

  // ---- Wire page interactions ----
  function wirePage(page, el, index) {
    // Welcome enter button
    var enterBtn = el.querySelector('[data-action="enter"]');
    if (enterBtn) {
      enterBtn.addEventListener("click", function () {
        goTo(index + 1);
        // Try to start music on first interaction
        if (!musicPlaying) {
          toggleMusic();
        }
      });
    }

    // Forever replay button
    var replayBtn = el.querySelector('[data-action="replay"]');
    if (replayBtn) {
      replayBtn.addEventListener("click", function () {
        goTo(0);
      });
    }

    // Envelope toggle
    var envelopeTrigger = el.querySelector('[data-action="open-envelope"]');
    if (envelopeTrigger) {
      envelopeTrigger.addEventListener("click", function () {
        var env = el.querySelector(".envelope");
        if (env) env.classList.toggle("open");
      });
    }

    // Gallery items
    var galleryItems = el.querySelectorAll(".gallery-item");
    galleryItems.forEach(function (item) {
      item.addEventListener("click", function () {
        var gi = parseInt(item.getAttribute("data-gallery-index"), 10);
        var g = (page.gallery || [])[gi];
        if (g) openLightbox(g.src, g.caption || "");
      });
    });
  }

  // ---- Lightbox ----
  function openLightbox(src, caption) {
    lightboxImg.src = src;
    lightboxImg.alt = caption;
    lightboxCaption.textContent = caption;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
  }

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLightbox();
  });

  // ---- Navigation dots ----
  function buildDots() {
    dotsContainer.innerHTML = "";
    pages.forEach(function (_, i) {
      var dot = document.createElement("span");
      dot.className = "page-dot";
      dot.setAttribute("data-index", i);
      dot.addEventListener("click", function () {
        goTo(i);
      });
      dotsContainer.appendChild(dot);
    });
  }

  function updateDots() {
    var dots = dotsContainer.querySelectorAll(".page-dot");
    dots.forEach(function (d, i) {
      if (i === currentIndex) d.classList.add("active");
      else d.classList.remove("active");
    });
  }

  // ---- Page navigation ----
  function showPage(index, instant) {
    var els = book.querySelectorAll(".page");
    els.forEach(function (el, i) {
      el.classList.remove("active", "exit-left", "exit-right");
      if (i === index) {
        el.classList.add("active");
      } else if (i < index) {
        el.classList.add("exit-left");
      } else {
        el.classList.add("exit-right");
      }
    });
    updateDots();
    updateNavButtons();
  }

  function goTo(index) {
    if (isAnimating) return;
    if (index < 0 || index >= pages.length) return;
    if (index === currentIndex) return;

    isAnimating = true;
    var dir = index > currentIndex ? "forward" : "backward";
    var oldEl = book.querySelector('.page[data-index="' + currentIndex + '"]');
    var newEl = book.querySelector('.page[data-index="' + index + '"]');

    if (oldEl) {
      oldEl.classList.remove("active");
      oldEl.classList.add(dir === "forward" ? "exit-left" : "exit-right");
    }
    if (newEl) {
      newEl.classList.remove("exit-left", "exit-right");
      newEl.classList.add("active");
    }

    currentIndex = index;
    updateDots();
    updateNavButtons();

    setTimeout(function () {
      isAnimating = false;
    }, (config.navigation.transitionDuration || 700) + 50);
  }

  function goNext() {
    goTo(currentIndex + 1);
  }

  function goPrev() {
    goTo(currentIndex - 1);
  }

  function updateNavButtons() {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === pages.length - 1;
  }

  prevBtn.addEventListener("click", goPrev);
  nextBtn.addEventListener("click", goNext);

  // ---- Keyboard navigation ----
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") goNext();
    else if (e.key === "ArrowLeft") goPrev();
  });

  // ---- Swipe gestures ----
  if (config.navigation.swipeEnabled !== false) {
    var touchStartX = 0;
    var touchStartY = 0;
    var touchEndX = 0;
    var touchEndY = 0;
    var swipeThreshold = 50;

    book.addEventListener(
      "touchstart",
      function (e) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
      },
      { passive: true }
    );

    book.addEventListener(
      "touchend",
      function (e) {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
      },
      { passive: true }
    );

    function handleSwipe() {
      var dx = touchEndX - touchStartX;
      var dy = touchEndY - touchStartY;
      // Only horizontal swipes
      if (Math.abs(dx) < swipeThreshold) return;
      if (Math.abs(dy) > Math.abs(dx)) return;
      if (dx < 0) goNext();
      else goPrev && goPrev();
    }
  }

  // ---- Floating particles ----
  function buildParticles() {
    if (!config.particles || !config.particles.enabled) return;
    var count = config.particles.count || 15;
    var types = config.particles.types || ["heart"];

    for (var i = 0; i < count; i++) {
      (function (n) {
        setTimeout(function () {
          spawnParticle(types);
        }, n * 600);
      })(i);
    }

    // Continuously spawn
    setInterval(function () {
      spawnParticle(types);
    }, 1400);
  }

  function spawnParticle(types) {
    var type = types[Math.floor(Math.random() * types.length)];
    var el = document.createElement("span");
    el.className = "particle " + type;

    if (type === "heart") {
      el.innerHTML = "&#9829;";
      el.style.fontSize = 0.8 + Math.random() * 1.2 + "rem";
    }

    el.style.left = Math.random() * 100 + "%";
    var duration = 8 + Math.random() * 8;
    el.style.animationDuration = duration + "s";

    particlesContainer.appendChild(el);

    setTimeout(function () {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, duration * 1000 + 500);
  }

  // ---- HTML escape ----
  function esc(str) {
    if (str == null) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // ---- Init ----
  buildPages();
  buildParticles();

  // Set document title
  if (config.siteTitle) {
    document.title = config.siteTitle + " — A Love Story";
  }
})();
