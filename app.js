const bag = document.querySelector('.bag b');
let count = 0;
document.querySelectorAll('.add').forEach((button) => button.addEventListener('click', () => {
  count += 1;
  bag.textContent = String(count);
  button.textContent = '✓';
  window.setTimeout(() => { button.textContent = '＋'; }, 850);
}));
document.querySelector('.newsletter form').addEventListener('submit', (event) => {
  event.preventDefault();
  const button = event.currentTarget.querySelector('button');
  button.textContent = '✓';
});

const stickyBackdrop = document.createElement('div');
stickyBackdrop.className = 'sticky-backdrop';
stickyBackdrop.setAttribute('aria-hidden', 'true');
document.querySelector('main').prepend(stickyBackdrop);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion) {
  const backgroundVideo = document.createElement('video');
  backgroundVideo.className = 'site-background-video';
  backgroundVideo.src = 'media/lume-story.mp4';
  backgroundVideo.poster = 'hero-still.png';
  backgroundVideo.autoplay = true;
  backgroundVideo.muted = true;
  backgroundVideo.loop = true;
  backgroundVideo.playsInline = true;
  backgroundVideo.preload = 'auto';
  backgroundVideo.addEventListener('error', () => backgroundVideo.remove(), { once: true });
  stickyBackdrop.append(backgroundVideo);
  backgroundVideo.play().catch(() => {});
}

const copySections = [...document.querySelectorAll('.fixed-copy')];
const observer = new IntersectionObserver((entries) => {
  const active = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (active) stickyBackdrop.dataset.chapter = active.target.dataset.chapter;
}, { threshold: [0.15, 0.35, 0.6] });
copySections.forEach((section) => observer.observe(section));
