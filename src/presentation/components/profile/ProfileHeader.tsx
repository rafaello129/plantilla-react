import React from 'react';

export const ProfileHeader: React.FC = () => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Mi Perfil</h1>
      <p className="text-gray-500">
        Actualiza tu información personal y de contacto.
      </p>
    </div>
  );
};