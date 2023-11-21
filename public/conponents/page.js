import Header from "./header.js";
import Tabbar from "./tabbar.js";
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

  render() {
    Cart.render();

    orderSummary.refreshPrice();

    modal.render();

    this._refreshProductCount();
    this._refreshFavoritesNotification();
  }
}

export default new Page();
