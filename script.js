// ===============================
// CURRENT YEAR
// ===============================
const yearElement = document.getElementById("currentYear");
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// ===============================
// SECTION NAVIGATION (Show Only Selected)
// ===============================
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

function showSection(sectionId) {
    // 1. Show only target section
    sections.forEach(function (section) {
        if (section.id === sectionId) {
            section.style.display = "";
        } else {
            section.style.display = "none";
        }
    });

    // 2. Highlight active navbar link
    navLinks.forEach(function (link) {
        if (link.getAttribute("href") === "#" + sectionId) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

    // 3. Smooth scroll to top
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// ===============================
// HASH LINK CLICK HANDLER (Single Listener)
// Handles Navbar, Hero Buttons & Any Internal Hash Links
// ===============================
const allHashLinks = document.querySelectorAll('a[href^="#"]');

allHashLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
        const targetId = link.getAttribute("href").substring(1);

        // Agar sirf "#" hai aur aage ID nahi hai toh skip karein
        if (!targetId || !document.getElementById(targetId)) {
            return;
        }

        event.preventDefault();
        showSection(targetId);
        history.pushState(null, "", "#" + targetId);
    });
});

// ===============================
// BROWSER BACK / FORWARD BUTTON (History Navigation)
// ===============================
window.addEventListener("popstate", function () {
    const sectionId = window.location.hash.substring(1);

    if (sectionId && document.getElementById(sectionId)) {
        showSection(sectionId);
    } else {
        showSection("home");
    }
});

// ===============================
// INITIAL LOAD (Direct URL or Default Home)
// ===============================
const initialSection = window.location.hash.substring(1);

if (initialSection && document.getElementById(initialSection)) {
    showSection(initialSection);
} else {
    showSection("home");
}