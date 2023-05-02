const loginHandler = async (event) => {
    event.preventDefault()
    console.log('submitted')

    const email = document.querySelector('#email-login').value.trim()
    const password = document.querySelector('#password-login').value.trim()
    const tenantCheck = edocument.querySelector('.tenant-check:checked').value
    
    if (email && password && tenantCheck === false) {
        const response = await fetch('/api/landlords/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        })

        if (response.ok) {
            document.location.replace('/landlord')
        } else {
            alert(response.statusText)
        }
    } else if (email && password && tenantCheck) {
        console.log(tenantCheck)
        const response = await fetch('/api/tenants/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        })

        if (response.ok) {
            document.location.replace('/tenant')
        } else {
            alert(response.statusText)
        }
    }
}

document.querySelector('.login-form').addEventListener('click', loginHandler)
