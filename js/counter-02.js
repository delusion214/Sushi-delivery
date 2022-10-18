// Добавляем прослушку на всем окне
window.addEventListener('click', function(event) {
    
    // Объявляем переменную для счетчика
    let counter;

    if (event.target.dataset.action === 'plus' || event.target.dataset.action === 'minus') {
        // Находим обвёртку(родителя) счетчика и его дата-атрибут
        const counterWrapper = event.target.closest('.counter-wrapper');
        counter = counterWrapper.querySelector('[data-counter]');
    }

    // Проверяем является ли элемент кнопкой плюс и увеличиваем на 1
    if (event.target.dataset.action === 'plus') {
        counter.innerText = ++counter.innerText;
    }

    // Проверяем является ли элемент кнопкой минус и уменьшаем, если цифра не больше 1
    if (event.target.dataset.action === 'minus') {

        if(parseInt(counter.innerText) > 1) {
            counter.innerText = --counter.innerText;
        } else if (event.target.closest('.cart-wrapper') && parseInt(counter.innerText) === 1) {
            event.target.closest('.cart-item').remove();
            toggleCartStatus();
            calcCartPriceAndDelivery();
        }
        
    }

    // Проверяем клик на + или - внутри корзины
    if (event.target.hasAttribute('data-action') && event.target.closest('.cart-wrapper')) {
        calcCartPriceAndDelivery();
    }
});