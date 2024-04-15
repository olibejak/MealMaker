import {View, Text, StyleSheet, ScrollView, Image, ActivityIndicator, Button, TouchableOpacity} from "react-native";
import TopNavigationBar from "../components/TopNavigationBar";
import BottomNavigationBar from "../components/BottomNavigationBar";
import IngredientCard from "../components/IngredientCard";
import {useNavigation} from "@react-navigation/native";
import {useEffect, useState} from "react";
import {BookIcon, BackArrowIcon, FridgeCardIcon, BasketCardIcon} from "../assets/icons";
import MealMiniature from "../components/MealMiniature";

export default function IngredientDetailsScreen ({ route, navigation }) {
    const { ingredient } = route.params;
    const [imageUri, setImageData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [mealsFromIngredient, setMealsFromIngredient] = useState([]);

    const parsedIngredientName = () => {
        let parsedString = ingredient.strIngredient.toLowerCase();
        parsedString = parsedString.replace(/ /g, '_');
        return parsedString;
    }

    const navigateToMealDetails = (idMeal) => {
        navigation.navigate("RecipeDetails",  async () => {
                const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
                const response = await fetch(url);
                return response.json();

            } );
    };

    useEffect(() => {
            const fetchMealsFromIngredient = async () => {
                // Setting a timeout for the fetch request
                const timeout = 10000; // Timeout in milliseconds (10 seconds)
                const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${parsedIngredientName()}`;

                const timeoutPromise = new Promise((resolve, reject) => {
                    setTimeout(() => reject(new Error('Request timed out')), timeout);
                });

                const fetchPromise = fetch(url);

                try {
                    const response = await Promise.race([fetchPromise, timeoutPromise]);
                    const json = await response.json();
                    setMealsFromIngredient(json.meals);
                } catch (error) {
                    console.error("Failed to fetch ingredients or request timed out:", error);
                }
                finally {
                    setIsLoading(false); // End loading
                }
            };
            fetchMealsFromIngredient();
        }
        , []);

    return (
        <View style={styles.screen}>
            <View>
                <TopNavigationBar title={ingredient.strIngredient} LeftIcon={BackArrowIcon} RightIcon={BookIcon} />
            </View>
            <ScrollView style={styles.scrollableScreen}>
                <View style={styles.imageContainer}>
                    <Image source={{uri: `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}.png`,}} style={styles.image} />
                </View>
                <View style={styles.addToButtonsContainer}>
                    <TouchableOpacity style={styles.addToButton}>
                        <Text style={styles.fontRegularMedium}>Add to</Text>
                        <FridgeCardIcon/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addToButton}>
                        <Text style={styles.fontRegularMedium}>Add to</Text>
                        <BasketCardIcon />
                    </TouchableOpacity>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.fontLarge}>Type</Text>
                    <Text style={styles.fontRegular}>{ingredient.strType}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.fontLarge}>Description</Text>
                    <Text style={styles.fontRegular}>{ingredient.strDescription}</Text>
                </View>
                <ScrollView style={styles.mealsContainer} horizontal={true}>
                    {mealsFromIngredient.map((meal, index) => (
                        <MealMiniature
                            mealName={meal.strMeal}
                            mealThumb={meal.strMealThumb}
                            onPress={() => navigateToMealDetails(meal.idMeal)}
                        />
                    ))}
                    {isLoading ? <ActivityIndicator size="large"/> : null}
                </ScrollView>
            </ScrollView>
            <BottomNavigationBar selected={"Ingredients"} />
        </View>
    );
};

const styles = StyleSheet.create({
    mealsContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 100,
    },
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
    textContainer: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: "justify",
        flexShrink: 0,
        backgroundColor: '#FEF7FF',
        borderRadius: 12,
        padding: 12,
        marginTop: 12,
    },
    addToButtonsContainer: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: "center",
        gap: 12,
    },
    addToButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#E8DEF8',
        borderRadius: 12,
        padding: 12,
        marginTop: 12,
        gap: 10,
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
    fontRegular: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        letterSpacing: 0.5,
    },
    fontLarge: {
        fontFamily: 'Roboto-Regular',
        fontSize: 22,
        textAlign: 'left',
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
    imageContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'stretch',
    },
});