/**
 * This module defines style attributes for UI components, specifically focusing on animations
 * properties. It includes objects, which contain properties related to animations, such as
 * flash_message, etc.
 *
 * @module animation
 */

import { showMessage } from 'react-native-flash-message';
import { FlashMessageType, MessageType } from '../../types/animation-types';

/**
 * Displays a flash message using the `react-native-flash-message` library.
 *
 * @param {MessageType} type - The type of the message. Can be 'info', 'warning', 'danger', 'success', or 'default'.
 * @param {string} message - The message to be displayed.
 *
 * @returns {void}
 */
export const flash_message = (type: MessageType, message: string) => {
    const messageTypes: Record<MessageType, FlashMessageType> = {
        info: {
            duration: 5000,
            type: 'info',
            description: 'Informerande meddelande',
            message: '',
        },
        warning: {
            duration: 2500,
            type: 'warning',
            description: 'Varnande meddelande',
            message: '',
        },
        danger: {
            duration: 3500,
            type: 'danger',
            description: 'Farligt meddelande',
            message: '',
        },
        success: {
            duration: 2500,
            type: 'success',
            description: 'Lyckat meddelande',
            message: '',
        },
        default: {
            duration: 3500,
            type: 'default',
            description: 'Meddelande',
            message: 'Standard meddelande...? 🤔',
        },
    };

    const messageConfig: FlashMessageType =
        messageTypes[type] || messageTypes.default;
    messageConfig.message = message;

    return showMessage(messageConfig);
};
