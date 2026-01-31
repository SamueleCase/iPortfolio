// ===== HORIZONTAL SCROLL SYSTEM =====

class HorizontalScroll {
    constructor() {
        this.currentSection = 0;
        this.totalSections = 7;
        this.isScrolling = false;
        this.scrollTimeout = null;
        this.accumulatedDelta = 0;
        this.boundaryThreshold = 80;
        this.boundaryResetTimeout = null;

        this.wrapper = document.querySelector('.horizontal-wrapper');
        this.navDots = document.querySelectorAll('.nav-dot');

        this.init();
    }

    init() {
        // Hide preloader
        this.hidePreloader();

        // Check for section parameter in URL
        this.checkURLSection();

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

        // Initialize hero CTA
        this.initHeroCTA();

        // Initialize interactive elements
        this.initStatCounters();
        this.initSkillBars();
        this.initPostHeartAnimation();
    }

    checkURLSection() {
        const urlParams = new URLSearchParams(window.location.search);
        const sectionParam = urlParams.get('section');

        if (sectionParam !== null) {
            const sectionIndex = parseInt(sectionParam);
            if (!isNaN(sectionIndex) && sectionIndex >= 0 && sectionIndex < this.totalSections) {
                // Navigate to the section after page load
                setTimeout(() => {
                    this.goToSection(sectionIndex);
                }, 600); // Small delay to ensure smooth transition
            }
        }
    }

    hidePreloader() {
        window.addEventListener('load', () => {
            const preloader = document.querySelector('.preloader-giuliis');
            if (preloader) {
                // Attendi 1 secondo prima di iniziare l'animazione di uscita
                setTimeout(() => {
                    // Fase 1: Scomparsa sezione centrale
                    preloader.classList.add('preloader-exit');

                    // Fase 2: Dopo 1.5s rimuovi completamente il preloader
                    setTimeout(() => {
                        preloader.classList.add('preloader-hidden');

                        // Rimuovi dal DOM dopo la transizione
                        setTimeout(() => {
                            preloader.style.display = 'none';
                        }, 500);
                    }, 1500);
                }, 1000);
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
        // Mouse wheel / trackpad event
        window.addEventListener('wheel', (e) => {
            if (this.isScrolling) return;

            const scrollableEl = this.getScrollableAncestor(e.target);

            // If inside a scrollable element that can still scroll, let it
            if (scrollableEl && this.canElementScroll(scrollableEl, e.deltaY, e.deltaX)) {
                this.accumulatedDelta = 0;
                return;
            }

            // Prevent default (no scrollable target, or at boundary)
            e.preventDefault();

            // If at boundary of a scrollable element, require accumulated delta
            if (scrollableEl) {
                this.accumulatedDelta += Math.abs(e.deltaY);

                clearTimeout(this.boundaryResetTimeout);
                this.boundaryResetTimeout = setTimeout(() => {
                    this.accumulatedDelta = 0;
                }, 300);

                if (this.accumulatedDelta < this.boundaryThreshold) {
                    return;
                }
                this.accumulatedDelta = 0;
            }

            if (e.deltaY > 0) {
                this.goToSection(this.currentSection + 1);
            } else if (e.deltaY < 0) {
                this.goToSection(this.currentSection - 1);
            }
        }, { passive: false });

        // Touch events for mobile swipe
        let touchStartX = 0;
        let touchStartY = 0;
        let touchScrollableEl = null;
        let touchInitialScrollTop = 0;
        let touchInitialScrollLeft = 0;

        window.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
            touchScrollableEl = this.getScrollableAncestor(e.target);
            if (touchScrollableEl) {
                touchInitialScrollTop = touchScrollableEl.scrollTop;
                touchInitialScrollLeft = touchScrollableEl.scrollLeft;
            }
        }, { passive: true });

        window.addEventListener('touchend', (e) => {
            if (this.isScrolling) return;

            const touchEndX = e.changedTouches[0].screenX;
            const touchEndY = e.changedTouches[0].screenY;

            if (touchScrollableEl) {
                const scrolledV = Math.abs(touchScrollableEl.scrollTop - touchInitialScrollTop) > 2;
                const scrolledH = Math.abs(touchScrollableEl.scrollLeft - touchInitialScrollLeft) > 2;

                // If the element consumed the scroll gesture, don't navigate
                if (scrolledV || scrolledH) {
                    return;
                }

                // Element didn't scroll (at boundary) - only navigate on horizontal swipe
                const diffX = Math.abs(touchStartX - touchEndX);
                const diffY = Math.abs(touchStartY - touchEndY);
                if (diffY > diffX) {
                    return;
                }
            }

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

        // Trigger section-specific animations after transition starts
        setTimeout(() => this.onSectionEnter(newSection), 300);

        // Reset scrolling flag after transition
        clearTimeout(this.scrollTimeout);
        this.scrollTimeout = setTimeout(() => {
            this.isScrolling = false;
        }, 800); // Match CSS transition duration
    }

    onSectionEnter(sectionIndex) {
        if (sectionIndex === 1) {
            this.animateCounters();
        }
        if (sectionIndex === 4) {
            this.animateSkillBars();
        }
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

    // ===== SCROLL BOUNDARY DETECTION =====
    getScrollableAncestor(element) {
        let current = element;
        while (current && current !== document.body && current !== document.documentElement) {
            const style = window.getComputedStyle(current);
            const overflowY = style.overflowY;
            const overflowX = style.overflowX;

            const isScrollableY = (overflowY === 'auto' || overflowY === 'scroll') &&
                                  current.scrollHeight > current.clientHeight;
            const isScrollableX = (overflowX === 'auto' || overflowX === 'scroll') &&
                                  current.scrollWidth > current.clientWidth;

            if (isScrollableY || isScrollableX) {
                return current;
            }
            current = current.parentElement;
        }
        return null;
    }

    canElementScroll(element, deltaY, deltaX) {
        const style = window.getComputedStyle(element);

        // Check vertical scrollability
        const overflowY = style.overflowY;
        if ((overflowY === 'auto' || overflowY === 'scroll') && element.scrollHeight > element.clientHeight) {
            const atTop = element.scrollTop <= 0;
            const atBottom = element.scrollTop + element.clientHeight >= element.scrollHeight - 1;

            if (deltaY > 0 && !atBottom) return true;
            if (deltaY < 0 && !atTop) return true;
        }

        // Check horizontal scrollability
        const overflowX = style.overflowX;
        if ((overflowX === 'auto' || overflowX === 'scroll') && element.scrollWidth > element.clientWidth) {
            const atLeft = element.scrollLeft <= 0;
            const atRight = element.scrollLeft + element.clientWidth >= element.scrollWidth - 1;

            const hDelta = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY;
            if (hDelta > 0 && !atRight) return true;
            if (hDelta < 0 && !atLeft) return true;
        }

        return false;
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

            // Get submit button
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Invio in corso...';

            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            // Send email using EmailJS
            // NOTA: Sostituisci 'YOUR_SERVICE_ID' e 'YOUR_TEMPLATE_ID' con i tuoi ID da emailjs.com
            // Configurazione: https://dashboard.emailjs.com/admin
            emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
                from_name: data.name,
                from_email: data.email,
                message: data.message,
                to_email: 'giuliis.fa.marketing@gmail.com'
            })
            .then(() => {
                // Success
                this.showFormSuccess();
                contactForm.reset();
            })
            .catch((error) => {
                // Error
                console.error('EmailJS Error:', error);
                this.showFormError();
            })
            .finally(() => {
                // Reset button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            });
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

    showFormError() {
        // Create error notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            background: linear-gradient(135deg, #e74c3c, #c0392b);
            color: white;
            padding: 1.5rem 2rem;
            border-radius: 15px;
            box-shadow: 0 8px 35px rgba(231, 76, 60, 0.3);
            z-index: 10000;
            font-family: 'Poppins', sans-serif;
            font-weight: 500;
            animation: slideIn 0.5s ease;
        `;
        notification.innerHTML = `
            <i class="fas fa-exclamation-circle" style="margin-right: 0.75rem;"></i>
            Errore nell'invio. Riprova o contattami direttamente.
        `;

        // Append to body
        document.body.appendChild(notification);

        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.5s ease';
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 5000);
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
                const isFollowing = seguiBtn.classList.contains('ig-following');

                if (!isFollowing) {
                    seguiBtn.classList.add('ig-following');
                    seguiBtn.innerHTML = '<i class="fas fa-check" style="margin-right:4px"></i> Segui già';
                    this.createConfetti(seguiBtn);

                    // Bump follower count to 100K
                    const followerEl = document.querySelectorAll('.ig-stat-number')[1];
                    if (followerEl) followerEl.textContent = '100K';
                } else {
                    seguiBtn.classList.remove('ig-following');
                    seguiBtn.textContent = 'Segui';

                    const followerEl = document.querySelectorAll('.ig-stat-number')[1];
                    if (followerEl) followerEl.textContent = '99.999K';
                }
            });
        }
    }

    // ===== CONFETTI BURST =====
    createConfetti(sourceEl) {
        const rect = sourceEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const colors = ['#d19ca1', '#c28489', '#ff6b81', '#ff4757', '#ffa502', '#ff6348', '#eccc68', '#7bed9f', '#ff9ff3', '#f368e0'];
        const particleCount = 35;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'confetti-particle';

            const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
            const velocity = 80 + Math.random() * 180;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity - 60;

            particle.style.cssText = `
                left: ${centerX}px;
                top: ${centerY}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                --tx: ${tx}px;
                --ty: ${ty}px;
                --r: ${Math.random() * 720 - 360}deg;
                animation-delay: ${Math.random() * 0.08}s;
                width: ${4 + Math.random() * 6}px;
                height: ${4 + Math.random() * 6}px;
                border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
            `;

            document.body.appendChild(particle);
            particle.addEventListener('animationend', () => particle.remove());
        }
    }

    // ===== STAT COUNTER ANIMATION =====
    initStatCounters() {
        this.statNumbers = document.querySelectorAll('.ig-stat-number');
        this.statTargets = [];

        this.statNumbers.forEach(el => {
            const text = el.textContent.trim();
            let value, suffix = '', decimals = 0;

            if (text.includes('K')) {
                suffix = 'K';
                value = parseFloat(text.replace('K', ''));
                const parts = text.replace('K', '').split('.');
                decimals = parts.length > 1 ? parts[1].length : 0;
            } else if (text.includes('M')) {
                suffix = 'M';
                value = parseFloat(text.replace('M', ''));
                const parts = text.replace('M', '').split('.');
                decimals = parts.length > 1 ? parts[1].length : 0;
            } else {
                value = parseInt(text);
                decimals = 0;
            }

            this.statTargets.push({ el, value, suffix, decimals, originalText: text });
        });
    }

    animateCounters() {
        if (!this.statTargets || this.statTargets.length === 0) return;

        const duration = 2000;
        const startTime = performance.now();

        // Reset all to 0
        this.statTargets.forEach(t => {
            t.el.textContent = '0';
        });

        const easeOutQuart = t => 1 - Math.pow(1 - t, 4);

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeOutQuart(progress);

            this.statTargets.forEach(({ el, value, suffix, decimals }) => {
                const current = eased * value;
                const formatted = decimals > 0
                    ? current.toFixed(decimals)
                    : Math.round(current).toString();
                el.textContent = formatted + suffix;
            });

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    // ===== SKILL BARS ANIMATION =====
    initSkillBars() {
        this.skillBars = document.querySelectorAll('.skill-bar');

        this.skillBars.forEach(bar => {
            bar.dataset.target = bar.style.width;
            bar.style.width = '0%';
        });
    }

    animateSkillBars() {
        if (!this.skillBars) return;

        this.skillBars.forEach((bar, i) => {
            setTimeout(() => {
                bar.style.width = bar.dataset.target;
            }, i * 80);
        });
    }

    // ===== POST HEART ANIMATION =====
    initPostHeartAnimation() {
        const posts = document.querySelectorAll('.ig-post-item');

        posts.forEach(post => {
            let lastTap = 0;

            // Double-click (desktop)
            post.addEventListener('dblclick', (e) => {
                e.preventDefault();
                this.showHeartAnimation(post);
            });

            // Double-tap (mobile)
            post.addEventListener('touchend', (e) => {
                const now = Date.now();
                if (now - lastTap < 300) {
                    e.preventDefault();
                    this.showHeartAnimation(post);
                }
                lastTap = now;
            });
        });
    }

    showHeartAnimation(post) {
        // Avoid stacking
        if (post.querySelector('.ig-heart-animation')) return;

        const heart = document.createElement('div');
        heart.className = 'ig-heart-animation';
        heart.innerHTML = '<i class="fas fa-heart"></i>';

        post.appendChild(heart);
        heart.addEventListener('animationend', () => heart.remove());
    }

    // ===== HERO CTA =====
    initHeroCTA() {
        const cta = document.querySelector('.hero-cta');
        if (!cta) return;

        cta.addEventListener('click', (e) => {
            e.preventDefault();
            const section = parseInt(cta.getAttribute('data-section'));
            this.goToSection(section);
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
