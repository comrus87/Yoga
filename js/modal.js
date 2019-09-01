function modal () {

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

};

module.exports = modal;
