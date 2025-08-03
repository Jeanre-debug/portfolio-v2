// ===== CORE INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initPreloader();
    initTheme();
    initNavigation();
    initHero3D();
    initFloatingElements();
    initDynamicText();
    initCustomCursor();
    initEnhancedCursor();
    initScrollAnimations();
    initStatsCounter();
    initSkillsAnimation();
    initProjects();
    initContactForm();
    initModal();
    initTimeline();
    initParticles();
    initEasterEggs();
    
    // Advanced interactive features
    init3DProjectCards();
    initParallaxEffects();
    initMorphingShapes();
    initParticlePhysics();
    initPerformanceMetrics();
    initInteractiveBackground();
    initAdvancedAnimations();
    initAdvancedUIElements();
    
    // Optional features (can be toggled)
    // initSoundEffects();
    // initGestureRecognition();
    
    // Performance monitoring
    initPerformanceMonitoring();
});

// ===== PRELOADER =====
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    const progressBar = document.querySelector('.progress-bar');
    
    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        progressBar.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                preloader.classList.add('hidden');
                document.body.style.overflow = 'visible';
                
                // Trigger entrance animations
                gsap.from('.hero-text', {
                    duration: 1,
                    y: 50,
                    opacity: 0,
                    ease: 'power3.out',
                    delay: 0.2
                });
                
                gsap.from('.hero-visual', {
                    duration: 1,
                    x: 50,
                    opacity: 0,
                    ease: 'power3.out',
                    delay: 0.4
                });
            }, 500);
        }
    }, 100);
}

// ===== THEME MANAGEMENT =====
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    body.setAttribute('data-theme', savedTheme);
    
    // Update theme toggle icon
    updateThemeIcon(savedTheme);
    
    // Theme toggle functionality
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add transition effect
        gsap.to('body', {
            duration: 0.3,
            backgroundColor: newTheme === 'dark' ? '#111827' : '#ffffff',
            ease: 'power2.out'
        });
        
        // Recreate particles for the new theme
        setTimeout(() => {
            initParticles();
        }, 300);
        
        // Reinitialize skill cards for the new theme
        setTimeout(() => {
            initSkillsAnimation();
        }, 350);
    });
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

function createRippleEffect(element) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: var(--primary);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        z-index: 9999;
        pointer-events: none;
        animation: ripple 0.6s ease-out;
    `;
    
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        document.body.removeChild(ripple);
    }, 600);
}

// ===== NAVIGATION =====
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Sticky navigation
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active section highlighting
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// ===== HERO 3D ANIMATION =====
function initHero3D() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 5;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.005,
        color: '#ffffff',
        transparent: true,
        opacity: 0.8
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    camera.position.z = 2;
    
    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX / window.innerWidth - 0.5;
        mouseY = event.clientY / window.innerHeight - 0.5;
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        particlesMesh.rotation.y += 0.001;
        particlesMesh.rotation.x += 0.001;
        
        // Mouse interaction
        particlesMesh.rotation.y += mouseX * 0.1;
        particlesMesh.rotation.x += mouseY * 0.1;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// ===== FLOATING ELEMENTS DRAG AND DROP =====
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.float-element');
    
    // Add hover effects for the floating elements
    floatingElements.forEach((element) => {
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'scale(1.1)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'scale(1)';
        });
    });
}

// ===== DYNAMIC TEXT ANIMATION =====
function initDynamicText() {
    const dynamicText = document.getElementById('dynamic-text');
    if (!dynamicText) return;
    
    const words = [
        'modern websites.',
        'responsive applications.',
        'user experiences.',
        'scalable solutions.',
        'digital innovations.'
    ];
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 150;
    
    function typeWriter() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            dynamicText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            dynamicText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150;
        }
        
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 1000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }
        
        setTimeout(typeWriter, typeSpeed);
    }
    
    setTimeout(typeWriter, 1000);
}

// ===== CUSTOM CURSOR =====
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    const cursorTrail = document.querySelector('.cursor-trail');
    
    if (!cursor || !cursorFollower) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;
    
    // Mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '1';
    });
    
    // Cursor animation loop
    function animateCursor() {
        // Main cursor
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        // Follower cursor
        followerX += (mouseX - followerX) * 0.05;
        followerY += (mouseY - followerY) * 0.05;
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .btn, .project-card, .skill-card');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.borderColor = 'var(--primary)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.borderColor = 'var(--primary)';
        });
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
    });
}

// ===== ENHANCED CURSOR EFFECTS =====
function initEnhancedCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (!cursor || !cursorFollower) return;
    
    // Add magnetic effect to interactive elements
    const magneticElements = document.querySelectorAll('.btn, .project-card, .skill-card, .contact-card');
    
    magneticElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(2)';
            cursorFollower.style.borderColor = 'var(--primary)';
            cursorFollower.style.background = 'rgba(59, 130, 246, 0.1)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.borderColor = 'var(--primary)';
            cursorFollower.style.background = 'transparent';
        });
    });
    
    // Add text effect to cursor
    document.addEventListener('mousemove', (e) => {
        const textElements = document.querySelectorAll('.hero-title, .section-title');
        textElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distance = Math.sqrt(
                Math.pow(e.clientX - centerX, 2) + 
                Math.pow(e.clientY - centerY, 2)
            );
            
            if (distance < 100) {
                element.style.transform = `scale(1.05)`;
                element.style.textShadow = '0 0 20px var(--primary)';
            } else {
                element.style.transform = 'scale(1)';
                element.style.textShadow = 'none';
            }
        });
    });
}

// ===== SCROLL-TRIGGERED ANIMATIONS =====
function initScrollAnimations() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Fade in animations (excluding skill cards to prevent alignment issues)
    gsap.utils.toArray('.section-header, .project-card, .contact-card').forEach(element => {
        gsap.from(element, {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    // Parallax effects
    gsap.utils.toArray('.float-element').forEach(element => {
        gsap.to(element, {
            y: -100,
            ease: 'none',
            scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });
    
    // Timeline animations
    gsap.utils.toArray('.timeline-item').forEach((item, index) => {
        gsap.from(item, {
            duration: 1,
            x: index % 2 === 0 ? -50 : 50,
            opacity: 0,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    // 3D rotation on scroll
    gsap.utils.toArray('.project-card').forEach(card => {
        gsap.to(card, {
            rotationY: 360,
            ease: 'none',
            scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });
    });
    
    // Morphing background on scroll (only if elements exist)
    const morphingShapes = document.querySelectorAll('.morphing-shape');
    if (morphingShapes.length > 0) {
        gsap.to('.morphing-shape', {
            borderRadius: '70%',
            scale: 1.5,
            ease: 'none',
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: 'bottom bottom',
                scrub: true
            }
        });
    }
}

// ===== INTERACTIVE BACKGROUND =====
function initInteractiveBackground() {
    const canvas = document.createElement('canvas');
    canvas.id = 'interactive-bg';
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -2;
        opacity: 0.3;
    `;
    
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 10; // Optimized for performance
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
            this.size = Math.random() * 3 + 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance / 100)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ===== SOUND EFFECTS =====
function initSoundEffects() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    function playHoverSound() {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }
    
    // Add hover sound to interactive elements
    const interactiveElements = document.querySelectorAll('.btn, .project-card, .skill-card');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', playHoverSound);
    });
}

// ===== GESTURE RECOGNITION =====
function initGestureRecognition() {
    let startX = 0;
    let startY = 0;
    let isGestureActive = false;
    
    document.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isGestureActive = true;
    });
    
    document.addEventListener('touchmove', (e) => {
        if (!isGestureActive) return;
        
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        const deltaX = currentX - startX;
        const deltaY = currentY - startY;
        
        // Parallax effect on touch
        const heroElements = document.querySelectorAll('.hero-text, .hero-visual');
        heroElements.forEach((element, index) => {
            const speed = (index + 1) * 0.1;
            gsap.to(element, {
                x: deltaX * speed,
                y: deltaY * speed,
                duration: 0.1,
                ease: 'power2.out'
            });
        });
    });
    
    document.addEventListener('touchend', () => {
        isGestureActive = false;
        
        // Reset positions
        const heroElements = document.querySelectorAll('.hero-text, .hero-visual');
        heroElements.forEach(element => {
            gsap.to(element, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    });
}

// ===== ADVANCED ANIMATIONS =====
function initAdvancedAnimations() {
    // Removed skill card animations to prevent alignment issues
    
    // Ensure skill bars don't get affected by GSAP animations
    gsap.set('.skill-fill', {
        opacity: 1,
        visibility: 'visible'
    });
    
    // Floating animation for hero elements
    gsap.to('.hero-text', {
        y: -20,
        duration: 2,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1
    });
    
    gsap.to('.hero-visual', {
        y: 20,
        duration: 2.5,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1
    });
    
    // Pulse animation for CTA buttons
    gsap.to('.btn-primary', {
        scale: 1.05,
        duration: 1,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1
    });
}

// ===== STATS COUNTER =====
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.value);
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 20);
}

// ===== SKILLS ANIMATION =====
function initSkillsAnimation() {
    const skillBars = document.querySelectorAll('.skill-fill');
    const skillCards = document.querySelectorAll('.skill-card');
    const animatedBars = new Set();
    
    // Debug: Log how many skill cards are found
    console.log('Found', skillCards.length, 'skill cards');
    skillCards.forEach((card, index) => {
        console.log('Card', index + 1, ':', card.dataset.skill);
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animatedBars.has(entry.target)) {
                const level = entry.target.dataset.level;
                animateSkillBar(entry.target, level);
                animatedBars.add(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    skillBars.forEach(bar => {
        bar.style.width = '0%';
        bar.style.transition = 'none';
        observer.observe(bar);
    });
    
    // Fallback animation
    setTimeout(() => {
        skillBars.forEach(bar => {
            if (!animatedBars.has(bar)) {
                const level = bar.dataset.level;
                animateSkillBar(bar, level);
                animatedBars.add(bar);
            }
        });
    }, 2000);
}

function animateSkillBar(bar, targetLevel) {
    // Re-enable CSS transition for smooth animation
    bar.style.transition = 'width 0.8s ease-out';
    
    // Use CSS transition instead of JavaScript animation for better performance
    setTimeout(() => {
        bar.style.width = targetLevel + '%';
    }, 50);
}

// ===== PROJECTS =====
function initProjects() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectsGrid = document.getElementById('projects-grid');
    
    let projects = [];
    
    // Load projects from JSON file
    async function loadProjects() {
        try {
            // Try to load from local file (works with local server)
            const response = await fetch('projects.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            projects = await response.json();
            renderProjects(projects);
        } catch (error) {
            console.log('Using fallback projects data due to CORS or file access issue');
            // Fallback to sample data if JSON fails to load
            projects = [
                {
                    title: 'E-Commerce Platform',
                    desc: 'A full-stack e-commerce solution with React, Node.js, and MongoDB.',
                    image: 'Screenshot 2025-04-14 at 15.20.20.png',
                    category: 'web',
                    tags: ['React', 'Node.js', 'MongoDB'],
                    links: [
                        { url: '#', icon: '<i class="fas fa-external-link-alt"></i>', title: 'View Live' },
                        { url: '#', icon: '<i class="fab fa-github"></i>', title: 'View Code' }
                    ]
                },
                {
                    title: 'Finance Management App',
                    desc: 'A cross-platform mobile app for Finance management with real-time synchronization.',
                    image: 'Screenshot 2025-07-08 at 20.00.04.png',
                    category: 'mobile',
                    tags: ['React Native', 'Firebase', 'Redux'],
                    links: [
                        { url: 'http://jobudget.co.za', icon: '<i class="fas fa-external-link-alt"></i>', title: 'View Live' },
                        { url: '#', icon: '<i class="fab fa-github"></i>', title: 'View Code' }
                    ]
                },
                {
                    title: 'Portfolio Website',
                    desc: 'A modern, responsive portfolio website with smooth animations and interactive elements.',
                    image: 'Screenshot 2025-04-14 at 15.28.42.png',
                    category: 'design',
                    tags: ['Figma', 'HTML/CSS', 'JavaScript'],
                    links: [
                        { url: '#', icon: '<i class="fas fa-external-link-alt"></i>', title: 'View Live' },
                        { url: '#', icon: '<i class="fab fa-github"></i>', title: 'View Code' }
                    ]
                }
            ];
            renderProjects(projects);
        }
    }
    
    // Render projects
    function renderProjects(filteredProjects = projects) {
        projectsGrid.innerHTML = '';
        
        filteredProjects.forEach((project, index) => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            
            // Get the first link for demo and second for code
            const demoLink = project.links.find(link => link.title === 'View Live') || project.links[0];
            const codeLink = project.links.find(link => link.title === 'View Code') || project.links[1];
            
            projectCard.innerHTML = `
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}">
                    <div class="project-overlay">
                        <div class="project-links">
                            <a href="${codeLink?.url || '#'}" class="project-link" target="_blank" title="${codeLink?.title || 'View Code'}">
                                <i class="fab fa-github"></i>
                            </a>
                            <a href="${demoLink?.url || '#'}" class="project-link" target="_blank" title="${demoLink?.title || 'Live Demo'}">
                                <i class="fas fa-external-link-alt"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="project-info">
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                    </div>
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.desc}</p>
                </div>
            `;
            
            // Add click event for modal
            projectCard.addEventListener('click', () => {
                openProjectModal(project);
            });
            
            projectsGrid.appendChild(projectCard);
        });
        
        // Apply 3D effects to newly created project cards
        apply3DEffectsToProjectCards();
    }
    
    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            const filteredProjects = filter === 'all' 
                ? projects 
                : projects.filter(p => p.category === filter);
            
            renderProjects(filteredProjects);
        });
    });
    
    // Load projects on initialization
    loadProjects();
}

// ===== CONTACT FORM =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.querySelector('.form-status');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Show toast notification
        showToast('Sending message...', 'info', 'Please wait while we process your request');
        
        try {
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            formStatus.innerHTML = `
                <div class="success-message">
                    <i class="fas fa-check-circle"></i>
                    Message sent successfully! I'll get back to you soon.
                </div>
            `;
            
            // Show success toast
            showToast('Message sent!', 'success', 'Thank you for reaching out. I\'ll respond soon!');
            
            contactForm.reset();
            
        } catch (error) {
            // Show error message
            formStatus.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-circle"></i>
                    Something went wrong. Please try again.
                </div>
            `;
            
            // Show error toast
            showToast('Error occurred!', 'error', 'Failed to send message. Please try again.');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Clear status after 5 seconds
            setTimeout(() => {
                formStatus.innerHTML = '';
            }, 5000);
        }
    });
    
    // Add input focus effects
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
}

// ===== MODAL =====
function initModal() {
    const modal = document.getElementById('project-modal');
    const modalOverlay = modal.querySelector('.modal-overlay');
    const modalClose = modal.querySelector('.modal-close');
    
    function openProjectModal(project) {
        const modalBody = modal.querySelector('.modal-body');
        
        // Get the first link for demo and second for code
        const demoLink = project.links.find(link => link.title === 'View Live') || project.links[0];
        const codeLink = project.links.find(link => link.title === 'View Code') || project.links[1];
        
        modalBody.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="modal-project-image">
            <h2 class="modal-project-title">${project.title}</h2>
            <div class="modal-project-tags">
                ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
            </div>
            <p class="modal-project-description">${project.desc}</p>
            <div class="modal-project-links">
                <a href="${codeLink?.url || '#'}" target="_blank" title="${codeLink?.title || 'View Code'}">
                    <i class="fab fa-github"></i>
                </a>
                <a href="${demoLink?.url || '#'}" target="_blank" title="${demoLink?.title || 'Live Demo'}">
                    <i class="fas fa-external-link-alt"></i>
                </a>
            </div>
        `;
        
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }
    
    // Close modal events
    modalOverlay.addEventListener('click', closeModal);
    modalClose.addEventListener('click', closeModal);
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });
    
    // Make openProjectModal globally available
    window.openProjectModal = openProjectModal;
}

// ===== TIMELINE =====
function initTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        gsap.from(item, {
            duration: 1,
            x: index % 2 === 0 ? -100 : 100,
            opacity: 0,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });
}

// ===== PARTICLE SYSTEM =====
function initParticles() {
    const particlesContainer = document.querySelector('.hero-particles');
    if (!particlesContainer) return;
    
    // Clear existing particles
    particlesContainer.innerHTML = '';
    
    const isDarkMode = document.body.getAttribute('data-theme') === 'dark';
    
    if (isDarkMode) {
        // Create beautiful stars for dark mode
        createStarrySky(particlesContainer);
    } else {
        // Create regular particles for light mode
        createRegularParticles(particlesContainer);
    }
}

function createStarrySky(container) {
    // Create different types of stars
    const starTypes = [
        { size: '2px', opacity: 0.8, count: 8, animation: 'twinkle' }, // Further reduced from 15
        { size: '3px', opacity: 0.6, count: 5, animation: 'twinkle-slow' }, // Further reduced from 10
        { size: '1px', opacity: 0.4, count: 10, animation: 'twinkle-fast' }, // Further reduced from 20
        { size: '4px', opacity: 0.9, count: 3, animation: 'pulse' } // Further reduced from 5
    ];
    
    starTypes.forEach(type => {
        for (let i = 0; i < type.count; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.cssText = `
                position: absolute;
                width: ${type.size};
                height: ${type.size};
                background: #ffffff;
                border-radius: 50%;
                pointer-events: none;
                opacity: ${type.opacity};
                animation: ${type.animation} ${Math.random() * 3 + 2}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
                box-shadow: 0 0 ${parseInt(type.size) * 2}px rgba(255, 255, 255, 0.8);
            `;
            
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            
            container.appendChild(star);
        }
    });
    
    // Add shooting stars occasionally
    setInterval(() => {
        if (Math.random() < 0.3) { // 30% chance every interval
            createShootingStar(container);
        }
    }, 3000);
}

function createShootingStar(container) {
    const shootingStar = document.createElement('div');
    shootingStar.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: linear-gradient(45deg, #ffffff, transparent);
        border-radius: 50%;
        pointer-events: none;
        top: ${Math.random() * 50}%;
        left: ${Math.random() * 100}%;
        animation: shooting-star 2s linear forwards;
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
    `;
    
    container.appendChild(shootingStar);
    
    setTimeout(() => {
        if (shootingStar.parentNode) {
            shootingStar.parentNode.removeChild(shootingStar);
        }
    }, 2000);
}

function createRegularParticles(container) {
    for (let i = 0; i < 10; i++) { // Further reduced from 20 to 10
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
        `;
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        
        container.appendChild(particle);
    }
}

// ===== EASTER EGGS =====
function initEasterEggs() {
    // Konami code
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.keyCode);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            triggerEasterEgg();
        }
    });
    
    function triggerEasterEgg() {
        // Create rainbow effect
        gsap.to('body', {
            duration: 0.1,
            backgroundColor: '#ff0000',
            yoyo: true,
            repeat: 10,
            onComplete: () => {
                gsap.to('body', {
                    duration: 0.5,
                    backgroundColor: 'var(--bg-primary)'
                });
            }
        });
        
        // Show easter egg message
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--primary);
            color: white;
            padding: 20px;
            border-radius: 10px;
            z-index: 10000;
            font-weight: bold;
        `;
        message.textContent = '🎉 You found the easter egg! 🎉';
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            document.body.removeChild(message);
        }, 3000);
    }
}

// ===== 3D PROJECT CARDS =====
function init3DProjectCards() {
    // Initial call for any existing project cards
    apply3DEffectsToProjectCards();
}

function apply3DEffectsToProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    // Applying 3D effects to project cards
    
    projectCards.forEach(card => {
        // Skip if already has 3D effects applied
        if (card.dataset.has3DEffects === 'true') return;
        
        let isHovered = false;
        
        // Add 3D transform styles
        card.style.transformStyle = 'preserve-3d';
        card.style.transition = 'transform 0.1s ease';
        
        card.addEventListener('mouseenter', () => {
            isHovered = true;
        });
        
        card.addEventListener('mouseleave', () => {
            isHovered = false;
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
        
        card.addEventListener('mousemove', (e) => {
            if (!isHovered) return;
            
            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Calculate mouse position relative to card center
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;
            
            // Calculate rotation based on mouse position
            // Normalize mouse position to -1 to 1 range
            const normalizedX = mouseX / (rect.width / 2);
            const normalizedY = mouseY / (rect.height / 2);
            
            // Apply rotation with smooth limits
            const maxRotation = 15; // Maximum rotation in degrees
            const rotationX = -normalizedY * maxRotation;
            const rotationY = normalizedX * maxRotation;
            
            // Apply scale effect based on distance from center
            const distance = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
            const maxDistance = Math.sqrt((rect.width / 2) * (rect.width / 2) + (rect.height / 2) * (rect.height / 2));
            const scale = 1 + (distance / maxDistance) * 0.05; // Subtle scale effect
            
            card.style.transform = `perspective(1000px) rotateX(${rotationX}deg) rotateY(${rotationY}deg) scale(${scale})`;
        });
        
        // Add tilt effect on touch devices
        card.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const touchX = touch.clientX - centerX;
            const touchY = touch.clientY - centerY;
            
            const normalizedX = touchX / (rect.width / 2);
            const normalizedY = touchY / (rect.height / 2);
            
            const maxRotation = 10;
            const rotationX = -normalizedY * maxRotation;
            const rotationY = normalizedX * maxRotation;
            
            card.style.transform = `perspective(1000px) rotateX(${rotationX}deg) rotateY(${rotationY}deg) scale(1.02)`;
        });
        
        card.addEventListener('touchend', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
        
        // Mark as having 3D effects applied
        card.dataset.has3DEffects = 'true';
    });
}

// ===== PARALLAX EFFECTS =====
function initParallaxEffects() {
    // Create parallax layers
    const parallaxLayers = [
        { selector: '.hero-background', speed: 0.1 },
        { selector: '.floating-elements', speed: 0.3 },
        { selector: '.hero-particles', speed: 0.2 },
        { selector: '.scroll-indicator', speed: 0.5 }
    ];
    
    parallaxLayers.forEach(layer => {
        const elements = document.querySelectorAll(layer.selector);
        elements.forEach(element => {
            gsap.to(element, {
                y: -100 * layer.speed,
                ease: 'none',
                scrollTrigger: {
                    trigger: element,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });
        });
    });
    
    // Advanced parallax with mouse movement
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });
    
    // Apply mouse parallax to hero elements
    function updateMouseParallax() {
        const heroElements = document.querySelectorAll('.hero-text, .hero-visual');
        heroElements.forEach((element, index) => {
            const speed = (index + 1) * 0.1;
            gsap.to(element, {
                x: mouseX * 50 * speed,
                y: mouseY * 50 * speed,
                duration: 0.1,
                ease: 'power2.out'
            });
        });
        requestAnimationFrame(updateMouseParallax);
    }
    updateMouseParallax();
}

// ===== MORPHING SHAPES =====
function initMorphingShapes() {
    // Create morphing background shapes
    const shapesContainer = document.createElement('div');
    shapesContainer.className = 'morphing-shapes';
    shapesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    document.body.appendChild(shapesContainer);
    
    // Create multiple morphing shapes
    const shapes = [];
    const shapeCount = 1; // Optimized for performance
    
    for (let i = 0; i < shapeCount; i++) {
        const shape = document.createElement('div');
        shape.className = 'morphing-shape';
        shape.style.cssText = `
            position: absolute;
            width: ${Math.random() * 200 + 100}px;
            height: ${Math.random() * 200 + 100}px;
            background: linear-gradient(45deg, var(--primary), var(--secondary));
            border-radius: 50%;
            opacity: 0.1;
            filter: blur(20px);
            animation: morph-shape ${Math.random() * 10 + 10}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        
        shape.style.left = Math.random() * 100 + '%';
        shape.style.top = Math.random() * 100 + '%';
        
        shapesContainer.appendChild(shape);
        shapes.push(shape);
    }
    
    // Add CSS for morphing animation
    const morphStyle = document.createElement('style');
    morphStyle.textContent = `
        @keyframes morph-shape {
            0%, 100% { 
                border-radius: 50%;
                transform: scale(1) rotate(0deg);
            }
            25% { 
                border-radius: 30%;
                transform: scale(1.2) rotate(90deg);
            }
            50% { 
                border-radius: 70%;
                transform: scale(0.8) rotate(180deg);
            }
            75% { 
                border-radius: 40%;
                transform: scale(1.1) rotate(270deg);
            }
        }
    `;
    document.head.appendChild(morphStyle);
}

// ===== PARTICLE PHYSICS =====
function initParticlePhysics() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-physics';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    
    document.body.appendChild(particleContainer);
    
    const particles = [];
    const particleCount = 6; // Optimized for performance
    let mouseX = 0;
    let mouseY = 0;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'physics-particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: var(--primary);
            border-radius: 50%;
            pointer-events: none;
            opacity: 0.6;
            transition: all 0.3s ease;
        `;
        
        particle.x = Math.random() * window.innerWidth;
        particle.y = Math.random() * window.innerHeight;
        particle.vx = (Math.random() - 0.5) * 2;
        particle.vy = (Math.random() - 0.5) * 2;
        
        particle.style.left = particle.x + 'px';
        particle.style.top = particle.y + 'px';
        
        particleContainer.appendChild(particle);
        particles.push(particle);
    }
    
    // Mouse tracking
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Physics animation
    function animateParticles() {
        particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bounce off walls
            if (particle.x <= 0 || particle.x >= window.innerWidth) {
                particle.vx *= -1;
            }
            if (particle.y <= 0 || particle.y >= window.innerHeight) {
                particle.vy *= -1;
            }
            
            // Mouse attraction
            const dx = mouseX - particle.x;
            const dy = mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx += (dx / distance) * force * 0.1;
                particle.vy += (dy / distance) * force * 0.1;
                
                // Scale and opacity effect
                particle.style.transform = `scale(${1 + force * 0.5})`;
                particle.style.opacity = 0.6 + force * 0.4;
            } else {
                particle.style.transform = 'scale(1)';
                particle.style.opacity = 0.6;
            }
            
            // Apply position
            particle.style.left = particle.x + 'px';
            particle.style.top = particle.y + 'px';
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
}

// ===== TEXT SCRAMBLE EFFECTS =====
// Removed text scramble effects as requested

// ===== PERFORMANCE METRICS =====
function initPerformanceMetrics() {
    // Create performance metrics display
    const metricsContainer = document.createElement('div');
    metricsContainer.className = 'performance-metrics';
    metricsContainer.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 15px;
        border-radius: 8px;
        font-family: var(--font-mono);
        font-size: 12px;
        z-index: 1000;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
    `;
    
    document.body.appendChild(metricsContainer);
    
    // FPS counter
    let frameCount = 0;
    let lastTime = performance.now();
    let fps = 0;
    
    function updateFPS() {
        frameCount++;
        const currentTime = performance.now();
        
        if (currentTime - lastTime >= 1000) {
            fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
            frameCount = 0;
            lastTime = currentTime;
        }
        
        requestAnimationFrame(updateFPS);
    }
    updateFPS();
    
    // Load time
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    
    // Bundle size (simulated)
    const bundleSize = Math.round(Math.random() * 500 + 200); // Simulated bundle size
    
    // Lighthouse score (simulated)
    const lighthouseScore = Math.round(Math.random() * 20 + 80); // Simulated score
    
    // Update metrics display
    function updateMetrics() {
        const fpsColor = fps > 50 ? '#10b981' : fps > 30 ? '#f59e0b' : '#ef4444';
        const scoreColor = lighthouseScore > 90 ? '#10b981' : lighthouseScore > 70 ? '#f59e0b' : '#ef4444';
        
        metricsContainer.innerHTML = `
            <div style="margin-bottom: 8px;">
                <strong>Performance Metrics</strong>
            </div>
            <div style="margin-bottom: 4px;">
                FPS: <span style="color: ${fpsColor};">${fps}</span>
            </div>
            <div style="margin-bottom: 4px;">
                Load Time: <span style="color: #3b82f6;">${loadTime}ms</span>
            </div>
            <div style="margin-bottom: 4px;">
                Bundle Size: <span style="color: #8b5cf6;">${bundleSize}KB</span>
            </div>
            <div>
                Lighthouse: <span style="color: ${scoreColor};">${lighthouseScore}/100</span>
            </div>
        `;
    }
    
    updateMetrics();
    setInterval(updateMetrics, 1000);
    
    // Toggle metrics visibility
    let metricsVisible = true;
    document.addEventListener('keydown', (e) => {
        if (e.key === 'p' && e.ctrlKey) {
            metricsVisible = !metricsVisible;
            metricsContainer.style.display = metricsVisible ? 'block' : 'none';
        }
    });
}

// ===== PERFORMANCE MONITORING =====
function initPerformanceMonitoring() {
    let frameCount = 0;
    let lastTime = performance.now();
    
    function monitorFPS() {
        frameCount++;
        const currentTime = performance.now();
        
        if (currentTime - lastTime >= 1000) {
            const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
            
            // Optimize if FPS is low
            if (fps < 30) {
                document.body.classList.add('low-performance');
            } else {
                document.body.classList.remove('low-performance');
            }
            
            frameCount = 0;
            lastTime = currentTime;
        }
        
        requestAnimationFrame(monitorFPS);
    }
    
    monitorFPS();
}

// ===== ADVANCED UI ELEMENTS =====
function initAdvancedUIElements() {
    initToastNotifications();
    initEnhancedModals();
    initCustomScrollbars();
}

// ===== FLOATING ACTION BUTTONS =====
// Removed floating action buttons to prevent interference with existing floating elements

// ===== TOAST NOTIFICATIONS =====
function initToastNotifications() {
    const toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
    
    // Global toast function
    window.showToast = function(title, type = 'info', message = '') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };
        
        toast.innerHTML = `
            <div class="toast-header">
                <div>
                    <i class="toast-icon ${icons[type]}"></i>
                    <span class="toast-title">${title}</span>
                </div>
                <button class="toast-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            ${message ? `<div class="toast-message">${message}</div>` : ''}
        `;
        
        toastContainer.appendChild(toast);
        
        // Show toast
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            hideToast(toast);
        }, 5000);
        
        // Close button functionality
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => {
            hideToast(toast);
        });
        
        return toast;
    };
    
    function hideToast(toast) {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }
    
    // Show welcome toast
    setTimeout(() => {
        showToast('Welcome!', 'success', 'Thanks for visiting my portfolio');
    }, 2000);
}

// ===== ENHANCED MODALS =====
function initEnhancedModals() {
    const modal = document.getElementById('project-modal');
    const modalOverlay = modal.querySelector('.modal-overlay');
    const modalContent = modal.querySelector('.modal-content');
    const modalClose = modal.querySelector('.modal-close');
    
    function openModal() {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
        
        // Add entrance animation
        gsap.fromTo(modalContent, 
            { 
                scale: 0.8, 
                y: 50, 
                opacity: 0 
            },
            { 
                scale: 1, 
                y: 0, 
                opacity: 1, 
                duration: 0.4, 
                ease: 'back.out(1.7)' 
            }
        );
        
        // Add overlay animation
        gsap.fromTo(modalOverlay,
            { opacity: 0 },
            { opacity: 1, duration: 0.3 }
        );
    }
    
    function closeModal() {
        // Add exit animation
        gsap.to(modalContent, {
            scale: 0.8,
            y: 50,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                modal.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
        
        gsap.to(modalOverlay, {
            opacity: 0,
            duration: 0.3
        });
    }
    
    // Override existing modal functions
    window.openProjectModal = function(project) {
        const modalBody = modal.querySelector('.modal-body');
        
        // Get the first link for demo and second for code
        const demoLink = project.links.find(link => link.title === 'View Live') || project.links[0];
        const codeLink = project.links.find(link => link.title === 'View Code') || project.links[1];
        
        modalBody.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="modal-project-image">
            <h2 class="modal-project-title">${project.title}</h2>
            <div class="modal-project-tags">
                ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
            </div>
            <p class="modal-project-description">${project.desc}</p>
            <div class="modal-project-links">
                <a href="${codeLink?.url || '#'}" target="_blank" title="${codeLink?.title || 'View Code'}">
                    <i class="fab fa-github"></i>
                </a>
                <a href="${demoLink?.url || '#'}" target="_blank" title="${demoLink?.title || 'Live Demo'}">
                    <i class="fas fa-external-link-alt"></i>
                </a>
            </div>
        `;
        
        openModal();
        
        // Show toast notification
        showToast('Project opened!', 'info', `Viewing ${project.title}`);
    };
    
    // Close modal events
    modalOverlay.addEventListener('click', closeModal);
    modalClose.addEventListener('click', closeModal);
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });
}

// ===== CUSTOM SCROLLBARS =====
function initCustomScrollbars() {
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--primary), var(--secondary));
        z-index: 10001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    // Update progress bar on scroll
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== GLOBAL FUNCTIONS =====
window.smoothScrollTo = function(targetId) {
    const target = document.querySelector(targetId);
    if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
};

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        0% { width: 0; height: 0; opacity: 1; }
        100% { width: 200vw; height: 200vh; opacity: 0; }
    }
    
    .low-performance .floating-elements,
    .low-performance .hero-particles {
        display: none;
    }
    
    .success-message,
    .error-message {
        padding: 12px;
        border-radius: 8px;
        margin-top: 16px;
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .success-message {
        background: rgba(16, 185, 129, 0.1);
        color: #10b981;
    }
    
    .error-message {
        background: rgba(239, 68, 68, 0.1);
        color: #ef4444;
    }
`;
document.head.appendChild(style);