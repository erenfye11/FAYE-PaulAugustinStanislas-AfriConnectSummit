// Dark mode et navbar
document.addEventListener('DOMContentLoaded', function () {

    // ===== ANNÉE DYNAMIQUE ===
    const yearEls = document.querySelectorAll('#year');
    yearEls.forEach(el => el.textContent = new Date().getFullYear());

    // ===== DARK MODE =====
    const btnDark = document.getElementById('btn-dark');
    const html = document.documentElement;

    // Appliquer le thème sauvegardé
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (btnDark) {
        btnDark.addEventListener('click', function () {
            const current = html.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            updateThemeIcon(next);
        });
    }

    function updateThemeIcon(theme) {
        if (!btnDark) return;
        btnDark.innerHTML = theme === 'dark'
            ? '<i class="bi bi-sun-fill"></i>'
            : '<i class="bi bi-moon-fill"></i>';
    }

    // ===== NAVBAR DYNAMIQUE =====
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Bouton retour en haut
        const btnTop = document.getElementById('btn-top');
        if (btnTop) {
            if (window.scrollY > 300) {
                btnTop.style.display = 'flex';
            } else {
                btnTop.style.display = 'none';
            }
        }
    });

    // ===== MENU HAMBURGER =====
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            navLinks.classList.toggle('open');
            hamburger.classList.toggle('active');
        });

        // Fermer le menu au clic sur un lien
        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function () {
                navLinks.classList.remove('open');
                hamburger.classList.remove('active');
            });
        });
    }

    // ===== BOUTON RETOUR EN HAUT =====
    const btnTop = document.getElementById('btn-top');
    if (btnTop) {
        btnTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===== ANIMATIONS FADE-IN =====
    const fadeEls = document.querySelectorAll('.fade-in');
    const observerFade = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observerFade.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05 });

    fadeEls.forEach(el => observerFade.observe(el));

    // ===== COMPTEURS ANIMÉS =====
    const compteurs = document.querySelectorAll('.counter');
    const observerCount = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                let count = 0;
                const step = Math.ceil(target / 80);
                const timer = setInterval(function () {
                    count += step;
                    if (count >= target) {
                        count = target;
                        clearInterval(timer);
                    }
                    entry.target.textContent = count.toLocaleString();
                }, 20);
                observerCount.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    compteurs.forEach(c => observerCount.observe(c));

    // ===== COMPTE A REBOURS =====
    const countdownDate = new Date('2026-10-15T08:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const diff = countdownDate - now;

        if (diff <= 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ===== ONGLETS PROGRAMME =====
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabBtns.length > 0) {
        tabBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                // Retirer active de tous les boutons
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.style.display='none');

                // Activer le bon onglet
                this.classList.add('active');
                const target = this.getAttribute('data-tab');
                document.getElementById(this.getAttribute('data-tab')).style.display = 'block';
            });
        });
    }

    // ===== FILTRAGE INTERVENANTS =====
    const filtresBtns = document.querySelectorAll('.filtre-btn');
    const cartes = document.querySelectorAll('.speaker-card');

    if (filtresBtns.length > 0) {
        filtresBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                filtresBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                const filtre = this.getAttribute('data-filtre');
                cartes.forEach(function (carte) {
                    if (filtre === 'tous' || carte.getAttribute('data-theme-tag') === filtre) {
                        carte.style.display = 'block';
                        setTimeout(() => carte.style.opacity = '1', 10);
                    } else {
                        carte.style.opacity = '0';
                        setTimeout(() => carte.style.display = 'none', 300);
                    }
                });
            });
        });
    }

    // ===== VALIDATION FORMULAIRE =====
    const form = document.getElementById('form-contact');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            let valide = true;

            // Nom complet
            valide = validerChamp('nom', val => val.length >= 2, 'Le nom doit contenir au moins 2 caractères.') && valide;

            // Email
            valide = validerChamp('email', val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), 'Format email invalide.') && valide;

            // Téléphone
            valide = validerChamp('telephone', val => /^\d{8,}$/.test(val.replace(/\s/g, '')), 'Le téléphone doit contenir au moins 8 chiffres.') && valide;

            // Message
            valide = validerChamp('message', val => val.length >= 20, 'Le message doit contenir au moins 20 caractères.') && valide;

            if (valide) {
                 const succes = document.getElementById('form-succes');
                 if (succes) {
                     succes.style.display = 'block';
                     form.reset();
                    form.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));
                     setTimeout(() => succes.style.display = 'none', 5000);
                }
            }
        });

        // Validation en temps réel
        form.querySelectorAll('input, textarea, select').forEach(function (input) {
            input.addEventListener('blur', function () {
                this.classList.remove('is-invalid');
                if (this.value.trim()) {
                    this.classList.add('is-valid');
                }
            });
        });
    }

    function validerChamp(id, test, message) {
        const input = document.getElementById(id);
        const erreur = document.getElementById('erreur-' + id);
        if (!input) return true;

        const val = input.value.trim();
        if (!test(val)) {
            input.classList.add('is-invalid');
            input.classList.remove('is-valid');
            if (erreur) erreur.textContent = '⚠ ' + message;
            return false;
        } else {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
            if (erreur) erreur.textContent = '';
            return true;
        }
    }

}); 