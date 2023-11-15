class Header {
  constructor() {
    this.cartNotification = document.getElementById('js-cart-notification');
  }

  setNotification(value) {
    if (this.cartNotification) this.cartNotification.innerHTML = `${value}`;
  }
}

export default new Header();
