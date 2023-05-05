const submitTicket = document.querySelectorAll('.updateTicket')
const modalForm = document.querySelectorAll('.maint-update-modal')
const closeModal = document.querySelectorAll('.modal-close')
const closeModal2 = document.querySelectorAll('.close-btn')

const allMaints = document.querySelectorAll(".maint-desc")
const allMaintDates = document.querySelectorAll(".maint-date")
const allMaintCost = document.querySelectorAll(".maint-cost")

for (let i = 0; i < submitTicket.length; i++) {
    submitTicket[i].addEventListener('click', () => {
        modalForm[i].classList.add('is-active')
    })
}

for (let i = 0; i < closeModal.length; i++) {
    closeModal[i].addEventListener('click', () => {
        modalForm[i].classList.remove('is-active')
    })
}

for (let i = 0; i < closeModal2.length; i++) {
    closeModal2[i].addEventListener('click', () => {
        modalForm[i].classList.remove('is-active')
    })
}

const maintSubmitHandler = async (event) => {
    event.preventDefault();

    for (let i = 0; i < modalForm.length; i++) {
        modalForm[i].classList.remove('is-active')
    }

    let maintIndex = event.target.getAttribute("data-m-index");
    let description = allMaints[maintIndex].value.trim();
    let date_submitted = allMaintDates[maintIndex].value.trim();
    const is_closed = document.querySelector("input[type=radio][name=maint-status]:checked").value;
    let repair_cost = allMaintCost[maintIndex].value.trim();
    const id = event.target.getAttribute("data-maint-id");
    console.log(id);


    console.log(description, date_submitted, is_closed, repair_cost, id);

    if (description && date_submitted && repair_cost) {
        console.log(description, date_submitted, is_closed, repair_cost, id);
        const response = await fetch(`/api/maintenance/${id}`, {
            method: "PUT",
            body: JSON.stringify({ description, date_submitted, is_closed, repair_cost }),
            headers: { "Content-Type": "application/json" },
        });
        console.log(response);

        if (response.ok) {
            for ( let i = 0; i < successModal.length; i++) {
                successModal[i].classList.add('is-active');
                setTimeout(() => {
                    document.location.reload();
                }, 2000);
            }
        } else {
            alert("Failed to edit maintenance ticket");
        }
    }
};

const maintEditBtn = document.querySelectorAll(".maint-submit-btn")

for (let i = 0; i < maintEditBtn.length; i++) {
    maintEditBtn[i].setAttribute("data-m-index", i)
    maintEditBtn[i].addEventListener("click", maintSubmitHandler)
}

const modalCloseBtn = document.querySelectorAll(".success-modal .close-btn")
const successModal = document.querySelectorAll(".success-modal")

for (let i = 0; i < modalCloseBtn.length; i++) {
    modalCloseBtn[i].addEventListener('click', () => {
        successModal[i].classList.remove('is-active');
    });
}