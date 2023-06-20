"use strict";
const cartList = document.getElementById("cartlist");
const cartbtn = document.getElementById("icon-btn");
const preview = document.getElementById("pre");
const lbpreview = document.getElementById("lbpre");
const thumbnails = document.getElementsByClassName("thumbnails");
const lbthumbnails = document.getElementsByClassName("lb-thumbnails");
const closeLbBtn = document.getElementById("clb");
const lb = document.getElementById("lb");
const lbOpenBtn = document.getElementById("lb-open-btn");
// counter
const counterRender = document.getElementById("num-disp");
const minusBtn = document.getElementById("minus");
const plusBtn = document.getElementById("plus");
// lightbox buttons
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
// mobile next and prev buttons
const mobBtn = document.getElementById("mob-cntrl");
// cart
const cartNumRender = document.getElementById("cart-num");
const cartTotalRender = document.getElementById("cart-total");
const addToCartBtn = document.getElementById("add-cart");

let activeLbThumbnail = 0;
// mobile slide
let activeImg = 0;
//
let cartBadge = document.getElementById("badge");
let isCartEmpty = true;
let cartToggle = false;
let isCartOpen = false;
let cartFull = document.getElementById("cart-full");
let cartEmpty = document.getElementById("cart-empty");

const handleClickOutside = (e) => {
  if (e.target !== cartbtn && !cartList.contains(e.target)) {
    cartList.style.display = "none";
    window.removeEventListener("click", handleClickOutside);
    isCartOpen = false;
  }
};

const showCart = () => {
  cartToggle = true;
  cartList.style.display = "block";
  window.addEventListener("click", handleClickOutside);
};

const hideCart = () => {
  cartToggle = false;
  cartList.style.display = "none";
};

const toggleCart = () => {
  if (isCartOpen) {
    hideCart();
  } else {
    showCart();
  }
  isCartOpen = !isCartOpen;
};

cartbtn.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleCart();
});

addToCartBtn.addEventListener("click", (e) => {
  if (count == 0) {
    return;
  }
  isCartEmpty = false;
  showBadge();
  updateCart();
  e.stopPropagation();
  showCart();
});

const removeItem = () => {
  isCartEmpty = true;
  //
  count = 0;
  counterRender.innerHTML = count.toString();
  showBadge();
  updateCart();
  hideCart();
};

const showBadge = () => {
  if (isCartEmpty == false) {
    cartBadge.style.display = "block";
    cartBadge.innerHTML = count.toString();
  } else {
    cartBadge.style.display = "none";
  }
};

const updateCart = () => {
  if (isCartEmpty == false) {
    cartFull.style.display = "block";
    cartEmpty.style.display = "none";
  } else {
    cartFull.style.display = "none";
    cartEmpty.style.display = "flex";
  }
};

showBadge();

const renderThumbnail = (index) => {
  for (let i = 0; i < 4; i++) {
    let pr = preview.children[i];
    pr.style.display = "none";
  }
  preview.children[index].style.display = "block";
};

for (let i = 0; i < thumbnails[0].children.length; i++) {
  let tn = thumbnails[0].children;
  tn[0].classList.add("active-tn");
  tn[i].addEventListener("click", function () {
    for (let j = 0; j < tn.length; j++) {
      tn[j].classList.remove("active-tn");
    }
    tn[i].classList.add("active-tn");
    renderThumbnail(i);
  });
}

// COUNTER
let count = 0;
plusBtn.addEventListener("click", () => {
  count++;
  counterRender.innerHTML = count.toString();
  cartNumRender.innerHTML = count.toString();
  cartTotalRender.innerHTML = `$${(125 * count).toFixed(2)}`;
});

minusBtn.addEventListener("click", () => {
  if (count === 0) return;
  count--;
  counterRender.innerHTML = count.toString();
  cartNumRender.innerHTML = count.toString();
  cartTotalRender.innerHTML = `$${(125 * count).toFixed(2)}`;
});

// LIGHTBOX
const nextThumb = () => {
  let tn = lbthumbnails[0].children;
  if (activeLbThumbnail === 3) {
    activeLbThumbnail = 0;
    tn[3].classList.remove("active-tn");
    tn[activeLbThumbnail].classList.add("active-tn");
    renderLbThumbnail(activeLbThumbnail);
  } else {
    tn[activeLbThumbnail].classList.remove("active-tn");
    tn[activeLbThumbnail + 1].classList.add("active-tn");
    renderLbThumbnail(activeLbThumbnail + 1);
    activeLbThumbnail++;
  }
};

const prevThumb = () => {
  let tn = lbthumbnails[0].children;
  if (activeLbThumbnail === 0) {
    activeLbThumbnail = tn.length - 1;
    tn[0].classList.remove("active-tn");
    tn[activeLbThumbnail].classList.add("active-tn");
    renderLbThumbnail(activeLbThumbnail);
  } else {
    activeLbThumbnail--;
  }
  tn[activeLbThumbnail + 1].classList.remove("active-tn");
  tn[activeLbThumbnail].classList.add("active-tn");
  renderLbThumbnail(activeLbThumbnail);
};

nextBtn.addEventListener("click", () => nextThumb());
prevBtn.addEventListener("click", () => prevThumb());

//
const nextImg = () => {
  if (activeImg === 3) {
    activeImg = 0; // Reset to the first image when reaching the end
    renderThumbnail(activeImg + 1);
    activeImg++;
  }
  renderThumbnail(activeImg + 1);
  activeImg++;
};

const prevImg = () => {
  if (activeImg === 0) {
    activeImg = 3; // Reset to the first image when reaching the end
    renderThumbnail(activeImg - 1);
    activeImg--;
  }
  renderThumbnail(activeImg - 1);
  activeImg--;
};

// handles the mobile left and right navigation controls
let nextbtn = mobBtn.children[0];
let prevbtn = mobBtn.children[1];

nextbtn.addEventListener("click", () => nextImg());
prevbtn.addEventListener("click", () => prevImg());

closeLbBtn.addEventListener("click", function () {
  lb.style.display = "none";
});

lbOpenBtn.addEventListener("click", function () {
  lb.style.display = "";
});

/** render lightbox preview*/
const renderLbThumbnail = (index) => {
  for (let i = 0; i < 4; i++) {
    let pr = lbpreview.children[i];
    pr.style.display = "none";
    lbpreview.children[index].style.display = "";
  }
};

/** handle lightbox thumbnails */
for (let i = 0; i < thumbnails[0].children.length; i++) {
  let lbtn = lbthumbnails[0].children;
  lbtn[0].classList.add("active-tn");
  lbtn[i].addEventListener("click", function () {
    for (let j = 0; j < lbtn.length; j++) {
      lbtn[j].classList.remove("active-tn");
    }
    lbtn[i].classList.add("active-tn");
    activeLbThumbnail = i;
    renderLbThumbnail(i);
  });
}

function openNav() {
  document.getElementById("nav-all").style.width = "250px";
  document.getElementById("ho").style.display = "block";
}

function closeNav() {
  document.getElementById("nav-all").style.width = "0";
  document.getElementById("ho").style.display = "none";
}

document.getElementById("ho").addEventListener("click", () => closeNav());

/**
 * This appends the cart list to the preview  div
 * on mobile to aid in absolute center positioning
 */

function appendCartList(x) {
  let pbox = document.getElementById("pbox");
  let headCart = document.getElementById("cartbadge");

  if (x.matches) {
    // If media query matches
    pbox.appendChild(cartList);
  } else {
    headCart.appendChild(cartList);
  }
}

let x = window.matchMedia("(max-width: 600px)");
appendCartList(x);
x.addEventListener("resize", appendCartList);
