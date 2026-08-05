(() => {
    const header = document.querySelector('.site-header');
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.site-nav');
    const navLinks = document.querySelectorAll('.site-nav a');
    const year = document.getElementById('year');
    const revealItems = document.querySelectorAll('.reveal');

    let scrollPosition = 0;

    const updateHeader = () => {
        header?.classList.toggle('scrolled', window.scrollY > 20);
    };

    const openMenu = () => {
        if (!nav || !navToggle) {
            return;
        }

        scrollPosition = window.scrollY;

        nav.classList.add('open');
        navToggle.classList.add('active');
        navToggle.setAttribute('aria-expanded', 'true');

        document.body.classList.add('nav-open');
        document.body.style.top = `-${scrollPosition}px`;
    };

    const closeMenu = () => {
        if (!nav || !navToggle) {
            return;
        }

        nav.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');

        document.body.classList.remove('nav-open');
        document.body.style.top = '';

        window.scrollTo({
            top: scrollPosition,
            left: 0,
            behavior: 'instant'
        });
    };

    navToggle?.addEventListener('click', () => {
        if (nav?.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    navLinks.forEach((link) => {
        link.addEventListener('click', closeMenu);
    });

    // Close the menu when Escape is pressed.
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && nav?.classList.contains('open')) {
            closeMenu();
        }
    });

    // Reset the mobile menu if the screen is resized to desktop width.
    window.addEventListener('resize', () => {
        if (window.innerWidth > 760 && nav?.classList.contains('open')) {
            closeMenu();
        }
    });

    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;

    if (
        prefersReducedMotion ||
        !('IntersectionObserver' in window)
    ) {
        revealItems.forEach((item) => {
            item.classList.add('visible');
        });

        return;
    }

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            });
        },
        {
            threshold: 0.12,
            rootMargin: '0px 0px -40px'
        }
    );

    revealItems.forEach((item) => {
        observer.observe(item);
    });
})();