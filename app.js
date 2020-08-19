// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string ex) #HOME -> HOME
//offsetTop - A Number, representing the top position of the element, in pixels

// ********** set date ************
const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear();

// ********** close links ************
const navToggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");
const navbar = document.getElementById("nav");
const topLink = document.querySelector(".top-link");

navToggle.addEventListener("click", () => {
  // ===== Change Height menually =====
  //   linksContainer.classList.toggle("show-links");

  // ===== Change Height dynamically -> getBoundingClientRect() =====
  const containerHeight = linksContainer.getBoundingClientRect().height;
  const linksHeight = links.getBoundingClientRect().height;

  // Default set up correct
  if (containerHeight !== 0) {
    linksContainer.style.height = 0;
  } else {
    linksContainer.style.height = `${linksHeight}px`;
  }
});

// ********** fixed navbar ************
window.addEventListener("scroll", () => {
  const scrollHeight = window.pageYOffset;
  const navbarHeight = navbar.getBoundingClientRect().height;

  if (scrollHeight > navbarHeight) {
    navbar.classList.add("fixed-nav");
  } else {
    navbar.classList.remove("fixed-nav");
  }

  if (scrollHeight > 300) {
    topLink.classList.add("show-link");
  } else {
    topLink.classList.remove("show-link");
  }
});
// ********** smooth scroll ************
// select links

const scrollLinks = document.querySelectorAll(".scroll-link");
scrollLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    // prevent default
    e.preventDefault();

    // #home -> home
    const id = e.currentTarget.getAttribute("href").slice(1);
    const dynamicElement = document.getElementById(id);
    const navHeight = navbar.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const fixedNav = navbar.classList.contains("fixed-nav");
    let position = dynamicElement.offsetTop - navHeight;

    if (!fixedNav) {
      position = position - navHeight;
    }
    if (navHeight > 82) {
      position = position + containerHeight;
    }

    window.scrollTo({
      left: 0,
      top: position,
      behavior: "smooth",
    });

    linksContainer.style.height = 0;
  });
});
