class MissingProductItem {
  constructor() {
    this.missingProductsContainer = document.getElementById('js-missing-products-container');
  }

  _getProps(product) {
    let size = '';
    let props = '';

    product.props.forEach(({name, value}) => {
      if (name === 'Размер') {
        size = `<span class="image-block__size f-14 f-normal fw-400 lh-20 color-gray bg-white br-8 center small_components">${value}</span>`;
        props += (`<span class="large_components color-gray">${name}: ${value}</span>`);
      } else {
        props += (`<span class="color-gray">${name}: ${value}</span>`);
      }
    })

    if (props) {
      props = `<span class="specifications__props f-13 lh-16"> ${props} </span>`;
    }

    return {size, props};
  }

  removeItem(id) {
    const elements = document.querySelectorAll('.missing-product__item');

    elements.forEach((element) => {
      if (element.getAttribute('data-id') === id) {
        element.remove();
      }
    });
  }

  render(product) {
    const {size, props} = this._getProps(product);

    this.missingProductsContainer.innerHTML += (
      `
        <div class="missing-product__item" data-id="${product.id}">
          <div class="item-info p-t-12">
            <div class="image-block">
              <img class="image-block__image br-8" style="filter: grayscale(100%)" alt="product_img" src="${product.image}"">
              ${size}
            </div>
            <div class="item-info__specifications h-max-content">              
              <span class="missing-specifications__name lh-24 color-gray">${product.name}</span> <!--ToDo: проброс из js-->
              ${props}
            </div>
          </div>
          <div class="item-counter p-t-9">
            <div class="counter">
              <div class="product-management m-vertical-auto"> <!--ToDo: проброс из js-->
                <label class="label-checkbox pointer"> <!--ToDo: проброс из js-->
                  <input type="checkbox" class="checkbox js-missing-product-favorites default-hover" data-id="${product.id}" id="js-missing-product-favorites-${product.id}">
                  <div class="checkbox-images">
                    <img class="m-auto img1" src="static/img/favorites.svg" alt="favorites">
                    <img class="m-auto img2" src="static/img/favorites_choose.svg" alt="favorites_choose">
                  </div>
                </label>
                <label class="label-checkbox pointer"> <!--ToDo: проброс из js-->
                  <input type="checkbox" class="icon missing-trash-checkbox default-hover" data-id="${product.id}">
                  <div class="checkbox-images">
                    <img class="m-auto img1" src="static/img/trash.svg" alt="trash">
                    <img class="m-auto img2" src="static/img/trash_choose.svg" alt="trash_choose">
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      `
    )
  }
}

export default new MissingProductItem();
