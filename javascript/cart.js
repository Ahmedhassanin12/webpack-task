/********************
 * ADD TO CART
 *********************/
let prod = [
  {
    name: "Wooden Chair",
    price: 65,
    path: "/images/collection/arrivals1.png",
    data: "Nemo enim ipsam voluptatem quia volu ptas sit asperna aut odit aut",
    inCart: 0,
  },
  {
    name: "Single Armchair",
    price: 80,
    path: "/images/collection/arrivals2.png",
    data: "Nemo enim ipsam voluptatem quia volu ptas sit asperna aut odit aut",
    inCart: 0,
  },
  {
    name: "Wooden Armchair",
    price: 40,
    path: "/images/collection/arrivals3.png",
    data: "Nemo enim ipsam voluptatem quia volu ptas sit asperna aut odit aut",
    inCart: 0,
  },
  {
    name: "Stylish Chair",
    price: 100,
    path: "/images/collection/arrivals4.png",
    data: "Nemo enim ipsam voluptatem quia volu ptas sit asperna aut odit aut",
    inCart: 0,
  },
  {
    name: "Modern Chair",
    price: 120,
    path: "/images/collection/arrivals5.png",
    data: "Nemo enim ipsam voluptatem quia volu ptas sit asperna aut odit aut",
    inCart: 0,
  },
  {
    name: "Mapple Wood Dinning Table",
    price: 140,
    path: "/images/collection/arrivals6.png",
    data: "Nemo enim ipsam voluptatem quia volu ptas sit asperna aut odit aut",
    inCart: 0,
  },
  {
    name: "Arm Chair",
    price: 90,
    path: "/images/collection/arrivals7.png",
    data: "Nemo enim ipsam voluptatem quia volu ptas sit asperna aut odit aut",
    inCart: 0,
  },
  {
    name: "Wooden bed",
    price: 140,
    path: "/images/collection/arrivals8.png",
    data: "Nemo enim ipsam voluptatem quia volu ptas sit asperna aut odit aut",
    inCart: 0,
  },
];

let addToCart = document.querySelectorAll(".clickBtn");
let numCount = document.querySelector(".count");
//console.log(addToCart);

addToCart.forEach((btn, index) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    // the number of items in cart
    cartNumber(prod[index]);
    totalPrice(prod[index]);
  });
});
// get the number of items from localStorage and add to span
function onloadcartnumber() {
  let productNumbers = localStorage.getItem("cartNumbers");
  if (productNumbers) {
    numCount.textContent = productNumbers;
  }
}
// add number of items to localstorage
export function cartNumber(prod) {
  console.log(prod);
  let productNumbers = localStorage.getItem("cartNumbers");
  productNumbers = parseInt(productNumbers);
  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    numCount.textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    numCount.textContent = 1;
  }

  setItems(prod);
}

export function setItems(prod) {
  let cartItem = localStorage.getItem("prodincart");
  // console.log(cartItem);
  cartItem = JSON.parse(cartItem);
  if (cartItem != null) {
    if (cartItem[prod.name] == undefined) {
      cartItem = {
        ...cartItem,
        [prod.name]: prod,
      };
      console.log(cartItem);
    }
    cartItem[prod.name].inCart += 1;
  } else {
    prod.inCart = 1;
    cartItem = {
      [prod.name]: prod,
    };
  }

  localStorage.setItem("prodincart", JSON.stringify(cartItem));
}

export function totalPrice(prod) {
  let cartPrice = localStorage.getItem("totalPrice");

  if (cartPrice != null) {
    cartPrice = parseInt(cartPrice);
    localStorage.setItem("totalPrice", cartPrice + prod.price);
  } else {
    localStorage.setItem("totalPrice", prod.price);
  }
}
/**********************
 * remove item from cart
 ******************** */
export function removeCartItem(event) {
  var buttonClicked = event.target;
  // console.log(buttonClicked.parentElement.parentElement.lastElementChild.innerHTML);
  let total = document.querySelector(".cart-total-price");
  let miunsPrice = parseFloat(
    buttonClicked.parentElement.parentElement.lastElementChild.innerHTML
  );
  let cartPrice = localStorage.getItem("totalPrice");
  cartPrice = parseFloat(cartPrice);
  cartPrice -= miunsPrice;
  localStorage.setItem("totalPrice", cartPrice);

  let cartItem = localStorage.getItem("prodincart");
  cartItem = JSON.parse(cartItem);

  delete cartItem[
    buttonClicked.parentElement.parentElement.firstElementChild.lastElementChild
      .innerHTML
  ];
  cartItem = JSON.stringify(cartItem);
  cartItem = localStorage.setItem("prodincart", cartItem);

  buttonClicked.parentElement.parentElement.remove();

  total.innerHTML = `${cartPrice},00`;
}

/**********************
 *
 ******************** */
export function addItemToCart() {
  let cartItem = localStorage.getItem("prodincart");
  cartItem = JSON.parse(cartItem);

  //console.log(cartItem);
  let prodContainer = document.querySelector(".cart-items");
  let total = document.querySelector(".cart-total-price");
  let cartPrice = localStorage.getItem("totalPrice");
  cartPrice = parseFloat(cartPrice);
  if (cartItem) {
    prodContainer.innerHTML = "";

    for (const item of Object.values(cartItem)) {
      let divEl = document.createElement("div");

      divEl.classList.add("flex-cart", "py-4");

      divEl.innerHTML += `
      <div class="cart-item cart-column">
          <img class="cart-item-image" src="${
            item.path
          }" width="100" height="100">
          <span class="cart-item-title">${item.name}</span>
      </div>
      <span class="cart-price cart-column">$${item.price},00</span>
      <div class="cart-quantity cart-column">
          <input class="cart-quantity-input" type="number" value="${
            item.inCart
          }">
          <button class="btn btn-danger" type="button">REMOVE</button>
      </div>
      <div class="price"> ${item.inCart * item.price},00 $</div>
      `;
      prodContainer.appendChild(divEl);
      // total.innerHTML = `{cartPrice},00`
    }
    let removebtn = prodContainer.querySelectorAll(".btn-danger");
    removebtn.forEach((btn) => {
      btn.addEventListener("click", removeCartItem);
    });
    // console.log(prodContainer.querySelectorAll('.btn-danger'));
    //  prodContainer.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    // let removebtn = prodContainer.getElementsByClassName('btn-danger');
    // for (let i = 0; i < removebtn.length; i++) {
    //   removebtn[i].addEventListener("click", removeCartItem)
    // }
    // prodContainer.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
  }
  total.innerHTML = `${cartPrice || 00},00`;
}
addItemToCart();
onloadcartnumber();

export let clearAll = document.querySelector(".clear-all");
clearAll.addEventListener("click", function () {
  localStorage.clear();
  let prodContainer = document.querySelector(".cart-items");
  let total = document.querySelector(".cart-total-price");
  prodContainer.innerHTML = "";
  total.innerHTML = "";
  alert("Thank you for choosing us, we are glad to have you");
});


export * from './cart.js'