import React, { ReactElement } from 'react';
import { LogBox } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabsNavigator } from '../screens/bottom-tabs-navigator';
import {
    OleoScriptSwashCaps_400Regular,
    OleoScriptSwashCaps_700Bold,
    useFonts,
} from '@expo-google-fonts/oleo-script-swash-caps';
import {
    JosefinSans_400Regular,
    JosefinSans_500Medium,
    JosefinSans_600SemiBold,
} from '@expo-google-fonts/josefin-sans';
import {
    Merriweather_300Light,
    Merriweather_300Light_Italic,
    Merriweather_400Regular,
    Merriweather_400Regular_Italic,
    Merriweather_700Bold,
    Merriweather_700Bold_Italic,
} from '@expo-google-fonts/merriweather';
import { useAppContext } from '../context/app-provider';
import { LoadingIndicator } from './utils/loading-indicator';
import { AppContextType } from '../interfaces/app-interfaces';
import * as Style from '../assets/styles';

/**
 * LogBox ignore logs.
 * Ignore remote debugger & non-serializable objects.
 */
LogBox.ignoreLogs([
    'Remote debugger',
    'Non-serializable values were found in the navigation state',
]);

/**
 * Root component of the application.
 *
 * This component sets up the main structure of the app, including:
 * - Ignoring specific log warnings.
 * - Loading custom fonts using the expo-google-fonts package.
 * - Providing a safe area view for the app content.
 * - Setting up the navigation container with bottom tabs.
 *
 * @returns {ReactElement} The root element of the application.
 */
export const App: React.FC = (): ReactElement => {
    const appContext: AppContextType = useAppContext();
    const [fontsLoaded] = useFonts({
        OleoScriptSwashCaps_400Regular,
        OleoScriptSwashCaps_700Bold,
        JosefinSans_400Regular,
        JosefinSans_500Medium,
        JosefinSans_600SemiBold,
        Merriweather_300Light,
        Merriweather_300Light_Italic,
        Merriweather_400Regular,
        Merriweather_400Regular_Italic,
        Merriweather_700Bold,
        Merriweather_700Bold_Italic,
    });

    if (appContext.isLoading || !fontsLoaded) {
        return <LoadingIndicator loadingType={undefined} />;
    }

    return (
        <SafeAreaView style={Style.Base.mainContainer}>
            <NavigationContainer>
                <BottomTabsNavigator />
            </NavigationContainer>
        </SafeAreaView>
    );
};

export default App;
