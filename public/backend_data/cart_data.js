export const cart = {
  currency: 'сом',
  chooseAll: true,
  favorites: new Map(),
  userDiscount: {
    text: '10%',
    number: 0.1,
  },
  productList: new Map([
      ['1', {
        id: '1',
        name: 'Футболка UZcotton мужская',
        image: 'backend_data/1.png',
        isChoose: true,
        props: [
          {name: 'Размер', value: '56'},
          {name: 'Цвет', value: 'белый'},
        ],
        provider: 'Коледино WB',
        providerDetails: {
          name: 'OOO Вайлдберриз',
          fullName: 'OOO «ВАЙЛДБЕРРИЗ»',
          number: 'ОГРН: 1067746062449',
          address: '142181, Московская Область, Подольск, Д Коледино, Д. 6 СТР. 1',
        },
        count: 1,
        price: 1051,
        discount: {
          text: '55%',
          number: 0.55,
        },
        delivery: [
          {date: '5—6 февраля', maxCount: 2},
        ],
        leftInStock: 2,
        isFavorites: false,
      }],
      ['2', {
        id: '2',
        name: 'Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe',
        image: 'backend_data/2.png',
        isChoose: true,
        props: [
          {name: 'Цвет', value: 'прозрачный'},
        ],
        provider: 'Коледино WB',
        providerDetails: {
          name: 'OOO Мегапрофстиль',
          fullName: 'OOO «МЕГАПРОФСТИЛЬ»',
          number: 'ОГРН: 5167746237148',
          address: '129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34',
        },
        count: 200,
        price: 11501,
        discount: {
          text: '55%',
          number: 0.55,
        },
        delivery: [
          {date: '5—6 февраля', maxCount: 184},
          {date: '7—8 февраля', maxCount: 97},
          {date: '9—10 февраля', maxCount: 115},
          {date: '11—12 февраля', maxCount: Infinity},
        ],
        leftInStock: null,
        isFavorites: false,
      }],
      ['3', {
        id: '3',
        name: 'Карандаши цветные Faber-Castell "Замок", набор 24 цвета, заточенные, шестигранные,       Faber-Castell',
        image: 'backend_data/3.png',
        isChoose: true,
        props: [],
        provider: 'Коледино WB',
        providerDetails: {
          name: 'OOO Вайлдберриз',
          fullName: 'OOO «ВАЙЛДБЕРРИЗ»',
          number: 'ОГРН: 1067746062449',
          address: '142181, Московская Область, Подольск, Д Коледино, Д. 6 СТР. 1',
        },
        count: 2,
        price: 475,
        discount: {
          text: '55%',
          number: 0.55,
        },
        delivery: [
          {date: '5—6 февраля', maxCount: 2},
        ],
        leftInStock: 2,
        isFavorites: false,
      }]
    ]),
  missingProductsList: new Map([
    ['1', {
      id: 1,
      name: 'Футболка UZcotton мужская',
      image: 'backend_data/1.png',
      props: [
        {name: 'Цвет', value: 'белый'},
        {name: 'Размер', value: '56'},
      ],
      isFavorites: false,
    }],
    ['2', {
      id: 2,
      name: 'Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe',
      image: 'backend_data/2.png',
      props: [
        {name: 'Цвет', value: 'прозрачный'},
      ],
      isFavorites: false,
    }],
    ['3', {
      id: 3,
      name: 'Карандаши цветные Faber-Castell "Замок", набор 24 цвета, заточенные, шестигранные,       Faber-Castell',
      image: 'backend_data/3.png',
      isChoose: true,
      props: [],
      isFavorites: false,
    }],
  ]),
  delivery: {
    type: [
      {shortText: 'Пункт выдачи', text: 'Доставка в пункт выдачи'},
      {shortText: 'Доставит курьер', text: 'Доставит курьер'}
    ],
    points: [
      {address: 'г. Бишкек, микрорайон Джал, улица Ахунбаева Исы, д. 67/1', rating: '4.99', time: 'Ежедневно с 10 до 21'},
      {address: 'г. Бишкек, микрорайон Джал, улица Ахунбаева Исы, д. 67/1', rating: '4.99', time: 'Ежедневно с 10 до 21'},
      {address: 'г. Бишкек, улица Табышалиева, д. 57', rating: '4.99', time: 'Ежедневно с 10 до 21'},
    ],
    address: ['Бишкек, улица Табышалиева, 57', 'Бишкек, улица Жукеева-Пудовкина, 77/1', 'Бишкек, микрорайон Джал, улица Ахунбаева Исы, 67/1'],
    price: 'Бесплатно',
  },
  cardInfo: [
    {card: '1234 56•• •••• 1234', date: '01/30', bankImage: 'static/img/mir.svg', isChoose: true},
    {card: '2345 67•• •••• 2345', date: '02/29', bankImage: 'static/img/visa.svg', isChoose: false},
    {card: '3456 78•• •••• 3456', date: '03/31', bankImage: 'static/img/mastercard.svg', isChoose: false},
    {card: '4567 89•• •••• 4567', date: '04/30', bankImage: 'static/img/maestro.svg', isChoose: false},
  ],
}
