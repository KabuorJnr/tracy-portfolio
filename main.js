/* ==========================================================================
   Tracy Akinyi Abega - Graphic Designer Portfolio JavaScript
   Handles Theme Switch, Typewriter, Video Modal, Portfolio Modal, Scrollspy, Filters, & Forms
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Typewriter Animation --- */
    const typingTextElement = document.getElementById('typingText');
    const roles = [
        "Graphic Designer.",
        "Visual Artist.",
        "Brand & Campaign Strategist.",
        "Publication & Event Designer.",
        "Uwezo Fund & KBC Designer."
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeEffect() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typingTextElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingTextElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at full word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500; // Pause before typing next word
        }

        setTimeout(typeEffect, typeSpeed);
    }

    if (typingTextElement) {
        typeEffect();
    }

    /* --- 2. Dark / Light Theme Toggle --- */
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const htmlElement = document.documentElement;
    const bodyElement = document.body;

    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('tracy_portfolio_theme') || 'dark';
    setTheme(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    function setTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        if (theme === 'light') {
            bodyElement.classList.remove('dark-version');
            bodyElement.classList.add('light-version');
        } else {
            bodyElement.classList.remove('light-version');
            bodyElement.classList.add('dark-version');
        }
        localStorage.setItem('tracy_portfolio_theme', theme);
    }

    /* --- 3. Mobile Navigation Drawer --- */
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const drawerCloseBtn = document.getElementById('drawerCloseBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const mobileDrawerOverlay = document.getElementById('mobileDrawerOverlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    function openMobileDrawer() {
        mobileDrawer.classList.add('active');
        mobileDrawerOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileDrawer() {
        mobileDrawer.classList.remove('active');
        mobileDrawerOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileDrawer);
    if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeMobileDrawer);
    if (mobileDrawerOverlay) mobileDrawerOverlay.addEventListener('click', closeMobileDrawer);

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileDrawer);
    });

    /* --- 4. Scrollspy & Sticky Header --- */
    const navbar = document.getElementById('navbar');
    const backToTopBtn = document.getElementById('backToTopBtn');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-menu .nav-link');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Sticky Navbar shadow & Back to Top visibility
        if (scrollY > 100) {
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        if (scrollY > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }

        // Active Section Scrollspy
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* --- 5. YouTube Video Modal Lightbox --- */
    const videoModalOverlay = document.getElementById('videoModalOverlay');
    const videoModalCloseBtn = document.getElementById('videoModalCloseBtn');
    const videoModalIframe = document.getElementById('videoModalIframe');
    const videoModalTitle = document.getElementById('videoModalTitle');
    const playVideoButtons = document.querySelectorAll('.play-video-btn, .play-video-link');

    playVideoButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const videoId = btn.getAttribute('data-video-id');
            const videoTitle = btn.getAttribute('data-video-title') || 'Motion Video Reel';

            if (videoId) {
                videoModalIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
                videoModalTitle.textContent = videoTitle;
                videoModalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function closeVideoModal() {
        videoModalOverlay.classList.remove('active');
        videoModalIframe.src = '';
        document.body.style.overflow = '';
    }

    if (videoModalCloseBtn) videoModalCloseBtn.addEventListener('click', closeVideoModal);
    if (videoModalOverlay) {
        videoModalOverlay.addEventListener('click', (e) => {
            if (e.target === videoModalOverlay) {
                closeVideoModal();
            }
        });
    }

    /* --- 6. Portfolio Category Filter --- */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    /* --- 7. Portfolio Detail Modal --- */
    const portfolioModalOverlay = document.getElementById('portfolioModalOverlay');
    const portfolioModalCloseBtn = document.getElementById('portfolioModalCloseBtn');
    const portfolioModalImg = document.getElementById('portfolioModalImg');
    const portfolioModalBadge = document.getElementById('portfolioModalBadge');
    const portfolioModalTitle = document.getElementById('portfolioModalTitle');
    const portfolioModalRole = document.getElementById('portfolioModalRole');
    const portfolioModalDesc = document.getElementById('portfolioModalDesc');
    const portfolioModalTags = document.getElementById('portfolioModalTags');

    // Attach click to each portfolio card
    portfolioCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't open modal if they clicked an external link
            if (e.target.closest('a')) return;

            const title = card.getAttribute('data-title');
            const role = card.getAttribute('data-role');
            const badge = card.getAttribute('data-badge');
            const desc = card.getAttribute('data-desc');
            const tags = card.getAttribute('data-tags');
            const img = card.getAttribute('data-img');

            if (title && portfolioModalOverlay) {
                portfolioModalImg.src = img;
                portfolioModalImg.alt = title;
                portfolioModalBadge.textContent = badge;
                portfolioModalTitle.textContent = title;
                portfolioModalRole.textContent = 'Role: ' + role;
                portfolioModalDesc.textContent = desc;

                // Build tag pills
                portfolioModalTags.innerHTML = '';
                if (tags) {
                    tags.split(', ').forEach(tag => {
                        const pill = document.createElement('span');
                        pill.className = 'tag-pill';
                        pill.innerHTML = `<i class="fa-solid fa-tag"></i> ${tag}`;
                        portfolioModalTags.appendChild(pill);
                    });
                }

                portfolioModalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function closePortfolioModal() {
        portfolioModalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (portfolioModalCloseBtn) portfolioModalCloseBtn.addEventListener('click', closePortfolioModal);
    if (portfolioModalOverlay) {
        portfolioModalOverlay.addEventListener('click', (e) => {
            if (e.target === portfolioModalOverlay) {
                closePortfolioModal();
            }
        });
    }

    // Close modals with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (portfolioModalOverlay && portfolioModalOverlay.classList.contains('active')) {
                closePortfolioModal();
            }
            if (videoModalOverlay && videoModalOverlay.classList.contains('active')) {
                closeVideoModal();
            }
        }
    });

    /* --- 8. Resume Tabs Switcher --- */
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const targetTabId = btn.getAttribute('data-tab');
            const targetPane = document.getElementById(targetTabId);

            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });

    /* --- 9. Contact Form Submission --- */
    const contactForm = document.getElementById('portfolioContactForm');
    const formStatusMessage = document.getElementById('formStatusMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const userName = document.getElementById('userName').value.trim();
            const userEmail = document.getElementById('userEmail').value.trim();
            const userSubject = document.getElementById('userSubject').value.trim();

            if (userName && userEmail && userSubject) {
                formStatusMessage.className = 'form-status-msg success';
                formStatusMessage.textContent = `Thank you, ${userName}! Your message has been sent successfully. Tracy will get back to you shortly at ${userEmail}.`;

                contactForm.reset();

                setTimeout(() => {
                    formStatusMessage.textContent = '';
                }, 8000);
            } else {
                formStatusMessage.className = 'form-status-msg error';
                formStatusMessage.textContent = 'Please fill out all required fields before submitting.';
            }
        });
    }
    /* --- 8. Portfolio Slideshow --- */
    const slides = document.querySelectorAll('.slideshow-slide');
    const dotsContainer = document.getElementById('slideshowDots');
    const prevBtn = document.getElementById('slidePrev');
    const nextBtn = document.getElementById('slideNext');
    let currentSlide = 0;
    let slideshowInterval;
    const SLIDE_DURATION = 4000;

    if (slides.length > 0 && dotsContainer) {
        // Create dots
        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.classList.add('slideshow-dot');
            if (i === 0) dot.classList.add('active');
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });

        function goToSlide(index) {
            slides[currentSlide].classList.remove('active');
            const dots = dotsContainer.querySelectorAll('.slideshow-dot');
            dots[currentSlide].classList.remove('active');

            currentSlide = index;

            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.remove('active');
            // Force reflow to restart the dot progress animation
            void dots[currentSlide].offsetWidth;
            dots[currentSlide].classList.add('active');
        }

        function nextSlide() {
            goToSlide((currentSlide + 1) % slides.length);
        }

        function prevSlide() {
            goToSlide((currentSlide - 1 + slides.length) % slides.length);
        }

        // Arrow controls
        if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoplay(); });
        if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoplay(); });

        // Auto-play
        function startAutoplay() {
            slideshowInterval = setInterval(nextSlide, SLIDE_DURATION);
        }

        function resetAutoplay() {
            clearInterval(slideshowInterval);
            startAutoplay();
        }

        startAutoplay();

        // Pause on hover
        const slideshowEl = document.getElementById('portfolioSlideshow');
        if (slideshowEl) {
            slideshowEl.addEventListener('mouseenter', () => clearInterval(slideshowInterval));
            slideshowEl.addEventListener('mouseleave', startAutoplay);
        }
    }

});
