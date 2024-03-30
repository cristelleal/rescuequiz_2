import { useState } from 'react';
import Input from '../input/Input';
import Button from '../button/Button';
import { FormType } from '@/app/types';

const Form = ({
  handleFormSubmit,
  setFormErrorMessage,
  buttonText,
}: FormType) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const error = await handleFormSubmit(email, password);
    if (error) {
      setErrorMessage(error);
    }
  };

  return (
    <form>
      <div className='col-span-6 sm:col-span-3'>
        <label
          htmlFor='Email'
          className='block text-sm font-medium text-gray-700'
        >
          Email
        </label>
        <Input
          type='email'
          placeholder=''
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className='col-span-6 sm:col-span-3'>
        <label
          htmlFor='Password'
          className='block text-sm font-medium text-gray-700'
        >
          Mot de passe
        </label>
        <Input
          type='password'
          placeholder=''
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className='col-span-6 sm:col-span-'>
        {errorMessage && (
          <p className='text-red-500 text-xs italic'>{errorMessage}</p>
        )}
      </div>
      <Button buttonText={buttonText} handleClick={handleSubmit} />
    </form>
  );
};

export default Form;
