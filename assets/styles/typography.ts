/**
 * Typography module.
 *
 * This module defines various typography-related styles used throughout the application.
 * It includes definitions for font sizes, font weights, font families, white space values,
 * and specific text styles for headers, sub-headers, paragraphs, data fields, buttons, and flash messages.
 *
 * The styles are organized into objects that can be imported and used in React Native components
 * to ensure consistent typography across the application.
 *
 * @module typography
 */

import { TextStyle } from 'react-native';

import * as Color from './colors';
import {
    NumKeyNumValueAttributeType,
    StrKeyNumValueAttributeType,
    StrKeyStrValueAttributeType,
} from '../../interfaces/StyleInterfaces';

/**
 * White space values for typography.
 *
 * This object defines various white space values used for padding and margin in the application.
 * The keys represent different scales, and the values are the corresponding white space amounts.
 *
 * @constant
 * @type {NumKeyNumValueAttributeType}
 * @property {number} 10 - White space value for scale 10.
 * @property {number} 25 - White space value for scale 25.
 * @property {number} 50 - White space value for scale 50.
 * @property {number} 75 - White space value for scale 75.
 * @property {number} 100 - White space value for scale 100.
 * @property {number} 200 - White space value for scale 200.
 */
export const whiteSpace: NumKeyNumValueAttributeType = {
    10: 1.82,
    25: 4.55,
    50: 9.1,
    75: 13.65,
    100: 18.2,
    200: 36.4,
};

/**
 * Font size values for typography.
 *
 * This object defines various font size values used for text elements in the application.
 * The keys represent different text elements, and the values are the corresponding font sizes.
 *
 * @constant
 * @type {StrKeyNumValueAttributeType}
 * @property {number} h1 - Font size for heading 1.
 * @property {number} h2 - Font size for heading 2.
 * @property {number} h3 - Font size for heading 3.
 * @property {number} h4 - Font size for heading 4.
 * @property {number} h5 - Font size for heading 5.
 * @property {number} h6 - Font size for heading 6.
 * @property {number} text - Font size for regular text.
 * @property {number} smallText - Font size for small text.
 * @property {number} miniText - Font size for mini text.
 */
export const fontSize: StrKeyNumValueAttributeType = {
    h1: 54.71,
    h2: 41.05,
    h3: 30.79,
    h4: 23.1,
    h5: 17.33,
    h6: 13,
    text: 13,
    smallText: 7.5,
    miniText: 5.63,
};

/**
 * Font weight values for typography.
 *
 * This object defines various font weight values used for text elements in the application.
 * The keys represent different text elements, and the values are the corresponding font weights.
 *
 * @constant
 * @type {StrKeyStrValueAttributeType}
 * @property {string} h1 - Font weight for heading 1.
 * @property {string} h2 - Font weight for heading 2.
 * @property {string} h3 - Font weight for heading 3.
 * @property {string} h4 - Font weight for heading 4.
 * @property {string} h5 - Font weight for heading 5.
 * @property {string} text - Font weight for regular text.
 * @property {string} btn - Font weight for buttons.
 */
export const fontWeight: StrKeyStrValueAttributeType = {
    h1: '400',
    h2: '400',
    h3: '400',
    h4: '400',
    h5: '400',
    text: '400',
    btn: '600',
};

/**
 * Font family values for typography.
 *
 * This object defines various font family values used for text elements in the application.
 * The keys represent different text elements, and the values are the corresponding font families.
 *
 * @constant
 * @type {StrKeyStrValueAttributeType}
 * @property {string} header - Font family for headers.
 * @property {string} subHeader - Font family for sub-headers.
 * @property {string} text - Font family for regular text.
 * @property {string} quotes - Font family for quotes.
 * @property {string} btn - Font family for buttons.
 * @property {string} btn2 - Font family for secondary buttons.
 */
export const fontFamily: StrKeyStrValueAttributeType = {
    header: 'OleoScriptSwashCaps_400Regular',
    subHeader: 'JosefinSans_600SemiBold',
    text: 'Merriweather_400Regular',
    quotes: 'Merriweather_400Regular_Italic',
    btn: 'JosefinSans_600SemiBold',
    btn2: 'Merriweather_700Bold',
};

/**
 * Header attributes.
 *
 * This object defines the style attributes for header text elements in the application.
 * It includes properties for width, height, padding, text alignment, font size, font weight,
 * font family, and color.
 *
 * @constant
 * @type {TextStyle}
 * @property {string} width - Sets the width of the header to 100%.
 * @property {undefined} height - Sets the height of the header to undefined, allowing it to be
 *      determined by the content.
 * @property {number} paddingVertical - Sets the vertical padding of the header based on the
 *      typography whiteSpace scale.
 * @property {number} paddingHorizontal - Sets the horizontal padding of the header based on the
 *      typography whiteSpace scale.
 * @property {string} textAlign - Aligns the text in the center.
 * @property {number} fontSize - Sets the font size of the header based on the typography fontSize
 *      scale.
 * @property {string} fontWeight - Sets the font weight of the header based on the typography
 *      fontWeight scale.
 * @property {string} fontFamily - Sets the font family of the header based on the typography
 *      fontFamily scale.
 * @property {string} color - Sets the color of the header text based on the color scheme.
 */
export const header: TextStyle = {
    width: '100%',
    height: undefined,
    paddingVertical: whiteSpace[200],
    paddingHorizontal: whiteSpace[100],

    textAlign: 'center',
    fontSize: fontSize.h1,
    fontWeight: fontWeight.h1 as TextStyle['fontWeight'],
    fontFamily: fontFamily.header,

    color: Color.text.light,
};

/**
 * Sub Header attributes.
 *
 * This object defines the style attributes for sub-header text elements in the application.
 * It includes properties for alignment, padding, margin, font size, font family, color, and text
 * transformation.
 *
 * @constant
 * @type {TextStyle}
 * @property {string} alignSelf - Aligns the sub-header in the center.
 * @property {number} paddingVertical - Sets the vertical padding of the sub-header based on the
 *      typography whiteSpace scale.
 * @property {number} marginBottom - Sets the bottom margin of the sub-header based on the
 *      typography whiteSpace scale.
 * @property {number} fontSize - Sets the font size of the sub-header based on the typography
 *      fontSize scale.
 * @property {string} fontFamily - Sets the font family of the sub-header based on the typography
 *      fontFamily scale.
 * @property {string} color - Sets the color of the sub-header text based on the color scheme.
 * @property {string} textTransform - Transforms the text to uppercase.
 */
export const subHeader: TextStyle = {
    alignSelf: 'center',
    paddingVertical: whiteSpace[50],
    marginBottom: whiteSpace[100],
    fontSize: fontSize.h4,
    fontFamily: fontFamily.subHeader,
    color: Color.text.dark,
    textTransform: 'uppercase',
};

/**
 * Paragraph attributes.
 *
 * This object defines the style attributes for paragraph text elements in the application.
 * It includes properties for width, height, padding, text alignment, font size, font weight,
 * font family, and flex wrapping.
 *
 * @constant
 * @type {TextStyle}
 * @property {string} width - Sets the width of the paragraph to 100%.
 * @property {string} height - Sets the height of the paragraph to auto, allowing it to be
 *      determined by the content.
 * @property {number} paddingHorizontal - Sets the horizontal padding of the paragraph based on the
 *      typography whiteSpace scale.
 * @property {number} paddingVertical - Sets the vertical padding of the paragraph based on the
 *      typography whiteSpace scale.
 * @property {string} flexWrap - Allows the text to wrap within the paragraph.
 * @property {string} textAlign - Aligns the text to the left.
 * @property {number} fontSize - Sets the font size of the paragraph based on the typography fontSize
 *      scale.
 * @property {string} fontWeight - Sets the font weight of the paragraph based on the typography
 *      fontWeight scale.
 * @property {string} fontFamily - Sets the font family of the paragraph based on the typography
 *      fontFamily scale.
 */
export const paragraph: TextStyle = {
    width: '100%',
    height: 'auto',
    paddingHorizontal: whiteSpace[75],
    paddingVertical: whiteSpace[50],
    flexWrap: 'wrap',
    textAlign: 'left',
    fontSize: fontSize.text,
    fontWeight: fontWeight.text as TextStyle['fontWeight'],
    fontFamily: fontFamily.text,
};

/**
 * Base Data Field attributes.
 *
 * This object defines the style attributes for base data field text elements in the application.
 * It includes properties for flex wrapping, padding, font size, font weight, and font family.
 *
 * @constant
 * @type {TextStyle}
 * @property {string} flexWrap - Allows the text to wrap within the data field.
 * @property {number} paddingHorizontal - Sets the horizontal padding of the data field based on the
 *      typography whiteSpace scale.
 * @property {number} paddingBottom - Sets the bottom padding of the data field based on the
 *      typography whiteSpace scale.
 * @property {number} fontSize - Sets the font size of the data field based on the typography fontSize
 *      scale.
 * @property {string} fontWeight - Sets the font weight of the data field based on the typography
 *      fontWeight scale.
 * @property {string} fontFamily - Sets the font family of the data field based on the typography
 *      fontFamily scale.
 */
export const baseDataField: TextStyle = {
    flexWrap: 'wrap',
    paddingHorizontal: whiteSpace[25],
    paddingBottom: whiteSpace[25],
    fontSize: fontSize.text,
    fontWeight: fontWeight.text as TextStyle['fontWeight'],
    fontFamily: fontFamily.text,
    color: Color.text.dark,
};

/**
 * Data to the left attributes.
 *
 * This object defines the style attributes for data fields aligned to the left in the application.
 * It includes properties for flex wrapping, padding, font size, font weight, font family, and
 * text alignment.
 *
 * @constant
 * @type {TextStyle}
 * @property {string} flexWrap - Allows the text to wrap within the data field.
 * @property {number} paddingHorizontal - Sets the horizontal padding of the data field based
 *      on the typography whiteSpace scale.
 * @property {number} paddingBottom - Sets the bottom padding of the data field based on the
 *      typography whiteSpace scale.
 * @property {number} fontSize - Sets the font size of the data field based on the typography
 *      fontSize scale.
 * @property {string} fontWeight - Sets the font weight of the data field based on the
 *      typography fontWeight scale.
 * @property {string} fontFamily - Sets the font family of the data field based on the
 *      typography fontFamily scale.
 * @property {string} textAlign - Aligns the text to the left.
 */
export const dataLeft: TextStyle = {
    ...baseDataField,
    textAlign: 'left',
    color: Color.text.dark,
};

/**
 * Data placed centered attributes.
 *
 * This object defines the style attributes for data fields aligned to the center in the
 * application. It includes properties for flex wrapping, padding, font size, font weight, font
 * family, and text alignment.
 *
 * @constant
 * @type {TextStyle}
 * @property {string} flexWrap - Allows the text to wrap within the data field.
 * @property {number} paddingHorizontal - Sets the horizontal padding of the data field based
 *      on the typography whiteSpace scale.
 * @property {number} paddingBottom - Sets the bottom padding of the data field based on the
 *      typography whiteSpace scale.
 * @property {number} fontSize - Sets the font size of the data field based on the typography
 *      fontSize scale.
 * @property {string} fontWeight - Sets the font weight of the data field based on the
 *      typography fontWeight scale.
 * @property {string} fontFamily - Sets the font family of the data field based on the
 *      typography fontFamily scale.
 * @property {string} textAlign - Aligns the text to the center.
 */
export const dataCenter: TextStyle = {
    ...baseDataField,
    textAlign: 'center',
    color: Color.text.dark,
};

/**
 * Data to the right attributes.
 *
 * This object defines the style attributes for data fields aligned to the right in the
 *  application. It includes properties for flex wrapping, padding, font size, font weight, font
 *  family, and text alignment.
 *
 * @constant
 * @type {TextStyle}
 * @property {string} flexWrap - Allows the text to wrap within the data field.
 * @property {number} paddingHorizontal - Sets the horizontal padding of the data field based
 *      on the typography whiteSpace scale.
 * @property {number} paddingBottom - Sets the bottom padding of the data field based on the
 *      typography whiteSpace scale.
 * @property {number} fontSize - Sets the font size of the data field based on the typography
 *      fontSize scale.
 * @property {string} fontWeight - Sets the font weight of the data field based on the
 *      typography fontWeight scale.
 * @property {string} fontFamily - Sets the font family of the data field based on the
 *      typography fontFamily scale.
 * @property {string} textAlign - Aligns the text to the right.
 */
export const dataRight: TextStyle = {
    ...baseDataField,
    textAlign: 'right',
};

/**
 * End margin text attributes.
 *
 * This object defines the style attributes for text elements with a bottom margin in the
 * application. It includes a property for the bottom margin.
 *
 * @constant
 * @type {TextStyle}
 * @property {number} marginBottom - Sets the bottom margin of the text based on the typography
 * whiteSpace scale.
 */
export const endMarginText: TextStyle = {
    marginBottom: whiteSpace[100],
};

/**
 * Button text attributes.
 *
 * This object defines the style attributes for button text elements in the application.
 * It includes properties for width, height, padding, alignment, font size, font weight, font
 * family, and color.
 *
 * @constant
 * @type {TextStyle}
 * @property {string} width - Sets the width of the button text to 100%.
 * @property {string} height - Sets the height of the button text to auto, allowing it to be
 *      determined by the content.
 * @property {number} paddingVertical - Sets the vertical padding of the button text based on
 *      the typography whiteSpace scale.
 * @property {number} paddingHorizontal - Sets the horizontal padding of the button text based
 *      on the typography whiteSpace scale.
 * @property {string} alignSelf - Aligns the button text in the center.
 * @property {string} textAlign - Aligns the text in the center.
 * @property {string} fontFamily - Sets the font family of the button text based on the
 *      typography fontFamily scale.
 * @property {number} fontSize - Sets the font size of the button text based on the typography
 *      fontSize scale.
 * @property {string} fontWeight - Sets the font weight of the button text based on the
 *      typography fontWeight scale.
 * @property {string} color - Sets the color of the button text based on the color scheme.
 */
export const buttonText: TextStyle = {
    width: '100%',
    height: 'auto',
    paddingVertical: whiteSpace[50],
    paddingHorizontal: whiteSpace[50],
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: fontFamily.btn,
    fontSize: fontSize.h5,
    fontWeight: fontWeight.btn as TextStyle['fontWeight'],
    color: Color.text.dark,
};

/**
 * Base flash message attributes.
 *
 * This object defines the style attributes for base flash message text elements in the
 * application. It includes properties for text alignment, font weight, font family, and color.
 *
 * @constant
 * @type {TextStyle}
 * @property {string} textAlign - Aligns the text in the center.
 * @property {string} fontWeight - Sets the font weight of the flash message text based on the
 *      typography fontWeight scale.
 * @property {string} fontFamily - Sets the font family of the flash message text based on the
 *      typography fontFamily scale.
 * @property {string} color - Sets the color of the flash message text based on the color scheme.
 */
const baseFlashMessage: TextStyle = {
    textAlign: 'center',
    fontWeight: fontWeight.text as TextStyle['fontWeight'],
    fontFamily: fontFamily.btn,
    color: Color.text.light as TextStyle['color'],
};

/**
 * Info flash message attributes.
 *
 * This object defines the style attributes for info flash message text elements in the application.
 * It includes properties for text alignment, font weight, font family, font size, and color.
 *
 * @constant
 * @type {TextStyle}
 * @property {string} textAlign - Aligns the text in the center.
 * @property {string} fontWeight - Sets the font weight of the flash message text based on the
 *      typography fontWeight scale.
 * @property {string} fontFamily - Sets the font family of the flash message text based on the
 *      typography fontFamily scale.
 * @property {number} fontSize - Sets the font size of the flash message text based on the
 *      typography fontSize scale.
 * @property {string} color - Sets the color of the flash message text based on the color scheme.
 */
export const infoFlashMsg: TextStyle = {
    ...baseFlashMessage,
    fontSize: fontSize.h5,
    color: Color.indicator.info[50],
};

/**
 * Success flash message attributes.
 *
 * This object defines the style attributes for success flash message text elements in the
 * application. It includes properties for text alignment, font weight, font family, font size,
 * and color.
 *
 * @constant
 * @type {TextStyle}
 * @property {string} textAlign - Aligns the text in the center.
 * @property {string} fontWeight - Sets the font weight of the flash message text based on the
 *      typography fontWeight scale.
 * @property {string} fontFamily - Sets the font family of the flash message text based on the
 *      typography fontFamily scale.
 * @property {number} fontSize - Sets the font size of the flash message text based on the
 *      typography fontSize scale.
 */
export const successFlashMsg: TextStyle = {
    ...baseFlashMessage,
    fontSize: fontSize.h5,
};

/**
 * Caution flash message attributes.
 *
 * This object defines the style attributes for caution flash message text elements in the
 * application. It includes properties for text alignment, font weight, font family, and font size.
 *
 * @constant
 * @type {TextStyle}
 * @property {string} textAlign - Aligns the text in the center.
 * @property {string} fontWeight - Sets the font weight of the flash message text based on the
 *      typography fontWeight scale.
 * @property {string} fontFamily - Sets the font family of the flash message text based on the
 *      typography fontFamily scale.
 * @property {number} fontSize - Sets the font size of the flash message text based on the
 *      typography fontSize scale.
 */
export const cautionFlashMsg: TextStyle = {
    ...baseFlashMessage,
    fontSize: fontSize.text,
};

/**
 * Warning flash message attributes.
 *
 * This object defines the style attributes for warning flash message text elements in the
 * application. It includes properties for text alignment, font weight, font family, and font size.
 *
 * @constant
 * @type {TextStyle}
 * @property {string} textAlign - Aligns the text in the center.
 * @property {string} fontWeight - Sets the font weight of the flash message text based on the
 *      typography fontWeight scale.
 * @property {string} fontFamily - Sets the font family of the flash message text based on the
 *      typography fontFamily scale.
 * @property {number} fontSize - Sets the font size of the flash message text based on the
 *      typography fontSize scale.
 */
export const warningFlashMsg: TextStyle = {
    ...baseFlashMessage,
    fontSize: fontSize.text,
};
