import {cart} from "../backend_data/cart_data.js";
import productItem from "./productItem.js";
import missingProductItem from "./missingProductItem.js";
import Validation from "../modules/validation.js";
import OrderSummary from "./orderSummary.js";
import Grammar from "../modules/grammar.js";

class Cart {
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

    OrderSummary.refreshPrice();
    this._refreshProductCount();
  }

  _refreshProductCount() {
    let resultCount = 0;
    let resultPrice = 0;
    cart.productList.forEach((product) => {
      if (product.isChoose) {
        resultCount += product.count;
        resultPrice += Math.round(product.price * (1 - product.discount.number - cart.userDiscount.number) * product.count);
      }
    });

    const productCountElem = document.getElementById('js-product-count-price');
    productCountElem.innerHTML = `${resultCount} ${Grammar.productsForm(resultCount)} · ${resultPrice.toLocaleString().replace(/,/g, ' ')} ${cart.currency}`;

    const missingProductCountElem = document.getElementById('js-missing-product-count');
    let count = cart.missingProductsList.size;
    missingProductCountElem.innerHTML = `${count > 1 ? 'Отсутствуют' : 'Отсутствует'} · ${count} ${Grammar.productsForm(count)}`;
  }

  _refreshAllChoose(){
    const chooseAllElem = document.getElementById('js-choose-all-checkbox');

    cart.chooseAll = true;
    cart.productList.forEach((product) => {
      if (!product.isChoose) cart.chooseAll = false;
      productItem.setChooseProduct(product.id, product.isChoose);
    });

    chooseAllElem.checked = cart.chooseAll;
    OrderSummary.refreshPrice();
  }

  addListeners() {
    const trashElems = document.getElementsByClassName('trash-checkbox');
    const missingTrashElems = document.getElementsByClassName('missing-trash-checkbox');
    const counterElems = document.getElementsByClassName('js-product-counter');
    const counterIncElems = document.getElementsByClassName('js-product-counter-inc');
    const counterDecElems = document.getElementsByClassName('js-product-counter-dec');
    const favoritesElems = document.getElementsByClassName('js-product-favorites');
    const missingFavoritesElems = document.getElementsByClassName('js-missing-product-favorites');
    const chooseAllElem = document.getElementById('js-choose-all-checkbox');
    const chooseAllBlock = document.getElementById('js-products-choose_all');
    const chooseElems = document.getElementsByClassName('js-product-checkbox');
    const toggleElem = document.getElementById('js-toggle-products');
    const missingToggleElem = document.getElementById('js-toggle-missing-products');
    const productsElem = document.getElementById('js-products-container');
    const missingProductsElem = document.getElementById('js-missing-products-container');

    Array.from(trashElems).forEach((elem) => {
      elem.addEventListener('click', () => {
        const productId = elem.getAttribute('data-id');
        const product = document.querySelector(`.product__item[data-id="${productId}"]`);
        productsElem.style.height = productsElem.scrollHeight - product.offsetHeight + 'px';

        this._removeProduct('product', productId);
      });
    });

    Array.from(missingTrashElems).forEach((elem) => {
      elem.addEventListener('click', () => {
        const productId = elem.getAttribute('data-id');
        const product = document.querySelector(`.missing-product__item[data-id="${productId}"]`);
        missingProductsElem.style.height = missingProductsElem.scrollHeight - product.offsetHeight + 'px';

        this._removeProduct('missing', elem.getAttribute('data-id'))
      });
    });

    Array.from(counterIncElems).forEach((elem) => {
      elem.addEventListener('click', () => {
        const product = cart.productList.get(elem.getAttribute('data-id'));

        productItem.setCount(product.id, product.count + 1, product.leftInStock);
        OrderSummary.refreshPrice();
      });
    });

    Array.from(counterDecElems).forEach((elem) => {
      elem.addEventListener('click', () => {
        const product = cart.productList.get(elem.getAttribute('data-id'));

        productItem.setCount(product.id, product.count - 1, product.leftInStock);
        OrderSummary.refreshPrice();
      });
    });

    Array.from(counterElems).forEach((elem) => {
      elem.addEventListener('input', (event) => {
        const product = cart.productList.get(elem.getAttribute('data-id'));
        let newCount = Validation.counter(event.target.value, product.leftInStock, product.count);

        productItem.setCount(product.id, newCount, product.leftInStock);
        OrderSummary.refreshPrice();
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

    let isClick = false;
    productsElem.style.height = productsElem.scrollHeight + 'px';
    missingProductsElem.style.height = missingProductsElem.scrollHeight + 'px';
    toggleElem?.addEventListener('click', () => {
      if (!isClick) {
        this._refreshProductCount();
        isClick = true;
        toggleElem.classList.toggle('rotate-180');
        chooseAllBlock.classList.toggle('choose');

        if (productsElem.style.height && productsElem.style.height === '0px') {
          productsElem.classList.add('overflow-hidden');
          productsElem.style.height = productsElem.scrollHeight + 'px';
          setTimeout(() => productsElem.classList.remove('overflow-hidden'), 500);
        } else {
          productsElem.classList.add('overflow-hidden');
          productsElem.style.height = '0px';
        }

        setTimeout(() => isClick = false, 500);
      }
    });

    missingToggleElem?.addEventListener('click', () => {
      if (!isClick) {
        isClick = true;
        missingToggleElem.classList.toggle('rotate-180');

        if (missingProductsElem.style.height && missingProductsElem.style.height === '0px') {
          missingProductsElem.classList.add('overflow-hidden');
          missingProductsElem.style.height = missingProductsElem.scrollHeight + 'px';
          setTimeout(() => missingProductsElem.classList.remove('overflow-hidden'), 500);
        } else {
          missingProductsElem.classList.add('overflow-hidden');
          missingProductsElem.style.height = '0px';
        }

        setTimeout(() => isClick = false, 500);
      }
    });
  }

  render() {
    cart.productList.forEach((product) => {
      productItem.render(product);
    });

    cart.missingProductsList.forEach((product) => {
      missingProductItem.render(product);
    });

    this.addListeners();
    this._refreshProductCount();
    this._refreshAllChoose();
  }
}

export default new Cart();
