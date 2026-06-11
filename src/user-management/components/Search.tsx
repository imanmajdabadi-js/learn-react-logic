import { useState } from 'react';
import DropDown from './DropDown';
import { SelectRoleUsers, SelectTypeUsers } from './DropDownItems';

interface Props {
  searchEmail: string;
  onClick: (inputValue: string, typeSelect: string, roleSelect: string) => void;
  selectedUserType: string;
  selectedRole: string;
}

const Search = ({ onClick }: Props) => {
  const [text, setText] = useState<string>('');

  const [selectedUserType, setSelectedUserType] = useState<string>('');

  const [selectedRole, setSelectedRole] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    onClick(text, selectedUserType, selectedRole);
  };

  const handleSelectRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(e.target.value);
  };

  const handleSelecType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserType(e.target.value);
  };

  return (
    <div className="flex items-center gap-2">
      <DropDown
        value={selectedUserType}
        onSelect={handleSelecType}
        titleLabel="SelectTypeUser"
        dropDown={SelectTypeUsers}
      />

      <DropDown
        value={selectedRole}
        onSelect={handleSelectRole}
        titleLabel="SelectRoleUser"
        dropDown={SelectRoleUsers}
      />
      <div className="flex items-center gap-2">
        <label htmlFor="">Email:</label>
        <input
          className="border rounded-md text-center"
          value={text}
          onChange={handleInputChange}
          type="text"
        />
        <button
          onClick={handleButtonClick}
          className="px-2 py-1 rounded-md bg-violet-700 text-white text-sm"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;
