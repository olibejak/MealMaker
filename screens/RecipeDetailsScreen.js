import {ActivityIndicator, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import TopNavigationBar from "../components/TopNavigationBar";
import BottomNavigationBar from "../components/BottomNavigationBar";
import {useEffect, useState} from "react";
import {
    BackArrowIcon,
    BasketCardIcon,
    BookIcon,
    FridgeCardIcon,
    StarFilledIcon,
    StarOutlineIcon
} from "../assets/icons";
import MealMiniature from "../components/MealMiniature";
import IngredientsScreen from "./IngredientsScreen";

export default function RecipeDetailsScreen ( {  navigation} ) {
    const  recipe   = {
        "idMeal": "52771",
        "strMeal": "Spicy Arrabiata Penne",
        "strDrinkAlternate": null,
        "strCategory": "Vegetarian",
        "strArea": "Italian",
        "strInstructions": "Bring a large pot of water to a boil. Add kosher salt to the boiling water, then add the pasta. Cook according to the package instructions, about 9 minutes.\r\nIn a large skillet over medium-high heat, add the olive oil and heat until the oil starts to shimmer. Add the garlic and cook, stirring, until fragrant, 1 to 2 minutes. Add the chopped tomatoes, red chile flakes, Italian seasoning and salt and pepper to taste. Bring to a boil and cook for 5 minutes. Remove from the heat and add the chopped basil.\r\nDrain the pasta and add it to the sauce. Garnish with Parmigiano-Reggiano flakes and more basil and serve warm.",
        "strMealThumb": "https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg",
        "strTags": "Pasta,Curry",
        "strYoutube": "https://www.youtube.com/watch?v=1IszT_guI08",
        "strIngredient1": "penne rigate",
        "strIngredient2": "olive oil",
        "strIngredient3": "garlic",
        "strIngredient4": "chopped tomatoes",
        "strIngredient5": "red chile flakes",
        "strIngredient6": "italian seasoning",
        "strIngredient7": "basil",
        "strIngredient8": "Parmigiano-Reggiano",
        "strIngredient9": "",
        "strIngredient10": "",
        "strIngredient11": "",
        "strIngredient12": "",
        "strIngredient13": "",
        "strIngredient14": "",
        "strIngredient15": "",
        "strIngredient16": null,
        "strIngredient17": null,
        "strIngredient18": null,
        "strIngredient19": null,
        "strIngredient20": null,
        "strMeasure1": "1 pound",
        "strMeasure2": "1/4 cup",
        "strMeasure3": "3 cloves",
        "strMeasure4": "1 tin ",
        "strMeasure5": "1/2 teaspoon",
        "strMeasure6": "1/2 teaspoon",
        "strMeasure7": "6 leaves",
        "strMeasure8": "spinkling",
        "strMeasure9": "",
        "strMeasure10": "",
        "strMeasure11": "",
        "strMeasure12": "",
        "strMeasure13": "",
        "strMeasure14": "",
        "strMeasure15": "",
        "strMeasure16": null,
        "strMeasure17": null,
        "strMeasure18": null,
        "strMeasure19": null,
        "strMeasure20": null,
        "strSource": null,
        "strImageSource": null,
        "strCreativeCommonsConfirmed": null,
        "dateModified": null
    } //route.params;
    const [isLoading, setIsLoading] = useState(true);
    const [recipeIngredients, setRecipeIngredients] = useState([]);
    const [ingredientMap, setIngredientMap] = useState(new Map());
    const [isFavorite, setIsFavorite] = useState(false);
    const starIconToRender = isFavorite ? StarFilledIcon  : StarOutlineIcon;

    function capitalizeFirstLetter(str) {
        return str.replace(/\b\w/g, char => char.toUpperCase());
    }

    const navigateToIngredientDetails = (idMeal) => {
        navigation.navigate("IngredientDetails",  async () => {
            const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
            const response = await fetch(url);
            return response.json();

        } );
    };

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
                        <Text style={styles.fontRegularMedium}>Add Ingredients to</Text>
                        <BasketCardIcon />
                    </TouchableOpacity>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.fontLarge}>Categories</Text>
                    <Text style={styles.fontRegular}>{recipe.strCategory}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.fontLarge}>Ingredients</Text>
                    <Text style={styles.fontRegular}>
                        {(() => {
                            let result = "";
                            ingredientMap.forEach((value, key) => {
                                result += `${value} ${key} `;
                            });
                            return result;
                        })()}
                    </Text>
                </View>
                <ScrollView style={styles.ingredientContainer} horizontal={true}>
                    {recipeIngredients.map((ingredient, index) => (
                        <MealMiniature
                            mealName={ingredient.strIngredient}
                            mealThumb={`https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}.png`}
                            onPress={() => navigateToIngredientDetails(ingredient)}
                        />
                    ))}
                    {isLoading ? <ActivityIndicator size="large"/> : null}
                </ScrollView>
                <View style={[styles.textContainer, {marginBottom: 100}]}>
                    <Text style={styles.fontLarge}>Categories</Text>
                    <Text style={styles.fontRegular}>{recipe.strInstructions}</Text>
                </View>
            </ScrollView>
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
        borderRadius: 20,
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
        width: windowWidth - 40,
        height: undefined,
        aspectRatio: 1,
        resizeMode: 'stretch',
        borderRadius: 12,
        overflow: "hidden",
    },
});