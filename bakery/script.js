// Shared across all pages

function toggleNav() {
  document.getElementById('navLinks').classList.toggle('open');
}

function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}
