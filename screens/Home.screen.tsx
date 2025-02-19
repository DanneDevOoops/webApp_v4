import React from 'react';
import { SafeAreaView, Text, TextStyle, View, ViewStyle } from 'react-native';
import {CoverImage} from '../components/Utils/CoverImage';
import coverIMG from '../assets/img/NutsAndBolts-4.jpg';
import * as Style from '../assets/styles';


/**
 * Home screen/view.
 *
 * @constructor
 */
export const Home: React.FC = (): React.JSX.Element => {
    return (
        <SafeAreaView style={Style.Base.mainContainer as ViewStyle}>
            {CoverImage({ headerText: 'Infinity', image: coverIMG })}

            <View style={Style.Container.content as ViewStyle}>
                <Text style={Style.Typography.paragraph as TextStyle}>
                    Välkommen till vår fiktiva mobila lagerapp. Idag lagrar vi
                    skruv och skrot, imorgon kanske något helt annat och den som
                    lever då får se. Hoppas ni trivs med att använda vår app och
                    hittar något riktigt rostigt i vårt lager.
                </Text>
                <Text
                    style={[
                        Style.Typography.paragraph as TextStyle,
                        Style.Typography.endMarginText as TextStyle,
                    ]}>
                    För tillfället finns endast begränsad funktionalitet men
                    inom kort tillkommer mer. Ni kan se vårat produktlager,
                    titta på ordrar av produkter och hantera inleveranser av
                    produkter.
                </Text>
            </View>
        </SafeAreaView>
    );
};
