/**
 * This module defines types for flash messages used in the application.
 *
 * It includes type definitions for `MessageType` and `FlashMessageType`, which represent the
 * type of flash message and its configuration, respectively.
 *
 * @module AnimationTypes
 */

/**
 * Represents the type of flash message.
 *
 * @property {string} info - Informative message type.
 * @property {string} warning - Warning message type.
 * @property {string} danger - Danger message type.
 * @property {string} success - Success message type.
 * @property {string} default - Default message type.
 */
export type MessageType = 'info' | 'warning' | 'danger' | 'success' | 'default';

/**
 * Represents the configuration for a flash message.
 *
 * @property {number} duration - The duration for which the flash message is displayed (in
 *      milliseconds).
 * @property {MessageType} type - The type of the flash message. Can be 'info', 'warning',
 *      'danger', 'success', or 'default'.
 * @property {string} description - A brief description of the flash message.
 * @property {string} message - The actual message to be displayed.
 */
export type FlashMessageType = {
    duration: number;
    type: MessageType;
    description: string;
    message: string;
};
