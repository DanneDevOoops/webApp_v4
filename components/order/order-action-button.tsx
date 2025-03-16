import React, { ReactElement } from 'react';
import { Pressable, Text } from 'react-native';

import * as Style from 'assets/styles';

type Props = {
    onPress: () => void;
    text: string;
};

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
