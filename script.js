/**
 * Interactive Slides Presentation
 * Navigation and interaction logic
 */

(function () {
    'use strict';

    // ===================================
    // State
    // ===================================

    let currentSlide = 1;
    const totalSlides = 20;

    // ===================================
    // DOM Elements
    // ===================================

    const elements = {
        slides: document.querySelectorAll('.slide'),
        prevBtn: document.getElementById('prevBtn'),
        nextBtn: document.getElementById('nextBtn'),
        progressFill: document.getElementById('progressFill'),
        slideCounter: document.getElementById('slideCounter')
    };

    // ===================================
    // Navigation Functions
    // ===================================

    function goToSlide(slideNumber) {
        // Validate slide number
        if (slideNumber < 1 || slideNumber > totalSlides) {
            return;
        }

        // Remove active class from all slides
        elements.slides.forEach(slide => {
            slide.classList.remove('active', 'prev');
        });

        // Add appropriate classes
        const targetSlide = document.querySelector(`[data-slide="${slideNumber}"]`);
        if (targetSlide) {
            targetSlide.classList.add('active');

            // Add prev class to previous slide for animation
            if (slideNumber > currentSlide) {
                const prevSlide = document.querySelector(`[data-slide="${currentSlide}"]`);
                if (prevSlide) {
                    prevSlide.classList.add('prev');
                }
            }
        }

        // Update current slide
        currentSlide = slideNumber;

        // Update UI
        updateUI();
    }

    function nextSlide() {
        if (currentSlide < totalSlides) {
            goToSlide(currentSlide + 1);
        }
    }

    function prevSlide() {
        if (currentSlide > 1) {
            goToSlide(currentSlide - 1);
        }
    }

    function updateUI() {
        // Update progress bar
        const progress = (currentSlide / totalSlides) * 100;
        elements.progressFill.style.width = `${progress}%`;

        // Update slide counter
        elements.slideCounter.textContent = `${currentSlide} / ${totalSlides}`;

        // Update button states
        elements.prevBtn.disabled = currentSlide === 1;
        elements.nextBtn.disabled = currentSlide === totalSlides;
    }

    // ===================================
    // Event Listeners
    // ===================================

    // Button clicks
    elements.prevBtn.addEventListener('click', prevSlide);
    elements.nextBtn.addEventListener('click', nextSlide);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowRight':
            case ' ':  // Space bar
            case 'PageDown':
                e.preventDefault();
                nextSlide();
                break;
            case 'ArrowLeft':
            case 'PageUp':
                e.preventDefault();
                prevSlide();
                break;
            case 'Home':
                e.preventDefault();
                goToSlide(1);
                break;
            case 'End':
                e.preventDefault();
                goToSlide(totalSlides);
                break;
            case 'Escape':
                e.preventDefault();
                goToSlide(1);
                break;
        }
    });

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                nextSlide();
            } else {
                // Swipe right - previous slide
                prevSlide();
            }
        }
    }

    // ===================================
    // Mouse Wheel Navigation (DISABLED)
    // ===================================

    // Disabled to prevent accidental slide changes
    // Uncomment if you want to enable wheel navigation
    /*
    let wheelTimeout;
    document.addEventListener('wheel', (e) => {
        clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(() => {
            if (e.deltaY > 0) {
                nextSlide();
            } else if (e.deltaY < 0) {
                prevSlide();
            }
        }, 50);
    });
    */

    // ===================================
    // Initialization
    // ===================================

    function init() {
        // Set initial state
        goToSlide(1);

        // Log initialization
        console.log('Presentación inicializada con 20 slides');
        console.log('Controles: Flechas ← →, Espacio, Swipe (móvil)');
        console.log('Esc para volver al inicio');
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

document.addEventListener('DOMContentLoaded', () => {
    const particleContainer = document.createElement('div');
    particleContainer.classList.add('particles-container');
    document.body.appendChild(particleContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Random positioning
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';

        // Random size
        const size = Math.random() * 3;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        // Random animation duration
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particle.style.animationDelay = (Math.random() * 5) + 's';

        particleContainer.appendChild(particle);
    }
});


// 3D Tilt Effect logic
// 3D Tilt Effect logic (Intensified)
document.addEventListener('mousemove', (e) => {
    // Background Parallax
    const orbs = document.querySelectorAll('.ambient-orb');
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Smooth orb movement
    requestAnimationFrame(() => {
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.02; // Increased speed
            const x = (e.clientX - centerX) * speed;
            const y = (e.clientY - centerY) * speed;
            orb.style.transform = `translate(${x}px, ${y}px)`;
        });

        // 3D Card Tilt (Active on tablets+ desktops now)
        if (window.innerWidth > 600) {
            const cards = document.querySelectorAll('.content-box, .highlight-box');
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                // Only animate visible cards
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const cardCenterX = rect.left + rect.width / 2;
                    const cardCenterY = rect.top + rect.height / 2;

                    // Angle calculation (Intensified x2)
                    const tiltX = ((e.clientY - cardCenterY) / window.innerHeight) * 15; // Max 15deg
                    const tiltY = -((e.clientX - cardCenterX) / window.innerWidth) * 15;

                    // Apply transform
                    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;

                    // Dynamic glow effect
                    const shadowX = -tiltY * 2;
                    const shadowY = tiltX * 2;
                    card.style.boxShadow = `${shadowX}px ${shadowY}px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(178, 62, 255, 0.4)`;
                }
            });
        }
    });
});

// Reset tilt on mouse leave
document.addEventListener('mouseleave', () => {
    const cards = document.querySelectorAll('.content-box, .highlight-box');
    cards.forEach(card => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        card.style.boxShadow = '';
    });
});

