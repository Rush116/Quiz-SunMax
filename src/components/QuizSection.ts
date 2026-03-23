export const QuizSection = (): string => `
<section class="quiz-layout" id="quiz">
  <div class="panel quiz-panel">
    <div class="quiz-header">
      <div>
        <span class="eyebrow">Онлайн-квиз</span>
        <h2>Подберите пакет оклейки под ваш автомобиль</h2>
      </div>
      <div class="progress-meta">
        <span id="progress-text">Шаг 1 из 5</span>
        <div class="progress-track"><div id="progress-bar" class="progress-bar"></div></div>
      </div>
    </div>
    <div id="quiz-step"></div>
    <div class="quiz-actions">
      <button class="button button-secondary" id="back-button" type="button">Назад</button>
      <button class="button button-primary" id="next-button" type="button">Далее</button>
    </div>
  </div>
  <aside class="panel estimate-panel">
    <span class="eyebrow">Предварительная стоимость</span>
    <div id="estimate-placeholder" class="estimate-placeholder">
      Пройдите квиз, чтобы увидеть ориентир по стоимости и рекомендацию по пакету защиты.
    </div>
    <div id="estimate-result"></div>
  </aside>
</section>`;
