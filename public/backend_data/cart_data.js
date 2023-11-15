export const cart = {
  products: {
    chooseAll: true,
    userDiscount: {
      text: '10%',
      number: 0.1,
    },
    currency: 'com',
    productList: [
      {
        id: 1,
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
          number: 'ОГРН: 1067746062449',
          address: '142181, Московская Область, Подольск, Д Коледино, Д. 6 СТР. 1',
        },
        count: 1,
        price: 1051,
        discount: {
          text: '55%',
          number: 0.55,
        },
        leftInStock: 2,
        isFavorites: false,
      },
      {
        id: 2,
        name: 'Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe',
        image: 'backend_data/2.png',
        isChoose: true,
        props: [
          {name: 'Цвет', value: 'прозрачный'},
        ],
        provider: 'Коледино WB',
        providerDetails: {
          name: 'OOO Мегапрофстиль',
          number: 'ОГРН: 5167746237148',
          address: '129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34',
        },
        count: 200,
        price: 11501,
        discount: {
          text: '55%',
          number: 0.55,
        },
        leftInStock: null,
        isFavorites: false,
      },
      {
        id: 3,
        name: 'Карандаши цветные Faber-Castell "Замок", набор 24 цвета, заточенные, шестигранные,       Faber-Castell',
        image: 'backend_data/3.png',
        isChoose: false,
        props: [],
        provider: 'Коледино WB',
        providerDetails: {
          name: 'OOO Вайлдберриз',
          number: 'ОГРН: 1067746062449',
          address: '142181, Московская Область, Подольск, Д Коледино, Д. 6 СТР. 1',
        },
        count: 2,
        price: 475,
        discount: {
          text: '55%',
          number: 0.55,
        },
        leftInStock: 2,
        isFavorites: false,
      },
    ],
  },
  missingProducts: [
    {
      id: 1,
      name: 'Футболка UZcotton мужская',
      image: 'backend_data/1.png',
      props: [
        {name: 'Цвет', value: 'белый'},
        {name: 'Размер', value: '56'},
      ],
      isFavorites: false,
    },
    {
      id: 2,
      name: 'Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe',
      image: 'backend_data/2.png',
      props: [
        {name: 'Цвет', value: 'прозрачный'},
      ],
      isFavorites: false,
    },
    {
      id: 3,
      name: 'Карандаши цветные Faber-Castell "Замок", набор 24 цвета, заточенные, шестигранные,       Faber-Castell',
      image: 'backend_data/3.png',
      isChoose: true,
      props: [],
      isFavorites: false,
    },
  ],
  delivery: {
    type: 'Пункт выдачи',
    address: 'Бишкек, улица Ахматбека Суюмбаева, 12/1',
    stars: '4.99',
    time: 'Ежедневно с 10 до 21 ',
    price: 'Бесплатно',
  },
  pay: {
    card: '1234 56•• •••• 1234',
    date: '01/30',
    bankImage: 'static/img/mir.svg',
  }
}
