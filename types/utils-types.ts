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
 */
export type stdErrorType =
    | {
          name?: string;
          title?: string;
          message: string;
          stack: string;
          type: 'danger' | 'success';
      }
    | undefined;

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
