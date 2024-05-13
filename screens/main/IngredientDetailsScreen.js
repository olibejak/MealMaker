import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import TopNavigationBar from '../../components/navigation/TopNavigationBar';
import BottomNavigationBar from '../../components/navigation/BottomNavigationBar';
import SnackbarModal from '../../components/modals/SnackbarModal';
import { BackArrowIcon, FridgeCardIcon, BasketCardIcon, StarOutlineIcon, StarFilledIcon } from '../../assets/icons';
import MealMiniature from '../../components/image/MealMiniature';
import {useEffect, useRef, useState} from "react";
import EditSetAmountModal from "../../components/modals/EditSetAmountModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import log from "../../utils/Logger";
import {useIsFocused} from "@react-navigation/native";

export default function IngredientDetailsScreen ({ route, navigation }) {
    const { ingredient } = route.params;
    const [mealsFromIngredient, setMealsFromIngredient] = useState([]);
    const [isFavourite, setIsFavourite] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const starIconToRender = isFavourite ? StarFilledIcon : StarOutlineIcon;
    const [selectedStorage, setSelectedStorage] = useState("");
    const [snackbarModalVisible, setSnackbarModalVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const scrollViewRef = useRef(null); // Hook for resetting scroll view scroll position
    const isFocused = useIsFocused();

    // Scroll to top when the screen is focused
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

    // Retrieve favorites from local storage
    useEffect(() => {
        AsyncStorage.getItem('favouriteIngredients')
            .then((favourites) => {
                if (favourites) {
                    const favoriteIngredients = JSON.parse(favourites);
                    setIsFavourite(favoriteIngredients.findIndex(
                        // strIngredient == name of the ingredient in TheMealDB - type: string
                        favIngredient => favIngredient.idIngredient === ingredient.idIngredient) > -1);
                }
            })
            .catch((error) => log.error('Error retrieving favorites:', error));
    }, [route]);

    const toggleFavorite = async () => {
        AsyncStorage.getItem('favouriteIngredients')
            .then((favourites) => {
                let favouriteIngredients = favourites ? JSON.parse(favourites) : [];
                if (isFavourite) {
                    // Remove from favorites
                    favouriteIngredients = favouriteIngredients.filter(
                        // strIngredient == name of the ingredient in TheMealDB - type: string
                        (favIngredient) => ingredient.idIngredient !== favIngredient.idIngredient);
                    setIsFavourite(false)
                } else {
                    // Add to favorites
                    favouriteIngredients.push(ingredient);
                    setIsFavourite(true)
                }
                // Update local storage
                AsyncStorage.setItem('favouriteIngredients', JSON.stringify(favouriteIngredients))
                    .catch((error) => log.error('Error updating favorites:', error));
            })
            .catch((error) => log.error('Error retrieving favorites:', error));
    };

    const parsedIngredientName = () => {
        // strIngredient == name of the ingredient in TheMealDB - type: string
        let parsedString = ingredient.strIngredient.toLowerCase();
        parsedString = parsedString.replace(/ /g, '_');
        return parsedString;
    }

    // Find selected meal in TheMealDB (meals from ingredient are insufficient)
    const navigateToMealDetails = async(idMeal) => {
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
        try {
            const response = await fetch(url);
            const json = await response.json();
            const meals = json.meals;

            if (meals && meals.length > 0) {
                const meal = meals[0];
                navigation.navigate("RecipeDetails", { recipe: meal });
            } else {
                // Handle case where meal data is empty or undefined
                log.error("Meal data is empty or undefined.");
            }
        } catch (error) {
            // Handle fetch or JSON parsing errors
            log.error("Error fetching meal data:", error);
        }
    };

    useEffect(() => {
            const fetchMealsFromIngredient = async () => {
                const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${parsedIngredientName()}`;
                const response = await fetch(url);
                const json = await response.json();
                setMealsFromIngredient(json.meals); // meals == array of meals/ingredients fetched from TheMealDB
            };
            fetchMealsFromIngredient().catch(error => log.error("Failed to fetch ingredients:", error));
    }, [route]);

    const renderMealMiniatures = ({item, index}) => {
        return (
            <MealMiniature
                key={index}
                mealName={item.strMeal} // strMeal == name of the meal in TheMealDB - type: string
                mealThumb={item.strMealThumb} // strMealThumb == URL of the meal thumbnail in TheMealDB - type: string(URL)
                onPress={() => navigateToMealDetails(item.idMeal)} // idMeal == id of the meal in TheMealDB - type: string
            />
        )
    }

    const handleAddToFridge = () => {
        // strIngredient == name of the ingredient in TheMealDB - type: string
        const ingredientName = ingredient.strIngredient;
        setSnackbarMessage(`${ingredientName} added to the fridge successfully!`);
        setSnackbarModalVisible(true); // Show the SnackbarModal when ingredient is added to fridge
    };

    const handleAddToBasket = () => {
        // strIngredient == name of the ingredient in TheMealDB - type: string
        const ingredientName = ingredient.strIngredient;
        setSnackbarMessage(`${ingredientName} added to the shopping list successfully!`);
        setSnackbarModalVisible(true); // Show the SnackbarModal when ingredient is added to basket
    };

    const handleEditAmount = (storage) => {
        setModalVisible(true);
        setSelectedStorage(storage)
    };

    const handleConfirmEdit = async (amount) => {
        await addIngredientToStorage(amount);
        setModalVisible(false);
        if (selectedStorage === "fridgeContent") {
            handleAddToFridge();
        } else {
            handleAddToBasket();
        }
    };

    // Add ingredient to shopping list or fridge
    const addIngredientToStorage = async (amount) => {
        const newIngredient = Object.assign({}, ingredient);
        // strIngredient == name of the ingredient in TheMealDB - type: string
        newIngredient.name = ingredient.strIngredient;
        newIngredient.amount = amount;
        try {
            // Get existing fridge content
            const existingContent = await AsyncStorage.getItem(selectedStorage);
            let newContent = [];
            if (existingContent !== null) {
                newContent = JSON.parse(existingContent);
            }
            // Check if ingredient already exists in the fridge
            const existingIngredientIndex
                // strIngredient == name of the ingredient in TheMealDB - type: string
                = newContent.findIndex(item => item.strIngredient === ingredient.strIngredient)
            if (existingIngredientIndex > -1) {
                // Ingredient already exists, update its amount by joining with the new amount
                if(newContent[existingIngredientIndex].amount.trim() === "")
                    newContent[existingIngredientIndex].amount += `${newIngredient.amount}`;
                else
                    newContent[existingIngredientIndex].amount += `, ${newIngredient.amount}`;
            } else {
                // Ingredient does not exist, add it to the fridge
                newContent.push(newIngredient);
            }
            // Save updated fridge content
            await AsyncStorage.setItem(selectedStorage, JSON.stringify(newContent));
        } catch (error) {
            log.error("Error adding to storage:", error);
        }
    }

    return (
        <View style={styles.screen}>
            <View>
                {/* strIngredient == name of the ingredient in TheMealDB - type: string*/}
                <TopNavigationBar title={ingredient.strIngredient} LeftIcon={BackArrowIcon}
                                  RightIcon={starIconToRender} starAction={toggleFavorite} />
            </View>
            <ScrollView style={styles.scrollableScreen} ref={scrollViewRef}>
                <View style={styles.imageContainer}>
                    {/* strIngredient == name of the ingredient in TheMealDB - type: string*/}
                    <Image source={{uri: `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}.png`,}} style={styles.image} />
                </View>
                <View style={styles.addToButtonsContainer}>
                    <TouchableOpacity style={styles.addToButton} onPress={() => handleEditAmount("fridgeContent")}>
                        <Text style={styles.fontButton}>Add to</Text>
                        <FridgeCardIcon/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addToButton} onPress={() => handleEditAmount("shoppingListContent")}>
                        <Text style={styles.fontButton}>Add to</Text>
                        <BasketCardIcon />
                    </TouchableOpacity>
                </View>
                <IngredientDetails ingredient={ingredient} />
                <View style={styles.textContainer}>
                    <Text style={styles.cardTitle}>Description</Text>
                    {/* strDescription == description of the ingredient in TheMealDB - type: string*/}
                    <Text style={styles.cardContent}>{ingredient.strDescription}</Text>
                </View>
                <FlatList
                    horizontal={true}
                    data={mealsFromIngredient}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderMealMiniatures}
                    style={styles.mealsContainer}
                    contentContainerStyle={styles.scrolling}
                    ListEmptyComponent={<ActivityIndicator style={styles.loadingContainer} size="large"/>}
                />
            </ScrollView>
            <BottomNavigationBar selected={"Ingredients"} />
            <EditSetAmountModal
                visible={modalVisible}
                ingredient={ingredient}
                onClose={() => setModalVisible(false)}
                onConfirm={(amount) => handleConfirmEdit(amount)}
                showDelete={false} // Hide delete button in this screen
            />
            <SnackbarModal
                textToDisplay={snackbarMessage}
                onDismiss={() => setSnackbarModalVisible(false)}
                visible={snackbarModalVisible}
            />
        </View>
    );
};

const IngredientDetails = ({ ingredient }) => {
    // Checks if strType is not empty, undefined, or null
    // strType == type of the ingredient in TheMealDB - type: string
    if (ingredient.strType) {
        return (
            <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>Type</Text>
                <Text style={styles.cardContent}>{ingredient.strType}</Text>
            </View>
        );
    } else {
        return null;  // Returns null if strType is empty, which means nothing will be rendered
    }
};

const styles = StyleSheet.create({
    mealsContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 16,
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
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    scrolling: {
        alignItems: 'center',
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        backgroundColor: '#FEF7FF',
        borderRadius: 12,
        padding: 16,
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
        backgroundColor: '#E6DEF6',
        borderRadius: 25,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginTop: 12,
        gap: 8,
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
        lineHeight: 20,
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
    fontButton: {
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
        letterSpacing: 0.5,
        marginLeft: 5,
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
    loadingContainer: {
        margin: 8,
    },
});
