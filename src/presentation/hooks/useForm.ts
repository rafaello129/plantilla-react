import { useState, useCallback, useMemo } from 'react';

import { validateField, isFormDirty } from './utils/formValidation';
import type { UseFormOptions, UseFormReturn, FormFieldValidation, FormErrors } from '.';

export const useForm = <T extends Record<string, any>>(
  options: UseFormOptions<T>
): UseFormReturn<T> => {
  const { initialState, validationRules = {} as FormFieldValidation<T>, onSubmit } = options;

  const [formState, setFormState] = useState<T>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touchedFields, setTouchedFields] = useState<Set<keyof T>>(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Verificar si el formulario ha sido modificado
  const isDirty = useMemo(
    () => isFormDirty(formState, initialState),
    [formState, initialState]
  );

  // Verificar si el formulario es válido
  const isValid = useMemo(() => {
    return Object.keys(errors).length === 0;
  }, [errors]);

  const validateFieldByName = useCallback(
    <K extends keyof T>(fieldName: K): boolean => {
      const rules = validationRules[fieldName];
      if (!rules || rules.length === 0) return true;

      const value = formState[fieldName];
      const error = validateField(value, rules);

      if (error) {
        setErrors((prev) => ({ ...prev, [fieldName as string]: error }));
        return false;
      } else {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[fieldName as string];
          return newErrors;
        });
        return true;
      }
    },
    [formState, validationRules]
  );

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    (Object.keys(validationRules) as Array<keyof T>).forEach((fieldName) => {
      const rules = validationRules[fieldName];
      if (!rules || rules.length === 0) return;

      const value = formState[fieldName];
      const error = validateField(value, rules);

      if (error) {
        newErrors[fieldName as string] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formState, validationRules]);

  // Manejar cambios en los inputs
  const onInputChange = useCallback(
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value, type } = event.target;

      let finalValue: any = value;

      // Manejar diferentes tipos de input
      if (type === 'checkbox') {
        finalValue = (event.target as HTMLInputElement).checked;
      } else if (type === 'number') {
        finalValue = value === '' ? '' : Number(value);
      } else if (type === 'file') {
        finalValue = (event.target as HTMLInputElement).files?.[0] || null;
      }

      setFormState((prev) => ({
        ...prev,
        [name]: finalValue,
      }));

      // Validar el campo si ya ha sido tocado
      if (touchedFields.has(name as keyof T)) {
        setTimeout(() => {
          validateFieldByName(name as keyof T);
        }, 0);
      }
    },
    [touchedFields, validateFieldByName]
  );

  // Manejar blur en los inputs
  const onInputBlur = useCallback(
    (
      event: React.FocusEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name } = event.target;
      setTouchedFields((prev) => new Set(prev).add(name as keyof T));
      validateFieldByName(name as keyof T);
    },
    [validateFieldByName]
  );

  const setFieldValue = useCallback(
    <K extends keyof T>(fieldName: K, value: T[K]) => {
      setFormState((prev) => ({
        ...prev,
        [fieldName]: value,
      }));

      // Validar si el campo ya ha sido tocado
      if (touchedFields.has(fieldName)) {
        setTimeout(() => {
          validateFieldByName(fieldName);
        }, 0);
      }
    },
    [touchedFields, validateFieldByName]
  );

  const setFieldError = useCallback(<K extends keyof T>(fieldName: K, error: string) => {
    setErrors((prev) => ({
      ...prev,
      [fieldName as string]: error,
    }));
  }, []);

  // Limpiar todos los errores
  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  // Resetear el formulario
  const onResetForm = useCallback(() => {
    setFormState(initialState);
    setErrors({});
    setTouchedFields(new Set());
    setIsSubmitting(false);
  }, [initialState]);

  // Manejar envío del formulario
  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      if (e) {
        e.preventDefault();
      }

      // Marcar todos los campos como tocados
      const allFields = new Set(Object.keys(formState) as Array<keyof T>);
      setTouchedFields(allFields);

      // Validar el formulario
      const isFormValid = validateForm();

      if (!isFormValid) {
        return;
      }

      if (onSubmit) {
        setIsSubmitting(true);
        try {
          await onSubmit(formState);
        } catch (error) {
          console.error('Error al enviar el formulario:', error);
        } finally {
          setIsSubmitting(false);
        }
      }
    },
    [formState, validateForm, onSubmit]
  );

  return {
    formState,
    errors,
    isValid,
    isDirty,
    isSubmitting,
    onInputChange,
    onInputBlur,
    onResetForm,
    setFormState,
    setFieldValue,
    setFieldError,
    validateField: validateFieldByName,
    validateForm,
    handleSubmit,
    clearErrors,
  };
};