import React, { useState, useEffect } from 'react';
import { useForm } from '../../hooks/useForm';
import { useAuthStore } from '../../store/authStore';
import { getUserProfileUseCase, updateUserProfileUseCase } from '../../../di/container';
import { toast } from 'react-hot-toast';
import { FiUser, FiMail, FiPhone, FiCamera, FiSave } from 'react-icons/fi';

export const ProfilePage: React.FC = () => {
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const { formState, onInputChange, setFormState } = useForm({
    name: '',
    email: '',
    phone: '',
    picture: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
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
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [setFormState]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading('Actualizando perfil...');
    try {
      const updatedUser = await updateUserProfileUseCase.execute(formState);
      // Actualizamos el formulario con los datos del usuario actualizado
      setFormState({
        name: updatedUser.name || '',
        email: updatedUser.email || '',
        phone: updatedUser.phone || '',
        picture: updatedUser.picture || '',
      });

      toast.success('Perfil actualizado con éxito.', { id: toastId });
    } catch (error: any) {
      toast.error(error.message || 'Error al actualizar.', { id: toastId });
    }
  };

  if (isLoading && !formState.name) {
    return <div className="p-8">Cargando perfil...</div>;
  }

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Mi Perfil</h1>
        <p className="text-gray-500 mb-8">Actualiza tu información personal y de contacto.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <img
                src={formState.picture || `https://ui-avatars.com/api/?name=${formState.name}&background=random`}
                alt="Avatar"
                className="w-24 h-24 rounded-full object-cover ring-4 ring-emerald-100"
              />
              <button
                type="button"
                className="absolute bottom-0 right-0 bg-emerald-500 text-white p-2 rounded-full hover:bg-emerald-600 transition"
                onClick={() => toast.success('Función no implementada aún.')}
              >
                <FiCamera size={16} />
              </button>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{user?.username}</h2>
              <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input para Nombre */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="text" id="name" name="name" value={formState.name} onChange={onInputChange} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" />
              </div>
            </div>

            {/* Input para Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="email" id="email" name="email" value={formState.email} onChange={onInputChange} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" />
              </div>
            </div>

            {/* Input para Teléfono */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
              <div className="relative">
                <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="tel" id="phone" name="phone" value={formState.phone} onChange={onInputChange} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition"
            >
              <FiSave />
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};