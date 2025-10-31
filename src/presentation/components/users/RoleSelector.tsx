import React, { useState, useRef, useEffect } from 'react';
import { FiChevronDown, FiCheck } from 'react-icons/fi';
import { type UserRole, getRoleConfig, ROLE_OPTIONS } from '../../../domain/constants/userRoles';

interface RoleSelectorProps {
  currentRole: string;
  onRoleChange: (newRole: UserRole) => void;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({ 
  currentRole, 
  onRoleChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentRoleConfig = getRoleConfig(currentRole);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-full ${currentRoleConfig.bgColor} ${currentRoleConfig.color} ring-1 ${currentRoleConfig.ringColor} hover:opacity-80 transition-all`}
      >
        <span>{currentRoleConfig.icon}</span>
        <span>{currentRoleConfig.label.toUpperCase()}</span>
        <FiChevronDown 
          size={14} 
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg border border-gray-200 z-50 overflow-hidden">
          {ROLE_OPTIONS.map((role) => (
            <button
              key={role.value}
              onClick={() => {
                onRoleChange(role.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-3 text-sm transition-all flex items-center justify-between gap-3 hover:bg-gray-50 ${
                role.value === currentRole ? 'bg-gray-50' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{role.icon}</span>
                <span className="font-medium text-gray-700">{role.label}</span>
              </div>
              {role.value === currentRole && (
                <FiCheck className="text-emerald-600" size={16} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};