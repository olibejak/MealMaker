// App.js

import * as React from 'react';
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigation from './components/DrawerNavigator'; // Import the new DrawerNavigation component

export default function App() {
    const [fontsLoaded, error] = useFonts({
        "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
        "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
        "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    });

    if (!fontsLoaded && !error) {
        return null;
    }

    return (
        <NavigationContainer>
            <DrawerNavigation />
        </NavigationContainer>
    );
}

