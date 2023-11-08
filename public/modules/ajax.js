/**
 * класс, реализующий работу запроса
 */
class Ajax {
  /**
   * @constructor
   * конструктор метода
   */
  constructor() {
    this._response = {

    }
  }

  /**
   * @private метод для работы запроса
   * @returns {Object} - тело ответа
   */
  _request() {
    return this._response;
  }

  /**
   * метод, отправляющий запрос на получение информации о корзине пользователя
   * @returns {Object} - тело ответа
   */
  async getUsersCart() {
    return this._request();
  }
}

export default new Ajax();