import React from 'react';
import { FiUser, FiMail, FiPhone, FiAlertCircle } from 'react-icons/fi';

interface ProfileFormFieldsProps {
  formState: {
    name: string;
    email: string;
    phone: string;
  };
  errors: {
    [key: string]: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInputBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

interface InputFieldProps {
  id: string;
  name: string;
  type: string;
  label: string;
  value: string;
  error?: string;
  icon: React.ReactNode;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  name,
  type,
  label,
  value,
  error,
  icon,
  placeholder,
  onChange,
  onBlur,
  required = false,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </div>
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`w-full pl-10 pr-3 py-2.5 border rounded-lg transition-colors focus:outline-none focus:ring-2 ${
            error
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 focus:ring-emerald-500 focus:border-emerald-500'
          }`}
          placeholder={placeholder}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        {error && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
            <FiAlertCircle size={18} />
          </div>
        )}
      </div>
      {error && (
        <p id={`${id}-error`} className="text-red-600 text-sm mt-1 flex items-center gap-1">
          <FiAlertCircle size={14} />
          {error}
        </p>
      )}
    </div>
  );
};

export const ProfileFormFields: React.FC<ProfileFormFieldsProps> = ({
  formState,
  errors,
  onInputChange,
  onInputBlur,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InputField
        id="name"
        name="name"
        type="text"
        label="Nombre Completo"
        value={formState.name}
        error={errors.name}
        icon={<FiUser size={18} />}
        placeholder="Ingresa tu nombre completo"
        onChange={onInputChange}
        onBlur={onInputBlur}
        required
      />

      <InputField
        id="email"
        name="email"
        type="email"
        label="Correo Electrónico"
        value={formState.email}
        error={errors.email}
        icon={<FiMail size={18} />}
        placeholder="tu@email.com"
        onChange={onInputChange}
        onBlur={onInputBlur}
        required
      />

      <InputField
        id="phone"
        name="phone"
        type="tel"
        label="Teléfono"
        value={formState.phone}
        error={errors.phone}
        icon={<FiPhone size={18} />}
        placeholder="+52 123 456 7890"
        onChange={onInputChange}
        onBlur={onInputBlur}
      />
    </div>
  );
};