// собираем все якоря; устанавливаем время анимации и количество кадров
const anchors = [].slice.call(document.querySelectorAll('a[href*="#"]')),
    animationTime = 200,
    framesCount = 20;

anchors.forEach(function(item) {
  // каждому якорю присваиваем обработчик события
  item.addEventListener('click', function(e) {
    // убираем стандартное поведение
    e.preventDefault();
    
    // для каждого якоря берем соответствующий ему элемент и определяем его координату Y
    let coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset;
    
    // запускаем интервал, в котором
    let scroller = setInterval(function() {
      // считаем на сколько скроллить за 1 такт
      let scrollBy = coordY / framesCount;
      
      // если к-во пикселей для скролла за 1 такт больше расстояния до элемента
      // и дно страницы не достигнуто
      if(scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
        // то скроллим на к-во пикселей, которое соответствует одному такту
        window.scrollBy(0, scrollBy);
      } else {
        // иначе добираемся до элемента и выходим из интервала
        window.scrollTo(0, coordY);
        clearInterval(scroller);
      }
    // время интервала равняется частному от времени анимации и к-ва кадров
    }, animationTime / framesCount);
  });
});
const header__burger = document.querySelector('.icon-menu');
const header_menu = document.querySelector('.menu_body');
const back = document.querySelector('body');
const header__list = document.querySelector('.menu_list');

header__burger.onclick = function(){
    header__burger.classList.toggle('active');
    header_menu.classList.toggle('active');
    back.classList.toggle('lock');
}

header__list.onclick = function () {
    header__list.classList.remove('active');
    back.classList.toggle('lock');
}
//переключатель темы
let darkMode = localStorage.getItem('darkMode');
const button = document.querySelector('.header_check img');
const wrapper = document.getElementById('theme_css');
if(darkMode === 'true') {
  wrapper.classList.remove('theme-light');
  wrapper.classList.add('theme-dark');
  button.src = '../../../assets/Landing/images/swich-dark.png';
}
button.addEventListener('click', switchTheme);

function switchTheme() {
if (wrapper.classList.contains('theme-light')) {
  wrapper.classList.remove('theme-light');
  wrapper.classList.add('theme-dark');
  button.src = '../../../assets/Landing/images/swich-dark.png';
  localStorage.setItem('darkMode', 'true');
} else {
  wrapper.classList.remove('theme-dark');
  wrapper.classList.add('theme-light');
  button.src = '../../../assets/Landing/images/swich-light.png';
  localStorage.setItem('darkMode', 'false');
}
}
// Video Slider
const sliderVideo = document.querySelector('.how_it_works_slider')
const sliderStopVideo = document.querySelector('.iframe-stop_video')
const sliderBig = document.querySelector('.iframe-big')
console.log(sliderVideo)

sliderVideo.addEventListener('click', (e) => {
  let smallVideoLink = e.target.previousElementSibling.getAttribute('src');
  let sliderBigVideoLink = sliderBig.getAttribute('src');
  e.target.previousElementSibling.setAttribute('src', sliderBigVideoLink);
  sliderBig.setAttribute('src', smallVideoLink);
});
