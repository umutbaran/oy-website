/**
 * OĞUZ YILDIRIM PORTFOLIO - LOGIC
 * Language switching, Form Handling & Scroll Reveals
 */

const langData = {
    tr: {
        "nav-home": "Genesis",
        "nav-portfolio": "Envanter",
        "nav-projects": "Sektörler",
        "nav-contact": "İletişim",
        "label-name": "Ad Soyad",
        "label-email": "E-posta Adresi",
        "label-message": "Mesaj Detayları",
        "btn-submit": "İletişimi Başlat",
        "feedback-msg": "Onay Alındı.",
        "home-title": "Form. Space. <span>Identity.</span>",
        "home-desc": "Hassas geometriler ve malzeme dürüstlüğü ile sessizliği mimariyle buluşturuyoruz. Kavramsal mükemmeliyetle yaşamın geleceğini şekillendiriyoruz.",
        "brand-name": "Oğuz Yıldırım",
        "footer-tagline": "Hassas geometrilerle sessizliği tasarlıyoruz.",
        "footer-nav-title": "Navigasyon",
        "footer-social-title": "Bağlantılar",
        "footer-copy-text": "Tüm hakları saklıdır. Hassasiyetle tasarlandı.",
        "back-to-top": "Başa Dön",
        "nav-cv": "CV",
        "cv-label": "Mesleki Geçmiş",
        "cv-title": "Özgeçmiş.",
        "btn-download": "Tam CV'yi İndir"
    },
    en: {
        "nav-home": "Genesis",
        "nav-portfolio": "Inventory",
        "nav-projects": "Sectors",
        "nav-contact": "CONTACT",
        "label-name": "Full Name",
        "label-email": "Electronic Mail",
        "label-message": "Inquiry Details",
        "btn-submit": "Initiate Contact",
        "feedback-msg": "Acknowledgment Received.",
        "home-title": "Form. Space. <span>Identity.</span>",
        "home-desc": "Architecting silence through precise geometries and material honesty. Shaping the future of living through conceptual excellence.",
        "brand-name": "Oguz Yildirim",
        "footer-tagline": "Architecting silence through precise geometries.",
        "footer-nav-title": "Navigation",
        "footer-social-title": "Connect",
        "footer-copy-text": "All rights reserved. Designed with precision.",
        "back-to-top": "Back to Top",
        "nav-cv": "CV",
        "cv-label": "Professional Trajectory",
        "cv-title": "Curriculum.",
        "btn-download": "Download Full CV"
    }
};

function setLang(lang) {
    document.body.setAttribute('data-lang', lang);
    document.documentElement.lang = lang; // Fix for Turkish character uppercase issues
    
    document.getElementById('btn-tr').classList.toggle('active', lang === 'tr');
    document.getElementById('btn-en').classList.toggle('active', lang === 'en');

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (langData[lang][key]) {
            el.innerHTML = langData[lang][key];
        }
    });

    localStorage.setItem('portfolio_lang', lang);
}

// Fluid Reveal Logic
function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    const windowHeight = window.innerHeight;
    
    reveals.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 100;
        
        if (elementTop < windowHeight - elementVisible) {
            el.classList.add("active");
            // Special trigger for hero section
            if (el.classList.contains('hero-page')) {
                el.classList.add('reveal-active');
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Initial Setup
    const savedLang = localStorage.getItem('portfolio_lang') || 'en';
    setLang(savedLang);
    
    // Initial Reveal
    setTimeout(reveal, 100);
    window.addEventListener("scroll", reveal);

    // Navbar Scrolled State
    window.addEventListener("scroll", () => {
        const nav = document.querySelector(".navbar");
        if (window.scrollY > 50) {
            nav.classList.add("scrolled");
        } else {
            nav.classList.remove("scrolled");
        }
    });

    // Form Handling
    const contactForm = document.getElementById('contact-form');
    const feedbackMsg = document.getElementById('feedback-msg');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            feedbackMsg.classList.remove('hidden');
            contactForm.reset();
            setTimeout(() => feedbackMsg.classList.add('hidden'), 5000);
        });
    }

    // Mobile Menu Toggle Logic
    const menuToggle = document.getElementById('menu-toggle');
    const desktopNav = document.querySelector('.desktop-nav');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            desktopNav.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            desktopNav.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Custom Cursor Logic
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');
    const heroImg1 = document.querySelector('.hero-img-1');
    const heroImg2 = document.querySelector('.hero-img-2');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;
        const width = window.innerWidth;
        const ratio = posX / width;

        // Instant dot position
        dot.style.left = `${posX}px`;
        dot.style.top = `${posY}px`;

        // Smooth trailing outline
        outline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });

        // Stereoscopic 3D Parallax Effect (Dual Axis)
        if (heroImg1 && heroImg2) {
            const height = window.innerHeight;
            const ratioY = posY / height;

            // Blending (X-axis dependent)
            heroImg2.style.opacity = ratio;
            heroImg1.style.opacity = 1 - ratio;

            // Multi-axis translation for deep 3D feel
            const rangeX = 50; // Horizontal range
            const rangeY = 30; // Vertical range
            
            const shiftX1 = -ratio * rangeX;
            const shiftX2 = (1 - ratio) * rangeX;
            
            const shiftY = (ratioY - 0.5) * rangeY; // Vertical shift same for both to tilt the world

            heroImg1.style.transform = `scale(1.15) translateX(${shiftX1}px) translateY(${-shiftY}px)`;
            heroImg2.style.transform = `scale(1.15) translateX(${shiftX2}px) translateY(${-shiftY}px)`;
        }
    });

    // Cursor Interactions
    const clickables = document.querySelectorAll('a, button, .gallery-item, .sector-item, .cv-preview');
    clickables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-active');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-active');
        });
    });
});
