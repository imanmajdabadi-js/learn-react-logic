interface Props {
  value: string;
  id: string;
}

interface DropDownType {
  dropDown: Props[];
  onSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  titleLabel: string;
  value: string;
}
const DropDown = ({ dropDown, onSelect, titleLabel, value }: DropDownType) => {
  return (
    <>
      <form className="flex items-center gap-2" action="">
        <label className="text-sm" htmlFor="">
          {titleLabel} :
        </label>
        <select
          value={value}
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
