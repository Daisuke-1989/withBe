let gMap;
let zoomScale = 18;
let locationList = [[35.667358, 139.713943], [-28.030833, 153.431944]];
// promiseにチャレンジ
function getUserLoc() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position) => {
      let data = position.coords;
      let lat = data.latitude;
      let lng = data.longitude;
      locationList.push([lat, lng]);
      let myLatLng = new google.maps.LatLng(lat, lng);
      resolve(myLatLng);
    }
      , (error) => {
        let errorInfo = [
          "Unkown error",
          "Permission denied",
          "Position unavailable",
          "Timeout"
        ];
        let errorNo = error.code;
        let errorMassage = errorNo + " : " + errorInfo[errorNo];
        reject(errorMassage);
      }
      , {
        "timeout": 8000,
      }
    )
  })
};
function initMap(myLatLng) {
  gMap = new google.maps.Map(document.getElementById('gMap'), {
    center: myLatLng,
    zoom: zoomScale,
    mapTypeId: 'satellite',
    scrollwheel: false
  });
  gMap.setTilt(45);
};
getUserLoc().then(response => {
  console.log(locationList);
  initMap(response);
}, function onRejected(error) {
  alert(error);
});

document.getElementById("Cheese").onclick = function () {
  updateMap(0);
};
document.getElementById("Gold").onclick = function () {
  updateMap(1);
};
document.getElementById("Me").onclick = function () {
  updateMap(2)
};
function updateMap(locID) {
  let uplat = locationList[locID][0];
  let uplng = locationList[locID][1];
  let upGLatLng = new google.maps.LatLng(uplat, uplng);
  gMap = new google.maps.Map(document.getElementById('gMap'), {
    center: upGLatLng,
    zoom: zoomScale,
    mapTypeId: 'satellite',
    scrollwheel: false
  })
  gMap.setTilt(45);
};
