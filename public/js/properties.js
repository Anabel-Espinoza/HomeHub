
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

  createPropertyCards();