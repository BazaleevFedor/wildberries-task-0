class Grammar {
  /**
   * Определяет форму написания слова "товар" для заданного числа товаров.
   * @param count - кол-во товаров
   * @return resultForm - слово "товар" в правильной форме.
   */
  productsForm(count) {
    let resultForm = ''
    if (count % 10 === 1 && count % 100 !== 11) {
      resultForm = 'товар';
    } else if ((count % 10 === 2 || count % 10 === 3 || count % 10 === 4) && (count % 100 < 10 || count % 100 >= 20)) {
      resultForm = 'товара';
    } else {
      resultForm = 'товаров';
    }

    return resultForm;
  }
}

export default new Grammar();