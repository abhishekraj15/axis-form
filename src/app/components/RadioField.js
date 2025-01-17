const RadioField = ({ id, label }) => (
  <div className="flex items-center">
    <input
      id={id}
      type="radio"
      name={id}
      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
    />
    <label htmlFor={id} className="ml-2 text-sm font-medium text-gray-900">
      {label}
    </label>
  </div>
);

export default RadioField;
