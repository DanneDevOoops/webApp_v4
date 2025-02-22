import { stdErrorType } from '../../types/Utils.';

/**
 * Error Handler for API requests.
 */
export function RequestErrorHandler(inputError?: stdErrorType): void {
    if (!inputError) {
        console.error('Request Error: Unknown error occurred.');
        return;
    }

    const errorObject: object = {
        errors: {
            title: inputError?.name || 'Error',
            message: inputError?.message || 'An unknown error occurred.',
            stack: inputError?.stack || 'No stack trace available.',
        },
    };

    console.error(`Request Error: \n${errorObject}`);
    return;
}
