// App.js

import * as React from 'react';
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigation from './components/navigation/DrawerNavigator';
import {useCallback, useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import log from "./utils/Logger"; // Import the new DrawerNavigation component

export default function App() {

    // initialize storage for fridge and shopping list
    const initializeLocalStorage = useCallback(async () => {
        try {
            const fridgeStorage = await AsyncStorage.getItem("fridgeContent");
            if (fridgeStorage === null) {
                await AsyncStorage.setItem("fridgeContent", JSON.stringify([]));
            }

            const shoppingListStorage = await AsyncStorage.getItem("shoppingListContent");
            if (shoppingListStorage === null) {
                await AsyncStorage.setItem("shoppingListContent", JSON.stringify([]));
            }

            const favouriteIngredients = await AsyncStorage.getItem("favouriteIngredients");
            if (favouriteIngredients === null) {
                await AsyncStorage.setItem("favouriteIngredients", JSON.stringify([]));
            }

            const favouriteRecipes = await AsyncStorage.getItem("favouriteRecipes");
            if (favouriteRecipes === null) {
                await AsyncStorage.setItem("favouriteRecipes", JSON.stringify([]));
            }
        } catch (error) {
            log.error("Error initializing local storage:", error);
        }
    }, []);

    useEffect(() => {
        initializeLocalStorage();
    }, [initializeLocalStorage]);

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

