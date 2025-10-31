import React from 'react';
import { FiCamera } from 'react-icons/fi';

interface ProfileAvatarProps {
  picture: string;
  name: string;
  username: string;
  role: string;
  onChangePicture: () => void;
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  picture,
  name,
  username,
  role,
  onChangePicture,
}) => {
  const avatarUrl = picture || `https://ui-avatars.com/api/?name=${name}&background=random`;

  return (
    <div className="flex items-center gap-6">
      <div className="relative">
        <img
          src={avatarUrl}
          alt="Avatar"
          className="w-24 h-24 rounded-full object-cover ring-4 ring-emerald-100"
        />
        <button
          type="button"
          className="absolute bottom-0 right-0 bg-emerald-500 text-white p-2 rounded-full hover:bg-emerald-600 transition-colors"
          onClick={onChangePicture}
          aria-label="Cambiar foto de perfil"
        >
          <FiCamera size={16} />
        </button>
      </div>
      
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-gray-900">{username}</h2>
        <p className="text-sm text-gray-500 capitalize">{role}</p>
      </div>
    </div>
  );
};