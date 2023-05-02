const updateRequest = document.querySelector('.update-request-btn')
const closeRequest = document.querySelector(".close-btn")
const modalForm = document.querySelector('.modal')

updateRequest.addEventListener('click', ()=> {
    modalForm.classList.add('is-active')
})

closeRequest.addEventListener("click", () => {
    modalForm.classList.remove("is-active")
})

const updateHandler = async (event) => {
    event.preventDefault()
    console.log('submitted')

    const email = document.querySelector('#email-update').value.trim()
    const name = document.querySelector('#name-update').value.trim()
    const password = document.querySelector('#password-update').value.trim()
    const id = event.target.getAttribute("data-landlord-id")

    if (email && name && password) {
        const response = await fetch(`/api/landlords/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ email, name, password }),
            headers: { 'Content-Type': 'application/json' }
        })

        if  (response.ok) {
            document.location.replace('/landlord/account')
        } else {
            alert(response.statusText)
        }
    }
}

document.querySelector('.update-btn').addEventListener('click', updateHandler)