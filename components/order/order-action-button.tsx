/**
 * @module order-action-button.tsx
 *
 * This module defines the OrderActionButton component for rendering a pressable button
 * used to perform actions on orders. It sets up a pressable component with customizable
 * text and onPress handler.
 */

import React, { ReactElement } from 'react';
import { Pressable, Text } from 'react-native';

import * as Style from 'assets/styles';

type Props = {
    onPress: () => void;
    text: string;
};

/**
 * OrderActionButton component.
 *
 * This component renders a pressable button with customizable text and onPress handler.
 * The button changes its background color based on the press state to provide visual feedback.
 *
 * @component
 * @param {Props} props - The props of the component, containing the onPress handler and button text.
 * @returns {ReactElement} A pressable button component.
 */
export const OrderActionButton: React.FC<Props> = ({
    onPress,
    text,
}: Props): ReactElement => (
    <Pressable
        style={({ pressed }) => ({
            ...Style.Button.buttonContainer,
            backgroundColor: pressed
                ? Style.Color.schemeOne.primary[200]
                : Style.Color.schemeOne.primary[300],
        })}
        onPress={onPress}>
        <Text style={Style.Typography.buttonText}>{text}</Text>
    </Pressable>
);
