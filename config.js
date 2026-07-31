// ============================================================
// AURORA V2 — Configuration File
// Edit all text, images, and music paths here.
// No need to touch index.html, style.css, or script.js.
// ============================================================

const AURORA_CONFIG = {
  // ---- Site-wide ----
  siteTitle: "Aurora V2",
  backgroundMusic: "music/love-theme.mp3",

  // ---- Floating particles ----
  particles: {
    enabled: true,
    count: 18,          // number of hearts/petals floating
    types: ["heart", "petal"], // which shapes to float
  },

  // ---- Navigation ----
  navigation: {
    swipeEnabled: true,
    transitionDuration: 700, // ms for page-turn animation
  },

  // ---- Pages ----
  // Each page is one full screen. Order = navigation order.
  pages: [
    // 1. Welcome
    {
      id: "welcome",
      type: "welcome",
      title: "To My Lovely Princess",
      subtitle: "A Cute Love Story",
      enterButtonText: "DO You Want The Surprise😜",
    },

    // 2. Hello
    {
      id: "hello",
      type: "hello",
      greeting: "Hello, my love",
      message: "Every love story is beautiful, but ours is my favorite. I made this little place on the internet just for you — a garden of our memories, woven in pixels and petals.",
      image: "images/hello.jpg",
    },

    // 3. Our Story
    {
      id: "story",
      type: "story",
      title: "Our Story",
      paragraphs: [
        "It began with a glance, the kind that lingers a second longer than it should. You smiled, and the whole world rearranged itself around that single curve of your lips.",
        "From that moment, every day became a chapter I never wanted to end. We collected sunsets, inside jokes, and quiet moments that spoke louder than words.",
        "This is our story — still being written, still unfolding, still my favorite tale of all.",
      ],
      image: "images/story.jpg",
    },

    // 4. First movie Date
    {
      id: "movie",
      type: "movie",
      title: "Our First movie Date",
      date: "A day etched in starlight",
      message: " I don't remember every dialogue from the film, but I remember every smile, every glance, and the happiness of having you beside me. That day wasn't just about a movie—it became one of my favorite memories.",
      image: "image/movie.jpg",
    },

    // 5. Memories (gallery)
    {
      id: "memories",
      type: "memories",
      title: "Our Memories",
      gallery: [
        { src: "images/memory-1.jpg", caption: "The first smile" },
        { src: "images/memory-2.jpg", caption: "Golden hour together" },
        { src: "images/memory-3.jpg", caption: "A quiet moment" },
        { src: "images/memory-4.jpg", caption: "Dancing in the rain" },
        { src: "images/memory-5.jpg", caption: "Our favorite spot" },
        { src: "images/memory-6.jpg", caption: "Forever begins" },
      ],
    },

    // 6. Love Letter (envelope)
    {
      id: "letter",
      type: "letter",
      title: "A Letter For You",
      envelopeLabel: "Tap to open",
      letter: {
        greeting: "My dearest love,",
        body: [
          "Sometimes I wonder how an ordinary day became so special after you entered my life.",
 "You didn't just become a part of my story—you slowly became the reason many of my favorite memories exist.",
"Every little moment with you means more than you probably realize. Whether it was our temple visit, our movie date, or even the smallest conversations, each memory found a permanent place in my heart.",
"I don't promise a perfect journey because life is never perfect. But I do promise that I'll always try to understand you, support you, make you smile, and stand beside you through every chapter we write together.",
"Thank you for being patient with me, for accepting my imperfections, and for making ordinary moments feel extraordinary.",
"If one day we look back at this little website, I hope we won't just remember the words—we'll remember the happiness, the laughter, and the beautiful memories we created together.",
"No matter how many pages life gives us, my favorite chapter will always be the one where you became a part of my life.",
"With all my heart,.",
        ],
        signoff: "Forever and always,",
        signature: "Your Man😘",
      },
    },

    // 7. Forever
    {
      id: "forever",
      type: "forever",
      title: "Forever",
      message: "Here's to the rest of our chapters — may they be as beautiful as the ones we've already written.",
      replayButtonText: "Read Our Story Again",
    },
  ],
};

// Make available globally for script.js
window.AURORA_CONFIG = AURORA_CONFIG;
