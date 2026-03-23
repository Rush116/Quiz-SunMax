import { contacts } from '../data/content';

export const FormSection = (): string => `
<section class="panel form-panel" id="contact">
  <div class="section-heading compact">
    <span class="eyebrow">Следующий шаг</span>
    <h2>Оставьте заявку и получите точный расчёт после осмотра автомобиля</h2>
    <p>Мы свяжемся удобным способом, уточним модель, состояние кузова и предложим лучшее окно записи в ${contacts.city}.</p>
  </div>
  <form id="lead-form" class="lead-form">
    <label>
      <span>Имя</span>
      <input name="name" type="text" placeholder="Ваше имя" required />
    </label>
    <label>
      <span>Телефон / WhatsApp / Telegram</span>
      <input name="contact" type="text" placeholder="+7 / @username / WhatsApp" required />
    </label>
    <label>
      <span>Комментарий</span>
      <textarea name="comment" rows="4" placeholder="Например: BMW X5, нужен полный кузов и бронь фар"></textarea>
    </label>
    <div class="form-actions">
      <button type="submit" class="button button-primary">Получить расчёт</button>
      <a class="button button-secondary" href="${contacts.whatsapp}" target="_blank" rel="noreferrer">Написать в WhatsApp</a>
      <a class="button button-ghost" href="${contacts.callLink}">Позвонить</a>
    </div>
    <div id="form-success" class="success-state hidden">
      <strong>Заявка отправлена.</strong>
      <p>Мы получили ваши данные и свяжемся с вами в ближайшее время для точного расчёта и записи.</p>
    </div>
  </form>
</section>`;
