/**
 * Represents a color attribute type where the key is a number and the value is a string.
 */
export interface ColorAttributeType {
    [key: number]: string;
}

/**
 * Represents a color scheme interface with primary, secondary, tertiary, quarternary, and quintary color attributes.
 *
 * @property {ColorAttributeType} primary - Primary color attributes.
 * @property {ColorAttributeType} secondary - Secondary color attributes.
 * @property {ColorAttributeType} tertiary - Tertiary color attributes.
 * @property {ColorAttributeType} quarternary - Quarternary color attributes.
 * @property {ColorAttributeType} quintary - Quintary color attributes.
 */
export interface ColorSchemeInterface {
    primary: ColorAttributeType;
    secondary: ColorAttributeType;
    tertiary: ColorAttributeType;
    quarternary: ColorAttributeType;
    quintary: ColorAttributeType;
}

/**
 * Represents a color response interface with various indicator colors.
 *
 * @property {ColorAttributeType} info - Info indicator colors.
 * @property {ColorAttributeType} positive - Positive indicator colors.
 * @property {ColorAttributeType} [success] - Success indicator colors (optional).
 * @property {ColorAttributeType} caution - Caution indicator colors.
 * @property {ColorAttributeType} warning - Warning indicator colors.
 * @property {ColorAttributeType} [critical] - Critical indicator colors (optional).
 * @property {ColorAttributeType} link - Link indicator colors.
 * @property {ColorAttributeType} visited - Visited link indicator colors.
 */
export interface ColorResponseInterface {
    info: ColorAttributeType;
    positive: ColorAttributeType;
    success?: ColorAttributeType;
    caution: ColorAttributeType;
    warning: ColorAttributeType;
    critical?: ColorAttributeType;
    link: ColorAttributeType;
    visited: ColorAttributeType;
}

/**
 * Represents background color interface with light and dark color attributes.
 *
 * @property {ColorAttributeType} light - Light background color attributes.
 * @property {ColorAttributeType} dark - Dark background color attributes.
 */
export interface BgColorInterface {
    light: ColorAttributeType;
    dark: ColorAttributeType;
}

/**
 * Represents text color interface with light, dark, and disabled color attributes.
 *
 * @property {ColorAttributeType} light - Light text color attributes.
 * @property {ColorAttributeType} dark - Dark text color attributes.
 * @property {ColorAttributeType} disabled - Disabled text color attributes.
 */
export interface TextColorInterface {
    light: ColorAttributeType;
    dark: ColorAttributeType;
    disabled: ColorAttributeType;
}
