const form = document.getElementById('contact-form');
const modal = document.getElementById('success-modal');
const closeBtn = document.getElementById('close-btn');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    modal.style.display = 'block';
    modal.style.display = 'flex';

    form.reset();
});

closeBtn.addEventListener('click', () => {
    // Hide the modal
    modal.style.display = 'none';
});