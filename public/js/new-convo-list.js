const submitPost = document.querySelectorAll('.js-post-trigger')
const modalPost = document.querySelectorAll('.modal-post-form')
const closeModalP = document.querySelectorAll('.modal-close')

const allPostContents = document.querySelectorAll(".content-post")

for (let i = 0; i < submitPost.length; i++) {
    submitPost[i].addEventListener('click', () => {
        modalPost[i].classList.add('is-active')
    })
}

for (let i = 0; i < closeModalP.length; i++) {
    closeModalP[i].addEventListener('click', () => {
        modalForm[i].classList.remove('is-active')
    })
}

const newPostHandler = async (event) => {
    event.preventDefault()
    console.log('clicked')

    for (let i = 0; i < modalPost.length; i++) {
        modalPost[i].classList.remove('is-active')
    }

    let postIndex = event.target.getAttribute("data-p-index");

    const content = allPostContents[postIndex].value.trim()
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

const postBtn = document.querySelectorAll(".post-btn");

for (let i = 0; i < postBtn.length; i++) {
    postBtn[i].setAttribute("data-p-index", i);
    postBtn[i].addEventListener("click", newPostHandler);
};
