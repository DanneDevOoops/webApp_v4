/**
 * @module abstracts.ts
 *
 * This module defines style attributes for UI components, specifically focusing on abstract
 * properties. It includes objects that contain properties related to shadows and other abstract
 * styling attributes.
 */

/**
 * Abstracts Attributes.
 *
 * This object defines the abstract style attributes for UI components.
 *
 * @constant
 * @type {object}
 * @property {object} buttonOffset - The offset of the button shadow.
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
 * This object defines the shadow style attributes for UI components.
 *
 * @constant
 * @type {object}
 * @property {object} btnOffset - The offset of the button shadow.
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
