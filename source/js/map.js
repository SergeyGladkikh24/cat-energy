function initMap() {
  var myMap,
      marker,
      markers = [],
      posMarker = {lat:59.938743, lng:30.323047};

  window.addEventListener("load", screenWidthMap);
  window.addEventListener("resize", screenWidthMap);

  function screenWidthMap() {
    if(window.outerWidth >= 1300) {
      var posMap = {lat:59.938354, lng:30.318838}
      var opt = {
        center:posMap,
        zoom:16.75,
      }
    } else {
      var posMap = {lat:59.938743, lng:30.323047}
      var opt = {
        center: posMap,
        zoom: 17,
      }
    }

    myMap = new google.maps.Map(document.getElementById("map"),opt);
  }

  window.addEventListener("resize", changeSize);
  window.addEventListener("load", changeSize);

  function changeSize(){
    deleteMarkers();
    if(document.documentElement.clientWidth < 768) {
      marker = new google.maps.Marker({
        position:posMarker,
        map:myMap,
        title: "улица Большая Конюшенная дом 18/2",
        icon: "img/map-pin-mobile.png",
      });
    }
    if(document.documentElement.clientWidth >= 768) {
      marker = new google.maps.Marker({
        position:posMarker,
        map:myMap,
        title: "улица Большая Конюшенная дом 18/2",
        icon: "img/map-pin-tablet-desktop.png",
      });
    }
    markers.push(marker);
  }

  function deleteMarkers() {
    for (i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers = [];
  }
}

