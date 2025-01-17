const OptionField = ({ id, placeholder, options }) => (
  <select
    id={id}
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    aria-label={placeholder}
    required
  >
    <option value="" disabled>
      {placeholder}
    </option>
    {options.map((option, index) => (
      <option key={index} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

export default OptionField;
