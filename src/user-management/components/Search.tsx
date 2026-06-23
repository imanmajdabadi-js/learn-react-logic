import { useReducer } from 'react';
import { defaultFilters, formSearchReducer } from '../../reducers/SearchFormReducer';
import { type UserFilters } from '../../utils/filterUsers';
import DropDown from './DropDown';
import { SelectRoleUsers, SelectTypeUsers } from './DropDownItems';

interface Props {
  onClick: (filters: UserFilters) => void;
}

const Search = ({ onClick }: Props) => {
  const [filters, dispatch] = useReducer(formSearchReducer, defaultFilters);

  const handleChange = (fieldName: keyof UserFilters, value: string) => {
    dispatch({
      type: 'CHANGE_INPUT',
      field: fieldName,
      value: value,
    });
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
          name="note"
          onChange={(e) => handleChange('note', e.target.value)}
          value={filters.note}
          className="border rounded-md"
          type="text"
        />
      </div>
      <DropDown
        name="type"
        value={filters.type}
        onSelect={(e) => handleChange('type', e.target.value)}
        titleLabel="SelectTypeUser"
        dropDown={SelectTypeUsers}
      />

      <DropDown
        name="role"
        value={filters.role}
        onSelect={(e) => handleChange('role', e.target.value)}
        titleLabel="SelectRoleUser"
        dropDown={SelectRoleUsers}
      />
      <div className="flex items-center gap-2">
        <label htmlFor="">Email :</label>
        <input
          name="email"
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
