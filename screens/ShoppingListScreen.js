import { View, StyleSheet, ScrollView} from "react-native";
import TopNavigationBar from "../components/TopNavigationBar";
import BottomNavigationBar from "../components/BottomNavigationBar";
import {BookIcon, HamburgerIcon} from "../assets/icons";

import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useState} from "react";
import Card from "../components/Card";

export default function ShoppingListScreen () {
    const title = "Shopping list";
    const filtersOn = false;
    const selectedBottomBar = "ShoppingList";
    const fridgeButtonOn = true;
    const cartButtonOn = true;
    const [shoppingListContent, setShoppingListContent] = useState([]);

    const initializeShoppingListStorage = async () => {
        try {
            const existingContent = await AsyncStorage.getItem("shoppingListContent");
            if (existingContent === null) {
                await AsyncStorage.setItem("shoppingListContent", JSON.stringify([]));
            }
        } catch (error) {
            console.error("Error initializing shopping list storage:", error);
        }
    }

    const addToShoppingList = async (ingredient) => {
        try {
            // Get existing fridge content
            const existingContent = await AsyncStorage.getItem("shoppingListContent");
            let newContent = [];
            if (existingContent !== null) {
                newContent = JSON.parse(existingContent);
            }
            // Add new ingredient
            newContent.push(ingredient);
            // Save updated fridge content
            await AsyncStorage.setItem("shoppingListContent", JSON.stringify(newContent));
            setShoppingListContent(newContent);
        } catch (error) {
            console.error("Error adding to shopping list:", error);
        }
    }

    const moveToFridge = async () => {

    }

    useEffect(() => {
        const loadShoppingListContent = async () => {
            try {
                // Initialize fridge storage if not already initialized
                await initializeShoppingListStorage();
                // Load fridge content
                const content = await AsyncStorage.getItem("shoppingListContent");
                if (content !== null) {
                    setShoppingListContent(JSON.parse(content));
                }
            } catch (error) {
                console.error("Error loading shopping list content:", error);
            }
        };
        loadShoppingListContent();
    }, []);

    return (
        <View style={styles.screen}>
            <View>
                <TopNavigationBar title={title} LeftIcon={HamburgerIcon} RightIcon={BookIcon} />
            </View>
            <ScrollView style={styles.scrollableScreen} contentContainerStyle={styles.scrolling}>
                {shoppingListContent.map((ingredient, index) => (
                    <Card
                        key={index}
                        text={ingredient.name}
                        fridgeButtonOn={fridgeButtonOn}
                        cartButtonOn={cartButtonOn}
                    />
                ))}
            </ScrollView>
            <View>
                <BottomNavigationBar selected={selectedBottomBar}/>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        display: 'flex',
        position: 'absolute', // Changed from fixed to absolute for React Native
        justifyContent: 'space-between',
        alignItems: 'stretch',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        top: 0,
        bottom: 0,
    },
    scrollableScreen: {
        backgroundColor: '#FFF',
        paddingTop: 8,
        paddingBottom: 8,
        paddingRight: 16,
        paddingLeft: 16,

    },
    scrolling: {
        alignItems: 'center',
    },

    iconSize: {
        width: 24,
        height: 24,
        padding: 8,
    },
    center: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0)',
        padding: 0,
    },
    roundCorners: {
        backgroundColor: '#E8DEF8',
        borderRadius: 100,
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