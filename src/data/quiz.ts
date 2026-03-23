export type BodyType = 'sedan' | 'liftback' | 'crossover' | 'suv' | 'coupe' | 'wagon' | 'other';
export type ProtectionPackage = 'impact' | 'front' | 'full' | 'custom';
export type CarCondition = 'new' | 'used_good' | 'needs_prep';
export type ExtraService = 'anti_chrome' | 'headlights' | 'interior_trim' | 'ceramic' | 'none';
export type BookingTiming = 'asap' | 'this_week' | 'this_month' | 'price_only';

export type QuizAnswers = {
  bodyType?: BodyType;
  protection?: ProtectionPackage;
  condition?: CarCondition;
  extras: ExtraService[];
  timing?: BookingTiming;
};

export type QuizStep<T extends string> = {
  key: keyof QuizAnswers;
  title: string;
  description: string;
  multi?: boolean;
  options: { value: T; label: string; hint: string }[];
};

export const quizSteps: QuizStep<string>[] = [
  {
    key: 'bodyType',
    title: 'Какой у вас автомобиль?',
    description: 'Подберём ориентир по площади оклейки и сложности кузова.',
    options: [
      { value: 'sedan', label: 'Седан', hint: 'Классическая четырёхдверная конфигурация.' },
      { value: 'liftback', label: 'Лифтбек', hint: 'Практичный кузов со сложной геометрией пятой двери.' },
      { value: 'crossover', label: 'Кроссовер', hint: 'Повышенная линия кузова и увеличенная площадь защиты.' },
      { value: 'suv', label: 'SUV', hint: 'Крупный кузов, требующий больше материала и времени.' },
      { value: 'coupe', label: 'Купе', hint: 'Выразительный профиль и акцент на идеальную подгонку.' },
      { value: 'wagon', label: 'Универсал', hint: 'Длинный кузов с расширенной зоной защиты.' },
      { value: 'other', label: 'Другое', hint: 'Подберём решение после уточнения модели.' },
    ],
  },
  {
    key: 'protection',
    title: 'Что хотите защитить?',
    description: 'Выберите пакет оклейки под ваш сценарий эксплуатации.',
    options: [
      { value: 'impact', label: 'Ударные зоны', hint: 'Кромки, пороги, зоны риска и локальные элементы.' },
      { value: 'front', label: 'Передняя часть', hint: 'Бампер, капот, крылья, зеркала и фары.' },
      { value: 'full', label: 'Полный кузов', hint: 'Максимальная защита и сохранение ликвидности автомобиля.' },
      { value: 'custom', label: 'Индивидуальный набор деталей', hint: 'Соберём персональный комплект защиты под задачи.' },
    ],
  },
  {
    key: 'condition',
    title: 'Состояние автомобиля',
    description: 'Это влияет на подготовку поверхности перед оклейкой.',
    options: [
      { value: 'new', label: 'Новый', hint: 'Минимальная подготовка, можно оклеивать сразу.' },
      { value: 'used_good', label: 'С пробегом в хорошем состоянии', hint: 'Потребуется деликатная очистка и коррекция.' },
      { value: 'needs_prep', label: 'Есть царапины, нужна подготовка', hint: 'Добавим этап полировки и подготовки покрытия.' },
    ],
  },
  {
    key: 'extras',
    title: 'Нужны дополнительные услуги?',
    description: 'Можно выбрать несколько опций или отказаться от них.',
    multi: true,
    options: [
      { value: 'anti_chrome', label: 'Антихром', hint: 'Затемним хромированные элементы в едином стиле.' },
      { value: 'headlights', label: 'Бронь фар', hint: 'Защитим оптику от пескоструя и помутнения.' },
      { value: 'interior_trim', label: 'Защита салонного глянца', hint: 'Сохраним интерьер без микроцарапин.' },
      { value: 'ceramic', label: 'Керамика', hint: 'Упростим уход и усилим гидрофобный эффект.' },
      { value: 'none', label: 'Ничего не нужно', hint: 'Оставим только основной пакет оклейки.' },
    ],
  },
  {
    key: 'timing',
    title: 'Когда хотите записаться?',
    description: 'Поймём, насколько быстро подобрать окно в графике.',
    options: [
      { value: 'asap', label: 'Как можно скорее', hint: 'Подберём ближайшее доступное время.' },
      { value: 'this_week', label: 'На этой неделе', hint: 'Постараемся забронировать слот в ближайшие дни.' },
      { value: 'this_month', label: 'В течение месяца', hint: 'Подготовим спокойный план оклейки без спешки.' },
      { value: 'price_only', label: 'Пока хочу узнать цену', hint: 'Сделаем расчёт и проконсультируем без давления.' },
    ],
  },
];
