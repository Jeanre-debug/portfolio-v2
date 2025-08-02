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
    initScrollAnimations();
    initStatsCounter();
    initSkillsAnimation();
    initProjects();
    initContactForm();
    initModal();
    initTimeline();
    initParticles();
    initEasterEggs();
    
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

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Fade in animations
    gsap.utils.toArray('.section-header, .skill-card, .project-card, .contact-card').forEach(element => {
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
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const level = entry.target.dataset.level;
                entry.target.style.width = level + '%';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// ===== PROJECTS =====
function initProjects() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectsGrid = document.getElementById('projects-grid');
    
    let projects = [];
    
    // Load projects from JSON file
    async function loadProjects() {
        try {
            const response = await fetch('projects.json');
            projects = await response.json();
            renderProjects(projects);
        } catch (error) {
            console.error('Error loading projects:', error);
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
            
            contactForm.reset();
            
        } catch (error) {
            // Show error message
            formStatus.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-circle"></i>
                    Something went wrong. Please try again.
                </div>
            `;
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Clear status after 5 seconds
            setTimeout(() => {
                formStatus.innerHTML = '';
            }, 5000);
        }
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
        { size: '2px', opacity: 0.8, count: 30, animation: 'twinkle' },
        { size: '3px', opacity: 0.6, count: 20, animation: 'twinkle-slow' },
        { size: '1px', opacity: 0.4, count: 40, animation: 'twinkle-fast' },
        { size: '4px', opacity: 0.9, count: 10, animation: 'pulse' }
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
    for (let i = 0; i < 50; i++) {
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