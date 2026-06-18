import { useState } from 'react';
import { defaultFilters, type UserFilters } from '../../utils/filterUsers';
import DropDown from './DropDown';
import { SelectRoleUsers, SelectTypeUsers } from './DropDownItems';

interface Props {
  onClick: (filters: UserFilters) => void;
}

const Search = ({ onClick }: Props) => {
  const [filters, setFilters] = useState<UserFilters>(defaultFilters);

  const handleChange = <K extends keyof UserFilters>(key: K, value: UserFilters[K]) => {
    setFilters({ ...filters, [key]: value });
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    onClick(filters);
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2">
        <label htmlFor="">Note :</label>
        <input
          onChange={(e) => handleChange('note', e.target.value)}
          value={filters.note}
          className="border rounded-md"
          type="text"
        />
      </div>
      <DropDown
        value={filters.type}
        onSelect={(e) => handleChange('type', e.target.value as 'Vip' | 'Normal' | 'All')}
        titleLabel="SelectTypeUser"
        dropDown={SelectTypeUsers}
      />

      <DropDown
        value={filters.role}
        onSelect={(e) => handleChange('role', e.target.value as 'Admin' | 'User' | 'All')}
        titleLabel="SelectRoleUser"
        dropDown={SelectRoleUsers}
      />
      <div className="flex items-center gap-2">
        <label htmlFor="">Email :</label>
        <input
          className="border rounded-md text-center"
          value={filters.email}
          onChange={(e) => handleChange('email', e.target.value)}
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
