import React, { useState, useRef, useEffect } from 'react';
import { FiEdit, FiToggleLeft, FiToggleRight } from 'react-icons/fi';

import { RoleSelector } from './RoleSelector';
import type { UserRole } from '../../../domain/constants/userRoles';
import type { User } from '../../../domain/entities';

interface UserRowProps {
  user: User;
  onRoleChange: (uid: string, newRole: UserRole) => void;
  onToggleDisabled: (uid: string, currentStatus: boolean) => void;
  isLast: boolean;
}

export const UserRow: React.FC<UserRowProps> = ({ 
  user, 
  onRoleChange, 
  onToggleDisabled,
  isLast 
}) => {
  const [showActions, setShowActions] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowActions(false);
      }
    };

    if (showActions) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showActions]);

  return (
    <tr className={`bg-white hover:bg-gray-50 transition-colors ${!isLast ? 'border-b border-gray-200' : ''}`}>
      {/* Usuario */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              className="w-12 h-12 rounded-full ring-2 ring-gray-100 object-cover"
              src={user.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || user.username)}&background=random&bold=true`}
              alt={user.name || user.username}
            />
            {user.is_online && (
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
            )}
          </div>
          <div>
            <div className="font-semibold text-gray-900">{user.name || user.username}</div>
            <div className="text-xs text-gray-500">@{user.username}</div>
          </div>
        </div>
      </td>

      {/* Rol */}
      <td className="px-6 py-4">
        <RoleSelector
          currentRole={user.role || 'user'}
          onRoleChange={(newRole) => onRoleChange(user.uid, newRole)}
        />
      </td>

      {/* Estado */}
      <td className="px-6 py-4">
        <div className="flex flex-col gap-1.5">
          {user.is_disabled ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full bg-orange-100 text-orange-800 ring-1 ring-orange-200">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
              Deshabilitado
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 ring-1 ring-blue-200">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              Habilitado
            </span>
          )}
        </div>
      </td>

      {/* Acciones */}
      <td className="px-6 py-4">
        <div className="flex items-center justify-center gap-2">
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowActions(!showActions)}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-all active:scale-95 border border-emerald-200"
            >
              <FiEdit size={14} />
              <span>Acciones</span>
            </button>

            {showActions && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg border border-gray-200 z-20 overflow-hidden">
                <button
                  onClick={() => {
                    onToggleDisabled(user.uid, user.is_disabled);
                    setShowActions(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm transition-all flex items-center gap-3 group ${
                    user.is_disabled 
                      ? 'text-blue-700 hover:bg-blue-50' 
                      : 'text-orange-700 hover:bg-orange-50'
                  }`}
                >
                  {user.is_disabled ? (
                    <>
                      <FiToggleRight className="text-blue-400 group-hover:text-blue-600 transition-colors" size={16} />
                      <span className="font-medium">Habilitar Usuario</span>
                    </>
                  ) : (
                    <>
                      <FiToggleLeft className="text-orange-400 group-hover:text-orange-600 transition-colors" size={16} />
                      <span className="font-medium">Deshabilitar Usuario</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </td>
    </tr>
  );
};