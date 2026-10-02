
// ========================================
// SUFYAN KAMRAN PORTFOLIO
// ========================================

// ── CUSTOM CURSOR ─────────────────────────
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

// Smooth ring follow
(function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
})();

// Hover effects for interactive elements
document.querySelectorAll('a, button, .project-card, .skill-chip, .tl-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovered'));
});

// Hide on touch devices
if ('ontouchstart' in window) {
    cursor.style.display = 'none';
    cursorRing.style.display = 'none';
    document.body.style.cursor = '';
}


// ── SCROLL PROGRESS ───────────────────────
const progressBar = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / total) * 100;
    progressBar.style.width = progress + '%';
});


// ── NAVBAR SCROLL EFFECT ──────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});


// ── THEME TOGGLE ─────────────────────────
const html = document.documentElement;
const themeBtn = document.getElementById('themeBtn');
const themeIcon = document.getElementById('themeIcon');
let isDark = true;

themeBtn.addEventListener('click', () => {
    isDark = !isDark;
    html.setAttribute('data-theme', isDark ? 'dark' : 'light');
    themeIcon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';

    // Ripple flash
    const flash = document.createElement('div');
    flash.style.cssText = `
    position:fixed;inset:0;z-index:9999;
    background:${isDark ? '#000' : '#fff'};
    opacity:.15;pointer-events:none;
    animation:flashFade .4s ease forwards;
  `;
    document.body.appendChild(flash);
    const style = document.createElement('style');
    style.textContent = `@keyframes flashFade{to{opacity:0}}`;
    document.head.appendChild(style);
    setTimeout(() => { flash.remove(); style.remove(); }, 400);
});


// ── HAMBURGER MENU ────────────────────────
const hamBtn = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

hamBtn.addEventListener('click', () => {
    hamBtn.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
});

function closeMenu() {
    hamBtn.classList.remove('open');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
}


// ── TYPING EFFECT ─────────────────────────
const typedEl = document.getElementById('typedText');
const words = ['Stunning UIs', 'Clean Code', 'Web Experiences', 'Pixel-Perfect Designs'];
let wordIdx = 0, charIdx = 0, deleting = false;

function typeLoop() {
    const word = words[wordIdx];
    if (!deleting) {
        typedEl.textContent = word.slice(0, ++charIdx);
        if (charIdx === word.length) { deleting = true; return setTimeout(typeLoop, 1600); }
    } else {
        typedEl.textContent = word.slice(0, --charIdx);
        if (charIdx === 0) { deleting = false; wordIdx = (wordIdx + 1) % words.length; }
    }
    setTimeout(typeLoop, deleting ? 45 : 95);
}
typeLoop();


// ── COUNTER ANIMATION ─────────────────────
function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const duration = 1800;
    const start = performance.now();
    (function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(update);
    })(start);
}

// ── INTERSECTION OBSERVER ─────────────────
const observerOpts = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };

// Reveal animations
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.revealDelay || 0;
            setTimeout(() => entry.target.classList.add('revealed'), delay * 1000);
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOpts);

document.querySelectorAll('[data-reveal]').forEach((el, i) => {
    el.dataset.revealDelay = i * 0.05;
    revealObserver.observe(el);
});

// Counter trigger
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.stat-num').forEach(animateCounter);
            counterObserver.disconnect();
        }
    });
}, { threshold: .5 });

const statsEl = document.querySelector('.hero-stats');
if (statsEl) counterObserver.observe(statsEl);


// ── ACTIVE NAV ────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(a => a.classList.remove('active'));
            const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
            if (active) active.classList.add('active');
        }
    });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));


// ── FLOATING PARTICLES ────────────────────
const particleContainer = document.getElementById('particles');
if (particleContainer) {
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 3 + 1;
        p.style.cssText = `
      left: ${Math.random() * 100}%;
      top:  ${Math.random() * 100}%;
      width: ${size}px;
      height: ${size}px;
      animation-duration: ${6 + Math.random() * 14}s;
      animation-delay: ${-Math.random() * 20}s;
      opacity: ${Math.random() * 0.5};
    `;
        particleContainer.appendChild(p);
    }
}


// ── PARALLAX ON HERO ORBS ─────────────────
window.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    document.querySelectorAll('.orb').forEach((orb, i) => {
        const factor = (i + 1) * 0.6;
        orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
});


// ── PROJECT CARD TILT ─────────────────────
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const rotX = -(e.clientY - cy) / (rect.height / 2) * 6;
        const rotY = (e.clientX - cx) / (rect.width / 2) * 6;
        card.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-10px)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform .5s ease';
        setTimeout(() => card.style.transition = '', 500);
    });
});


// ── SMOOTH SCROLL ON ANCHOR LINKS ─────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});


// ── SEND BUTTON ANIMATION ─────────────────
const sendBtn = document.querySelector('.send-btn');
if (sendBtn) {
    sendBtn.addEventListener('click', () => {
        sendBtn.innerHTML = '<span class="btn-bg"></span><i class="fa-solid fa-check"></i><span>Sent!</span>';
        sendBtn.style.background = '#10b981';
        setTimeout(() => {
            sendBtn.innerHTML = '<span class="btn-bg"></span><i class="fa-solid fa-paper-plane"></i><span>Send Message</span>';
            sendBtn.style.background = '';
        }, 2500);
    });
}


// ── TEXT REVEAL ON SECTION TITLE ──────────
const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeUp .7s ease forwards';
            titleObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.section-title').forEach(el => {
    el.style.opacity = '0';
    titleObserver.observe(el);
});


// ── STAGGERED PROJECT CARDS ───────────────
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = parseFloat(getComputedStyle(entry.target).getPropertyValue('--delay')) || 0;
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, delay * 1000);
            cardObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    card.style.transition = 'opacity .6s ease, transform .6s ease';
    cardObserver.observe(card);
});


// ── SKILL CHIPS STAGGER ───────────────────
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.skill-chip').forEach((chip, i) => {
                setTimeout(() => {
                    chip.style.opacity = '1';
                    chip.style.transform = 'translateY(0) scale(1)';
                }, i * 80);
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const skillsRow = document.querySelector('.skills-row');
if (skillsRow) {
    skillsRow.querySelectorAll('.skill-chip').forEach(chip => {
        chip.style.opacity = '0';
        chip.style.transform = 'translateY(20px) scale(.9)';
        chip.style.transition = 'opacity .5s ease, transform .5s ease';
    });
    skillObserver.observe(skillsRow);
}

    document.addEventListener("DOMContentLoaded", function () {

      emailjs.init("NUJIsuRfghbhcLE-X");

      document.getElementById("contact-form").addEventListener("submit", function(e) {
        e.preventDefault();

        emailjs.sendForm(
          "service_95131fr",
          "template_tfqf1z5",
          this
        ).then(() => {
          alert("Email Sent Successfully!");
        }).catch((error) => {
          console.log(error);
          alert("Email Failed!");
        });
      });

    });