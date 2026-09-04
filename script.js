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
                formFeedback.style.background = '#e8f5e9';
                formFeedback.style.color = '#2e7d32';
                setTimeout(() => { formFeedback.style.display = 'none'; }, 6000);
            } else {
                throw new Error('Erreur');
            }
        })
        .catch(() => {
            formFeedback.style.display = 'block';
            formFeedback.textContent = '❌ Une erreur est survenue. Veuillez réessayer.';
            formFeedback.style.background = '#ffebee';
            formFeedback.style.color = '#c62828';
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