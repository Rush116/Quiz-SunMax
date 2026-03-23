import { FormSection } from './components/FormSection';
import { Hero } from './components/Hero';
import { InfoSection } from './components/InfoSection';
import { QuizSection } from './components/QuizSection';
import { contacts } from './data/content';

export const App = (): string => `
<div class="page-shell">
  <header class="topbar">
    <div class="brand">
      <div class="brand-mark">S</div>
      <div>
        <strong>SunMax</strong>
        <span>Premium PPF Studio</span>
      </div>
    </div>
    <div class="topbar-meta">
      <span>${contacts.city}</span>
      <a href="${contacts.callLink}">${contacts.phone}</a>
    </div>
  </header>
  <main class="page-content">
    ${Hero()}
    ${QuizSection()}
    ${FormSection()}
    ${InfoSection()}
  </main>
</div>`;
