import React from 'react';

export const ProfileLoadingState: React.FC = () => {
  return (
    <div className="p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl p-12 text-center">
          <div className="relative mx-auto mb-6 w-20 h-20">
            <div className="absolute inset-0 rounded-full border-4 border-emerald-100"></div>
            <div className="absolute inset-0 rounded-full border-4 border-emerald-600 border-t-transparent animate-spin"></div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Cargando perfil...</h3>
          <p className="text-gray-500">Esto solo tomará un momento</p>
        </div>
      </div>
    </div>
  );
};