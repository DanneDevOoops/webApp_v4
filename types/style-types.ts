/**
 * @module types/style-types.ts
 *
 * Type definitions for style properties used in the application.
 *
 * @remarks
 * This module contains type definitions for various style-related properties,
 * such as font weights, used throughout the application.
 */

import { ViewStyle } from 'react-native';

/**
 * @typedef {Object} FontWeight
 *
 * Type definition for font weight.
 *
 * @remarks
 * This type represents the possible values for font weight, including:
 * - 'normal'
 * - 'bold'
 * - '100' to '900' (in increments of 100)
 */
export type FontWeight =
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';

/**
 * Defines the style for individual grid columns.
 *
 * @typedef {Object} GridColStyle
 * @property {ViewStyle} [key: number] - The style for a specific grid column.
 */
export type GridColStyle = {
    [key: number]: ViewStyle;
};
