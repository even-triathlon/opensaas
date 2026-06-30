/* ============================================================
   RUEIL-MALMAISON TRIATHLON - form.js
   Gestion du formulaire d'inscription via Web3Forms
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('inscription-form');
    if (!form) return;

    const submitBtn = document.getElementById('submit-btn');
    const successMsg = document.getElementById('form-success');
    const errorMsg = document.getElementById('form-error');

    form.addEventListener('submit', async function (e) {
        // Add submitted class to show validation styles
        form.classList.add('submitted');

        if (!form.checkValidity()) {
            e.preventDefault();
            if (errorMsg) {
                errorMsg.textContent = '❌ Veuillez remplir tous les champs obligatoires.';
                errorMsg.classList.remove('hidden');
                errorMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        e.preventDefault();

        // Hide previous messages
        if (successMsg) successMsg.classList.add('hidden');
        if (errorMsg) errorMsg.classList.add('hidden');

        // Disable button and show loading state
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Envoi en cours...';
        }

        try {
            const formData = new FormData(form);

            // On s'assure que la clé est bien présente et propre
            const accessKey = "486357e9-3b9c-4f64-bfb5-95f7a6695d2b";
            formData.set('access_key', accessKey);

            console.log('Envoi à Web3Forms avec la clé:', accessKey);

            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: formData // On repasse en FormData (multipart/form-data) qui est le format natif supporté
            });

            const data = await response.json();

            if (data.success) {
                // Envoyer aussi les données au webhook n8n pour le Google Sheet
                fetch('https://n8n-n8n.apps.neutron-sno-office.neutron-it.fr/webhook/inscription-rmt', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        firstName: formData.get('firstName'),
                        lastName: formData.get('lastName'),
                        birthDate: formData.get('birthDate'),
                        address: formData.get('address'),
                        phone: formData.get('phone'),
                        email: formData.get('email'),
                        sportsLevel: formData.get('sportsLevel'),
                        sportsExperience: formData.get('sportsExperience'),
                        sportsGoals: formData.get('sportsGoals'),
                        subscriptionType: formData.get('subscriptionType')
                    })
                }).catch(() => {}); // silencieux si n8n indisponible
                // Check if there's a redirect configured
                const redirectInput = form.querySelector('input[name="redirect"]');
                if (redirectInput && redirectInput.value) {
                    window.location.href = redirectInput.value;
                } else {
                    // Show success message inline
                    if (successMsg) successMsg.classList.remove('hidden');
                    form.reset();
                    // Scroll to success message
                    if (successMsg) {
                        successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }
            } else {
                throw new Error(data.message || 'Erreur lors de l\'envoi');
            }
        } catch (error) {
            console.error('Erreur formulaire:', error);
            if (errorMsg) {
                errorMsg.classList.remove('hidden');
                errorMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Envoyer';
            }
        }
    });
});
