interface CheckItemParalelProps {
  idName: string
  checked: boolean
  onChange: () => void
}

export const CheckItemParalel = ({ idName, checked, onChange }: CheckItemParalelProps) => {
  return (
    <label htmlFor={idName} className="checkbox-label">
      <input
        id={idName}
        name={idName}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="hidden-checkbox"
      />
      <span className={`custom-checkbox ${checked ? 'checked' : ''}`} />
    </label>
  );
};
