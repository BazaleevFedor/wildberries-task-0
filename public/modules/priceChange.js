import {cart} from "../backend_data/cart_data.js";

export default class PriceChange {
  timer;
  constructor() {
    this.regexPattern = new RegExp("[" + `&nbsp;\\s−${cart.currency}` + "]", "g");

    this.STEP_COUNT = 100;
    this.TIMEOUT = 5;
  }

  debounce(priseList) {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    priseList.forEach((price) => {
      let last = Number(price.field.innerHTML.replace(this.regexPattern, '') || 0);
      price.step = Math.round((price.value - last) / this.STEP_COUNT);
      price.curValue = last + price.step;
    });

    const _debounce = () => {
      if (Math.abs(priseList[0].curValue - priseList[0].value) <= Math.abs(priseList[0].step)) {
        priseList.forEach((price) => {
          price.field.innerHTML = `${price.minus && price.value ? '−' : ''}${price.value.toLocaleString().replace(/,/g, ' ')}${price.currency ? ` ${cart.currency}` : ``}`;
        });
      } else {
        priseList.forEach((price) => {
          price.field.innerHTML = `${price.minus && price.value ? '−' : ''}${price.curValue.toLocaleString().replace(/,/g, ' ')}${price.currency ? ` ${cart.currency}` : ``}`;
          price.curValue += price.step;
        });

        this.timer = setTimeout(() => _debounce(), this.TIMEOUT)
      }
    }

    _debounce();
  }
}
