import { View, StyleSheet, FlatList, ActivityIndicator, InteractionManager } from "react-native";
import React, { useEffect, useState } from "react";
import TopNavigationBar from "../components/TopNavigationBar";
import BottomNavigationBar from "../components/BottomNavigationBar";
import SearchBar from "../components/SearchBar";
import IngredientCard from "../components/IngredientCard";
import { BookIcon, HamburgerIcon } from "../assets/icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function IngredientsScreen({ navigation }) {
    const [ingredients, setIngredients] = useState([]);
    const [displayedIngredients, setDisplayedIngredients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            const fetchIngredients = async () => {
                const url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
                try {
                    const response = await fetch(url);
                    const json = await response.json();
                    setIngredients(json.meals);
                    setDisplayedIngredients(json.meals.slice(0, 10)); // Initially display only the first 10 items
                    setCurrentIndex(10);
                } catch (error) {
                    console.error("Failed to fetch ingredients:", error);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchIngredients();
        });
    }, []);

    const loadMoreIngredients = () => {
        if (currentIndex < ingredients.length) {
            const newIndex = currentIndex + 10;
            const newItems = ingredients.slice(currentIndex, newIndex);
            setDisplayedIngredients([...displayedIngredients, ...newItems]);
            setCurrentIndex(newIndex);
        }
    };

    const renderItem = ({ item }) => (
        <IngredientCard
            text={item.strIngredient}
            fridgeButtonOn={true}
            cartButtonOn={true}
            onPress={() => navigation.navigate("IngredientDetails", { ingredient: item })}
            onPressFridge={() => addIngredientToStorage(item, "fridgeContent")}
            onPressCart={() => addIngredientToStorage(item, "shoppingListContent")}
        />
    );

    const addIngredientToStorage = async (ingredient, storage) => {
        ingredient.amount = "Great success!";
        try {
            // Get existing fridge content
            const existingContent = await AsyncStorage.getItem(storage);
            let newContent = [];
            if (existingContent !== null) {
                newContent = JSON.parse(existingContent);
            }
            // Check if ingredient already exists in the fridge
            const existingIngredientIndex
                = newContent.findIndex(item => item.strIngredient === ingredient.strIngredient)
            if (existingIngredientIndex > -1) {
                // Ingredient already exists, update its amount by joining with the new amount
                newContent[existingIngredientIndex].amount += `, ${ingredient.amount}`;
            } else {
                // Ingredient does not exist, add it to the fridge
                newContent.push(ingredient);
            }
            // Save updated fridge content
            await AsyncStorage.setItem(storage, JSON.stringify(newContent));
        } catch (error) {
            console.error("Error adding to storage:", error);
        }
    }

    return (
        <View style={styles.screen}>
            <TopNavigationBar title="Ingredients" LeftIcon={HamburgerIcon} RightIcon={BookIcon} />
            <FlatList
                data={displayedIngredients}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={<SearchBar />}
                style={styles.scrollableScreen}
                contentContainerStyle={styles.scrolling}
                ListEmptyComponent={
                    <View style={styles.loadingScreen}>
                        <ActivityIndicator size="large" />
                    </View>
                }
                onEndReached={loadMoreIngredients}
                onEndReachedThreshold={0.7}
                initialNumToRender={10}
            />
            <BottomNavigationBar />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        display: 'flex',
        position: 'absolute',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        top: 0,
        bottom: 0,
        backgroundColor: '#FFF',
    },
    scrollableScreen: {
        backgroundColor: '#FFF',
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    scrolling: {
        alignItems: 'stretch',
        overflow: 'visible',
        paddingBottom: 16,
    },

    iconSize: {
        width: 24,
        height: 24,
        padding: 8,
    },
    loadingScreen: {
        width: "100%",
        height: "100%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
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
    smallMargin: {
        marginBottom: 8,
    },
});