/**
 * @module assets/styles/forms.ts
 *
 * This module defines style attributes for various form components.
 * It includes objects that specify the layout, appearance, and properties for input fields,
 * text input fields, label input fields, picker components, and TabBar components. These
 * attributes are used to style the visual appearance and layout behavior of these form
 * components in the user interface.
 */

import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import * as Color from './colors';
import * as Container from './containers';
import { TypographyStyles as Typography } from './typography';

/**
 * FormStyles object.
 *
 * This object contains style definitions for various form components in the application.
 * It includes styles for input fields, text input fields, label input fields, picker components,
 * and TabBar components.
 *
 * @type {object}
 * @property {object} baseInput - Base style for input fields.
 * @property {string} baseInput.width - Sets the width of the input field to 100%.
 * @property {string} baseInput.height - Sets the height of the input field to auto.
 * @property {number} baseInput.paddingHorizontal - Sets the horizontal padding based on the
 * typography whiteSpace scale.
 * @property {number} baseInput.paddingVertical - Sets the vertical padding based on the
 * typography whiteSpace scale.
 * @property {number} baseInput.marginBottom - Sets the bottom margin based on the typography
 * whiteSpace scale.
 * @property {string} baseInput.alignSelf - Aligns the input field to the center horizontally.
 * @property {string} baseInput.justifySelf - Aligns the input field to the center vertically.
 * @property {number} baseInput.borderWidth - Sets the border width of the input field.
 * @property {number} baseInput.borderRadius - Sets the border radius of the input field.
 * @property {string} baseInput.borderColor - Sets the border color of the input field.
 * @property {string} baseInput.textAlign - Aligns the text to the left.
 * @property {string} baseInput.textAlignVertical - Aligns the text vertically to the middle.
 * @property {number} baseInput.fontSize - Sets the font size of the text.
 * @property {string} baseInput.fontFamily - Sets the font family of the text.
 * @property {string} baseInput.color - Sets the text color.
 * @property {string} baseInput.backgroundColor - Sets the background color of the input field.
 * @property {object} labelInputField - Style for label input fields.
 * @property {string} labelInputField.width - Sets the width of the label input field to 100%.
 * @property {number} labelInputField.height - Sets the height of the label input field to 30.
 * @property {number} labelInputField.paddingHorizontal - Sets the horizontal padding based on
 * the typography whiteSpace scale.
 * @property {number} labelInputField.paddingVertical - Sets the vertical padding based on the
 * typography whiteSpace scale.
 * @property {object} pickers - Style for picker components.
 * @property {string} pickers.width - Sets the width of the picker to 100%.
 * @property {number} pickers.maxHeight - Sets the maximum height of the picker to 10.
 * @property {number} pickers.paddingHorizontal - Sets the horizontal padding to 0.
 * @property {number} pickers.paddingVertical - Sets the vertical padding to 0.
 * @property {number} pickers.marginVertical - Sets the vertical margin to 0.
 * @property {number} pickers.marginHorizontal - Sets the horizontal margin to 0.
 * @property {object} textInputField - Style for text input fields.
 * @property {string} textInputField.width - Sets the width of the text input field to 100%.
 * @property {string} textInputField.height - Sets the height of the text input field to auto.
 * @property {number} textInputField.paddingHorizontal - Sets the horizontal padding based on
 * the typography whiteSpace scale.
 * @property {number} textInputField.paddingVertical - Sets the vertical padding based on the
 * typography whiteSpace scale.
 * @property {number} textInputField.marginBottom - Sets the bottom margin based on the
 * typography whiteSpace scale.
 * @property {string} textInputField.alignSelf - Aligns the text input field to the center
 * horizontally.
 * @property {string} textInputField.justifySelf - Aligns the text input field to the center
 * vertically.
 * @property {number} textInputField.borderWidth - Sets the border width of the text input field.
 * @property {number} textInputField.borderRadius - Sets the border radius of the text input field.
 * @property {string} textInputField.borderColor - Sets the border color of the text input field.
 * @property {string} textInputField.textAlign - Aligns the text to the left.
 * @property {string} textInputField.textAlignVertical - Aligns the text vertically to the middle.
 * @property {number} textInputField.fontSize - Sets the font size of the text.
 * @property {string} textInputField.fontFamily - Sets the font family of the text.
 * @property {string} textInputField.color - Sets the text color.
 * @property {string} textInputField.backgroundColor - Sets the background color of the text
 * input field.
 */
export const FormStyles = StyleSheet.create({
    baseInput: {
        width: '100%',
        height: 'auto',
        paddingHorizontal: Typography.whiteSpace[25],
        paddingVertical: Typography.whiteSpace[50],
        marginBottom: Typography.whiteSpace[25],

        alignSelf: 'center',

        // Border
        borderWidth: 0.5,
        borderRadius: Container.borderRadius.button,
        borderColor: Color.grayScale[100],

        // Fonts
        textAlign: 'left',
        textAlignVertical: 'center',
        fontSize: Typography.fontSize.text,
        fontFamily: Typography.fontFamily.text,
        color: Color.text.dark,
        backgroundColor: Color.background.light,
    } as TextStyle,

    labelInputField: {
        width: '100%',
        height: 30,
        paddingHorizontal: Typography.whiteSpace[25],
        paddingVertical: Typography.whiteSpace[50],
    } as ViewStyle,

    pickers: {
        width: '100%',
        maxHeight: 10,
        paddingHorizontal: 0,
        paddingVertical: 0,
        marginVertical: 0,
        marginHorizontal: 0,
    },

    textInputField: {} as TextStyle,
});

/**
 * Style for text input fields.
 *
 * This object defines the style attributes for text input fields.
 *
 * @type {TextStyle}
 * @property {string} width - Sets the width of the text input field to 100%.
 * @property {string} height - Sets the height of the text input field to auto.
 * @property {number} paddingHorizontal - Sets the horizontal padding based on the typography
 * whiteSpace scale.
 * @property {number} paddingVertical - Sets the vertical padding based on the typography
 * whiteSpace scale.
 * @property {number} marginBottom - Sets the bottom margin based on the typography whiteSpace
 * scale.
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
FormStyles.textInputField = {
    ...FormStyles.baseInput,
    backgroundColor: Color.schemeOne.primary[100],
};
