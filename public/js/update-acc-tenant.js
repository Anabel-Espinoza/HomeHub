const updateRequest = document.querySelector('.js-update-trigger')
const closeRequest = document.querySelector(".close-btn")
const updateModalForm = document.querySelector('#modal-update-form')

updateRequest.addEventListener('click', ()=> {
    updateModalForm.classList.add('is-active')
})

closeRequest.addEventListener("click", () => {
    updateModalForm.classList.remove("is-active")
})

const updateHandler = async (event) => {
    event.preventDefault()
    console.log('submitted')

    const email = document.querySelector('#email-update').value.trim()
    const password = document.querySelector('#password-update').value.trim()
    const id = event.target.getAttribute("data-tenant-id")

    if (email && password) {
        const response = await fetch(`/api/tenants/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        })

        if  (response.ok) {
            document.location.replace('/tenant/')
        } else {
            alert(response.statusText)
        }
    }
}

document.querySelector('.update-btn').addEventListener('click', updateHandler)