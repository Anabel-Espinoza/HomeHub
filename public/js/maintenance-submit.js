const submitTicket = document.querySelector('.js-modal-trigger')
const modalForm = document.querySelector('.modal')
const closeModal = document.querySelector('.modal-close')

submitTicket.addEventListener('click', ()=> {
    modalForm.classList.add('is-active')
})

closeModal.addEventListener('click', () => {
    modalForm.classList.remove('is-active')
})

const maintSubmitHandler = async (event) => {
    // event.preventDefault();
    modalForm.classList.remove('is-active')

    const description = document.querySelector(".maint-desc").value.trim();
    const unit_id = event.target.getAttribute("data-unit-id");
    const landlord_id = event.target.getAttribute("data-landlord-id");
    const tenant_id = event.target.getAttribute("data-tenant-id");
    
    console.log(description, unit_id, landlord_id, tenant_id);

    if (description && unit_id && landlord_id && tenant_id) {
        const response = await fetch(`/api/maintenance`, {
            method: "POST",
            body: JSON.stringify({ description, unit_id, landlord_id, tenant_id }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.replace(`/tenant`);
        } else {
            alert("Failed to submit maintenance request");
        }
    }
};

document.querySelector(".maint-submit-btn").addEventListener("click", maintSubmitHandler);