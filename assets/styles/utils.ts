/**
 * @module utils
 *
 * This module provides style definitions for application associated elements. It includes
 * styles for the loading indicator itself, its container, and any text associated with the
 * loading indicator as an example but you can put any style utils here.
 */

import { StyleSheet, TextStyle } from 'react-native';
import { TypographyStyles as Typography } from './typography';
import * as Color from './colors';

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

/**
 * Loading indicator attributes.
 *
 * This object defines the style attributes for loading indicators in the application.
 * It includes properties for size, width, height, and color.
 *
 * @constant
 * @type {object}
 * @property {string} size - Sets the size of the loading indicator to large.
 * @property {string} width - Sets the width of the loading indicator to 100%.
 * @property {string} height - Sets the height of the loading indicator to auto, allowing it to
 *      be determined by the content.
 * @property {string} color - Sets the color of the loading indicator based on the color scheme.
 */
// export const loadingIndicator: LoadingIndicatorStyleType = {
//     size: 'large',
//     width: '100%',
//     height: 'auto',
//     color: Color.schemeOne.primary[300] as string,
// };

/**
 * Loading indicator container attributes.
 *
 * This object defines the style attributes for the container of loading indicators in the
 * application. It includes properties for width, height, flex, alignment, justification, and
 * overflow.
 *
 * @constant
 * @property {string} width - Sets the width of the container to 100%.
 * @property {string} height - Sets the height of the container to auto, allowing it to be
 *      determined by the content.
 * @property {number} flex - Sets the flex value of the container to 1, allowing it to grow and
 *      shrink as needed.
 * @property {string} alignItems - Aligns the items in the center of the container.
 * @property {string} justifyContent - Justifies the content in the center of the container.
 * @property {string} overflow - Sets the overflow property to hidden, preventing content from
 *      overflowing the container.
 */
// export const loadingIndicatorContainer: LoadingIndicatorContainerStyleType = {
//     width: '100%',
//     height: 'auto',
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     overflow: 'hidden',
//     backgroundColor: Color.background.light,
// };

/**
 * Loading indicator text attributes.
 *
 * This object defines the style attributes for text elements associated with loading
 * indicators in the application. It includes properties for padding, color, font size, font
 * weight, font family, and text alignment.
 *
 * @constant
 * @type {TextStyle}
 * @property {number} paddingVertical - Sets the vertical padding of the text based on the
 *      typography whiteSpace scale.
 * @property {number} paddingHorizontal - Sets the horizontal padding of the text based on the
 *      typography whiteSpace scale.
 * @property {string} color - Sets the color of the text based on the color scheme.
 * @property {number} fontSize - Sets the font size of the text.
 * @property {string} fontWeight - Sets the font weight of the text based on the typography
 *      fontWeight scale.
 * @property {string} fontFamily - Sets the font family of the text based on the typography
 *      fontFamily scale.
 * @property {string} textAlign - Aligns the text in the center.
 */
// export const loadingIndicatorText: LoadingIndicatorTextType = {
//     paddingVertical: Typography.whiteSpace[100],
//     paddingHorizontal: Typography.whiteSpace[100],
//     color: Color.text.dark,
//     fontSize: 16,
//     fontWeight: Typography.fontWeight.h4 as TextStyle['fontWeight'],
//     fontFamily: Typography.fontFamily.subHeader,
//     textAlign: 'center',
// };
