// div внутри корзины, в который мы добавляем товары
const cartWrapper = document.querySelector('.cart-wrapper');

// Отслеживаем клик на странице
window.addEventListener('click', function(event) {
    // Проверяем действительно ли был клик по кнопке корзины
    if (event.target.hasAttribute('data-cart')) {
        
        // Находим карточку с товаром по которой был клик
        const card = event.target.closest('.card');

        // Собираем данные с карточки товара и записываем в объект
        const productInfo = {
            id: card.dataset.id,
            imgSrc: card.querySelector('.product-img').getAttribute('src'),
            title: card.querySelector('.item-title').innerText,
            itemInBox: card.querySelector('[data-items-in-box]').innerText,
            weight: card.querySelector('.price__weight').innerText,
            price: card.querySelector('.price__currency').innerText,
            counter: card.querySelector('[data-counter]').innerText,
        }
       
        // Проверяем есть ли товар в корзине
        const itemInCart = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`);

        // Если товар есть в корзине
        if(itemInCart) {
            const counterElement = itemInCart.querySelector('[data-counter]');
            counterElement.innerText = parseInt(counterElement.innerText) + parseInt(productInfo.counter);
        } else {
            // Подставляем данные в шаблон 
        const cartItemHTML = `<div class="cart-item" data-id="${productInfo.id}">
        <div class="cart-item__top">
            <div class="cart-item__img">
                <img src="${productInfo.imgSrc}" alt="${productInfo.title}">
            </div>
            <div class="cart-item__desc">
                <div class="cart-item__title">${productInfo.title}</div>
                <div class="cart-item__weight">${productInfo.itemInBox} / ${productInfo.weight}</div>
                <div class="cart-item__details">
                    <div class="items items--small counter-wrapper">
                        <div class="items__control" data-action="minus">-</div>
                        <div class="items__current" data-counter="">${productInfo.counter}</div>
                        <div class="items__control" data-action="plus">+</div>
                    </div>
                    <div class="price">
                        <div class="price__currency">${productInfo.price}</div>
                    </div>
                </div>
            </div>
        </div>
        </div>`;

        // Отображаем товар в корзине
        cartWrapper.insertAdjacentHTML('beforeend', cartItemHTML);
        }

        // Сбрасываем счётчик на единицу
        card.querySelector('[data-counter]').innerText = 1;

        // Отображаение статуса корзины
        toggleCartStatus();

        // Подсчет общей стоимости
        calcCartPriceAndDelivery();
    }
});