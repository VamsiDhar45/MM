/**
 * Main Configuration and Logic - Market Mind India
 */

// Stats Configuration
const statsConfig = {
    clients: 200,
    projects: 500,
    growth: 95,
    team: 50
};

// Client Logos Configuration
const clientLogos = [
    '1.jpg', '2.webp', '3.jpg', '4.png', '5.png', '6.jpg', '7.jpg', '9.png',
    '10.png', '11.jpg', '12.png', '14.jpg', '15.jpg', '16.png', '17.png', '18.png', '19.png',
    '20.png', '21.png', '22.png', '23.png', '24.png', '25.jpg', '26.png', '27.png', '28.png', '29.png',
    '30.png', '31.png', '32.jpg', '33.png', '34.jpg', '35.jpg', '36.png', '37.png', '38.jpg', '39.png',
    '40.png', '41.png', '42.jpg', '43.jpg', '44.jpg', '45.png', '46.png', '47.jpg', '48.jpg'
];

const imagePath = "./assets/img/client/Renamed_Client_Logos/";

/* =========================================
   INITIALIZATION
   ========================================= */
document.addEventListener("DOMContentLoaded", () => {
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 900, once: true, offset: 80 });
    }

    renderClientLogos();
    initStatsCounter();
    setupNavigation();
    setupSmoothScroll();
    initTypewriter();
    setActiveNavLink();
    initScrollNavEffect();
});

/* =========================================
   ACTIVE NAV DETECTION
   ========================================= */
function setActiveNavLink() {
    const links = document.querySelectorAll('.nav-links a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href && (href === currentPage || href.includes(currentPage))) {
            link.classList.add('active');
            link.removeAttribute('style');
        } else if (link.classList.contains('active') && href && !href.includes(currentPage)) {
            // Only remove if not manually set in HTML for dropdown toggle
        }
    });
}

/* =========================================
   SCROLL NAV EFFECT
   ========================================= */
function initScrollNavEffect() {
    const nav = document.querySelector('nav');
    if (!nav) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(6,13,26,0.97)';
            nav.style.boxShadow = '0 4px 24px rgba(0,0,0,0.4)';
        } else {
            nav.style.background = '';
            nav.style.boxShadow = '';
        }
    }, { passive: true });
}

/* =========================================
   CLIENT LOGOS
   ========================================= */
function renderClientLogos() {
    const logoTrack = document.querySelector(".logo-track");
    if (!logoTrack) return;
    logoTrack.innerHTML = '';
    clientLogos.forEach((filename, index) => {
        const logoItem = document.createElement("div");
        logoItem.classList.add("logo-item");
        const img = new Image();
        img.src = `${imagePath}${filename}`;
        img.alt = `Client Logo ${index + 1}`;
        img.loading = "lazy";
        img.onerror = function () { this.parentElement.remove(); };
        logoItem.appendChild(img);
        logoTrack.appendChild(logoItem);
    });
    // Duplicate for seamless scroll
    const cloned = logoTrack.innerHTML;
    logoTrack.innerHTML += cloned;
}

/* =========================================
   STATS COUNTER
   ========================================= */
function animateCounter(element, target, duration, suffix = '') {
    if (!element) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start) + suffix;
        if (start >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        }
    }, 16);
}

function initStatsCounter() {
    const statsSection = document.querySelector('.stats');
    if (!statsSection) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(document.getElementById('clientCount'), statsConfig.clients, 2000, '+');
                animateCounter(document.getElementById('projectCount'), statsConfig.projects, 2000, '+');
                animateCounter(document.getElementById('growthRate'), statsConfig.growth, 2000, '%');
                animateCounter(document.getElementById('teamSize'), statsConfig.team, 2000, '+');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    observer.observe(statsSection);
}

/* =========================================
   NAVIGATION & UI
   ========================================= */
function setupNavigation() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const dropdown = toggle.closest('.dropdown');
            if (dropdown) dropdown.classList.toggle('active');
        });
    });

    document.addEventListener("click", (e) => {
        const navLinks = document.querySelector(".nav-links");
        const hamburger = document.querySelector(".hamburger");
        const dropdown = document.querySelector('.dropdown');
        if (navLinks && navLinks.classList.contains('active') &&
            !e.target.closest("nav") && !e.target.closest(".hamburger")) {
            navLinks.classList.remove("active");
            if (hamburger) hamburger.classList.remove("active");
        }
        if (dropdown && dropdown.classList.contains('active') && !e.target.closest('.dropdown')) {
            dropdown.classList.remove('active');
        }
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
        link.addEventListener("click", () => {
            const hamburger = document.querySelector(".hamburger");
            const navLinks = document.querySelector(".nav-links");
            if (hamburger) hamburger.classList.remove("active");
            if (navLinks) navLinks.classList.remove("active");
        });
    });
}

window.toggleMenu = function () {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    if (hamburger) hamburger.classList.toggle("active");
    if (navLinks) navLinks.classList.toggle("active");
};

/* =========================================
   SMOOTH SCROLL
   ========================================= */
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

/* =========================================
   TYPEWRITER EFFECT
   ========================================= */
function initTypewriter() {
    const textElement = document.getElementById('dynamic-text');
    if (!textElement) return;
    const phrases = [
        "Real Insights", "Smart Positioning", "Web Innovation",
        "Market Research", "Business Consulting", "Data Strategy",
        "Creative Solutions", "Social Media", "Digital Campaigns",
        "PR & Media", "Go-to-Market Strategy"
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        textElement.className = 'typewriter-text text-turquoise';
        if (isDeleting) {
            textElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            textElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }
        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 400;
        }
        setTimeout(type, typeSpeed);
    }
    type();
}