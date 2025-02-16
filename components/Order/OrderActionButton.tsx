import { Pressable, Text, TextStyle, ViewStyle } from 'react-native';
import * as Style from '../../assets/styles';
import React from 'react';

export const OrderActionButton = ({
    onPress,
    text,
}: {
    onPress: () => void;
    text: string;
}) => (
    <Pressable
        style={({ pressed }) => ({
            ...(Style.Button.buttonContainer as ViewStyle),
            backgroundColor: pressed
                ? Style.Color.schemeOne.primary[200]
                : Style.Color.schemeOne.primary[300],
        })}
        onPress={onPress}>
        <Text style={Style.Typography.buttonText as TextStyle}>{text}</Text>
    </Pressable>
);
