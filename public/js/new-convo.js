const submitPost = document.querySelector('.js-post-trigger')
const modalPost = document.querySelector('#modal-post-form')
const closeModalP = document.querySelector('.modal-close')

submitPost.addEventListener('click', ()=> {
    modalPost.classList.add('is-active')
})

closeModalP.addEventListener('click', () => {
    modalForm.classList.remove('is-active')
})

const newPostHandler = async (event) => {
    event.preventDefault()
    console.log('clicked')

    modalPost.classList.remove('is-active')
    
    const content = document.querySelector('#content-post').value.trim()
    const tenant_id = event.target.getAttribute('data-tenant-id')
    const landlord_id = event.target.getAttribute('data-landlord-id')
    console.log(content, 'ten',tenant_id, 'land', landlord_id)

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

document.querySelector('.post-btn').addEventListener('click', newPostHandler)
