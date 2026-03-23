import { infoCards } from '../data/content';

export const InfoSection = (): string => `
<section class="info-block" id="about">
  <div class="section-heading">
    <span class="eyebrow">Почему это работает</span>
    <h2>Защита, которая сохраняет вид автомобиля и снижает будущие расходы</h2>
  </div>
  <div class="info-grid">
    ${infoCards.map((card) => `
      <article class="panel info-card">
        <h3>${card.title}</h3>
        <p>${card.text}</p>
      </article>`).join('')}
  </div>
</section>`;
