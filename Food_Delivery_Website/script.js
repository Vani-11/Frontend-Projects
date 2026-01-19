document.addEventListener("DOMContentLoaded", () => {
  const darkModeBtn = document.querySelector('.fa-moon');
  const profileBtn = document.querySelector('.fa-user');
  const cartBtn = document.querySelector('.fa-shopping-cart');
  const profileDropdown = document.getElementById('profileDropdown');
  const cartPopup = document.getElementById('cartPopup');



  // Profile Dropdown
  if (profileBtn && profileDropdown) {
    profileBtn.addEventListener('click', () => {
      profileDropdown.classList.toggle('hidden');
      cartPopup?.classList.add('hidden');
    });
  }

  // Cart Popup
  if (cartBtn && cartPopup) {
    cartBtn.addEventListener('click', () => {
      cartPopup.classList.toggle('hidden');
      profileDropdown?.classList.add('hidden');
    });
  }

  // Close dropdowns when clicking outside
  window.addEventListener('click', (e) => {
    if (!e.target.closest('.fa-user') && !e.target.closest('#profileDropdown')) {
      profileDropdown?.classList.add('hidden');
    }
    if (!e.target.closest('.fa-shopping-cart') && !e.target.closest('#cartPopup')) {
      cartPopup?.classList.add('hidden');
    }
  });

  // Handle Add to Cart and Redirect
  const addButtons = document.querySelectorAll(".add-cart");

  addButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      const card = button.closest(".special-card");
      if (!card) return;

      const name = card.querySelector("h3")?.innerText || card.querySelector(".overlay p")?.innerText;
      const priceText = card.querySelector(".price")?.innerText.replace("₹", "") || "0";
      const price = parseFloat(priceText);
      const quantity = parseInt(card.querySelector(".count")?.innerText || "1");

      let orders = JSON.parse(localStorage.getItem("orders")) || [];
      const existing = orders.find((item) => item.name === name);

      if (existing) {
        existing.quantity += quantity;
      } else {
        orders.push({ name, price, quantity });
      }

      localStorage.setItem("orders", JSON.stringify(orders));

      console.log("Item added:", name, "→ Redirecting to orders.html");

      window.location.href = "orders.html";
    });
  });

  // add and sub quantity controls
  document.querySelectorAll(".plus").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const count = e.target.parentElement.querySelector(".count");
      count.innerText = parseInt(count.innerText) + 1;
    });
  });

  document.querySelectorAll(".minus").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const count = e.target.parentElement.querySelector(".count");
      const value = parseInt(count.innerText);
      if (value > 1) count.innerText = value - 1;
    });
  });
});


// Search functionality for dishes in "Our Special" and "Popular Dishes"
const searchInput = document.getElementById('search');

// Select all dish cards (works for both Our's Special & Popular)
const dishCards = document.querySelectorAll('.special-card, .popular-card');

searchInput.addEventListener('keyup', (event) => {
  const enteredValue = event.target.value.toLowerCase().trim();

  dishCards.forEach((card) => {
    const dishName =
      card.querySelector('h3')?.innerText.toLowerCase() ||
      card.querySelector('p')?.innerText.toLowerCase();

    if (dishName.includes(enteredValue)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
});


