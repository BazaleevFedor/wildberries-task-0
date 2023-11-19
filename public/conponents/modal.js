import {cart} from "../backend_data/cart_data.js";
import orderSummary from "./orderSummary.js";
import orderDetails from "./orderDetails.js";

class Modal {
  constructor() {

  }

  addListeners() {
    const modalWindowElems = document.getElementById('js-modal-window');
    const modalCloseElems = document.getElementById('js-close-modal');
    const modalBackground = document.querySelector('.modal-background');
    const modalCards = document.getElementsByClassName('js-modal-card');
    const payChangeElem = document.getElementsByClassName('pay-type__change');
    const deliveryChangeElem = document.getElementsByClassName('delivery-type__change');
    const modalSelect = document.getElementById('js-select');

    const closeModalWindow = () => {
      modalWindowElems.classList.add('display-none');
      modalWindowElems.classList.remove('card');
      modalWindowElems.classList.remove('address');
    }

    modalBackground?.addEventListener('click', (event) => {
      if (event.target === modalBackground) {
        closeModalWindow();
      }
    });

    modalCloseElems?.addEventListener('click', () => {
      closeModalWindow();
    });

    let curCardId = 0;
    Array.from(modalCards).forEach((elem) => {
      elem.addEventListener('click', () => {
        curCardId = elem.getAttribute('data-id');
        this.chooseUsersCards(curCardId);
      });
    });

    modalSelect?.addEventListener('click', () => {
      this.chooseUsersCards(curCardId, true);
      closeModalWindow();
    });

    Array.from(payChangeElem).forEach((elem) => {
      elem?.addEventListener('click', () => {
        modalWindowElems.classList.remove('display-none');
        modalWindowElems.classList.add('card');
      });
    });

    Array.from(deliveryChangeElem).forEach((elem) => {
      elem?.addEventListener('click', () => {
        modalWindowElems.classList.remove('display-none');
        modalWindowElems.classList.add('address');
      });
    });
  }

  chooseUsersCards(id, isSelect = false) {
    const modalCards = document.getElementsByClassName('js-modal-card');

    Array.from(modalCards).forEach((card) => {
      card.checked = card.getAttribute('data-id') === id.toString();
    });

    if (isSelect) {
      orderSummary.setCardInfo(id);
      orderDetails.setCardInfo(id);
    }
  }

  render() {
    const modalCardBackground = document.querySelector('.modal-window__choose-card');

    let index = 0;
    cart.cardInfo.forEach((card) => {
      modalCardBackground.innerHTML += (
        `
          <label class="card__item">
            <input type="checkbox" class="checkbox opacity-hover js-modal-card" data-id="${index++}">
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

    this.addListeners();
    this.chooseUsersCards(0);
  }
}

export default new Modal();
