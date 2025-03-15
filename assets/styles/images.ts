/**
 * @module images
 *
 * This module defines style attributes for various image components.
 *
 * It includes objects that specify the layout, appearance, and properties for images and image
 * containers. These attributes are used to style the visual appearance and layout behavior of
 * these image components in the user interface.
 */

import { Dimensions, ImageStyle } from 'react-native';
import { TypographyStyles as Typography } from './typography';
// import * as Typography from './typography';  // Uncomment this line to import full typography
// styles module.

/**
 * Cover Aspect Ratio attributes.
 *
 * @property {number} aspectRation - The aspect ratio of the cover, calculated as 16:6.
 */
export const coverAspectRation: {
    aspectRation: number;
} = {
    aspectRation: 16 / 6,
};

/**
 * Style for the image.
 *
 * @property {number} flex - Sets the flex value to 1, allowing the image to grow and shrink as
 *      needed.
 * @property {string} width - Sets the width of the image to 100%.
 * @property {undefined} height - Sets the height of the image to undefined, allowing it to be
 *      determined by the aspect ratio.
 * @property {number} aspectRatio - Sets the aspect ratio of the image based on the
 *      coverAspectRation.
 */
export const image: ImageStyle = {
    flex: 1,
    width: '100%',
    height: undefined,
    aspectRatio: coverAspectRation.aspectRation,
};

/**
 * Style for the image container.
 *
 * @property {string} alignItems - Aligns the items in the center horizontally.
 * @property {number} width - Sets the width of the image container to the screen width.
 * @property {number} height - Sets the height of the image container based on a 16:6 aspect ratio.
 * @property {number} marginBottom - Sets the bottom margin based on the typography whiteSpace
 *      scale.
 */
export const imageContainer: ImageStyle = {
    alignItems: 'center',
    width: Dimensions.get('screen').width,
    height: (Dimensions.get('screen').width / 16) * 6,
    marginBottom: Typography.whiteSpace[100],
};
