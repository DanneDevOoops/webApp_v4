/**
 * @module buttons.ts
 *
 * This module defines style attributes for various button components.
 * It includes objects that specify the layout, appearance, and shadow properties for base
 * buttons, list buttons, and button containers. These attributes are used to style the visual
 * appearance and layout behavior of these button components in the user interface.
 */

import { StyleSheet } from 'react-native';

import * as Abstract from './abstracts';
import * as Color from './colors';
import { TypographyStyles as Typography } from './typography';
import * as Variable from './variables';

/**
 * Base button properties.
 *
 * @constant
 * @type {object}
 * @property {string} overflow - The overflow behavior of the button.
 * @property {string} width - The width of the button.
 * @property {string} height - The height of the button.
 * @property {number} paddingHorizontal - The horizontal padding inside the button.
 * @property {number} paddingVertical - The vertical padding inside the button.
 * @property {number} marginVertical - The vertical margin outside the button.
 * @property {number} marginHorizontal - The horizontal margin outside the button.
 * @property {string} alignSelf - The alignment of the button itself.
 * @property {number} borderRadius - The border radius of the button.
 * @property {string} backgroundColor - The background color of the button.
 * @property {string} shadowColor - The color of the button shadow.
 * @property {object} shadowOffset - The offset of the button shadow.
 * @property {number} shadowOffset.width - The horizontal offset of the button shadow.
 * @property {number} shadowOffset.height - The vertical offset of the button shadow.
 * @property {number} shadowOpacity - The opacity of the button shadow.
 * @property {number} shadowRadius - The radius of the button shadow.
 * @property {number} elevation - The elevation of the button.
 */

const ButtonBase = StyleSheet.create({
    button: {
        overflow: 'hidden',
        width: '100%',
        height: 'auto',
        paddingHorizontal: Typography.whiteSpace[50],
        paddingVertical: Typography.whiteSpace[25],
        marginVertical: Typography.whiteSpace[25],
        marginHorizontal: Typography.whiteSpace[10],
        alignSelf: 'center',
        borderRadius: Variable.borderRadius.button,
        backgroundColor: Color.background.light,
        shadowColor: Color.shadows[400],
        shadowOffset: Abstract.shadow.btnOffset,
        shadowOpacity: Abstract.shadow.buttonOpacity,
        shadowRadius: Abstract.shadow.buttonRadius,
        elevation: Abstract.abstracts.buttonElevation,
    },
});

/**
 * ButtonStyles object.
 *
 * This object contains style definitions for various button components in the application.
 * It includes styles for list buttons and button containers.
 *
 * @constant
 * @type {object}
 * @property {object} listButton - Styles for list buttons.
 * @property {string} listButton.backgroundColor - The background color of the list button.
 * @property {object} buttonContainer - Styles for button containers.
 * @property {string} buttonContainer.backgroundColor - The background color of the button container.
 */
export const ButtonStyles = StyleSheet.create({
    listButton: {
        ...ButtonBase.button,
        backgroundColor: Color.schemeOne.primary[300],
    },

    buttonContainer: {
        ...ButtonBase.button,
        backgroundColor: Color.schemeOne.primary[300],
    },
});
