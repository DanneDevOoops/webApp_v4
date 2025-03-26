/**
 * @module animation.ts
 *
 * This module defines style attributes for UI components, specifically focusing on animation
 * properties. It includes functions for displaying flash messages using the
 * `react-native-flash-message` library.
 */

import { showMessage } from 'react-native-flash-message';

import { messageTypes } from 'constants/message-constants';
import { FlashMessageType, MessageType } from 'types/animation-types';

/**
 * Displays a flash message using the `react-native-flash-message` library.
 *
 * @function flash_message
 * @param {MessageType} type - The type of the message. Can be 'info', 'warning', 'danger',
 * 'success', or 'default'.
 * @param {string} message - The message to be displayed.
 * @returns {void}
 */
export const flash_message = (type: MessageType, message: string) => {
    const messageConfig: FlashMessageType =
        messageTypes[type] || messageTypes.default;
    messageConfig.message = message;

    return showMessage(messageConfig);
};

export const flash_message_and_navigate = (
    type: MessageType,
    message: string,
    navigateCallback: () => void,
) => {
    console.info('flash_message_and_navigate');

    const messageConfig: FlashMessageType =
        messageTypes[type] || messageTypes.default;
    messageConfig.message = message;
    messageConfig.onPress = navigateCallback;

    return showMessage(messageConfig);
};

export const navigateToScreen = (destination: string) => {
    console.log('Navigating to: ', destination);
    // navigation.dispatch(CommonActions.navigate(destination));
};
