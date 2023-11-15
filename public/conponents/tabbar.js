class Tabbar {
  constructor() {
    this.cartNotification = document.getElementById('js-cart-tabbar-notification');
  }

  setNotification(value) {
    if (this.cartNotification) this.cartNotification.innerHTML = `${value}`;
  }
}

export default new Tabbar();
