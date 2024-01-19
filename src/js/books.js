// переменные
const apiKey = "AIzaSyBgK_3N7g4vl0LNPFGkS7ZkqQV6n1GOG4w"; // API google key 
const categoryBooks = document.querySelectorAll('.category-books'); // категории книг 
const buttonBasket = document.querySelector('.header-icons__bag'); // кнопка корзины 
const bagQuantity = document.querySelector('.header-icons__bag-quantity'); // ярлык кол-ва покупок 
const textQuantity = document.querySelector('header-icons__bag-quantity-text'); // кол-во покупок 
const loadMore = document.querySelector('.load-more'); // кнопка load more 
let resultItog = []; //Массив с отображаемым в данный момент товаром
let idBuy = 0; //ID для сохранения информации о товаре в localStorage
let countBuy = 0; //Счетчик покупок
let buttonBuy = document.getElementsByClassName('buy'); // кнопка buy now / in the cart

// Массив категорий книг 
const categories = ['Architecture', 'Art', 'Autobiography', 'Business', 'Crafts & Hobbies', 'Drama', 'Fiction', 'Cooking', 'Health & Fitness', 'History', 'Humor', 'Poetry', 'Psychology', 'Science', 'Technology', 'Travel'];

// Проверка и установка idBuy
idBuy = localStorage.idBuy ? Number(localStorage.idBuy) : 0;

// Проверка countBuy и обновление DOM
countBuy = Number(localStorage.countBuy);
productQuantity.classList.toggle("no_activ", countBuy === 0);
elementCountBuy.innerHTML = countBuy || '';

// Функция для визуального выбора категории
function selectingAnElement(elem) {
    const activeCategory = document.querySelector('.categories .activ');
    activeCategory && activeCategory.classList.remove('activ');
    elem.parentNode.classList.add('activ');
}