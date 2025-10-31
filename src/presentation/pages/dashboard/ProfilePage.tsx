import React from 'react';
import { ProfileAvatar } from '../../components/profile/ProfileAvatar';
import { ProfileFormActions } from '../../components/profile/ProfileFormActions';
import { ProfileFormFields } from '../../components/profile/ProfileFormFields';
import { ProfileHeader } from '../../components/profile/ProfileHeader';
import { ProfileLoadingState } from '../../components/profile/ProfileLoadingState';
import { useProfile } from '../../components/profile/hooks/useProfile';


export const ProfilePage: React.FC = () => {
  const {
    user,
    formState,
    errors,
    isValid,
    isDirty,
    isLoadingProfile,
    isSubmitting,
    onInputChange,
    onInputBlur,
    handleSubmit,
    handleChangePicture,
    handleCancel,
  } = useProfile();
  if (isLoadingProfile && !formState.name) {
    return <ProfileLoadingState />;
  }

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl p-8">
        <ProfileHeader />

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Avatar y usuario */}
          {user && (
            <ProfileAvatar
              picture={formState.picture}
              name={formState.name}
              username={user.username}
              role={user.role as string}
              onChangePicture={handleChangePicture}
            />
          )}

          {/* Campos del formulario con validación */}
          <ProfileFormFields
            formState={formState}
            errors={errors}
            onInputChange={onInputChange}
            onInputBlur={onInputBlur}
          />

          {/* Botones de acción */}
          <ProfileFormActions
            isValid={isValid}
            isDirty={isDirty}
            isSubmitting={isSubmitting}
            onCancel={handleCancel}
          />
        </form>

      </div>
    </div>
  );
};