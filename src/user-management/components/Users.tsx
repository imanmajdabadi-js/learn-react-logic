import { useConfirm } from '@omit/react-confirm-dialog';
import { useState } from 'react';
import type { UserType } from '../types';
import { InitialState } from './InitialState';
import VipRenderUsers from './VipRenderUsers';

const Users = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [users, setUsers] = useState<UserType[]>(InitialState);

  const handleEdit = (userId: string) => {
    setSelectedUserId(userId);
  };

  const handleCancel = () => {
    setSelectedUserId(null);
  };

  const handleSave = (userId: string, checkedIsAdmin: boolean, checkedIsVip: boolean) => {
    setUsers((prev) => {
      return prev.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            isAdmin: checkedIsAdmin,
            isVip: checkedIsVip,
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
    <VipRenderUsers
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
