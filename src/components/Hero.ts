import { heroBenefits } from '../data/content';

export const Hero = (): string => `
<section class="hero panel glow">
  <div class="hero-copy">
    <span class="eyebrow">SunMax Premium Protection</span>
    <h1>Оклейка автомобиля полиуретановой плёнкой с расчётом стоимости за 1 минуту</h1>
    <p class="lead">Покажем ориентир по бюджету, подберём пакет защиты и запишем вас в студию без лишних звонков и сложных форм.</p>
    <div class="benefits">
      ${heroBenefits.map((benefit) => `<div class="benefit-card"><span class="benefit-dot"></span><p>${benefit}</p></div>`).join('')}
    </div>
    <button class="button button-primary" data-scroll-to="quiz">Рассчитать стоимость</button>
  </div>
  <div class="hero-aside">
    <div class="stat-card">
      <strong>от 55 000 ₽</strong>
      <span>локальная защита ударных зон</span>
    </div>
    <div class="stat-card dark">
      <strong>до 10 лет</strong>
      <span>ресурс качественной полиуретановой плёнки</span>
    </div>
  </div>
</section>`;
