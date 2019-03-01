(function(){
  var form = document.querySelector('.form');

  var propertiesValidation = {
    messageError: {
      errorIsEmpty:"Поле пустое.Введите значение!",
      incorrectEmail: "Введите корректный email!Адрес электронной почты должен содержать '@'."
    },
    methodsValidate: {
      checkVoid: function(val) {
        if(!val) {
          return true;
        }
        return false;
      },
      checkForCorrectEmail: function(val) {
        var reg = /^[0-9A-Za-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,4}$/

        if(!reg.test(val) && val) {
          return true
        }
        return false
      }
    }
  }

  function validate(e) {

    var textFields = this.querySelectorAll(".input-text[required]");

    reset(textFields);

    for(var i = 0;  i < textFields.length; i++) {

      var errorMessage;
      var checkForABlankTextFields = propertiesValidation.methodsValidate.checkVoid(textFields[i].value);
      var checkCorrectEmail = propertiesValidation.methodsValidate.checkForCorrectEmail(textFields[i].value);

      if(textFields[i].id === 'email') {

        if(checkCorrectEmail) {
          errorMessage = propertiesValidation.messageError.incorrectEmail;
          showError(e,textFields[i],errorMessage);
        }
      }

      if(checkForABlankTextFields) {
        errorMessage = propertiesValidation.messageError.errorIsEmpty;
        showError(e,textFields[i],errorMessage);
      }
    }

  }

  function reset(arr) {
    for(var i = 0; i < arr.length; i++) {
      if(arr[i].nextSibling) {

        if(arr[i].nextSibling.className === 'form__message-error') {
          arr[i].parentNode.removeChild(arr[i].nextSibling);
        }


        arr[i].classList.remove('input-text--invalid');
      }
    }
  }

  function showError(event,elem,message) {
    event.preventDefault();
    newElem = document.createElement('span');
    newElem.innerHTML = message;
    newElem.className = 'form__message-error';
    elem.parentNode.insertBefore(newElem,elem.nextSibling);
    elem.classList.add('input-text--invalid');
  }

  if(form !== null) {
    form.setAttribute('novalidate',true);
    form.onsubmit = validate;
  }

})();
