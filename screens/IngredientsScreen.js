import { View, StyleSheet, FlatList, ActivityIndicator, InteractionManager } from "react-native";
import React, { useEffect, useState } from "react";
import TopNavigationBar from "../components/TopNavigationBar";
import BottomNavigationBar from "../components/BottomNavigationBar";
import SearchBar from "../components/SearchBar";
import IngredientCard from "../components/IngredientCard";
import { BookIcon, HamburgerIcon } from "../assets/icons";

export default function IngredientsScreen({ navigation }) {
    const [ingredients, setIngredients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            const fetchIngredients = async () => {
                const url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
                try {
                    const response = await fetch(url);
                    const json = await response.json();
                    setIngredients(json.meals);
                } catch (error) {
                    console.error("Failed to fetch ingredients:", error);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchIngredients();
        });
    }, []);

    const renderItem = ({ item, index }) => (
        <IngredientCard
            key={index}
            text={item.strIngredient}
            fridgeButtonOn={true}
            cartButtonOn={true}
            onPress={() => navigation.navigate("IngredientDetails", { ingredient: item })}
        />
    );

    return (
        <View style={styles.screen}>
            <TopNavigationBar title="Ingredients" LeftIcon={HamburgerIcon} RightIcon={BookIcon} />
            {isLoading ? (
                <View style={styles.loadingScreen}>
                    <ActivityIndicator size="large" />
                </View>
            ) : (
                <FlatList
                    data={ingredients}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={<SearchBar />}
                    style={styles.scrollableScreen}
                    contentContainerStyle={styles.scrolling}
                />
            )}
            <BottomNavigationBar selected="Ingredients" />
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