const header = document.querySelector("[data-header]");
const overlay = header.querySelector("[data-overlay]");
const homePage = document.getElementById("section-1");
const imgSectiion = document.getElementById("section-3");
const scrollHome = header.querySelector("[data-moveup]");
const imgs = document.querySelectorAll("[data-lazy]");

// const nav = header.querySelector("");

const scrollto = function (id, overlay) {
  const targetid = id.getAttribute("href").substring(1);
  const element = document.getElementById(targetid);

  if (element) {
    if (overlay) overlay.classList.add("hide");
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const handleScroolIntoView = function (dataList) {
  //   Converting the child to an array
  const chidren = Array.from(dataList.children);
  chidren.forEach((child) => {
    // selecting the tag
    const aTref = child.children[0];
    aTref.addEventListener("click", function (e) {
      e.preventDefault();
      scrollto(this, overlay);
    });
  });
};

header.addEventListener("click", function (e) {
  e.preventDefault();
  // targets
  const menu = e.target.closest("[data-open-menu]");
  const closMenu = e.target.closest("[data-close-menu]");
  const closeOverlay = e.target.closest("[data-lay]");
  const dataList = e.target.closest("[data-list]");
  const dataListDesktop = e.target.closest("[data-list-desktop]");
  const moveup = e.target.closest("[data-moveup]");

  if (menu) {
    overlay.classList.remove("hide");
  }

  if (closeOverlay) {
    overlay.classList.add("hide");
  }

  if (closMenu) {
    overlay.classList.add("hide");
  }

  if (dataList) {
    handleScroolIntoView(dataList);
  }

  if (dataListDesktop) {
    handleScroolIntoView(dataListDesktop);
  }

  if (moveup) {
    const atarg = moveup.children[0];
    scrollto(atarg);
  }
});

// -----------------------------------MoveUpToHomePage
const handleIintersection = function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      scrollHome.classList.add("hide");
    } else {
      scrollHome.classList.remove("hide");
    }
  });
};

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.7,
};

const observer = new IntersectionObserver(handleIintersection, options);
observer.observe(homePage);

//--------------------- Lazy Loading Hero

const setBackgroundImage = () => {
  // 1px - 768px which is the breakpiont for tab
  const isMobile = window.innerWidth <= 767;
  const img = document.querySelector("[data-bg]");
  const bgImage = isMobile ? img.dataset.bgMobile : img.dataset.bgDesktop;

  if (bgImage) {
    img.style.backgroundImage = `url(${bgImage})`;
    img.classList.remove("fadeInAndOut");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("load", setBackgroundImage);
  window.addEventListener("resize", setBackgroundImage);
});

// ----------------------Lazy Loading Others

// Handle a single image intersection
const handleImageIsIntersecting = function (entry, observer) {
  if (entry.isIntersecting) {
    const img = entry.target;
    img.src = img.dataset.src;
    // When the loading is completed
    img.onload = () => {
      const parent = img.parentNode;
      if (parent) parent.classList.remove("fadeInAndOut");
      img.classList.remove("fade");
    };
    // Stop observing
    observer.unobserve(img);
  }
};

const handleLazyLoading = function (entries, observer) {
  entries.forEach((entry) => handleImageIsIntersecting(entry, observer));
};

const optionLazy = {
  threshold: 0.1,
};

const lazyObserver = new IntersectionObserver(handleLazyLoading, optionLazy);

imgs.forEach((img) => lazyObserver.observe(img));
