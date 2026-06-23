import { useCallback, useMemo, useState } from 'react';
import { FaSort } from 'react-icons/fa6';
import { defaultFilters, search, type UserFilters } from '../../utils/filterUsers';
import type { UserType } from '../types';
import Search from './Search';
import User from './User';

interface Props {
  users: UserType[];
  onCancel: (userId: string) => void;
  onSave: (
    userId: string,
    checkedIsAdmin: boolean,
    checkedIsVip: boolean,
    name: string,
    email: string,
    note: string
  ) => void;
  onEdit: (userId: string) => void;
  selectedUserId: string | null;
  onDelete: (userId: string) => void;
  onClick: (userId: string) => void;
  onAddRow: () => void;
}
const UserTable = ({
  users,
  onCancel,
  onSave,
  onEdit,
  selectedUserId,
  onDelete,
  onClick,
  onAddRow,
}: Props) => {
  const [filters, setFilters] = useState<UserFilters>(defaultFilters);

  const [sortByEmailEnabled, setSortByEmailEnabled] = useState<boolean>(false);

  const handleAddRow = () => {
    onAddRow();
  };
  const handleButtonSearch = (filters: UserFilters) => {
    setFilters(filters);
  };

  const handleSort = () => {
    setSortByEmailEnabled((prev) => !prev);
  };

  // function sort(array: UserType[]) {
  //   if (sortByEmailEnabled) {
  //     return [...array].sort((a, b) => {
  //       return a.email.localeCompare(b.email);
  //     });
  //   }
  //   return array;
  // }

  const sort = useCallback(
    (array: UserType[]) => {
      if (sortByEmailEnabled) {
        return [...array].sort((a, b) => {
          return a.email.localeCompare(b.email);
        });
      }
      return array;
    },
    [sortByEmailEnabled]
  );

  const usersToDisplay = useMemo(() => {
    const filterdSearch = search(users, filters);
    return sort(filterdSearch);
  }, [users, filters, sort]);

  return (
    <>
      <div className="flex items-center gap-4">
        <Search onClick={handleButtonSearch} />
      </div>
      <table className="border w-3xl table-fixed">
        <thead>
          <tr className="border">
            <th className="p-2 border-r"></th>
            <th className="p-2 w-20 border-r">Row</th>
            <th className="border-r p-2">Vip</th>
            <th className="border-r p-2">Name</th>
            <th className="border-r  w-48">
              Email <FaSort onClick={handleSort} size={18} />
            </th>
            <th className="border-r p-2">IsAdmin</th>
            <th className="w-48 p-2 border-r">Actions</th>
          </tr>
        </thead>
        <tbody>
          {usersToDisplay.map((user, index) => {
            return (
              <User
                onClick={onClick}
                selectedUserId={selectedUserId}
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
          <tr>
            <td>
              <button
                onClick={handleAddRow}
                className="cursor-pointer bg-blue-600 rounded-md py-1 px-6 text-white text-sm"
              >
                Add
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default UserTable;
