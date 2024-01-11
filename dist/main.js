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

/***/ "./src/js/header.js":
/*!**************************!*\
  !*** ./src/js/header.js ***!
  \**************************/
/***/ (() => {

window.addEventListener('scroll', toggleHeaderSticky);
window.addEventListener('resize', toggleHeaderSticky);

function toggleHeaderSticky() {
  const header = document.querySelector("#header");
  
  // Проверяем наличие header перед выполнением других операций
  if (header) {
    const sticky = header.offsetTop;

    // Пересчитываем значение offsetTop при изменении размеров окна
    window.addEventListener('resize', function() {
      sticky = header.offsetTop;
    });

    // Применяем стили в зависимости от положения прокрутки
    header.classList.toggle("sticky", window.scrollY > sticky);
  }
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




})();

/******/ })()
;
//# sourceMappingURL=main.js.map