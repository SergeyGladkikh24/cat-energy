(function(){

  var markerSmallUrl = 'img/map-pin-mobile.png';
  var markerBigUrl = 'img/map-pin-tablet-desktop.png';

  window.initialize = function(){

    var viewport = document.documentElement.clientWidth || window.innerWidth;
    var mapPosition = viewport < 1300 ? {lat:59.938743, lng:30.323047} : {lat: 59.939065, lng: 30.319335};
    var mapZoom = viewport < 1300 ? 17 : 16.75;
    var markerPosition = viewport < 768 ? {lat: 59.93871, lng: 30.32323} : {lat: 59.93871, lng: 30.32299};
    var markerUrl = viewport < 768 ? markerSmallUrl : markerBigUrl;

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: mapZoom,
      center: mapPosition
    });

    var marker = {
      url: markerUrl
    };

    var beachMarker = new google.maps.Marker({
      position: markerPosition,
      map: map,
      optimized: true,
      icon: marker
    });

  };

  window.addEventListener("resize", debounce(initialize, 1000));
  window.addEventListener("load", debounce(initialize, 1000));


  function debounce(fun, interval) {
    var timer = null;

    return function (e) {
      var onComplete = function () {
        fun.apply(this, e);
        timer = null;
      };
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(onComplete, interval);
    };
  }
})();
