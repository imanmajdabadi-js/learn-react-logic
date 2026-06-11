import { useState } from 'react';
import DropDown from './DropDown';
import { SelectRoleUsers, SelectTypeUsers } from './DropDownItems';

interface Props {
  onClick: (searchEmail: string, roleUser: string, type: string) => void;
  onSelectRole: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onSelectType: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedRole: string;
  selectType: string;
}

const Search = ({ onClick, onSelectRole, selectedRole, selectType, onSelectType }: Props) => {
  const [searchText, setSearchText] = useState<string>('');

  //   const [selectedRole, setSelectedRole] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  //   const handleSelectRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //     setSelectedRole(e.target.value);
  //   };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClick(searchText, selectedRole, selectType);
  };
  return (
    <div className="flex items-center gap-2">
      <DropDown
        value={selectedRole}
        titleLabel="SelectTypeUser"
        onSelect={onSelectRole}
        dropDown={SelectRoleUsers}
      />

      <DropDown
        value={selectType}
        titleLabel="SelectTypeUser"
        onSelect={onSelectType}
        dropDown={SelectTypeUsers}
      />
      <div className="flex items-center gap-2">
        <label htmlFor="">Email:</label>
        <input
          className="border rounded-md text-center"
          value={searchText}
          onChange={handleChange}
          type="text"
        />
        <button
          onClick={handleClick}
          className="px-2 py-1 rounded-md bg-violet-700 text-white text-sm"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;
