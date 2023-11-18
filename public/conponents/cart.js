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

    Array.from(trashElems).forEach((elem) => {
      elem.addEventListener('click', () => {
        const productId = elem.getAttribute('data-id');

        this._removeProduct('product', productId);
      });
    });

    Array.from(missingTrashElems).forEach((elem) => {
      elem.addEventListener('click', () => {
        const productId = elem.getAttribute('data-id');

        this._removeProduct('missing', productId)
      });
    });

    Array.from(counterIncElems).forEach((elem) => {
      elem.addEventListener('click', () => {
        const product = cart.productList.get(elem.getAttribute('data-id'));
        let newCount = Validation.counter(product.count + 1, product.leftInStock, product.count);

        productItem.setCount(product.id, newCount, product.leftInStock);
        OrderSummary.refreshPrice();
      });
    });

    Array.from(counterDecElems).forEach((elem) => {
      elem.addEventListener('click', () => {
        const product = cart.productList.get(elem.getAttribute('data-id'));
        let newCount = Validation.counter(product.count - 1, product.leftInStock, product.count);

        productItem.setCount(product.id, newCount, product.leftInStock);
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
    const productsHideElem = document.getElementById('js-hidden-block-products');
    const missingProductsHideElem = document.getElementById('js-hidden-block-products-missing');

    const hide = (elem, toggle, isChooseAll = false) => {
      if (!isClick) {
        this._refreshProductCount();
        isClick = true;
        toggle.classList.toggle('rotate-180');
        if (isChooseAll) chooseAllBlock.classList.toggle('choose');
        elem.classList.toggle('hidden');

        if (elem.classList.contains('hidden')) {
          elem.classList.add('overflow-hidden');
        } else {
          setTimeout(() => elem.classList.remove('overflow-hidden'), 700);
        }

        setTimeout(() => isClick = false, 700);
      }
    }

    toggleElem?.addEventListener('click', () => {
      hide(productsHideElem, toggleElem, true);
    });

    missingToggleElem?.addEventListener('click', () => {
      hide(missingProductsHideElem, missingToggleElem);
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
