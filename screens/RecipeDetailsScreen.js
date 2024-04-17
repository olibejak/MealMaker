import {ActivityIndicator, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import TopNavigationBar from "../components/TopNavigationBar";
import BottomNavigationBar from "../components/BottomNavigationBar";
import {useEffect, useState} from "react";
import {
    BackArrowIcon,
    BasketCardIcon,
    BookIcon,
    FridgeCardIcon, PotIcon,
    StarFilledIcon,
    StarOutlineIcon, TimerIcon
} from "../assets/icons";
import MealMiniature from "../components/MealMiniature";
import {useNavigation} from "@react-navigation/native";
import IngredientsScreen from "./IngredientsScreen";
import BottomRightCornerButton from "../components/BottomRightCornerButton";

export default function RecipeDetailsScreen ( { route, navigation } ) {
    const {recipe} = route.params;
    const [isLoading, setIsLoading] = useState(true);
    const [recipeIngredients, setRecipeIngredients] = useState([]);
    const [ingredientMap, setIngredientMap] = useState(new Map());
    const [isFavorite, setIsFavorite] = useState(false);
    const starIconToRender = isFavorite ? StarFilledIcon  : StarOutlineIcon;

    function capitalizeFirstLetter(str) {
        return str.replace(/\b\w/g, char => char.toUpperCase());
    }

    const navigateToIngredientDetails = (ingredient) => {
        navigation.navigate("IngredientDetails",  {ingredient} );
    };

    const navigateToStepByStepRecipeScreen = () => {
        navigation.navigate("StepByStepRecipe", {recipe: recipe} );
    }


    useEffect(() => {
            const fetchMealsFromIngredient = async () => {
                // Setting a timeout for the fetch request
                const timeout = 10000; // Timeout in milliseconds (10 seconds)
                const url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
                // const timeoutPromise = new Promise((resolve, reject) => {
                //     setTimeout(() => reject(new Error('Request timed out')), timeout);
                // });

                const fetchPromise = fetch(url);
                try {
                    for (let ingredientIndex = 1; ingredientIndex < 21; ++ingredientIndex) {
                        if (recipe[`strIngredient${ingredientIndex}`] === null ||
                            recipe[`strIngredient${ingredientIndex}`] === "") {break;}
                        const ingredientName = capitalizeFirstLetter(recipe[`strIngredient${ingredientIndex}`])
                        ingredientMap.set(recipe[`strIngredient${ingredientIndex}`], recipe[`strMeasure${ingredientIndex}`])
                        const response = await fetch(url);
                        const json = await response.json();
                        if (json.meals.find(meal => meal.strIngredient === ingredientName)) {
                            setRecipeIngredients(prevIngredients =>
                                [...prevIngredients, json.meals.find(meal => meal.strIngredient === ingredientName)]);
                        }
                    }
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
                <TopNavigationBar title={recipe.strMeal} LeftIcon={BackArrowIcon} RightIcon={starIconToRender} />
            </View>
            <ScrollView style={styles.scrollableScreen}>
                <View style={styles.imageContainer}>
                    <Image source={{uri: `${recipe.strMealThumb}`,}} style={styles.image} />
                </View>
                <View style={styles.addToButtonsContainer}>
                    <TouchableOpacity style={styles.addToButton}>
                        <Text style={styles.fontButton}>Add Ingredients to</Text>
                        <BasketCardIcon />
                    </TouchableOpacity>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.cardTitle}>Categories</Text>
                    <Text style={styles.cardContent}>{recipe.strCategory}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.cardTitle}>Ingredients</Text>
                    {!isLoading && (
                        <Text style={styles.cardContent}>
                            {Array.from(ingredientMap).map(([key, value]) => `${value} ${key}`).join(' ')}
                        </Text>
                    )}{isLoading ? <ActivityIndicator size="large"/> : null}
                </View>
                <ScrollView style={styles.ingredientContainer} horizontal={true}>
                    {recipeIngredients.map((ingredient, index) => (
                        <MealMiniature
                            key={index}
                            mealName={ingredient.strIngredient}
                            mealThumb={`https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}.png`}
                            onPress={() => navigateToIngredientDetails(ingredient)}
                        />
                    ))}
                    {isLoading ? <ActivityIndicator style={styles.loadingContainer} size="large"/> : null}
                </ScrollView>
                <View style={[styles.textContainer, {marginBottom: 16}]}>
                    <Text style={styles.cardTitle}>Instructions</Text>
                    <Text style={styles.cardContent}>{recipe.strInstructions}</Text>
                </View>
            </ScrollView>
            <BottomRightCornerButton
                IconComponent={PotIcon}
                onPress={navigateToStepByStepRecipeScreen}
            />
            <BottomNavigationBar selected={"Ingredients"} />
        </View>
    );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    ingredientContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    screen: {
        display: 'flex',
        flex: 1,
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
        paddingVertical: 8,
        paddingHorizontal: 16,
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
    floatingButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#E8DEF8',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 6, // Increase the height to spread the shadow more vertically
        },
        shadowOpacity: 0.3, // You can increase the opacity for a more pronounced shadow
        shadowRadius: 6, // Increase the radius for a wider shadow spread
        elevation: 6,
        position: 'absolute',
        bottom: 100,
        right: 28,
        width: 40,
        height: 40,
        padding: 8
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
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 12,
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
        marginBottom: 8,
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
        width: windowWidth - 40,
        height: undefined,
        aspectRatio: 1,
        resizeMode: 'stretch',
        borderRadius: 12,
        overflow: "hidden",
    },
    fontButton: {
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
        letterSpacing: 0.5,
        marginLeft: 5,
    },
    cardTitle: {
        fontFamily: 'Roboto-Medium',
        fontSize: 18,
        marginBottom: 8,
    },
    cardContent: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: '#48454E',
        lineHeight: 24,
    },
    loadingContainer: {
        margin: 8,
    },
});