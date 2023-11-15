import Header from "./header.js";
import Tabbar from "./tabbar.js";
import productItem from "./productItem.js";
import missingProductItem from "./missingProductItem.js";

import {cart} from "../backend_data/cart_data.js";


class Page {
  constructor() {
    this.productsContainer = document.getElementById('js-products-container');
    this.missingProductsContainer = document.getElementById('js-missing-products-container');
  }

  _removeProduct(type, removeId) {
    let component;
    let list;

    switch (type) {
      case 'product':
        component = productItem;
        list = cart.products.productList;
        break;
      case 'missing':
        component = missingProductItem;
        list = cart.missingProducts;
        break;
    }

    component?.removeItem(removeId);

    let idInProductList = 0;
    list.forEach((product) => {
      if (product.id.toString() === removeId) {
        list.splice(idInProductList, 1);
      }
      idInProductList++;
    });
  }

  addListeners() {
    const trashElems = document.getElementsByClassName('trash-checkbox');
    const missingTrashElems = document.getElementsByClassName('missing-trash-checkbox');

    Array.from(trashElems).forEach((elem) => {
      elem.addEventListener('click', () => this._removeProduct('product', elem.getAttribute('data-id')));
    });

    Array.from(missingTrashElems).forEach((elem) => {
      elem.addEventListener('click', () => this._removeProduct('missing', elem.getAttribute('data-id')));
    });
  }

  render() {
    Header.setNotification(cart.products.productList.length);
    Tabbar.setNotification(cart.products.productList.length);

    cart.products.productList.forEach((product) => {
      this.productsContainer.innerHTML += productItem.render(product);
    });

    cart.missingProducts.forEach((product) => {
      this.missingProductsContainer.innerHTML += missingProductItem.render(product);
    });

    cart.products.productList.forEach(({id, count, discount, image, isChoose, leftInStock, price, currency}) => {
      productItem.setCount(id, count, leftInStock);
      productItem.setLeftInStock(id, leftInStock);
      productItem.setPrice(id, Math.round(price * (1 - discount.number - cart.products.userDiscount.number) * count) + ' ' + cart.products.currency, price * count + ' ' + cart.products.currency);
    });

    this.addListeners();
  }
}

export default new Page();
