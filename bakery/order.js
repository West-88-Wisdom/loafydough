// order.js — Order page logic

const items = [
  { id:1,  name:"Butter Croissant",      price:3.50, emoji:"🥐", cat:"Pastry" },
  { id:2,  name:"Cinnamon Roll",          price:4.00, emoji:"🌀", cat:"Pastry" },
  { id:3,  name:"Pain au Chocolat",       price:4.00, emoji:"🍫", cat:"Pastry" },
  { id:4,  name:"Strawberry Cake Slice",  price:5.00, emoji:"🍓", cat:"Cake"   },
  { id:5,  name:"Pink Velvet Cupcake",    price:4.50, emoji:"🧁", cat:"Cake"   },
  { id:6,  name:"Lemon Drizzle Slice",    price:4.50, emoji:"🍋", cat:"Cake"   },
  { id:7,  name:"Classic Cheesecake",     price:5.50, emoji:"🍰", cat:"Cake"   },
  { id:8,  name:"Sourdough Loaf",         price:8.00, emoji:"🍞", cat:"Bread"  },
  { id:9,  name:"Rosemary Focaccia",      price:6.50, emoji:"🌿", cat:"Bread"  },
  { id:10, name:"Oat & Honey Roll",       price:2.80, emoji:"🍯", cat:"Bread"  },
  { id:11, name:"Rose Latte",             price:4.50, emoji:"🌹", cat:"Drink"  },
  { id:12, name:"Vanilla Hot Chocolate",  price:4.00, emoji:"☕", cat:"Drink"  },
];

let cart = [];

function toggleItem(id) {
  const item = items.find(i => i.id === id);
  const idx  = cart.findIndex(c => c.id === id);
  if (idx > -1) cart.splice(idx, 1);
  else cart.push({ ...item, qty: 1 });
  renderPicker();
  renderCart();
}

function changeQty(id, delta) {
  const c = cart.find(i => i.id === id);
  if (!c) return;
  c.qty += delta;
  if (c.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
    renderPicker();
  }
  renderCart();
}

function renderPicker() {
  document.getElementById('pickGrid').innerHTML = items.map(item => {
    const inCart = cart.find(c => c.id === item.id);
    return `
      <div class="pick-card ${inCart ? 'selected' : ''}" onclick="toggleItem(${item.id})">
        <div class="pick-emoji">${item.emoji}</div>
        <div class="pick-info">
          <h4>${item.name}</h4>
          <span>${item.cat}</span>
        </div>
        <span class="pick-price">$${item.price.toFixed(2)}</span>
      </div>
    `;
  }).join('');
}

function renderCart() {
  const el    = document.getElementById('cartItems');
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  document.getElementById('totalPrice').textContent = '$' + total.toFixed(2);

  if (!cart.length) {
    el.innerHTML = '<div class="cart-empty">No items yet — pick something delicious!</div>';
    return;
  }

  el.innerHTML = cart.map(item => `
    <div class="cart-row">
      <span class="cart-row-name">${item.emoji} ${item.name}</span>
      <div class="qty-ctrl">
        <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
        <span class="qty-num">${item.qty}</span>
        <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
      </div>
      <span class="cart-row-price">$${(item.price * item.qty).toFixed(2)}</span>
    </div>
  `).join('');
}

function setOpt(opt) {
  document.getElementById('opt-pickup').classList.toggle('active', opt === 'pickup');
  document.getElementById('opt-delivery').classList.toggle('active', opt === 'delivery');
  document.getElementById('addressField').style.display = opt === 'delivery' ? 'block' : 'none';
}

function submitOrder() {
  if (!cart.length) { toast('Please select at least one item 🥐'); return; }
  const fname = document.getElementById('fname').value.trim();
  const email = document.getElementById('email').value.trim();
  if (!fname || !email) { toast('Please fill in your name and email 📝'); return; }
  toast(`✅ Order placed, ${fname}! We'll confirm at ${email} shortly.`);
  cart = [];
  renderPicker();
  renderCart();
}

// Init
renderPicker();
renderCart();
