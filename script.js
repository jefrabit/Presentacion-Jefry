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
    const totalSlides = 12;

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

    // Mouse wheel navigation (optional, can be disabled if too sensitive)
    let wheelTimeout;
    document.addEventListener('wheel', (e) => {
        clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(() => {
            if (e.deltaY > 0) {
                nextSlide();
            } else if (e.deltaY < 0) {
                prevSlide();
            }
        }, 100);
    }, { passive: true });

    // ===================================
    // Initialization
    // ===================================

    function init() {
        // Set initial state
        goToSlide(1);

        // Log initialization
        console.log('Presentación inicializada con 12 slides');
        console.log('Controles: Flechas ← →, Espacio, Swipe, Rueda del mouse');
        console.log('Esc para volver al inicio');
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
