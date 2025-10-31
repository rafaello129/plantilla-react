import { useState } from 'react';

export const useForm = <T extends Object>(initialState: T) => {
  const [formState, setFormState] = useState(initialState);

  const onInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialState);
  };

  return {
    ...formState, // Exponer directamente las propiedades del estado
    formState,   // Exponer el objeto de estado completo
    onInputChange,
    onResetForm,
    setFormState, // Para establecer el estado desde fuera si es necesario
  };
};