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

    // Pricing Category Dropdown Logic
    const categoryBtn = document.getElementById('category-dropdown-btn');
    const categoryMenu = document.getElementById('category-dropdown-menu');
    const categoryOptions = document.querySelectorAll('.category-option');
    const selectedCategoryText = document.getElementById('selected-category');
    const pricingCards = document.querySelectorAll('.pricing-card');

    if (categoryBtn && categoryMenu) {
        categoryBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            categoryMenu.classList.toggle('hidden');
            categoryBtn.querySelector('i').classList.toggle('rotate-180');
        });

        categoryOptions.forEach(option => {
            option.addEventListener('click', () => {
                const category = option.getAttribute('data-category');
                selectedCategoryText.innerText = option.innerText;
                categoryMenu.classList.add('hidden');
                categoryBtn.querySelector('i').classList.remove('rotate-180');

                // Filtering Logic
                pricingCards.forEach(card => {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.classList.remove('hidden');
                        card.style.opacity = '0';
                        setTimeout(() => {
                            card.style.opacity = '1';
                        }, 50);
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            categoryMenu.classList.add('hidden');
            categoryBtn.querySelector('i').classList.remove('rotate-180');
        });
    }

    // FAQ Accordion Logic
    const faqToggles = document.querySelectorAll('.faq-toggle');
    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const content = toggle.nextElementSibling;
            const icon = toggle.querySelector('i');
            
            // Close other items
            document.querySelectorAll('.faq-content').forEach(item => {
                if (item !== content) {
                    item.classList.add('hidden');
                    item.previousElementSibling.querySelector('i').classList.remove('rotate-45');
                    item.previousElementSibling.querySelector('i').setAttribute('data-lucide', 'plus');
                }
            });

            // Toggle current item
            content.classList.toggle('hidden');
            if (content.classList.contains('hidden')) {
                icon.classList.remove('rotate-45');
            } else {
                icon.classList.add('rotate-45');
            }
            lucide.createIcons();
        });
    });
});
