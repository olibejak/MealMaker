import {View, StyleSheet, ScrollView} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import TopNavigationBar from "../components/TopNavigationBar";
import BottomNavigationBar from "../components/BottomNavigationBar";
import Card from "../components/Card";
import {useEffect, useState} from "react";

export default function FridgeScreen () {
    const title = "My fridge";
    const selectedBottomBar = "Fridge";
    const fridgeButtonOn = true;
    const cartButtonOn = false;
    const [fridgeContent, setFridgeContent] = useState([]);

    const initializeFridgeStorage = async () => {
        try {
            const existingContent = await AsyncStorage.getItem("fridgeContent");
            if (existingContent === null) {
                await AsyncStorage.setItem("fridgeContent", JSON.stringify([]));
            }
        } catch (error) {
            console.error("Error initializing fridge storage:", error);
        }
    }

    const addToFridge = async (ingredient) => {
        try {
            // Get existing fridge content
            const existingContent = await AsyncStorage.getItem("fridgeContent");
            let newContent = [];
            if (existingContent !== null) {
                newContent = JSON.parse(existingContent);
            }
            // Add new ingredient
            newContent.push(ingredient);
            // Save updated fridge content
            await AsyncStorage.setItem("fridgeContent", JSON.stringify(newContent));
            setFridgeContent(newContent);
        } catch (error) {
            console.error("Error adding to fridge:", error);
        }
    };
    /**
     * add / remove TODO
    const removeFromFridge = async (ingredient) => {
        try {
            const existingContent = await AsyncStorage.getItem("fridgeContent");
            if (existingContent !== null) {
                existingContent.;
                await AsyncStorage.setItem("fridgeContent", JSON.stringify(existingContent));
            }
        } catch (error) {
            console.error("Error removing from fridge storage:", error);
        }
    }

 */

    useEffect(() => {
        const loadFridgeContent = async () => {
            try {
                // Initialize fridge storage if not already initialized
                await initializeFridgeStorage();
                // Load fridge content
                const content = await AsyncStorage.getItem("fridgeContent");
                if (content !== null) {
                    setFridgeContent(JSON.parse(content));
                }
            } catch (error) {
                console.error("Error loading fridge content:", error);
            }
        };
        loadFridgeContent();
    }, []);

    return (
        <View style={styles.screen}>
            <View>
                <TopNavigationBar title={title}/>
            </View>
            <ScrollView style={styles.scrollableScreen} contentContainerStyle={styles.scrolling}>
                {fridgeContent.map((ingredient, index) => (
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