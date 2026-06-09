interface Props {
  value: string;
  id: string;
}

interface DropDownType {
  dropDown: Props[];
  onSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedDropDownValue: string;
}
const DropDown = ({ dropDown, onSelect, selectedDropDownValue }: DropDownType) => {
  return (
    <>
      <form className="flex items-center gap-2" action="">
        <label className="text-sm" htmlFor="">
          Select :
        </label>
        <select
          value={selectedDropDownValue}
          onChange={onSelect}
          className="border text-sm p-1 rounded-md"
          name="users"
          id="users"
        >
          <option value="">Choose one</option>
          {dropDown.map((item) => {
            return (
              <option value={item.value} key={item.id}>
                {item.value}
              </option>
            );
          })}
        </select>
      </form>
    </>
  );
};

export default DropDown;
