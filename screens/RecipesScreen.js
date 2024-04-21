import {View, StyleSheet, ScrollView, ActivityIndicator, FlatList} from "react-native";
import TopNavigationBar from "../components/TopNavigationBar";
import BottomNavigationBar from "../components/BottomNavigationBar";
import RecipeCard from "../components/RecipeCard";
import SearchBar from "../components/SearchBar";
import {BookIcon, HamburgerIcon} from "../assets/icons";
import React, {useEffect, useState} from "react";

export default function RecipesScreen ({navigation}) {
    const title = "Recipes";
    const filtersOn = false;
    const selectedBottomBar = "Ingredients";
    const [currentIndex, setCurrentIndex] = useState(0);
    const [recipes, setRecipes] = useState([]);
    const [displayedRecipes, setDisplayedRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipesFromAPI = async () => {
            for (let i = 97; i <= 122; ++i) {
                const char = String.fromCharCode(i);
                let url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${char}`;
                try {
                    const response = await fetch(url);
                    const json = await response.json();
                    if (json.meals) {
                        setRecipes(prevRecipes =>
                            [...prevRecipes, ...json.meals]);
                        }
                    }
            catch (error) {
                    console.error("Failed to fetch ingredients or request timed out:", error);
                }
            }
        };
        fetchRecipesFromAPI();
    }, []);

    const loadMoreRecipes = () => {
        if (currentIndex < recipes.length) {
            const newIndex = currentIndex + 10;
            const newItems = recipes.slice(currentIndex, newIndex);
            setDisplayedRecipes([...displayedRecipes, ...newItems]);
            setCurrentIndex(newIndex);
        }
    };

    const renderItem = ({item}) => {
        const ingredientKeys = Object.keys(item).filter(key => key.startsWith('strIngredient'));
        const amountKeys = Object.keys(item).filter(key => key.startsWith('strMeasure'));

        const ingredientsList = ingredientKeys.map((key, index) => {
            const ingredient = item[key];
            const amount = item[amountKeys[index]];

            // Check if ingredient is not null or empty string
            if (ingredient && ingredient.trim() !== '') {
                return `${amount} ${ingredient}`;
            }
            return null; // Filter out null or empty ingredient
        }).filter(item => item !== null).join(', ');

        return (
            <RecipeCard
                title={item.strMeal}
                date={item.strTags}
                description={ingredientsList}
                image={item.strMealThumb}
                onPressDetails={() => navigation.navigate("RecipeDetails", {recipe: item})}
                onPressSecondary={() => navigation.navigate("StepByStepRecipe", {recipe: item})}
                actionButton={'cook'}
            />
        )
    }

    return (
        <View style={styles.screen}>
            <View>
                <TopNavigationBar title={title} LeftIcon={HamburgerIcon} RightIcon={BookIcon} />
            </View>
            <FlatList
                data={recipes}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={<SearchBar filtersOn={filtersOn} />}
                style={styles.scrollableScreen}
                contentContainerStyle={styles.scrolling}
                ListEmptyComponent={
                    <View style={styles.loadingScreen}>
                        <ActivityIndicator size="large" />
                    </View>
                }
                onEndReached={loadMoreRecipes}
                onEndReachedThreshold={0.7}
                initialNumToRender={10}
            />
            <View>
                <BottomNavigationBar selected={selectedBottomBar} />
            </View>
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
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    scrolling: {
        alignItems: 'stretch',
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