// Navigation
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

// Burger-menu
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

// Swich Theme
const button = document.querySelector('.header_check img');
let darkMode = localStorage.getItem('darkMode');
const map = document.querySelector('.map__map img');
const wrapper = document.getElementById('theme_css');
if (darkMode === 'true') {
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

// Input-range
const input = document.querySelectorAll('input[type="range"]');
const output = document.querySelectorAll('.label-title span');
input.forEach((e, i) =>
	e.addEventListener('input', () => {
		let newValue = e.value;
		output[i].innerHTML = `0${newValue}/`;
	})
);

// FavoriteAnimal Slider//
const favSlider = document.querySelector('.favorite_animal_slider_img');
const favInput = document.querySelector('.input-favorite input');
const favOutput = document.querySelector('.input-favorite span');
const favItems = favSlider.querySelectorAll('.slider_item_favorite');

favSlider.addEventListener('click', (e) => {
	if (e.target.dataset.index !== undefined) {
		favInput.value = e.target.dataset.index;
		favOutput.innerHTML = `0${e.target.dataset.index}/`;
		setLocation(e.target.dataset.index);
	}
});

favInput.addEventListener('change', (e) => {
	if (e.target.value <= e.target.max && e.target.value >= e.target.min) {
		setLocation(e.target.value);
	}
});
function setLocation(i) {
	favItems.forEach((el) => {
		if (el.classList.contains('slider_item_favorite_big')) {
			el.classList.remove('slider_item_favorite_big');
		}
		el.style.transform = `translateX(${-(i - 2) * el.offsetWidth}px)`;
	});
	favItems[i - 1].classList.add('slider_item_favorite_big');
}

//Pets in Zoo Slider
let ofset = 0;
let counter = 0;
const petsSlider = document.querySelector('#pets-in-zoo');
const petsItem = petsSlider.querySelectorAll('.slider_img_img');
const petsSliderNext = document.querySelector('.slider_next_pets-in-zoo');
const petsSliderPrev = document.querySelector('.slider_prev_pets-in-zoo');
const petsInput = document.querySelector('.pets-in-zoo_input input');
const petsOutput = document.querySelector('.pets-in-zoo_input span');

petsSliderNext.addEventListener('click', function () {
	counter = counter + 1;
	if (counter < 9) {
		setPetLocation(counter);
		petsInput.value = counter;
		petsOutput.innerHTML = `0${counter}/`;
	} else {
		counter = 0;
	}
});

petsSliderPrev.addEventListener('click', function () {
	counter = counter - 1;
	if (counter > 0 && counter < 9) {
		setPetLocation(counter);
		petsInput.value = counter;
		petsOutput.innerHTML = `0${counter}/`;
	} else {
		counter = 9;
	}
});

petsInput.addEventListener('change', (e) => {
	if (e.target.value <= e.target.max && e.target.value >= e.target.min) {
		counter = e.target.value
		setPetLocation(counter);
	}
});


function setPetLocation(i) {
	petsItem.forEach((el) => {
		if (i <9) {
			el.style.transform = `translateX(${-(i - 4) * (el.offsetWidth + 18)}px)`;
		}
			if (i <5) {
			el.style.transform = `translateX(0px)`;
		}
		if (el.classList.contains('active-pets-in-zoo')) {
			el.classList.remove('active-pets-in-zoo');
		}
		petsItem[i - 1].classList.add('active-pets-in-zoo');
	});
}


