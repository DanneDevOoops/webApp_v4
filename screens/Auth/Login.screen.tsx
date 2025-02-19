import React from 'react';
import { View, ViewStyle } from 'react-native';
import { LoginForm } from '../../components/Auth/LoginForm';
import { CoverImage } from '../../components/Utils/CoverImage';
import coverIMG from '../../assets/img/NutsAndBolts-5.jpg';
import * as Style from '../../assets/styles';

export const Login: React.FC = (): React.ReactElement => {
    return (
        <View style={Style.Base.mainContainer as ViewStyle}>
            {CoverImage({ headerText: 'Logga in', image: coverIMG })}

            <LoginForm />
        </View>
    );
};
