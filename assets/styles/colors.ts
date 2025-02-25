/**
 * @module colors
 *
 * This module defines the color attributes for the application.
 *
 * It includes objects that specify various properties related to color. These attributes are
 * used to style the visual appearance and layout behavior of the components throughout the
 * application.
 */

import {
    BgColorInterface,
    ColorResponseInterface,
    ColorSchemeGroupInterface,
    NumKeyStrValuesAttributeType,
    TextColorInterface,
} from '../../interfaces/StyleInterfaces';

/**
 * Color Scheme One.
 *
 * @property {Object} primary - Primary colors.
 * @property {string} primary.100 - Lightest primary color.
 * @property {string} primary.200 - Light primary color.
 * @property {string} primary.300 - Light-medium primary color.
 * @property {string} primary.400 - Medium primary color.
 * @property {string} primary.500 - Dark primary color.
 *
 * @property {Object} secondary - Secondary colors.
 * @property {string} secondary.100 - Lightest secondary color.
 * @property {string} secondary.200 - Light secondary color.
 * @property {string} secondary.300 - Light-medium secondary color.
 * @property {string} secondary.400 - Medium secondary color.
 * @property {string} secondary.500 - Dark secondary color.
 *
 * @property {Object} tertiary - Tertiary colors.
 * @property {string} tertiary.100 - Lightest tertiary color.
 * @property {string} tertiary.200 - Light tertiary color.
 * @property {string} tertiary.300 - Light-medium tertiary color.
 * @property {string} tertiary.400 - Medium tertiary color.
 * @property {string} tertiary.500 - Dark tertiary color.
 *
 * @property {Object} quarternary - Quarternary colors.
 * @property {string} quarternary.100 - Lightest quarternary color.
 * @property {string} quarternary.200 - Light quarternary color.
 * @property {string} quarternary.300 - Light-medium quarternary color.
 * @property {string} quarternary.400 - Medium quarternary color.
 * @property {string} quarternary.500 - Dark quarternary color.
 *
 * @property {Object} quintary - Quintary colors.
 * @property {string} quintary.100 - Lightest quintary color.
 * @property {string} quintary.200 - Light quintary color.
 * @property {string} quintary.300 - Light-medium quintary color.
 * @property {string} quintary.400 - Medium quintary color.
 * @property {string} quintary.500 - Dark quintary color.
 */
export const schemeOne: ColorSchemeGroupInterface = {
    primary: {
        100: '#F3F9F7',
        200: '#D0E8DE',
        300: '#A4CFBE',
        400: '#73AD95',
        500: '#479174',
    },
    secondary: {
        100: '#95B2B4',
        200: '#628A8E',
        300: '#417378',
        400: '#285F64',
        500: '#154A4F',
    },
    tertiary: {
        100: '#FEFEFD',
        200: '#FBFCF0',
        300: '#f4f7d9',
        400: '#D0D4A5',
        500: '#AEB473',
    },
    quarternary: {
        100: '#C1C4AB',
        200: '#95987E',
        300: '#6c6e58',
        400: '#373829',
        500: '#383B1C',
    },
    quintary: {
        100: '#959E8D',
        200: '#6A7265',
        300: '#3e423a',
        400: '#1B1F17',
        500: '#1B2211',
    },
};

/**
 * Background colors.
 *
 * @property {string} light - The light background color.
 * @property {string} dark - The dark background color.
 */
export const background: BgColorInterface = {
    light: '#ffffff',
    dark: '#2a2a2a',
};

/**
 * Text colors.
 *
 * @property {string} dark - The dark text color.
 * @property {string} disabled - The disabled text color.
 * @property {string} light - The light text color.
 */
export const text: TextColorInterface = {
    dark: '#1c1c1c',
    disabled: '#BFBFBF',
    light: '#fafafa',
};

/**
 * Gray Scale colors.
 *
 * @property {string} 50 - The lightest gray color.
 * @property {string} 100 - A light gray color.
 * @property {string} 200 - A medium-light gray color.
 * @property {string} 300 - A medium gray color.
 * @property {string} 400 - A medium-dark gray color.
 * @property {string} 500 - A dark gray color.
 * @property {string} 600 - A darker gray color.
 * @property {string} 700 - An even darker gray color.
 * @property {string} 800 - A very dark gray color.
 * @property {string} 900 - The darkest gray color.
 * @property {string} 1000 - The deepest gray color.
 */
export const grayScale: NumKeyStrValuesAttributeType = {
    50: '#F2F2F2',
    100: '#BFBFBF',
    200: '#8C8C8C',
    300: '#3F3F3F',
    400: '#1C1C1C',
    500: '#090909',
    600: '',
    700: '',
    800: '',
    900: '',
    1000: '#000000',
};

/**
 * Indicator colors, good for user guidance.
 *
 * @property {Object} info - Information indicator colors.
 * @property {string} info.50 - Lightest info color.
 * @property {string} info.100 - Light info color.
 * @property {string} info.200 - Light-medium info color.
 * @property {string} info.300 - Medium info color.
 * @property {string} info.400 - Medium-dark info color.
 * @property {string} info.500 - Dark info color.
 * @property {string} info.600 - Darker info color.
 * @property {string} info.700 - Even darker info color.
 * @property {string} info.800 - Very dark info color.
 * @property {string} info.900 - Darkest info color.
 * @property {string} info.1000 - Deepest info color.
 *
 * @property {Object} positive - Positive indicator colors.
 * @property {string} positive.100 - Lightest positive color.
 * @property {string} positive.200 - Light positive color.
 * @property {string} positive.300 - Light-medium positive color.
 * @property {string} positive.400 - Medium positive color.
 * @property {string} positive.500 - Dark positive color.
 * @property {string} positive.600 - Darker positive color.
 * @property {string} positive.700 - Even darker positive color.
 * @property {string} positive.800 - Very dark positive color.
 * @property {string} positive.900 - Darkest positive color.
 * @property {string} positive.1000 - Deepest positive color.
 *
 * @property {Object} caution - Caution indicator colors.
 * @property {string} caution.100 - Lightest caution color.
 * @property {string} caution.200 - Light caution color.
 * @property {string} caution.300 - Light-medium caution color.
 * @property {string} caution.400 - Medium caution color.
 * @property {string} caution.500 - Dark caution color.
 * @property {string} caution.600 - Darker caution color.
 * @property {string} caution.700 - Even darker caution color.
 * @property {string} caution.800 - Very dark caution color.
 * @property {string} caution.900 - Darkest caution color.
 * @property {string} caution.1000 - Deepest caution color.
 *
 * @property {Object} warning - Warning indicator colors.
 * @property {string} warning.100 - Lightest warning color.
 * @property {string} warning.200 - Light warning color.
 * @property {string} warning.300 - Light-medium warning color.
 * @property {string} warning.400 - Medium warning color.
 * @property {string} warning.500 - Dark warning color.
 * @property {string} warning.600 - Darker warning color.
 * @property {string} warning.700 - Even darker warning color.
 * @property {string} warning.800 - Very dark warning color.
 * @property {string} warning.900 - Darkest warning color.
 * @property {string} warning.1000 - Deepest warning color.
 *
 * @property {Object} link - Link indicator colors.
 * @property {string} link.100 - Lightest link color.
 * @property {string} link.200 - Light link color.
 * @property {string} link.300 - Light-medium link color.
 * @property {string} link.400 - Medium link color.
 * @property {string} link.500 - Dark link color.
 * @property {string} link.600 - Darker link color.
 * @property {string} link.700 - Even darker link color.
 * @property {string} link.800 - Very dark link color.
 * @property {string} link.900 - Darkest link color.
 * @property {string} link.1000 - Deepest link color.
 *
 * @property {Object} visited - Visited link indicator colors.
 * @property {string} visited.100 - Lightest visited link color.
 * @property {string} visited.200 - Light visited link color.
 * @property {string} visited.300 - Light-medium visited link color.
 * @property {string} visited.400 - Medium visited link color.
 * @property {string} visited.500 - Dark visited link color.
 * @property {string} visited.600 - Darker visited link color.
 * @property {string} visited.700 - Even darker visited link color.
 * @property {string} visited.800 - Very dark visited link color.
 * @property {string} visited.900 - Darkest visited link color.
 * @property {string} visited.1000 - Deepest visited link color.
 */
export const indicator: ColorResponseInterface = {
    info: {
        50: '#D9E8F3',
        100: '#D5E3F8',
        200: '#779CD2',
        300: '#527BB6',
        400: '#34609D',
        500: '#1A4B8D',
        600: '#10376F',
        700: '#082858',
        800: '#041A3C',
        900: '#011024',
        1000: '#011024',
    },
    positive: {
        100: '#6BD69F',
        200: '#40C180',
        300: '#24B36A',
        400: '#008240',
        500: '#016432',
        600: '#004D24',
        700: '#013317',
        800: '#002A11',
        900: '#001F0B',
        1000: '#00150A',
    },
    caution: {
        100: '#FFE764',
        200: '#FFE03A',
        300: '#FFD702',
        400: '#C7A800',
        500: '#9C8400',
        600: '#7A6A00',
        700: '#5C5200',
        800: '#443D00',
        900: '#332D00',
        1000: '#262100',
    },
    warning: {
        100: '#FC7278',
        200: '#F94852',
        300: '#ED1C24',
        400: '#C00611',
        500: '#980008',
        600: '#7A0006',
        700: '#5C0005',
        800: '#440003',
        900: '#330002',
        1000: '#260001',
    },
    link: {
        100: '#517CBB',
        200: '#3062AA',
        300: '#104AA1',
        400: '#0C397E',
        500: '#072C62',
        600: '#051F46',
        700: '#03152F',
        800: '#020D21',
        900: '#010716',
        1000: '#01030B',
    },
    visited: {
        100: '#9C6EBE',
        200: '#7B45A2',
        300: '#662C91',
        400: '#501879',
        500: '#3C0960',
        600: '#2D0348',
        700: '#1F002F',
        800: '#14001F',
        900: '#0C0013',
        1000: '#08000C',
    },
};

/**
 * Shadow colors.
 *
 * @property {string} 100 - The lightest shadow color.
 * @property {string} 200 - A light shadow color.
 * @property {string} 300 - A medium shadow color.
 * @property {string} 400 - A dark shadow color.
 * @property {string} 500 - The darkest shadow color.
 */
export const shadows: NumKeyStrValuesAttributeType = {
    100: '#BFBFBF',
    200: '#8C8C8C',
    300: '#3F3F3F',
    400: '#1C1C1C',
    500: '#090909',
};
