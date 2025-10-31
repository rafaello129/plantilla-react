    import type { FormValidationRule } from "../types/form.types";

    export const validateField = <T>(
    value: T,
    rules: FormValidationRule<T>[]    
    ): string | null => {
    for (const rule of rules) {
        if (!rule.validate(value)) {
        return rule.message;
        }
    }
    return null;
    };

    export const isFormDirty = <T extends Object>(
    currentState: T,
    initialState: T
    ): boolean => {
    return JSON.stringify(currentState) !== JSON.stringify(initialState);
    };

    export const commonValidations = {
    required: (message = 'Este campo es requerido'): FormValidationRule<any> => ({
        validate: (value) => {
        if (typeof value === 'string') return value.trim().length > 0;
        return value !== null && value !== undefined;
        },
        message,
    }),

    email: (message = 'Email inválido'): FormValidationRule<string> => ({
        validate: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
        },
        message,
    }),

    minLength: (
        min: number,
        message = `Debe tener al menos ${min} caracteres`
    ): FormValidationRule<string> => ({
        validate: (value) => value.length >= min,
        message,
    }),

    maxLength: (
        max: number,
        message = `No debe exceder ${max} caracteres`
    ): FormValidationRule<string> => ({
        validate: (value) => value.length <= max,
        message,
    }),

    pattern: (
        regex: RegExp,
        message = 'Formato inválido'
    ): FormValidationRule<string> => ({
        validate: (value) => regex.test(value),
        message,
    }),

    min: (
        min: number,
        message = `El valor debe ser mayor o igual a ${min}`
    ): FormValidationRule<number> => ({
        validate: (value) => value >= min,
        message,
    }),

    max: (
        max: number,
        message = `El valor debe ser menor o igual a ${max}`
    ): FormValidationRule<number> => ({
        validate: (value) => value <= max,
        message,
    }),

    custom: <T>(
        validator: (value: T) => boolean,
        message: string
    ): FormValidationRule<T> => ({
        validate: validator,
        message,
    }),
    };