require('es6-promise').polyfill();
require('nodelist-foreach-polyfill');
require('formdata-polyfill');

window.addEventListener('DOMContentLoaded', function () {
  "use strict";
  let calc = require('./calc.js');
  let form = require('./form.js');
  let modal = require('./modal.js');
  let slider = require('./slider.js');
  let tabs = require('./tabs.js');
  let timer = require('./timer.js');

  calc();
  form();
  modal();
  slider();
  tabs();
  timer();

});