function calcCartPriceAndDelivery() {
    const cartItems = document.querySelectorAll('.cart-item');
    const totalPriceEl = document.querySelector('.total-price');
    const deliveryCost = document.querySelector('.delivery-cost');
    const cartDelivery = document.querySelector('[data-cart-delivery]');
    const freeDelivery = document.querySelector('[data-cart-free]');
    let totalPrice = 0;

    cartItems.forEach(function (item) {
       const amountEl = item.querySelector('[data-counter]');
       const priceEl = item.querySelector('.price__currency');
       const currentPrice = parseInt(amountEl.innerText) * parseInt(priceEl.innerText);
       totalPrice += currentPrice;
    })

    totalPriceEl.innerText = totalPrice;

    if (totalPrice > 0) {
        cartDelivery.classList.remove('none');
    } else {
        cartDelivery.classList.add('none');
    }

    if (totalPrice >= 600) {
        freeDelivery.classList.add('none');
        deliveryCost.classList.add('free');
        deliveryCost.innerText = 'бесплатно';
    } else {
        freeDelivery.classList.remove('none');
        deliveryCost.classList.remove('free');
        deliveryCost.innerText = '250 грн';
    }
}


