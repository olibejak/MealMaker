import {View, StyleSheet, ScrollView, Text} from "react-native";
import TopNavigationBar from "../../components/navigation/TopNavigationBar";
import BottomNavigationBar from "../../components/navigation/BottomNavigationBar";
import {BookIcon, EditIcon, FridgeWithArrow, HamburgerIcon, PlusIcon} from "../../assets/icons";
import EditSetAmountModal from "../../components/modals/EditSetAmountModal"; // Import the modal component
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {useCallback, useEffect, useState} from "react";
import ListItem from "../../components/lists/ListItem";
import BottomRightCornerButton from "../../components/buttons/BottomRightCornerButton";
import {useIsFocused} from "@react-navigation/native";
import ConfirmationModal from "../../components/modals/ConfirmationModal";
import log from "../../utils/Logger";

export default function ShoppingListScreen () {
    const title = "Shopping list";
    const selectedBottomBar = "ShoppingList";
    const [shoppingListContent, setShoppingListContent] = useState([]);
    const [fridgeContent, setFridgeContent] = useState([]);            // For moving checked items to fridge
    const isFocused = useIsFocused();
    const [modalVisible, setModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false); // State to manage the visibility of the edit modal
    const [deleteVisible, setDeleteVisible] = useState(false);       // Visibility of delete button in modal
    const [selectedIngredient, setSelectedIngredient] = useState(null);       // State to store the selected ingredient for editing
    const [isNewIngredient, setIsNewIngredient] = useState(false)    // Ingredient isn't yet in the shopping list

    // Sum amounts with same units
    const parseAmount = (str1, str2) => {
        if (str1 === "" && str2 === "")
            return "";

        const arr1 = str1.split(',').map(item => item.trim());
        const arr2 = str2.split(',').map(item => item.trim());

        for (let i = 0; i < arr1.length; i++) {
            // Parse number and unit from the current item in arr1
            const [number1 = '0', unit1 = ''] = arr1[i].split(/\s*(?=[a-zA-Z])/); // Split numbers and letters
            // Iterate through each item in the second array
            for (let j = 0; j < arr2.length; j++) {
                // Parse number and unit from the current item in arr2
                const [number2 = '0', unit2 = ''] = arr2[j].split(/\s*(?=[a-zA-Z])/); // Split numbers and letters

                // Check if units are the same
                if (unit1 === unit2 || (!unit1 && !unit2)) {
                    // If units are the same, sum the numbers
                    arr2[j] = `${number1? parseFloat(number1) : '' +
                        number2 ? parseFloat(number2) : ''} ${unit2 ? unit2 : ""}`;
                    break; // No more iteration needed
                }
                // If same unit not found, add new item to array
                else if (j === arr2.length - 1) {
                    arr2.push(arr1[i]);
                    break; // Array length changed, need to break
                }
            }
        }
        return arr2.join(", ");
    }

    // Move checked items to fridge and remove from shopping list
    const moveToFridge = async () => {
        try {
            // Update the amounts if an ingredient with the same name exists in both lists
            shoppingListContent.forEach(shoppingItem => {
                if (shoppingItem.isBought) {
                    const existingItemIndex = fridgeContent.findIndex(fridgeItem => fridgeItem.name === shoppingItem.name);
                    if (existingItemIndex !== -1) {
                        // Ingredient with the same name exists in fridge content
                        const existingItem = fridgeContent[existingItemIndex];
                        existingItem.amount = parseAmount(
                            shoppingItem.amount.trim().toLowerCase(),
                            existingItem.amount.trim().toLowerCase()
                        ); // Update the amount
                        fridgeContent[existingItemIndex] = existingItem;
                    } else {
                        // Ingredient with this name doesn't exist, add it to the fridge content
                        fridgeContent.push(shoppingItem);
                    }
                }
            });

            // Save the updated fridge content back to AsyncStorage
            await AsyncStorage.setItem('fridgeContent', JSON.stringify(fridgeContent));

            // Filter out the bought items from the shopping list content
            const updatedShoppingListContent = shoppingListContent.filter(item => !item.isBought);
            // Save the updated shopping list content back to AsyncStorage
            await AsyncStorage.setItem("shoppingListContent", JSON.stringify(updatedShoppingListContent));

            // Update the shopping list content state
            setShoppingListContent(updatedShoppingListContent);

            //close modal window
            setModalVisible(false);

            log.info('Fridge content updated successfully.');
        } catch (error) {
            log.error('Error merging lists:', error);
        }
    };

    // Load current shopping list content
    const loadContent = useCallback (async () => {
        // Load fridge content
        const shoppingListContent = await AsyncStorage.getItem("shoppingListContent")
            .catch(error => log.error("Error loading shoppingListContent:", error));
        if (shoppingListContent) {
            setShoppingListContent(JSON.parse(shoppingListContent));
        }
        // Load fridge Content
        const fridgeContent = await AsyncStorage.getItem("fridgeContent")
            .catch(error => log.error("Error loading fridgeContent:", error));
        if (fridgeContent) {
            setFridgeContent(JSON.parse(fridgeContent));
        }
    }, []);
    useEffect(() => {
        if (isFocused) {
            loadContent().catch(error => log.error("Error loading AsyncStorage:", error));
        }
    }, [isFocused, loadContent]);

    // Add new ingredient
    const persistShoppingListContent = async() => {
        // Add ingredient to shoppingListContent if it's not empty
        if (isNewIngredient && selectedIngredient.name !== "") {
            const duplicateItemIndex = shoppingListContent.findIndex(
                item => item.name.toLowerCase().trim() === selectedIngredient.name.toLowerCase().trim());

            // Sum amounts with same units, else join strings
            if (duplicateItemIndex >= 0) {
                shoppingListContent[duplicateItemIndex].amount =
                    `${parseAmount(selectedIngredient.amount.trim().toLowerCase(),
                        shoppingListContent[duplicateItemIndex].amount.trim().toLowerCase())}`;
            }
            // Add new ingredient to shopping list
            else {
                setShoppingListContent([...shoppingListContent, selectedIngredient]);
            }
            setIsNewIngredient(false);
        }
        // Add ingredient to AsyncStorage
        const content = await AsyncStorage.getItem("shoppingListContent");
        if (content !== null) {
            await AsyncStorage.setItem("shoppingListContent", JSON.stringify(shoppingListContent));
        }
    }
    useEffect(() => {
        if (isFocused)
            persistShoppingListContent()
                .catch(error => log.error("Error saving shopping list content:", error))
    }, [isFocused, fridgeContent, persistShoppingListContent])

    // Update checked ingredient in AsyncStorage
    const updateIsBought = async (index) => {
        try {
            if (shoppingListContent !== null) {
                // Check if the index is within the range of the array
                if (index >= 0 && index < shoppingListContent.length) {
                    // Update the isBought property of the ingredient at the specified index
                    shoppingListContent[index].isBought = !shoppingListContent[index].isBought;

                    // Save the updated array back to storage
                    await AsyncStorage.setItem("shoppingListContent", JSON.stringify(shoppingListContent));

                    // Optionally, update state or perform any other action
                } else {
                    log.warn("Invalid index.");
                }
            }
        } catch (error) {
            log.error("Error updating isBought property:", error);
        }
    };

    // "pencil" icon in Ingredient card
    const openEditModal = (ingredient) => {
        setSelectedIngredient(ingredient);
        setDeleteVisible(true);
        setEditModalVisible(true);
    };

    // floating "plus" button
    const openEmptyEditModal = () => {
        setSelectedIngredient({name: '', amount: ''});
        setIsNewIngredient(true);
        setDeleteVisible(false);
        setEditModalVisible(true);
    };

    return (
        <View style={styles.screen}>
            <View>
                <TopNavigationBar title={title} LeftIcon={HamburgerIcon} RightIcon={BookIcon} />
            </View>
            {shoppingListContent.length === 0 ?
                <Text style={styles.emptyText}>No items in the fridge, click + to add some more</Text>
                :
            <ScrollView style={styles.scrollableScreen} contentContainerStyle={styles.scrolling}>
                {typeof shoppingListContent == "object" ? shoppingListContent.map((ingredient, index) => (
                    <ListItem
                        key={index}
                        title={ingredient.name}
                        content={ingredient.amount}
                        dividers={'False'}
                        IconComponent={EditIcon}
                        onPress={() => updateIsBought(index)}
                        onEditPress={() => openEditModal(ingredient)} // Add this to handle edit press
                        isChecked={ingredient.isBought}>
                    </ListItem>
                )) : null}
            </ScrollView>}
            <BottomRightCornerButton
                IconComponent={FridgeWithArrow}
                onPress={() => setModalVisible(true)}  // Only set modal to visible
                SecondIconComponent={PlusIcon}
                secondOnPress={openEmptyEditModal}
            />
            <BottomNavigationBar selected={selectedBottomBar}/>
            {modalVisible && (
                <ConfirmationModal
                    onConfirm={() => moveToFridge()}
                    onCancel={() => setModalVisible(false)}
                    visible={modalVisible}
                    title={'Move items into fridge?'}
                    text={'This will move all selected items from the shopping list into the fridge.'}
                />
            )}
            {editModalVisible && ( // Render the edit modal conditionally
                <EditSetAmountModal
                    visible={editModalVisible}
                    ingredient={selectedIngredient}
                    onClose={() => setEditModalVisible(false)}
                    deleteIngredient={() =>
                        setShoppingListContent(shoppingListContent.filter(item => item !== selectedIngredient))}
                    showDelete={deleteVisible}
                />
            )}
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
        backgroundColor: '#FFF',
    },
    scrollableScreen: {
        backgroundColor: '#FFF',
        paddingTop: 8,
        paddingBottom: 8,
    },
    scrolling: {
        alignItems: 'center',
        paddingBottom: 90,
        backgroundColor: "#FFF",
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
    fontLarge: {
        fontFamily: 'Roboto-Regular',
        fontSize: 22,
    },
    textCenter: {
        textAlign: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: for a dimmed background effect
    },
    emptyText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 18,
        color: '#666',
        textAlignVertical: 'center',
        textAlign: 'center',
        padding: 16,
    },

});

