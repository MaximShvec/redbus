import type { L } from './index';

export const PHONE_DISPLAY = '22 02 56 56';
export const PHONE_TEL = '+37122025656';

export const copy = {
  skip: { ru: 'К содержимому', lv: 'Uz saturu', en: 'Skip to content' },

  nav: {
    story: { ru: 'О нас', lv: 'Par mums', en: 'About' },
    menu: { ru: 'Меню', lv: 'Ēdienkarte', en: 'Menu' },
    drinks: { ru: 'Напитки', lv: 'Dzērieni', en: 'Drinks' },
    delivery: { ru: 'Доставка', lv: 'Piegāde', en: 'Delivery' },
    places: { ru: 'Адреса', lv: 'Adreses', en: 'Locations' },
    order: { ru: 'Заказ', lv: 'Pasūtījums', en: 'Order' },
    call: { ru: 'Позвонить', lv: 'Zvanīt', en: 'Call' },
    menuOpen: { ru: 'Открыть меню', lv: 'Atvērt izvēlni', en: 'Open menu' },
    menuClose: { ru: 'Закрыть меню', lv: 'Aizvērt izvēlni', en: 'Close menu' },
  },

  ride: {
    next: { ru: 'Следующая остановка', lv: 'Nākamā pietura', en: 'Next stop' },
    home: { ru: 'Начало маршрута', lv: 'Maršruta sākums', en: 'Start of the route' },
  },

  hero: {
    eyebrow: { ru: 'Юрмала · Рига · с 2008 года', lv: 'Jūrmala · Rīga · kopš 2008. gada', en: 'Jūrmala · Riga · since 2008' },
    sub: {
      ru: 'Красный автобус, хрустящая пицца и кухня, которая работает до 3 ночи. Печём в Юрмале и Риге — привозим горячей.',
      lv: 'Sarkans autobuss, kraukšķīga pica un virtuve, kas strādā līdz 3 naktī. Cepam Jūrmalā un Rīgā — piegādājam karstu.',
      en: 'A red bus, crispy-crust pizza and a kitchen that stays open until 3 AM. Baked in Jūrmala and Riga — delivered hot.',
    },
    cta1: { ru: 'Выбрать пиццу', lv: 'Izvēlēties picu', en: 'Pick your pizza' },
    cta2: { ru: 'Позвонить', lv: 'Zvanīt', en: 'Call us' },
    scroll: { ru: 'Листайте', lv: 'Ritiniet', en: 'Scroll' },
    sticker: { ru: 'best pizza guaranteed', lv: 'best pizza guaranteed', en: 'best pizza guaranteed' },
  },

  ticker: [
    { ru: 'Best pizza guaranteed', lv: 'Best pizza guaranteed', en: 'Best pizza guaranteed' },
    { ru: '18 видов пиццы', lv: '18 picu veidi', en: '18 kinds of pizza' },
    { ru: 'Доставка от 1 €', lv: 'Piegāde no 1 €', en: 'Delivery from €1' },
    { ru: 'Пт · Сб — до 3:00', lv: 'Pk · S — līdz 3:00', en: 'Fri · Sat — until 3 AM' },
    { ru: '20 / 30 / 45 см', lv: '20 / 30 / 45 cm', en: '20 / 30 / 45 cm' },
    { ru: 'Юрмала · Рига', lv: 'Jūrmala · Rīga', en: 'Jūrmala · Riga' },
  ] as L[],

  story: {
    eyebrow: { ru: '01 — О нас', lv: '01 — Par mums', en: '01 — About us' },
    text: {
      ru: 'В 2008 году в Юрмале пришвартовался красный лондонский двухэтажный автобус ZOE. Внизу — два повара у печи, наверху — места на 30 гурманов. Гурманов стало так много, что автобусу стало тесно. Теперь мы печём на четырёх остановках — богатую и хрустящую пиццу, такую, как любят в Латвии.',
      lv: '2008. gadā Jūrmalā noenkurojās sarkans Londonas divstāvu autobuss ZOE. Lejā — divi pavāri pie krāsns, augšā — vietas 30 gardēžiem. Gardēžu kļuva tik daudz, ka autobusā visiem vietas par maz. Tagad cepam četrās pieturās — bagātīgu un kraukšķīgu picu, tieši tādu, kā patīk latvietim.',
      en: 'In 2008 a red London double-decker called ZOE docked in Jūrmala. Downstairs, two chefs at the oven; upstairs, seats for 30 foodies. Soon there were too many hungry guests for one bus. Today we bake at four stops — generous, crispy pizza, just the way Latvia likes it.',
    },
    text2: {
      ru: 'Над рецептами колдует сам владелец: развивает старые и придумывает новые. Так рождается лучшая пицца RedBus.lv.',
      lv: 'Pie receptēm strādā pats īpašnieks — attīsta esošās un izdomā jaunas. Tā top RedBus.lv labākā pica.',
      en: 'The owner himself works on the recipes — refining the classics and inventing new ones. That is how the best RedBus.lv pizza is born.',
    },
    stats: [
      { n: 2008, label: { ru: 'год, когда автобус ZOE встал на якорь', lv: 'gads, kad ZOE noenkurojās', en: 'the year ZOE docked' } },
      { n: 18, label: { ru: 'видов пиццы в меню', lv: 'picu veidi ēdienkartē', en: 'pizzas on the menu' } },
      { n: 4, label: { ru: 'остановки — Юрмала и Рига', lv: 'pieturas — Jūrmala un Rīga', en: 'stops — Jūrmala & Riga' } },
      { n: 3, label: { ru: 'ночи — закрываемся по пятницам и субботам', lv: 'naktī — slēdzam piektdienās un sestdienās', en: 'AM — closing time on Fri & Sat' } },
    ],
  },

  strip: { ru: 'Свежая из печи', lv: 'Svaiga no krāsns', en: 'Fresh from the oven' },

  menu: {
    eyebrow: { ru: '02 — Меню', lv: '02 — Ēdienkarte', en: '02 — Menu' },
    title: { ru: 'Пицца', lv: 'Picas', en: 'Pizza' },
    sub: {
      ru: 'Три размера — 20, 30 и 45 см. Выбирайте, добавляйте в заказ — и звоните.',
      lv: 'Trīs izmēri — 20, 30 un 45 cm. Izvēlieties, pievienojiet pasūtījumam — un zvaniet.',
      en: 'Three sizes — 20, 30 and 45 cm. Pick, add to your order — and give us a call.',
    },
    filters: {
      all: { ru: 'Все', lv: 'Visas', en: 'All' },
      meat: { ru: 'Мясные', lv: 'Gaļas', en: 'Meat' },
      chicken: { ru: 'Курица', lv: 'Vista', en: 'Chicken' },
      sea: { ru: 'Рыба и море', lv: 'Zivis un jūra', en: 'Fish & sea' },
      veg: { ru: 'Сыр и овощи', lv: 'Siers un dārzeņi', en: 'Cheese & veg' },
    },
    size: { ru: 'Размер', lv: 'Izmērs', en: 'Size' },
    sizeNote: {
      20: { ru: 'для одного', lv: 'vienam', en: 'for one' },
      30: { ru: 'классика', lv: 'klasika', en: 'classic' },
      45: { ru: 'для компании', lv: 'kompānijai', en: 'to share' },
    } as Record<20 | 30 | 45, L>,
    cm: { ru: 'см', lv: 'cm', en: 'cm' },
    add: { ru: 'Добавить в заказ', lv: 'Pievienot pasūtījumam', en: 'Add to order' },
    inOrder: { ru: 'В заказе', lv: 'Pasūtījumā', en: 'In order' },
    from: { ru: 'от', lv: 'no', en: 'from' },
    only30: { ru: 'Только 30 см', lv: 'Tikai 30 cm', en: '30 cm only' },
    hot: { ru: 'Острая', lv: 'Asa', en: 'Spicy' },
    vegan: { ru: 'Веган', lv: 'Vegāniska', en: 'Vegan' },
    hit: { ru: 'Хит', lv: 'Hits', en: 'Bestseller' },
    note: {
      ru: 'Осторожно: в пицце могут попадаться несъедобные части рыбы, ракообразных и мяса (кости, панцири). Вопросы об аллергенах — по телефону.',
      lv: 'Uzmanību: picā var būt neēdamas zivju, vēžveidīgo un gaļas daļas (kauli, čaulas). Jautājumi par alergēniem — pa tālruni.',
      en: 'Careful: pizza may contain inedible parts of fish, shellfish and meat (bones, shells). Allergen questions — call us.',
    },
    pizzaWord: { ru: 'пицца', lv: 'pica', en: 'pizza' },
  },

  drinks: {
    eyebrow: { ru: '03 — Напитки', lv: '03 — Dzērieni', en: '03 — Drinks' },
    title: { ru: 'Чем запить', lv: 'Ko dzert', en: 'Wash it down' },
    sub: {
      ru: '20 позиций — от воды до энергетиков. Всё холодное.',
      lv: '20 pozīcijas — no ūdens līdz enerģijas dzērieniem. Viss atdzesēts.',
      en: '20 picks — from water to energy drinks. All ice-cold.',
    },
    hint: { ru: 'Листайте', lv: 'Ritiniet', en: 'Keep scrolling' },
    add: { ru: 'Добавить', lv: 'Pievienot', en: 'Add' },
  },

  delivery: {
    eyebrow: { ru: '04 — Доставка', lv: '04 — Piegāde', en: '04 — Delivery' },
    title: { ru: 'Горячая — до самой двери', lv: 'Karsta — līdz pašām durvīm', en: 'Hot, right to your door' },
    from: { ru: 'от', lv: 'no', en: 'from' },
    text: {
      ru: 'Возим по Юрмале, Иманте, Золитуде и центру Риги. Точную стоимость доставки назовём по телефону — звоните, пока печь горячая.',
      lv: 'Piegādājam Jūrmalā, Imantā, Zolitūdē un Rīgas centrā. Precīzu piegādes cenu pateiksim pa tālruni — zvaniet, kamēr krāsns karsta.',
      en: 'We deliver across Jūrmala, Imanta, Zolitūde and central Riga. We will quote the exact price by phone — call while the oven is hot.',
    },
    free: {
      ru: 'Для Иманты и Золитуде — бесплатная доставка',
      lv: 'Imantai un Zolitūdei — bezmaksas piegāde',
      en: 'Free delivery for Imanta & Zolitūde',
    },
    freeNote: { ru: 'условия уточняйте по телефону', lv: 'nosacījumus precizējiet pa tālruni', en: 'ask by phone for conditions' },
    zones: [
      { ru: 'Юрмала', lv: 'Jūrmala', en: 'Jūrmala' },
      { ru: 'Иманта', lv: 'Imanta', en: 'Imanta' },
      { ru: 'Золитуде', lv: 'Zolitūde', en: 'Zolitūde' },
      { ru: 'Центр Риги', lv: 'Rīgas centrs', en: 'Central Riga' },
    ] as L[],
    steps: [
      {
        t: { ru: 'Заходите на сайт', lv: 'Ienāciet mājaslapā', en: 'Open the site' },
        d: { ru: 'Выберите пиццу и размер — всё меню здесь.', lv: 'Izvēlieties picu un izmēru — visa ēdienkarte te.', en: 'Choose pizza and size — the whole menu is right here.' },
      },
      {
        t: { ru: 'Заказывайте пиццу', lv: 'Pasūtiet picu', en: 'Order your pizza' },
        d: { ru: 'Соберите заказ и позвоните — подтвердим за минуту.', lv: 'Sakomplektējiet pasūtījumu un zvaniet — apstiprināsim minūtes laikā.', en: 'Build your order and call — we confirm in a minute.' },
      },
      {
        t: { ru: 'Принимайте заказ', lv: 'Saņemiet pasūtījumu', en: 'Receive your order' },
        d: { ru: 'Курьер привезёт горячую пиццу прямо к двери.', lv: 'Kurjers atvedīs karstu picu tieši pie durvīm.', en: 'Our courier brings it piping hot to your door.' },
      },
    ],
  },

  places: {
    eyebrow: { ru: '05 — Адреса', lv: '05 — Adreses', en: '05 — Locations' },
    title: { ru: 'Выходите на нужной остановке', lv: 'Izkāpiet vajadzīgajā pieturā', en: 'Get off at your stop' },
    stop: { ru: 'Остановка', lv: 'Pietura', en: 'Stop' },
    route: { ru: 'Построить маршрут', lv: 'Maršruts', en: 'Get directions' },
    hoursTitle: { ru: 'Часы работы · Юрмала', lv: 'Darba laiks · Jūrmala', en: 'Opening hours · Jūrmala' },
    days: {
      week: { ru: 'Пн — Чт', lv: 'P — C', en: 'Mon — Thu' },
      weekend: { ru: 'Пт — Сб', lv: 'Pk — S', en: 'Fri — Sat' },
      sun: { ru: 'Вс', lv: 'Sv', en: 'Sun' },
    },
    orLast: { ru: 'или до последнего гостя', lv: 'vai līdz pēdējam apmeklētājam', en: 'or until the last guest' },
    open: { ru: 'Сейчас открыто', lv: 'Šobrīd atvērts', en: 'Open now' },
    closed: { ru: 'Сейчас закрыто', lv: 'Šobrīd slēgts', en: 'Closed now' },
    until: { ru: 'до', lv: 'līdz', en: 'until' },
    opensAt: { ru: 'откроемся в', lv: 'atvērsimies', en: 'opens at' },
    list: [
      {
        city: { ru: 'Юрмала · Майори', lv: 'Jūrmala · Majori', en: 'Jūrmala · Majori' },
        address: 'Tirgoņu iela 21',
        tags: [
          { ru: 'солнечная терраса', lv: 'saulaina terase', en: 'sunny terrace' },
          { ru: 'стильный интерьер', lv: 'stilīgs interjers', en: 'stylish interior' },
          { ru: 'доставка', lv: 'piegāde', en: 'delivery' },
        ],
        phone: PHONE_DISPLAY,
        tel: PHONE_TEL,
      },
      {
        city: { ru: 'Юрмала · Каугури', lv: 'Jūrmala · Kauguri', en: 'Jūrmala · Kauguri' },
        address: 'Talsu šoseja 39',
        tags: [
          { ru: 'детская комната', lv: 'bērnu istaba', en: 'kids’ room' },
          { ru: 'праздники и концерты', lv: 'svētki un pasākumi', en: 'parties & events' },
          { ru: 'бар', lv: 'bārs', en: 'bar' },
        ],
        phone: PHONE_DISPLAY,
        tel: PHONE_TEL,
      },
      {
        city: { ru: 'Рига · Золитуде', lv: 'Rīga · Zolitūde', en: 'Riga · Zolitūde' },
        address: 'Zolitūdes iela 32',
        tags: [
          { ru: 'пекарня', lv: 'picu ceptuve', en: 'bakery' },
          { ru: 'бесплатная доставка в Золитуде и Иманту', lv: 'bezmaksas piegāde Zolitūdē un Imantā', en: 'free delivery to Zolitūde & Imanta' },
        ],
        phone: PHONE_DISPLAY,
        tel: PHONE_TEL,
      },
      {
        city: { ru: 'Рига · Центр', lv: 'Rīga · Centrs', en: 'Riga · Centre' },
        address: 'Stabu iela 29',
        tags: [
          { ru: 'в сердце Риги', lv: 'Rīgas sirdī', en: 'in the heart of Riga' },
          { ru: 'партнёр SIA “Vjetnamas kalni”', lv: 'sadarbības partneris SIA “Vjetnamas kalni”', en: 'partner SIA “Vjetnamas kalni”' },
        ],
        phone: '20 91 93 33',
        tel: '+37120919333',
      },
    ],
  },

  cart: {
    title: { ru: 'Ваш заказ', lv: 'Jūsu pasūtījums', en: 'Your order' },
    empty: { ru: 'Пока пусто. Добавьте пару пицц — автобус уже прогрет.', lv: 'Pagaidām tukšs. Pievienojiet pāris picas — autobuss jau iesildīts.', en: 'Nothing here yet. Add a pizza — the bus is already warmed up.' },
    emptyCta: { ru: 'К меню', lv: 'Uz ēdienkarti', en: 'Browse the menu' },
    total: { ru: 'Итого', lv: 'Kopā', en: 'Total' },
    deliveryNote: { ru: 'Без доставки. Её стоимость назовёт оператор.', lv: 'Bez piegādes. Tās cenu pateiks operators.', en: 'Excluding delivery — the operator will quote it.' },
    call: { ru: 'Позвонить и заказать', lv: 'Zvanīt un pasūtīt', en: 'Call to order' },
    copy: { ru: 'Скопировать заказ', lv: 'Kopēt pasūtījumu', en: 'Copy order' },
    copied: { ru: 'Скопировано', lv: 'Nokopēts', en: 'Copied' },
    site: { ru: 'Оформить на redbus.lv', lv: 'Noformēt redbus.lv', en: 'Checkout on redbus.lv' },
    remove: { ru: 'Убрать', lv: 'Noņemt', en: 'Remove' },
    close: { ru: 'Закрыть', lv: 'Aizvērt', en: 'Close' },
    more: { ru: 'Увеличить', lv: 'Palielināt', en: 'Increase' },
    less: { ru: 'Уменьшить', lv: 'Samazināt', en: 'Decrease' },
    header: { ru: 'Здравствуйте! Хочу заказать:', lv: 'Labdien! Gribu pasūtīt:', en: 'Hello! I would like to order:' },
  },

  footer: {
    cta1: { ru: 'Next stop:', lv: 'Next stop:', en: 'Next stop:' },
    cta2: { ru: 'pizza', lv: 'pizza', en: 'pizza' },
    call: { ru: 'Звоните — отвечаем до последнего гостя', lv: 'Zvaniet — atbildam līdz pēdējam apmeklētājam', en: 'Call — we pick up until the last guest' },
    info: { ru: 'Информация', lv: 'Informācija', en: 'Information' },
    social: { ru: 'Мы в соцсетях', lv: 'Sociālajos tīklos', en: 'Follow us' },
    company: { ru: 'Реквизиты', lv: 'Rekvizīti', en: 'Company details' },
    legal: { ru: 'Юр. адрес', lv: 'Juridiskā adrese', en: 'Registered address' },
    bank: { ru: 'Банк', lv: 'Banka', en: 'Bank' },
    account: { ru: 'Счёт', lv: 'Konts', en: 'Account' },
    reg: { ru: 'Рег. №', lv: 'Reģ. Nr.', en: 'Reg. No.' },
    vat: { ru: 'Плательщик НДС №', lv: 'PVN maksātāja Nr.', en: 'VAT No.' },
    top: { ru: 'Наверх', lv: 'Uz augšu', en: 'Back to top' },
    fineprint: {
      ru: 'Концепт-страница. Все цены и данные — с redbus.lv.',
      lv: 'Konceptuāla lapa. Visas cenas un dati — no redbus.lv.',
      en: 'Concept page. All prices and data come from redbus.lv.',
    },
  },
} as const;

export const COMPANY = {
  name: 'SIA “Roxel Trade”',
  reg: '50103422181',
  vat: 'LV50103422181',
  legal: 'Zolitūdes iela 32, Rīga, LV-1029',
  bank: 'Luminor Bank AS Latvijas filiāle',
  iban: 'LV45RIKO0002930323705',
  bic: 'RIKOLV2X',
};
