import Header from "./header.js";
import Tabbar from "./tabbar.js";

import {cart} from "../backend_data/cart_data.js";
import Cart from "./cart.js";
import orderSummary from "./orderSummary.js";
import modal from "./modal.js";


class Page {
  constructor() {

  }

  _refreshProductCount() {
    Header.refreshCartNotification();
    Tabbar.refreshCartNotification();
    Tabbar.refreshFavoritesNotification()
  }

  _refreshFavoritesNotification() {
    Tabbar.refreshFavoritesNotification()
  }

  addListeners() {
    const favoritesElems = document.getElementsByClassName('js-product-favorites');
    const missingFavoritesElems = document.getElementsByClassName('js-missing-product-favorites');


    Array.from(favoritesElems).forEach((elem) => {
      elem.addEventListener('click', () => {
        let product = cart.productList.get(elem.getAttribute('data-id'));
        product.isFavorites = elem.checked;
        cart.productList.set(`${product.id}`, product);

        console.log(product)

        this._refreshFavoritesNotification();
      });
    });

    Array.from(missingFavoritesElems).forEach((elem) => {
      elem.addEventListener('click', () => {
        let product = cart.missingProductsList.get(elem.getAttribute('data-id'));
        product.isFavorites = elem.checked;
        cart.missingProductsList.set(`${product.id}`, product);

        this._refreshFavoritesNotification();
      });
    });
  }

  render() {
    Cart.render();

    orderSummary.refreshPrice();

    modal.render();

    this._refreshProductCount();
    this._refreshFavoritesNotification();
    this.addListeners();
    // this._refreshFavoritesNotification();
  }
}

export default new Page();
