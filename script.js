// --- THEME: Apply saved theme instantly on page load (before DOMContentLoaded) ---
(function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.dataset.theme = savedTheme;
        // Set icon immediately if possible
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.innerHTML = savedTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        }
    }
})();

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Initialize Particles.js
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#ffffff'
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                }
            },
            opacity: {
                value: 0.5,
                random: false,
                anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#ffffff',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 6,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'repulse'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 400,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });

    // Preloader
    setTimeout(function() {
        const preloader = document.querySelector('.preloader');
        preloader.classList.add('hidden');
        
        // Enable body scroll
        document.body.style.overflow = 'visible';
    }, 1500);

    // Animated Counter for Stats
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        updateCounter();
    }

    // Animate skill bars
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-fill');
        skillBars.forEach(bar => {
            const level = bar.getAttribute('data-level');
            bar.style.width = level + '%';
        });
    }

    // Animate counters when in view
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    animateCounter(stat, target);
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe stats section
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    }

    // Observe skills section for skill bars
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        skillsObserver.observe(skillsSection);
    }

    // Cursor effects
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Follower with a slight delay
        setTimeout(function() {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 50);
    });

    // Scale effect on links and buttons
    const links = document.querySelectorAll('a, button, .btn, .filter-btn, .project-card, .skill-card');
    
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            cursorFollower.style.width = '60px';
            cursorFollower.style.height = '60px';
            cursorFollower.style.borderColor = 'var(--accent-color)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        
        link.addEventListener('mouseleave', function() {
            cursorFollower.style.width = '40px';
            cursorFollower.style.height = '40px';
            cursorFollower.style.borderColor = 'var(--primary-color)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });

    // Hide cursor when leaving the window
    document.addEventListener('mouseout', function(e) {
        if (e.relatedTarget === null) {
            cursor.style.opacity = '0';
            cursorFollower.style.opacity = '0';
        }
    });

    document.addEventListener('mouseover', function() {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '1';
    });

    // Mobile menu toggle
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');

    burger.addEventListener('click', function() {
        // Toggle nav
        navLinks.classList.toggle('active');
        
        // Burger animation
        this.classList.toggle('active');
        
        if (this.classList.contains('active')) {
            this.querySelector('.line1').style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            this.querySelector('.line2').style.opacity = '0';
            this.querySelector('.line3').style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            this.querySelector('.line1').style.transform = 'none';
            this.querySelector('.line2').style.opacity = '1';
            this.querySelector('.line3').style.transform = 'none';
        }
    });

    // Close mobile menu when clicking on links
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                burger.classList.remove('active');
                burger.querySelector('.line1').style.transform = 'none';
                burger.querySelector('.line2').style.opacity = '1';
                burger.querySelector('.line3').style.transform = 'none';
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('#header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Dark mode toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.querySelector('body');
    
    // --- THEME: Add fade transition for theme changes ---
    body.style.transition = 'background-color 0.5s, color 0.5s';
    
    // --- HERO: Animate hero section entrance with Intersection Observer ---
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.opacity = 0;
        heroSection.style.transform = 'translateY(40px)';
        const heroObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    heroSection.style.transition = 'opacity 1s cubic-bezier(.77,0,.18,1), transform 1s cubic-bezier(.77,0,.18,1)';
                    heroSection.style.opacity = 1;
                    heroSection.style.transform = 'translateY(0)';
                    observer.unobserve(heroSection);
                }
            });
        }, { threshold: 0.5 });
        heroObserver.observe(heroSection);
    }

    // --- HERO: Polish typewriter effect for smoother, more human typing ---
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        const words = typewriterElement.dataset.words.split(', ');
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 120;
        function type() {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 60 + Math.random() * 40;
            } else {
                typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 120 + Math.random() * 60;
            }
            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typeSpeed = 1200;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 600;
            }
            setTimeout(type, typeSpeed);
        }
        setTimeout(type, 1000);
    }

    // Smooth scrolling
    const scrollLinks = document.querySelectorAll('a[data-scroll]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Adjust for header height
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active section highlighting
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === '#' + current) {
                item.classList.add('active');
            }
        });
    });

    // Project filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Testimonial slider
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    const prevBtn = document.querySelector('.testimonial-btn.prev');
    const nextBtn = document.querySelector('.testimonial-btn.next');
    let currentSlide = 0;
    
    function showSlide(index) {
        testimonialCards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    if (prevBtn && nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentSlide = (currentSlide + 1) % testimonialCards.length;
            showSlide(currentSlide);
        });
        
        prevBtn.addEventListener('click', function() {
            currentSlide = (currentSlide - 1 + testimonialCards.length) % testimonialCards.length;
            showSlide(currentSlide);
        });
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                showSlide(index);
            });
        });
        
        // Auto slide
        setInterval(function() {
            if (!document.hidden) {
                nextBtn.click();
            }
        }, 5000);
    }

    // Progress bar animation
    const progressBars = document.querySelectorAll('.progress-fill');
    
    function animateProgressBars() {
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 300);
        });
    }
    
    // Animate on scroll into view
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateProgressBars();
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        skillsObserver.observe(skillsSection);
    }

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                showFormStatus('error', 'Please fill in all fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormStatus('error', 'Please enter a valid email address.');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            
            // Prepare email data
            const emailData = {
                to: 'jeanreotto12@gmail.com',
                from: email,
                subject: `Portfolio Contact: ${subject}`,
                message: `
                    Name: ${name}
                    Email: ${email}
                    Subject: ${subject}
                    
                    Message:
                    ${message}
                `
            };
            
            // Try EmailJS first, fallback to mailto if not configured
            if (typeof emailjs !== 'undefined') {
                emailjs.send('service_id', 'template_id', emailData)
                    .then(function(response) {
                        showFormStatus('success', 'Message sent successfully! I\'ll get back to you soon.');
                        contactForm.reset();
                    })
                    .catch(function(error) {
                        // Fallback to mailto
                        sendViaMailto(name, email, subject, message);
                    })
                    .finally(function() {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    });
            } else {
                // Fallback to mailto
                sendViaMailto(name, email, subject, message);
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    function showFormStatus(type, message) {
        const statusDiv = document.querySelector('.form-status');
        statusDiv.innerHTML = `
            <div class="${type}-message">
                <i class="fas fa-${type === 'success' ? 'check' : 'times'}-circle"></i>
                <span>${message}</span>
            </div>
        `;
        
        setTimeout(() => {
            statusDiv.innerHTML = '';
        }, 5000);
    }

    function sendViaMailto(name, email, subject, message) {
        const mailtoLink = `mailto:jeanreotto12@gmail.com?subject=Portfolio Contact: ${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`)}`;
        window.open(mailtoLink, '_blank');
        showFormStatus('success', 'Opening email client. Please send the email manually.');
    }

    // Add fadeIn animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);

    // --- PROJECT MODAL LOGIC ---
    const modal = document.getElementById('project-modal');
    const modalOverlay = modal ? modal.querySelector('.modal-overlay') : null;
    const modalClose = modal ? modal.querySelector('.modal-close') : null;
    const modalBody = modal ? modal.querySelector('.modal-body') : null;

    function openProjectModal(card) {
        if (!modal || !modalBody) return;
        // Extract info from card
        const imgSrc = card.querySelector('.project-img img')?.src;
        const title = card.querySelector('.project-title')?.textContent;
        const desc = card.querySelector('.project-desc')?.textContent;
        const tags = Array.from(card.querySelectorAll('.project-tags span')).map(t => t.textContent);
        const links = Array.from(card.querySelectorAll('.project-link'));
        // Build modal content
        let html = '';
        if (imgSrc) html += `<img src="${imgSrc}" alt="${title}" class="modal-project-img">`;
        if (title) html += `<h2 class="modal-project-title">${title}</h2>`;
        if (tags.length) html += `<div class="modal-project-tags">${tags.map(t => `<span>${t}</span>`).join(' ')}</div>`;
        if (desc) html += `<p class="modal-project-desc">${desc}</p>`;
        if (links.length) {
            html += '<div class="modal-project-links">';
            links.forEach(link => {
                const href = link.getAttribute('href');
                const icon = link.innerHTML;
                const title = link.getAttribute('title') || '';
                html += `<a href="${href}" target="_blank" rel="noopener" title="${title}">${icon}</a>`;
            });
            html += '</div>';
        }
        modalBody.innerHTML = html;
        modal.style.display = 'block';
        setTimeout(() => { modal.classList.add('open'); }, 10);
        document.body.style.overflow = 'hidden';
    }
    function closeProjectModal() {
        if (!modal) return;
        modal.classList.remove('open');
        setTimeout(() => { modal.style.display = 'none'; }, 300);
        document.body.style.overflow = '';
    }
    // Attach click listeners to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Only open modal if not clicking a project link
            if (e.target.closest('.project-link')) return;
            openProjectModal(card);
        });
    });
    // Close modal on overlay/click/ESC
    if (modalOverlay) modalOverlay.addEventListener('click', closeProjectModal);
    if (modalClose) modalClose.addEventListener('click', closeProjectModal);
    document.addEventListener('keydown', function(e) {
        if (modal && modal.style.display === 'block' && (e.key === 'Escape' || e.key === 'Esc')) {
            closeProjectModal();
        }
    });

    // --- DYNAMIC PROJECTS RENDERING ---
    const projectsGrid = document.getElementById('projects-grid');
    let allProjects = [];
    function renderProjects(projects) {
        if (!projectsGrid) return;
        projectsGrid.innerHTML = '';
        projects.forEach((project, idx) => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.setAttribute('data-category', project.category);
            card.setAttribute('data-aos', 'fade-up');
            card.setAttribute('data-aos-delay', 100 + idx * 100);
            card.innerHTML = `
                <div class="project-img">
                    <img src="${project.image.startsWith('/') ? project.image : '/' + project.image}" alt="${project.title}">
                    <div class="project-overlay">
                        <div class="project-links">
                            ${project.links.map(link => `<a href="${link.url}" class="project-link" title="${link.title}">${link.icon}</a>`).join('')}
                        </div>
                    </div>
                </div>
                <div class="project-info">
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
                    </div>
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-desc">${project.desc}</p>
                </div>
            `;
            projectsGrid.appendChild(card);
        });
        // Re-initialize AOS for new elements
        if (window.AOS) AOS.refresh();
        // Re-attach modal listeners
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', function(e) {
                if (e.target.closest('.project-link')) return;
                openProjectModal(card);
            });
        });
    }
    fetch('projects.json')
        .then(res => res.json())
        .then(data => {
            allProjects = data;
            renderProjects(allProjects);
        });
    // --- FILTER BUTTONS (update to work with dynamic cards) ---
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const filter = this.getAttribute('data-filter');
            const filtered = filter === 'all' ? allProjects : allProjects.filter(p => p.category === filter);
            renderProjects(filtered);
        });
    });

    // --- ENSURE BOTH THEME ATTRIBUTES ON LOAD ---
    if (!body.dataset.themeMode) body.dataset.themeMode = localStorage.getItem('themeMode') || 'light';
    if (!body.dataset.themeColor) body.dataset.themeColor = localStorage.getItem('themeColor') || 'blue';

    // --- THEME MODE (DARK/LIGHT) LOGIC ---
    function setThemeMode(mode) {
        body.dataset.themeMode = mode;
        localStorage.setItem('themeMode', mode);
        if (themeToggle) {
            themeToggle.innerHTML = mode === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        }
    }
    themeToggle.addEventListener('click', function() {
        const newMode = body.dataset.themeMode === 'dark' ? 'light' : 'dark';
        setThemeMode(newMode);
    });
    const savedThemeMode = localStorage.getItem('themeMode') || 'light';
    setThemeMode(savedThemeMode);

    // --- LIVE THEME SWITCHER LOGIC ---
    const themeDots = document.querySelectorAll('.theme-dot');
    function setColorTheme(theme) {
        body.dataset.themeColor = theme;
        localStorage.setItem('themeColor', theme);
        themeDots.forEach(dot => dot.classList.remove('active'));
        const activeDot = Array.from(themeDots).find(dot => dot.dataset.theme === theme);
        if (activeDot) activeDot.classList.add('active');
        // Debug: log current color and computed style
        console.log('Theme color set:', body.dataset.themeColor, getComputedStyle(body).getPropertyValue('--primary-color'));
    }
    themeDots.forEach(dot => {
        dot.addEventListener('click', function() {
            setColorTheme(this.dataset.theme);
        });
    });
    const savedColorTheme = localStorage.getItem('themeColor') || 'blue';
    setColorTheme(savedColorTheme);

    // --- SPOTIFY MODAL DRAGGABLE LOGIC ---
    const spotifyModal = document.getElementById('spotify-modal');
    const spotifyHeader = document.getElementById('spotify-modal-header');
    const spotifyClose = document.querySelector('.spotify-modal-close');
    const spotifyOpenBtn = document.getElementById('spotify-open-btn');
    const spotifyMinimize = document.querySelector('.spotify-modal-minimize');

    // Show modal on page load, hide open button
    if (spotifyModal) {
        spotifyModal.style.display = 'block';
        spotifyModal.classList.remove('minimized');
    }
    if (spotifyOpenBtn) spotifyOpenBtn.style.display = 'none';

    // Drag logic
    let isDragging = false, offsetX = 0, offsetY = 0;
    if (spotifyHeader && spotifyModal) {
        spotifyHeader.addEventListener('mousedown', function(e) {
            isDragging = true;
            const rect = spotifyModal.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
            document.body.style.userSelect = 'none';
        });
        document.addEventListener('mousemove', function(e) {
            if (isDragging) {
                spotifyModal.style.left = (e.clientX - offsetX) + 'px';
                spotifyModal.style.top = (e.clientY - offsetY) + 'px';
                spotifyModal.style.right = 'auto';
                spotifyModal.style.bottom = 'auto';
                spotifyModal.style.position = 'fixed';
            }
        });
        document.addEventListener('mouseup', function() {
            isDragging = false;
            document.body.style.userSelect = '';
        });
    }
    // Minimize logic
    if (spotifyMinimize && spotifyModal && spotifyOpenBtn) {
        spotifyMinimize.addEventListener('click', function() {
            spotifyModal.classList.add('minimized');
            spotifyOpenBtn.style.display = 'flex';
        });
    }
    // Close logic
    if (spotifyClose && spotifyModal && spotifyOpenBtn) {
        spotifyClose.addEventListener('click', function() {
            spotifyModal.style.display = 'none';
            spotifyOpenBtn.style.display = 'flex'; // Always show open button when closed
            console.log('Spotify modal closed, open button shown');
        });
    }
    // Open button logic
    if (spotifyOpenBtn && spotifyModal) {
        spotifyOpenBtn.addEventListener('click', function() {
            spotifyModal.style.display = 'block';
            spotifyModal.classList.remove('minimized');
            spotifyOpenBtn.style.display = 'none'; // Always hide open button when open
            console.log('Spotify modal opened, open button hidden');
        });
    }
    // Fallback: MutationObserver to always show open button if modal is hidden
    if (spotifyModal && spotifyOpenBtn) {
        const observer = new MutationObserver(() => {
            if (spotifyModal.style.display === 'none') {
                spotifyOpenBtn.style.display = 'flex';
            }
        });
        observer.observe(spotifyModal, { attributes: true, attributeFilter: ['style'] });
    }
});