/**
 * @typedef {Object} stdErrorType
 * @property {string} [name] - The name of the error.
 * @property {string} [title] - The title of the error.
 * @property {string} message - The error message.
 * @property {string} stack - The error stack trace.
 * @property {'danger' | 'success'} type - The type of error.
 * @description This type represents a standard error object that can be used to display error
 *      messages to the user.
 */
export type stdErrorType =
    | {
          name?: string;
          title?: string;
          message: string;
          stack: string;
          type: 'danger' | 'success';
      }
    | undefined
    | unknown;
