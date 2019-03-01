var exampleBlock = document.querySelector('.example');
var buttonBefore = document.querySelector('.example__progress-button--before');
var buttonAfter = document.querySelector('.example__progress-button--after');
var allImg = document.querySelectorAll('.example__image');
var imgBefore = document.querySelector('.example__image--before');
var imgAfter = document.querySelector('.example__image--after');

if(exampleBlock !== null){
  window.addEventListener('load', switchExamples);
  window.addEventListener('resize', switchExamples);
}

function switchExamples() {
  if(window.outerWidth < 768) {

    imgBefore.style.zIndex = '0';
    imgAfter.style.zIndex = '-1';
    imgBefore.style.clip = 'auto';
    imgAfter.style.clip = 'auto';

    var stripProgress = document.querySelector('.example__strip-progress');

    stripProgress.style.marginLeft = '0';

    buttonBefore.onclick = function() {
      imgBefore.style.zIndex = '0';
      imgAfter.style.zIndex = '-1';
      stripProgress.style.marginLeft = '0';
    }

    buttonAfter.onclick = function() {
      imgBefore.style.zIndex = '-1';
      imgAfter.style.zIndex = '0';
      stripProgress.style.marginLeft = '50%';
    }
  } else if (window.outerWidth >= 768) {

    imgBefore.style.zIndex = '1';
    imgAfter.style.zIndex = '1';

    var exampleRange = document.querySelector('.example__range');
    var imagesWrapper = document.querySelector('.example__images-wrapper')
    var widthBlock = imagesWrapper.offsetWidth;
    exampleRange.value = '50';

    imgBefore.style.clip = 'rect(auto '+ widthBlock / 2 + 'px auto auto)';
    imgAfter.style.clip = 'rect(auto auto auto ' + widthBlock / 2 + 'px)';

    buttonBefore.onclick = function() {
      imgBefore.style.clip = 'rect(auto 0 auto auto)';
      imgAfter.style.clip = 'rect(auto auto auto 0)';

      exampleRange.stepDown(100);
    }

    buttonAfter.onclick = function() {
      imgBefore.style.clip = 'rect(auto ' + widthBlock + 'px auto auto)';
      imgAfter.style.clip = 'rect(auto auto auto ' + widthBlock + 'px)';

      exampleRange.stepUp(100);
    }

    exampleRange.oninput = toChangeImage;
    exampleRange.onchange =  toChangeImage;

    function toChangeImage() {
      var valueInput = this.value;
      var widthImg = widthBlock * valueInput / 100;

      imgBefore.style.clip = 'rect(auto ' + widthImg + 'px auto auto)';
      imgAfter.style.clip = 'rect(auto auto auto ' + widthImg + 'px)';
    }
  }
}
