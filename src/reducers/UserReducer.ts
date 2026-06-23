import { initialUsers } from '../user-management/components/InitialState';
import type { UserType } from '../user-management/types';

export interface InitialUserState {
  users: UserType[];
  selectedUserId: string | null;
}

export const initialStateUsers: InitialUserState = {
  users: initialUsers,
  selectedUserId: null,
};

export interface AddUser {
  type: 'ADD_USER';
}

export interface SaveAction {
  type: 'SAVE_CLICK';
  id: string;
  name: string;
  email: string;
  note: string;
  isAdmin: boolean;
  isVip: boolean;
}

export interface UserAction {
  type: 'DELETE_USER' | 'SELECT_USER' | 'CANCEL_CLICk';
  id: string;
}

export type AllUserActions = SaveAction | UserAction | AddUser;

export function userReducer(state: InitialUserState, action: AllUserActions) {
  switch (action.type) {
    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.id),
        selectedUserId: state.selectedUserId === action.id ? null : state.selectedUserId,
      };

    case 'SELECT_USER':
      return {
        ...state,
        selectedUserId: action.id,
      };

    case 'CANCEL_CLICk': {
      const selectedUser = state.users.find((user) => user.id === action.id);
      if (selectedUser?.email === '' && selectedUser?.name === '') {
        const usersTemp = state.users.filter((user) => user.id !== action.id);
        return {
          ...state,
          users: usersTemp,
          selectedUserId: null,
        };
      }
      return {
        ...state,
        selectedUserId: null,
      };
    }

    case 'SAVE_CLICK': {
      if (action.name === '' || action.email === '') {
        return {
          ...state,
          selectedUserId: action.id,
        };
      }
      const updatedUsers = state.users.map((user) => {
        if (user.id === action.id) {
          return {
            ...user,
            isAdmin: action.isAdmin,
            isVip: action.isVip,
            name: action.name,
            email: action.email,
            note: action.note,
          };
        } else {
          return user;
        }
      });
      return {
        ...state,
        users: updatedUsers,
        selectedUserId: null,
      };
    }

    case 'ADD_USER': {
      const newUser: UserType = {
        email: '',
        id: crypto.randomUUID(),
        isAdmin: false,
        isVip: false,
        name: '',
        note: '',
      };
      return {
        ...state,
        users: [...state.users, newUser],
        selectedUserId: newUser.id,
      };
    }

    default: {
      return state;
    }
  }
}
