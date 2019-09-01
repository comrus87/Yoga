function slider () {

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

};

module.exports = slider;
