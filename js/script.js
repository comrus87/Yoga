window.addEventListener('DOMContentLoaded', function () {
  "use strict";

  let tab = document.querySelectorAll('.info-header-tab');
  let infoHeader = document.querySelector('.info-header');
  let tabContent = document.querySelectorAll('.info-tabcontent');


  function hideTabContent (a) {
  	for (let i = a; i < tabContent.length; i++){
  		tabContent[i].classList.add('hide');
  		tabContent[i].classList.remove('show');
  	};
  };

  hideTabContent(1);

  function showTabContent (b) {
  	if (tabContent[b].classList.contains('hide')) {
  		tabContent[b].classList.remove('hide');
  		tabContent[b].classList.add('show');
  	};
  };

  infoHeader.addEventListener('click', function (evt) {
    let target = evt.target;
    if (target && target.classList.contains('info-header-tab')) {
    	for (let i=0; i < tab.length; i++) {
    		if (target == tab[i]) {
    			hideTabContent(0);
    			showTabContent(i);
    			break;
    		};
    	};
    };

  });

// Таймер
  
  let deadLine = '2019-09-07';

  function getTimeRemaining (endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date);
    let seconds = Math.floor((t/1000) % 60);
    let minutes = Math.floor((t/1000/60) % 60);
    let hours = Math.floor(t/(1000*60*60));

    return {
      'total': t,
      'hours': hours,
      'minutes' : minutes,
      'seconds' : seconds
    };
  };

  function setClock (id, endtime) {
    let timer = document.getElementById(id);
    let hours = timer.querySelector('.hours');
    let minutes = timer.querySelector('.minutes');
    let seconds = timer.querySelector('.seconds');

    let timeInterval = setInterval(updateClock, 1000);

    function updateClock () {
      let t = getTimeRemaining(endtime);
   
      function addZero (num) {
        return (num < 10) ? '0' + num : num;
      }

      hours.textContent = addZero(t.hours);
      minutes.textContent = addZero(t.minutes);
      seconds.textContent = addZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
        hours.textContent = '00';
        minutes.textContent = '00';
        seconds.textContent = '00';
      };
    };

  };

  setClock('timer', deadLine);

// Модальное окно

  let popup = document.querySelector('.overlay');
  let more = document.querySelector('.more');
  let btnClose = document.querySelector('.popup-close');
  let btnDescription = document.querySelectorAll('.description-btn');

  function openPopup () {
    popup.style.display ='block';
    this.classList.add('more-splash');
    document.body.style.overflow = 'hidden';
  };

  function closePopup () {
    popup.style.display ='none';
    more.classList.remove('more-splash');
    document.body.style.overflow = '';
  };

  more.addEventListener('click', openPopup);

  for (let i = 0; i < btnDescription.length; i++) {
    btnDescription[i].addEventListener('click', openPopup);
  };

  btnClose.addEventListener('click', closePopup);


 // Форма
 
 let message = {
   loading: 'Загрузка...',
   success: 'Спасибо! Скоро мы с Вами свяжемся...',
   failure: 'Что-то пошло не так'
 };

 let mainForm = document.querySelector('.main-form');
 let detailForm = document.querySelector('#form');
 let popupInput = mainForm.getElementsByTagName('input');
 let statusMessage = document.createElement('div');

 statusMessage.classList.add('status');

 function createRequestForm (evt) {
   evt.preventDefault();
   this.appendChild(statusMessage);

   let formData = new FormData(this);
   let obj = {};

   formData.forEach(function(value, key) {
     obj[key] = value;
   });

   let json = JSON.stringify(obj);

   function postData (data) {
   	 return new Promise (function(resolve, reject) {
	   let xhr = new XMLHttpRequest();

	   xhr.open('POST', 'server.php');
	   xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
	 
	   xhr.addEventListener('load', function () {
	    if (xhr.readyState < 4) {
	     resolve();
	    } else if (xhr.readyState === 4 && xhr.status == 200) {
	      resolve();
	    } else {
	      reject();
	    }
	   })

	   xhr.send(data);

   	  });

	};
 
   function clearInput () {
     for (let i = 0; i < popupInput.length; i++ ) {
	   popupInput[i].value = '';
	  };
   };
   
    postData(formData)
                      .then(() => statusMessage.innerHTML = message.loading)
                      .then(() => statusMessage.innerHTML = message.success)
                      .catch(() => statusMessage.innerHTML = message.failure)
                      .then(clearInput);
  };

  mainForm.addEventListener('submit', createRequestForm);


  // Слайдер

  let slides = document.querySelectorAll('.slider-item');
  let prev = document.querySelector('.arrow-left');
  let next = document.querySelector('.arrow-right');
  let dotsWrap = document.querySelector('.slider-dots');
  let dots = document.querySelectorAll('.dot');

  let startIndex = 1;

  function showSlide (n) {
    if (n > slides.length) {
      startIndex = 1;
    }

    if (n < 1) {
      startIndex = slides.length;
    }

    slides.forEach((item) => item.style.display = 'none');

    dots.forEach((item) => item.classList.remove('dot-active'));

    slides[startIndex - 1].style.display = 'block';
    dots[startIndex - 1].classList.add('dot-active');

  };

  showSlide(startIndex);

  function plusSlide (n) {
    showSlide(startIndex += n);
  }

  function currentSlide (n) {
    showSlide(startIndex = n);
  }

  prev.addEventListener('click', function () {
    plusSlide(-1);
  });

  next.addEventListener('click', function () {
    plusSlide(1);
  });

  dotsWrap.addEventListener('click', function (evt) {
    for (let i = 0; i < dots.length; i++) {
      if (evt.target.classList.contains('dot') && event.target == dots[i-1]) {
        currentSlide(i);
      };
    };
  });

// Калькулятор

  let persons = document.querySelectorAll('.counter-block-input')[0];
  let restDays = document.querySelectorAll('.counter-block-input')[1];
  let place = document.getElementById('select');
  let totalValue = document.getElementById('total');

  let personSum = 0;
  let daysSum = 0;
  let total = 0; 

  totalValue.innerHTML = 0;

  persons.addEventListener('change', function () {
    personSum = +this.value;
    total = (daysSum + personSum) * 4000;

    if (restDays.value == '') {
      totalValue.innerHTML = 0;
    } else {
       totalValue.innerHTML = total;
    };

  });

   restDays.addEventListener('change', function () {
    restDays = +this.value;
    total = (daysSum + personSum) * 4000;

    if (persons.value == '') {
      totalValue.innerHTML = 0;
    } else {
       totalValue.innerHTML = total;
    };

  });

  place.addEventListener('change', function () {
    if (restDays.value == '' || persons.value == '') {
       totalValue.innerHTML = 0;
    } else {
      let a = total;
      totalValue.innerHTML = a * this.options[this.selectedIndex].value;
    };

  });


})
