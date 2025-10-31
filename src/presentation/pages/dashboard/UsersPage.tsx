import React from 'react';
import { FiUsers } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';
import { useUsersManagement } from '../../components/users/hooks/useUsersManagement';
import { UserRow } from '../../components/users/UserRow';

export const UsersPage: React.FC = () => {
  const { users, isLoading, error, handleRoleChange, handleToggleDisabled } = useUsersManagement();

  // Loading State
  if (isLoading && users.length === 0) {
    return (
      <div className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl p-12 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-emerald-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Cargando usuarios...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">⚠️</span>
            </div>
            <h3 className="text-xl font-bold text-red-900 mb-2">Error al cargar usuarios</h3>
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-8 text-white mb-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <FiUsers className="text-white" size={24} />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">Gestión de Usuarios</h1>
              </div>
              <p className="text-emerald-50 text-sm md:text-base">
                Administra los roles y el estado de los usuarios del sistema.
              </p>
            </div>
            <HiSparkles className="text-white/30 hidden md:block" size={48} />
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <tr>
                  <th scope="col" className="px-6 py-4 font-semibold">Usuario</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Rol</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Estado</th>
                  <th scope="col" className="px-6 py-4 font-semibold text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <UserRow
                    key={user.uid}
                    user={user}
                    onRoleChange={handleRoleChange}
                    onToggleDisabled={handleToggleDisabled}
                    isLast={index === users.length - 1}
                  />
                ))}
                  <tr className="bg-white">
                    <td colSpan={4} className="px-6 py-6">
                      {/* Espacio vacío intencional */}
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td colSpan={4} className="px-6 py-6">
                      {/* Espacio vacío intencional */}
                    </td>
                  </tr>                  
                
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {users.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              <FiUsers size={48} className="mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">No hay usuarios registrados</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};