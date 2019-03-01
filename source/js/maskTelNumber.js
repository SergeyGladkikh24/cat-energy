(function(){

  var inputTel = document.querySelector('#tel-number');

  if(inputTel !== null) {

    inputTel.onclick = function() {
      this.value = "8";
    }

    inputTel.onkeypress = function(e) {


      if(!/\d/.test(e.key)) {

        e.preventDefault()

      } else {

        var curLen = this.value.length;

        if (curLen === 1)
          this.value = this.value + "(";

        if (curLen === 5)
          this.value = this.value + ")";

        if (curLen === 9)
          this.value = this.value + "-";

        if (curLen === 12)
          this.value = this.value + "-";
      }
    }
  }
})();
