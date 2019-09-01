function form () {

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

};

module.exports = form;
