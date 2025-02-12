// DOM Elements
const themeToggle = document.querySelector('.theme-toggle');
const hamburger = document.querySelector('.hamburger');
const navElements = document.querySelector('.nav-elements');
const navLinks = document.querySelectorAll('.nav-link');
const body = document.body;

// Theme Toggle
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    // Change icon based on theme
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('dark-theme')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    navElements.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Active Link Highlighting
const setActiveLink = () => {
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
};

// Smooth Scroll for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        targetSection.scrollIntoView({
            behavior: 'smooth'
        });

        // Close mobile menu if open
        if (navElements.classList.contains('active')) {
            navElements.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Project Filter Animation
const projectCards = document.querySelectorAll('.project-card');

const fadeInProjects = () => {
    projectCards.forEach((card, index) => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 200);
                        observer.unobserve(card);
                    }
                });
            },
            { threshold: 0.1 }
        );
        
        observer.observe(card);
    });
};

// Initialize functions
document.addEventListener('DOMContentLoaded', () => {
    setActiveLink();
    fadeInProjects();
});

