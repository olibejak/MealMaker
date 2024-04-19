import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import TopNavigationBar from "../components/TopNavigationBar";
import BottomNavigationBar from "../components/BottomNavigationBar";
import {useEffect, useState} from "react";
import {
    BackArrowIcon,
    BasketCardIcon,
    PotIcon,
    StarFilledIcon,
    StarOutlineIcon
} from "../assets/icons";
import MealMiniature from "../components/MealMiniature";
import BottomRightCornerButton from "../components/BottomRightCornerButton";

export default function RecipeDetailsScreen ( { route, navigation } ) {
    const {recipe} = route.params;
    const [isLoading, setIsLoading] = useState(true);
    const [recipeIngredients, setRecipeIngredients] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);
    const starIconToRender = isFavorite ? StarFilledIcon  : StarOutlineIcon;
    const ingredientKeys = Object.keys(recipe).filter(key => key.startsWith('strIngredient'));
    const amountKeys = Object.keys(recipe).filter(key => key.startsWith('strMeasure'));

    const ingredientsList = ingredientKeys.map((key, index) => {
        const ingredient = recipe[key];
        const amount = recipe[amountKeys[index]];

        // Check if ingredient is not null or empty string
        if (ingredient && ingredient.trim() !== '') {
            return `${amount} ${ingredient}`;
        }
        return null; // Filter out null or empty ingredient
    }).filter(item => item !== null).join(', ');
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
                const url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';

                try {
                    for (let ingredientIndex = 1; ingredientIndex < 21; ++ingredientIndex) {
                        if (recipe[`strIngredient${ingredientIndex}`] === null ||
                            recipe[`strIngredient${ingredientIndex}`] === "") {break;}
                        const ingredientName = capitalizeFirstLetter(recipe[`strIngredient${ingredientIndex}`])
                        // ingredientMap.set(recipe[`strIngredient${ingredientIndex}`], recipe[`strMeasure${ingredientIndex}`])
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

    const renderIngredientMiniatures = ({item, index}) => {
        return (
            <MealMiniature
                key={index}
                mealName={item.strIngredient}
                mealThumb={`https://www.themealdb.com/images/ingredients/${item.strIngredient}.png`}
                onPress={() => navigateToIngredientDetails(item)}
            />
        );
    }

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
                    <Text style={styles.cardContent}>
                        {ingredientsList}
                    </Text>
                </View>
                    <FlatList
                        horizontal={true}
                        data={recipeIngredients}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderIngredientMiniatures}
                        style={styles.ingredientContainer}
                        contentContainerStyle={styles.scrolling}
                        ListEmptyComponent={
                            <ActivityIndicator style={styles.loadingContainer} size="large"/>
                        }
                    />
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