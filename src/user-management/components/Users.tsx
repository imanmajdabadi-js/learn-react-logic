import { useConfirm } from '@omit/react-confirm-dialog';
import { useState } from 'react';
import type { UserType } from '../types';
import { InitialState } from './InitialState';
import UserTable from './UserTable';

const Users = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [users, setUsers] = useState<UserType[]>(InitialState);

  const handleEdit = (userId: string) => {
    setSelectedUserId(userId);
  };

  const handleAddRow = () => {
    const newUser: UserType = {
      email: '',
      id: Date.now().toString(),
      isAdmin: false,
      isVip: false,
      name: '',
      note: '',
    };
    setSelectedUserId(newUser.id);
    setUsers([...users, newUser]);
  };

  const handleCancel = () => {
    setSelectedUserId(null);
  };

  const handleClick = (userId: string, e: React.ChangeEvent<HTMLElement>) => {
    e.stopPropagation();
    setSelectedUserId(userId);
  };

  const handleSave = (
    userId: string,
    checkedIsAdmin: boolean,
    checkedIsVip: boolean,
    name: string,
    email: string,
    note: string
  ) => {
    if (name === '' || email === '') {
      return;
    }
    setUsers((prev) => {
      return prev.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            isAdmin: checkedIsAdmin,
            isVip: checkedIsVip,
            email: email === '' ? user.email : email,
            name: name === '' ? user.name : name,
            note: note === '' ? user.note : note,
          };
        } else {
          return user;
        }
      });
    });

    setSelectedUserId(null);
  };

  const confirm = useConfirm();

  const handleDeleteUser = async (userId: string) => {
    const result = await confirm({
      title: 'Delete User',
      description: 'Are you sure?',
      cancelText: 'No',
      confirmText: 'Yes',
    });

    if (result) {
      setUsers((prev) => {
        return prev.filter((user) => user.id !== userId);
      });
    }
  };

  return (
    <UserTable
      onAddRow={handleAddRow}
      onClick={handleClick}
      users={users}
      selectedUserId={selectedUserId}
      onSave={handleSave}
      onCancel={handleCancel}
      onDelete={handleDeleteUser}
      onEdit={handleEdit}
    />
  );
};

export default Users;
