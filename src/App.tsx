import { useMemo, useState, type FormEvent } from 'react';
import { OptionCard } from './components/OptionCard';
import { ProgressBar } from './components/ProgressBar';
import {
  addOnOptions,
  estimateTotal,
  formatCurrency,
  packageOptions,
  type AddOnId,
  type PackageId,
  type VehicleSize,
  vehicleSizes,
} from './data/pricing';

const totalSteps = 4;

type LeadFormState = {
  fullName: string;
  email: string;
  phone: string;
  vehicle: string;
};

const defaultLeadForm: LeadFormState = {
  fullName: '',
  email: '',
  phone: '',
  vehicle: '',
};

export default function App() {
  const [step, setStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState<PackageId>('track-pack');
  const [selectedSize, setSelectedSize] = useState<VehicleSize>('sedan');
  const [selectedAddOns, setSelectedAddOns] = useState<AddOnId[]>(['ceramic-topcoat']);
  const [leadForm, setLeadForm] = useState<LeadFormState>(defaultLeadForm);
  const [submitted, setSubmitted] = useState(false);

  const estimate = useMemo(
    () => estimateTotal(selectedPackage, selectedSize, selectedAddOns),
    [selectedAddOns, selectedPackage, selectedSize],
  );

  const selectedPackageDetails = packageOptions.find((item) => item.id === selectedPackage)!;
  const selectedSizeDetails = vehicleSizes.find((item) => item.id === selectedSize)!;

  const toggleAddOn = (addOnId: AddOnId) => {
    setSelectedAddOns((current) =>
      current.includes(addOnId)
        ? current.filter((item) => item !== addOnId)
        : [...current, addOnId],
    );
  };

  const nextStep = () => setStep((current) => Math.min(totalSteps, current + 1));
  const previousStep = () => setStep((current) => Math.max(1, current - 1));

  const submitLead = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <section className="mx-auto grid min-h-screen max-w-7xl gap-10 px-6 py-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:py-12">
        <div className="flex flex-col justify-between rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur xl:p-10">
          <div className="space-y-8">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
              SunMax Studio · Premium PPF
            </div>

            <div className="space-y-5">
              <h1 className="max-w-xl text-4xl font-semibold leading-tight md:text-6xl">
                Protect your paint with a tailored PPF package in under 60 seconds.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-zinc-300 md:text-lg">
                Walk through our concierge-style quiz to preview pricing, compare coverage
                levels, and send your details for a same-day consultation.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {[
                ['Precision-cut film', 'Self-healing, gloss-enhancing finish.'],
                ['Certified installers', 'Studio delivery standards with white-glove care.'],
                ['Fast turnaround', 'Most installs completed within 1–2 days.'],
              ].map(([title, copy]) => (
                <div key={title} className="rounded-3xl border border-white/10 bg-black/20 p-5">
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">{copy}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 rounded-[1.75rem] border border-white/10 bg-black/30 p-6">
            <ProgressBar currentStep={step} totalSteps={totalSteps} />

            <div className="mt-6 space-y-5">
              {step === 1 ? (
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">Choose your protection level</h2>
                  <div className="grid gap-4">
                    {packageOptions.map((option) => (
                      <OptionCard
                        key={option.id}
                        title={option.name}
                        description={option.description}
                        meta={formatCurrency(option.basePrice)}
                        selected={selectedPackage === option.id}
                        onClick={() => setSelectedPackage(option.id)}
                      />
                    ))}
                  </div>
                </div>
              ) : null}

              {step === 2 ? (
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">What do you drive?</h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    {vehicleSizes.map((option) => (
                      <OptionCard
                        key={option.id}
                        title={option.label}
                        description={`Multiplier ${option.multiplier.toFixed(
                          2,
                        )}x based on prep time and film usage.`}
                        selected={selectedSize === option.id}
                        onClick={() => setSelectedSize(option.id)}
                      />
                    ))}
                  </div>
                </div>
              ) : null}

              {step === 3 ? (
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">Add premium upgrades</h2>
                  <div className="grid gap-4">
                    {addOnOptions.map((option) => (
                      <OptionCard
                        key={option.id}
                        title={option.name}
                        description="Optional upgrade selected during your studio consultation."
                        meta={formatCurrency(option.price)}
                        selected={selectedAddOns.includes(option.id)}
                        onClick={() => toggleAddOn(option.id)}
                      />
                    ))}
                  </div>
                </div>
              ) : null}

              {step === 4 ? (
                <div className="space-y-5">
                  <div>
                    <h2 className="text-2xl font-semibold">Get your tailored estimate</h2>
                    <p className="mt-2 text-sm leading-6 text-zinc-300">
                      Share your contact details and preferred vehicle so our team can confirm
                      exact fitment, film availability, and installation timing.
                    </p>
                  </div>

                  <form className="grid gap-4 md:grid-cols-2" onSubmit={submitLead}>
                    <input
                      required
                      value={leadForm.fullName}
                      onChange={(event) =>
                        setLeadForm((current) => ({ ...current, fullName: event.target.value }))
                      }
                      placeholder="Full name"
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-zinc-500"
                    />
                    <input
                      required
                      type="email"
                      value={leadForm.email}
                      onChange={(event) =>
                        setLeadForm((current) => ({ ...current, email: event.target.value }))
                      }
                      placeholder="Email address"
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-zinc-500"
                    />
                    <input
                      required
                      value={leadForm.phone}
                      onChange={(event) =>
                        setLeadForm((current) => ({ ...current, phone: event.target.value }))
                      }
                      placeholder="Phone number"
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-zinc-500"
                    />
                    <input
                      required
                      value={leadForm.vehicle}
                      onChange={(event) =>
                        setLeadForm((current) => ({ ...current, vehicle: event.target.value }))
                      }
                      placeholder="Vehicle year / make / model"
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-zinc-500"
                    />
                    <button
                      type="submit"
                      className="rounded-2xl bg-amber-300 px-5 py-3 font-semibold text-black transition hover:brightness-110 md:col-span-2"
                    >
                      Request consultation
                    </button>
                  </form>

                  {submitted ? (
                    <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
                      Thanks! We&apos;ll reach out shortly with your confirmed SunMax quote.
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={previousStep}
                disabled={step === 1}
                className="rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white transition hover:border-white/40 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Back
              </button>

              {step < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
                >
                  Continue
                </button>
              ) : null}
            </div>
          </div>
        </div>

        <aside className="flex flex-col gap-6 rounded-[2rem] border border-white/10 bg-black/30 p-8 backdrop-blur xl:p-10">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">Live estimate</p>
            <div className="mt-4 text-5xl font-semibold text-white">
              {formatCurrency(estimate)}
            </div>
            <p className="mt-3 max-w-md text-sm leading-6 text-zinc-400">
              This working estimate updates from configurable package, vehicle, and add-on
              pricing data.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Your build</h3>
              <span className="rounded-full bg-amber-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
                Ready to book
              </span>
            </div>

            <dl className="mt-6 space-y-4 text-sm text-zinc-300">
              <div className="flex items-start justify-between gap-6 border-b border-white/10 pb-4">
                <dt>Coverage package</dt>
                <dd className="text-right font-medium text-white">
                  {selectedPackageDetails.name}
                </dd>
              </div>

              <div className="flex items-start justify-between gap-6 border-b border-white/10 pb-4">
                <dt>Vehicle profile</dt>
                <dd className="text-right font-medium text-white">
                  {selectedSizeDetails.label}
                </dd>
              </div>

              <div className="flex items-start justify-between gap-6 border-b border-white/10 pb-4">
                <dt>Add-ons</dt>
                <dd className="text-right font-medium text-white">
                  {selectedAddOns.length
                    ? selectedAddOns
                        .map((addOnId) => addOnOptions.find((item) => item.id === addOnId)?.name)
                        .filter(Boolean)
                        .join(', ')
                    : 'No add-ons'}
                </dd>
              </div>

              <div className="flex items-start justify-between gap-6">
                <dt>Indicative turnaround</dt>
                <dd className="text-right font-medium text-white">
                  {selectedPackage === 'full-body' ? '2 days' : '1 day'}
                </dd>
              </div>
            </dl>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-3">
            {[
              ['98%', 'Client satisfaction'],
              ['10yr', 'Manufacturer-backed film warranty'],
              ['250+', 'Premium installs completed'],
            ].map(([value, label]) => (
              <div key={label} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="text-3xl font-semibold text-white">{value}</div>
                <div className="mt-2 text-sm text-zinc-400">{label}</div>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}