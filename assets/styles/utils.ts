/**
 * @module assets/styles/utils.ts
 *
 * This module provides style definitions for application associated elements. It includes
 * styles for the loading indicator itself, its container, and any text associated with the
 * loading indicator as an example but you can put any style utils here.
 */

import { StyleSheet, TextStyle } from 'react-native';

import * as Color from './colors';
import { TypographyStyles as Typography } from './typography';

/**
 * UtilityStyles object.
 *
 * This object contains style definitions for various utility components in the application.
 * It includes styles for the loading indicator, its container, and associated text.
 *
 * @type {object}
 * @property {object} loadingIndicator - Styles for the loading indicator.
 * @property {object} loadingIndicatorContainer - Styles for the loading indicator container.
 * @property {object} loadingIndicatorText - Styles for the text associated with the loading indicator.
 */
export const UtilityStyles = StyleSheet.create({
    loadingIndicator: {
        width: '100%',
        height: 'auto',
        color: Color.schemeOne.primary[300] as string,
    },

    loadingIndicatorContainer: {
        width: '100%',
        height: 'auto',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: Color.background.light,
    },

    loadingIndicatorText: {
        paddingVertical: Typography.whiteSpace[100],
        paddingHorizontal: Typography.whiteSpace[100],
        color: Color.text.dark,
        fontSize: 16,
        fontWeight: Typography.fontWeight.h4 as TextStyle['fontWeight'],
        fontFamily: Typography.fontFamily.subHeader,
        textAlign: 'center',
    },
});
