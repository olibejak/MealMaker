import {View, StyleSheet, ScrollView, ActivityIndicator, FlatList} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import TopNavigationBar from "../components/TopNavigationBar";
import BottomNavigationBar from "../components/BottomNavigationBar";
import IngredientCard from "../components/IngredientCard";
import {BookIcon, HamburgerIcon, PlusIcon} from "../assets/icons";
import React, {useCallback, useEffect, useState} from "react";
import BottomRightCornerButton from "../components/BottomRightCornerButton";
import SearchBar from "../components/SearchBar";
import {useIsFocused} from "@react-navigation/native";

export default function FridgeScreen ({navigation}) {
    const title = "My fridge";
    const selectedBottomBar = "Fridge";
    const fridgeButtonOn = true;
    const cartButtonOn = false;
    const [fridgeContent, setFridgeContent] = useState([]);
    const isFocused = useIsFocused();

    const loadFridgeContent = useCallback(async () => {
        try {
            const content = await AsyncStorage.getItem("fridgeContent");
            if (content !== null) {
                setFridgeContent(JSON.parse(content));
            }
        } catch (error) {
            console.error("Error loading fridge content:", error);
        }
    }, []);


    /**
     * TODO remove
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
        // reload fridge screen when storage changes
        if (isFocused) {
            loadFridgeContent();
        }
    }, [isFocused, loadFridgeContent]);

    const renderItem = ({ item }) => (
        <IngredientCard
            text={item.name}
            amount={item.amount}
            editButtonOn={true}
            onPress={() => navigation.navigate("IngredientDetails", { ingredient: item })}
        />
    );

    return (
        <View style={styles.screen}>
            <View>
                <TopNavigationBar title={title} LeftIcon={HamburgerIcon} RightIcon={BookIcon} />
            </View>
            <FlatList
                data={fridgeContent}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                style={styles.scrollableScreen}
                contentContainerStyle={styles.scrolling}
            />
            <BottomRightCornerButton IconComponent={PlusIcon}/>
            <BottomNavigationBar selected={selectedBottomBar}/>
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
        paddingBottom: 16,
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