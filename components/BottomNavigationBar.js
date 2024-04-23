import React, { useEffect, useState } from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { BasketIcon, DiningIcon, EggIcon, FridgeIcon } from "../assets/icons";
import { useNavigation } from '@react-navigation/native';

export default function BottomNavigationBar() {
    const navigation = useNavigation();
    const state = navigation.getState();
    const [selected, setSelected] = useState(null);
    const [fridgeCount, setFridgeCount] = useState(3);  // Example count
    const [shoppingListCount, setShoppingListCount] = useState(5);  // Example count

    function isSelected(current) {
        return selected === current ? styles.enabled : {};
    }

    useEffect(() => {
        setSelected(state.routes[state.index].name)
    }, [state]);

    return (
        <View style={styles.bottomBar}>
            { /* Ingredients Button */ }
            <TouchableOpacity style={styles.center} onPress={() => navigation.navigate('Ingredients')}>
                <View style={styles.bottomBarButton}>
                    <View style={[styles.bottomBarIcon, isSelected("Ingredients")]}>
                        <EggIcon/>
                    </View>
                    <Text style={[styles.textCenter, isSelected("Ingredients") ? styles.fontSmallBold : styles.fontSmall]}>Ingredients</Text>
                </View>
            </TouchableOpacity>

            { /* Recipes Button */ }
            <TouchableOpacity style={styles.center} onPress={() => navigation.navigate('Recipes')}>
                <View style={styles.bottomBarButton}>
                    <View style={[styles.bottomBarIcon, isSelected("Recipes")]}>
                        <DiningIcon/>
                    </View>
                    <Text style={[styles.textCenter, isSelected("Recipes") ? styles.fontSmallBold : styles.fontSmall]}>Recipes</Text>
                </View>
            </TouchableOpacity>

            { /* Fridge Button */ }
            <TouchableOpacity style={styles.center} onPress={() => navigation.navigate('Fridge')}>
                <View style={styles.bottomBarButton}>
                    <View style={[styles.bottomBarIcon, isSelected("Fridge")]}>
                        <FridgeIcon/>
                        {fridgeCount > 0 && <View style={styles.badge}><Text style={styles.badgeText}>{fridgeCount}</Text></View>}
                    </View>
                    <Text style={[styles.textCenter, isSelected("Fridge") ? styles.fontSmallBold : styles.fontSmall]}>Fridge</Text>
                </View>
            </TouchableOpacity>

            { /* Shopping List Button */ }
            <TouchableOpacity style={styles.center} onPress={() => navigation.navigate('ShoppingList')}>
                <View style={styles.bottomBarButton}>
                    <View style={[styles.bottomBarIcon, isSelected("ShoppingList")]}>
                        <BasketIcon/>
                        {shoppingListCount > 0 && <View style={styles.badge}><Text style={styles.badgeText}>{shoppingListCount}</Text></View>}
                    </View>
                    <Text style={[styles.textCenter, isSelected("ShoppingList") ? styles.fontSmallBold : styles.fontSmall]}>Shopping list</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    bottomBar: {
        // The height of the bottom navigation bar is different on iOS and Android
        ...Platform.select({
            ios: {
                height: 100,
            },
            android: {
                height: 85,
            }}),
        backgroundColor: '#F2EDF6',
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
        position: 'relative', // Ensure this is here for badge positioning
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
    badge: {
        position: 'absolute',
        right: 8, // Adjusted to move closer to the edge of the actual icon
        top: -4, // Adjusted to raise the badge higher towards the top of the icon
        backgroundColor: '#9c312a',
        borderRadius: 8,
        width: 16,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
    fontSmallBold: {
        fontFamily: 'Roboto-Bold',
        fontSize: 12,
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

