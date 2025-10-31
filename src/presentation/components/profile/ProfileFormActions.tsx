import React from 'react';
import { FiSave, FiX } from 'react-icons/fi';

interface ProfileFormActionsProps {
  isValid: boolean;
  isDirty: boolean;
  isSubmitting: boolean;
  onCancel: () => void;
}

export const ProfileFormActions: React.FC<ProfileFormActionsProps> = ({
  isValid,
  isDirty,
  isSubmitting,
  onCancel,
}) => {
  return (
    <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
 

      <button
        type="submit"
        disabled={!isValid || !isDirty || isSubmitting}
        className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
            Guardando...
          </>
        ) : (
          <>
            <FiSave size={18} />
            Guardar Cambios
          </>
        )}
      </button>
    </div>
  );
};