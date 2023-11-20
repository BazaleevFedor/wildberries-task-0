import {cart} from "../backend_data/cart_data.js";
import orderSummary from "./orderSummary.js";
import orderDetails from "./orderDetails.js";

class Modal {
  constructor() {

  }

  addListeners() {
    const modalWindowElem = document.getElementById('js-modal-window');
    const modalWindowCloseElem = document.getElementById('js-close-modal');
    const modalBackgroundElem = document.querySelector('.modal-background');
    const cardItemElems = document.getElementsByClassName('js-modal-card');
    const addressItemElems = document.getElementsByClassName('js-modal-address');
    const modalCardOpenElems = document.getElementsByClassName('pay-type__change');
    const modalDeliveryOpenElems = document.getElementsByClassName('delivery-type__change');
    const modalPointsOpenElems = document.getElementById('js-buttons-point');
    const modalCourierOpenElems = document.getElementById('js-buttons-courier');
    const modalChangeAcceptElem = document.getElementById('js-select');
    const trashAddressElem = document.getElementsByClassName('js-trash-address');

    const closeModalWindow = () => {
      modalWindowElem.classList.add('display-none');
      modalWindowElem.classList.remove('card');
      modalWindowElem.classList.remove('address');
      document.body.classList.remove('overflow-hidden');
    }

    /**
     * Событие закрытия модального окна при нажатии вне окна.
     */
    modalBackgroundElem?.addEventListener('click', (event) => {
      if (event.target === modalBackgroundElem) {
        closeModalWindow();
      }
    });

    /**
     * Событие закрытия модального окна при нажатии на крестик.
     */
    modalWindowCloseElem?.addEventListener('click', () => {
      closeModalWindow();
    });

    /**
     * Событие нажатия кнопки "Выбрать" модального окна.
     */
    modalChangeAcceptElem?.addEventListener('click', () => {
      if (modalWindowElem.classList.contains('address')) {
        curGlobalAddressId = curAddressId;
        this.chooseAddress(curAddressId, true);
      } else {
        this.chooseUserCard(curCardId, true);
      }

      closeModalWindow();
    });


    let curCardId = 0;
    Array.from(cardItemElems).forEach((elem) => {
      elem.addEventListener('click', () => {
        curCardId = elem.getAttribute('data-id');
        this.chooseUserCard(curCardId);
      });
    });

    let curAddressId = 'point-0';
    let curGlobalAddressId = 'point-0';
    Array.from(addressItemElems).forEach((elem) => {
      elem.addEventListener('click', () => {
        curAddressId = elem.getAttribute('data-id');
        this.chooseAddress(curAddressId);
      });
    });

    Array.from(modalCardOpenElems).forEach((elem) => {
      elem?.addEventListener('click', () => {
        modalWindowElem.classList.remove('display-none');
        modalWindowElem.classList.add('card');
        document.body.classList.add('overflow-hidden');
      });
    });

    Array.from(modalDeliveryOpenElems).forEach((elem) => {
      elem?.addEventListener('click', () => {
        modalWindowElem.classList.remove('display-none');
        modalWindowElem.classList.add('address');
        document.body.classList.add('overflow-hidden');
      });
    });

    modalPointsOpenElems?.addEventListener('click', () => {
      modalWindowElem.classList.add('point');
      modalWindowElem.classList.remove('courier');
      document.body.classList.add('overflow-hidden');
    });

    modalCourierOpenElems?.addEventListener('click', () => {
      modalWindowElem.classList.remove('point');
      modalWindowElem.classList.add('courier');
      document.body.classList.add('overflow-hidden');
    });

    Array.from(trashAddressElem).forEach((elem) => {
      elem.addEventListener('click', () => {
        if (elem.getAttribute('data-id') !== curGlobalAddressId) {
          this.removeAddress(elem.getAttribute('data-id'));
        }
      });
    });
  }


  removeAddress(id) {
    const deleteElem = document.querySelector(`.address__item[data-id="${id}"]`);;
    let arrayWithDeleteElem;

    if (id.includes('point')) {
      arrayWithDeleteElem = cart.delivery.points;
    } else {
      arrayWithDeleteElem = cart.delivery.address;
    }

    const checkedElem = deleteElem.querySelector('input[type="checkbox"]');
    if (!checkedElem.checked) {
      deleteElem.remove();
      arrayWithDeleteElem.delete(id);
    }

    if (cart.delivery.points.length === 0) {
      document.getElementById('js-point-free').classList.remove('display-none');
    }
    if (cart.delivery.address.length === 0) {
      document.getElementById('js-courier-free').classList.remove('display-none');
    }
  }

  chooseUserCard(newId, isSelect = false) {
    const modalCards = document.getElementsByClassName('js-modal-card');
    Array.from(modalCards).forEach((card) => {
      card.checked = card.getAttribute('data-id') === newId.toString();
    });

    if (isSelect) {
      orderSummary.setCardInfo(newId);
      orderDetails.setCardInfo(newId);
    }
  }

  chooseAddress(newId, isSelect = false) {
    const modalCards = document.getElementsByClassName('js-modal-address');
    Array.from(modalCards).forEach((card) => {
      card.checked = card.getAttribute('data-id') === newId;
    });

    if (isSelect) {
      const id = Number(newId.split('-')[1]);
      if (newId.includes('point')) {
        orderSummary.setDeliveryType(true, 0, id);
        orderDetails.setDeliveryInfo(true, 0, id);
      } else {
        orderSummary.setDeliveryType(false, id, 0);
        orderDetails.setDeliveryInfo(false, id, 0);
      }
    }
  }

  render() {
    const modalCardBackground = document.querySelector('.modal-window__choose-card');
    const modalPointsBackground = document.querySelector('.address__point');
    const modalAddressBackground = document.querySelector('.address__courier');

    cart.cardInfo.forEach((card, index) => {
      modalCardBackground.innerHTML += (
        `
          <label class="card__item pointer">
            <input type="checkbox" class="checkbox opacity-hover-circle js-modal-card" data-id="${index}">
            <div class="checkbox-images item__checkbox">
              <img class="m-auto img1" src="static/img/checkbox_circle.svg" alt="Выбрать">
              <img class="m-auto img2" src="static/img/checkbox_circle_choose.svg" alt="Отменить выбор">
            </div>
            <div class="card__bank br-4 bg-smoky p-0-1">
              <img class="m-auto" src="${card.bankImage}" alt="mir">
            </div>
            <span class="requisites__card f-16 fw-400 lh-24 f-normal color-black vertical-center">${card.card}</span>
          </label>
        `
      )
    });

    cart.delivery.points.forEach((address, index) => {
      modalPointsBackground.innerHTML += (
        `
          <label class="address__item pointer" data-id="point-${index}">
            <input type="checkbox" class="checkbox opacity-hover-circle js-modal-address" data-id="point-${index}">
            <div class="checkbox-images item__checkbox">
              <img class="m-auto img1" src="static/img/checkbox_circle.svg" alt="Выбрать">
              <img class="m-auto img2" src="static/img/checkbox_circle_choose.svg" alt="Отменить выбор">
            </div>
            <div class="point__info">
              <span class="address__text f-16 mb-4 fw-400 lh-24 f-normal color-black vertical-center">${address.address}</span>
              <div class="f-13 lh-16 f-normal fw-400">
                <img class="star" src="static/img/star_fill.svg" alt="star">
                <span class="star-point">${address.rating}</span>
                <span class="color-gray">Пункт выдачи</span>
              </div>
            </div>
            <label class="label-checkbox pointer">
              <input type="checkbox" class="icon js-trash-address" data-id="point-${index}">
              <div class="checkbox-images">
                <img class="m-auto img1" src="static/img/trash_address.svg" alt="trash">
                <img class="m-auto img2" src="static/img/trash_choose.svg" alt="trash_choose">
              </div>
            </label>
          </label>
        `
      )
    });

    cart.delivery.address.forEach((address, index) => {
      modalAddressBackground.innerHTML += (
        `
          <label class="address__item pointer" data-id="courier-${index}">
            <input type="checkbox" class="checkbox opacity-hover-circle js-modal-address" data-id="courier-${index}">
            <div class="checkbox-images item__checkbox">
              <img class="m-auto img1" src="static/img/checkbox_circle.svg" alt="Выбрать">
              <img class="m-auto img2" src="static/img/checkbox_circle_choose.svg" alt="Отменить выбор">
            </div>
            <span class="address__text f-16 fw-400 lh-24 f-normal color-black vertical-center">${address}</span>
            <label class="label-checkbox pointer">
              <input type="checkbox" class="icon js-trash-address" data-id="courier-${index}">
              <div class="checkbox-images">
                <img class="m-auto img1" src="static/img/trash_address.svg" alt="trash">
                <img class="m-auto img2" src="static/img/trash_choose.svg" alt="trash_choose">
              </div>
            </label>
          </label>
        `
      )
    });

    this.addListeners();
    this.chooseUserCard(0, true);
    this.chooseAddress('point-0', true);
  }
}

export default new Modal();
