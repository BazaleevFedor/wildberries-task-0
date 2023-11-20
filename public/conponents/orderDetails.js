import {cart} from "../backend_data/cart_data.js";
import orderSummary from "./orderSummary.js";
import Validation from "../modules/validation.js";

class OrderDetails {
  constructor() {
    this.addListeners();
  }

  validateAllFields() {
    const inputElems = document.getElementsByClassName('user__input');
    let result = true;

    Array.from(inputElems).forEach((elem) => {
      if (!this._validateField(elem)) {
        result = false;
      }
    });

    return result;
  }

  _validateField = (field) => {
    const parentElem = field.parentNode;
    const text = field.value;
    const fieldType = parentElem.getAttribute('data-id');
    const errorElem = parentElem.querySelector('.user__error');

    const {isCorrect, errorText} = Validation[fieldType](text);
    if (isCorrect) {
      parentElem.classList.remove('error');
      return true;
    } else {
      parentElem.classList.add('error');
      errorElem.innerHTML = errorText;
      return false;
    }
  }

  addListeners() {
    const inputElems = document.getElementsByClassName('user__input');
    const phoneInputElems = document.getElementById('js-phone-input');

    Array.from(inputElems).forEach((elem) => {
      elem.addEventListener('change', (event) => {
        if (event.target.value) {
          this._validateField(elem);
        }
      });
    });

    Array.from(inputElems).forEach((elem) => {
      elem.addEventListener('input', (event) => {
        const parentElem = elem.parentNode;
        if (event.target.value) {
          parentElem.querySelector('.user__label').classList.remove('visibility');
        } else {
          parentElem.classList.remove('error');
          parentElem.querySelector('.user__label').classList.add('visibility');
        }
      });
    });

    let last;
    phoneInputElems?.addEventListener('input', (event) => {
      if (!last || last.slice(0, -1) !== event.target.value) {
        let input = event.target.value.replace(/[()-]/g, ' ');
        if (input === '8') {
          phoneInputElems.value = '+7 ';
        } else if (/^\d$/.test(input)) {
          phoneInputElems.value = '+' + input + ' ';
        } else if (/^\+\d$/.test(input)) {
          phoneInputElems.value += ' ';
        } else if (/^\+\d \d{3}$/.test(input)) {
          phoneInputElems.value += ' ';
        } else if (/^\+\d \d{3} \d{3}$/.test(input)) {
          phoneInputElems.value += ' ';
        } else if (/^\+\d \d{3} \d{3} \d{2}$/.test(input)) {
          phoneInputElems.value += ' ';
        } else {
          if (input[0] === '8') {
            phoneInputElems.value = '+7' + input.slice(1, input.length);
          } else {
            phoneInputElems.value = input; // 8057451173
          }
        }
      }
      last = event.target.value;
    });
  }

  removeElems() {
    const delElems = document.getElementsByClassName('js-del-elem');

    Array.from(delElems).forEach((element) => {
        element.remove();
    });
  }

  productDelivery(img, count) {
    count = count > 1 ? count : '';
    return (
      `
        <div class="cart-tabbar">
          <img class="delivery-table__pic br-8" src="${img}" alt="1">
          <div class="delivery__notification br-16 bg-orange color-white f-10 fw-600 lh-18 ta-center">${count}</div> <!--ToDo: проброс из js-->
        </div>
      `
    );
  }

  productDeliveryPlanContainer(date, id, isLast) {
    const lastClass = isLast ? '' : 'mb-photo';
    return (
      `
        <span class="fw-600 mb-12 js-del-elem">${date}</span>
        <div class="delivery-table__photo br-8 js-del-elem ${lastClass}" id="${id}">
        
        </div> 
      `
    );
  }

  /**
   * Парсит строки с интервалами доставок и возвращает объединенную строку с общим интервалом.
   * @param startDate - первый интервал доставки
   * @param endDate - последний интервал доставки
   * @return {string} - объединенный интервал
   */
  getDateInterval(startDate, endDate) {
    let startMonth = startDate.split(' ')[1].substring(0, 3);
    let endMonth = endDate.split(' ')[1].substring(0, 3);
    let startDay = startDate.split('—')[0];
    let endDay = endDate.split('—')[1].split(' ')[0];

    if (startMonth === endMonth) {
      return `${startDay}–${endDay} ${startMonth}`
    } else {
      return `${startDay} ${startMonth}–${endDay} ${endMonth}`
    }
  }

  refreshDateDelivery() {
    this.removeElems();
    const deliveryPlanElem = document.getElementById('js-delivery-plan');

    const resultArray = Array.from(cart.productList.values()).reduce((acc, product) => {
      if (product.isChoose) {
        let productCount = product.count;
        product.delivery.forEach(({date, maxCount}) => {
          if (productCount) {
            const existingDateEntry = acc.find(entry => entry.date === date);

            if (existingDateEntry) {
              existingDateEntry.products.push({
                img: product.image,
                count: Math.min(maxCount, productCount),
              });
            } else {
              acc.push({
                date,
                products: [{
                  img: product.image,
                  count: Math.min(maxCount, productCount),
                }],
              });
            }

            productCount = productCount > maxCount ? productCount - maxCount : 0;
          }
        });
      }

      return acc;
    }, []);

    const indexLast = resultArray.length - 1;
    resultArray.forEach(({date, products}, index) => {

      deliveryPlanElem.innerHTML += this.productDeliveryPlanContainer(date, date, indexLast === index);
      const container = document.getElementById(date);

      products.forEach(({img, count}) => {
        container.innerHTML += this.productDelivery(img, count);
      });
    });

    if (resultArray.length) {
      orderSummary.setDeliveryDate(this.getDateInterval(resultArray.at(0).date, resultArray.at(-1).date));
    } else {
      orderSummary.setDeliveryDate('')
    }
  }

  setDeliveryInfo(isPoint, addressIndex, pointIndex) {
    const typeDelivery = document.getElementById('js-delivery-type-order-details');
    const addressDelivery = document.getElementById('js-address-order-details');
    const starDelivery = document.getElementById('js-point-star');
    const ratingDelivery = document.getElementById('js-point-rating');
    const timeDelivery = document.getElementById('js-point-time');

    starDelivery.classList.remove('display-none');
    ratingDelivery.classList.remove('display-none');
    timeDelivery.classList.remove('display-none');

    if (isPoint) {
      typeDelivery.innerHTML = cart.delivery.type[isPoint].shortText;
      addressDelivery.innerHTML = cart.delivery.points.get(pointIndex).address;
      ratingDelivery.innerHTML = cart.delivery.points.get(pointIndex).rating;
      timeDelivery.innerHTML = cart.delivery.points.get(pointIndex).time;
    } else {
      typeDelivery.innerHTML = cart.delivery.type[isPoint].text;
      addressDelivery.innerHTML = cart.delivery.address.get(addressIndex);

      starDelivery.classList.add('display-none');
      ratingDelivery.classList.add('display-none');
      timeDelivery.classList.add('display-none');
    }
  }

  setCardInfo(cardId) {
    const cardNumberElem = document.getElementById('js-card-number');
    const cardDateElem = document.getElementById('js-card-date');
    const cardImageElem = document.getElementById('js-card-img');
    const card = cart.cardInfo[cardId];

    cardNumberElem.innerHTML = card.card;
    cardDateElem.innerHTML = card.date;
    cardImageElem.src = card.bankImage;
  }
}

export default new OrderDetails();
