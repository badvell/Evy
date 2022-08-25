// var myIndex = 0;
// carousel();

// function carousel() {
//   var i;
//   var x = document.getElementsByClassName("content__img");
//   for (i = 0; i < x.length; i++) {
//     x[i].style.display = "none";
//   }
//   myIndex++;
//   if (myIndex > x.length) { myIndex = 1; }
//   x[myIndex - 1].style.display = "block";
//   setTimeout(carousel, 2000); // Change image every 2 seconds
// }

const allLinks = document.querySelectorAll('a:link');

allLinks.forEach(function (link) {
  link.addEventListener('click', function (evt) {
    evt.preventDefault();
    const href = link.getAttribute('href');

    // Scroll back to top
    if (href === "#") window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Scroll to other links
    if (href !== "#" && href.startsWith('#')) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    // Close mobile navigation
    // if (link.classList.contains('header__nav_link'))
    //   headerEl.classList.toggle('nav__open');
  });
});

// Sticky navigation
const sectionContentEl = document.querySelector(".content");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];

    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }

    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    // In the viewport
    // root: null,
    // threshold: 0,
    // rootMargin: "-80px",
  }
);
obs.observe(sectionContentEl);

// burger menu
const menuBurger = document.querySelector('.burger');

menuBurger.addEventListener('click', () => {
  menuBurger.classList.toggle('burger__line-active');
});