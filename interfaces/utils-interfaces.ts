import { ColorValue, TextStyle, ViewStyle } from 'react-native';

/**
 * Defines the properties for the ScreenCover component.
 *
 * @interface ScreenCoverArguments
 * @property {string} image - The source URI of the image to be displayed as the cover. Can be a local or
 * remote URL.
 * @property {string} headerText - The text to be displayed over the image as a header.
 */
export interface ScreenCoverArguments {
    image: string;
    headerText: string;
}

/**
 * Describes the properties for specifying an image source in components.
 *
 * This interface is used to define the source of an image, supporting both local and remote images.
 * - `image`: A string specifying the path to a local image when using a local source.
 * - `headerText`: A string intended for accompanying text or description, not directly related to the
 * image source itself.
 * - `uri`: An optional string for specifying the URL of a remote image.
 */
export interface CoordinatesResponse {
    addresstype?: string;
    boundingbox?: string[];
    category?: string;
    display_name?: string;
    importance?: number;
    lat?: string;
    lon?: string;
    licence?: string;
    name?: string;
    osm_id?: number;
    place_id?: number;
    place_rank?: number;
    type?: string;
    // [key: string]: any;
}

/**
 * LoadingIndicatorStyleType interface.
 *
 * This interface extends the `ViewStyle` interface from React Native to include additional
 * properties specific to the loading indicator.
 *
 * @interface
 * @extends {ViewStyle}
 * @property {string} [size] - Optional. Sets the size of the loading indicator.
 * @property {string} [color] - Optional. Sets the color of the loading indicator.
 */
export interface LoadingIndicatorStyleType extends ViewStyle {
    size?: string;
    color?: string;
}

/**
 * LoadingIndicatorContainerStyleType interface.
 *
 * This interface extends the `ViewStyle` interface from React Native to include an additional
 * property specific to the loading indicator container.
 *
 * @interface
 * @extends {ViewStyle}
 * @property {ColorValue} [backgroundColor] - Optional. Sets the background color of the loading indicator container.
 */
export interface LoadingIndicatorContainerStyleType extends ViewStyle {
    backgroundColor?: ColorValue;
}

/**
 * LoadingIndicatorTextType interface.
 *
 * This interface extends the `TextStyle` interface from React Native to include additional
 * properties specific to the loading indicator text.
 *
 * @interface
 * @extends {TextStyle}
 * @property {TextStyle['fontWeight']} [fontWeight] - Optional. Sets the font weight of the loading indicator text.
 * @property {string} [color] - Optional. Sets the color of the loading indicator text.
 */
export interface LoadingIndicatorTextType extends TextStyle {
    fontWeight?: TextStyle['fontWeight'];
    color?: string;
}
