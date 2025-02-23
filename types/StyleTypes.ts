/**
 * @module StyleTypes
 *
 * This module defines various TypeScript interfaces for styling attributes.
 *
 * It includes interfaces for objects with numeric and string keys and values, as well as interfaces
 * for color schemes, color responses, background colors, and text colors.
 */

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
 * Represents a color scheme interface with primary, secondary, tertiary, quarternary, and quintary color attributes.
 *
 * @property {NumKeyStrValuesAttributeType} primary - Primary color attributes.
 * @property {NumKeyStrValuesAttributeType} secondary - Secondary color attributes.
 * @property {NumKeyStrValuesAttributeType} tertiary - Tertiary color attributes.
 * @property {NumKeyStrValuesAttributeType} quarternary - Quarternary color attributes.
 * @property {NumKeyStrValuesAttributeType} quintary - Quintary color attributes.
 */
export interface ColorSchemeInterface {
    primary: NumKeyStrValuesAttributeType;
    secondary: NumKeyStrValuesAttributeType;
    tertiary: NumKeyStrValuesAttributeType;
    quarternary: NumKeyStrValuesAttributeType;
    quintary: NumKeyStrValuesAttributeType;
}

/**
 * Represents a color response interface with various indicator colors.
 *
 * @property {NumKeyStrValuesAttributeType} info - Info indicator colors.
 * @property {NumKeyStrValuesAttributeType} positive - Positive indicator colors.
 * @property {NumKeyStrValuesAttributeType} [success] - Success indicator colors (optional).
 * @property {NumKeyStrValuesAttributeType} caution - Caution indicator colors.
 * @property {NumKeyStrValuesAttributeType} warning - Warning indicator colors.
 * @property {NumKeyStrValuesAttributeType} [critical] - Critical indicator colors (optional).
 * @property {NumKeyStrValuesAttributeType} link - Link indicator colors.
 * @property {NumKeyStrValuesAttributeType} visited - Visited link indicator colors.
 */
export interface ColorResponseInterface {
    info: NumKeyStrValuesAttributeType;
    positive: NumKeyStrValuesAttributeType;
    success?: NumKeyStrValuesAttributeType;
    caution: NumKeyStrValuesAttributeType;
    warning: NumKeyStrValuesAttributeType;
    critical?: NumKeyStrValuesAttributeType;
    link: NumKeyStrValuesAttributeType;
    visited: NumKeyStrValuesAttributeType;
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
