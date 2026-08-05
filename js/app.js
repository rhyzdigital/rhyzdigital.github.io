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
        if (!nav || !navToggle) return;

        scrollPosition = window.scrollY;
        nav.classList.add('open');
        navToggle.classList.add('active');
        navToggle.setAttribute('aria-expanded', 'true');
        navToggle.setAttribute('aria-label', 'Close navigation');
        document.body.classList.add('nav-open');
        document.body.style.top = `-${scrollPosition}px`;
    };

    const closeMenu = (restorePosition = true) => {
        if (!nav || !navToggle) return;

        nav.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open navigation');
        document.body.classList.remove('nav-open');
        document.body.style.top = '';

        if (restorePosition) {
            window.scrollTo({ top: scrollPosition, left: 0, behavior: 'auto' });
        }
    };

    navToggle?.addEventListener('click', () => {
        nav?.classList.contains('open') ? closeMenu(true) : openMenu();
    });

    navLinks.forEach((link) => {
        link.addEventListener('click', () => closeMenu(false));
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && nav?.classList.contains('open')) {
            closeMenu(true);
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 760 && nav?.classList.contains('open')) {
            closeMenu(true);
        }
    });

    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();

    if (year) year.textContent = new Date().getFullYear();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        revealItems.forEach((item) => item.classList.add('visible'));
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px'
    });

    revealItems.forEach((item) => observer.observe(item));
})();
