/**
 * @module types/utils-types.ts
 *
 * Utility types for the application.
 *
 * This module contains type definitions for standard error handling and common function types.
 */

/**
 * Type definition for standard error objects.
 *
 * This type represents an error object that can optionally include a name, title, message,
 * stack trace, and a type indicating the nature of the error (either 'danger' or 'success').
 *
 * @interface stdErrorType
 * @property {string} [name] - The name of the error.
 * @property {string} [title] - The title of the error.
 * @property {string} message - The message describing the error.
 * @property {string} stack - The stack trace of the error.
 * @property {'danger' | 'success'} type - The type indicating the nature of the error.
 */
export interface stdErrorType {
    name?: string;
    title?: string;
    message: string;
    stack: string;
    type: 'danger' | 'success';
}

/**
 * Type definition for a function that returns void.
 *
 * This type represents a function that takes no arguments and returns no value.
 */
export type FunctionVoidType = () => void;

/**
 * Type definition for the loading indicator argument types.
 *
 * This type represents the props that can be passed to the LoadingIndicator component.
 *
 * @property {string | undefined} loadingType - The type of loading process (optional).
 */
export type LoadingIndicatorArgumentTypes = { loadingType: string | undefined };
