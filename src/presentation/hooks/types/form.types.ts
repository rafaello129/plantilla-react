export type FormFieldValue = string | number | boolean | File | null;

export type FormState<T> = {
  [K in keyof T]: T[K];
};

export interface FormValidationRule<T = any> {
  validate: (value: T) => boolean;
  message: string;
}

export type FormFieldValidation<T> = {
  [K in keyof T]?: FormValidationRule<T[K]>[];
};

export interface FormErrors {
  [fieldName: string]: string;
}

export interface UseFormOptions<T extends Record<string, any>> {
  initialState: T;
  validationRules?: FormFieldValidation<T>;
  onSubmit?: (formState: T) => void | Promise<void>;
}

export interface UseFormReturn<T> {
  formState: T;
  errors: FormErrors;
  isValid: boolean;
  isDirty: boolean;
  isSubmitting: boolean;
  onInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  onInputBlur: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  onResetForm: () => void;
  setFormState: React.Dispatch<React.SetStateAction<T>>;
  setFieldValue: <K extends keyof T>(fieldName: K, value: T[K]) => void;
  setFieldError: <K extends keyof T>(fieldName: K, error: string) => void;
  validateField: <K extends keyof T>(fieldName: K) => boolean;
  validateForm: () => boolean;
  handleSubmit: (e?: React.FormEvent) => Promise<void>;
  clearErrors: () => void;
}