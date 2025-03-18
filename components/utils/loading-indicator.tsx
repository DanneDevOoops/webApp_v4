/**
 * @module components/utils/loading-indicator.tsx
 *
 * This module defines the loading indicator component.
 * It displays an activity indicator with an optional loading message.
 */

import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import * as Style from 'assets/styles';
import { LoadingIndicatorArgumentTypes } from 'types/utils-types';

/**
 * LoadingIndicator component.
 *
 * This component displays an activity indicator with an optional loading message.
 * It is used to indicate that a loading process is ongoing.
 *
 * @function
 * @param {ArgumentTypes} props - The props for the component.
 * @param {string | undefined} props.loadingType - The type of loading process (optional).
 * @returns {React.ReactElement} The rendered loading indicator component.
 */
export function LoadingIndicator({
    loadingType = undefined,
}: LoadingIndicatorArgumentTypes): React.ReactElement {
    if (loadingType !== undefined) {
        return (
            <View style={Style.Utils.loadingIndicatorContainer}>
                <ActivityIndicator
                    size='large'
                    color={Style.Color.schemeOne.primary[300]}
                    style={Style.Utils.loadingIndicator}
                />

                <Text style={Style.Utils.loadingIndicatorText}>
                    Laddar {loadingType}...
                </Text>
            </View>
        );
    } else {
        return (
            <View style={Style.Utils.loadingIndicatorContainer}>
                <ActivityIndicator
                    size='large'
                    color={Style.Color.schemeOne.primary[300]}
                />

                <Text style={Style.Utils.loadingIndicatorText}>Laddar...</Text>
            </View>
        );
    }
}
