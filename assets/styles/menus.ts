import { StyleSheet, ViewStyle } from 'react-native';

import * as Color from './colors';

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
