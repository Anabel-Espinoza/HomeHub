const submitTicket = document.querySelector('.updateTicket')
const modalForm = document.querySelector('.modal')

submitTicket.addEventListener('click', () => {
    modalForm.classList.add('is-active')
})

const maintSubmitHandler = async (event) => {
    event.preventDefault();
    modalForm.classList.remove('is-active')

    const description = document.querySelector(".maint-desc").value.trim();
    const date_submitted = document.querySelector(".maint-date").value.trim();
    const is_closed = document.querySelector("input[type=radio][name=maint-status]:checked").value;
    const repair_cost = document.querySelector(".maint-cost").value.trim();
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
            document.location.replace(`/maintenance`);
        } else {
            alert("Failed to edit maintenance ticket");
        }
    }
};

document.querySelector(".maint-submit-btn").addEventListener("click", maintSubmitHandler);