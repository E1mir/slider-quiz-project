$(function () {
  /**
   * Настройка слайдера
   *
   * Подробная информация:
   * http://kenwheeler.github.io/slick/#settings
   */
  var testSliderOptions = {
    arrows: false,
    dots: false,
    draggable: false,
    infinite: false,
    swipe: false,
    name: 'mainSlider'
  };

  var innerSliderOptions = {
    dots: false,
    slidesToShow: 4,
    infinite: false,
    // Настройка слайдера на разрешение экрана, чем меньше экран
    // тем меньше слайдов на одном слайдере
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2
        }
      }
    ]
  };
  // Инициализируем наш слайдер с нашими тестами
  var $testSlider = $(".test-slider");
  $testSlider.slick(testSliderOptions); // Инициализируем сам слайдер


  var innerSlider = $(".inner-form-slider").slick(innerSliderOptions);
  // Узнаём длину слайдера для прогрес бара
  var $testSliderItem = $(".test-slider .test-slider_item");
  var testSliderLength = $testSliderItem.length;

  // Это кнопка позволяющая переключиться на следующий тест
  var $nextTestButton = $(".next-test");

  // Изначально отключаем все кнопки
  $nextTestButton.prop('disabled', true);

  // Вызываем функцию изменения прогресс бара по умолчанию 0
  changeProgressBar(0);
  checkInputValidation(0);


  // По нажатию на кнопку переключиться на следующий слайд
  $nextTestButton.on('click', function (event) {
    if (!$(this).hasClass('submit')) {
      event.preventDefault();
      $testSlider.slick('slickNext');
    }
  });

  /**
   * @param {Event} event Событие
   * @param {slick} slick Текущий слайдер над котором ведётся действие
   * @param {Number} oldIndex предыдущий индекс слайда
   * @param {Number} newIndex новый индекс слайда
   * Данная функция вызывается когда мы переключаемся на следующий слайд
   */
  function nextSlide(event, slick, oldIndex, newIndex) {
    if (slick.options.name === 'mainSlider') {
      changeProgressBar(newIndex);
      checkInputValidation(newIndex);
    }
  }

  $testSlider.on('beforeChange', nextSlide);

  /**
   *
   * @param {Number} currentIndex Текущий индекс слайдера
   *
   * Данная функция меняет шкалу прогресса в зависимости
   * на каком вопросе находится пользователь
   */
  function changeProgressBar(currentIndex) {
    var elementNumber = currentIndex + 1;
    var percent = elementNumber * 100 / testSliderLength + "%";
    var $bar = $(".p-bar > .p-bar_value");
    $bar.css('width', percent);
  }


  /**
   *
   * @param {Number} index Индекс проверяемого теста
   *
   * Данная функция проверят ввёл ли пользователь данные
   * в поля ввода или выбрал тот или иной выбор или чекбокс
   */
  function checkInputValidation(index) {
    var $element = $testSliderItem.eq(index);
    var $elementInputs = $element.find("input, select");
    var $nextButton = $element.find("button.next-test:eq(0)");
    $elementInputs.on('input', function () {
      var value = $(this).val().trim();
      var isValid = value !== "";
      $nextButton.prop('disabled', !isValid);
    });
  }

  $("#testForm").on('submit', function (e) {
    e.preventDefault();
    var formSerializedData = $(this).serializeObject(); // Получаем все данные с формы
    $.ajax({
      method: 'POST',
      data: formSerializedData,
      url: 'handler.php', // Путь к PHP обработчику
      success: function (response) {
        alert('Ваше сообщение отправлено!');
        window.location.replace('thank_you.html');
        console.log(response);
        // Код который выполняется после успешной отправки
      },
      error: function (err) {
        alert('Возникла какая-то ошибка');
        console.error(err); // Выводим на консоль ошибку
      }
    });
  });

  /**
   * Запрещаем ввод знаков 'e' и '+' в поле ввода для чисел
   */
  $("input[type='number']").on('keypress', function (e) {
    var kcd = e.keyCode;
    if (kcd === 43 || kcd === 101) return false;
  });

  /**
   *
   * Данная функция берет данные с формы и меняет его на
   * объект JS
   *
   */
  $.fn.serializeObject = function () {
    var obj = {};
    var array = this.serializeArray();
    $.each(array, function () {
      if (obj[this.name]) {
        if (!obj[this.name].push) {
          obj[this.name] = [obj[this.name]];
        }
        obj[this.name].push(this.value || '');
      } else {
        obj[this.name] = this.value || '';
      }
    });
    return obj;
  };
});
