function calc () {
  
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

};

module.exports = calc;
