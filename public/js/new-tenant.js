// const { closeAllModals } = require('./properties');

const newTenantHandler = async (event) => {
    event.preventDefault()
    console.log('submitted')



    const email = document.querySelector('#email-signup').value.trim()
    const name = document.querySelector('#name-signup').value.trim()
    const password = document.querySelector('#password-signup').value.trim()

    if (email && name && password) {
        const response = await fetch('/api/tenants', {
            method: 'POST',
            body: JSON.stringify({ email, name, password }), //
            headers: { 'Content-Type': 'application/json' }
        })

        if (response.ok) {
            console.log("Success creating new tenant");
            document.querySelectorAll('.modal').forEach(($modal) => {
                $modal.classList.remove('is-active');
            });

        } else {
            alert(response.statusText)
        }
    }
}

document.querySelector('.signup-form').addEventListener('submit', newTenantHandler)