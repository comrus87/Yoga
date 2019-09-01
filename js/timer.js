function timer () {
  
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

};

module.exports = timer;
