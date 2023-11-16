import Header from "./header.js";
import Tabbar from "./tabbar.js";
import productItem from "./productItem.js";
import missingProductItem from "./missingProductItem.js";

import Validation from "../modules/validation.js";
import priceChange from "../modules/priceChange.js";

import {cart} from "../backend_data/cart_data.js";
import PriceChange from "../modules/priceChange.js";


class Page {
  constructor() {

  }

  _removeProduct(type, removeId) {
    switch (type) {
      case 'product':
        productItem?.removeItem(removeId);
        cart.productList.delete(removeId);
        break;
      case 'missing':
        missingProductItem?.removeItem(removeId);
        cart.missingProductsList.delete(removeId);
        break;
    }

    this._refreshPrice();
    this._refreshCartNotification();
  }

  _refreshPrice() {
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

    let countForm = ''
    if (resultCount % 10 === 1 && resultCount % 100 !== 11) {
      countForm = 'товар';
    } else if ((resultCount % 10 === 2 || resultCount % 10 === 3 || resultCount % 10 === 4) && (resultCount % 100 < 10 || resultCount % 100 >= 20)) {
      countForm = 'товара';
    } else {
      countForm = 'товаров';
    }

    const priceChange = new PriceChange();

    priceChange.debounce([
      {field: priceElem, value: resultPrice, currency: false},
      {field: priceWithoutDiscountElem, value: resultPriceWithoutDiscount, currency: true},
      {field: discountElem, value: resultDiscount, currency: true, minus: true},
    ]);

    currencyElem.innerHTML = cart.currency;
    countElem.innerHTML = `${resultCount.toLocaleString().replace(/,/g, ' ')} ${countForm}`;
  }

  _refreshCartNotification() {
    Header.setCartNotification(cart.productList.size);
    Tabbar.setCartNotification(cart.productList.size);
  }

  _refreshFavoritesNotification() {
    Tabbar.setFavoritesNotification(cart.favorites.length);
  }

  _refreshAllChoose() {
    const chooseAllElem = document.getElementById('js-choose-all');

    cart.chooseAll = true;
    cart.productList.forEach((product) => {
      if (!product.isChoose) cart.chooseAll = false;
      productItem.setChooseProduct(product.id, product.isChoose);
    });

    chooseAllElem.checked = cart.chooseAll;

    this._refreshPrice();
  }

  addListeners() {
    const trashElems = document.getElementsByClassName('trash-checkbox');
    const missingTrashElems = document.getElementsByClassName('missing-trash-checkbox');
    const counterElems = document.getElementsByClassName('js-product-counter');
    const counterIncElems = document.getElementsByClassName('js-product-counter-inc');
    const counterDecElems = document.getElementsByClassName('js-product-counter-dec');
    const favoritesElems = document.getElementsByClassName('js-product-favorites');
    const missingFavoritesElems = document.getElementsByClassName('js-missing-product-favorites');
    const chooseAllElem = document.getElementById('js-choose-all');
    const chooseElems = document.getElementsByClassName('js-product-checkbox');
    const toggleElem = document.getElementById('js-toggle-products');
    const productsElem = document.getElementById('js-products-container');

    Array.from(trashElems).forEach((elem) => {
      elem.addEventListener('click', () => {
        this._removeProduct('product', elem.getAttribute('data-id'));
      });
    });

    Array.from(missingTrashElems).forEach((elem) => {
      elem.addEventListener('click', () => this._removeProduct('missing', elem.getAttribute('data-id')));
    });

    Array.from(counterIncElems).forEach((elem) => {
      elem.addEventListener('click', () => {
        const product = cart.productList.get(elem.getAttribute('data-id'));

        productItem.setCount(product.id, product.count + 1, product.leftInStock);
        this._refreshPrice();
      });
    });

    Array.from(counterDecElems).forEach((elem) => {
      elem.addEventListener('click', () => {
        const product = cart.productList.get(elem.getAttribute('data-id'));

        productItem.setCount(product.id, product.count - 1, product.leftInStock);
        this._refreshPrice();
      });
    });

    Array.from(counterElems).forEach((elem) => {
      elem.addEventListener('input', (event) => {
        const product = cart.productList.get(elem.getAttribute('data-id'));
        let newCount = Validation.counter(event.target.value, product.leftInStock, product.count);

        productItem.setCount(product.id, newCount, product.leftInStock);
        this._refreshPrice();
      });
    });

    Array.from(chooseElems).forEach((elem) => {
      elem.addEventListener('click', (event) => {
        const product = cart.productList.get(elem.getAttribute('data-id'));
        product.isChoose = !product.isChoose;
        cart.productList.set(product.id, product);

        if (!product.isChoose) {
          cart.chooseAll = false;
        }

        this._refreshAllChoose();
      });
    });

    chooseAllElem?.addEventListener('click', () => {
      cart.chooseAll = !cart.chooseAll;

      cart.productList.forEach((product) => {
        product.isChoose = cart.chooseAll;
      });

      this._refreshAllChoose();
    });

    productsElem.style.height = productsElem.scrollHeight + 'px';
    toggleElem?.addEventListener('click', () => {
      console.log(productsElem.style.height)
      if (productsElem.style.height && productsElem.style.height === '0px') {
        productsElem.style.height = productsElem.scrollHeight + 'px';
      } else {
        productsElem.style.height = '0px';
      }
      console.log(productsElem.style.height)
    });


    /*Array.from(missingFavoritesElems).forEach((elem) => {
      elem.addEventListener('click', () => {
        const product = cart.missingProductsList.get(elem.getAttribute('data-id'));
        product.isFavorites = elem.checked;
        cart.missingProductsList.set(`${product.id}`, product);

        this._refreshFavoritesNotification();

      });
    });*/
  }

  render() {
    cart.productList.forEach((product) => {
      productItem.render(product);
    });

    cart.missingProductsList.forEach((product) => {
      missingProductItem.render(product);
    });

    this.addListeners();

    this._refreshCartNotification();
    this._refreshPrice();
    this._refreshAllChoose();
    // this._refreshFavoritesNotification();
  }
}

export default new Page();
