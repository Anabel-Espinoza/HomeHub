const submitComment = document.querySelectorAll('.js-comment-trigger')
const modalForm = document.querySelectorAll('.modal')
const closeModal = document.querySelectorAll('.modal-close')
const allComments = document.querySelectorAll('#content')

for (let i=0; i < submitComment.length; i++) {
    submitComment[i].addEventListener('click', ()=> {
        modalForm[i].classList.add('is-active')
    })
}

for (let i=0; i < closeModal.length; i++) {
    closeModal[i].addEventListener('click', () => {
        modalForm[i].classList.remove('is-active')
    })
}

const newCommentHandler = async (event) => {
    event.preventDefault()
    console.log('clicked')

    for(let i=0; i< modalForm.length; i++) {
        modalForm[i].classList.remove('is-active')
    }

    let indexComment = event.target.getAttribute('data-index')
    let content = allComments[indexComment].value.trim()
    const convo_id = event.target.getAttribute('data-convo-id')
    const tenant_id = event.target.getAttribute('data-tenant-id')
    const landlord_id = event.target.getAttribute('data-landlord-id')
    console.log(content, 'convo', convo_id, 't',tenant_id, 'l', landlord_id)

    if (content && tenant_id && landlord_id !== true) {
        const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({ content, convo_id, tenant_id }),
            headers: {
                'Content-Type': 'application/json'
            }        
        })

        if (response.ok) {
            document.location.reload()
        } else {
            alert('Failed to post comment')
        }
    } else if (content && !tenant_id && landlord_id) {
        console.log(landlord_id)
        const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({ content, convo_id, landlord_id }),
            headers: {
                'Content-Type': 'application/json'
            }        
        })

        if (response.ok) {
            document.location.reload()
        } else {
            alert('Failed to post comment')
        }
    }
}

const commentBtn = document.querySelectorAll('.comment-btn')
for (let i=0; i < commentBtn.length; i++) {
    commentBtn[i].setAttribute('data-index', i)
    commentBtn[i].addEventListener('click', newCommentHandler)
}