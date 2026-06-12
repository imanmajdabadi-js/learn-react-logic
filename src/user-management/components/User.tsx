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
  onSave: (userId: string, checkedIsAdmin: boolean, checkedIsVip: boolean) => void;
  onCancel: () => void;
  index?: number;
}
const User = ({ user, onDelete, onEdit, isEditing, onSave, onCancel, index }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [checkedIsVip, setCheckedIsVip] = useState<boolean>(user.isVip);
  const [checkedIsAdmin, setCheckedIsAdmin] = useState<boolean>(user.isAdmin);

  const handleChangeIsAdmin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setCheckedIsAdmin(checked);
  };

  const handleChangeIsVip = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setCheckedIsVip(checked);
  };

  const handleCancel = () => {
    setCheckedIsVip(user.isVip);
    setCheckedIsAdmin(user.isAdmin);
    onCancel();
  };

  const toggleOpen = () => {
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

  function checkedVipUsers() {
    if (!isEditing) {
      return <td className="border-r text-sm">{vipUsers()}</td>;
    } else {
      return (
        <td className="border-r p-2 text-sm">
          <input
            onChange={handleChangeIsVip}
            checked={isEditing ? checkedIsVip : user.isVip}
            type="checkbox"
          />
        </td>
      );
    }
  }

  function checkedAdminUsers() {
    if (!isEditing) {
      return <td className="border-r text-sm">{user.isAdmin ? 'Admin' : 'User'}</td>;
    } else {
      return (
        <td className="border-r p-2">
          <input
            onChange={handleChangeIsAdmin}
            checked={isEditing ? checkedIsAdmin : user.isAdmin}
            type="checkbox"
          />
        </td>
      );
    }
  }

  function editingMode() {
    if (!isEditing) {
      return (
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
      );
    } else {
      return (
        <div className="flex items-center gap-4 justify-center ">
          <button
            onClick={handleCancel}
            className="px-4 bg-blue-400 rounded-md text-sm py-1 text-white cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(user.id, checkedIsAdmin, checkedIsVip)}
            className="px-4 bg-violet-700 rounded-md text-sm py-1 text-white cursor-pointer"
          >
            Save
          </button>
        </div>
      );
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
  return (
    <>
      <tr className="text-center border!">
        <td className="p-2 border-r">{openCloseNoteCell()}</td>
        <td className="p-1 border-r">{index}</td>
        {checkedVipUsers()}
        <td className="border-r p-2 text-sm">{user.name}</td>
        <td className="border-r text-sm p-2 w-48">{user.email}</td>
        {checkedAdminUsers()}
        <td className="w-48 text-sm p-2">{editingMode()}</td>
      </tr>
      {showUsersHaseNote()}
    </>
  );
};

export default User;
