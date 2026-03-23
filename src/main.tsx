import { App } from './App';
import { calculateEstimate, formatPrice } from './data/pricing';
import { type ExtraService, type QuizAnswers, quizSteps } from './data/quiz';

const appRoot = document.querySelector<HTMLDivElement>('#app');

if (!appRoot) {
  throw new Error('Root element #app not found');
}

appRoot.innerHTML = App();

const state: QuizAnswers = {
  extras: [],
};

let currentStep = 0;

const progressText = document.querySelector<HTMLSpanElement>('#progress-text');
const progressBar = document.querySelector<HTMLDivElement>('#progress-bar');
const stepContainer = document.querySelector<HTMLDivElement>('#quiz-step');
const nextButton = document.querySelector<HTMLButtonElement>('#next-button');
const backButton = document.querySelector<HTMLButtonElement>('#back-button');
const estimatePlaceholder = document.querySelector<HTMLDivElement>('#estimate-placeholder');
const estimateResult = document.querySelector<HTMLDivElement>('#estimate-result');
const leadForm = document.querySelector<HTMLFormElement>('#lead-form');
const formSuccess = document.querySelector<HTMLDivElement>('#form-success');

const isStepComplete = (stepIndex: number): boolean => {
  const step = quizSteps[stepIndex];
  const value = state[step.key];

  if (step.multi) {
    return Array.isArray(value) && value.length > 0;
  }

  return typeof value === 'string' && value.length > 0;
};

const updateEstimate = (): void => {
  if (!state.bodyType || !state.protection || !state.condition) {
    if (estimatePlaceholder) estimatePlaceholder.classList.remove('hidden');
    if (estimateResult) estimateResult.innerHTML = '';
    return;
  }

  const estimate = calculateEstimate(state);
  if (estimatePlaceholder) estimatePlaceholder.classList.add('hidden');
  if (estimateResult) {
    estimateResult.innerHTML = `
      <div class="estimate-card">
        <strong>${formatPrice(estimate.min)} — ${formatPrice(estimate.max)}</strong>
        <p>Точная цена зависит от осмотра автомобиля, выбранной плёнки, состояния ЛКП и геометрии конкретной модели.</p>
        <ul>
          ${estimate.details.map((detail) => `<li>${detail}</li>`).join('')}
        </ul>
      </div>`;
  }
};

const renderStep = (): void => {
  if (!stepContainer || !progressText || !progressBar || !nextButton || !backButton) return;

  const step = quizSteps[currentStep];
  const value = state[step.key];
  const progress = ((currentStep + 1) / quizSteps.length) * 100;

  progressText.textContent = `Шаг ${currentStep + 1} из ${quizSteps.length}`;
  progressBar.style.width = `${progress}%`;

  stepContainer.innerHTML = `
    <div class="step-content fade-in">
      <div class="step-heading">
        <h3>${step.title}</h3>
        <p>${step.description}</p>
      </div>
      <div class="options-grid ${step.multi ? 'multi-grid' : ''}">
        ${step.options.map((option) => {
          const selected = step.multi
            ? Array.isArray(value) && value.includes(option.value as ExtraService)
            : value === option.value;

          return `
            <button class="option-card ${selected ? 'selected' : ''}" type="button" data-value="${option.value}">
              <strong>${option.label}</strong>
              <span>${option.hint}</span>
            </button>`;
        }).join('')}
      </div>
    </div>`;

  backButton.disabled = currentStep === 0;
  nextButton.disabled = !isStepComplete(currentStep);
  nextButton.textContent = currentStep === quizSteps.length - 1 ? 'Показать расчёт' : 'Далее';

  stepContainer.querySelectorAll<HTMLButtonElement>('[data-value]').forEach((button) => {
    button.addEventListener('click', () => {
      const selectedValue = button.dataset.value;
      if (!selectedValue) return;

      if (step.multi) {
        const extras = new Set(state.extras);
        if (selectedValue === 'none') {
          state.extras = ['none'];
        } else {
          extras.delete('none');
          if (extras.has(selectedValue as ExtraService)) {
            extras.delete(selectedValue as ExtraService);
          } else {
            extras.add(selectedValue as ExtraService);
          }
          state.extras = Array.from(extras);
        }
      } else {
        state[step.key] = selectedValue as never;
      }

      renderStep();
      updateEstimate();
    });
  });
};

nextButton?.addEventListener('click', () => {
  if (!isStepComplete(currentStep)) return;
  if (currentStep < quizSteps.length - 1) {
    currentStep += 1;
    renderStep();
    return;
  }

  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  updateEstimate();
});

backButton?.addEventListener('click', () => {
  if (currentStep === 0) return;
  currentStep -= 1;
  renderStep();
});

document.querySelectorAll<HTMLElement>('[data-scroll-to]').forEach((button) => {
  button.addEventListener('click', () => {
    const targetId = button.dataset.scrollTo;
    if (!targetId) return;
    document.querySelector(`#${targetId}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

leadForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  leadForm.reset();
  formSuccess?.classList.remove('hidden');
});

renderStep();
updateEstimate();
