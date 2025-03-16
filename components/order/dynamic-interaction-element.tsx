/**
 * @module dynamic-interaction-element.tsx
 *
 * This module defines the OrderStatusMessage component for rendering status messages
 * with different levels of importance. It sets up a view component with customizable
 * styles based on the message level.
 */

import React from 'react';
import { Text, View } from 'react-native';

import * as Style from 'assets/styles';

/**
 * OrderStatusMessage component.
 *
 * This component renders a status message with a specific level of importance.
 * The message is displayed within a styled view, with the style changing based on the
 * provided message level.
 *
 * @component
 * @param {string} message - The message to be displayed.
 * @param {MessageLevel} level - The level of the message, which determines the styling.
 * @returns {ReactElement} A view component displaying the status message.
 */
export const OrderStatusMessage = (
    message: string,
    level: 'warning' | 'info' | 'success' | 'caution',
): React.ReactElement => {
    const styleSelection = {
        warning: {
            container: Style.Container.warningMsgContainer,
            text: Style.Typography.warningFlashMsg,
        },
        info: {
            container: Style.Container.infoMsgContainer,
            text: Style.Typography.infoFlashMsg,
        },
        success: {
            container: Style.Container.successMsgContainer,
            text: Style.Typography.successFlashMsg,
        },
        caution: {
            container: Style.Container.cautionMsgContainer,
            text: Style.Typography.cautionFlashMsg,
        },
    };

    const levelStyle = styleSelection[level];

    return (
        <View style={levelStyle.container}>
            <Text style={levelStyle.text}>{message}</Text>
        </View>
    );
};
