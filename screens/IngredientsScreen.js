import {View, StyleSheet, ScrollView, ActivityIndicator} from "react-native";
import TopNavigationBar from "../components/TopNavigationBar";
import BottomNavigationBar from "../components/BottomNavigationBar";
import SearchBar from "../components/SearchBar";
import Card from "../components/Card";
import {useNavigation} from "@react-navigation/native";
import {useEffect, useState} from "react";

export default function IngredientsScreen ( {navigation} ) {
    const title = "Ingredients";
    const filtersOn = false;
    const selectedBottomBar = "Ingredients";
    const fridgeButtonOn = true;
    const cartButtonOn = true;

    // Fetch ingredients from the API
    const [ingredients, setIngredients] = useState([]);
    // Loading state
    const [isLoading, setIsLoading] = useState(true);

    const navigateToIngredientDetails = (ingredient) => {
        navigation.navigate("IngredientDetails", { ingredient });
    };

    useEffect(() => {
            const fetchIngredients = async () => {
                // Setting a timeout for the fetch request
                const timeout = 10000; // Timeout in milliseconds (10 seconds)
                const url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';

                const timeoutPromise = new Promise((resolve, reject) => {
                    setTimeout(() => reject(new Error('Request timed out')), timeout);
                });

                const fetchPromise = fetch(url);

                try {
                    const response = await Promise.race([fetchPromise, timeoutPromise]);
                    const json = await response.json();
                    setIngredients(json.meals);
                } catch (error) {
                    console.error("Failed to fetch ingredients or request timed out:", error);
                }
                finally {
                    setIsLoading(false); // End loading
                }
            };

            fetchIngredients();
        }
        , []);

    return (
        <View style={styles.screen}>
            <TopNavigationBar title={title} />
            {isLoading ? (
                <View style={styles.center}>
                    <ActivityIndicator size="large" />
                </View>
            ) : (
                <ScrollView style={styles.scrollableScreen} contentContainerStyle={styles.scrolling}>
                    <SearchBar filtersOn={filtersOn} />
                    {ingredients.map((ingredient, index) => (
                        <Card
                            key={index}
                            text={ingredient.strIngredient}
                            fridgeButtonOn={fridgeButtonOn}
                            cartButtonOn={cartButtonOn}
                            onPress={() => navigateToIngredientDetails(ingredient)}
                        />
                    ))}
                </ScrollView>
            )}
            <BottomNavigationBar selected={selectedBottomBar} />
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
