const searchInput = document.querySelector(".search-input");
const categoryFilters = document.querySelectorAll(".filter-chip");
let debounceTimer;
let isLoading = false; // Loading state

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", (e) => {
      const menuItem = e.target.closest(".menu-item");
      const itemId = parseInt(menuItem.dataset.id);
      addToCart(itemId);
      // Visual feedback for adding to cart
      menuItem.classList.add("added");
      setTimeout(() => menuItem.classList.remove("added"), 2000);
    });
  });

  searchInput.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(searchItems, 300); // Debounce for 300ms
  });

  filterChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      filterChips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
    });
  });
});

// Search items
function searchItems() {
  const searchTerm = searchInput.value.toLowerCase().trim();

  document.querySelectorAll(".menu-item").forEach((item) => {
    const name = item.querySelector(".item-name").textContent.toLowerCase();
    const location = item.querySelector(".item-location").textContent.toLowerCase();
    
    if (name.includes(searchTerm) || location.includes(searchTerm)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

// Toggle dropdown menu
function toggleDropdown(event) {
  event.stopPropagation();
  const dropdown = document.getElementById("dropdownMenu");

  if (dropdown) {
    dropdown.classList.toggle("open");
  }
}

// Select an option and update the dropdown title
function selectOption(optionText, event) {
  event.preventDefault();
  const dropdownTitle = document.getElementById("dropdownTitle");
  const dropdown = document.getElementById("dropdownMenu");

  if (dropdownTitle) {
    dropdownTitle.innerText = optionText;
  }

  if (dropdown) {
    dropdown.classList.remove("open");
  }
}

// Close dropdown when clicking outside
window.addEventListener("click", function(event) {
  const dropdown = document.getElementById("dropdownMenu");
  const dropdownToggle = document.getElementById("dropdownToggle");

  if (dropdown && !dropdown.contains(event.target) && !dropdownToggle.contains(event.target)) {
    dropdown.classList.remove("open");
  }
});

// Attach event listeners to all dropdown items
document.querySelectorAll(".dropdown-content a").forEach(item => {
  item.addEventListener("click", function(event) {
    selectOption(this.innerText, event);
  });
});

// Toast
document.addEventListener("DOMContentLoaded", function() {
  const favoriteButtons = document.querySelectorAll(".add-to-favorites");

  favoriteButtons.forEach(button => {
    button.addEventListener("click", function() {
      this.classList.toggle("filled");
      let message = this.classList.contains("filled") 
        ? "Added to Favorite Tours" 
        : "Removed from Favorite Tours";
      showToast(message);
    });
  });

  function showToast(message) {
    let toastMessage = document.getElementById("toast-message");

    if (!toastMessage) {
      toastMessage = document.createElement("div");
      toastMessage.id = "toast-message";
      toastMessage.classList.add("toast");
      document.body.appendChild(toastMessage);
    }

    toastMessage.textContent = message;
    toastMessage.classList.add("show");

    setTimeout(() => {
      toastMessage.classList.remove("show");
    }, 2000);
  }
});
//sidebar funcionality
document.addEventListener("DOMContentLoaded", function () {
  const originalContent = document.querySelector(".main-content").innerHTML; // Store original content

  const pages = {
      dashboard: `
          <h2 class="section-title">Dashboard</h2>
          <p>Designing...</p>
      `,
      plan: `
          <h2 class="section-title">Plan Your Trip</h2>
          <p>Organize your travel plans.</p>
      `,
      go: `
          <h2 class="section-title">Let's Go</h2>
          <p>Start your adventure now!</p>
      `,
      list: `
          <h2 class="section-title">My Gala List</h2>
          <p>View your saved destinations.</p>
      `,
      profile: `
          <h2 class="section-title">Profile</h2>
          <p>Manage your account details.</p>
      `,
      history: `
          <h2 class="section-title">Tour History</h2>
          <p>Review your past trips.</p>
      `,
      favorites: `
          <h2 class="section-title">Favorite Tours</h2>
          <p>Your saved favorite destinations.</p>
          <div class="tour-list">
              <div class="tour-card">Tour 1: Amazing Beaches</div>
              <div class="tour-card">Tour 2: Mountain Adventures</div>
              <div class="tour-card">Tour 3: City Night Life</div>
          </div>
      `,
      settings: `
          <h2 class="section-title">Settings</h2>
          <p>Customize your dashboard preferences.</p>
      `,
      logout: `
          <h2 class="section-title">Logging Out...</h2>
          <p>Redirecting to login page.</p>
      `
  };

  const navItems = document.querySelectorAll(".nav-item");
  const contentDiv = document.querySelector(".main-content");

  navItems.forEach(item => {
      item.addEventListener("click", function () {
          // Remove 'active' class from all items
          navItems.forEach(nav => nav.classList.remove("active"));

          // Set active class on clicked item
          this.classList.add("active");

          // Get page from data attribute
          const page = this.getAttribute("data-page");

          // If clicking "Recommended", restore original content
          if (page === "explore") {
              contentDiv.innerHTML = originalContent;
              return;
          }

          // Update only the .main-content section
          contentDiv.innerHTML = pages[page] || "<h2 class='section-title'>Page Not Found</h2>";

          // Simulate logout behavior
          if (page === "logout") {
              setTimeout(() => {
                  contentDiv.innerHTML = `<h2 class="section-title">Logged Out</h2><p>You have been logged out.</p>`;
              }, 2000);
          }
      });
  });
});

