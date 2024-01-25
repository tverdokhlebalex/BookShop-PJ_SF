/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/normalize.css/normalize.css":
/*!**************************************************!*\
  !*** ./node_modules/normalize.css/normalize.css ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/styles/main.scss":
/*!******************************!*\
  !*** ./src/styles/main.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/js/books.js":
/*!*************************!*\
  !*** ./src/js/books.js ***!
  \*************************/
/***/ (() => {

// переменные
const apiKey = "AIzaSyBgK_3N7g4vl0LNPFGkS7ZkqQV6n1GOG4w"; // API google key 
const categoryBooks = document.querySelectorAll('.category-books'); // категории книг 
const buttonBasket = document.querySelector('.header-icons__bag'); // кнопка корзины 
const productQuantity = document.querySelector('.header-icons__bag-quantity'); // ярлык кол-ва покупок 
const elementCountBuy = document.querySelector('header-icons__bag-quantity-text'); // кол-во покупок 
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

//Запрос 
async function useRequest(url, callback) {
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Статус ответа: ${response.status}`);
        }

        const result = await response.json();
        if (callback) {
            callback(result);
        }
    } catch (error) {
        console.error('Ошибка!', error);
    }
}
const resultNode = document.querySelector('.shelf_of_books'); //Нода для вставки результата запроса

//Вставка карточек товара в ноду
function displayResult(apiData) {
    let cards = ''; //
    let authors = ''; //Автор
    let thumbnail = ''; //Картинка
    let retailPrice = ''; //Стоимость
    let averageRating = ''; //Средний рейтинг
    let ratingsCount = ''; //Количество отзывов
    let description = ''; //Описание товара

    let result = apiData.items; //Выбор необходимой части запроса
    resultItog = resultItog.concat(result);

    //Цикл который проходит по результатам запроса и собирает карты товара
    result.forEach(item => {

        //Форматирую авторов 
        if (item.volumeInfo.authors) {
            if(item.volumeInfo.authors.length > 1) {
                authors = item.volumeInfo.authors.join(', ');
            } else {
                authors = item.volumeInfo.authors[0];
            }
        } else {
            authors = 'Author unknown'
        } 

        //Форматирую картинку
        if(item.volumeInfo.imageLinks) {
            thumbnail = `style="background-image: url(${item.volumeInfo.imageLinks.thumbnail})"`;
        } else {
            thumbnail = ''
        }

        //Форматирую описание
        if(item.volumeInfo.description) {
            description = item.volumeInfo.description;
        } else {
            description = 'No description';
        }

        //Форматирование рейтинга
        if(item.volumeInfo.averageRating) {
            averageRating = ``;
            value = item.volumeInfo.averageRating;
            value = Math.round(value);
            for(let i =0; i < value; i++) {
                averageRating +=`<span class="active"></span>`
            }
            value = 5 - value;
            if(value > 0) {
                for(let i = 0; i < value; i++) {
                    averageRating +=`<span></span>`
                }
            }

            ratingsCount = `${item.volumeInfo.ratingsCount} review`;
        } else {
            averageRating = ``;
            ratingsCount = ``
        }

        //Форматирую стоимость
        if(item.saleInfo.retailPrice) {
            retailPrice = `<h3>${item.saleInfo.retailPrice.amount} ${item.saleInfo.retailPrice.currencyCode}</h3>`;
        } else {
            retailPrice = '' 
        }

        //Создание кнопки покупки
        let buttonBuys = `<button class="buy" style="margin-top: 16px" value="${item.volumeInfo.title}">buy now</button>`

        //Проверяем, не была ли уже выбрана книга, кнопка которой должна будет изменится, если книжка была выбрана
        for(let key in localStorage) {
            if (!localStorage.hasOwnProperty(key)) {
              continue; // пропустит такие ключи, как "setItem", "getItem" и так далее
            }
            if(localStorage.getItem(key).includes(`${item.volumeInfo.title}`)) {
                buttonBuys = `<button class="buy in_the_cart" style="margin-top: 16px" value="${item.volumeInfo.title}">IN THE CART</button>`;
            }
        }

        let cardBlock //Блок с карточкой товара
        
        //Формирование бока с картчкой товара
        if(averageRating !== '') {
            cardBlock = `
                <div class="product_card">
                    <div class="image_book" ${thumbnail}></div>
                    <div class="description">
                        <p>${authors}</p>
                        <h2>${item.volumeInfo.title}</h2>
                        <div>
                            <div class="rating-mini">
                                ${averageRating}
                            </div>
                            ${ratingsCount}
                        </div>
                        <div class="container_descrip">
                            <div class="descrip">
                                ${description}
                            </div>
                        </div>
                            ${retailPrice}
                        ${buttonBuys}
                    </div>
                </div>
            `;
        } else {
            cardBlock = `
                <div class="product_card">
                    <div class="image_book" ${thumbnail}></div>
                    <div class="description">
                        <p>${authors}</p>
                        <h2>${item.volumeInfo.title}</h2>
                        ${ratingsCount}
                        <div class="container_descrip">
                            <div class="descrip">
                                ${description}
                            </div>
                        </div>
                            ${retailPrice}
                            ${buttonBuys}
                    </div>
                </div>
            `;
        }
      cards = cards + cardBlock; //добавление нескольких блоков
    });

    //Обновит ноду, если сменилась категория товара    
    if(count < 8) {
        resultNode.innerHTML = '';
    }
    
    //Добавляет в ноду блоки
    resultNode.innerHTML += cards;

    shoppingCounter(resultItog)
}


//Функция работы кнопки купить
function shoppingCounter(result){
    buttonBuy = document.getElementsByClassName('buy');
    for(let k = 0; k < buttonBuy.length; k++) {
        buttonBuy[k].addEventListener('click', () => {
            if(!buttonBuy[k].classList.contains("in_the_cart")) {
                countBuy += 1
                idBuy += 1
                //info = buttonBuy[k].getAttribute('value');
                //Сохраняем параметры в localStorage
                localStorage.setItem('idBuy', idBuy);
                localStorage.setItem('countBuy', countBuy);
                localStorage.setItem(`Buy${idBuy}`, JSON.stringify(result[k]));

                //Создаем/редактируем красный круг возле корзины
                elementCountBuy.innerHTML = `${countBuy}`;
                productQuantity.classList.remove("no_activ");

                //Меняем параметры кнопки, которую нажали 
                buttonBuy[k].innerHTML = "IN THE CART";
                buttonBuy[k].classList.add("in_the_cart");

            } else {
                info = buttonBuy[k].getAttribute('value');//Получаем название сохраненной книга

                //Чтобы счетчик покупок не ушел в минус
                if(countBuy >= 1) {
                    countBuy -= 1;
                }

                //Обновляем данные в localStorage
                localStorage.setItem('countBuy', countBuy);

                //Убираем/редактируем красный круг возле корзины
                elementCountBuy.innerHTML = `${countBuy}`;
                if(countBuy < 1) {
                    productQuantity.classList.add("no_activ");
                }

                //Удаляем лишние данные в localStorage
                for(let key in localStorage) {
                    if (!localStorage.hasOwnProperty(key)) {
                      continue; // пропустит такие ключи, как "setItem", "getItem" и так далее
                    }
                    if(localStorage.getItem(key).includes(`${info}`)) {
                        localStorage.removeItem(key);
                    }
                }

                //Меняем параметры кнопки, которую нажали 
                buttonBuy[k].innerHTML = "buy now";
                buttonBuy[k].classList.remove("in_the_cart");
            }
        });
    };
}

//Делаем первоначальный запрос
useRequest(`https://www.googleapis.com/books/v1/volumes?q="subject:Architecture"&key=${keyAPI}&printType=books&startIndex=0&maxResults=6&langRestrict=en`, displayResult)

let count = 6; //Задаем значение счетчику, который используется в URL
let categor = 'Architecture'; //Задае првонаальное значение категории книг

//Обработчик нажания на категорию
for(let i = 0; i < genre.length; i++) {
    genre[i].addEventListener('click', () => {
        resultItog = [];// При переходи из одной категори в другую обновляем массив с отображаемыми карточками товара
        count = 6; //Обновляем счетчик
        selectingAnElement(genre[i]);
        categor = categories[i]; //Обновляем выбранную категорию
        useRequest(`https://www.googleapis.com/books/v1/volumes?q="subject:${categor}"&key=${keyAPI}&printType=books&startIndex=0&maxResults=6&langRestrict=en`, displayResult)
    });
};

//Обработчик нажания на Load more
load.addEventListener('click', () =>{
    useRequest(`https://www.googleapis.com/books/v1/volumes?q="subject:${categor}"&key=${keyAPI}&printType=books&startIndex=${count}&maxResults=6&langRestrict=en`, displayResult);
    count += 6
});

//Обработчик нажатия на корзину
buttonBasket.addEventListener('click', () =>{
    for(let key in localStorage) {
        if (!localStorage.hasOwnProperty(key)) {
          continue; // пропустит такие ключи, как "setItem", "getItem" и так далее
        }
        console.log(key + ": " + localStorage.getItem(key))
    }

    //Для очистки localStorage
    /* countBuy = 0;
    localStorage.clear();
    productQuantity.classList.add("no_activ"); */
});

/***/ }),

/***/ "./src/js/header.js":
/*!**************************!*\
  !*** ./src/js/header.js ***!
  \**************************/
/***/ (() => {

//активация burger-menu 


const burgerMenu = document.querySelector ('.header-icons__burger')
if (burgerMenu) {
  const navMenu = document.querySelector ('.nav');
  burgerMenu.addEventListener("click", function (e) {
    navMenu.classList.toggle('_active');

  })
}

/***/ }),

/***/ "./src/js/slider.js":
/*!**************************!*\
  !*** ./src/js/slider.js ***!
  \**************************/
/***/ (() => {

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

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var normalize_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! normalize.css */ "./node_modules/normalize.css/normalize.css");
/* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/main.scss */ "./src/styles/main.scss");
/* harmony import */ var _js_slider_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/slider.js */ "./src/js/slider.js");
/* harmony import */ var _js_slider_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_js_slider_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _js_header_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/header.js */ "./src/js/header.js");
/* harmony import */ var _js_header_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_js_header_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _js_books_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./js/books.js */ "./src/js/books.js");
/* harmony import */ var _js_books_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_js_books_js__WEBPACK_IMPORTED_MODULE_4__);





})();

/******/ })()
;
//# sourceMappingURL=main.js.map