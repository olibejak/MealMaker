import * as React from 'react';
import { View, Text } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { DrawerActions } from "@react-navigation/native";
import { AboutIcon, SettingsIcon, TimerIcon } from "../assets/icons";

import IngredientsScreen from "../screens/IngredientsScreen";
import RecipesScreen from "../screens/RecipesScreen";
import FridgeScreen from "../screens/FridgeScreen";
import NewDiaryEntryScreen from "../screens/NewDiaryEntryScreen";
import ShoppingListScreen from "../screens/ShoppingListScreen";
import DiaryEntryDetailScreen from "../screens/DiaryEntryDetailScreen";
import IngredientDetailsScreen from "../screens/IngredientDetailsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import DiaryScreen from "../screens/DiaryScreen";
import RecipeDetailsScreen from "../screens/RecipeDetailsScreen";
import StepByStepRecipeScreen from "../screens/StepByStepRecipeScreen";
import AboutScreen from "../screens/AboutScreen";
import TimerScreen from "../screens/TimerScreen";

const Drawer = createDrawerNavigator();

function CustomLabel({ children }) {
    return (
        <Text style={{ fontWeight: 'bold' }}>{children}</Text>
    );
}

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            {/* Custom DrawerItem for categories with bold label */}
            <DrawerItem
                label={() => <CustomLabel>Utility</CustomLabel>}
                onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}
            />
            {/* Individual screens under Utility category */}
            <DrawerItem
                label="Timer"
                onPress={() => props.navigation.navigate('Timer')}
                icon={() => <TimerIcon />}
            />
            {/* Underline */}
            <View style={{ borderBottomWidth: 2, borderBottomColor: '#CAC4D0', marginHorizontal: 10 }} />

            {/* Custom DrawerItem for Other category */}
            <DrawerItem
                label={() => <CustomLabel>Other</CustomLabel>}
                onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}
            />
            <DrawerItem
                label="Settings"
                onPress={() => props.navigation.navigate('Settings')}
                icon={() => <SettingsIcon />}
            />
            {/* Custom DrawerItem for About with bold label */}
            <DrawerItem
                label= "About"
                onPress={() => props.navigation.navigate('About')}
                icon={() => <AboutIcon />}
            />
            {/* ... add more drawer items here as needed */}
        </DrawerContentScrollView>
    );
}

function DrawerNavigator() {
    return (
        <Drawer.Navigator
            initialRouteName="About"
            screenOptions={{
                headerShown: false,
                drawerType: 'front',
            }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            {/* Screens are accessible programmatically but not shown in drawer */}
            <Drawer.Screen name="Ingredients" component={IngredientsScreen} options={{ drawerItemStyle: { display: 'none' } }} />
            <Drawer.Screen name="Recipes" component={RecipesScreen} options={{ drawerItemStyle: { display: 'none' } }} />
            <Drawer.Screen name="Fridge" component={FridgeScreen} options={{ drawerItemStyle: { display: 'none' } }} />
            <Drawer.Screen name="ShoppingList" component={ShoppingListScreen} options={{ drawerItemStyle: { display: 'none' } }} />
            <Drawer.Screen name="NewDiaryEntry" component={NewDiaryEntryScreen} options={{ drawerItemStyle: { display: 'none' } }} />
            <Drawer.Screen name="IngredientDetails" component={IngredientDetailsScreen} options={{ drawerItemStyle: { display: 'none' } }} />
            <Drawer.Screen name="RecipeDetails" component={RecipeDetailsScreen} options={{ drawerItemStyle: { display: 'none' } }} />
            <Drawer.Screen name="DiaryEntryDetail" component={DiaryEntryDetailScreen} options={{ drawerItemStyle: { display: 'none' } }} />
            <Drawer.Screen name="Diary" component={DiaryScreen} options={{ drawerItemStyle: { display: 'none' } }} />
            <Drawer.Screen name="StepByStepRecipe" component={StepByStepRecipeScreen} options={{ drawerItemStyle: { display: 'none' } }} />

            {/* Visible screens */}
            <Drawer.Screen name="Settings" component={SettingsScreen} />
            <Drawer.Screen name="About" component={AboutScreen} />
            <Drawer.Screen name="Timer" component={TimerScreen} />
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;
