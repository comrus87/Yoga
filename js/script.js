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
  
  let deadLine = '2019-08-25';

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

  let xhr = new XMLHttpRequest();

  xhr.open('POST', 'server.php');
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

  let formData = new FormData(this);

  let obj = {};
  formData.forEach(function(value, key) {
     obj[key] = value;
  });

  let json = JSON.stringify(obj);   
 
  xhr.addEventListener('load', function () {
   if (xhr.readyState < 4) {
    statusMessage.innerHTML = message.loading;
   } else if (xhr.readyState === 4 && xhr.status == 200) {
     statusMessage.innerHTML = message.success;
   } else {
     statusMessage.innerHTML = message.failure;
   }
  })

  xhr.send(formData);
 
  for (let i = 0; i < popupInput.length; i++ ) {
    popupInput[i].value = '';
  };

 };

 mainForm.addEventListener('submit', createRequestForm);

})
