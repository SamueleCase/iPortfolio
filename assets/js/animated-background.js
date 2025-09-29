// Dynamic Animated Background System
class AnimatedBackground {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.mousePosition = { x: 0, y: 0 };
        this.isVisible = true;
        this.animationId = null;

        this.colors = [
            'rgba(209, 156, 161, 0.15)', // primary-pink
            'rgba(232, 180, 166, 0.12)', // rose-gold
            'rgba(194, 132, 137, 0.18)', // accent-pink
            'rgba(212, 175, 55, 0.10)',  // gold-accent
            'rgba(176, 115, 120, 0.14)', // deep-pink
            'rgba(244, 212, 214, 0.08)'  // soft-pink
        ];

        this.init();
    }

    init() {
        this.createCanvas();
        this.createParticles();
        this.bindEvents();
        this.animate();
    }

    createCanvas() {
        // Create canvas element
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'dynamic-background';
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.pointerEvents = 'none';

        // Insert before body content
        document.body.insertBefore(this.canvas, document.body.firstChild);

        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const particleCount = Math.min(50, Math.floor(window.innerWidth / 30));

        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                size: Math.random() * 4 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                color: this.colors[Math.floor(Math.random() * this.colors.length)],
                originalSize: 0,
                pulsePhase: Math.random() * Math.PI * 2,
                opacity: Math.random() * 0.5 + 0.1
            });
            this.particles[i].originalSize = this.particles[i].size;
        }
    }

    bindEvents() {
        window.addEventListener('resize', () => this.resizeCanvas());

        document.addEventListener('mousemove', (e) => {
            this.mousePosition.x = e.clientX;
            this.mousePosition.y = e.clientY;
        });

        // Pause animations when page is not visible
        document.addEventListener('visibilitychange', () => {
            this.isVisible = !document.hidden;
            if (this.isVisible && !this.animationId) {
                this.animate();
            }
        });

        // Reduce motion for accessibility
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.particles.forEach(particle => {
                particle.speedX *= 0.3;
                particle.speedY *= 0.3;
            });
        }
    }

    updateParticles() {
        const time = Date.now() * 0.001;

        this.particles.forEach((particle, index) => {
            // Base movement
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Mouse interaction
            const dx = this.mousePosition.x - particle.x;
            const dy = this.mousePosition.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                const force = (150 - distance) / 150;
                particle.x -= dx * force * 0.01;
                particle.y -= dy * force * 0.01;
            }

            // Gentle floating motion
            particle.x += Math.sin(time + index * 0.5) * 0.3;
            particle.y += Math.cos(time + index * 0.3) * 0.2;

            // Pulse effect
            particle.size = particle.originalSize + Math.sin(time * 2 + particle.pulsePhase) * 1;

            // Boundary wrapping
            if (particle.x < -10) particle.x = window.innerWidth + 10;
            if (particle.x > window.innerWidth + 10) particle.x = -10;
            if (particle.y < -10) particle.y = window.innerHeight + 10;
            if (particle.y > window.innerHeight + 10) particle.y = -10;

            // Opacity variation
            particle.opacity = 0.1 + Math.sin(time + index) * 0.1;
        });
    }

    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw connections between nearby particles
        this.particles.forEach((particle, i) => {
            this.particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    this.ctx.strokeStyle = `rgba(209, 156, 161, ${0.05 * (1 - distance / 100)})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.stroke();
                }
            });
        });

        // Draw particles
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color.replace(/[\d\.]+\)$/g, `${particle.opacity})`);
            this.ctx.fill();

            // Add glow effect
            this.ctx.shadowColor = particle.color;
            this.ctx.shadowBlur = particle.size * 2;
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        });
    }

    animate() {
        if (!this.isVisible) return;

        this.updateParticles();
        this.drawParticles();

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

// Floating elements animation
class FloatingElements {
    constructor() {
        this.elements = [];
        this.init();
    }

    init() {
        this.createFloatingElements();
        this.startAnimation();
    }

    createFloatingElements() {
        const shapes = ['circle', 'triangle', 'square', 'diamond'];
        const colors = [
            'rgba(209, 156, 161, 0.08)',
            'rgba(232, 180, 166, 0.06)',
            'rgba(194, 132, 137, 0.10)',
            'rgba(212, 175, 55, 0.05)'
        ];

        for (let i = 0; i < 8; i++) {
            const element = document.createElement('div');
            element.className = 'floating-shape';
            element.style.position = 'fixed';
            element.style.pointerEvents = 'none';
            element.style.zIndex = '-1';

            const size = Math.random() * 60 + 20;
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            const color = colors[Math.floor(Math.random() * colors.length)];

            element.style.width = size + 'px';
            element.style.height = size + 'px';
            element.style.background = color;
            element.style.left = Math.random() * window.innerWidth + 'px';
            element.style.top = Math.random() * window.innerHeight + 'px';

            switch(shape) {
                case 'circle':
                    element.style.borderRadius = '50%';
                    break;
                case 'triangle':
                    element.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
                    break;
                case 'diamond':
                    element.style.transform = 'rotate(45deg)';
                    break;
            }

            document.body.appendChild(element);
            this.elements.push({
                element,
                speedX: (Math.random() - 0.5) * 0.2,
                speedY: (Math.random() - 0.5) * 0.2,
                rotationSpeed: (Math.random() - 0.5) * 0.5,
                currentRotation: 0
            });
        }
    }

    startAnimation() {
        const animate = () => {
            this.elements.forEach(item => {
                const rect = item.element.getBoundingClientRect();
                let x = rect.left + item.speedX;
                let y = rect.top + item.speedY;

                // Boundary wrapping
                if (x < -100) x = window.innerWidth + 50;
                if (x > window.innerWidth + 100) x = -50;
                if (y < -100) y = window.innerHeight + 50;
                if (y > window.innerHeight + 100) y = -50;

                item.currentRotation += item.rotationSpeed;

                item.element.style.left = x + 'px';
                item.element.style.top = y + 'px';
                item.element.style.transform += ` rotate(${item.currentRotation}deg)`;
            });

            requestAnimationFrame(animate);
        };

        animate();
    }
}

// Performance and device optimization
function shouldEnableAnimations() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return false;

    // Check device capabilities
    const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4;
    const isSlowConnection = navigator.connection && navigator.connection.effectiveType &&
                            ['slow-2g', '2g', '3g'].includes(navigator.connection.effectiveType);

    // Check if device has limited memory
    const hasLimitedMemory = navigator.deviceMemory && navigator.deviceMemory < 4;

    // Disable on low-end devices or slow connections
    if (isLowEndDevice || isSlowConnection || hasLimitedMemory) {
        return false;
    }

    // Check battery status
    if (navigator.getBattery) {
        navigator.getBattery().then(battery => {
            if (battery.level < 0.2 && !battery.charging) {
                // Disable animations when battery is low
                const animationElements = document.querySelectorAll('.floating-shape');
                animationElements.forEach(el => el.style.animation = 'none');
            }
        });
    }

    return true;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (shouldEnableAnimations()) {
        // Delay initialization to improve page load performance
        setTimeout(() => {
            new AnimatedBackground();
            new FloatingElements();
        }, 1000);
    }

    // Add performance monitoring
    if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.name === 'first-contentful-paint' && entry.startTime > 3000) {
                    // If FCP is slow, reduce animation intensity
                    document.documentElement.style.setProperty('--animation-speed', '0.5');
                }
            }
        });
        observer.observe({entryTypes: ['paint']});
    }
});

// Export for manual initialization if needed
window.AnimatedBackgroundSystem = {
    AnimatedBackground,
    FloatingElements
};