const bagCount = document.querySelector('.bag b');
const cart = document.querySelector('#demo-cart');
const cartCount = cart.querySelector('.cart-count');
let itemsInBag = 0;

function setCartOpen(open) {
  cart.hidden = !open;
  document.querySelector('.bag').setAttribute('aria-expanded', String(open));
  if (open) cart.querySelector('.cart-close').focus();
}

document.querySelector('.bag').addEventListener('click', () => setCartOpen(cart.hidden));
cart.querySelector('.cart-close').addEventListener('click', () => {
  setCartOpen(false);
  document.querySelector('.bag').focus();
});
cart.querySelector('.cart-return').addEventListener('click', () => setCartOpen(false));

document.querySelectorAll('.add').forEach((button) => button.addEventListener('click', () => {
  itemsInBag += 1;
  bagCount.textContent = String(itemsInBag);
  cartCount.textContent = `${itemsInBag} ${itemsInBag === 1 ? 'item adicionado' : 'itens adicionados'} à sacola demonstrativa.`;
  button.textContent = '✓';
  button.setAttribute('aria-label', `${button.getAttribute('aria-label').replace('Adicionar', 'Adicionado')}`);
  window.setTimeout(() => {
    button.textContent = '＋';
    button.setAttribute('aria-label', button.getAttribute('aria-label').replace('Adicionado', 'Adicionar'));
  }, 900);
}));

const newsletter = document.querySelector('.newsletter form');
newsletter.addEventListener('submit', (event) => {
  event.preventDefault();
  newsletter.querySelector('.form-status').textContent = 'Simulação concluída. Este protótipo não envia nem armazena seu e-mail.';
  newsletter.querySelector('button').textContent = '✓';
});

const navToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('#primary-nav');
navToggle.addEventListener('click', () => {
  const open = navToggle.getAttribute('aria-expanded') !== 'true';
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.setAttribute('aria-label', open ? 'Fechar navegação' : 'Abrir navegação');
  primaryNav.dataset.open = String(open);
});
primaryNav.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Abrir navegação');
    primaryNav.dataset.open = 'false';
  }
});

const stickyBackdrop = document.createElement('div');
stickyBackdrop.className = 'sticky-backdrop';
stickyBackdrop.setAttribute('aria-hidden', 'true');
document.querySelector('main').prepend(stickyBackdrop);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let backgroundVideo;
if (!reduceMotion) {
  backgroundVideo = document.createElement('video');
  backgroundVideo.className = 'site-background-video';
  backgroundVideo.src = 'media/lume-story.mp4';
  backgroundVideo.poster = 'hero-still.png';
  backgroundVideo.autoplay = true;
  backgroundVideo.muted = true;
  backgroundVideo.loop = true;
  backgroundVideo.playsInline = true;
  backgroundVideo.preload = 'metadata';
  backgroundVideo.addEventListener('error', () => backgroundVideo.remove(), { once: true });
  stickyBackdrop.append(backgroundVideo);
  backgroundVideo.play().catch(() => {});
} else {
  stickyBackdrop.classList.add('still-frame');
}

document.querySelector('.video-toggle').addEventListener('click', (event) => {
  if (!backgroundVideo) return;
  const paused = !backgroundVideo.paused;
  if (paused) backgroundVideo.pause();
  else backgroundVideo.play().catch(() => {});
  event.currentTarget.textContent = paused ? 'Retomar vídeo' : 'Pausar vídeo';
  event.currentTarget.setAttribute('aria-pressed', String(paused));
});

function thematicEntry(video, phrase, mark) {
  const storageKey = 'lume:thematic-entry-seen:v2';
  let alreadySeen = false;
  try { alreadySeen = sessionStorage.getItem(storageKey) === '1'; } catch {}
  if (alreadySeen || reduceMotion) return;

  const entry = document.createElement('div');
  entry.className = 'thematic-entry';
  entry.dataset.state = 'waiting';
  entry.setAttribute('aria-hidden', 'true');
  entry.innerHTML = `<div class="entry-panel entry-panel-a"></div><div class="entry-panel entry-panel-b"></div><span class="entry-mark">${mark}</span><span class="entry-phrase">${phrase}</span>`;
  document.body.append(entry);

  let opened = false;
  const open = () => {
    if (opened) return;
    opened = true;
    clearTimeout(fallback);
    try { sessionStorage.setItem(storageKey, '1'); } catch {}
    entry.dataset.state = 'opening';
    window.setTimeout(() => entry.remove(), 1450);
  };
  const fallback = window.setTimeout(open, 7000);
  const ready = () => window.setTimeout(open, 260);

  if (!video || video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) ready();
  else {
    video.addEventListener('loadeddata', ready, { once: true });
    video.addEventListener('error', ready, { once: true });
  }
}

thematicEntry(backgroundVideo, 'Uma sala, antes do primeiro acorde.', '♫');

const copySections = [...document.querySelectorAll('.fixed-copy')];
const observer = new IntersectionObserver((entries) => {
  const active = entries.filter((entry) => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (active) stickyBackdrop.dataset.chapter = active.target.dataset.chapter;
}, { threshold: [0.15, 0.35, 0.6] });
copySections.forEach((section) => observer.observe(section));
