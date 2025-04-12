// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    setTimeout(function() {
        const preloader = document.querySelector('.preloader');
        preloader.classList.add('hidden');
        
        // Enable body scroll
        document.body.style.overflow = 'visible';
    }, 1500);

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
    
    themeToggle.addEventListener('click', function() {
        body.dataset.theme = body.dataset.theme === 'dark' ? 'light' : 'dark';
        
        // Change icon
        if (body.dataset.theme === 'dark') {
            this.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            this.innerHTML = '<i class="fas fa-moon"></i>';
        }
        
        // Save theme preference
        localStorage.setItem('theme', body.dataset.theme);
    });
    
    // Check saved theme
    if (localStorage.getItem('theme') === 'dark') {
        body.dataset.theme = 'dark';
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Typewriter effect
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        const words = typewriterElement.dataset.words.split(', ');
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;
        
        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }
            
            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typeSpeed = 1000; // Pause at the end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500; // Pause before typing new word
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
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // Projects filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 300);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
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
    const skillsSection = document.querySelector('.skills');
    
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
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.querySelector('.success-message');
    const errorMessage = document.querySelector('.error-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formDataObj = {};
            
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
            
            // Simulate form submission
            setTimeout(function() {
                successMessage.style.display = 'block';
                errorMessage.style.display = 'none';
                
                // Reset form
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(function() {
                    successMessage.style.display = 'none';
                }, 5000);
            }, 1500);
        });
    }
});