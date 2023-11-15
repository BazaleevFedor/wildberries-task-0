import {cart} from "../backend_data/cart_data.js";

class ProductItem {
  constructor() {

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
    const priceElem = document.getElementById(`js-product-price-${id}`)
    const priceSmallElem = document.getElementById(`js-product-price-small-${id}`)
    const discountElem = document.getElementById(`js-product-price-without-discount-${id}`)
    const discountSmallElem = document.getElementById(`js-product-price-without-discount-small-${id}`)

    priceElem.innerHTML = price;
    priceSmallElem.innerHTML = price;
    discountElem.innerHTML = discount;
    discountSmallElem.innerHTML = discount;
  }

  setLeftInStock(id, leftInStock) {
    const stockElem = document.getElementById(`js-product-stock-${id}`)

    if (!leftInStock) stockElem.classList.add('display-none');
    stockElem.innerHTML = `Осталось ${leftInStock} шт.`;
  }

  setChecked(id) {
    const checkedElem = document.getElementById(`js-product-checkbox-${id}`)
    const checkedSmallElem = document.getElementById(`js-product-checkbox-small-${id}`)

    checkedElem.checked = !checkedElem.checked;
    checkedSmallElem.checked = !checkedSmallElem.checked;
  }

  setCount(id, count, leftInStock) {
    const countElem = document.getElementById(`js-product-counter-${id}`)
    const decElem = document.getElementById(`js-product-counter-dec-${id}`)
    const incElem = document.getElementById(`js-product-counter-inc-${id}`)

    countElem.value = count;
    decElem.classList.add(count > 1 ? 'js-product-counter-dec' : 'product-counter__block');
    incElem.classList.add((leftInStock && count >= leftInStock) ? 'product-counter__block' : 'js-product-counter-inc');
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

    return (
      `
        <div class="product__item" data-id="${product.id}">
          <div class="item-info p-t-12">
            <label class="item-info__checkbox large_components">
              <input type="checkbox" class="checkbox js-product-checkbox" id="js-product-checkbox-${product.id}" data-id="${product.id}">
              <div class="checkbox-images">
                <img class="m-auto img1" src="static/img/checkbox.svg" alt="checkbox">
                <img class="m-auto img2" src="static/img/checkbox_choose.svg" alt="checkbox_choose">
              </div>
            </label>
            <div class="image-block">
              <img class="image-block__image br-8" alt="product_img" src="${product.image}"">
              ${size}
              <label class="image-block__checkbox bg-white br-8 small_components">
                <input type="checkbox" class="checkbox js-product-checkbox" id="js-product-checkbox-small-${product.id}" data-id="${product.id}">
                <div class="checkbox-images">
                  <img class="m-auto img1" src="static/img/checkbox.svg" alt="checkbox">
                  <img class="m-auto img2" src="static/img/checkbox_choose.svg" alt="checkbox_choose">
                </div>
              </label>
            </div>
            <div class="item-info__specifications h-max-content">
              <div class="item-info__price small_components">
                <span class="ff-Bold fw-700 lh-24 f-normal f-16" id="js-product-price-small-${product.id}"></span> <!--ToDo: проброс из js-->
                <div class="price_discount fw-400 f-13 lh-16 color-gray underline underline-gray m-auto"> <!--ToDo: проброс из js-->
                  <span class="cross-out" id="js-product-price-without-discount-small-${product.id}"></span> <!--ToDo: проброс из js-->
                </div>
              </div>
              <span class="specifications__name lh-24 ">${product.name}</span> <!--ToDo: проброс из js-->
              ${props}
              <span class="f-13 lh-16 color-gray">${product.provider}</span> <!--ToDo: проброс из js-->
              <div class="specifications__provider-info large_components">
                <span class="f-13 lh-16 color-gray">${product.providerDetails.name}</span> <!--ToDo: проброс из js-->
                <button class="br-none p-0 vertical-center bg-inherit">
                  <img src="static/img/icon-16.svg" alt="info">
                </button>
              </div>
            </div>
          </div>
          <div class="item-counter p-t-9">
            <div class="counter">
              <div class="product-counter br-8 bg-white">
                <button class="bg-inherit br-none br-8" data-id="${product.id}" id="js-product-counter-dec-${product.id}">
                  <span class="f-normal fw-400 lh-24 f-20 ls--0-2px ta-center">−</span> <!--ToDo: проброс из js-->
                </button>
                <input class="br-none outline-none w-100 ta-center f-normal fw-400 lh-24 f-16 p-0 js-product-counter" id="js-product-counter-${product.id}" data-id="${product.id}"> <!--ToDo: проброс из js-->
                <button class="bg-inherit br-none br-8" data-id="${product.id}" id="js-product-counter-inc-${product.id}">
                  <span class="f-normal fw-400 lh-24 f-20 ls--0-2px ta-center">+</span> <!--ToDo: проброс из js-->
                </button>
              </div>
              <span class="product-in-stock f-13 f-normal fw-400 lh-16 color-red m-vertical-auto" id="js-product-stock-${product.id}"></span> <!--ToDo: проброс из js-->
              <div class="product-management m-vertical-auto"> 
                <label class="label-checkbox"> <!--ToDo: проброс из js-->
                  <input type="checkbox" class="checkbox" data-id="${product.id}" id="js-product-favorites-${product.id}">
                  <div class="checkbox-images">
                    <img class="m-auto img1" src="static/img/favorites.svg" alt="favorites">
                    <img class="m-auto img2" src="static/img/favorites_choose.svg" alt="favorites_choose">
                  </div>
                </label>
                <label class="label-checkbox"> <!--ToDo: проброс из js-->
                  <input type="checkbox" class="checkbox trash-checkbox" data-id="${product.id}">
                  <div class="checkbox-images">
                    <img class="m-auto img1" src="static/img/trash.svg" alt="trash">
                    <img class="m-auto img2" src="static/img/trash_choose.svg" alt="trash_choose">
                  </div>
                </label>
              </div>
            </div>
            <div class="item-counter__price large_components">
              <span class="ff-Bold fw-700 lh-24 f-normal f-16" id="js-product-price-${product.id}"></span> <!--ToDo: проброс из js-->
              <div class="price_discount fw-400 f-13 lh-16 color-gray underline underline-gray m-l-auto">
                <span class="cross-out" id="js-product-price-without-discount-${product.id}"></span> <!--ToDo: проброс из js-->
              </div>
            </div>
          </div>
        </div>
      `
    )
  }
}

export default new ProductItem();
