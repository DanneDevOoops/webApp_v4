/**
 * @module interfaces/utils-interfaces.ts
 *
 * This module defines various utility interfaces used throughout the application.
 * These interfaces include properties for screen covers, coordinates responses,
 * and styles for loading indicators.
 */

import { ColorValue, TextStyle, ViewStyle } from 'react-native';

/**
 * Defines the properties for the ScreenCover component.
 *
 * This interface outlines the structure for the arguments passed to the ScreenCover component,
 * including the image source and header text.
 *
 * @interface ScreenCoverArguments
 * @property {string} image - The source URI of the image to be displayed as the cover. Can be
 * a local or remote URL.
 * @property {string} headerText - The text to be displayed over the image as a header.
 */
export interface ScreenCoverArguments {
    image: string;
    headerText: string;
}

/**
 * Describes the properties for specifying an image source in components.
 *
 * This interface is used to define the source of an image, supporting both local and remote
 * images.
 *
 * @interface CoordinatesResponse
 * @property {string} [addresstype] - Optional. The type of address.
 * @property {string[]} [boundingbox] - Optional. The bounding box coordinates.
 * @property {string} [category] - Optional. The category of the location.
 * @property {string} [display_name] - Optional. The display name of the location.
 * @property {number} [importance] - Optional. The importance of the location.
 * @property {string} [lat] - Optional. The latitude of the location.
 * @property {string} [lon] - Optional. The longitude of the location.
 * @property {string} [licence] - Optional. The licence information.
 * @property {string} [name] - Optional. The name of the location.
 * @property {number} [osm_id] - Optional. The OpenStreetMap ID.
 * @property {number} [place_id] - Optional. The place ID.
 * @property {number} [place_rank] - Optional. The rank of the place.
 * @property {string} [type] - Optional. The type of the location.
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
 * @interface LoadingIndicatorStyleType
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
 * @interface LoadingIndicatorContainerStyleType
 * @extends {ViewStyle}
 * @property {ColorValue} [backgroundColor] - Optional. Sets the background color of the
 * loading indicator container.
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
 * @interface LoadingIndicatorTextType
 * @extends {TextStyle}
 * @property {TextStyle['fontWeight']} [fontWeight] - Optional. Sets the font weight of the
 * loading indicator text.
 * @property {string} [color] - Optional. Sets the color of the loading indicator text.
 */
export interface LoadingIndicatorTextType extends TextStyle {
    fontWeight?: TextStyle['fontWeight'];
    color?: string;
}
