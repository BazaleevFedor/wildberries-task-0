class MissingProductItem {
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

    return (
      `
        <div class="missing-product__item" data-id="${product.id}">
          <div class="item-info p-t-12">
            <div class="image-block">
              <img class="image-block__image br-8" style="filter: grayscale(100%)" alt="product_img" src="${product.image}"">
              ${size}
            </div>
            <div class="item-info__specifications h-max-content">              
              <span class="specifications__name lh-24 ">${product.name}</span> <!--ToDo: проброс из js-->
              ${props}
            </div>
          </div>
          <div class="item-counter p-t-9">
            <div class="counter p-t-9">
              <div class="product-management m-vertical-auto"> <!--ToDo: проброс из js-->
                <label class="label-checkbox"> <!--ToDo: проброс из js-->
                  <input type="checkbox" class="checkbox" data-id="${product.id}" id="js-missing-product-favorites-${product.id}">
                  <div class="checkbox-images">
                    <img class="m-auto img1" src="static/img/favorites.svg" alt="favorites">
                    <img class="m-auto img2" src="static/img/favorites_choose.svg" alt="favorites_choose">
                  </div>
                </label>
                <label class="label-checkbox"> <!--ToDo: проброс из js-->
                  <input type="checkbox" class="checkbox missing-trash-checkbox" data-id="${product.id}">
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
