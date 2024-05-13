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
import TopNavigationBar from "../../components/navigation/TopNavigationBar";
import BottomNavigationBar from "../../components/navigation/BottomNavigationBar";
import {useEffect, useRef, useState} from "react";
import {
    BackArrowIcon,
    BasketCardIcon,
    PotIcon,
    StarFilledIcon,
    StarOutlineIcon
} from "../../assets/icons";
import MealMiniature from "../../components/image/MealMiniature";
import BottomRightCornerButton from "../../components/buttons/BottomRightCornerButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import log from "../../utils/Logger";
import SnackbarModal from "../../components/modals/SnackbarModal";
import {useIsFocused} from "@react-navigation/native";

export default function RecipeDetailsScreen ( { route, navigation } ) {
    const {recipe} = route.params;
    const [recipeIngredients, setRecipeIngredients] = useState([]);
    const [isFavourite, setIsFavourite] = useState(false);
    const starIconToRender = isFavourite ? StarFilledIcon  : StarOutlineIcon;
    const ingredientKeys = Object.keys(recipe).filter(key => key.startsWith('strIngredient'));
    const amountKeys = Object.keys(recipe).filter(key => key.startsWith('strMeasure'));
    const [snackbarModalVisible, setSnackbarModalVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const scrollViewRef = useRef(null);
    const isFocused = useIsFocused();

    // Scroll to top when the screen when focused
    useEffect(() => {
        const handleScrollToTop = () => {
            if (scrollViewRef.current) {
                scrollViewRef.current.scrollTo({x: 0, y: 0, animated: false});
            }
        };
        if (isFocused) {
            handleScrollToTop();
        }
    }, [isFocused]);

    // Retrieve favourites from local storage
    useEffect(() => {
        AsyncStorage.getItem('favouriteRecipes')
            .then((favourites) => {
                if (favourites) {
                    const favouriteRecipes = JSON.parse(favourites);
                    setIsFavourite(favouriteRecipes.findIndex(
                        // idMeal == id of the meal from TheMealDB
                        favouriteRecipe => favouriteRecipe.idMeal === recipe.idMeal) > -1);
                }
            })
            .catch((error) => log.error('Error retrieving favourites:', error));
    }, [route]);

    const toggleFavourite = async () => {
        AsyncStorage.getItem('favouriteRecipes')
            .then((favourites) => {
                let favouriteRecipes = favourites ? JSON.parse(favourites) : [];
                if (isFavourite) {
                    // Remove from favourites
                    favouriteRecipes = favouriteRecipes.filter(
                        // idMeal == id of the meal from TheMealDB
                        (favouriteRecipe) => recipe.idMeal !== favouriteRecipe.idMeal);
                    setIsFavourite(false)
                } else {
                    // Add to favourites
                    favouriteRecipes.push(recipe);
                    setIsFavourite(true)
                }
                // Update local storage
                AsyncStorage.setItem('favouriteRecipes', JSON.stringify(favouriteRecipes))
                    .catch((error) => log.error('Error updating favourites:', error));
            })
            .catch((error) => log.error('Error retrieving favourites:', error));
    };

    // Recipe ingredients with their amounts
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

    // Handler for adding all recipe ingredients to shopping list
    const addIngredientsToShoppingList = async () => {
        try {
            // Get existing shopping list content
            const existingContent = await AsyncStorage.getItem("shoppingListContent");
            let newContent = [];
            if (existingContent !== null) {
                newContent = JSON.parse(existingContent);
            }

            // Filter out empty ingredient names and create an array of ingredients to add
            const ingredientsToAdd = ingredientKeys.map((key, index) => ({
                name: recipe[key],
                amount: recipe[amountKeys[index]] || 'N/A' // Use N/A if amount is missing
            })).filter(item => item.name);

            // Iterate over ingredients to add
            ingredientsToAdd.forEach(newIngredient => {
                // Check if the ingredient already exists in the shopping list
                const existingIndex = newContent.findIndex(
                    item => item.name && newIngredient.name &&
                    item.name.toLowerCase().trim() === newIngredient.name.toLowerCase().trim().toLowerCase()
                );
                if (existingIndex > -1) {
                    // If the ingredient already exists, update its amount by appending the new amount
                    if(newContent[existingIndex].amount.trim() === "")
                        newContent[existingIndex].amount += `${newIngredient.amount}`;
                    else
                        newContent[existingIndex].amount += `, ${newIngredient.amount}`;
                } else if (newIngredient.name) {
                    // If the ingredient does not exist, add it to the shopping list
                    newContent.push(newIngredient);
                }
            });

            // Save updated shopping list content
            await AsyncStorage.setItem("shoppingListContent", JSON.stringify(newContent));

            // Display Snackbar
            setSnackbarMessage('Ingredients added to shopping list!')
            setSnackbarModalVisible(true);
        } catch (error) {
            log.error("Error adding to shopping list:", error);
        }
    }

    // Fetch ingredients included in the given recipe
    useEffect(() => {
            const fetchIngredientsFromRecipe = async () => {
                const url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
                setRecipeIngredients([]);

                // Get every ingredient from strIngredient1 - strIngredient20
                // Filter out empty ingredients
                for (let ingredientIndex = 1; ingredientIndex < 21; ++ingredientIndex) {
                    if (recipe[`strIngredient${ingredientIndex}`] === null ||
                        recipe[`strIngredient${ingredientIndex}`] === "") {break;}
                    const ingredientName = capitalizeFirstLetter(recipe[`strIngredient${ingredientIndex}`])
                    const response = await fetch(url);
                    const json = await response.json();
                    // Link ingredient name to right object
                    // meals == array of ingredients/meals fetched from TheMealDB
                    // strIngredient == name of the ingredient from TheMealDB
                    if (json.meals.find(meal => meal.strIngredient === ingredientName)) {
                        setRecipeIngredients(prevIngredients =>
                            [...prevIngredients, json.meals.find(meal => meal.strIngredient === ingredientName)]);
                    }
                }
            };
            fetchIngredientsFromRecipe().catch(error => log.error("Failed to fetch ingredients:", error));
        }
        , [route]);

    const renderIngredientMiniatures = ({item, index}) => {
        return (
            <MealMiniature
                key={index}
                // strIngredient == name of the ingredient from TheMealDB
                mealName={item.strIngredient}
                mealThumb={`https://www.themealdb.com/images/ingredients/${item.strIngredient}.png`}
                onPress={() => navigateToIngredientDetails(item)}
            />
        );
    }

    return (
        <View style={styles.screen}>
            <View>
                {/* strMeal == name of the meal from TheMealDB */}
                <TopNavigationBar title={recipe.strMeal} LeftIcon={BackArrowIcon}
                                  RightIcon={starIconToRender} starAction={toggleFavourite} />
            </View>
            <ScrollView style={styles.scrollableScreen} ref={scrollViewRef}>
                <View style={styles.imageContainer}>
                    {/* strMealThumb == URL of the meal thumbnail from TheMealDB - type: string (URL) */}
                    <Image source={{uri: `${recipe.strMealThumb}`}} style={styles.image} />
                </View>
                <View style={styles.addToButtonsContainer}>
                    <TouchableOpacity style={styles.addToButton} onPress={addIngredientsToShoppingList}>
                        <Text style={styles.fontButton}>Add Ingredients to</Text>
                        <BasketCardIcon />
                    </TouchableOpacity>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.cardTitle}>Categories</Text>
                    {/* strCategory == category of the meal from TheMealDB */}
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
                    {/* strInstructions = instructions of the meal from TheMealDB */}
                    <Text style={styles.cardContent}>{recipe.strInstructions}</Text>
                </View>
            </ScrollView>
            <BottomRightCornerButton
                IconComponent={PotIcon}
                onPress={navigateToStepByStepRecipeScreen}
            />
            <BottomNavigationBar selected={"Ingredients"} />
            <SnackbarModal
                textToDisplay={snackbarMessage}
                onDismiss={() => setSnackbarModalVisible(false)}
                visible={snackbarModalVisible}
            />
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