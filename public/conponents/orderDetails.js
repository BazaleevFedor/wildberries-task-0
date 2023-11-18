import {cart} from "../backend_data/cart_data.js";
import orderSummary from "./orderSummary.js";

class OrderDetails {
  constructor() {
    this.addListeners();
  }

  addListeners() {
    const forenameLabelElem = document.getElementById('js-forename-label');
    const forenameInputElem = document.getElementById('js-forename-input');
    const forenameErrorElem = document.getElementById('js-forename-error');

    const surnameLabelElem = document.getElementById('js-surname-label');
    const surnameInputElem = document.getElementById('js-surname-input');
    const surnameErrorElem = document.getElementById('js-surname-error');

    const emailLabelElem = document.getElementById('js-email-label');
    const emailInputElem = document.getElementById('js-email-input');
    const emailErrorElem = document.getElementById('js-email-error');

    const phoneLabelElem = document.getElementById('js-phone-label');
    const phoneInputElem = document.getElementById('js-phone-input');
    const phoneErrorElem = document.getElementById('js-phone-error');

    const innLabelElem = document.getElementById('js-inn-label');
    const innInputElem = document.getElementById('js-inn-input');
    const innErrorElem = document.getElementById('js-inn-error');
    const innTextElem = document.getElementById('js-inn');

    const userInfoValidate = (labelElem, inputElem, errorElem, text, innTextElem = null) => {
      if (text) {
        labelElem.classList.remove('visibility');
      } else {
        labelElem.classList.add('visibility');
        errorElem.classList.add('visibility');
      }
    }

    forenameInputElem?.addEventListener('input', (event) => {
      userInfoValidate(, event.target.value);
    });

    surnameInputElem?.addEventListener('input', (event) => {
      userInfoValidate(surnameLabelElem, surnameInputElem, surnameErrorElem, event.target.value);
    });

    emailInputElem?.addEventListener('input', (event) => {
      userInfoValidate(emailLabelElem, emailInputElem, emailErrorElem, event.target.value);
    });

    phoneInputElem?.addEventListener('input', (event) => {
      userInfoValidate(phoneLabelElem, phoneInputElem, phoneErrorElem, event.target.value);
    });

    innInputElem?.addEventListener('input', (event) => {
      userInfoValidate(innLabelElem, innInputElem, innErrorElem, event.target.value, innTextElem);
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

  setDeliveryInfo(typeIndex, addressIndex = null, pointIndex = null) {
    const typeDelivery = document.getElementById('js-delivery-type-order-details');
    const addressDelivery = document.getElementById('js-address-order-details');
    const starDelivery = document.getElementById('js-point-star');
    const ratingDelivery = document.getElementById('js-point-rating');
    const timeDelivery = document.getElementById('js-point-time');

    starDelivery.classList.remove('display-none');
    ratingDelivery.classList.remove('display-none');
    timeDelivery.classList.remove('display-none');

    if (!typeIndex) {
      typeDelivery.innerHTML = cart.delivery.type[typeIndex].shortText;
      addressDelivery.innerHTML = cart.delivery.points[pointIndex].address;
      ratingDelivery.innerHTML = cart.delivery.points[pointIndex].rating;
      timeDelivery.innerHTML = cart.delivery.points[pointIndex].time;
    } else {
      typeDelivery.innerHTML = cart.delivery.type[typeIndex].text;
      addressDelivery.innerHTML = cart.delivery.address[addressIndex];

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
