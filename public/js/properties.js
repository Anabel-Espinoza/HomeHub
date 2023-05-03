// function for handling adding new properties
const newPropertyHandler = async (event) => {
  event.preventDefault()
  console.log("Clicked new property")

  const address = document.querySelector('#prop-address').value.trim()
  const rent_cost = document.querySelector('#prop-rent').value.trim()

  if (address && rent_cost) {
      const response = await fetch('/api/units', {
          method: 'POST',
          body: JSON.stringify({ address, rent_cost }),
          headers: { 'Content-Type': 'application/json' }
      })


      if  (response.ok) {
          console.log("Success creating new property");
          document.querySelectorAll('.modal').forEach(($modal) => {
              $modal.classList.remove('is-active');
          });
          document.location.replace(`/landlord/properties`);


      } else {
          alert(response.statusText)
      }
  }
}

//////////////// MODAL FUNCTIONS /////////////////
document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  const closeAllModals = () => {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button .submit, .close-btn') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    const e = event || window.event;

    if (e.key === 'Escape') { // Escape key
      closeAllModals();
    }
  });
});

document.querySelector('.new-property-form').addEventListener('submit', newPropertyHandler)
