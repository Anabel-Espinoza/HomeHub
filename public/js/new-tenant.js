// const { closeAllModals } = require('./properties');

const newTenantHandler = async (event) => {
    event.preventDefault()
    console.log('submitted')



    const email = document.querySelector('#email-signup').value.trim()
    const name = document.querySelector('#name-signup').value.trim()
    const password = document.querySelector('#password-signup').value.trim()
    // const unit = document.querySelector('#unit').value; //
    // console.log("selected property was:", unit); //

    if (email && name && password) {
        const response = await fetch('/api/tenants', {
            method: 'POST',
            body: JSON.stringify({ email, name, password }), //
            headers: { 'Content-Type': 'application/json' }
        })

        if  (response.ok) {
            console.log("Success creating new tenant");
            // document.window.alert('Tenant account has been created');
            // document.location.replace('/landlord');
            document.querySelectorAll('.modal').forEach(($modal) => {
                $modal.classList.remove('is-active');
                });

        } else {
            alert(response.statusText)
        }
    }
}

document.querySelector('.signup-form').addEventListener('submit', newTenantHandler)