function tabs () {
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

}

module.exports = tabs;
