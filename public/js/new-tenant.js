const newTenantHandler = async (event) => {
    event.preventDefault()
    console.log('submitted')

    const email = document.querySelector('#email-signup').value.trim()
    const name = document.querySelector('#name-signup').value.trim()
    const password = document.querySelector('#password-signup').value.trim()

    if (email && name && password) {
        const response = await fetch('/api/tenants', {
            method: 'POST',
            body: JSON.stringify({ email, name, password }),
            headers: { 'Content-Type': 'application/json' }
        })

        if  (response.ok) {
            document.window.alert('Tenant account has been created')
            document.location.replace('/landlord')
        } else {
            alert(response.statusText)
        }
    }
}

document.querySelector('.signup-form').addEventListener('submit', newTenantHandler)