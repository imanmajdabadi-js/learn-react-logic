import { useState } from 'react';
import type { UserType } from '../types';
import DropDown from './DropDown';
import { dropDownItems } from './DropDownItems';
import User from './User';

interface Props {
  users: UserType[];
  onCancel: () => void;
  onSave: (userId: string, checkedIsAdmin: boolean, checkedIsVip: boolean) => void;
  onEdit: (userId: string) => void;
  selectedUserId: string | null;
  onDelete: (userId: string) => void;
}
const VipRenderUsers = ({ users, onCancel, onSave, onEdit, selectedUserId, onDelete }: Props) => {
  const [selectedDropValue, setSelectedDropValue] = useState<string>('');
  const vipUsers = users.filter((user) => user.isVip);
  const normalUsers = users.filter((user) => !user.isVip);
  const newUsers = [...vipUsers, ...normalUsers];

  const newArr = [...users].sort((a, b) => {
    if (a.isVip === b.isVip) {
      return 0;
    } else if (a.isVip) {
      return -1;
    } else {
      return 1;
    }
  });
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDropValue(e.target.value);
  };

  function userRender(condition: string): UserType[] {
    if (condition === '' || condition === 'All') {
      return newUsers;
    } else if (condition === 'Vip') {
      return vipUsers;
    } else if (condition === 'Normal') {
      return normalUsers;
    } else {
      return users;
    }
  }

  const newRenderUser = userRender(selectedDropValue);

  return (
    <>
      <DropDown
        selectedDropDownValue={selectedDropValue}
        onSelect={handleSelect}
        dropDown={dropDownItems}
      />
      <table className="border w-3xl table-fixed">
        <thead>
          <tr className="border">
            <th className="p-2 border-r"></th>
            <th className="p-2 w-20 border-r">Row</th>
            <th className="border-r p-2">Vip</th>
            <th className="border-r p-2">Name</th>
            <th className="border-r p-2 w-48">Email</th>
            <th className="border-r p-2">IsAdmin</th>
            <th className="w-48 p-2 border-r">Actions</th>
          </tr>
        </thead>
        <tbody>
          {newRenderUser.map((user, index) => {
            return (
              <User
                index={index + 1}
                onCancel={onCancel}
                onSave={onSave}
                onEdit={onEdit}
                isEditing={user.id === selectedUserId}
                onDelete={onDelete}
                key={user.id}
                user={user}
              />
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default VipRenderUsers;
