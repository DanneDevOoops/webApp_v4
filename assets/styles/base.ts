/**
 * @module base
 * This module defines base style attributes for UI components.
 *
 * It includes objects that specify the layout and appearance properties for the main container and content elements.
 * These attributes are used to style the visual appearance and layout behavior of these components in the user interface.
 */
// import * as Color from './colors';  // Use this if more colors are needed in the module styles.
import { background as bgColors } from './colors';

/**
 * Main Container attributes.
 *
 * @property {string} width - The width of the main container.
 * @property {string} height - The height of the main container.
 * @property {number} padding - The padding inside the main container.
 * @property {number} margin - The margin outside the main container.
 * @property {string} display - The display type of the main container.
 * @property {number} flex - The flex grow factor of the main container.
 * @property {string} flexDirection - The direction of the flex items in the main container.
 * @property {string} flexWrap - The wrapping behavior of the flex items in the main container.
 * @property {string} justifyContent - The alignment of the flex items along the main axis.
 * @property {number} gap - The gap between the flex items in the main container.
 * @property {string} backgroundColor - The background color of the main container.
 */
export const mainContainer = {
    width: '100%',
    height: 'auto',
    padding: 0,
    margin: 0,
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    gap: 0,
    backgroundColor: bgColors.light,
};

/**
 * Base Content Attributes.
 *
 * @property {number} flex - The flex grow factor of the content.
 * @property {string} backgroundColor - The background color of the content.
 */
export const content = {
    flex: 1,
    backgroundColor: bgColors.light,
};
