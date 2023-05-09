const loginHandler = async (event) => {
    event.preventDefault()
    console.log('submitted')

    const email = document.querySelector('#email-login').value.trim()
    const password = document.querySelector('#password-login').value.trim()
    const tenantCheck = document.querySelector('.tenant-check').checked

    if (email && password && tenantCheck === false) {
        const response = await fetch('/api/landlords/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        })

        if (response.ok) {
            document.location.replace('/landlord')
        } else {
            successModal.classList.add('is-active');
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
            successModal.classList.add('is-active');
        }
    }
}

const modalCloseBtn = document.querySelector(".success-modal .close-btn")
const successModal = document.querySelector(".success-modal")

document.querySelector('.landlord-signin-btn').addEventListener('click', loginHandler)
modalCloseBtn.addEventListener("click", () => {
    successModal.classList.remove('is-active');
})
