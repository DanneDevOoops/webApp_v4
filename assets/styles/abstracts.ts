/**
 * This module defines style attributes for UI components, specifically focusing on abstract
 * properties.
 *
 * It includes objects, which contain properties related to abstracts, such as shadows, etc.
 *
 */

/**
 * Abstracts Attributes.
 *
 * @property {Object} buttonOffset - The offset of the button shadow.
 * @property {number} buttonOffset.width - The horizontal offset of the button shadow.
 * @property {number} buttonOffset.height - The vertical offset of the button shadow.
 * @property {number} buttonOpacity - The opacity of the button shadow.
 * @property {number} buttonRadius - The radius of the button shadow.
 * @property {number} buttonElevation - The elevation of the button shadow.
 */
export const abstracts = {
    // Shadow properties
    buttonOffset: {
        width: 0.5,
        height: 1.5,
    },
    buttonOpacity: 0.4,
    buttonRadius: 1.5,
    buttonElevation: 2,
};

/**
 * Shadows Attributes.
 *
 * @property {Object} btnOffset - The offset of the button shadow.
 * @property {number} btnOffset.width - The horizontal offset of the button shadow.
 * @property {number} btnOffset.height - The vertical offset of the button shadow.
 * @property {number} buttonOpacity - The opacity of the button shadow.
 * @property {number} buttonRadius - The radius of the button shadow.
 * @property {number} buttonElevation - The elevation of the button shadow.
 */
export const shadow = {
    btnOffset: {
        width: 0.5,
        height: 1.5,
    },
    buttonOpacity: 0.3,
    buttonRadius: 1.5,
    buttonElevation: 2,
};
