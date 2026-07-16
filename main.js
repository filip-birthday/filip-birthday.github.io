// Birthday page — lottie-web cake + canvas-confetti + GSAP entrance
(function () {
  "use strict";

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


  /* ---------- Confetti helpers ---------- */
  const COLORS = ["#e8657f", "#f6b8c4", "#ffd479", "#ffffff", "#f7e2d8"];

  function burst(originX, originY) {
    if (prefersReduced || typeof confetti !== "function") return;
    const base = {
      spread: 70,
      startVelocity: 42,
      ticks: 220,
      gravity: 0.9,
      scalar: 0.9,
      colors: COLORS,
      disableForReducedMotion: true,
    };
    confetti({ ...base, particleCount: 90, origin: { x: originX, y: originY } });
    confetti({
      ...base,
      particleCount: 40,
      spread: 110,
      startVelocity: 30,
      origin: { x: originX, y: originY },
    });
  }

  /* ---------- Entrance ---------- */
  function playEntrance() {
    if (prefersReduced || !window.gsap) return;
    gsap.set([".eyebrow", ".title .line", ".cake", ".gift-btn"], {
      opacity: 0,
      y: 18,
    });
    const tl = gsap.timeline({
      defaults: { ease: "power3.out", duration: 0.7 },
    });
    tl.to(".eyebrow", { opacity: 1, y: 0 })
      .to(".title .line", { opacity: 1, y: 0, stagger: 0.12 }, "-=0.35")
      .to(".gift-btn", { opacity: 1, y: 0 }, "-=0.4")
      .add(() => burst(0.5, 0.42), "-=0.2");
  }

  /* ---------- Gift button ---------- */
  const gift = document.getElementById("gift");
  if (gift) {
    gift.addEventListener("click", () => {
      const rect = gift.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      burst(x, y);
      if (window.gsap && !prefersReduced) {
        gsap.fromTo(
          gift,
          { scale: 0.92 },
          { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.4)" }
        );
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", playEntrance);
  } else {
    playEntrance();
  }
})();
