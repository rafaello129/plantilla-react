export type UserRole = 'admin' | 'user' 
// | 'moderator' | 'guest';

export interface UserRoleConfig {
  value: UserRole;
  label: string;
  icon: string;
  color: string;
  bgColor: string;
  ringColor: string;
}

export const USER_ROLES: Record<UserRole, UserRoleConfig> = {
  admin: {
    value: 'admin',
    label: 'Administrador',
    icon: '👑',
    color: 'text-emerald-800',
    bgColor: 'bg-gradient-to-r from-emerald-100 to-teal-100',
    ringColor: 'ring-emerald-200',
  },
//   moderator: {
//     value: 'moderator',
//     label: 'Moderador',
//     icon: '🛡️',
//     color: 'text-blue-800',
//     bgColor: 'bg-gradient-to-r from-blue-100 to-cyan-100',
//     ringColor: 'ring-blue-200',
//   },
  user: {
    value: 'user',
    label: 'Usuario',
    icon: '👤',
    color: 'text-gray-700',
    bgColor: 'bg-gray-100',
    ringColor: 'ring-gray-200',
  },
//   guest: {
//     value: 'guest',
//     label: 'Invitado',
//     icon: '🎭',
//     color: 'text-purple-700',
//     bgColor: 'bg-purple-100',
//     ringColor: 'ring-purple-200',
//   },
};

export const ROLE_OPTIONS: UserRoleConfig[] = Object.values(USER_ROLES);

export const getRoleConfig = (role: string): UserRoleConfig => {
  return USER_ROLES[role as UserRole] || USER_ROLES.user;
};