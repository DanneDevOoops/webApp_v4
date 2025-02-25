/**
 * @module StyleTypes
 *
 * This module defines various TypeScript interfaces for styling attributes.
 *
 * It includes interfaces for objects with numeric and string keys and values, as well as interfaces
 * for color schemes, color responses, background colors, and text colors.
 */

import { ColorValue } from 'react-native';

/**
 * Interface representing an object with numeric keys and string values.
 *
 * @interface NumKeyStrValuesAttributeType
 * @property {string} [key: number] - The value associated with the numeric key.
 */
export interface NumKeyStrValuesAttributeType {
    [key: number]: string;
}

/**
 * Interface representing an object with string keys and numeric values.
 *
 * @interface StrKeyNumValueAttributeType
 * @property {number} [key: string] - The value associated with the string key.
 */
export interface StrKeyNumValueAttributeType {
    [key: string]: number;
}

/**
 * Interface representing an object with numeric keys and numeric values.
 *
 * @interface NumKeyNumValueAttributeType
 * @property {number} [key: number] - The value associated with the numeric key.
 */
export interface NumKeyNumValueAttributeType {
    [key: number]: number;
}

/**
 * Interface representing an object with string keys and string values.
 *
 * @interface StrKeyStrValueAttributeType
 * @property {string} [key: string] - The value associated with the string key.
 */
export interface StrKeyStrValueAttributeType {
    [key: string]: string;
}

/**
 * ColorScheme interface.
 *
 * This interface defines a color scheme with optional color values for different shades.
 * Each property represents a shade of the color, ranging from 50 to 900.
 *
 * @interface
 * @property {ColorValue} [50] - Optional. The lightest shade of the color.
 * @property {ColorValue} [100] - Optional. A very light shade of the color.
 * @property {ColorValue} [200] - Optional. A light shade of the color.
 * @property {ColorValue} [300] - Optional. A lighter shade of the color.
 * @property {ColorValue} [400] - Optional. A medium-light shade of the color.
 * @property {ColorValue} [500] - Optional. The base shade of the color.
 * @property {ColorValue} [600] - Optional. A medium-dark shade of the color.
 * @property {ColorValue} [700] - Optional. A dark shade of the color.
 * @property {ColorValue} [800] - Optional. A darker shade of the color.
 * @property {ColorValue} [900] - Optional. The darkest shade of the color.
 */
export interface ColorScheme {
    50?: ColorValue;
    100?: ColorValue;
    200?: ColorValue;
    300?: ColorValue;
    400?: ColorValue;
    500?: ColorValue;
    600?: ColorValue;
    700?: ColorValue;
    800?: ColorValue;
    900?: ColorValue;
}

/**
 * ColorSchemeGroupInterface interface.
 *
 * This interface defines a color scheme with multiple color categories. Each category
 * (primary, secondary, tertiary, quarternary, quintary) is represented by a `ColorScheme`.
 *
 * @interface
 * @property {ColorScheme} primary - The primary color scheme.
 * @property {ColorScheme} secondary - The secondary color scheme.
 * @property {ColorScheme} tertiary - The tertiary color scheme.
 * @property {ColorScheme} quarternary - The quarternary color scheme.
 * @property {ColorScheme} quintary - The quintary color scheme.
 */
export interface ColorSchemeGroupInterface {
    primary: ColorScheme;
    secondary: ColorScheme;
    tertiary: ColorScheme;
    quarternary: ColorScheme;
    quintary: ColorScheme;
}

/**
 * Represents a color response interface with various indicator colors.
 *
 * @property {ColorScheme} info - Info indicator colors.
 * @property {ColorScheme} positive - Positive indicator colors.
 * @property {ColorScheme} [success] - Success indicator colors (optional).
 * @property {ColorScheme} caution - Caution indicator colors.
 * @property {ColorScheme} warning - Warning indicator colors.
 * @property {ColorScheme} [critical] - Critical indicator colors (optional).
 * @property {ColorScheme} [error] - Error indicator colors (optional).
 * @property {ColorScheme} link - Link indicator colors.
 * @property {ColorScheme} visited - Visited link indicator colors.
 */
export interface ColorResponseInterface {
    info: ColorScheme;
    positive: ColorScheme;
    success?: ColorScheme;
    caution: ColorScheme;
    warning: ColorScheme;
    critical?: ColorScheme;
    error?: ColorScheme;
    link: ColorScheme;
    visited: ColorScheme;
}

/**
 * Represents background color interface with light and dark color attributes.
 *
 * @property {NumKeyStrValuesAttributeType} light - Light background color attributes.
 * @property {NumKeyStrValuesAttributeType} dark - Dark background color attributes.
 */
export interface BgColorInterface {
    light: NumKeyStrValuesAttributeType;
    dark: NumKeyStrValuesAttributeType;
}

/**
 * Represents text color interface with light, dark, and disabled color attributes.
 *
 * @property {NumKeyStrValuesAttributeType} light - Light text color attributes.
 * @property {NumKeyStrValuesAttributeType} dark - Dark text color attributes.
 * @property {NumKeyStrValuesAttributeType} disabled - Disabled text color attributes.
 */
export interface TextColorInterface {
    light: NumKeyStrValuesAttributeType;
    dark: NumKeyStrValuesAttributeType;
    disabled: NumKeyStrValuesAttributeType;
}
