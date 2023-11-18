import Header from "./header.js";
import Tabbar from "./tabbar.js";

import {cart} from "../backend_data/cart_data.js";
import Cart from "./cart.js";
import orderSummary from "./orderSummary.js";
import orderDetails from "./orderDetails.js";


class Page {
  constructor() {

  }

  _refreshProductCount() {
    Header.setCartNotification(cart.productList.size);
    Tabbar.setCartNotification(cart.productList.size);
  }

  _refreshFavoritesNotification() {
    Tabbar.setFavoritesNotification(cart.favorites.length);
  }

  addListeners() {
    const favoritesElems = document.getElementsByClassName('js-product-favorites');
    const missingFavoritesElems = document.getElementsByClassName('js-missing-product-favorites');

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
    Cart.render();

    orderSummary.refreshPrice();

    Header.setCartNotification(cart.productList.size);

    Tabbar.setCartNotification(cart.productList.size);

    orderDetails.setDeliveryInfo(1, 2,2);
    orderSummary.setDeliveryType(1, 2,2);
    orderDetails.setCardInfo(2);
    orderSummary.setCardInfo(2);

    // this._refreshFavoritesNotification();
  }
}

export default new Page();
