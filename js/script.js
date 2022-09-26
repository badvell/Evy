'use strict';

const allLinks = document.querySelectorAll('.header__link, .header__logo');

// Sticky navigation
const sectionContentEl = document.querySelector(".content");

// burger menu
const menuBurger = document.querySelector('.header__menu');
const menuBurgerOpen = document.querySelector('.header__nav');
const body = document.body;

// Gallery modal
const popup = document.querySelector('.popup');
const popupTitle = document.querySelector('.popup__title');
const popupWrapper = document.querySelector('.popup__wrapper img');

const btnClose = document.querySelector('.popup__close');
const btnNext = document.querySelector('.popup__btn-next');
const btnPrev = document.querySelector('.popup__btn-prev');
const allImages = [...document.querySelectorAll('.gallery__img')];

let slide = 0;
let image = document.getElementsByClassName('content__img');

function carousel() {
  for (const i of image) {
    i.style.display = 'none';
  }
  slide++;

  if (slide > image.length) slide = 1;

  image[slide - 1].style.display = 'block';
  setTimeout(carousel, 6000);
}
carousel();

// Typewriter
let typed = new Typed('.content__text', {
  strings: ['Switzerland', 'Photography', 'Travel'],
  typeSpeed: 150,
  backSpeed: 90,
  loop: true,
  showCursor: false,
});


allLinks.forEach((link) => {
  link.addEventListener('click', (evt) => {
    evt.preventDefault();
    const href = link.getAttribute('href');

    // Scroll back to top
    if (href === "#") window.scrollTo({ top: 0, behavior: 'smooth' });

    // Scroll to other links
    if (href !== "#" && href.startsWith('#')) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// const obs = new IntersectionObserver(
//   function (entries) {
//     const ent = entries[0];
//     if (!ent.isIntersecting) body.classList.add('sticky');
//     if (ent.isIntersecting) body.classList.remove('sticky');
//   },
// );
// obs.observe(sectionContentEl);

let lastScroll = 0;
window.addEventListener('scroll', () => {
  const currScroll = window.pageYOffset;

  if (currScroll <= 0 || currScroll == 0) {
    body.classList.remove('scroll-up');
    body.classList.remove('sticky');
  }

  if (currScroll > lastScroll && !body.classList.contains('scroll-down')) {
    body.classList.remove('scroll-up');
    body.classList.remove('sticky');
    body.classList.add('scroll-down');
  }

  if (currScroll < lastScroll && body.classList.contains('scroll-down')) {
    body.classList.add('sticky');
    body.classList.remove('scroll-down');
    body.classList.add('scroll-up');
  }

  lastScroll = currScroll;
});


if (menuBurger && menuBurgerOpen) {
  menuBurger.addEventListener('click', () => {
    menuBurger.classList.toggle('open');
    menuBurgerOpen.classList.toggle('header__nav_open');
    body.classList.toggle('fixscreen');
  });
}

menuBurgerOpen.querySelectorAll('.header__link').forEach(link => {
  link.addEventListener('click', () => {
    menuBurger.classList.remove('open');
    menuBurgerOpen.classList.remove('header__nav_open');
    body.classList.remove('fixscreen');
  });
});


let curSlide = 0;

allImages.forEach((img, num) => {
  img.addEventListener('click', () => {
    updateUrl(num);
    popup.classList.add('popup_active');
    body.classList.add('fixscreen');
    body.classList.remove('sticky');
  });
});

function updateUrl(num) {
  let imgUrl = `img/gallery/img${num + 1}.jpg`;
  popupWrapper.src = imgUrl;
  popupTitle.innerHTML = allImages[num].alt;
  curSlide = num;
}

function closeModal() {
  popup.classList.remove('popup_active');
  body.classList.remove('fixscreen');
};

window.addEventListener('click', (evt) => {
  if (evt.target === popup) closeModal();
});

window.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') closeModal();
});

btnClose.addEventListener('click', closeModal);

btnNext.addEventListener('click', () => {
  (curSlide < allImages.length - 1) ? updateUrl(curSlide + 1) : updateUrl(curSlide = 0);
});

btnPrev.addEventListener('click', () => {
  (curSlide === 0) ? updateUrl(curSlide = allImages.length - 1) : updateUrl(curSlide - 1);
});

// Reveal sections
const allSections = document.querySelectorAll('section');

function revealSection(entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section__hidden');
  observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.1,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section__hidden');
});