import { SelectFieldOption } from '../../shared/ui/form-adapters.tsx';

export const CONDITIONS: SelectFieldOption[] = [
  { value: '', label: 'Select condition' },
  { label: 'Brand New', value: 'BRAND_NEW' },
  { label: 'Box Opened', value: 'BOX_OPENED' },
  { label: 'Bags Opened', value: 'BAGS_OPENED' },
  { label: 'Built With Box', value: 'BUILT_WITH_BOX' },
  { label: 'Built Without Box', value: 'BUILT_WITHOUT_BOX' },
  { label: 'Built, Pieces Lost', value: 'BUILT_PIECES_LOST' },
];
