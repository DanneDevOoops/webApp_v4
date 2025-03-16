/**
 * @module error-handler.tsx
 *
 * This module defines the error handler for API requests.
 * It logs detailed error information to the console.
 */

import { stdErrorType } from 'types/utils-types';

/**
 * RequestErrorHandler function.
 *
 * This function handles errors that occur during API requests.
 * It logs the error details, including the name, message, and stack trace.
 *
 * @function
 * @param {stdErrorType | Error | undefined} inputError - The error object to handle (optional).
 * @returns {void}
 */
export function RequestErrorHandler(inputError?: stdErrorType | Error): void {
    if (!inputError) {
        console.error('Request Error: Unknown error occurred.');
        return;
    }

    const errorObject = {
        errors: {
            title: inputError?.name || 'Error',
            message: inputError?.message || 'An unknown error occurred.',
            stack: inputError?.stack || 'No stack trace available.',
        },
    };

    console.error(`Request Error: `, errorObject);
    return;
}
