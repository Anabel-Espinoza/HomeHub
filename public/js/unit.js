// function for handling adding new properties
const linkTenantHandler = async (event) => {
  event.preventDefault();
  console.log("inside link tenant to property");
  const tenantEmailElem = document.querySelector('#tenant-email');
  const email = tenantEmailElem.value.trim();
  const unit = tenantEmailElem.getAttribute('unit-id');
  const tenantLeaseElem = document.querySelector('#tenant-lease');
  const lease = tenantLeaseElem.value;



  console.log("email is:", email);
  console.log("unit ID is:", unit);
  console.log("lease length is:", lease);


 // search for matching email in database
  if (email && unit) {
    const response = await fetch(`/api/landlords/unit/${ unit }`, { // was api/tenants/
      method: 'PUT',
      body: JSON.stringify({ email, lease }), // was { email, unit, lease }
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      console.log("tenant added to unit");
   
      // turn off modal
      document.querySelectorAll('.modal').forEach(($modal) => {
        $modal.classList.remove('is-active');
      });
  
      // reload page
      document.location.reload();
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

document.querySelector('.link-tenant-form').addEventListener('submit', linkTenantHandler)
