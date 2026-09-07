// ===== MENU MOBILE =====
const menuToggle = document.getElementById('menuToggle');
const navList = document.querySelector('.nav-list');

menuToggle.addEventListener('click', () => {
    navList.classList.toggle('active');
});

document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
    });
});

// ===== COMPTE À REBOURS (30 septembre 2026) =====
const countdownDate = new Date('September 30, 2026 23:59:59').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    if (distance < 0) {
        document.getElementById('countdown').innerHTML = `
            <div style="text-align: center; width: 100%;">
                <span style="font-size: 1.5rem; font-weight: 700; color: #E4D8C3;">
                    ⌛ Candidatures clôturées
                </span>
            </div>
        `;
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ===== FORMULAIRES (Formspree avec fetch) =====
const candidatureForm = document.getElementById('candidatureForm');
const formFeedback = document.getElementById('formFeedback');

if (candidatureForm) {
    candidatureForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(candidatureForm);
        const url = candidatureForm.action;

        fetch(url, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            if (response.ok) {
                candidatureForm.reset();
                formFeedback.style.display = 'block';
                formFeedback.textContent = '✅ Votre candidature a été envoyée avec succès. Nous vous répondrons dans les plus brefs délais.';
                formFeedback.style.background = '#d1fae5';
                formFeedback.style.color = '#065f46';
                setTimeout(() => { formFeedback.style.display = 'none'; }, 6000);
            } else {
                throw new Error('Erreur');
            }
        })
        .catch(() => {
            formFeedback.style.display = 'block';
            formFeedback.textContent = '❌ Une erreur est survenue. Veuillez réessayer.';
            formFeedback.style.background = '#fee2e2';
            formFeedback.style.color = '#991b1b';
        });
    });
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const url = contactForm.action;

        fetch(url, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            if (response.ok) {
                contactForm.reset();
                alert('Votre message a été envoyé avec succès !');
            } else {
                throw new Error('Erreur');
            }
        })
        .catch(() => {
            alert('Une erreur est survenue. Veuillez réessayer.');
        });
    });
}
