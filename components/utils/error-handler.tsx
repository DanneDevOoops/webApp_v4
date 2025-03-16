import { stdErrorType } from 'types/utils-types';

/**
 * Error Handler for API requests.
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
