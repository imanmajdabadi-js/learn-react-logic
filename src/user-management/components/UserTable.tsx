import { useState } from 'react';
import type { UserType } from '../types';
import Search from './Search';
import User from './User';

interface Props {
  users: UserType[];
  onCancel: () => void;
  onSave: (userId: string, checkedIsAdmin: boolean, checkedIsVip: boolean) => void;
  onEdit: (userId: string) => void;
  selectedUserId: string | null;
  onDelete: (userId: string) => void;
}
const UserTable = ({ users, onCancel, onSave, onEdit, selectedUserId, onDelete }: Props) => {
  const [searchNote, setSearchNote] = useState<string>('');

  const [searchEmailInput, setSearchEmailInput] = useState<string>('');

  const [selectedUserType, setSelectedUserType] = useState<string>('');

  const [selectedRole, setSelectedRole] = useState<string>('');

  const vipUsers = users.filter((user) => user.isVip);

  const normalUsers = users.filter((user) => !user.isVip);

  const newUsers = [...vipUsers, ...normalUsers];

  // const newArr = [...users].sort((a, b) => {
  //   if (a.isVip === b.isVip) {
  //     return 0;
  //   } else if (a.isVip) {
  //     return -1;
  //   } else {
  //     return 1;
  //   }
  // });

  const handleButtonSearch = (
    searchEmail: string,
    typeSelect: string,
    roleSelect: string,
    searchNote: string
  ) => {
    setSearchEmailInput(searchEmail);
    setSelectedRole(roleSelect);
    setSelectedUserType(typeSelect);
    setSearchNote(searchNote);
  };

  function search(type: string, searchEmail: string, role: string, searchNote: string): UserType[] {
    let searchResult = newUsers.filter((user) =>
      user.email.toLowerCase().includes(searchEmail.toLowerCase())
    );

    if (searchNote) {
      searchResult = searchResult.filter((user) =>
        user.note?.toLowerCase().includes(searchNote.toLowerCase())
      );
    }

    if (type === 'Vip') {
      searchResult = searchResult.filter((user) => user.isVip);
    } else if (type === 'Normal') {
      searchResult = searchResult.filter((user) => !user.isVip);
    }

    if (role === 'Admin') {
      searchResult = searchResult.filter((user) => user.isAdmin);
    } else if (role === 'User') {
      searchResult = searchResult.filter((user) => !user.isAdmin);
    }

    return searchResult;
  }
  const usersToDisplay = search(selectedUserType, searchEmailInput, selectedRole, searchNote);

  return (
    <>
      <div className="flex items-center gap-4">
        <Search
          selectedRole={selectedRole}
          selectedUserType={selectedUserType}
          onClick={handleButtonSearch}
          searchEmail={searchEmailInput}
        />
      </div>
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
          {usersToDisplay.map((user, index) => {
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

export default UserTable;
