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

// переключатель темы
const button = document.querySelector('.header_check img');
let darkMode = localStorage.getItem('darkMode');
const map = document.querySelector('.map__map img');
const wrapper = document.getElementById('theme_css');
if(darkMode === 'true') {
  wrapper.classList.remove('theme-light');
  wrapper.classList.add('theme-dark');
  map.src = '../../assets/Landing/images/map-dark.png';
  button.src = '../../assets/Landing/images/swich-dark.png';
}
button.addEventListener('click', switchTheme);
function switchTheme() {
	if (wrapper.classList.contains('theme-light')) {
		wrapper.classList.remove('theme-light');
		wrapper.classList.add('theme-dark');
		map.src = '../../assets/Landing/images/map-dark.png';
		button.src = '../../assets/Landing/images/swich-dark.png';
    localStorage.setItem('darkMode', 'true');
	} else {
		wrapper.classList.remove('theme-dark');
		wrapper.classList.add('theme-light');
		map.src = '../../assets/Landing/images/map.png';
		button.src = '../../assets/Landing/images/swich-light.png';
    localStorage.setItem('darkMode', 'false');
	}
}

//Map Slider

let counter = 0;
const mapContainer = document.querySelector('.map__map');
const mapSlider = document.querySelector('.favorite_block_slider');
const mapItem = mapSlider.querySelectorAll('.slider_border');
const mapSliderNext = document.querySelector('.slider_next');
const mapSliderPrev = document.querySelector('.slider_prev');
const mapInput = document.querySelector('.how_it_works_input input');
const mapOutput = document.querySelector('.how_it_works_input span');
const mapAnimals = document.querySelectorAll('.animals');
const mapButton = document.querySelector('.map_animal_btn');

mapSliderNext.addEventListener('click', function () {
	counter = counter + 1;
	if (counter < 9) {
		setPetLocation(counter);
    setActiveMapAnimals(counter);
    watchOnline(counter)
		mapInput.value = counter;
		mapOutput.innerHTML = `0${counter}/`;
	} else {
		counter = 0;
	}

});

mapSliderPrev.addEventListener('click', function () {
	counter = counter - 1;
	if (counter > 0 && counter < 9) {
		setPetLocation(counter);
    setActiveMapAnimals(counter);
    watchOnline(counter)

		mapInput.value = counter;
		mapOutput.innerHTML = `0${counter}/`;
	} else {
		counter = 9;
	}
});

mapInput.addEventListener('change', (e) => {
	if (e.target.value <= e.target.max && e.target.value >= e.target.min) {
		counter = e.target.value;
    mapOutput.innerHTML = `0${counter}/`;
		setPetLocation(counter);
    setActiveMapAnimals(counter);
    watchOnline(counter)
	}
});

function setPetLocation(i) {
	mapItem.forEach((el) => {
		// if (i < 5) {
		// 	el.style.transform = `translateX(${-(i - 1) * (el.offsetWidth + 5)}px)`;
		// }
		if (el.classList.contains('active-map-slide')) {
			el.classList.remove('active-map-slide');
		}
		mapItem[i - 1].classList.add('active-map-slide');
	});
}

function setActiveMapAnimals(counter){
  console.log(mapAnimals)
  mapAnimals.forEach((el,i)=>{
  if (el.classList.contains('active-map__animals')) {
    el.classList.remove('active-map__animals');
  }
    if (el.dataset.index == counter) {
    	el.classList.add('active-map__animals');
    }
  });
}

mapSlider.addEventListener('click', (e) => {
	if (e.target.dataset.index !== undefined) {
		mapInput.value = e.target.dataset.index;
		mapOutput.innerHTML = `0${e.target.dataset.index}/`;
    setPetLocation(e.target.dataset.index);
    setActiveMapAnimals(e.target.dataset.index);
    watchOnline(e.target.dataset.index)
	}
});
mapContainer.addEventListener('click', (e) => {
  console.log(e.target)
	if (e.target.dataset.index !== undefined) {
		mapInput.value = e.target.dataset.index;
		mapOutput.innerHTML = `0${e.target.dataset.index}/`;
    setPetLocation(e.target.dataset.index);
    setActiveMapAnimals(e.target.dataset.index)
    watchOnline(e.target.dataset.index)
    
	}
});
function watchOnline(i) {
  
  console.log(i)
  if (i===1) {
    mapButton.href = '../Zoos_page/gorilla/index.html'
  }
  if (i === 2) {
    mapButton.href="../Zoos_page/panda/index.html"
  }
  if (i === 3) {
    mapButton.href="../Zoos_page/aligator/index.html"
  }
  if (i === 4) {
    mapButton.href="../Zoos_page/eagle/index.html"
  }
  
}
