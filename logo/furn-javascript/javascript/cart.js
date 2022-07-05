/*************
 * scroll to top
 *************/
//  let btnScroll = document.querySelector(".scroll");
//  window.addEventListener("scroll", function (e) {
//    if (window.scrollY > 750) {
//      btnScroll.style.display = "flex";
//    } else {
//      btnScroll.style.display = "none";
//    }
//  });
 
//  btnScroll.addEventListener("click", function (e) {
//    window.scrollTo({
//      top: 0,
//      behavior: "smooth",
//    });
//  });
 /********************
  * New Arrivals
  *********************/
 let dataRequst = new XMLHttpRequest();
 dataRequst.addEventListener("readystatechange", function () {
   if (dataRequst.readyState === 4 && dataRequst.status === 200) {
     let data = JSON.parse(dataRequst.responseText);
     for (const key in data) {
       for (let i = 0; i < data[key].length; i++) {
       //  console.log(data[key][i]);
         // create div conatins cards
         let div = document.createElement("div");
         div.classList.add("card", "col-md-6", "col-lg-3", "shadow");
         // create image to add to card
         let image = document.createElement("img");
         image.classList.add("card-img-top", "img-fluid");
         image.src = data[key][i].path;
         // create heading for the card
         let h2 = document.createElement("h6");
         h2.classList.add("card-title");
         h2.innerHTML = data[key][i].name;
         // create sub-heading description
         let p = document.createElement("p");
         p.classList.add("card-text");
         p.innerHTML = data[key][i].data;
          // create sub-heading
         let h3 = document.createElement("h3");
               h3.classList.add("card-text")
               h3.innerHTML = data[key][i].price + "  $"
               h3.style.color = "green"
               
         // create button 
         let b = document.createElement('button');
         b.type="button"
         b.classList.add('btn', "btn-light", "m-2", "add-to-cart")
         b.innerHTML = "Add to Carts <i class='fa-solid fa-cart-plus'></i>"
         // add elements to div
         div.appendChild(image);
         div.appendChild(h2);
         div.appendChild(p);
         div.appendChild(h3);
         div.appendChild(b);
 
          //console.log(div);
          document.getElementById('sales1').appendChild(div);
       }
     }
   }
 });
 dataRequst.open("GET", "/db/database.json");
 dataRequst.send();
 /********************
  * sticky nav (using IntersectionObserver api)
  *********************/
//  const nav = document.querySelector("nav");
//  const height = nav.getBoundingClientRect().height;
 
//  const mainSection = document.querySelector("#main-section");
 
//  const stickyNav = function (entries, observe) {
//    let [entry] = entries;
 
//    if (!entry.isIntersecting) {
//      nav.classList.add("sticky-top");
//      nav.style.opacity = "0.9";
//    } else {
//      nav.classList.remove("sticky-top");
//    }
//  };
//  const mainSectionObserver = new IntersectionObserver(stickyNav, {
//    root: null,
//    threshold: 0,
//    rootMargin: `-${height}px`,
//  });
 
 //mainSectionObserver.observe(mainSection);
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
  /********************
  * ADD TO CART
  *********************/
