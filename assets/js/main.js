document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle — uses Tailwind 'class' darkMode strategy
    const themeToggles = document.querySelectorAll('#theme-toggle, .theme-toggle-mobile');
    const htmlElement = document.documentElement;

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        htmlElement.classList.add('dark');
    } else {
        htmlElement.classList.remove('dark');
    }
    updateThemeIcon(savedTheme);

    themeToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const isDark = htmlElement.classList.contains('dark');
            const newTheme = isDark ? 'light' : 'dark';
            if (newTheme === 'dark') {
                htmlElement.classList.add('dark');
            } else {
                htmlElement.classList.remove('dark');
            }
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    });

    function updateThemeIcon(theme) {
        themeToggles.forEach(btn => {
            const icon = btn.querySelector('i');
            if (icon) {
                if (theme === 'dark') {
                    icon.setAttribute('data-lucide', 'sun');
                } else {
                    icon.setAttribute('data-lucide', 'moon');
                }
            }
        });
        lucide.createIcons();
    }

    // RTL Toggle
    const rtlToggles = document.querySelectorAll('#rtl-toggle, .rtl-toggle-mobile');
    if (rtlToggles.length > 0) {
        const savedDir = localStorage.getItem('dir') || 'ltr';
        htmlElement.setAttribute('dir', savedDir);

        rtlToggles.forEach(btn => {
            btn.addEventListener('click', () => {
                const currentDir = htmlElement.getAttribute('dir');
                const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
                htmlElement.setAttribute('dir', newDir);
                localStorage.setItem('dir', newDir);
            });
        });
    }

    // Mobile Menu Toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuBtn && mobileMenu) {
        const menuIcon = menuBtn.querySelector('i');

        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex');
            
            if (mobileMenu.classList.contains('hidden')) {
                menuIcon.setAttribute('data-lucide', 'menu');
            } else {
                menuIcon.setAttribute('data-lucide', 'x');
            }
            lucide.createIcons();
        });
    }

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Live Score Ticker Mock Data
    const tickerContent = document.querySelector('.animate-marquee');
    if (tickerContent) {
        const scores = [
            "WIFFLE WARRIORS 12 - 8 SLUGGER SQUAD",
            "BATTING KINGS 15 - 14 HOME RUN HEROES",
            "CAGE KINGS 10 - 2 FASTBALL FLIERS",
            "DIAMOND DUSTERS 5 - 9 CURVEBALL CREW"
        ];
        
        // Duplicate for seamless loop
        const content = scores.join(' • ') + ' • ';
        tickerContent.innerHTML = `<span class="px-4">${content}</span><span class="px-4">${content}</span>`;
    }

    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / 100;

        const updateCount = () => {
            const currentCount = +counter.innerText;
            if (currentCount < target) {
                counter.innerText = Math.ceil(currentCount + increment);
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target;
            }
        };

        const counterObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCount();
                counterObserver.unobserve(counter);
            }
        });
        counterObserver.observe(counter);
    });

    // Header Scroll Effect
    const mainHeader = document.getElementById('main-header');
    if (mainHeader) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                mainHeader.classList.add('bg-slate-900/90', 'backdrop-blur-md', 'border-b', 'border-white/10');
                mainHeader.classList.remove('bg-transparent');
            } else {
                mainHeader.classList.remove('bg-slate-900/90', 'backdrop-blur-md', 'border-b', 'border-white/10');
                mainHeader.classList.add('bg-transparent');
            }
        });
    }
});
