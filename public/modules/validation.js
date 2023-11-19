class Validation {
  counter(newCount, leftInStock, lastCount) {
    if (/^\d+$/.test(newCount)) {
      newCount = Number(newCount);
      if (leftInStock && newCount > leftInStock) {
        newCount = leftInStock;
      } else if (newCount < 1) {
        newCount = 1;
      }
    } else {
      newCount = lastCount;
    }

    return newCount;
  }

  forename(forename) {
    const nameRegex = /^[A-Za-zА-Яа-яЁё]+$/;

    if (!forename) {
      return {isCorrect: false, errorText: 'Укажите имя'};
    }

    if (!nameRegex.test(forename)) {
      return {isCorrect: false, errorText: 'Укажите имя'};
    }

    return {isCorrect: true, errorText: ''};
  }

  surname(surname) {
    const nameRegex = /^[A-Za-zА-Яа-яЁё]+$/;
    if (!surname) {
      return {isCorrect: false, errorText: 'Введите фамилию'};
    }

    if (!nameRegex.test(surname)) {
      return {isCorrect: false, errorText: 'Введите фамилию'};
    }

    return {isCorrect: true, errorText: ''};
  }

  email(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return {isCorrect: false, errorText: 'Укажите электронную почту'};
    }

    if (!emailRegex.test(email)) {
      return {isCorrect: false, errorText: 'Проверьте адрес электронной почты'};
    }

    return {isCorrect: true, errorText: ''};
  }

  phone(phone) {
    const phoneRegex = /^\+\d \d{3} \d{3} \d{2} \d{2}$/;
    if (!phone) {
      return {isCorrect: false, errorText: 'Укажите номер телефона'};
    }

    if (phone && !phoneRegex.test(phone)) {
      return {isCorrect: false, errorText: 'Формат: +9 999 999 99 99'};
    }

    if (phone && phone.length > 30) {
      return {isCorrect: false, errorText: 'Формат: +9 999 999 99 99'};
    }

    return {isCorrect: true, errorText: ''};
  }

  inn(inn) {
    if (!inn) {
      return {isCorrect: false, errorText: 'Укажите ИНН'};
    }

    if (inn && !/^\d+$/.test(inn)) {
      return {isCorrect: false, errorText: 'Проверьте ИНН'};
    }

    if (inn && inn.length !== 14) {
      return {isCorrect: false, errorText: 'Проверьте ИНН'};
    }

    return {isCorrect: true, errorText: ''};
  }
}

export default new Validation();