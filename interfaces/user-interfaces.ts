/**
 * @module user-interfaces.ts
 *
 * This module defines various interfaces related to user data and interactions.
 * These interfaces include properties for user positions.
 */

/**
 * UserPosition interface.
 *
 * This interface defines the structure for representing a user's geographical position,
 * including longitude, latitude, and optional altitude.
 *
 * @interface UserPosition
 * @property {number} longitude - The longitude of the user's position.
 * @property {number} latitude - The latitude of the user's position.
 * @property {number} [altitude] - Optional. The altitude of the user's position.
 */
export interface UserPosition {
    longitude: number;
    latitude: number;
    altitude?: number;
}
