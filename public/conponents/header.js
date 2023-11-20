import {cart} from "../backend_data/cart_data.js";

class Header {
  constructor() {
    this.refreshCartNotification();
  }

  refreshCartNotification() {
    const cartNotification = document.getElementById('js-cart-notification');

    if (cart.productList.size) {
      cartNotification.classList.remove('display-none');
      if (cartNotification) cartNotification.innerHTML = `${cart.productList.size}`;
    } else {
      cartNotification.classList.add('display-none');
    }
  }
}

export default new Header();
