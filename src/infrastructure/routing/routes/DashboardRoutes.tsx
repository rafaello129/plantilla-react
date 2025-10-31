import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from '../../../presentation/layouts/DashboardLayout';
import { DashboardPage } from '../../../presentation/pages/dashboard/DashboardPage';
import { ProfilePage } from '../../../presentation/pages/dashboard/ProfilePage';
import { useAuthStore } from '../../../presentation/store/authStore';
import { UsersPage } from '../../../presentation/pages/dashboard/UsersPage';

export const DashboardRoutes: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <DashboardLayout>
      <Routes>
        <Route path="home" element={<DashboardPage />} />
        <Route path="profile" element={<ProfilePage />} />
        {user?.role === 'admin' && <Route path="users" element={<UsersPage />} />}
        <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
      </Routes>
    </DashboardLayout>
  );
};