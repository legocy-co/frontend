import cities from '../../../../data/cities.json';
import { SelectFieldOption } from '../../../shared/ui/form-adapters.tsx';

export const countryOptions: SelectFieldOption[] = [
  {
    value: '',
    label: 'Country',
  },
  ...[...new Set(cities.map((city) => city.country))].map((country) => ({
    label: country,
    value: country,
  })),
];

export const cityOptions = (country: string): SelectFieldOption[] => [
  { value: '', label: 'City' },
  ...cities
    .filter((city) => city.country === country)
    .map((city) => city.name)
    .sort()
    .map((city) => ({ label: city, value: city })),
];
