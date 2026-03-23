import type { BodyType, CarCondition, ExtraService, ProtectionPackage, QuizAnswers } from './quiz';

export const bodyTypePrices: Record<BodyType, number> = {
  sedan: 0,
  liftback: 10000,
  crossover: 18000,
  suv: 28000,
  coupe: 8000,
  wagon: 14000,
  other: 16000,
};

export const protectionPrices: Record<ProtectionPackage, [number, number]> = {
  impact: [55000, 85000],
  front: [125000, 175000],
  full: [285000, 420000],
  custom: [95000, 190000],
};

export const conditionModifiers: Record<CarCondition, number> = {
  new: 0,
  used_good: 15000,
  needs_prep: 35000,
};

export const extraServicePrices: Record<ExtraService, number> = {
  anti_chrome: 25000,
  headlights: 12000,
  interior_trim: 10000,
  ceramic: 18000,
  none: 0,
};

export type EstimateResult = {
  min: number;
  max: number;
  details: string[];
};

export const calculateEstimate = (answers: QuizAnswers): EstimateResult => {
  if (!answers.bodyType || !answers.protection || !answers.condition) {
    return { min: 0, max: 0, details: [] };
  }

  const [baseMin, baseMax] = protectionPrices[answers.protection];
  const bodyDelta = bodyTypePrices[answers.bodyType];
  const conditionDelta = conditionModifiers[answers.condition];
  const extras = answers.extras.includes('none') ? [] : answers.extras;
  const extrasTotal = extras.reduce((sum, item) => sum + extraServicePrices[item], 0);

  return {
    min: baseMin + bodyDelta + conditionDelta + extrasTotal,
    max: baseMax + bodyDelta + conditionDelta + extrasTotal,
    details: [
      'Расчёт учитывает тип кузова и объём оклейки.',
      'Подготовка кузова добавляется отдельно в зависимости от состояния ЛКП.',
      'Дополнительные услуги включены в итоговый диапазон.',
    ],
  };
};

export const formatPrice = (value: number): string =>
  new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(value);
