import {cart} from "../backend_data/cart_data.js";
import PriceChange from "../modules/priceChange.js";
import Grammar from "../modules/grammar.js";

class OrderSummary {
  constructor() {

  }

  refreshPrice() {
    const priceElem = document.getElementById('js-price');
    const currencyElem = document.getElementById('js-price-currency');
    const countElem = document.getElementById('js-product-count');
    const priceWithoutDiscountElem = document.getElementById('js-price-without-discount');
    const discountElem = document.getElementById('js-sale');

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

    currencyElem.innerHTML = cart.currency;
    countElem.innerHTML = `${resultCount.toLocaleString().replace(/,/g, ' ')} ${Grammar.productsForm(resultCount)}`;
  }
}

export default new OrderSummary();
