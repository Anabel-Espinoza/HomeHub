const loginHandler = async (event) => {
    event.preventDefault()
    console.log('submitted')

    const email = document.querySelector('#email-login').value.trim()
    const password = document.querySelector('#password-login').value.trim()
    const landlordCheck = event.target.getAttribute("data-landlord");
    const tenantCheck = event.target.getAttribute("data-tenant");
    
    if (email && password && landlordCheck) {
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
