// ===== HORIZONTAL SCROLL SYSTEM =====

class HorizontalScroll {
    constructor() {
        this.currentSection = 0;
        this.totalSections = 7;
        this.isScrolling = false;
        this.scrollTimeout = null;

        this.wrapper = document.querySelector('.horizontal-wrapper');
        this.navDots = document.querySelectorAll('.nav-dot');

        this.init();
    }

    init() {
        // Hide preloader
        this.hidePreloader();

        // Initialize typing effect
        this.initTypingEffect();

        // Bind scroll events
        this.bindScrollEvents();

        // Bind navigation dots
        this.bindNavDots();

        // Bind keyboard navigation
        this.bindKeyboardNav();

        // Initialize portfolio filters
        this.initPortfolioFilters();

        // Initialize testimonials
        this.initTestimonials();

        // Initialize form
        this.initForm();

        // Initialize Instagram buttons
        this.initInstagramButtons();

        // Initialize hero highlights navigation
        this.initHeroHighlights();
    }

    hidePreloader() {
        window.addEventListener('load', () => {
            const preloader = document.querySelector('.preloader');
            if (preloader) {
                preloader.classList.add('fade-out');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }
        });
    }

    // ===== TYPING EFFECT =====
    initTypingEffect() {
        const typedTextElement = document.getElementById('typed-text');
        if (!typedTextElement) return;

        const texts = [
            'Social Media Manager',
            'Graphic Designer',
            'Content Creator',
            'Brand Strategist'
        ];

        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        const type = () => {
            const currentText = texts[textIndex];

            if (isDeleting) {
                typedTextElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typedTextElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentText.length) {
                // Pause at end
                typingSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingSpeed = 500;
            }

            setTimeout(type, typingSpeed);
        };

        // Start typing effect after a short delay
        setTimeout(type, 1000);
    }

    bindScrollEvents() {
        // Mouse wheel event
        window.addEventListener('wheel', (e) => {
            if (this.isScrolling) return;

            e.preventDefault();

            if (e.deltaY > 0) {
                // Scroll down → move right
                this.goToSection(this.currentSection + 1);
            } else {
                // Scroll up → move left
                this.goToSection(this.currentSection - 1);
            }
        }, { passive: false });

        // Touch events for mobile swipe (basic implementation)
        let touchStartX = 0;
        let touchEndX = 0;

        window.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        window.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        }, { passive: true });
    }

    handleSwipe(start, end) {
        if (this.isScrolling) return;

        const swipeThreshold = 50;
        const diff = start - end;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left → move right
                this.goToSection(this.currentSection + 1);
            } else {
                // Swipe right → move left
                this.goToSection(this.currentSection - 1);
            }
        }
    }

    bindNavDots() {
        this.navDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSection(index);
            });
        });
    }

    bindKeyboardNav() {
        window.addEventListener('keydown', (e) => {
            if (this.isScrolling) return;

            switch(e.key) {
                case 'ArrowRight':
                case 'ArrowDown':
                    e.preventDefault();
                    this.goToSection(this.currentSection + 1);
                    break;
                case 'ArrowLeft':
                case 'ArrowUp':
                    e.preventDefault();
                    this.goToSection(this.currentSection - 1);
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goToSection(0);
                    break;
                case 'End':
                    e.preventDefault();
                    this.goToSection(this.totalSections - 1);
                    break;
            }
        });
    }

    goToSection(index) {
        // Clamp between 0 and totalSections - 1
        const newSection = Math.max(0, Math.min(this.totalSections - 1, index));

        if (newSection === this.currentSection) return;

        // Set scrolling flag
        this.isScrolling = true;

        // Update current section
        this.currentSection = newSection;

        // Apply transform
        const translateX = -this.currentSection * 100;
        this.wrapper.style.transform = `translateX(${translateX}vw)`;

        // Update navigation dots
        this.updateNavDots();

        // Reset scrolling flag after transition
        clearTimeout(this.scrollTimeout);
        this.scrollTimeout = setTimeout(() => {
            this.isScrolling = false;
        }, 800); // Match CSS transition duration
    }

    updateNavDots() {
        this.navDots.forEach((dot, index) => {
            if (index === this.currentSection) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // ===== PORTFOLIO FILTERS =====
    initPortfolioFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        if (filterBtns.length === 0) return;

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));

                // Add active class to clicked button
                btn.classList.add('active');

                // Get filter value
                const filter = btn.getAttribute('data-filter');

                // Filter portfolio items
                portfolioItems.forEach(item => {
                    if (filter === 'all') {
                        // Show all items
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        // Check if item has the filter category
                        const categories = item.getAttribute('data-category');
                        if (categories && categories.includes(filter)) {
                            item.style.display = 'block';
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'scale(1)';
                            }, 10);
                        } else {
                            item.style.opacity = '0';
                            item.style.transform = 'scale(0.8)';
                            setTimeout(() => {
                                item.style.display = 'none';
                            }, 300);
                        }
                    }
                });
            });
        });
    }

    // ===== TESTIMONIALS SYSTEM =====
    initTestimonials() {
        this.testimonialItems = document.querySelectorAll('.testimonial-item');
        this.testimonialDots = document.querySelectorAll('.t-dot');
        this.currentTestimonial = 0;

        if (this.testimonialDots.length === 0) return;

        // Bind testimonial dots
        this.testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.showTestimonial(index);
            });
        });

        // Auto-rotate testimonials
        this.startTestimonialRotation();
    }

    showTestimonial(index) {
        this.currentTestimonial = index;

        // Hide all testimonials
        this.testimonialItems.forEach(item => {
            item.classList.remove('active');
        });

        // Show current testimonial
        if (this.testimonialItems[index]) {
            this.testimonialItems[index].classList.add('active');
        }

        // Update dots
        this.testimonialDots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    startTestimonialRotation() {
        setInterval(() => {
            this.currentTestimonial = (this.currentTestimonial + 1) % this.testimonialItems.length;
            this.showTestimonial(this.currentTestimonial);
        }, 5000); // Change every 5 seconds
    }

    // ===== FORM HANDLING =====
    initForm() {
        const contactForm = document.getElementById('contact-form');
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            console.log('Form submitted:', data);

            // Show success message
            this.showFormSuccess();

            // Reset form
            contactForm.reset();
        });
    }

    showFormSuccess() {
        // Create success notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            background: linear-gradient(135deg, #d19ca1, #c28489);
            color: white;
            padding: 1.5rem 2rem;
            border-radius: 15px;
            box-shadow: 0 8px 35px rgba(209, 156, 161, 0.3);
            z-index: 10000;
            font-family: 'Poppins', sans-serif;
            font-weight: 500;
            animation: slideIn 0.5s ease;
        `;
        notification.innerHTML = `
            <i class="fas fa-check-circle" style="margin-right: 0.75rem;"></i>
            Messaggio inviato con successo!
        `;

        // Add animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        // Append to body
        document.body.appendChild(notification);

        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.5s ease';
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 4000);
    }

    // ===== INSTAGRAM BUTTONS =====
    initInstagramButtons() {
        const scriviBtn = document.getElementById('ig-scrivi-btn');
        const seguiBtn = document.getElementById('ig-segui-btn');

        if (scriviBtn) {
            scriviBtn.addEventListener('click', (e) => {
                e.preventDefault();
                // Navigate to contact section (section 6)
                this.goToSection(6);
            });
        }

        if (seguiBtn) {
            seguiBtn.addEventListener('click', (e) => {
                e.preventDefault();
                // No action for now, button remains visually active
            });
        }
    }

    // ===== HERO HIGHLIGHTS NAVIGATION =====
    initHeroHighlights() {
        const highlights = document.querySelectorAll('.hero-highlight');
        highlights.forEach(highlight => {
            highlight.addEventListener('click', (e) => {
                e.preventDefault();
                const section = parseInt(highlight.getAttribute('data-section'));
                this.goToSection(section);
            });
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HorizontalScroll();
});

// Prevent default scroll behavior
document.addEventListener('scroll', (e) => {
    window.scrollTo(0, 0);
}, { passive: false });
