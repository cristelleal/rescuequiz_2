import { InputType } from '@/app/types';

function Input({ type, placeholder, value, onChange }: InputType): JSX.Element {
  return (
    <input
      type={type}
      className='mt-4 mb-4 w-full rounded-md border border-gray-100 bg-white text-sm text-gray-700 shadow-sm px-2 py-3 focus:border-indigo-500 focus:ring-indigo-500'
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      autoComplete="current-password"
    />
  );
}

export default Input;
