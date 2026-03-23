import type { ReactNode } from 'react';

interface OptionCardProps {
  title: string;
  description: string;
  meta?: string;
  selected: boolean;
  onClick: () => void;
  icon?: ReactNode;
}

export function OptionCard({ title, description, meta, selected, onClick, icon }: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-3xl border p-5 text-left transition duration-200 ${
        selected
          ? 'border-accent bg-accent/10 shadow-glow'
          : 'border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-3">
            {icon}
            <h3 className="text-lg font-semibold text-white">{title}</h3>
          </div>
          <p className="text-sm leading-6 text-zinc-300">{description}</p>
        </div>
        {meta ? <span className="text-sm font-medium text-accent">{meta}</span> : null}
      </div>
    </button>
  );
}
