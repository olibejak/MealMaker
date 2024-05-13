import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { DrawerActions } from "@react-navigation/native";
import { AboutIcon, SettingsIcon, TimerIcon } from "../../assets/icons";

import IngredientsScreen from "../../screens/main/IngredientsScreen";
import RecipesScreen from "../../screens/main/RecipesScreen";
import FridgeScreen from "../../screens/main/FridgeScreen";
import NewDiaryEntryScreen from "../../screens/diary/NewDiaryEntryScreen";
import ShoppingListScreen from "../../screens/main/ShoppingListScreen";
import DiaryEntryDetailScreen from "../../screens/diary/DiaryEntryDetailScreen";
import IngredientDetailsScreen from "../../screens/main/IngredientDetailsScreen";
import SettingsScreen from "../../screens/drawer/SettingsScreen";
import DiaryScreen from "../../screens/diary/DiaryScreen";
import RecipeDetailsScreen from "../../screens/main/RecipeDetailsScreen";
import StepByStepRecipeScreen from "../../screens/main/StepByStepRecipeScreen";
import AboutScreen from "../../screens/drawer/AboutScreen";
import TimerScreen from "../../screens/drawer/TimerScreen";

const Drawer = createDrawerNavigator();

function CustomLabel({ children }) {
    return (
        <Text style={styles.label}>{children}</Text>
    );
}

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItem
                label={() => <CustomLabel>Utility</CustomLabel>}
                onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}
                style={styles.content}
            />
            <DrawerItem
                label={() => <Text style={styles.label}>Timer</Text>}
                onPress={() => props.navigation.navigate('Timer')}
                icon={() => <TimerIcon />}
                style={styles.content}
            />
            <View style={styles.separator} />
            <DrawerItem
                label={() => <CustomLabel>Other</CustomLabel>}
                onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}
                style={styles.content}
            />
            <DrawerItem
                label={() => <Text style={styles.label}>Settings</Text>}
                onPress={() => props.navigation.navigate('Settings')}
                icon={() => <SettingsIcon />}
                style={styles.content}
            />
            <DrawerItem
                label={() => <Text style={styles.label}>About</Text>}
                onPress={() => props.navigation.navigate('About')}
                icon={() => <AboutIcon />}
                style={styles.content}
            />
        </DrawerContentScrollView>
    );
}

function DrawerNavigator() {
    return (
        <Drawer.Navigator
            backBehavior="history"
            initialRouteName="Recipes"
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerShown: false,
                drawerType: 'front',
            }}
        >
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

            <Drawer.Screen name="Settings" component={SettingsScreen} />
            <Drawer.Screen name="About" component={AboutScreen} />
            <Drawer.Screen name="Timer" component={TimerScreen} />
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    title: {
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
    },
    label: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
    },
    separator: {
        borderBottomWidth: 2,
        borderBottomColor: '#CAC4D0',
        marginHorizontal: 16,
        marginVertical: 8,
    }
});

export default DrawerNavigator;
