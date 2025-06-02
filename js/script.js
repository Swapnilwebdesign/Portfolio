// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Initialize EmailJS
    emailjs.init("BjqKQ2nCd1_UlFe6X"); // Replace with your EmailJS public key

    // Scroll to Top Button
    const scrollTopButton = document.getElementById('scroll-top');
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopButton.style.display = 'block';
            gsap.to(scrollTopButton, {
                opacity: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        } else {
            gsap.to(scrollTopButton, {
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => {
                    scrollTopButton.style.display = 'none';
                }
            });
        }
    });

    // Smooth scroll to top
    scrollTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Custom Cursor - Only for desktop
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    // Check if device is mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (!isMobile) {
        // Cursor movement
        document.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            gsap.to(cursorDot, {
                x: posX,
                y: posY,
                duration: 0.1,
                ease: 'power2.out'
            });

            gsap.to(cursorOutline, {
                x: posX,
                y: posY,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        // Cursor hover effects
        const hoverElements = document.querySelectorAll('a, button, input, textarea');
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                gsap.to(cursorOutline, {
                    scale: 1.5,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    duration: 0.3
                });
            });

            element.addEventListener('mouseleave', () => {
                gsap.to(cursorOutline, {
                    scale: 1,
                    backgroundColor: 'transparent',
                    borderColor: 'white',
                    duration: 0.3
                });
            });
        });
    } else {
        // Hide cursor elements on mobile
        cursorDot.style.display = 'none';
        cursorOutline.style.display = 'none';
    }

    // Page Transitions
    function createPageTransition() {
        const transition = document.createElement('div');
        transition.className = 'page-transition';
        document.body.appendChild(transition);
        return transition;
    }

    function navigateToSection(sectionId) {
        const transition = createPageTransition();
        const targetSection = document.getElementById(sectionId);

        // Animate out
        gsap.to(transition, {
            scaleY: 1,
            duration: 0.5,
            ease: 'power2.inOut',
            onComplete: () => {
                // Scroll to section
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });

                // Animate in
                gsap.to(transition, {
                    scaleY: 0,
                    duration: 0.5,
                    ease: 'power2.inOut',
                    onComplete: () => {
                        transition.remove();
                    }
                });
            }
        });
    }

    // Add click handlers to navigation links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            navigateToSection(targetId);
        });
    });

    // Hero section animations
    const tl = gsap.timeline();

    // Animate the heading
    tl.to('#hero-heading', {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out'
    })
    // Animate the subheading
    .to('#hero-subheading', {
        opacity: 1,
        duration: 1,
        ease: 'power2.out'
    }, '-=0.5');

    // Add hover animations for buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // About section animations
    const aboutTl = gsap.timeline({
        scrollTrigger: {
            trigger: '#about',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });

    aboutTl
        .to('#about-heading', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
        })
        .to('#about-text', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.4')
        .to('#about-highlights', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.4')
        .to('#resume-button', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, '-=0.4');

    // Separate animation for the counter section
    const counterTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.about-image',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });

    counterTl.to('.about-image', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out'
    });

    // Counter Animation
    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    }

    // Initialize counters when they come into view
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => {
                    animateCounter(counter);
                });
                counterObserver.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px' // Start animation slightly before the element is fully in view
    });

    // Observe the about section for counter animation
    const aboutSection = document.querySelector('.about-image');
    if (aboutSection) {
        counterObserver.observe(aboutSection);
    }

    // Projects section animations
    const projectsTl = gsap.timeline({
        scrollTrigger: {
            trigger: '#projects-heading',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });

    projectsTl
        .to('#projects-heading', {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out'
        })
        .to('.project-card', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out'
        }, '-=0.4');

    // Project filtering
    const projectTabs = document.querySelectorAll('.project-tab');
    const projectCards = document.querySelectorAll('.project-card');

    // Set Major Projects as default active tab
    projectTabs.forEach(tab => {
        if (tab.dataset.category === 'major') {
            tab.classList.add('bg-white', 'text-black');
        }
    });

    // Show only major projects by default
    projectCards.forEach(card => {
        if (card.dataset.category === 'major') {
            gsap.to(card, {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: 'power2.out'
            });
        } else {
            gsap.to(card, {
                opacity: 0,
                scale: 0.8,
                duration: 0.5,
                ease: 'power2.in',
                onComplete: () => {
                    card.style.display = 'none';
                }
            });
        }
    });

    projectTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active state from all tabs
            projectTabs.forEach(t => {
                t.classList.remove('bg-white', 'text-black');
            });

            // Add active state to clicked tab
            tab.classList.add('bg-white', 'text-black');

            // Get the selected category
            const category = tab.dataset.category;
            
            // First, fade out all cards
            const fadeOutPromises = Array.from(projectCards).map(card => {
                return new Promise(resolve => {
                    gsap.to(card, {
                        opacity: 0,
                        scale: 0.8,
                        duration: 0.5,
                        ease: 'power2.in',
                        onComplete: () => {
                            card.style.display = 'none';
                            resolve();
                        }
                    });
                });
            });

            // After all cards are faded out, fade in the selected category cards
            Promise.all(fadeOutPromises).then(() => {
                const selectedCards = Array.from(projectCards).filter(card => 
                    card.dataset.category === category
                );

                selectedCards.forEach((card, index) => {
                    card.style.display = 'block';
                    gsap.to(card, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.5,
                        delay: index * 0.2, // Add delay between each card
                        ease: 'power2.out'
                    });
                });
            });
        });
    });

    // Add hover animations for project cards
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Contact section animations
    const contactTl = gsap.timeline({
        scrollTrigger: {
            trigger: '#contact',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none none',
            once: true // Animation plays only once
        }
    });

    contactTl
        .to('#contact-heading', {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out'
        })
        .to('#contact-form', {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out'
        }, '-=0.4');

    // Ensure contact form is visible on mobile
    function checkContactVisibility() {
        const contactSection = document.getElementById('contact');
        const contactForm = document.getElementById('contact-form');
        const contactHeading = document.getElementById('contact-heading');
        
        if (window.innerHeight >= contactSection.offsetHeight) {
            // If viewport height is greater than section height, show immediately
            gsap.to(contactHeading, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
            gsap.to(contactForm, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
        }
    }

    // Check on load and resize
    window.addEventListener('load', checkContactVisibility);
    window.addEventListener('resize', checkContactVisibility);

    // Form submission handling
    const form = document.getElementById('contact-form');
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');

    function showToast(message, isSuccess = true) {
        toast.style.backgroundColor = isSuccess ? '#10B981' : '#EF4444';
        toastMessage.textContent = message;
        
        gsap.to(toast, {
            y: 0,
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out'
        });

        setTimeout(() => {
            gsap.to(toast, {
                y: '100%',
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in'
            });
        }, 3000);
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Disable button and show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        try {
            const formData = {
                name: form.name.value,
                email: form.email.value,
                message: form.message.value
            };

            // Send email using EmailJS
            await emailjs.send(
                'service_g8yurcq', // Replace with your EmailJS service ID
                'template_lc977zg', // Replace with your EmailJS template ID
                formData
            );

            // Show success message
            showToast('Message sent successfully!');
            form.reset();
        } catch (error) {
            // Show error message
            showToast('Failed to send message. Please try again.', false);
            console.error('EmailJS error:', error);
        } finally {
            // Re-enable button and restore text
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    });

    // Add input focus animations
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            gsap.to(input, {
                scale: 1.02,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        input.addEventListener('blur', () => {
            gsap.to(input, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Typing effect for subheading
    const subheadings = [
        "FREELANCER",
        "FRONTEND DEVELOPER",
        "PROBLEM SOLVER",
        "UI/UX DESIGNER"
    ];

    let currentSubheadingIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 50; // Faster typing speed
    let deletingSpeed = 30; // Faster deleting speed
    let pauseTime = 1500; // Shorter pause time

    function typeEffect() {
        const typingText = document.querySelector('.typing-text');
        const currentSubheading = subheadings[currentSubheadingIndex];
        
        if (isDeleting) {
            typingText.textContent = currentSubheading.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typingSpeed = deletingSpeed;
        } else {
            typingText.textContent = currentSubheading.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typingSpeed = 50;
        }

        if (!isDeleting && currentCharIndex === currentSubheading.length) {
            isDeleting = true;
            typingSpeed = pauseTime;
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentSubheadingIndex = (currentSubheadingIndex + 1) % subheadings.length;
            typingSpeed = 300; // Shorter delay between phrases
        }

        setTimeout(typeEffect, typingSpeed);
    }

    // Initialize typing effect when the page loads
    window.addEventListener('load', () => {
        setTimeout(typeEffect, 1000);
    });
});



// form//

