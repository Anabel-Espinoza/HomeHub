
//function to generate a street view URL for use with Bing API
function getStreetView(streetAddress) {
    let formattedAddress = "";
    let tmpAddress = streetAddress.split(" ");
    for (let i = 0; i < tmpAddress.length; i++) {
      if (i == 0) {
        formattedAddress = tmpAddress[i]
      } else {
        formattedAddress = formattedAddress.concat("%20", tmpAddress[i]);
      }
      console.log(formattedAddress);
    }
    const streetView = `https://dev.virtualearth.net/REST/v1/Imagery/Map/Streetside/${formattedAddress}?zoomlevel=0&key=${bingAPIKey}`;
    return streetView;
  }

  function createPropertyCards(){
  }

  const newPropertyHandler = async (event) => {
    event.preventDefault()
    // console.log('submitted')

    // const email = document.querySelector('#email-signup').value.trim()
    // const name = document.querySelector('#name-signup').value.trim()
    // const password = document.querySelector('#password-signup').value.trim()

    // if (email && name && password) {
    //     const response = await fetch('/api/tenants', {
    //         method: 'POST',
    //         body: JSON.stringify({ email, name, password }),
    //         headers: { 'Content-Type': 'application/json' }
    //     })

    //     if  (response.ok) {
    //         console.log("Success creating new tenant");
    //         document.querySelectorAll('.modal').forEach(($modal) => {
    //             $modal.classList.remove('is-active');
    //             });

    //     } else {
    //         alert(response.statusText)
    //     }
    // }
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
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button .submit') || []).forEach(($close) => {
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


  // Populate images in modal cards when API available

  createPropertyCards();


  // module.exports = closeAllModals;
