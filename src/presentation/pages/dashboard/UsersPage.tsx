import React, { useEffect } from 'react';
import { useUserStore } from '../../store/userStore';
import { toast } from 'react-hot-toast';
import { FiEdit } from 'react-icons/fi';

export const UsersPage: React.FC = () => {
  const { users, isLoading, error, fetchAllUsers, updateUserByAdmin } = useUserStore();

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  if (isLoading && users.length === 0) {
    return <div className="p-8">Cargando usuarios...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">Error: {error}</div>;
  }

  const handleRoleChange = (uid: string, role: string) => {
    const newRole = role === 'admin' ? 'user' : 'admin';
    toast.promise(
      updateUserByAdmin(uid, { role: newRole }),
      {
        loading: 'Actualizando rol...',
        success: 'Rol actualizado con éxito.',
        error: 'No se pudo actualizar el rol.',
      }
    );
  };

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b">
          <h1 className="text-3xl font-bold text-gray-800">Gestión de Usuarios</h1>
          <p className="text-gray-500 mt-1">Administra los roles y el estado de los usuarios del sistema.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Usuario</th>
                <th scope="col" className="px-6 py-3">Rol</th>
                <th scope="col" className="px-6 py-3">Estado</th>
                <th scope="col" className="px-6 py-3">En Línea</th>
                <th scope="col" className="px-6 py-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.uid} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <img className="w-10 h-10 rounded-full" src={user.picture || `https://ui-avatars.com/api/?name=${user.name}&background=random`} alt={user.name} />
                      <div>
                        <div>{user.name}</div>
                        <div className="text-xs text-gray-500">@{user.username}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      user.role === 'admin' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.is_active ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {user.is_online ? '🟢' : '⚫'}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button onClick={() => handleRoleChange(user.uid, user.role || 'user')} className="font-medium text-emerald-600 hover:underline flex items-center gap-1 mx-auto">
                      <FiEdit size={14} /> Cambiar Rol
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};