import {cart} from "../backend_data/cart_data.js";

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
    let value = 0;

    let productFavoritesId = [];
    cart.productList.forEach((product) => {
      if (product.isFavorites && !productFavoritesId.includes(product.id)) {
        value++;
        productFavoritesId.push(Number(product.id));
      }
    });

    cart.missingProductsList.forEach((product) => {
      if (product.isFavorites && !productFavoritesId.includes(product.id)) {
        value++;
        productFavoritesId.push(Number(product.id));
      }
    });

    if (value) {
      this.favoritesNotification.classList.remove('display-none')
      this.favoritesNotification.classList.add('display-inline-flex');
      this.favoritesNotification.innerHTML = `${value}`;
    } else {
      this.favoritesNotification.classList.add('display-none')
      this.favoritesNotification.classList.remove('display-inline-flex');
    }
  }
}

export default new Tabbar();
