/**
 * Type definitions for style properties used in the application.
 *
 * This module contains type definitions for various style-related properties,
 * such as font weights, used throughout the application.
 */

/**
 * Type definition for font weight.
 *
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
