import type { UserFilters } from '../utils/filterUsers';

export const defaultFilters: UserFilters = {
  email: '',
  note: '',
  role: 'All',
  type: 'All',
};

export interface FormAction {
  type: 'CHANGE_INPUT';
  field: keyof UserFilters;
  value: string;
}

export function formSearchReducer(state: UserFilters, action: FormAction) {
  switch (action.type) {
    case 'CHANGE_INPUT':
      return {
        ...state,
        [action.field]: action.value,
      };

    default: {
      return state;
    }
  }
}
