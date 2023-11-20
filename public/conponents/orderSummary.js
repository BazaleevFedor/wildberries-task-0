import {cart} from "../backend_data/cart_data.js";
import PriceChange from "../modules/priceChange.js";
import Grammar from "../modules/grammar.js";
import orderDetails from "./orderDetails.js";

class OrderSummary {
  constructor() {
    this.addListeners();
  }

  refreshPrice() {
    const priceElem = document.getElementById('js-price');
    const currencyElem = document.getElementById('js-price-currency');
    const countElem = document.getElementById('js-product-count');
    const priceWithoutDiscountElem = document.getElementById('js-price-without-discount');
    const discountElem = document.getElementById('js-sale');
    const textImmediatelyElem = document.getElementById('js-pay-immediately-text');
    const orderConfirmElem = document.getElementById('js-order-confirm');

    let resultPrice = 0;
    let resultCount = 0;
    let resultPriceWithoutDiscount = 0;
    let resultDiscount = 0;

    cart.productList.forEach((product) => {
      if (product.isChoose) {
        resultCount += product.count;
        resultPrice += Math.round(product.price * (1 - product.discount.number - cart.userDiscount.number) * product.count);
        resultPriceWithoutDiscount += product.price * product.count;
        resultDiscount += Math.round(product.price * (product.discount.number + cart.userDiscount.number) * product.count);
      }
    });

    const priceChange = new PriceChange();
    priceChange.debounce([
      {field: priceElem, value: resultPrice, currency: false},
      {field: priceWithoutDiscountElem, value: resultPriceWithoutDiscount, currency: true},
      {field: discountElem, value: resultDiscount, currency: true, minus: true},
    ]);

    if (textImmediatelyElem.classList.contains('display-none')) {
      orderConfirmElem.innerHTML = `Оплатить ${resultPrice.toLocaleString().replace(/,/g, ' ')} ${cart.currency}`;
    }

    currencyElem.innerHTML = cart.currency;
    countElem.innerHTML = `${resultCount.toLocaleString().replace(/,/g, ' ')} ${Grammar.productsForm(resultCount)}`;
    orderDetails.refreshDateDelivery();
  }

  setDeliveryDate(date) {
    const dateDeliveryElem = document.getElementById('js-delivery-data');
    dateDeliveryElem.innerHTML = date;
  }

  setDeliveryType(isPoint, addressIndex, pointIndex) {
    const typeDeliveryElem = document.getElementById('js-delivery-type');
    const addressDeliveryElem = document.getElementById('js-delivery-address');

    if (isPoint) {
      typeDeliveryElem.innerHTML = cart.delivery.type[isPoint].shortText;
      addressDeliveryElem.innerHTML = cart.delivery.points.get(pointIndex).address;
    } else {
      typeDeliveryElem.innerHTML = cart.delivery.type[isPoint].text;
      addressDeliveryElem.innerHTML = cart.delivery.address.get(addressIndex);
    }
  }

  setDeliveryCard() {
    const typeDeliveryElem = document.getElementById('js-delivery-type');
    const addressDeliveryElem = document.getElementById('js-delivery-address');


  }

  setCardInfo(cardId) {
    const cardNumberElem = document.getElementById('js-card-shot-number');
    const cardImageElem = document.getElementById('js-card-shot-img');
    const card = cart.cardInfo[cardId];

    cardNumberElem.innerHTML = card.card;
    cardImageElem.src = card.bankImage;
  }

  addListeners() {
    const payImmediatelyChangeElem = document.getElementById('pay-immediately-checkbox');
    const textImmediatelyElem = document.getElementById('js-pay-immediately-text');
    const orderConfirmElem = document.getElementById('js-order-confirm');
    const priceElem = document.getElementById('js-price');

    payImmediatelyChangeElem?.addEventListener('click', () => {
      textImmediatelyElem.classList.toggle('display-none');
      if (textImmediatelyElem.classList.contains('display-none')) {
        orderConfirmElem.innerHTML = `Оплатить ${priceElem.innerHTML} ${cart.currency}`;
      } else {
        orderConfirmElem.innerHTML = 'Заказать';
      }
    });

    orderConfirmElem?.addEventListener('click', () => {
      if (orderDetails.validateAllFields()) {
        window.location.href = '#';
      }
    });
  }
}

export default new OrderSummary();
