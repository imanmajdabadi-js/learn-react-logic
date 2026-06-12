import { useState } from 'react';
import DropDown from './DropDown';
import { SelectRoleUsers, SelectTypeUsers } from './DropDownItems';

interface Props {
  searchEmail: string;
  onClick: (email: string, typeSelect: string, roleSelect: string, note: string) => void;
  selectedUserType: string;
  selectedRole: string;
}

const Search = ({ onClick }: Props) => {
  const [searchEmail, setSearchEmail] = useState<string>('');
  const [searchNote, setSearchNote] = useState<string>('');

  const [selectedUserType, setSelectedUserType] = useState<string>('');

  const [selectedRole, setSelectedRole] = useState<string>('');

  const handleSearchEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchEmail(e.target.value);
  };

  const handleSearchNote = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchNote(e.target.value);
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    onClick(searchEmail, selectedUserType, selectedRole, searchNote);
  };

  const handleSelectRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(e.target.value);
  };

  const handleSelecType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserType(e.target.value);
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2">
        <label htmlFor="">Note :</label>
        <input
          onChange={handleSearchNote}
          value={searchNote}
          className="border rounded-md"
          type="text"
        />
      </div>
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
        <label htmlFor="">Email :</label>
        <input
          className="border rounded-md text-center"
          value={searchEmail}
          onChange={handleSearchEmail}
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
