// contact.js — Contact page logic

function toggleFaq(el) {
  el.parentElement.classList.toggle('open');
}

function sendMsg() {
  const fname = document.getElementById('fname').value.trim();
  const email = document.getElementById('email').value.trim();
  const msg   = document.getElementById('msg').value.trim();

  if (!fname || !email || !msg) {
    toast('Please fill in all required fields 📝');
    return;
  }

  toast(`✅ Thanks ${fname}! We'll get back to you at ${email} soon.`);

  document.getElementById('fname').value = '';
  document.getElementById('lname').value = '';
  document.getElementById('email').value = '';
  document.getElementById('msg').value   = '';
}
