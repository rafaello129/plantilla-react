import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { getUserProfileUseCase, updateUserProfileUseCase } from '../../../../di/container';
import { useForm, commonValidations } from '../../../../presentation/hooks';
import { useAuthStore } from '../../../store/authStore';

interface ProfileFormState {
  name: string;
  email: string;
  phone: string;
  picture: string;
}

export const useProfile = () => {
  const { user, renewToken } = useAuthStore();
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);

  const {
    formState,
    errors,
    isValid,
    isDirty,
    isSubmitting,
    onInputChange,
    onInputBlur,
    setFormState,
    handleSubmit,
    onResetForm,
  } = useForm<ProfileFormState>({
    initialState: {
      name: '',
      email: '',
      phone: '',
      picture: '',
    },
    validationRules: {
      name: [
        commonValidations.required('El nombre es requerido'),
        commonValidations.minLength(3, 'El nombre debe tener al menos 3 caracteres'),
        commonValidations.maxLength(100, 'El nombre no debe exceder 100 caracteres'),
      ],
      email: [
        commonValidations.required('El correo electrónico es requerido'),
        commonValidations.email('Correo electrónico inválido'),
      ],
      phone: [
        commonValidations.pattern(
          /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
          'Formato de teléfono inválido'
        ),
      ],
    },
    onSubmit: async (data) => {
      try {
        await updateUserProfileUseCase.execute(data);
        await renewToken();
        toast.success('Perfil actualizado con éxito.');
      } catch (error: any) {
        toast.error(error.message || 'Error al actualizar el perfil.');
        throw error;
      }
    },
  });

  // Cargar perfil del usuario
  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoadingProfile(true);
      try {
        const profile = await getUserProfileUseCase.execute();
        setFormState({
          name: profile.name || '',
          email: profile.email || '',
          phone: profile.phone || '',
          picture: profile.picture || '',
        });
      } catch (error) {
        toast.error('No se pudo cargar el perfil.');
      } finally {
        setIsLoadingProfile(false);
      }
    };
    fetchProfile();
  }, [setFormState]);

  // Cambiar foto de perfil
  const handleChangePicture = useCallback(() => {
    toast.success('Función de cambio de foto no implementada aún.');
    // TODO: Implementar subida de imagen
  }, []);

  // Resetear formulario
  const handleCancel = useCallback(() => {
    onResetForm();
    toast.success('Cambios descartados');
  }, [onResetForm]);

  return {
    user,
    formState,
    errors,
    isValid,
    isDirty,
    isLoadingProfile,
    isSubmitting,
    onInputChange,
    onInputBlur,
    handleSubmit,
    handleChangePicture,
    handleCancel,
  };
};