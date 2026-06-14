import { useState } from 'react';
import { FaStar } from 'react-icons/fa6';
import { FiUser } from 'react-icons/fi';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import type { UserType } from '../types';

interface Props {
  user: UserType;
  onDelete: (userId: string) => void;
  onEdit: (userId: string) => void;
  isEditing: boolean;
  onSave: (
    userId: string,
    checkedIsAdmin: boolean,
    checkedIsVip: boolean,
    name: string,
    email: string
  ) => void;
  onCancel: () => void;
  index?: number;
  selectedUserId: string | null;
  onClick: (userId: string, e: React.ChangeEvent<HTMLElement>) => void;
}
const User = ({
  user,
  onDelete,
  onEdit,
  isEditing,
  onSave,
  onCancel,
  index,
  selectedUserId,
  onClick,
}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [checkedIsVip, setCheckedIsVip] = useState<boolean>(user.isVip);

  const [checkedIsAdmin, setCheckedIsAdmin] = useState<boolean>(user.isAdmin);

  const [changeName, setChangeName] = useState<string>(user.name);

  const [changeEmail, setChangeEmil] = useState<string>(user.email);

  const handleChangeIsAdmin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setCheckedIsAdmin(checked);
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangeEmil(e.target.value);
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangeName(e.target.value);
  };

  const handleChangeIsVip = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setCheckedIsVip(checked);
  };

  const handleCancel = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCheckedIsVip(user.isVip);
    setCheckedIsAdmin(user.isAdmin);
    setChangeName(user.name);
    setChangeEmil(user.email);
    onCancel();
  };

  const toggleOpen = (e: React.MouseEvent<SVGAElement>) => {
    e.stopPropagation();
    if (user.note) {
      setIsOpen((prev) => !prev);
    }
  };

  function vipUsers() {
    if (user.isVip && user.isAdmin) {
      return (
        <div className="flex items-center gap-2 justify-center">
          <FaStar size={18} color="#FFD700" />
          <FaStar size={18} color="#FFD700" />
        </div>
      );
    } else if (user.isVip) {
      return <FaStar size={18} className="m-auto" color="#FFD700" />;
    } else {
      return <FiUser size={18} className="m-auto" />;
    }
  }

  function openCloseNoteCell() {
    if (isOpen) {
      return <IoIosArrowUp onClick={toggleOpen} className="mx-auto" size={18} />;
    } else {
      return <IoIosArrowDown onClick={toggleOpen} className="mx-auto" size={18} />;
    }
  }

  function showUsersHaseNote() {
    if (isOpen && user.note) {
      return (
        <tr>
          <td colSpan={7}>{user.note}</td>
        </tr>
      );
    }
  }

  const handleClickRow = (e: React.ChangeEvent<HTMLElement>) => {
    e.stopPropagation();
    onClick(user.id, e);
  };

  return (
    <>
      <tr
        onClick={() => handleClickRow}
        className={`text-center border! hover:bg-gray-300 ${user.id === selectedUserId ? 'bg-gray-300' : ''} `}
      >
        <td className="p-2 border-r">{openCloseNoteCell()}</td>
        <td className="p-1 border-r">{index}</td>
        {!isEditing ? (
          <td className="border-r text-sm">{vipUsers()}</td>
        ) : (
          <td className="border-r p-2 text-sm">
            <input
              onChange={handleChangeIsVip}
              checked={isEditing ? checkedIsVip : user.isVip}
              type="checkbox"
            />
          </td>
        )}
        {!isEditing ? (
          <td className="border-r p-2 text-sm">{user.name}</td>
        ) : (
          <td className="border-r p-2 text-sm ">
            <input
              autoFocus
              value={changeName}
              onChange={handleChangeName}
              className="rounded-md text-center  border w-16"
              type="text"
            />
          </td>
        )}

        {!isEditing ? (
          <td className="border-r p-2 text-sm">{user.email}</td>
        ) : (
          <td className="border-r p-2 text-sm">
            <input
              value={changeEmail}
              onChange={handleChangeEmail}
              className="rounded-md text-center border w-40 p-2"
              type="text"
            />
          </td>
        )}
        {!isEditing ? (
          <td className="border-r text-sm">{user.isAdmin ? 'Admin' : 'User'}</td>
        ) : (
          <td className="border-r p-2">
            <input
              onChange={handleChangeIsAdmin}
              checked={isEditing ? checkedIsAdmin : user.isAdmin}
              type="checkbox"
            />
          </td>
        )}
        <td className="w-48 text-sm p-2">
          {!isEditing ? (
            <div className="flex items-center gap-4 justify-center ">
              <button
                onClick={() => onDelete(user.id)}
                className="px-4 bg-red-600 rounded-md text-sm text-white py-1 cursor-pointer"
              >
                Delete
              </button>
              <button
                onClick={() => onEdit(user.id)}
                className="px-4 bg-green-700 rounded-md text-sm py-1 text-white cursor-pointer"
              >
                Edit
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4 justify-center ">
              <button
                onClick={handleCancel}
                className="px-4 bg-blue-400 rounded-md text-sm py-1 text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  onSave(user.id, checkedIsAdmin, checkedIsVip, changeName, changeEmail)
                }
                className="px-4 bg-violet-700 rounded-md text-sm py-1 text-white cursor-pointer"
              >
                Save
              </button>
            </div>
          )}
        </td>
      </tr>
      {showUsersHaseNote()}
    </>
  );
};

export default User;
