const apiKey = "AIzaSyDD0voh3-eos2F4Up5XMfXKv7c--WPm77o"; // API google key 
const btnСategory = document.querySelectorAll('.btn-category'); // категории книг 
const buttonBasket = document.querySelector('.header-icons__bag'); // кнопка корзины 
const productQuantity = document.querySelector('.header-icons__bag-quantity'); // ярлык кол-ва покупок 
const elementCountBuy = document.querySelector('.header-icons__bag-quantity-text'); // кол-во покупок 
const loadMore = document.querySelector('.load_more'); // кнопка load more 
let resultItog = []; //Массив с отображаемым в данный момент товаром
let idBuy = 0; //ID для сохранения информации о товаре в localStorage
let countBuy = 0; //Счетчик покупок
let buttonBuy = document.getElementsByClassName('.buy'); // кнопка buy now / in the cart

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
useRequest(`https://www.googleapis.com/books/v1/volumes?q="subject:Architecture"&key=${apiKey}&printType=books&startIndex=0&maxResults=6&langRestrict=en`, displayResult)

let count = 6; //Задаем значение счетчику, который используется в URL
let categor = 'Architecture'; //Задае првонаальное значение категории книг

//Обработчик нажатия на категорию
for(let i = 0; i < btnСategory.length; i++) {
    btnСategory[i].addEventListener('click', () => {
        resultItog = []; // При переходе из одной категории в другую обновляем массив с отображаемыми карточками товара
        count = 6; // Обновляем счетчик
        // Удалено: selectingAnElement(btnСategory[i]);
        categor = categories[i]; // Обновляем выбранную категорию
        useRequest(`https://www.googleapis.com/books/v1/volumes?q="subject:${categor}"&key=${apiKey}&printType=books&startIndex=0&maxResults=6&langRestrict=en`, displayResult)
    });
};

//Обработчик нажания на Load more
loadMore.addEventListener('click', () =>{
    useRequest(`https://www.googleapis.com/books/v1/volumes?q="subject:${categor}"&key=${apiKey}&printType=books&startIndex=${count}&maxResults=6&langRestrict=en`, displayResult);
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