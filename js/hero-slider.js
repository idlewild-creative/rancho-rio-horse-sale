document.addEventListener('DOMContentLoaded', function () {
  var slides = document.querySelectorAll('.hero-slide');
  if (slides.length < 2) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  var current = 0;
  setInterval(function () {
    slides[current].classList.remove('is-active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('is-active');
  }, 5000);
});
