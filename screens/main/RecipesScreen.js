import {View, StyleSheet, ActivityIndicator, FlatList, Text} from "react-native";
import { Accelerometer } from 'expo-sensors';
import TopNavigationBar from "../../components/navigation/TopNavigationBar";
import BottomNavigationBar from "../../components/navigation/BottomNavigationBar";
import RecipeCard from "../../components/cards/RecipeCard";
import SearchBar from "../../components/searchbar/SearchBar";
import {ArrowDropUp, BookIcon, HamburgerIcon} from "../../assets/icons";
import React, {useContext, useEffect, useRef, useState} from "react";
import {useIsFocused} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import log from "../../utils/Logger";
import BottomRightCornerButton from "../../components/buttons/BottomRightCornerButton";
import {SettingsContext} from "../../utils/SettingsProvider";

export default function RecipesScreen ({navigation}) {
    const { settings } = useContext(SettingsContext);
    const title = "Recipes";
    const filtersOn = false;
    const selectedBottomBar = "Recipes";
    const [currentIndex, setCurrentIndex] = useState(0);
    const [recipes, setRecipes] = useState([]);
    const [displayedRecipes, setDisplayedRecipes] = useState([]);
    const [activeFilter, setActiveFilter] = useState(null);
    const [activeSearch, setActiveSearch] = useState('');
    const [favouriteRecipes, setFavouriteRecipes] = useState([]);
    const isFocused = useIsFocused();
    const flatListRef = useRef(null);   // Hook for flat list scroll top
    const [isLoading, setIsLoading] = useState(true)

    const loadFavouriteRecipes = async () => {
        const content = await AsyncStorage.getItem("favouriteRecipes");
        if (content) {
            setFavouriteRecipes(JSON.parse(content));
        }
    }

    const fetchRecipesFromAPI = async () => {
        for (let i = 97; i <= 122; ++i) {
            const char = String.fromCharCode(i);
            let url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${char}`;
            const response = await fetch(url);
            const json = await response.json();
            // meals == array of ingredients/meals from TheMealDB
            if (json.meals) {
                setRecipes(prevRecipes => [...prevRecipes, ...json.meals]);
            }
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (isFocused) {
            fetchRecipesFromAPI()
                .catch(async error => {log.error("Failed to fetch ingredients:", error);});
            loadFavouriteRecipes()
                .catch(error =>  log.error("Error loading favourite recipes:", error));
            // Set favouriteRecipes as default recipes when fetched recipes are empty
            if (!recipes || recipes.length === 0) {
                setRecipes(favouriteRecipes)
            }
        }
    }, [isFocused]);

    // Accelerometer for random recipe
    useEffect(() => {
        // const activeScreen = navigation.routes[navigation.index].name;
        let subscription;
        const threshold = 2; // Adjust this value based on the sensitivity you want

        const handleUpdate = ({x, y, z}) => {
            const acceleration = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
            if (acceleration > threshold) {
                getRandomRecipe();
            }
        };

        Accelerometer.setUpdateInterval(200); // Set the update interval (in milliseconds)

        Accelerometer.isAvailableAsync().then((available) => {
            // Add Accelerometer listener when on Recipe Screen
            if (available &&
                settings.shakeForRandomRecipeEnabled &&
                navigation.getState().history.length > 0 &&
                navigation.getState().history[navigation.getState().history.length - 1].key.startsWith("Recipes-")) {
                subscription = Accelerometer.addListener(handleUpdate);
            }
            // Remove Accelerometer listener when not on Recipe Screen
            else if (available && subscription) {
                Accelerometer.removeAllListeners()
            }
        }).catch(error => log.error("Failed to access Accelerometer ", error));

        return () => {
            if (subscription) {
                Accelerometer.removeAllListeners();
            }
        };
    }, [recipes]);

    const getRandomRecipe = () => {
        if (recipes.length > 0) {
            const randomIndex = Math.floor(Math.random() * recipes.length); // round(<0,1> * recipes length)
            const randomRecipe = recipes[randomIndex];
            // strMeal == name of the meal in TheMealDB
            log.info(`Random recipe: ${randomRecipe.strMeal}`);
            navigation.navigate("RecipeDetails", {recipe: randomRecipe});
        }
    };

    // Load more recipes that are actively displayed
    const loadMoreRecipes = () => {
        if (currentIndex < recipes.length) {
            const newIndex = currentIndex + 10;
            const newItems = recipes.slice(currentIndex, newIndex);
            setDisplayedRecipes([...displayedRecipes, ...newItems]);
            setCurrentIndex(newIndex);
        }
    };

    // Render recipe card
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

        let tags;
        // strTags == tags of the meal from TheMealDB - type: string
        if (item.strTags) {
            tags = item.strTags.split(',').join(', ');
        }

        return (
            <RecipeCard
                title={item.strMeal} // strMeal == name of the meal from TheMealDB - type: string
                date={tags}
                description={ingredientsList}
                // strMealThumb == URL of the thumbnail of the meal from TheMealDB - type: string (URL)
                image={{uri: item.strMealThumb}}
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
                ref={flatListRef}
                data={activeFilter === "Favourite recipes" ?
                    favouriteRecipes.filter(item => activeSearch ?
                        // strMeal == name of the meal from TheMealDB - type: string
                        item && item.strMeal && item.strMeal.toLowerCase().includes(activeSearch.trim()) : true)
                    : recipes
                        // strCategory == category of the meal in TheMealDB - type: string
                    .filter(item => activeFilter ? item && item.strCategory && item.strCategory === activeFilter : true)
                    .filter(item => activeSearch ?
                        // strMeal == name of the meal in TheMealDB
                        item && item.strMeal && item.strMeal.toLowerCase().includes(activeSearch.trim()) : true)
                }
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={
                    <SearchBar
                        filtersOn={filtersOn} setFilter={(category) => setActiveFilter(category)}
                        search={(text) => setActiveSearch(text.toLowerCase())}
                        activeFilter={activeFilter}
                    />
                }
                style={styles.scrollableScreen}
                contentContainerStyle={styles.scrolling}
                ListEmptyComponent={
                    isLoading ? (
                    <View style={styles.loadingScreen}>
                        <ActivityIndicator size="large" />
                    </View>
                    ) : (
                        <View style={styles.loadingScreen}>
                            <Text style={[styles.fontRegular, styles.textCenter]}>No results found</Text>
                        </View>
                    )
                }
                onEndReached={loadMoreRecipes}
                onEndReachedThreshold={0.7}
                initialNumToRender={10}
            />
            <BottomRightCornerButton IconComponent={ArrowDropUp}
                                     onPress={() => flatListRef.current.scrollToOffset({offset: 0, animated: true})}/>
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
        paddingBottom: 100,
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