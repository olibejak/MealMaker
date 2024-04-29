import {View, StyleSheet, FlatList, ActivityIndicator, InteractionManager, Text} from "react-native";
import React, {useEffect, useRef, useState} from "react";
import TopNavigationBar from "../components/TopNavigationBar";
import BottomNavigationBar from "../components/BottomNavigationBar";
import SearchBar from "../components/SearchBar";
import IngredientCard from "../components/IngredientCard";
import { BookIcon, HamburgerIcon } from "../assets/icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EditSetAmountModal from "../components/EditSetAmountModal";
import {useIsFocused} from "@react-navigation/native";

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

    useEffect(() => {
        setIsLoading(true);
        InteractionManager.runAfterInteractions(() => {
            const fetchIngredients = async () => {
                const url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
                try {
                    const response = await fetch(url);
                    const json = await response.json();
                    setIngredients(json.meals);
                    setDisplayedIngredients(json.meals.slice(0, 10)); // Initially display only the first 10 items
                    setCurrentIndex(10);
                } catch (error) {
                    console.error("Failed to fetch ingredients:", error);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchIngredients();
        });
    }, []);

    useEffect( () => {
        const loadFavouriteIngredients = async () => {
            try {
                // Load fridge content
                const content = await AsyncStorage.getItem("favouriteIngredients");
                if (content !== null) {
                    setFavouriteIngredients(JSON.parse(content));
                }
            } catch (error) {
                console.error("Error loading favourite ingredients:", error);
            }
        }
        if (isFocused) {
            loadFavouriteIngredients();
        }
    }, [isFocused])

    const loadMoreIngredients = () => {
        if (currentIndex < ingredients.length) {
            const newIndex = currentIndex + 10;
            const newItems = ingredients.slice(currentIndex, newIndex);
            setDisplayedIngredients([...displayedIngredients, ...newItems]);
            setCurrentIndex(newIndex);
        }
    };

    const renderItem = ({ item }) => (
        <IngredientCard
            text={item.strIngredient}
            fridgeButtonOn={true}
            cartButtonOn={true}
            onPress={() => navigation.navigate("IngredientDetails", { ingredient: item })}
            onPressFridge={() => handleEditAmount(item, "fridgeContent")}
            onPressCart={() => handleEditAmount(item, "shoppingListContent")}
        />
    );

    const addIngredientToStorage = async (ingredient, storage, amount) => {
        const newIngredient = Object.assign({}, ingredient);
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
            await AsyncStorage.setItem(storage, JSON.stringify(newContent));
        } catch (error) {
            console.error("Error adding to storage:", error);
        }
    }

    const handleEditAmount = (ingredient, destination) => {
        setSelectedIngredient(ingredient)
        setSelectedDestination(destination)
        setModalVisible(true);
    };

    const handleConfirmEdit = (amount) => {
        addIngredientToStorage(selectedIngredient, selectedDestination, amount)
        setModalVisible(false);
    };

    return (
        <View style={styles.screen}>
            <TopNavigationBar title="Ingredients" LeftIcon={HamburgerIcon} RightIcon={BookIcon} />
            <FlatList
                data={ activeFilter ? favouriteIngredients.filter(item => activeSearch ?
                    item && item.strIngredient && item.strIngredient.toLowerCase().startsWith(activeSearch.trim()) : true)
                    : ingredients
                    .filter(item => activeSearch ?
                        item && item.strIngredient && item.strIngredient.toLowerCase().startsWith(activeSearch.trim()) : true)}
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
            <BottomNavigationBar />
            <EditSetAmountModal
                visible={modalVisible}
                ingredient={selectedIngredient}
                onClose={() => setModalVisible(false)}
                onConfirm={(amount) => handleConfirmEdit(amount)}
                showDelete={false} // Hide delete button in this screen
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
        paddingBottom: 16,
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