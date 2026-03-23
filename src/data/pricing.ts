export type PackageId = 'full-front' | 'track-pack' | 'full-body';
export type VehicleSize = 'coupe' | 'sedan' | 'suv' | 'truck';
export type AddOnId = 'ceramic-topcoat' | 'interior-protection' | 'windshield-film';

export interface PackageOption {
  id: PackageId;
  name: string;
  description: string;
  basePrice: number;
}

export interface SizeMultiplier {
  id: VehicleSize;
  label: string;
  multiplier: number;
}

export interface AddOnOption {
  id: AddOnId;
  name: string;
  price: number;
}

export const packageOptions: PackageOption[] = [
  {
    id: 'full-front',
    name: 'Full Front',
    description: 'Full hood, bumper, fenders, mirrors, and headlights.',
    basePrice: 1895,
  },
  {
    id: 'track-pack',
    name: 'Track Pack',
    description: 'Full front protection plus rocker panels and impact zones.',
    basePrice: 2495,
  },
  {
    id: 'full-body',
    name: 'Full Body',
    description: 'Complete premium coverage for a showroom-level finish.',
    basePrice: 5495,
  },
];

export const vehicleSizes: SizeMultiplier[] = [
  { id: 'coupe', label: 'Coupe / Compact', multiplier: 1 },
  { id: 'sedan', label: 'Sedan', multiplier: 1.08 },
  { id: 'suv', label: 'SUV / Crossover', multiplier: 1.18 },
  { id: 'truck', label: 'Truck / Large SUV', multiplier: 1.3 },
];

export const addOnOptions: AddOnOption[] = [
  { id: 'ceramic-topcoat', name: 'Ceramic topcoat', price: 495 },
  { id: 'interior-protection', name: 'Interior protection', price: 350 },
  { id: 'windshield-film', name: 'Windshield protection film', price: 425 },
];

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);

export const estimateTotal = (
  packageId: PackageId,
  vehicleSize: VehicleSize,
  addOns: AddOnId[],
) => {
  const selectedPackage = packageOptions.find((item) => item.id === packageId)!;
  const selectedSize = vehicleSizes.find((item) => item.id === vehicleSize)!;
  const addOnTotal = addOns.reduce((sum, addOnId) => {
    const option = addOnOptions.find((item) => item.id === addOnId);
    return sum + (option?.price ?? 0);
  }, 0);

  return Math.round(selectedPackage.basePrice * selectedSize.multiplier + addOnTotal);
};
