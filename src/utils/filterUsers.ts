import type { UserType } from '../user-management/types';

export interface UserFilters {
  type: 'Vip' | 'Normal' | 'All';
  role: 'Admin' | 'User' | 'All';
  note: string;
  email: string;
}

export const defaultFilters: UserFilters = {
  email: '',
  note: '',
  role: 'All',
  type: 'All',
};

export function search(users: UserType[], filters: UserFilters): UserType[] {
  const isAdmin = filters.role === 'Admin';
  const isVip = filters.type === 'Vip';
  return users.filter((user) => {
    const matchesRoles = filters.role === 'All' || user.isAdmin === isAdmin;
    const matchesTypes = filters.type === 'All' || user.isVip === isVip;
    const matchesNotes = (user.note ?? '').toLowerCase().includes(filters.note.toLowerCase());
    const matchesEmails = user.email.toLowerCase().includes(filters.email.toLowerCase());
    return matchesRoles && matchesTypes && matchesNotes && matchesEmails;
  });
}
