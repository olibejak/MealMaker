import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {BasketIcon, DiningIcon, EggIcon, FridgeIcon} from "../assets/icons";
import { useNavigation } from '@react-navigation/native';

export default function BottomNavigationBar() {
    const navigation = useNavigation();
    const state = navigation.getState();
    const selected = state.routes[state.index].name; // Dynamically get the current route name

    function isSelected(current) {
        return selected === current ? styles.enabled : {};
    }

    return (
        <View style={styles.bottomBar}>
            <TouchableOpacity style={styles.center} onPress={() => navigation.navigate('Ingredients')}>
                <View style={styles.bottomBarButton}>
                    <View style={[styles.bottomBarIcon, isSelected("Ingredients")]}>
                        <EggIcon/>
                    </View>
                    <Text style={[styles.textCenter, isSelected("Ingredients") ? styles.fontSmallBold : styles.fontSmall]}>Ingredients</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.center} onPress={() => navigation.navigate('Recipes')}>
                <View style={styles.bottomBarButton}>
                    <View style={[styles.bottomBarIcon, isSelected("Recipes")]}>
                        <DiningIcon/>
                    </View>
                    <Text style={[styles.textCenter, isSelected("Recipes") ? styles.fontSmallBold : styles.fontSmall]}>Recipes</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.center} onPress={() => navigation.navigate('Fridge')}>
                <View style={styles.bottomBarButton}>
                    <View style={[styles.bottomBarIcon, isSelected("Fridge")]}>
                        <FridgeIcon/>
                    </View>
                    <Text style={[styles.textCenter, isSelected("Fridge") ? styles.fontSmallBold : styles.fontSmall]}>Fridge</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.center} onPress={() => navigation.navigate('ShoppingList')}>
                <View style={styles.bottomBarButton}>
                    <View style={[styles.bottomBarIcon, isSelected("ShoppingList")]}>
                        <BasketIcon/>
                    </View>
                    <Text style={[styles.textCenter, isSelected("ShoppingList") ? styles.fontSmallBold : styles.fontSmall]}>Shopping list</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    bottomBar: {
        backgroundColor: '#F2EDF6',
        height: 116,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
    },
    bottomBarButton: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: 4,
        marginRight: 4,
        paddingTop: 4,
        paddingBottom: 16,
    },
    bottomBarIcon: {
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 20,
        paddingRight: 20,
        width: "100%",
        height: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
        marginBottom: 4,
    },
    center: {
        display: 'flex',
        alignItems: 'center',
        padding: 0,
    },
    enabled: {
        borderRadius: 16,
        backgroundColor: '#E6DEF6',
    },
    fontRegular: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        letterSpacing: 0.5,
    },
    fontLarge: {
        fontFamily: 'Roboto-Regular',
        fontSize: 22,
    },
    fontSmallBold: {
        fontFamily: 'Roboto-Bold',
        fontSize: 12,
        letterSpacing: 0.5,
    },
    fontRegularMedium: {
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
        letterSpacing: 0.5,
    },
    fontSmall: {
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
        letterSpacing: 0.5,
    },
    textCenter: {
        textAlign: 'center',
    },
});

