/**
 * @module containers.ts
 *
 * This module defines style attributes for various container components.
 * It includes objects that specify the layout, appearance, and properties for different
 * container styles used throughout the application.
 */

import { StyleSheet, ViewStyle } from 'react-native';

import * as Color from './colors';
import { TypographyStyles as Typography } from './typography';

type GridColStyle = {
    [key: number]: ViewStyle;
};

/**
 * ContainerStyles object.
 *
 * This object contains style definitions for various container components in the application.
 * It includes styles for content, map containers, introductory screens, scroll views, rows,
 * columns, grids, and message containers.
 *
 * @constant
 * @type {object}
 * @property {object} content - Styles for the main content container.
 * @property {string} content.width - Sets the width of the content container to 100%.
 * @property {string} content.height - Sets the height of the content container to auto.
 * @property {number} content.flex - Sets the flex value to 1.
 * @property {string} content.overflowX - Sets the horizontal overflow to hidden.
 * @property {string} content.overflowY - Sets the vertical overflow to scroll.
 * @property {number} content.paddingTop - Sets the top padding based on the typography
 * whiteSpace scale.
 * @property {number} content.paddingHorizontal - Sets the horizontal padding based on the
 * typography whiteSpace scale.
 * @property {number} content.paddingBottom - Sets the bottom padding based on the typography
 * whiteSpace scale.
 * @property {number} content.margin - Sets the margin to 0.
 * @property {string} content.color - Sets the text color.
 * @property {string} content.backgroundColor - Sets the background color.
 * @property {object} mapContainer - Styles for the map container.
 * @property {string} mapContainer.width - Sets the width of the map container to 100%.
 * @property {number} mapContainer.height - Sets the height of the map container to 300.
 * @property {number} mapContainer.paddingTop - Sets the top padding based on the typography
 * whiteSpace scale.
 * @property {number} mapContainer.paddingHorizontal - Sets the horizontal padding based on the
 * typography whiteSpace scale.
 * @property {number} mapContainer.paddingBottom - Sets the bottom padding based on the
 * typography whiteSpace scale.
 * @property {number} mapContainer.flex - Sets the flex value to 1.
 * @property {string} mapContainer.justifyContent - Aligns the content to the bottom.
 * @property {string} mapContainer.alignItems - Aligns the items to the center horizontally.
 * @property {object} map - Styles for the map.
 * @property {object} screenIntroductory - Styles for the introductory screen container.
 * @property {string} screenIntroductory.width - Sets the width of the introductory screen
 * container to 100%.
 * @property {string} screenIntroductory.height - Sets the height of the introductory screen
 * container to auto.
 * @property {number} screenIntroductory.paddingHorizontal - Sets the horizontal padding based
 * on the typography whiteSpace scale.
 * @property {string} screenIntroductory.backgroundColor - Sets the background color.
 * @property {object} scrollView - Styles for the scroll view container.
 * @property {number} scrollView.flex - Sets the flex value to 1.
 * @property {number} scrollView.padding - Sets the padding based on the typography whiteSpace
 * scale.
 * @property {number} scrollView.paddingVertical - Sets the vertical padding based on the
 * typography whiteSpace scale.
 * @property {string} scrollView.backgroundColor - Sets the background color.
 * @property {object} row - Styles for rows.
 * @property {string} row.width - Sets the width of the row to 100%.
 * @property {number} row.paddingVertical - Sets the vertical padding based on the typography
 * whiteSpace scale.
 * @property {number} row.paddingHorizontal - Sets the horizontal padding based on the
 * typography whiteSpace scale.
 * @property {number} row.margin - Sets the margin to 0.
 * @property {string} row.alignSelf - Aligns the row to the center horizontally.
 * @property {string} row.flexDirection - Sets the flex direction to row.
 * @property {string} row.flexWrap - Sets the flex wrap to wrap.
 * @property {number} row.gap - Sets the gap between items based on the typography whiteSpace
 * scale.
 * @property {string} row.justifyContent - Justifies the content to space between.
 * @property {string} row.color - Sets the text color.
 * @property {object} rowNoPadding - Styles for rows without padding.
 * @property {string} rowNoPadding.width - Sets the width of the row to 100%.
 * @property {undefined} rowNoPadding.height - Sets the height of the row to undefined.
 * @property {number} rowNoPadding.paddingVertical - Sets the vertical padding to 0.
 * @property {number} rowNoPadding.paddingHorizontal - Sets the horizontal padding to 0.
 * @property {string} rowNoPadding.alignSelf - Aligns the row to the center horizontally.
 * @property {string} rowNoPadding.flexDirection - Sets the flex direction to row.
 * @property {string} rowNoPadding.flexWrap - Sets the flex wrap to wrap.
 * @property {string} rowNoPadding.justifyContent - Justifies the content to space between.
 * @property {object} column - Styles for columns.
 * @property {string} column.alignSelf - Aligns the column to the center horizontally.
 * @property {string} column.flexDirection - Sets the flex direction to column.
 * @property {string} column.flexWrap - Sets the flex wrap to wrap.
 * @property {string} column.justifyContent - Justifies the content to space between.
 * @property {object} grid - Styles for grids.
 * @property {string} grid.width - Sets the width of the grid to 100%.
 * @property {string} grid.height - Sets the height of the grid to auto.
 * @property {number} grid.paddingHorizontal - Sets the horizontal padding to 0.
 * @property {number} grid.paddingVertical - Sets the vertical padding to 0.
 * @property {number} grid.marginHorizontal - Sets the horizontal margin based on the
 * typography whiteSpace scale.
 * @property {number} grid.marginVertical - Sets the vertical margin based on the typography
 * whiteSpace scale.
 * @property {string} grid.alignSelf - Aligns the grid to the center horizontally.
 * @property {string} grid.flexDirection - Sets the flex direction to row.
 * @property {string} grid.flexWrap - Sets the flex wrap to wrap.
 * @property {number} grid.gap - Sets the gap between items based on the typography whiteSpace
 * scale.
 * @property {string} grid.justifyContent - Justifies the content to space between.
 * @property {object} gridRowNoPadding - Styles for grid rows without padding.
 * @property {string} gridRowNoPadding.width - Sets the width of the grid row to 100%.
 * @property {number} gridRowNoPadding.padding - Sets the padding to 0.
 * @property {number} gridRowNoPadding.margin - Sets the margin to 0.
 * @property {number} gridRowNoPadding.flex - Sets the flex value to 1.
 * @property {string} gridRowNoPadding.flexDirection - Sets the flex direction to row.
 * @property {string} gridRowNoPadding.flexWrap - Sets the flex wrap to wrap.
 * @property {string} gridRowNoPadding.alignSelf - Aligns the grid row to the center horizontally.
 * @property {string} gridRowNoPadding.justifyContent - Justifies the content to space between.
 * @property {object} gridColumn - Styles for grid columns.
 * @property {string} gridColumn.width - Sets the width of the grid column to 100%.
 * @property {string} gridColumn.height - Sets the height of the grid column to auto.
 * @property {number} gridColumn.flex - Sets the flex value to 1.
 * @property {string} gridColumn.flexDirection - Sets the flex direction to column.
 * @property {string} gridColumn.flexWrap - Sets the flex wrap to wrap.
 * @property {number} gridColumn.gap - Sets the gap between items to 0.
 * @property {object} gridCol - Styles for individual grid columns.
 * @property {string} gridCol.width - Sets the width of the grid column to 100%.
 * @property {string} gridCol.alignSelf - Aligns the grid column to the center horizontally.
 * @property {string} gridCol.flexDirection - Sets the flex direction to row.
 * @property {string} gridCol.flexWrap - Sets the flex wrap to wrap.
 * @property {object} borderRadius - Border radius options.
 * @property {number} borderRadius.msgContainer - Sets the border radius for message containers.
 * @property {number} borderRadius.button - Sets the border radius for buttons.
 * @property {number} borderRadius.input - Sets the border radius for input fields.
 * @property {number} borderRadius.container - Sets the border radius for containers.
 * @property {number} borderRadius.card - Sets the border radius for cards.
 * @property {number} borderRadius.modal - Sets the border radius for modals.
 * @property {object} flatList - Styles for flat lists.
 * @property {string} flatList.width - Sets the width of the flat list to 100%.
 * @property {string} flatList.height - Sets the height of the flat list to 100%.
 * @property {number} flatList.margin - Sets the margin to 0.
 * @property {number} flatList.paddingHorizontal - Sets the horizontal padding based on the
 * typography whiteSpace scale.
 * @property {string} flatList.backgroundColor - Sets the background color.
 * @property {object} baseMsgContainer - Base styles for message containers.
 * @property {object} infoMsgContainer - Styles for info message containers.
 * @property {object} successMsgContainer - Styles for success message containers.
 * @property {object} warningMsgContainer - Styles for warning message containers.
 * @property {object} cautionMsgContainer - Styles for caution message containers.
 */
export const ContainerStyles = StyleSheet.create({
    content: {
        width: '100%',
        height: 'auto',
        flex: 1,
        overflowX: 'hidden',
        overflowY: 'scroll',
        paddingTop: Typography.whiteSpace[25],
        paddingHorizontal: Typography.whiteSpace[50],
        paddingBottom: Typography.whiteSpace[100],
        margin: 0,

        // Colors
        color: Color.text.dark,
        backgroundColor: Color.background.light,
    } as ViewStyle,

    mapContainer: {
        width: '100%',
        height: 300,
        paddingTop: Typography.whiteSpace[25],
        paddingHorizontal: Typography.whiteSpace[50],
        paddingBottom: Typography.whiteSpace[100],

        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    } as Partial<ViewStyle>,

    map: {
        ...StyleSheet.absoluteFillObject,
    } as ViewStyle,

    screenIntroductory: {
        width: '100%',
        height: 'auto',
        paddingHorizontal: Typography.whiteSpace[25],
        backgroundColor: Color.background.light,
    } as ViewStyle,

    scrollView: {
        flex: 1,
        padding: Typography.whiteSpace[75],
        paddingVertical: Typography.whiteSpace[10],
        backgroundColor: Color.background.light,
    } as ViewStyle,

    row: {
        width: '100%',
        paddingVertical: Typography.whiteSpace[10],
        paddingHorizontal: Typography.whiteSpace[10],
        margin: 0,

        // FlexBox options
        alignSelf: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Typography.whiteSpace[25],
        justifyContent: 'space-between',

        color: Color.text.dark,
    } as ViewStyle,

    rowNoPadding: {
        width: '100%',
        height: undefined,
        paddingVertical: 0,
        paddingHorizontal: 0,
        alignSelf: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    } as ViewStyle,

    column: {
        alignSelf: 'center',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    } as ViewStyle,

    grid: {
        width: '100%',
        height: 'auto',
        paddingHorizontal: 0,
        paddingVertical: 0,
        marginHorizontal: Typography.whiteSpace[10],
        marginVertical: Typography.whiteSpace[25],

        // FlexBox options
        alignSelf: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Typography.whiteSpace[25],
        justifyContent: 'space-between',
    } as ViewStyle,

    gridRowNoPadding: {
        width: '100%',
        padding: 0,
        margin: 0,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'center',
        justifyContent: 'space-between',
    } as ViewStyle,

    gridColumn: {
        width: '100%',
        height: 'auto',
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'wrap',
        gap: 0,
    } as ViewStyle,

    gridCol: {
        width: '100%',
        alignSelf: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        ...Array.from({ length: 12 }, (_, i) => ({
            [i + 1]: { flex: i + 1 },
        })).reduce((acc, cur) => ({ ...acc, ...cur }), {}),
    } as ViewStyle & GridColStyle,

    borderRadius: {
        msgContainer: 3,
        button: 5,
        input: 5,
        container: 5,
        card: 5,
        modal: 5,
    } as ViewStyle,

    flatList: {
        width: '100%',
        height: '100%',
        margin: 0,
        paddingHorizontal: Typography.whiteSpace[100],
        backgroundColor: Color.background.light,
    } as ViewStyle,

    baseMsgContainer: {} as ViewStyle,
    infoMsgContainer: {} as ViewStyle,
    successMsgContainer: {} as ViewStyle,
    warningMsgContainer: {} as ViewStyle,
    cautionMsgContainer: {} as ViewStyle,
});

ContainerStyles.baseMsgContainer = {
    width: '100%',
    height: 'auto',
    flex: 1,
    paddingHorizontal: Typography.whiteSpace[50],
    paddingVertical: Typography.whiteSpace[50],
    marginVertical: Typography.whiteSpace[25],
    marginHorizontal: Typography.whiteSpace[50],
    alignSelf: 'center',
    borderRadius: 3,
    backgroundColor: Color.background.light,
};

ContainerStyles.infoMsgContainer = {
    ...ContainerStyles.baseMsgContainer,
    backgroundColor: Color.indicator.info[400],
};

ContainerStyles.successMsgContainer = {
    ...ContainerStyles.baseMsgContainer,
    backgroundColor: Color.indicator.positive[300],
};

ContainerStyles.warningMsgContainer = {
    ...ContainerStyles.baseMsgContainer,
    backgroundColor: Color.indicator.warning[300],
};

ContainerStyles.cautionMsgContainer = {
    ...ContainerStyles.baseMsgContainer,
    backgroundColor: Color.indicator.caution[300],
};

/**
 * Border radius options.
 *
 * @constant
 * @type {object}
 * @property {number} msgContainer - Sets the border radius for message containers.
 * @property {number} button - Sets the border radius for buttons.
 * @property {number} input - Sets the border radius for input fields.
 * @property {number} container - Sets the border radius for containers.
 * @property {number} card - Sets the border radius for cards.
 * @property {number} modal - Sets the border radius for modals.
 */
export const borderRadius = {
    msgContainer: 3,
    button: 5,
    input: 5,
    container: 5,
    card: 5,
    modal: 5,
};
