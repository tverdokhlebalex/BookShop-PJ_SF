//навигация 

const entities = [
    {
        img: './images/banner1.png',
        dot: document.querySelector('.dot-1')
    },
    {
        img: './images/banner2.png',
        dot: document.querySelector('.dot-2'),
    },
    {
        img: './images/banner3.png',
        dot: document.querySelector('.dot-3'),
    }
];

const slider = document.querySelector('.slider-content__img');

//ФУНКЦИИ 
//замена фото на слайдах 
function setEntity(index) {

    slider.style.backgroundImage = `url(${entities[index].img})`;
}

//2.Неактивные -> активные элементы
function makeActive(index) {
    entities[index].dot.style.opacity = 1;
    if (entities[index].line) {
        entities[index].line.classList.add('brass-hypertext');
    }
}
//3.Активные -> неактивные элементы
function makeInactive(index) {
    entities[index].dot.style.opacity = 0.3;
    if (entities[index].line) {
        entities[index].line.classList.remove('brass-hypertext');
    }
}

//5.Переключение нажатием на точку/заголовок
function pressOnElement(index) {
    makeInactive(currentIndex);
    currentIndex = index;
    setEntity(currentIndex);
    makeActive(currentIndex);
}


//ОБРАБОТКА НАЖАТИЙ:
//0.Настройка на нулевой элемент
let currentIndex = 0;

//1. Левая стрелка
arrowLeft.addEventListener('click', () => {
    makeInactive(currentIndex);
    currentIndex = (currentIndex === 0) ? entities.length - 1 : currentIndex - 1;
    changeTextContent(currentIndex);
    setEntity(currentIndex);
    makeActive(currentIndex);
});

//1. Правая стрелка 
arrowRight.addEventListener('click', () => {
    makeInactive(currentIndex);
    currentIndex = (currentIndex === entities.length - 1) ? 0 : currentIndex + 1;
    changeTextContent(currentIndex);
    setEntity(currentIndex);
    makeActive(currentIndex);
});


//3. Точки и заголовки 
for (let i = 0; i < entities.length; i++) {
    if (entities[i].dot) {
        entities[i].dot.addEventListener('click', () => {
            pressOnElement(i);
        });
    }
}

// Начальная настройка слайда
setEntity(currentIndex);
makeActive(currentIndex);

