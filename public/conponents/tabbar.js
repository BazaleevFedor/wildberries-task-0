import {cart} from "../backend_data/cart_data.js";
import productItem from "./productItem.js";
import missingProductItem from "./missingProductItem.js";

class Tabbar {
  constructor() {
    this.cartNotification = document.getElementById('js-cart-tabbar-notification');
    this.favoritesNotification = document.getElementById('js-favorites-tabbar-notification');
  }

  refreshCartNotification() {
    const value = cart.productList.size;
    if (value) {
      this.cartNotification.classList.remove('display-none')
      this.cartNotification.classList.add('display-inline-flex');
    } else {
      this.cartNotification.classList.add('display-none')
      this.cartNotification.classList.remove('display-inline-flex');
    }

    if (this.cartNotification) {
      this.cartNotification.innerHTML = `${value}`;
    }
  }

  refreshFavoritesNotification() {
    let productFavoritesId = [];
    cart.productList.forEach((product) => {
      if (product.isFavorites && !productFavoritesId.includes(product.id)) {
        productFavoritesId.push(product.id);
      }

      if (product.isFavorites) {
        productItem.setFavoritesProduct(product.id, true);
      } else {
        productItem.setFavoritesProduct(product.id, false);
      }
    });
    cart.missingProductsList.forEach((product) => {
      if (product.isFavorites && !productFavoritesId.includes(product.id)) {
        productFavoritesId.push(product.id);
      }

      if (product.isFavorites) {
        missingProductItem.setFavoritesProduct(product.id, true);
      } else {
        missingProductItem.setFavoritesProduct(product.id, false);
      }
    });

    if (productFavoritesId.length) {
      this.favoritesNotification.classList.remove('display-none')
      this.favoritesNotification.classList.add('display-inline-flex');
      this.favoritesNotification.innerHTML = `${productFavoritesId.length}`;
    } else {
      this.favoritesNotification.classList.add('display-none')
      this.favoritesNotification.classList.remove('display-inline-flex');
    }
  }
}

export default new Tabbar();
