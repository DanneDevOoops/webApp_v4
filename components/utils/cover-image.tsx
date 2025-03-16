/**
 * @module cover-image.tsx
 *
 * This module defines the CoverImage component.
 * It renders a cover image with an overlay text.
 */

import React, { ReactElement } from 'react';
import { ImageBackground, ImageSourcePropType, Text, View } from 'react-native';

import * as Style from 'assets/styles';
import { ScreenCoverArguments } from 'interfaces/utils-interfaces';

/**
 * CoverImage component.
 *
 * This component displays an image as the background of a view, with a text header overlaid on
 * top. It supports both local and remote images by dynamically setting the image source based
 * on the type of the `image` prop. The component is styled using predefined styles from the
 * `Style` module.
 *
 * @component
 * @param {ScreenCoverArguments} props - The component props.
 * @param {string | ImageSourcePropType} props.image - The source of the image. Can be a URI
 * string for
 * remote images or an ImageSourcePropType object for local images.
 * @param {string} props.headerText - The text to display on top of the image.
 * @returns {ReactElement} A React component representing the cover image with text.
 */
export const CoverImage: React.FC<ScreenCoverArguments> = ({
    image,
    headerText,
}: ScreenCoverArguments): ReactElement => {
    const imageSource: ImageSourcePropType =
        typeof image === 'string' ? { uri: image } : image;

    return (
        <View style={Style.Image.imageContainer}>
            <ImageBackground
                source={imageSource}
                style={Style.Image.image}>
                <Text style={Style.Typography.header}>{headerText}</Text>
            </ImageBackground>
        </View>
    );
};
