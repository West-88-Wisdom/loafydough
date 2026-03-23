// menu.js — Menu page logic

const items = [
  { id:1,  name:"Butter Croissant",      desc:"Golden, flaky layers baked fresh every morning with premium French butter.",                price:"$3.50", emoji:"🥐", cat:"pastry" },
  { id:2,  name:"Cinnamon Roll",          desc:"Pillowy soft roll with a brown sugar and cinnamon swirl, finished with cream cheese glaze.", price:"$4.00", emoji:"🌀", cat:"pastry" },
  { id:3,  name:"Pain au Chocolat",       desc:"Crispy, laminated pastry filled with two fingers of rich dark chocolate.",                  price:"$4.00", emoji:"🍫", cat:"pastry" },
  { id:4,  name:"Strawberry Cake Slice",  desc:"Light vanilla sponge layered with fresh strawberry cream and berry compote.",               price:"$5.00", emoji:"🍓", cat:"cake"   },
  { id:5,  name:"Pink Velvet Cupcake",    desc:"Soft rose-tinted velvet cake with a towering vanilla buttercream rosette on top.",          price:"$4.50", emoji:"🧁", cat:"cake"   },
  { id:6,  name:"Lemon Drizzle Slice",    desc:"Zesty lemon loaf soaked in a sharp citrus glaze and dusted with sugar.",                    price:"$4.50", emoji:"🍋", cat:"cake"   },
  { id:7,  name:"Classic Cheesecake",     desc:"Creamy New York-style cheesecake on a buttery biscuit base with berry coulis.",             price:"$5.50", emoji:"🍰", cat:"cake"   },
  { id:8,  name:"Sourdough Loaf",         desc:"Hand-shaped, slow-fermented sourdough with a blistered crust and open crumb.",              price:"$8.00", emoji:"🍞", cat:"bread"  },
  { id:9,  name:"Rosemary Focaccia",      desc:"Dimpled Italian flatbread with sea salt, olive oil, and fresh rosemary sprigs.",            price:"$6.50", emoji:"🌿", cat:"bread"  },
  { id:10, name:"Oat & Honey Roll",       desc:"Soft, wholesome roll sweetened with local raw honey and rolled in oats.",                   price:"$2.80", emoji:"🍯", cat:"bread"  },
  { id:11, name:"Rose Latte",             desc:"Silky oat milk latte with house-made rose syrup and edible rose petals.",                   price:"$4.50", emoji:"🌹", cat:"drink"  },
  { id:12, name:"Vanilla Hot Chocolate",  desc:"Rich Belgian chocolate melted into steamed whole milk with a real vanilla pod.",            price:"$4.00", emoji:"☕", cat:"drink"  },
];

let cart = JSON.parse(localStorage.getItem('belleCart') || '[]');

function saveCart() {
  localStorage.setItem('belleCart', JSON.stringify(cart));
}

function addToCart(id) {
  const item = items.find(i => i.id === id);
  const existing = cart.find(c => c.id === id);
  if (existing) existing.qty++;
  else cart.push({ ...item, qty: 1 });
  saveCart();
  toast(`${item.emoji} ${item.name} added to order!`);
}

function filter(cat, btn) {
  document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  render(cat);
}

function render(cat = 'all') {
  const grid = document.getElementById('menuGrid');
  const list = cat === 'all' ? items : items.filter(i => i.cat === cat);

  if (!list.length) {
    grid.innerHTML = `<div class="empty"><span>🔍</span>No items found.</div>`;
    return;
  }

  grid.innerHTML = list.map(item => `
    <div class="menu-card">
      <div class="menu-card-img ${item.cat}">
        ${item.emoji}
        <span class="cat-badge">${item.cat.charAt(0).toUpperCase() + item.cat.slice(1)}</span>
      </div>
      <div class="menu-card-body">
        <h3>${item.name}</h3>
        <p>${item.desc}</p>
        <div class="menu-card-footer">
          <span class="price">${item.price}</span>
          <button class="add-btn" onclick="addToCart(${item.id})">+ Add to Order</button>
        </div>
      </div>
    </div>
  `).join('');
}

// Init
render();
