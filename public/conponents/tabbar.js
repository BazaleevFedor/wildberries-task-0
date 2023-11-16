class Tabbar {
  constructor() {
    this.cartNotification = document.getElementById('js-cart-tabbar-notification');
    this.favoritesNotification = document.getElementById('js-favorites-tabbar-notification');
  }

  setCartNotification(value) {
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

  setFavoritesNotification(value) {
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
