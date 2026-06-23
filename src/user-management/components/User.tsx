import React, { useReducer, useState } from 'react';
import { FaStar } from 'react-icons/fa6';
import { FiUser } from 'react-icons/fi';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { changeInputs, createInitialEditState } from '../../reducers/ChangeFieldReducer';
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
    email: string,
    note: string
  ) => void;
  onCancel: (userId: string) => void;
  index?: number;
  selectedUserId: string | null;
  onClick: (userId: string) => void;
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

  const [editState, dispatch] = useReducer(changeInputs, createInitialEditState(user));

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'CHANGE_INPUT',
      field: 'note',
      value: e.target.value,
    });
  };

  const handleChangeIsAdmin = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'CHANGE_INPUT',
      field: 'isAdmin',
      value: e.target.value,
    });
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'CHANGE_INPUT',
      field: 'email',
      value: e.target.value,
    });
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'CHANGE_INPUT',
      field: 'name',
      value: e.target.value,
    });
  };

  const handleChangeIsVip = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'CHANGE_INPUT',
      field: 'isVip',
      value: e.target.value,
    });
  };

  const handleCancel = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onCancel(user.id);
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
    onClick(user.id);
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
              checked={isEditing ? editState.draftUser.isVip : user.isVip}
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
              value={editState.draftUser.name}
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
              value={editState.draftUser.email}
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
              checked={isEditing ? editState.draftUser.isAdmin : user.isAdmin}
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
                  onSave(
                    user.id,
                    editState.draftUser.isAdmin,
                    editState.draftUser.isVip,
                    editState.draftUser.name,
                    editState.draftUser.email,
                    editState.draftUser.note!
                  )
                }
                className="px-4 bg-violet-700 rounded-md text-sm py-1 text-white cursor-pointer"
              >
                Save
              </button>
            </div>
          )}
        </td>
      </tr>
      {!isEditing ? (
        showUsersHaseNote()
      ) : (
        <tr>
          <td colSpan={7}>
            <input
              value={editState.draftUser.note}
              onChange={handleNoteChange}
              className="rounded-md text-center border w-full p-2 "
              type="text"
            />
          </td>
        </tr>
      )}
    </>
  );
};

export default React.memo(User);
