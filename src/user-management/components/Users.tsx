import { useConfirm } from '@omit/react-confirm-dialog';
import { useReducer } from 'react';
import { initialStateUsers, userReducer } from '../../reducers/UserReducer';
import UserTable from './UserTable';

const Users = () => {
  const [users, dispatch] = useReducer(userReducer, initialStateUsers);

  const handleEdit = (userId: string) => {
    dispatch({
      type: 'SELECT_USER',
      id: userId,
    });
  };

  const handleAddRow = () => {
    dispatch({
      type: 'ADD_USER',
    });
  };

  const handleCancel = (userId: string) => {
    dispatch({
      type: 'CANCEL_CLICk',
      id: userId,
    });
  };

  const handleClick = (userId: string) => {
    dispatch({
      type: 'SELECT_USER',
      id: userId,
    });
  };

  const handleSave = (
    userId: string,
    checkedIsAdmin: boolean,
    checkedIsVip: boolean,
    name: string,
    email: string,
    note: string
  ) => {
    dispatch({
      type: 'SAVE_CLICK',
      id: userId,
      email: email,
      name: name,
      note: note,
      isAdmin: checkedIsAdmin,
      isVip: checkedIsVip,
    });
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
      dispatch({
        type: 'DELETE_USER',
        id: userId,
      });
    }
  };
  return (
    <UserTable
      onAddRow={handleAddRow}
      onClick={handleClick}
      users={users.users}
      selectedUserId={users.selectedUserId}
      onSave={handleSave}
      onCancel={handleCancel}
      onDelete={handleDeleteUser}
      onEdit={handleEdit}
    />
  );
};

export default Users;
