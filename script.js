const pages = document.querySelectorAll(".page");
const links = document.querySelectorAll("[data-target]");

function showPage(targetId) {
  pages.forEach((page) => {
    page.hidden = page.id !== targetId;
  });
}

function showFromHash() {
  const hash = window.location.hash.replace("#", "");
  const map = {
    "home": "page-home",
    "poem-1": "page-poem-1",
    "poem-2": "page-poem-2",
    "why-this-project": "page-why",
    "works-cited": "page-works-cited",
  };
  showPage(map[hash] || "page-home");
}

links.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    window.location.hash = link.getAttribute("href");
    showFromHash();
  });
});

window.addEventListener("hashchange", showFromHash);
showFromHash();

// Cursor-follow gradient on buttons
const gradientTargets = document.querySelectorAll(".poem-button, .nav-link");

gradientTargets.forEach((el) => {
  el.addEventListener("mousemove", (event) => {
    const rect = el.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    el.style.background = `radial-gradient(circle at ${x}% ${y}%, #f4eedd 0%, #e8dcc3 65%)`;
  });

  el.addEventListener("mouseleave", () => {
    el.style.background = "";
  });
});

// Collapsible / swipeable side navigation
const sidebarWrapper = document.getElementById("sidebarWrapper");
const sidebarTab = document.getElementById("sidebarTab");
let sidebarOpen = true;

function setSidebarOpen(isOpen) {
  sidebarOpen = isOpen;
  sidebarWrapper.classList.toggle("collapsed", !isOpen);
  sidebarTab.classList.toggle("collapsed", !isOpen);
  sidebarTab.innerHTML = isOpen ? "&lsaquo;" : "&rsaquo;";
  sidebarTab.setAttribute("aria-expanded", String(isOpen));
}

sidebarTab.addEventListener("click", () => {
  setSidebarOpen(!sidebarOpen);
});

let touchStartX = null;

sidebarWrapper.addEventListener(
  "touchstart",
  (event) => {
    touchStartX = event.touches[0].clientX;
  },
  { passive: true }
);

sidebarWrapper.addEventListener(
  "touchend",
  (event) => {
    if (touchStartX === null) return;
    const deltaX = event.changedTouches[0].clientX - touchStartX;
    if (deltaX < -40) {
      setSidebarOpen(false);
    } else if (deltaX > 40) {
      setSidebarOpen(true);
    }
    touchStartX = null;
  },
  { passive: true }
);
