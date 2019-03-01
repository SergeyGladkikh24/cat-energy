(function(){

  var inputWeight = document.querySelector('#weight');
  var inputAge = document.querySelector('#age');

  if(inputWeight !== null && inputAge !== null) {

    inputWeight.onkeypress = inputAge.onkeypress = function(e) {
      var reg =  /[\d\.]/;
      var result = reg.test(e.key);

      if(!result) {
        e.preventDefault();
      }
    }
  }

})();
