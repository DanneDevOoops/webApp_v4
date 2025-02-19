import React from 'react';
import { View, ViewStyle } from 'react-native';
import { RegisterForm } from '../../components/Auth/RegisterForm';
import { CoverImage } from '../../components/Utils/CoverImage';
import coverIMG from '../../assets/img/NutsAndBolts-5.jpg';
import * as Style from '../../assets/styles';

export const Register: React.FC = () => {
    return (
        <View style={Style.Base.mainContainer as ViewStyle}>
            {CoverImage({ headerText: 'Registrera', image: coverIMG })}

            <RegisterForm />
        </View>
    );
};
