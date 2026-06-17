// Full Stack API Simulation
function simulateAPI() {
  const log = document.getElementById('apiLog');
  const result = document.getElementById('apiResult');
  const cards = document.getElementById('apiCards');
  log.innerHTML = '<span style="color:#7a4f2d;">// Front-end: sending fetch request...</span><br>fetch("/api/products")<br>  .then(res => res.json())<br>  .then(data => renderProducts(data));<br><br><span style="color:#8a9e7a;">// ✓ 200 OK — Server responded in 124ms</span><br><span style="color:#8a9e7a;">// Received 4 products from MongoDB</span>';
  const products = [
    {name:'Olive Sweater',price:'£115',cat:'Knitwear'},
    {name:'Navy Crewneck',price:'£98',cat:'Knitwear'},
    {name:'Cardigan',price:'£135',cat:'Knitwear'},
    {name:'Wide Leg Jeans',price:'£89',cat:'Denim'}
  ];
  cards.innerHTML = '';
  products.forEach(p => {
    const d = document.createElement('div');
    d.style.cssText = 'background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);padding:0.7rem;font-size:0.7rem;';
    d.innerHTML = '<div style="color:var(--brown-pale);font-size:0.6rem;letter-spacing:0.1em;margin-bottom:0.2rem;">' + p.cat + '</div><div style="color:white;">' + p.name + '</div><div style="color:var(--brown-accent);margin-top:0.2rem;">' + p.price + '</div>';
    cards.appendChild(d);
  });
  result.style.display = 'block';
}

// CSS Theme switcher
function setTheme(bg, fg) {
  const box = document.getElementById('cssThemeBox');
  if(box) { box.style.background = bg; box.style.color = fg; }
}

// JS Playground
function runJS() {
  const code = document.getElementById('jsPlayground').value;
  const out = document.getElementById('jsOutput');
  try {
    eval(code);
    if(!out.textContent || out.textContent === 'Output will appear here...') {
      out.textContent = '✓ Code executed successfully (no output)';
    }
  } catch(e) {
    out.textContent = '✗ Error: ' + e.message;
    out.style.color = '#c4622d';
  }
}

// CURSOR
const cur = document.getElementById("cur");
const ring = document.getElementById("ring");
document.addEventListener("mousemove", e => {
  cur.style.left = e.clientX + "px";
  cur.style.top = e.clientY + "px";
  ring.style.left = e.clientX + "px";
  ring.style.top = e.clientY + "px";
});
document.querySelectorAll("a,button,.p-card").forEach(el => {
  el.addEventListener("mouseenter", () => {
    ring.style.width = "52px"; ring.style.height = "52px";
    ring.style.borderColor = "var(--brown-accent)";
    cur.style.opacity = "0";
  });
  el.addEventListener("mouseleave", () => {
    ring.style.width = "36px"; ring.style.height = "36px";
    ring.style.borderColor = "var(--brown-mid)";
    cur.style.opacity = "1";
  });
});

// CART
let cartItems = [], cartCount = 0;
function openCart() {
  document.getElementById("overlay").classList.add("open");
  document.getElementById("cartDrawer").classList.add("open");
}
function closeCart() {
  document.getElementById("overlay").classList.remove("open");
  document.getElementById("cartDrawer").classList.remove("open");
}
function addToCart(name, price) {
  cartCount++;
  cartItems.push({name, price});
  document.getElementById("cartCount").textContent = cartCount;
  document.querySelector(".cart-hd-title").textContent = "Your Bag (" + cartCount + ")";
  
  // show items
  const list = document.getElementById("cartItems");
  list.style.display = "block";
  const priceNum = parseInt(price.replace("£",""));
  const total = cartItems.reduce((s,i)=>s+parseInt(i.price.replace("£","")),0);
  document.getElementById("cartTotal").textContent = "£" + total;
  document.getElementById("cartFooter").style.display = "block";
  
  // clear empty state
  document.querySelector(".cart-empty-msg") && (document.querySelector(".cart-empty-msg").style.display = "none");
  document.querySelector(".cart-body div:first-child") && (document.querySelector(".cart-body div:first-child").style.display = "none");
  
  const item = document.createElement("div");
  item.className = "cart-item";
  item.innerHTML = "<div class=\"cart-item-info\"><div class=\"cart-item-name\">" + name + "</div><div class=\"cart-item-price\">" + price + "</div></div><button class=\"cart-item-remove\" onclick=\"this.parentNode.remove()\">✕</button>";
  list.appendChild(item);
  
  showNotif("Added to cart ✓");
  openCart();
}
function wishlist(btn) {
  btn.textContent = btn.textContent === "♡" ? "♥" : "♡";
  btn.style.color = btn.textContent === "♥" ? "var(--rust)" : "";
  if(btn.textContent === "♥") showNotif("Added to wishlist ♥");
}
function subscribe() {
  showNotif("Thanks! You're subscribed ✓");
}
function showNotif(msg) {
  const n = document.getElementById("notif");
  n.textContent = msg;
  n.classList.add("show");
  setTimeout(() => n.classList.remove("show"), 3000);
}

// SCROLL ANIMATIONS
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add("vis"); });
}, {threshold: 0.08});
document.querySelectorAll(".fade-in").forEach(el => obs.observe(el));

// MOBILE NAV TOGGLE
function toggleNav() {
  document.getElementById('navLinks').classList.toggle('open');
}
function closeNav() {
  document.getElementById('navLinks').classList.remove('open');
}

// NAV SCROLL
window.addEventListener("scroll", () => {
  const isMobile = window.innerWidth <= 768;
  const padV = window.scrollY > 50 ? "1rem" : "1.6rem";
  const padH = isMobile ? "1.4rem" : "5rem";
  document.querySelector("nav").style.padding = padV + " " + padH;
});
