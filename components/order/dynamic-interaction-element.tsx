import React from 'react';
import { Text, View } from 'react-native';

import * as Style from 'assets/styles';

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
