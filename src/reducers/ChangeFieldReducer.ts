import type { UserType } from '../user-management/types';

export function createInitialEditState(user: UserType) {
  return {
    draftUser: {
      id: user.id,
      name: user.name,
      email: user.email,
      isVip: user.isVip,
      isAdmin: user.isAdmin,
      note: user.note,
    },
  };
}

type UserKeys = keyof UserType;

export interface EditUserState {
  draftUser: UserType;
}

export interface ChangeInputAction {
  type: 'CHANGE_INPUT';
  field: UserKeys;
  value: string;
}

export function changeInputs(state: EditUserState, action: ChangeInputAction) {
  switch (action.type) {
    case 'CHANGE_INPUT': {
      return {
        ...state,
        draftUser: {
          ...state.draftUser,
          [action.field]: action.value,
        },
      };
    }
    default: {
      return state;
    }
  }
}
