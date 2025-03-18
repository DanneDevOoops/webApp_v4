/**
 * @module assets/styles/menus.ts
 *
 * This module defines the styles for various menu components in the application.
 * It includes styles for the tab bar, individual tabs, and the tab indicator.
 */

import { StyleSheet, ViewStyle } from 'react-native';

import * as Color from './colors';

/**
 * MenuStyles object.
 *
 * This object contains style definitions for various menu components in the application.
 * It includes styles for the tab bar, individual tabs, and the tab indicator.
 *
 * @type {object}
 * @property {object} tabBar - Styles for the tab bar container.
 * @property {string} tabBar.width - Sets the width of the tab bar to 100%.
 * @property {string} tabBar.height - Sets the height of the tab bar to auto.
 * @property {number} tabBar.paddingHorizontal - Sets the horizontal padding to 0.
 * @property {string} tabBar.backgroundColor - Sets the background color of the tab bar.
 * @property {object} tab - Styles for individual tabs.
 * @property {string} tab.width - Sets the width of the tab to auto.
 * @property {number} tab.padding - Sets the padding of the tab to 0.
 * @property {object} indicator - Styles for the tab indicator.
 * @property {string} indicator.backgroundColor - Sets the background color of the tab indicator.
 */
export const MenuStyles = StyleSheet.create({
    /**
     * Style for the tab bar container.
     *
     * @property {string} width - Sets the width of the tab bar to 100%.
     * @property {string} height - Sets the height of the tab bar to auto.
     * @property {number} paddingHorizontal - Sets the horizontal padding to 0.
     * @property {string} backgroundColor - Sets the background color of the tab bar.
     */
    tabBar: {
        width: '100%',
        height: 'auto',
        paddingHorizontal: 0,
        backgroundColor: Color.indicator.caution[100],
    } as Partial<ViewStyle>,

    /**
     * Style for individual tabs.
     *
     * @property {string} width - Sets the width of the tab to auto.
     * @property {number} padding - Sets the padding of the tab to 0.
     */
    tab: {
        width: 'auto',
        padding: 0,
    } as Partial<ViewStyle>,

    /**
     * Style for the tab indicator.
     *
     * @property {string} backgroundColor - Sets the background color of the tab indicator.
     */
    indicator: {
        backgroundColor: '#000',
    } as Partial<ViewStyle>,
});
