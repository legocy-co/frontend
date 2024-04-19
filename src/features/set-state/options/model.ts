import { SelectFieldOption } from '../../../shared/ui/form-adapters.tsx';
import { setStates } from '../../../types/MarketItemType.ts';

export const setStateOptions: SelectFieldOption[] = [
  {
    label: '',
    value: '',
  },
  ...Object.entries(setStates).map((state) => ({
    label: state[1],
    value: state[0],
  })),
];
