/**
 * @module forms
 *
 * This module defines style attributes for various form components.
 *
 * It includes objects that specify the layout, appearance, and properties for input fields,
 * text input fields, label input fields, picker components, and TabBar components. These
 * attributes are used to style the visual appearance and layout behavior of these form
 * components in the user interface.
 */

import { ViewStyle } from 'react-native';
import * as Color from './colors';
import * as Container from './containers';
import * as Typography from './typography';

/**
 * Base style for input fields.
 *
 * @property {string} width - Sets the width of the input field to 100%.
 * @property {string} height - Sets the height of the input field to auto.
 * @property {number} paddingHorizontal - Sets the horizontal padding based  on the typography
 * whiteSpace scale.
 * @property {number} paddingVertical - Sets the vertical padding based on the typography
 *      whiteSpace scale.
 * @property {number} marginBottom - Sets the bottom margin based on the typography whiteSpace
 *      scale.
 * @property {string} alignSelf - Aligns the input field to the center horizontally.
 * @property {string} justifySelf - Aligns the input field to the center vertically.
 * @property {number} borderWidth - Sets the border width of the input field.
 * @property {number} borderRadius - Sets the border radius of the input field.
 * @property {string} borderColor - Sets the border color of the input field.
 * @property {string} textAlign - Aligns the text to the left.
 * @property {string} textAlignVertical - Aligns the text vertically to the middle.
 * @property {number} fontSize - Sets the font size of the text.
 * @property {string} fontFamily - Sets the font family of the text.
 * @property {string} color - Sets the text color.
 * @property {string} backgroundColor - Sets the background color of the input field.
 */
export const baseInput = {
    width: '100%',
    height: 'auto',
    paddingHorizontal: Typography.whiteSpace[25],
    paddingVertical: Typography.whiteSpace[50],
    marginBottom: Typography.whiteSpace[25],

    alignSelf: 'center',
    justifySelf: 'center',

    // Border
    borderWidth: 0.5,
    borderRadius: Container.borderRadius.button,
    borderColor: Color.grayScale[100],

    // Fonts
    textAlign: 'left',
    textAlignVertical: 'middle',
    fontSize: Typography.fontSize.text,
    fontFamily: Typography.fontFamily.text,
    color: Color.text.dark,
    backgroundColor: Color.background.light,
};

/**
 * Style for text input fields.
 *
 * @property {string} width - Sets the width of the text input field to 100%.
 * @property {string} height - Sets the height of the text input field to auto.
 * @property {number} paddingHorizontal - Sets the horizontal padding based on the typography
 *      whiteSpace scale.
 * @property {number} paddingVertical - Sets the vertical padding based on the typography
 *      whiteSpace scale.
 * @property {number} marginBottom - Sets the bottom margin based on the typography whiteSpace
 *      scale.
 * @property {string} alignSelf - Aligns the text input field to the center horizontally.
 * @property {string} justifySelf - Aligns the text input field to the center vertically.
 * @property {number} borderWidth - Sets the border width of the text input field.
 * @property {number} borderRadius - Sets the border radius of the text input field.
 * @property {string} borderColor - Sets the border color of the text input field.
 * @property {string} textAlign - Aligns the text to the left.
 * @property {string} textAlignVertical - Aligns the text vertically to the middle.
 * @property {number} fontSize - Sets the font size of the text.
 * @property {string} fontFamily - Sets the font family of the text.
 * @property {string} color - Sets the text color.
 * @property {string} backgroundColor - Sets the background color of the text input field.
 */
export const textInputField = {
    ...baseInput,
    backgroundColor: Color.schemeOne.primary[100],
};

/**
 * Style for label input fields.
 *
 * @property {string} width - Sets the width of the label input field to 100%.
 * @property {number} height - Sets the height of the label input field to 30.
 * @property {number} paddingHorizontal - Sets the horizontal padding based on the typography
 *      whiteSpace scale.
 * @property {number} paddingVertical - Sets the vertical padding based on the typography
 *      whiteSpace scale.
 */
export const labelInputField: ViewStyle = {
    width: '100%',
    height: 30,
    paddingHorizontal: Typography.whiteSpace[25],
    paddingVertical: Typography.whiteSpace[50],
};

/**
 * Style for picker components.
 *
 * @property {string} width - Sets the width of the picker to 100%.
 * @property {number} maxHeight - Sets the maximum height of the picker to 10.
 * @property {number} paddingHorizontal - Sets the horizontal padding to 0.
 * @property {number} paddingVertical - Sets the vertical padding to 0.
 * @property {number} marginVertical - Sets the vertical margin to 0.
 * @property {number} marginHorizontal - Sets the horizontal margin to 0.
 */
export const pickers: ViewStyle = {
    width: '100%',
    maxHeight: 10,
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginVertical: 0,
    marginHorizontal: 0,
};

/**
 * Styles for the TabBar component.
 */
export const TabBarStyles = {
    /**
     * Style for the tab bar container.
     *
     * @property {string} width - Sets the width of the tab bar to 100%.
     * @property {string} height - Sets the height of the tab bar to auto.
     * @property {number} paddingHorizontal - Sets the horizontal padding to 0.
     * @property {string} backgroundColor - Sets the background color of the tab bar.
     */
    tabBar: {
        width: '100%',
        height: 'auto',
        paddingHorizontal: 0,
        backgroundColor: Color.indicator.caution[100],
    },

    /**
     * Style for individual tabs.
     *
     * @property {string} width - Sets the width of the tab to auto.
     * @property {number} padding - Sets the padding of the tab to 0.
     */
    tab: {
        width: 'auto',
        padding: 0,
    },

    /**
     * Style for the tab indicator.
     *
     * @property {string} backgroundColor - Sets the background color of the tab indicator.
     */
    indicator: {
        backgroundColor: '#000',
    },
};
