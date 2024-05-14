import {View, StyleSheet, FlatList, ActivityIndicator, InteractionManager, Text} from "react-native";
import React, {useEffect, useRef, useState} from "react";
import TopNavigationBar from "../../components/navigation/TopNavigationBar";
import BottomNavigationBar from "../../components/navigation/BottomNavigationBar";
import SearchBar from "../../components/searchbar/SearchBar";
import IngredientCard from "../../components/cards/IngredientCard";
import {ArrowDropUp, BookIcon, HamburgerIcon} from "../../assets/icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EditSetAmountModal from "../../components/modals/EditSetAmountModal";
import {useIsFocused} from "@react-navigation/native";
import SnackbarModal from "../../components/modals/SnackbarModal";
import log from "../../utils/Logger";
import BottomRightCornerButton from "../../components/buttons/BottomRightCornerButton";

export default function IngredientsScreen({ navigation }) {
    const [ingredients, setIngredients] = useState([]);
    const [displayedIngredients, setDisplayedIngredients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeSearch, setActiveSearch] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedIngredient, setSelectedIngredient] = useState(null);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [favouriteIngredients, setFavouriteIngredients] = useState([]);
    const [activeFilter, setActiveFilter] = useState(null);
    const isFocused = useIsFocused();
    const [snackbarModalVisible, setSnackbarModalVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const flatListRef = useRef(null);

    useEffect(() => {
        setIsLoading(true);
        InteractionManager.runAfterInteractions(() => {
            const fetchIngredients = async () => {
                const url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
                try {
                    const response = await fetch(url);
                    const json = await response.json();
                    // meals == array of ingredients/meals fetched from TheMealDB
                    setIngredients(json.meals);
                    setDisplayedIngredients(json.meals.slice(0, 10)); // Initially display only the first 10 items
                    setCurrentIndex(10);
                } catch (error) {
                    log.error("Failed to fetch ingredients:", error);
                    await AsyncStorage.getItem("favouriteIngredients")
                        .then((data) => {setIngredients(JSON.parse(data))})
                        .catch((error) => log.error("Error loading favourite ingredients:", error))
                } finally {
                    setIsLoading(false);
                }
            };
            fetchIngredients()
                .catch(error => log.error("Failed to fetch ingredients", error));
        });
    }, []);

    // Get favourite ingredients from AsyncStorage
    useEffect( () => {
        const loadFavouriteIngredients = async () => {
            const content = await AsyncStorage.getItem("favouriteIngredients");
            if (content !== null) {
                setFavouriteIngredients(JSON.parse(content));
            }
        }
        if (isFocused) {
            loadFavouriteIngredients().catch(error => log.error("Error loading favourite ingredients:", error));
        }
    }, [isFocused])

    // Load more ingredients that are actively displayed
    const loadMoreIngredients = () => {
        if (currentIndex < ingredients.length) {
            const newIndex = currentIndex + 10;
            const newItems = ingredients.slice(currentIndex, newIndex);
            setDisplayedIngredients([...displayedIngredients, ...newItems]);
            setCurrentIndex(newIndex);
        }
    };

    // Add ingredient to shopping list or fridge
    const addIngredientToStorage = async (ingredient, storage, amount) => {
        const newIngredient = Object.assign({}, ingredient);
        // strIngredients == name of the ingredient from TheMealDB
        newIngredient.name = ingredient.strIngredient;
        newIngredient.amount = amount;
        try {
            // Get existing fridge content
            const existingContent = await AsyncStorage.getItem(storage);
            let newContent = [];
            if (existingContent !== null) {
                newContent = JSON.parse(existingContent);
            }
            // Check if ingredient already exists in the fridge
            const existingIngredientIndex
                // strIngredients == name of the ingredient from TheMealDB
                = newContent.findIndex(item => item.strIngredient === ingredient.strIngredient)
            if (existingIngredientIndex > -1) {
                // Ingredient already exists, update its amount by joining with the new amount
                if(newContent[existingIngredientIndex].amount.trim() === "")
                    newContent[existingIngredientIndex].amount += `${newIngredient.amount}`;
                else
                    newContent[existingIngredientIndex].amount = parseAmount(
                        newIngredient.amount.trim().toLowerCase(),
                        newContent[existingIngredientIndex].amount.trim().toLowerCase()
                    );
            } else {
                // Ingredient does not exist, add it to the fridge
                newContent.push(newIngredient);
            }
            // Save updated fridge content
            await AsyncStorage.setItem(storage, JSON.stringify(newContent));
        } catch (error) {
            log.error("Error adding to storage:", error);
        }
    }

    // Sum amounts with same units
    const parseAmount = (str1, str2) => {
        if (str1 === "" && str2 === "")
            return "";

        const arr1 = str1.split(',').map(item => item.trim());
        const arr2 = str2.split(',').map(item => item.trim());

        for (let i = 0; i < arr1.length; i++) {
            let number1, unit1;
            // Parse number and unit from the current item in arr1
            if (/^[a-zA-Z]+$/.test(arr1[i])) {
                number1 = '1'; // Set number to '1' when only letters are present
                unit1 = arr1[i];  // Set unit to the entire item
            } else {
                // Split the item into numbers and letters
                const [numbersPart, ...lettersPart] = arr1[i].split(/(?=[a-zA-Z])/);

                // Check if there is a numbers part
                if (numbersPart) {
                    number1 = numbersPart; // Set number to the numbers part
                }

                // Join the letters part back into a string
                unit1 = lettersPart.join('');
            }
            // Iterate through each item in the second array
            for (let j = 0; j < arr2.length; j++) {
                // Parse number and unit from the current item in arr2
                let number2, unit2;
                // Split numbers and letters
                if (/^[a-zA-Z]+$/.test(arr2[j])) {
                    number2 = '1'; // Set number to '1' when only letters are present
                    unit2 = arr2[j];  // Set unit to the entire item
                } else {
                    // Split the item into numbers and letters
                    const [numbersPart, ...lettersPart] = arr2[j].split(/(?=[a-zA-Z])/);

                    // Check if there is a numbers part
                    if (numbersPart) {
                        number2 = numbersPart; // Set number to the numbers part
                    }

                    // Join the letters part back into a string
                    unit2 = lettersPart.join('');
                }
                // Check if units are the same
                if (unit1 === unit2 || (!unit1 && !unit2)) {
                    // If units are the same, sum the numbers
                    arr2[j] = `${parseFloat(number1) + parseFloat(number2)} ${unit2 ? unit2 : ""}`;
                    break; // No more iteration needed
                }
                // If same unit not found, add new item to array
                else if (j === arr2.length - 1) {
                    arr2.push(arr1[i]);
                    break; // Array length changed, need to break
                }
            }
        }
        return arr2.filter(item => item.trim() !== "").join(", ");
    }

    const handleAddToFridge = () => {
        // strIngredients == name of the ingredient from TheMealDB
        const ingredientName = selectedIngredient.strIngredient;
        setSnackbarMessage(`${ingredientName} added to the fridge successfully!`);
        setSnackbarModalVisible(true); // Show the SnackbarModal when ingredient is added to fridge
    };

    const handleAddToBasket = () => {
        // strIngredients == name of the ingredient from TheMealDB
        const ingredientName = selectedIngredient.strIngredient;
        setSnackbarMessage(`${ingredientName} added to the shopping list successfully!`);
        setSnackbarModalVisible(true); // Show the SnackbarModal when ingredient is added to basket
    };

    const handleEditAmount = (ingredient, destination) => {
        setSelectedIngredient(ingredient)
        setSelectedDestination(destination)
        setModalVisible(true);
    };

    // Add selected ingredient to storage after confirm
    const handleConfirmEdit = async (amount) => {
        await addIngredientToStorage(selectedIngredient, selectedDestination, amount)
        setModalVisible(false);
        if (selectedDestination === "fridgeContent") {
            handleAddToFridge();
        } else {
            handleAddToBasket();
        }
    };

    const renderItem = ({ item }) => (
        <IngredientCard
            text={item.strIngredient} // strIngredients == name of the ingredient from TheMealDB
            fridgeButtonOn={true}
            cartButtonOn={true}
            onPress={() => navigation.navigate("IngredientDetails", { ingredient: item })}
            onPressFridge={() => handleEditAmount(item, "fridgeContent")}
            onPressCart={() => handleEditAmount(item, "shoppingListContent")}
        />
    );

    return (
        <View style={styles.screen}>
            <TopNavigationBar title="Ingredients" LeftIcon={HamburgerIcon} RightIcon={BookIcon} />
            <FlatList
                ref={flatListRef}
                data={ activeFilter ? favouriteIngredients.filter(item => activeSearch ?
                    // strIngredients == name of the ingredient from TheMealDB
                    item && item.strIngredient && item.strIngredient.toLowerCase().includes(activeSearch.trim()) : true)
                    : ingredients
                    .filter(item => activeSearch ?
                        item && item.strIngredient && item.strIngredient.toLowerCase().includes(activeSearch.trim()) : true)}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={
                    <SearchBar
                        setFilter={(category) => setActiveFilter(category)}
                        context={"ingredients"}
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
                onEndReached={loadMoreIngredients}
                onEndReachedThreshold={0.7}
                initialNumToRender={10}
            />
            <BottomRightCornerButton IconComponent={ArrowDropUp}
                                     onPress={() => flatListRef.current.scrollToOffset({offset: 0, animated: true})}/>
            <BottomNavigationBar />
            <EditSetAmountModal
                visible={modalVisible}
                ingredient={selectedIngredient}
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
        paddingBottom: 100,
    },

    iconSize: {
        width: 24,
        height: 24,
        padding: 8,
    },
    loadingScreen: {
        width: "100%",
        height: "100%",
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