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

        // Initialize Instagram buttons
        this.initInstagramButtons();

        // Load Instagram posts dynamically
        this.loadInstagramPosts();

        // Initialize hero CTA
        this.initHeroCTA();

        // Initialize interactive elements
        this.initStatCounters();
        this.initSkillBars();
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
                // Attendi prima di iniziare l'animazione di uscita
                setTimeout(() => {
                    // Fase 1: Scomparsa sezione centrale
                    preloader.classList.add('preloader-exit');

                    // Fase 2: Rimuovi completamente il preloader
                    setTimeout(() => {
                        preloader.classList.add('preloader-hidden');

                        // Rimuovi dal DOM dopo la transizione
                        setTimeout(() => {
                            preloader.style.display = 'none';
                        }, 400);
                    }, 1200);
                }, 800);
            }
        });
    }

    // ===== TYPING EFFECT =====
    initTypingEffect() {
        const typedTextElement = document.getElementById('typed-text');
        if (!typedTextElement) return;

        const texts = [
            'Social Media Manager',
            'Content Creator',
            'Brand Strategist',
            'Graphic Designer'
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

    // ===== DYNAMIC INSTAGRAM POSTS LOADER =====
    // To add new posts: append entries to this array.
    // Supported types: 'image' (jpg, png, webp, gif) and 'video' (mp4, webm, mov).
    static POSTS = [
        { src: 'assets/img/post/post-01.jpg',  alt: 'Post Instagram - Natale',           type: 'image' },
        { src: 'assets/img/post/post-02.png',  alt: 'Grafica social - 3A Spaghetti',     type: 'image' },
        { src: 'assets/img/post/post-03.png',  alt: 'Post social - 3A',                  type: 'image' },
        { src: 'assets/img/post/post-04.jpg',  alt: 'Preview progetto - Filet',           type: 'image' },
        { src: 'assets/img/post/post-05.png',  alt: 'Post Natale - Genius',               type: 'image' },
        { src: 'assets/img/post/post-06.png',  alt: 'Preview progetto - 3A',              type: 'image' },
        { src: 'assets/img/post/post-07.png',  alt: 'Grafica social - Ambress',           type: 'image' },
        { src: 'assets/img/post/post-08.png',  alt: 'Grafica social - Ambress',           type: 'image' },
        { src: 'assets/img/post/post-09.jpg',  alt: 'Carosello - ZOE Acido',              type: 'image' },
        { src: 'assets/img/post/post-10.jpg',  alt: 'Carosello - ZOE Betaglucano',        type: 'image' },
        { src: 'assets/img/post/post-11.png',  alt: 'Grafica social - Fioreria',          type: 'image' },
        { src: 'assets/img/post/post-12.png',  alt: 'Logo - Fashion Brand',               type: 'image' },
        { src: 'assets/img/post/post-13.png',  alt: 'Food photography - 3A',              type: 'image' },
        { src: 'assets/img/post/post-14.png',  alt: 'Post social - 3A Vino',              type: 'image' },
        { src: 'assets/img/post/post-15.png',  alt: 'Food photography - 3A Piatto',       type: 'image' },
        { src: 'assets/img/post/post-16.png',  alt: 'Post social - 3A Telefono',          type: 'image' },
    ];

    loadInstagramPosts() {
        const grid = document.getElementById('ig-dynamic-grid');
        if (!grid) return;

        const fragment = document.createDocumentFragment();
        const videoExtensions = ['mp4', 'webm', 'mov'];

        HorizontalScroll.POSTS.forEach(post => {
            const item = document.createElement('div');
            item.className = 'ig-post-item';

            const ext = post.src.split('.').pop().toLowerCase();
            const isVideo = post.type === 'video' || videoExtensions.includes(ext);

            if (isVideo) {
                const video = document.createElement('video');
                video.src = post.src;
                video.alt = post.alt;
                video.muted = true;
                video.loop = true;
                video.playsInline = true;
                video.preload = 'metadata';
                video.setAttribute('loading', 'lazy');

                // Play on hover
                item.addEventListener('mouseenter', () => video.play());
                item.addEventListener('mouseleave', () => { video.pause(); video.currentTime = 0; });

                // Play icon overlay
                const playIcon = document.createElement('div');
                playIcon.className = 'ig-video-icon';
                playIcon.innerHTML = '<i class="fas fa-play"></i>';

                item.appendChild(video);
                item.appendChild(playIcon);
                item.classList.add('ig-post-video');
            } else {
                const img = document.createElement('img');
                img.src = post.src;
                img.alt = post.alt;
                img.loading = 'lazy';
                item.appendChild(img);
            }

            fragment.appendChild(item);
        });

        grid.appendChild(fragment);

        // Update post count in stats
        const postCountEl = document.querySelector('.ig-stat-number');
        if (postCountEl) {
            postCountEl.textContent = HorizontalScroll.POSTS.length.toString();
        }

        // Initialize heart animation on the newly created posts
        this.initPostHeartAnimation();
    }

    // ===== POST INTERACTIONS (click → lightbox, double-click → heart) =====
    initPostHeartAnimation() {
        const posts = document.querySelectorAll('.ig-post-item');

        posts.forEach((post, index) => {
            let clickTimer = null;
            let lastTap = 0;

            // Single click → open lightbox (delayed to distinguish from dblclick)
            post.addEventListener('click', (e) => {
                e.preventDefault();
                if (clickTimer) return;
                clickTimer = setTimeout(() => {
                    clickTimer = null;
                    this.openLightbox(index);
                }, 250);
            });

            // Double-click → heart (cancel lightbox)
            post.addEventListener('dblclick', (e) => {
                e.preventDefault();
                clearTimeout(clickTimer);
                clickTimer = null;
                this.showHeartAnimation(post);
            });

            // Mobile: single tap → lightbox, double tap → heart
            post.addEventListener('touchend', (e) => {
                const now = Date.now();
                if (now - lastTap < 300) {
                    e.preventDefault();
                    clearTimeout(clickTimer);
                    clickTimer = null;
                    this.showHeartAnimation(post);
                }
                lastTap = now;
            });
        });
    }

    showHeartAnimation(post) {
        if (post.querySelector('.ig-heart-animation')) return;
        const heart = document.createElement('div');
        heart.className = 'ig-heart-animation';
        heart.innerHTML = '<i class="fas fa-heart"></i>';
        post.appendChild(heart);
        heart.addEventListener('animationend', () => heart.remove());
    }

    // ===== POST LIGHTBOX WITH 3D CARD TRANSITIONS =====
    openLightbox(index) {
        this.lightboxIndex = index;
        this.lightboxOpen = true;

        // Build lightbox DOM if not already present
        if (!this.lightboxEl) {
            this.buildLightbox();
        }

        this.updateLightboxMedia(index, 'none');
        this.lightboxEl.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Entrance animation
        requestAnimationFrame(() => {
            this.lightboxEl.querySelector('.plb-card').classList.add('plb-card-enter');
        });
    }

    buildLightbox() {
        const el = document.createElement('div');
        el.className = 'post-lightbox';
        el.innerHTML = `
            <div class="plb-backdrop"></div>
            <div class="plb-content">
                <button class="plb-close" aria-label="Chiudi"><i class="fas fa-times"></i></button>
                <button class="plb-nav plb-prev" aria-label="Precedente"><i class="fas fa-chevron-left"></i></button>
                <button class="plb-nav plb-next" aria-label="Successivo"><i class="fas fa-chevron-right"></i></button>
                <div class="plb-card-wrapper">
                    <div class="plb-card"></div>
                </div>
                <div class="plb-counter"></div>
                <div class="plb-dots"></div>
            </div>
        `;
        document.body.appendChild(el);
        this.lightboxEl = el;

        // Build dots
        const dotsContainer = el.querySelector('.plb-dots');
        HorizontalScroll.POSTS.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.className = 'plb-dot';
            dot.addEventListener('click', () => this.goToLightbox(i));
            dotsContainer.appendChild(dot);
        });

        // Event listeners
        el.querySelector('.plb-close').addEventListener('click', () => this.closeLightbox());
        el.querySelector('.plb-backdrop').addEventListener('click', () => this.closeLightbox());
        el.querySelector('.plb-prev').addEventListener('click', () => this.prevLightbox());
        el.querySelector('.plb-next').addEventListener('click', () => this.nextLightbox());

        // Keyboard
        this.lightboxKeyHandler = (e) => {
            if (!this.lightboxOpen) return;
            if (e.key === 'Escape') this.closeLightbox();
            if (e.key === 'ArrowLeft') this.prevLightbox();
            if (e.key === 'ArrowRight') this.nextLightbox();
        };
        document.addEventListener('keydown', this.lightboxKeyHandler);

        // Swipe (mobile)
        let touchStartX = 0;
        const content = el.querySelector('.plb-content');
        content.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        content.addEventListener('touchend', (e) => {
            const diff = e.changedTouches[0].screenX - touchStartX;
            if (Math.abs(diff) > 50) {
                diff > 0 ? this.prevLightbox() : this.nextLightbox();
            }
        });
    }

    updateLightboxMedia(index, direction) {
        const post = HorizontalScroll.POSTS[index];
        const card = this.lightboxEl.querySelector('.plb-card');
        const counter = this.lightboxEl.querySelector('.plb-counter');
        const videoExts = ['mp4', 'webm', 'mov'];
        const ext = post.src.split('.').pop().toLowerCase();
        const isVideo = post.type === 'video' || videoExts.includes(ext);

        // Set flip direction class
        card.className = 'plb-card';
        if (direction !== 'none') {
            card.classList.add(direction === 'next' ? 'plb-flip-out-left' : 'plb-flip-out-right');

            card.addEventListener('animationend', () => {
                this.renderLightboxMedia(card, post, isVideo);
                card.className = 'plb-card';
                card.classList.add(direction === 'next' ? 'plb-flip-in-right' : 'plb-flip-in-left');
            }, { once: true });
        } else {
            this.renderLightboxMedia(card, post, isVideo);
        }

        counter.textContent = `${index + 1} / ${HorizontalScroll.POSTS.length}`;

        // Update dots
        this.lightboxEl.querySelectorAll('.plb-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        // Update nav visibility
        this.lightboxEl.querySelector('.plb-prev').style.opacity = index === 0 ? '0.3' : '1';
        this.lightboxEl.querySelector('.plb-next').style.opacity = index === HorizontalScroll.POSTS.length - 1 ? '0.3' : '1';
    }

    renderLightboxMedia(card, post, isVideo) {
        // Pause any existing video
        const oldVideo = card.querySelector('video');
        if (oldVideo) oldVideo.pause();

        card.innerHTML = '';

        if (isVideo) {
            const video = document.createElement('video');
            video.src = post.src;
            video.controls = true;
            video.autoplay = true;
            video.muted = true;
            video.loop = true;
            video.playsInline = true;
            card.appendChild(video);
        } else {
            const img = document.createElement('img');
            img.src = post.src;
            img.alt = post.alt;
            card.appendChild(img);
        }
    }

    goToLightbox(index) {
        if (index < 0 || index >= HorizontalScroll.POSTS.length || index === this.lightboxIndex) return;
        const direction = index > this.lightboxIndex ? 'next' : 'prev';
        this.lightboxIndex = index;
        this.updateLightboxMedia(index, direction);
    }

    prevLightbox() {
        if (this.lightboxIndex > 0) {
            this.goToLightbox(this.lightboxIndex - 1);
        }
    }

    nextLightbox() {
        if (this.lightboxIndex < HorizontalScroll.POSTS.length - 1) {
            this.goToLightbox(this.lightboxIndex + 1);
        }
    }

    closeLightbox() {
        if (!this.lightboxEl) return;
        this.lightboxOpen = false;
        const card = this.lightboxEl.querySelector('.plb-card');
        card.classList.add('plb-card-exit');

        // Pause any video
        const video = card.querySelector('video');
        if (video) video.pause();

        this.lightboxEl.classList.add('closing');
        const onClose = (e) => {
            if (e.target !== this.lightboxEl) return;
            this.lightboxEl.removeEventListener('animationend', onClose);
            this.lightboxEl.classList.remove('active', 'closing');
            card.classList.remove('plb-card-exit');
            document.body.style.overflow = '';
        };
        this.lightboxEl.addEventListener('animationend', onClose);
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
