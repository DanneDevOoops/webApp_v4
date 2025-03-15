/**
 * @module login-screen.tsx
 *
 * This module defines the screen for user login.
 * It includes a form for users to input their login details.
 * The screen is styled using the application's style constants.
 */

import React, { ReactElement } from 'react';
import { View } from 'react-native';

import { LoginForm } from '../../components/auth/login-form';
import { CoverImage } from '../../components/utils/cover-image';
import coverIMG from '../../assets/img/NutsAndBolts-5.jpg';
import * as Style from '../../assets/styles';

/**
 * Login component.
 *
 * This component sets up the screen for user login.
 * It includes a form for users to input their login details.
 *
 * @component
 * @returns {ReactElement} The rendered login screen component.
 */
export const Login: React.FC = (): ReactElement => {
    return (
        <View style={Style.Base.mainContainer}>
            {CoverImage({ headerText: 'Logga in', image: coverIMG })}

            <LoginForm />
        </View>
    );
};
