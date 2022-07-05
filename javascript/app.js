"use strict";
/*************
 * slider
*************/
import * as name from "./cart";
const Slider = function () {
  // selectors
  const slides = document.querySelectorAll(".slide");
  const dotContainer = document.querySelector(".dots");
  let curentslide = 0;
  // Functions
  const createDots = function () {
    slides.forEach(function (_s, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activeDots = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const inti = function () {
    goToSlide(0);
    createDots();
    activeDots(0);
  };
  inti();

  // document.addEventListener("keydown", function (e) {
  //   if (e.key === "ArrowRight") nextSlide();
  //   if (e.key === "ArrowLeft") prevSlide();
  // });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const {slide}  = e.target.dataset;
      
      goToSlide(slide);
      activeDots(slide);
    }
  });
};
Slider();
/*************
 * scroll to top
*************/
let btnScroll = document.querySelector(".scroll")
//console.log(btnScroll);
window.addEventListener("scroll", function (e) {
  if (window.scrollY > 750) {
     btnScroll.style.display = "flex"
  } else {
    btnScroll.style.display = "none"
  }
});

btnScroll.addEventListener("click", function (e) {
 window.scrollTo({
   top: 0,
   behavior : "smooth"
 })
  
});
 /********************
  * sticky nav (using IntersectionObserver api)
  *********************/
 const nav = document.querySelector("nav");
 const height = nav.getBoundingClientRect().height;
 
 const mainSection = document.querySelector("#main-section");
 
 const stickyNav = function (entries, observe) {
   let [entry] = entries;
    console.log(entry);
   if (!entry.isIntersecting) {
     nav.classList.add("sticky-top");
     nav.style.opacity = "0.9";
   } else {
     nav.classList.remove("sticky-top");
   }
 };
 const mainSectionObserver = new IntersectionObserver(stickyNav, {
   root: null,
   threshold: 0,
   rootMargin: `-${height}px`,
 });
 
 mainSectionObserver.observe(mainSection);
  /********************
  * anamation
  *********************/
   const sec = document.querySelector(".sec");
 
   const secObserv = function (entries, observe) {
     let [entry] = entries;
     if (!entry.isIntersecting) return;
     entry.target.classList.remove("sec-two");
     observe.unobserve(entry.target);
   };
   
   let secAnamation = new IntersectionObserver(secObserv, {
     root: null,
     threshold: 0.15,
   });
   secAnamation.observe(sec);
   /**********
    * 
    */
   