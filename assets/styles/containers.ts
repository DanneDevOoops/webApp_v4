/**
 * Module imports.
 */
import { StyleSheet, ViewStyle } from 'react-native';
import { TypographyStyles as Typography } from './typography';
import * as Color from './colors';

type GridColStyle = {
    [key: number]: ViewStyle;
};

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
 * Content container
 */
// export const content: StyleProp<Partial<ViewStyle>> = {
//     width: '100%',
//     height: 'auto',
//     flex: 1,
//
//     // TODO: Fix this lint error!
//     overflowX: 'hidden',
//
//     overflowY: 'scroll',
//     paddingTop: Typography.whiteSpace[25],
//     paddingHorizontal: Typography.whiteSpace[50],
//     paddingBottom: Typography.whiteSpace[100],
//     margin: 0,
//
//     // Colors
//     color: Color.text.dark,
//     backgroundColor: Color.background.light,
// };

// export const mapContainer: StyleProp<Partial<ViewStyle>> = {
//     width: '100%',
//     height: 300,
//     paddingTop: Typography.whiteSpace[25],
//     paddingHorizontal: Typography.whiteSpace[50],
//     paddingBottom: Typography.whiteSpace[100],
//
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
// };

// export const map: StyleProp<ViewStyle> = {
//     ...StyleSheet.absoluteFillObject,
// };

// export const screenIntroductory: StyleProp<ViewStyle> = {
//     width: '100%',
//     height: 'auto',
//     paddingHorizontal: Typography.whiteSpace[25],
//     backgroundColor: Color.background.light,
// };

// export const scrollView = {
//     flex: 1,
//     padding: Typography.whiteSpace[75],
//     paddingVertical: Typography.whiteSpace[10],
//     backgroundColor: Color.background.light,
// };

/**
 * Margin options.
 */
// export const margin = {
//     baseH: (Dimensions.get('screen').width / 100) * 3, // 3% of screen size,
//     baseV: (Dimensions.get('screen').width / 100) * 3,
// };

/**
 * FlexBox options.
 */
// export const flexBox = {
//     rowNoPadding: {
//         width: '100%',
//         height: undefined,
//         paddingVertical: 0,
//         paddingHorizontal: 0,
//         alignSelf: 'center',
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         justifyContent: 'space-between',
//     },
//     row: {
//         width: '100%',
//         height: undefined,
//         alignSelf: 'center',
//         paddingVertical: Typography.whiteSpace[25],
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         justifyContent: 'space-between',
//     },
//     column: {
//         alignSelf: 'center',
//         flexDirection: 'column',
//         flexWrap: 'wrap',
//         justifyContent: 'space-between',
//     },
// };

// export const row: StyleProp<ViewStyle> = {
//     width: '100%',
//     paddingVertical: Typography.whiteSpace[10],
//     paddingHorizontal: Typography.whiteSpace[10],
//     margin: 0,
//
//     // FlexBox options
//     alignSelf: 'center',
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: Typography.whiteSpace[25],
//     justifyContent: 'space-between',
//
//     // TODO: Fix this lint error!
//     color: Color.text.dark,
// };

// export const grid = {
//     width: '100%',
//     height: 'auto',
//     paddingHorizontal: 0,
//     paddingVertical: 0,
//     marginHorizontal: Typography.whiteSpace[10],
//     marginVertical: Typography.whiteSpace[25],
//
//     // FlexBox options
//     alignSelf: 'center',
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: Typography.whiteSpace[25],
//     justifyContent: 'space-between',
//
//     rowNoPadding: {
//         width: '100%',
//         padding: 0,
//         margin: 0,
//         flex: 1,
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         alignSelf: 'center',
//         justifyContent: 'space-between',
//     },
//     column: {
//         width: '100%',
//         height: 'auto',
//         flex: 1,
//         flexDirection: 'column',
//         flexWrap: 'wrap',
//         gap: 0,
//     },
//     col: {
//         width: '100%',
//         alignSelf: 'center',
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//
//         1: { flex: 1 },
//         2: { flex: 2 },
//         3: { flex: 3 },
//         4: { flex: 4 },
//         5: { flex: 5 },
//         6: { flex: 6 },
//         7: { flex: 7 },
//         8: { flex: 8 },
//         9: { flex: 9 },
//         10: { flex: 10 },
//         11: { flex: 11 },
//         12: { flex: 12 },
//     },
// };

/**
 * Bottom separator line.
 */
// export const bottomSeparator = {
//     paddingVertical: Typography.whiteSpace[50],
//     borderBottomWidth: 0.5,
//     borderBottomColor: 'black',
// };

/**
 * Border radius options.
 */
export const borderRadius = {
    msgContainer: 3,
    button: 5,
    input: 5,
    container: 5,
    card: 5,
    modal: 5,
};
