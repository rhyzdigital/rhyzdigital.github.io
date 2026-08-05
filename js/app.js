(() => {
    const header = document.querySelector('.site-header');
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.site-nav');
    const navLinks = document.querySelectorAll('.site-nav a');
    const year = document.getElementById('year');
    const revealItems = document.querySelectorAll('.reveal');

    const updateHeader = () => {
        header?.classList.toggle('scrolled', window.scrollY > 20);
    };

    const closeMenu = () => {
        nav?.classList.remove('open');
        navToggle?.classList.remove('active');
        navToggle?.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
    };

    navToggle?.addEventListener('click', () => {
        const isOpen = nav?.classList.toggle('open');
        navToggle.classList.toggle('active', isOpen);
        navToggle.setAttribute('aria-expanded', String(Boolean(isOpen)));
        document.body.classList.toggle('nav-open', Boolean(isOpen));
    });

    navLinks.forEach((link) => link.addEventListener('click', closeMenu));

    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();

    if (year) {
        year.textContent = new Date().getFullYear();
    }

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
