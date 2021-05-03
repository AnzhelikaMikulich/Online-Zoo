// навигация по странице
const anchors = [].slice.call(document.querySelectorAll('a[href*="#"]')),
	animationTime = 200,
	framesCount = 20;

anchors.forEach(function (item) {
	item.addEventListener('click', function (e) {
		e.preventDefault();
		let coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset;
		let scroller = setInterval(function () {
			let scrollBy = coordY / framesCount;
			if (
				scrollBy > window.pageYOffset - coordY &&
				window.innerHeight + window.pageYOffset < document.body.offsetHeight
			) {
				window.scrollBy(0, scrollBy);
			} else {
				window.scrollTo(0, coordY);
				clearInterval(scroller);
			}
		}, animationTime / framesCount);
	});
});

// меню-бургер
const header__burger = document.querySelector('.icon-menu');
const header_menu = document.querySelector('.menu_body');
const back = document.querySelector('body');
const header__list = document.querySelector('.menu_list');

header__burger.onclick = function () {
	header__burger.classList.toggle('active');
	header_menu.classList.toggle('active');
	back.classList.toggle('lock');
};

header__list.onclick = function () {
	header__list.classList.remove('active');
	back.classList.toggle('lock');
};

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

//СЛАЙДЕР Pets in Zoo
let ofset = 0;
const slider_body = document.querySelector('#pets-in-zoo');
const slider_next = document.querySelector('.slider_next_pets-in-zoo');
const slider_prev = document.querySelector('.slider_prev_pets-in-zoo');

slider_next.addEventListener('click', function () {
	ofset = ofset + 297;
	if (ofset > 1200) {
		ofset = 0;
	}
	slider_body.style.left = -ofset + 'px';
});
slider_prev.addEventListener('click', function () {
	ofset = ofset - 308;
	if (ofset < 0) {
		ofset = 1200;
	}
	slider_body.style.left = -ofset + 'px';
});

// работа Input-range

const input = document.querySelectorAll('input[type="range"]');
const output = document.querySelectorAll('.label-title span')


input.forEach((e,i) =>
	e.addEventListener('input', () => {
		var newValue = e.value;
		output[i].innerHTML = `0${newValue}/`;
	})
);
