import type { L } from '../i18n';

export type PizzaTag = 'meat' | 'chicken' | 'sea' | 'veg';
export type PizzaSize = 20 | 30 | 45;

export interface Pizza {
  id: number;
  /** price per size (EUR) – prices taken from redbus.lv */
  prices: Partial<Record<PizzaSize, number>>;
  tags: PizzaTag[];
  hot?: boolean;
  vegan?: boolean;
  hit?: boolean;
  name: L;
  ingr: L;
}

const P3 = (a: number, b: number, c: number) => ({ 20: a, 30: b, 45: c });

/** Ordered the way we want to show them: signature first. */
export const PIZZAS: Pizza[] = [
  {
    id: 26,
    prices: P3(7.5, 12.5, 20.5),
    tags: ['meat'],
    hot: true,
    hit: true,
    name: { ru: 'Горячая свинья', lv: 'Karstā cūka', en: 'Hot Pork' },
    ingr: {
      ru: 'соус, помидоры, лук, сыр, бекон, халапеньо, зелёный лук',
      lv: 'mērce, tomāti, sīpoli, siers, bekons, jalapeño, lociņi',
      en: 'sauce, tomatoes, onion, cheese, bacon, jalapeño, spring onion',
    },
  },
  {
    id: 35,
    prices: P3(9.5, 15.5, 25.5),
    tags: ['meat'],
    name: { ru: 'С кроликом', lv: 'Truša', en: 'Rabbit' },
    ingr: {
      ru: 'голландская моцарелла, мясо кролика, помидоры, лук, йогуртовый соус',
      lv: 'holandes mozzarella, truša gaļa, tomāti, sīpoli, jogurta mērce',
      en: 'Dutch mozzarella, rabbit meat, tomatoes, onion, yogurt sauce',
    },
  },
  {
    id: 34,
    prices: { 30: 16.5 },
    tags: ['meat'],
    name: { ru: 'Двухэтажная', lv: 'Divstāvu', en: 'Two Floors' },
    ingr: {
      ru: 'соус, копчёная колбаса, сыр',
      lv: 'mērce, dūmdesa, siers',
      en: 'sauce, smoked sausage, cheese',
    },
  },
  {
    id: 32,
    prices: P3(9.5, 15.5, 25.5),
    tags: ['sea'],
    name: { ru: 'С дарами моря', lv: 'Jūras veltes', en: 'Seafood' },
    ingr: {
      ru: 'соус, помидоры, лук, моллюски, кальмары, осьминоги, сыр, креветки',
      lv: 'mērce, tomāti, sīpoli, mīdijas, kalmāri, astoņkāji, siers, garneles',
      en: 'sauce, tomatoes, onion, mussels, squid, octopus, cheese, shrimp',
    },
  },
  {
    id: 33,
    prices: P3(9.5, 15.5, 25.5),
    tags: ['sea'],
    name: { ru: 'С лососем', lv: 'Laša', en: 'Salmon' },
    ingr: {
      ru: 'майонез, лук, помидоры, сыр, лосось, лимон',
      lv: 'majonēzes mērce, sīpoli, tomāti, siers, lasis, citrons',
      en: 'mayonnaise, onion, tomatoes, cheese, salmon, lemon',
    },
  },
  {
    id: 31,
    prices: P3(9.5, 15.5, 25.5),
    tags: ['sea'],
    name: { ru: 'С тунцом', lv: 'Tunča', en: 'Tuna' },
    ingr: {
      ru: 'майонез с хреном, лук, помидоры, паприка, тунец, сыр',
      lv: 'mārrutku-majonēzes mērce, sīpoli, tomāti, paprika, tuncis, siers',
      en: 'horseradish mayo, onion, tomatoes, paprika, tuna, cheese',
    },
  },
  {
    id: 22,
    prices: P3(7.5, 12.5, 20.5),
    tags: ['veg'],
    name: { ru: '4D Cheese', lv: '4D Cheese', en: '4D Cheese' },
    ingr: {
      ru: 'голландский сыр, дор блю, моцарелла, парито, груша',
      lv: 'Holandes siers, Dor Blue, mozzarella, parito, bumbieris',
      en: 'Dutch cheese, Dor Blue, mozzarella, parito, pear',
    },
  },
  {
    id: 28,
    prices: P3(8.5, 14.5, 23.5),
    tags: ['meat'],
    hot: true,
    name: { ru: 'Mr. Bean', lv: 'Mr. Bean', en: 'Mr. Bean' },
    ingr: {
      ru: 'соус, халапеньо, лук, томаты, бобы, молотое мясо, бекон, сыр',
      lv: 'mērce, jalapeño, sīpoli, tomāti, pupiņas, maltā gaļa, bekons, siers',
      en: 'sauce, jalapeño, onion, tomatoes, beans, minced meat, bacon, cheese',
    },
  },
  {
    id: 27,
    prices: P3(7.5, 12.5, 20.5),
    tags: ['meat'],
    name: { ru: 'Subaru', lv: 'Subaru', en: 'Subaru' },
    ingr: {
      ru: 'майонез с хреном, помидоры, лук, молотое мясо, сыр, бекон, маринованные огурцы',
      lv: 'mārrutku-majonēzes mērce, tomāti, sīpoli, maltā gaļa, siers, bekons, marinēti gurķi',
      en: 'horseradish mayo, tomatoes, onion, minced meat, cheese, bacon, pickles',
    },
  },
  {
    id: 29,
    prices: P3(8.5, 14.5, 23.5),
    tags: ['meat'],
    name: { ru: 'Вкусная', lv: 'Garšīgā', en: 'Delicious' },
    ingr: {
      ru: 'соус, копчёная колбаса, ветчина, лук, помидоры, паприка, грибы, сыр',
      lv: 'mērce, dūmdesa, šķiņķis, sīpoli, tomāti, paprika, sēnes, siers',
      en: 'sauce, smoked sausage, ham, onion, tomatoes, paprika, mushrooms, cheese',
    },
  },
  {
    id: 38,
    prices: P3(8.5, 14.5, 23.5),
    tags: ['chicken'],
    name: { ru: 'Куриная особая', lv: 'Īpašā vista', en: 'Chicken Special' },
    ingr: {
      ru: 'моцарелла, дор блю, парито, курица, майонез',
      lv: 'mozzarella, Dor Blue, parito, vista, majonēze',
      en: 'mozzarella, Dor Blue, parito, chicken, mayonnaise',
    },
  },
  {
    id: 30,
    prices: P3(8.5, 14.5, 23.5),
    tags: ['chicken'],
    name: { ru: 'Куриная', lv: 'Vistas', en: 'Chicken' },
    ingr: {
      ru: 'соус, помидоры, салями, куриное филе, экстра сыр',
      lv: 'mērce, tomāti, salami, vistas fileja, ekstra siers',
      en: 'sauce, tomatoes, pepperoni, chicken fillet, extra cheese',
    },
  },
  {
    id: 23,
    prices: P3(7.5, 12.5, 20.5),
    tags: ['meat'],
    name: { ru: 'Грибная', lv: 'Sēņu', en: 'Mushroom' },
    ingr: {
      ru: 'соус, ветчина, лук, паприка, сыр, грибы',
      lv: 'mērce, šķiņķis, sīpoli, paprika, siers, sēnes',
      en: 'sauce, ham, onion, paprika, cheese, mushrooms',
    },
  },
  {
    id: 24,
    prices: P3(6.1, 11.1, 18.5),
    tags: ['meat'],
    name: { ru: 'Гавайская', lv: 'Hawaii', en: 'Hawaiian' },
    ingr: {
      ru: 'соус, паприка, сыр, ветчина, ананасы',
      lv: 'mērce, paprika, siers, šķiņķis, ananāsi',
      en: 'sauce, paprika, cheese, ham, pineapple',
    },
  },
  {
    id: 21,
    prices: P3(6.1, 11.1, 18.5),
    tags: ['meat'],
    name: { ru: 'С колбасой', lv: 'Ar desu', en: 'Sausage' },
    ingr: {
      ru: 'соус, копчёная колбаса, сыр',
      lv: 'mērce, dūmdesa, siers',
      en: 'sauce, smoked sausage, cheese',
    },
  },
  {
    id: 25,
    prices: P3(7.5, 12.5, 20.5),
    tags: ['veg'],
    name: { ru: 'Вегетарианская', lv: 'Vegetārā', en: 'Vegetarian' },
    ingr: {
      ru: 'соус, помидоры, лук, паприка, грибы, оливки, сыр',
      lv: 'mērce, tomāti, sīpoli, paprika, sēnes, olīves, siers',
      en: 'sauce, tomatoes, onion, paprika, mushrooms, olives, cheese',
    },
  },
  {
    id: 117,
    prices: P3(7.5, 12.5, 20.5),
    tags: ['veg'],
    vegan: true,
    name: { ru: 'Веганская', lv: 'Vegānā', en: 'Vegan' },
    ingr: {
      ru: 'веганский сыр (моцарелла, чеддер), три овоща на ваш выбор, соус',
      lv: 'vegānais siers (mozzarella, čedars), trīs dārzeņi pēc izvēles, mērce',
      en: 'vegan cheese (mozzarella, cheddar), three vegetables of your choice, sauce',
    },
  },
  {
    id: 20,
    prices: P3(5.5, 9.5, 16.5),
    tags: ['veg'],
    name: { ru: 'Сырная', lv: 'Siera', en: 'Cheese' },
    ingr: {
      ru: 'соус, экстра сыр',
      lv: 'mērce, ekstra siers',
      en: 'sauce, extra cheese',
    },
  },
];

export const SIZES: PizzaSize[] = [20, 30, 45];

export const pizzaSizes = (p: Pizza): PizzaSize[] => SIZES.filter((s) => p.prices[s] !== undefined);
export const defaultSize = (p: Pizza): PizzaSize => (p.prices[30] !== undefined ? 30 : pizzaSizes(p)[0]);
export const minPrice = (p: Pizza): number => Math.min(...(Object.values(p.prices) as number[]));

export interface Drink {
  id: number;
  price: number;
  name: L;
  vol: string;
  /** accent colour used behind the bottle */
  tone: string;
}

const same = (s: string): L => ({ ru: s, lv: s, en: s });

export const DRINKS: Drink[] = [
  { id: 43, price: 1.7, vol: '0,5 l', tone: '#7CC8F2', name: { ru: 'Вода — газ / без газа', lv: 'Ūdens — gāzēts / negāzēts', en: 'Water — sparkling / still' } },
  { id: 53, price: 2.0, vol: '0,5 l', tone: '#FFB347', name: same('Fuze Tea Peach') },
  { id: 42, price: 2.0, vol: '0,5 l', tone: '#FFE066', name: same('Fuze Tea Lemon') },
  { id: 41, price: 2.3, vol: '250 ml', tone: '#F2C14E', name: same('Schweppes Tonic') },
  { id: 49, price: 2.3, vol: '0,3 l', tone: '#FF8A1F', name: same('Fanta') },
  { id: 36, price: 2.3, vol: '0,3 l', tone: '#FF4D4D', name: same('Coca-Cola') },
  { id: 50, price: 2.3, vol: '0,3 l', tone: '#7EE081', name: same('Sprite') },
  { id: 112, price: 2.5, vol: '0,568 l', tone: '#C98B4B', name: { ru: 'Квас Ulmaņlaiku', lv: 'Kvass Ulmaņlaiku', en: 'Kvass Ulmaņlaiku' } },
  { id: 39, price: 2.9, vol: '0,5 l', tone: '#FF4D4D', name: same('Coca-Cola') },
  { id: 100, price: 2.9, vol: '0,5 l', tone: '#E8E8E8', name: same('Coca-Cola Zero') },
  { id: 51, price: 2.9, vol: '0,5 l', tone: '#FF8A1F', name: same('Fanta') },
  { id: 52, price: 2.9, vol: '0,5 l', tone: '#7EE081', name: same('Sprite') },
  { id: 63, price: 3.0, vol: '0,5 l', tone: '#C7F23A', name: same('Monster Ultra Zero') },
  { id: 65, price: 3.0, vol: '0,5 l', tone: '#E86AD6', name: same('Monster Punch') },
  { id: 66, price: 3.0, vol: '0,5 l', tone: '#FFB02E', name: same('Monster Mango Loco') },
  { id: 62, price: 3.0, vol: '0,5 l', tone: '#9BE23A', name: same('Monster Energy') },
  { id: 57, price: 3.5, vol: '1,5 l', tone: '#FF8A1F', name: same('Fanta') },
  { id: 58, price: 3.5, vol: '1,5 l', tone: '#7EE081', name: same('Sprite') },
  { id: 40, price: 3.5, vol: '1,5 l', tone: '#FF4D4D', name: same('Coca-Cola') },
  { id: 47, price: 3.5, vol: '1 l', tone: '#FFA53D', name: { ru: 'Сок Cido (разные вкусы)', lv: 'Sulas Cido (dažādas)', en: 'Cido juice (assorted)' } },
];

export const pizzaById = (id: number) => PIZZAS.find((p) => p.id === id);
export const drinkById = (id: number) => DRINKS.find((d) => d.id === id);
