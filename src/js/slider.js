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
document.addEventListener('DOMContentLoaded', function() {


const slider = document.querySelector('.slider-content__img');
let currentIndex = 0;

function setEntity(index) {
    slider.style.backgroundImage = `url(${entities[index].img})`;
}

function makeActive(index) {
    entities[index].dot.style.opacity = 1;
}

function makeInactive(index) {
    entities[index].dot.style.opacity = 0.3;
}

function pressOnElement(index) {
    makeInactive(currentIndex);
    currentIndex = index;
    setEntity(currentIndex);
    makeActive(currentIndex);
}

function autoSlide() {
    makeInactive(currentIndex);
    currentIndex = (currentIndex === entities.length - 1) ? 0 : currentIndex + 1;
    setEntity(currentIndex);
    makeActive(currentIndex);
}

setInterval(autoSlide, 5000);

for (let i = 0; i < entities.length; i++) {
    if (entities[i].dot) {
        entities[i].dot.addEventListener('click', () => {
            pressOnElement(i);
        });
    }
}

setEntity(currentIndex);
makeActive(currentIndex);
});

console.log(entities[0].img);