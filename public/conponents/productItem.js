import {cart} from "../backend_data/cart_data.js";
import PriceChange from "../modules/priceChange.js";

class ProductItem {
  constructor() {
    this.productsContainer = document.getElementById('js-products-container');
  }

  addContent(product) {
    this.setCount(product.id, product.count, product.leftInStock);
    this.setLeftInStock(product.id, product.leftInStock);
    this.setPrice(product.id, Math.round(product.price * (1 - product.discount.number - cart.userDiscount.number) * product.count), product.price * product.count);
  }

  _getProps(product) {
    let size = '';
    let props = '';

    product.props.forEach(({name, value}) => {
      if (name === 'Размер') {
        size = `<span class="image-block__size f-14 f-normal fw-400 lh-20 bg-white br-8 center small_components">${value}</span>`;
        props += (`<span class="large_components">${name}: ${value}</span>`);
      } else {
        props += (`<span>${name}: ${value}</span>`);
      }
    })

    if (props) {
      props = `<span class="specifications__props f-13 lh-16"> ${props} </span>`;
    }

    return {size, props};
  }

  setPrice(id, price, discount) {
    const priceElem = document.getElementById(`js-product-price-${id}`);
    const priceSmallElem = document.getElementById(`js-product-price-small-${id}`);
    const discountElem = document.getElementById(`js-product-price-without-discount-${id}`);
    const discountSmallElem = document.getElementById(`js-product-price-without-discount-small-${id}`);

    const priceChange = new PriceChange();

    priceChange.debounce([
      {field: priceElem, value: price, currency: true},
      {field: priceSmallElem, value: price, currency: true},
      {field: discountElem, value: discount, currency: true},
      {field: discountSmallElem, value: discount, currency: true},
    ]);
  }

  setLeftInStock(id, leftInStock) {
    const stockElem = document.getElementById(`js-product-stock-${id}`);

    if (!leftInStock) stockElem.classList.add('display-none');
    stockElem.innerHTML = `Осталось ${leftInStock} шт.`;
  }

  setChooseProduct(id, state) {
    const checkedElem = document.getElementById(`js-product-checkbox-${id}`);
    const checkedSmallElem = document.getElementById(`js-product-checkbox-small-${id}`);

    checkedElem.checked = state;
    checkedSmallElem.checked = state;
  }

  setCount(id, count, leftInStock) {
    const countElem = document.getElementById(`js-product-counter-${id}`);
    const decElem = document.getElementById(`js-product-counter-dec-${id}`);
    const incElem = document.getElementById(`js-product-counter-inc-${id}`);

    if (count > 0 && (!leftInStock || count <= leftInStock)) {
      countElem.value = count;
      incElem.disabled = leftInStock && count >= leftInStock;
      decElem.disabled = count <= 1;

      let product = cart.productList.get(id);
      product.count = count;
      cart.productList.set(id, product);

      this.setPrice(id, Math.round(product.price * (1 - product.discount.number - cart.userDiscount.number) * product.count), product.price * product.count);
    }
  }

  removeItem(id) {
    const elements = document.querySelectorAll('.product__item');

    elements.forEach((element) => {
      if (element.getAttribute('data-id') === id) {
        element.remove();
      }
    });
  }

  render(product) {
    const {size, props} = this._getProps(product);

    this.productsContainer.innerHTML += (
      `
        <div class="product__item" data-id="${product.id}">
          <div class="item-info p-t-12">
            <label class="item-info__checkbox large_components pointer">
              <input type="checkbox" class="checkbox js-product-checkbox opacity-hover" id="js-product-checkbox-${product.id}" data-id="${product.id}">
              <div class="checkbox-images">
                <img class="m-auto img1" src="static/img/checkbox.svg" alt="checkbox">
                <img class="m-auto img2" src="static/img/checkbox_choose.svg" alt="checkbox_choose">
              </div>
            </label>
            <div class="image-block">
              <img class="image-block__image br-8" alt="product_img" src="${product.image}"">
              ${size}
              <label class="image-block__checkbox bg-white br-8 small_components pointer">
                <input type="checkbox" class="checkbox js-product-checkbox opacity-hover" id="js-product-checkbox-small-${product.id}" data-id="${product.id}">
                <div class="checkbox-images">
                  <img class="m-auto img1" src="static/img/checkbox.svg" alt="checkbox">
                  <img class="m-auto img2" src="static/img/checkbox_choose.svg" alt="checkbox_choose">
                </div>
              </label>
            </div>
            <div class="item-info__specifications h-max-content">
              <div class="item-info__price small_components">
                <span class="ff-Bold fw-700 lh-24 f-normal f-16" id="js-product-price-small-${product.id}"></span> <!--ToDo: проброс из js-->
                <div class="price_discount fw-400 f-13 lh-16 color-gray underline underline-gray m-auto pointer"> <!--ToDo: проброс из js-->
                  <span class="cross-out" id="js-product-price-without-discount-small-${product.id}"></span> <!--ToDo: проброс из js-->
                </div>
                <div class="discount-info f-13 f-normal fw-400 lh-16">
                  <span class="color-gray ta-left">Скидка ${product.discount.text}</span>
                  <span class="ta-right">−${Math.round(product.price * product.discount.number)} ${cart.currency}</span>
                  <span class="color-gray ta-left">Скидка покупателя ${cart.userDiscount.text}</span>
                  <span class="ta-right">−${Math.round(product.price * cart.userDiscount.number)} ${cart.currency}</span>
                </div>
              </div>
              <span class="specifications__name lh-24 ">${product.name}</span> <!--ToDo: проброс из js-->
              ${props}
              <span class="f-13 lh-16 color-gray">${product.provider}</span> <!--ToDo: проброс из js-->
              <div class="specifications__provider-info large_components">
                <span class="f-13 lh-16 color-gray">${product.providerDetails.name}</span> <!--ToDo: проброс из js-->
                <button class="provider-info__icon br-none p-0 vertical-center bg-inherit pointer">
                  <img class="vertical-center" src="static/img/icon-16.svg" alt="info">
                </button>
                <div class="provider-info__table f-13 f-normal lh-16">
                  <span class="fw-700 ff-Bold">${product.providerDetails.fullName}</span>
                  <span class="fw-400">${product.providerDetails.number}</span>
                  <span class="fw-400">${product.providerDetails.address}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="item-counter p-t-9">
            <div class="counter">
              <div class="product-counter br-8 bg-white">
                <button class="bg-inherit pointer br-none br-left-8 js-product-counter-dec button-hover" data-id="${product.id}" id="js-product-counter-dec-${product.id}">
                  <span class="f-normal fw-400 lh-24 f-20 ls--0-2px ta-center">−</span> <!--ToDo: проброс из js-->
                </button>
                <input class="br-none outline-none w-100 ta-center f-normal fw-400 lh-24 f-16 p-0 js-product-counter" id="js-product-counter-${product.id}" data-id="${product.id}"> <!--ToDo: проброс из js-->
                <button class="bg-inherit pointer br-none br-right-8 js-product-counter-inc button-hover" data-id="${product.id}" id="js-product-counter-inc-${product.id}">
                  <span class="f-normal fw-400 lh-24 f-20 ls--0-2px ta-center">+</span> <!--ToDo: проброс из js-->
                </button>
              </div>
              <span class="product-in-stock f-13 f-normal fw-400 lh-16 color-red m-vertical-auto" id="js-product-stock-${product.id}"></span> <!--ToDo: проброс из js-->
              <div class="product-management m-vertical-auto"> 
                <label class="label-checkbox pointer"> <!--ToDo: проброс из js-->
                  <input type="checkbox" class="checkbox js-product-favorites default-hover" data-id="${product.id}" id="js-product-favorites-${product.id}">
                  <div class="checkbox-images">
                    <img class="m-auto img1" src="static/img/favorites.svg" alt="favorites">
                    <img class="m-auto img2" src="static/img/favorites_choose.svg" alt="favorites_choose">
                  </div>
                </label>
                <label class="label-checkbox pointer"> <!--ToDo: проброс из js-->
                  <input type="checkbox" class="checkbox trash-checkbox default-hover" data-id="${product.id}">
                  <div class="checkbox-images">
                    <img class="m-auto img1" src="static/img/trash.svg" alt="trash">
                    <img class="m-auto img2" src="static/img/trash_choose.svg" alt="trash_choose">
                  </div>
                </label>
              </div>
            </div>
            <div class="item-counter__price large_components">
              <span class="ff-Bold fw-700 lh-24 f-normal f-16" id="js-product-price-${product.id}"></span> <!--ToDo: проброс из js-->
              <div class="price_discount fw-400 f-13 lh-16 color-gray underline underline-gray m-l-auto pointer">
                <span class="cross-out" id="js-product-price-without-discount-${product.id}"></span> <!--ToDo: проброс из js-->
              </div>
              <div class="discount-info f-13 f-normal fw-400 lh-16">
                <span class="color-gray ta-left">Скидка ${product.discount.text}</span>
                <span class="ta-right">−${Math.round(product.price * product.discount.number)} ${cart.currency}</span>
                <span class="color-gray ta-left">Скидка покупателя ${cart.userDiscount.text}</span>
                <span class="ta-right">−${Math.round(product.price * cart.userDiscount.number)} ${cart.currency}</span>
              </div>
            </div>
          </div>
        </div>
      `
    )

    document.addEventListener('DOMContentLoaded', () => {
      this.addContent(product);
    });
  }
}

export default new ProductItem();
