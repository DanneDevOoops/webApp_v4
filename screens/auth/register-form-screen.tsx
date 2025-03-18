/**
 * @module screens/auth/register-form-screen.tsx
 *
 * This module defines the screen for user registration.
 * It includes a form for users to input their registration details.
 * The screen is styled using the application's style constants.
 */

import React, { ReactElement } from 'react';
import { View } from 'react-native';

import coverIMG from 'assets/img/NutsAndBolts-5.jpg';
import * as Style from 'assets/styles';
import { RegisterForm } from 'components/auth/register-form';
import { CoverImage } from 'components/utils/cover-image';

/**
 * Register component.
 *
 * This component sets up the screen for user registration.
 * It includes a form for users to input their registration details.
 *
 * @function
 * @returns {ReactElement} The rendered registration screen component.
 */
export const Register: React.FC = (): ReactElement => {
    return (
        <View style={Style.Base.mainContainer}>
            {CoverImage({ headerText: 'Registrera', image: coverIMG })}

            <RegisterForm />
        </View>
    );
};
