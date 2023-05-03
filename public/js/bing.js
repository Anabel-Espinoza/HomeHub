//function to generate a street view URL for use with Bing API
function getStreetView(streetAddress) {
    const bingAPIKey = 'AiG4EPc6Fx1YkYlJcKu0BI-b5jWafgdxk4pQkefyU5iNYFa2wn0x24qyz8v4BY1d';
  
    // console.log("key is:", bingAPIKey);
    let formattedAddress = "";
    let tmpAddress = streetAddress.split(" ");
    for (let i = 0; i < tmpAddress.length; i++) {
      if (i == 0) {
        formattedAddress = tmpAddress[i]
      } else {
        formattedAddress = formattedAddress.concat("%20", tmpAddress[i]);
      }
      // console.log(formattedAddress);
    }
    const streetView = `https://dev.virtualearth.net/REST/v1/Imagery/Map/Streetside/${formattedAddress}?zoomlevel=0&key=${bingAPIKey}`;
    return streetView;
  }
  
  function createPropertyCards(){
    let addresses = document.getElementsByClassName("bing-address");
    let address = '';
    for (let i = 0; i < addresses.length; i++){
      // address += addresses[i].data;
      address = addresses[i].id;
      // console.log("the current propery address is:", addresses[i].id);
      let bingMapString = getStreetView(address);
      // console.log(bingMapString);
      addresses[i].setAttribute("src", bingMapString);
    }
  
  }

createPropertyCards();
