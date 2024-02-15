const apiKey = "AIzaSyDD0voh3-eos2F4Up5XMfXKv7c--WPm77o"; 
const btnCategory = document.querySelectorAll('.btn-category'); 
const buttonBasket = document.querySelector('.header-icons__bag');
const productQuantity = document.querySelector('.header-icons__bag-quantity');
const elementCountBuy = document.querySelector('.header-icons__bag-quantity-text');
const loadMore = document.querySelector('.load_more'); 
let resultItog = []; 
let idBuy = localStorage.idBuy ? Number(localStorage.idBuy) : 0;
let countBuy = Number(localStorage.countBuy);

productQuantity.classList.toggle("no_activ", countBuy === 0);
elementCountBuy.innerHTML = countBuy || '';

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

const resultNode = document.querySelector('.shelf_of_books'); 

function displayResult(apiData) {
    let cards = ''; 
    let result = apiData.items;
    resultItog = resultItog.concat(result);

    result.forEach(item => {
        let authors = item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Author unknown';
        let thumbnail = item.volumeInfo.imageLinks ? `style="background-image: url(${item.volumeInfo.imageLinks.thumbnail})"` : '';
        let description = item.volumeInfo.description ? item.volumeInfo.description : 'No description';

        let ratingValue = item.volumeInfo.averageRating || 0;
        let fullStars = Math.floor(ratingValue);
        let halfStar = ratingValue % 1 >= 0.5 ? 1 : 0;
        let emptyStars = 5 - fullStars - halfStar;
        let ratingsCount = item.volumeInfo.ratingsCount ? `${item.volumeInfo.ratingsCount} reviews` : '0 reviews';
        let averageRating = `<div class="stars">`;

        for (let i = 0; i < fullStars; i++) {
            averageRating += `<span class="star full-star"></span>`;
        }
        if (halfStar) {
            averageRating += `<span class="star half-star"></span>`;
        }
        for (let i = 0; i < emptyStars; i++) {
            averageRating += `<span class="star empty-star"></span>`;
        }
        averageRating += `<div class="rating-count">${ratingsCount}</div></div>`;

        let retailPrice = item.saleInfo.retailPrice ? `<h3>${item.saleInfo.retailPrice.amount} ${item.saleInfo.retailPrice.currencyCode}</h3>` : 'Price not available';
        let isInCart = localStorage.getItem(`Buy${item.id}`);
        let buttonText = isInCart ? 'IN THE CART' : 'BUY NOW';
        let buttonClass = isInCart ? 'buy in_the_cart' : 'buy';

        cards += `
            <div class="product_card">
                <div class="image_book" ${thumbnail}></div>
                <div class="description">
                    <p>${authors}</p>
                    <h2>${item.volumeInfo.title}</h2>
                    ${averageRating}
                    <div class="container_descrip">
                        <div class="descrip">${description}</div>
                    </div>
                    ${retailPrice}
                    <button class="${buttonClass}" style="margin-top: 16px" value="${item.id}">${buttonText}</button>
                </div>
            </div>
        `;
    });

    resultNode.innerHTML += cards;
    shoppingCounter();
}

function shoppingCounter() {
    document.querySelectorAll('.buy').forEach(button => {
        button.addEventListener('click', () => {
            let bookId = button.value;
            if (!button.classList.contains("in_the_cart")) {
                countBuy++;
                idBuy++;
                localStorage.setItem('idBuy', idBuy);
                localStorage.setItem('countBuy', countBuy);
                localStorage.setItem(`Buy${bookId}`, bookId);
                button.textContent = "IN THE CART";
                button.classList.add("in_the_cart");
            } else {
                countBuy--;
                localStorage.setItem('countBuy', countBuy);
                localStorage.removeItem(`Buy${bookId}`);
                button.textContent = "BUY NOW";
                button.classList.remove("in_the_cart");
            }
            updateCartDisplay();
        });
    });
}

function updateCartDisplay() {
    elementCountBuy.textContent = countBuy;
    productQuantity.classList.toggle("no_activ", countBuy === 0);
}

function removeItemFromCart(button, item) {
    let found = false;
    Object.keys(localStorage).forEach(key => {
        if (found) return;
        if (key.startsWith('Buy') && localStorage[key].includes(item.volumeInfo.title)) {
            localStorage.removeItem(key);
            found = true;
        }
    });

    if (found && countBuy > 0) {
        countBuy -= 1;
        localStorage.setItem('countBuy', countBuy);
        updateCartDisplay();
        button.textContent = "BUY NOW";
        button.classList.remove("in_the_cart");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    countBuy = parseInt(localStorage.getItem('countBuy') || '0', 10);
    idBuy = parseInt(localStorage.getItem('idBuy') || '0', 10);
    updateCartDisplay();
});

useRequest(`https://www.googleapis.com/books/v1/volumes?q="subject:Architecture"&key=${apiKey}&printType=books&startIndex=0&maxResults=6&langRestrict=en`, displayResult);

const categories = ['Architecture', 'Art', 'Autobiography', 'Business', 'Crafts & Hobbies', 'Drama', 'Fiction', 'Cooking', 'Health & Fitness', 'History', 'Humor', 'Poetry', 'Psychology', 'Science', 'Technology', 'Travel'];

let count = 6; 
let categor = 'Architecture';

btnCategory.forEach((btn, i) => {
    btn.addEventListener('click', () => {
        resultItog = [];
        count = 6;
        categor = categories[i];
        useRequest(`https://www.googleapis.com/books/v1/volumes?q="subject:${categor}"&key=${apiKey}&printType=books&startIndex=0&maxResults=6&langRestrict=en`, displayResult);
    });
});

loadMore.addEventListener('click', () => {
    useRequest(`https://www.googleapis.com/books/v1/volumes?q="subject:${categor}"&key=${apiKey}&printType=books&startIndex=${count}&maxResults=6&langRestrict=en`, displayResult);
    count += 6;
});

buttonBasket.addEventListener('click', () => {
    Object.keys(localStorage).forEach(key => {
        if (key.startsWith('Buy')) {
            console.log(key + ": " + localStorage.getItem(key));
        }
    });
});
