const dropdown = document.querySelector('.dropdown')
const dropdownItem = document.querySelectorAll('.dropdown-item')
const newPostModal = document.querySelectorAll('.modal-post')
const submitPost = document.querySelectorAll('.post-btn')
const contentPost = document.querySelectorAll('.content-post')

dropdown.addEventListener('click', () => {
    dropdown.classList.add('is-active')
})

for (let i=0; i < dropdownItem.length; i++) {
dropdownItem[i].addEventListener('click', () => {
    newPostModal[i].classList.add('is-active')
})
}

const newPostHandler = async (event) => {
    event.preventDefault()
    console.log('clicked')

    for (let i = 0; i < newPostModal.length; i++) {
        newPostModal[i].classList.remove('is-active')
    }

    let postIndex = event.target.getAttribute("data-index");

    const content = contentPost[postIndex].value.trim()
    const tenant_id = event.target.getAttribute('data-tenant-id')
    const landlord_id = event.target.getAttribute('data-landlord-id')
    console.log(content, 'ten', tenant_id, 'land', landlord_id)

    if (content) {
        const response = await fetch('/api/convo', {
            method: 'POST',
            body: JSON.stringify({ content, tenant_id, landlord_id }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (response.ok) {
            document.location.reload()
        } else {
            alert('Failed to post convo')
        }
    }
}

for (let i=0; i < submitPost.length; i++) {
    submitPost[i].setAttribute('data-index', i)
    submitPost[i].addEventListener('click', newPostHandler)
}