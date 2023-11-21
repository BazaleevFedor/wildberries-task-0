class MissingProductItem {
  constructor() {
    this.missingProductsContainer = document.getElementById('js-missing-products-container');
  }

  _getProps(product) {
    let size = '';
    let props = '';

    product.props.forEach(({name, value}) => {
      if (name === 'Размер') {
        size = `<span class="image-block__size f-13 f-normal fw-400 lh-16 bg-white br-8 center small_components">${value}</span>`;
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

  setFavoritesProduct(id, state) {
    const elem = document.getElementById(`js-missing-product-favorites-${id}`);
    if (state) {
      elem.classList.add('checked')
    } else {
      elem.classList.remove('checked')
    }
  }

  removeItem(id) {
    const elementsWrapper = document.querySelectorAll('.wrapper-missing-product__item');
    elementsWrapper.forEach((element) => {
      if (element.getAttribute('data-id') === id) {
        element.remove();
      }
    });

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
        <div class="wrapper-missing-product__item" data-id="${product.id}">
          <div class="products__line small_components"></div>
          <div class="missing-product__item" data-id="${product.id}">
            <div class="item-info p-t-12">
              <div class="image-block product__pic">
                <img class="image-block__image br-8 product__pic" alt="Отсутствующий товар" src="${product.image}"">
                ${size}
              </div>
              <div class="item-info__specifications h-max-content">              
                <span class="missing-specifications__name overflow-ellipsis lh-24 color-gray">${product.name}</span> 
                ${props}
              </div>
            </div>
            <div class="item-counter missing-counter p-t-9">
              <div class="counter">
                <div class="product-management m-vertical-auto"> 
                  <label class="label-checkbox pointer"> 
                    <input type="checkbox" class="icon js-missing-product-favorites default-hover" data-id="${product.id}" id="js-missing-product-favorites-${product.id}">
                    <div class="checkbox-images">
                      <img class="m-auto img1" src="static/img/favorites.svg" alt="Добавить в избранное">
                      <img class="m-auto img2" src="static/img/favorites_choose.svg" alt="Убрать из избранного">
                    </div>
                  </label>
                  <label class="label-checkbox pointer"> 
                    <input type="checkbox" class="icon missing-trash-checkbox default-hover" data-id="${product.id}">
                    <div class="checkbox-images">
                      <img class="m-auto img1" src="static/img/trash.svg" alt="Удалить">
                      <img class="m-auto img2" src="static/img/trash_choose.svg" alt="Удалить">
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      `
    )
  }
}

export default new MissingProductItem();
