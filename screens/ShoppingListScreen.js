import {View, StyleSheet, ScrollView, TouchableOpacity, Modal, Text} from "react-native";
import TopNavigationBar from "../components/TopNavigationBar";
import BottomNavigationBar from "../components/BottomNavigationBar";
import {BookIcon, EditIcon, HamburgerIcon, PlusIcon, ShoppingCartIcon} from "../assets/icons";
import EditSetAmountModal from "../components/EditSetAmountModal"; // Import the modal component

import AsyncStorage from "@react-native-async-storage/async-storage";
import {useCallback, useEffect, useState} from "react";
import ListItem from "../components/ListItem";
import BottomRightCornerButton from "../components/BottomRightCornerButton";
import {useIsFocused} from "@react-navigation/native";

export default function ShoppingListScreen () {
    const title = "Shopping list";
    const selectedBottomBar = "ShoppingList";
    const [shoppingListContent, setShoppingListContent] = useState([]);
    const [fridgeContent, setFridgeContent] = useState([]);
    const isFocused = useIsFocused();
    const [modalVisible, setModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false); // State to manage the visibility of the edit modal
    const [selectedIngredient, setSelectedIngredient] = useState(null); // State to store the selected ingredient for editing


    const loadShoppingListContent = useCallback (async () => {
        try {
            // Load fridge content
            const content = await AsyncStorage.getItem("shoppingListContent");
            if (content !== null) {
                setShoppingListContent(JSON.parse(content));

            }
            const fContent = await AsyncStorage.getItem("fridgeContent");
            if (fContent !== null) {
                setFridgeContent(JSON.parse(fContent));
            }
            // await addToShoppingList({name: "Butter", amount: "100g", isBought: false});

        } catch (error) {
            console.error("Error loading shopping list content:", error);
        }
    }, []);

    const addToShoppingList = async (ingredient) => {
        try {
            // Get existing fridge content
            const existingContent = await AsyncStorage.getItem("shoppingListContent");
            let newContent = [];
            if (existingContent !== null) {
                newContent = JSON.parse(existingContent);
            }
            // Add new ingredient
            newContent.push(ingredient);
            // Save updated fridge content
            await AsyncStorage.setItem("shoppingListContent", JSON.stringify(newContent));
            setShoppingListContent(newContent);
        } catch (error) {
            console.error("Error adding to shopping list:", error);
        }
    }

    const moveToFridge = async () => {
        try {
            // Update the amounts if an ingredient with the same name exists in both lists
            shoppingListContent.forEach(shoppingItem => {
                if (shoppingItem.isBought) {
                    const existingItemIndex = fridgeContent.findIndex(fridgeItem => fridgeItem.name === shoppingItem.name);
                    if (existingItemIndex !== -1) {
                        // Ingredient with the same name exists in fridge content
                        const existingItem = fridgeContent[existingItemIndex];
                        existingItem.amount += `, ${shoppingItem.amount}`; // Update the amount
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

            console.log('Fridge content updated successfully.');
        } catch (error) {
            console.error('Error merging lists:', error);
        }
    };

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
                    console.log("Invalid index.");
                }
            }
        } catch (error) {
            console.error("Error updating isBought property:", error);
        }
    };

    const openEditModal = (ingredient) => {
        setSelectedIngredient(ingredient);
        setEditModalVisible(true);
    };

    useEffect(() => {
        if (isFocused) {
            loadShoppingListContent();
        }
    }, [isFocused, loadShoppingListContent]);

    const persistShoppingListContent = async() => {
        try {
            const content = await AsyncStorage.getItem("shoppingListContent");
            if (content !== null) {
                await AsyncStorage.setItem("shoppingListContent", JSON.stringify(shoppingListContent));
            }
        } catch (error) {
            console.error("Error saving shopping list content:", error);
        }
    }

    useEffect(() => {
        if (isFocused)
            persistShoppingListContent()
    }, [isFocused, fridgeContent, persistShoppingListContent])

    return (
        <View style={styles.screen}>
            <View>
                <TopNavigationBar title={title} LeftIcon={HamburgerIcon} RightIcon={BookIcon} />
            </View>
            <ScrollView style={styles.scrollableScreen} contentContainerStyle={styles.scrolling}>
                {shoppingListContent.map((ingredient, index) => (
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
                ))}
            </ScrollView>
            <BottomRightCornerButton
                IconComponent={ShoppingCartIcon}
                onPress={() => setModalVisible(true)}  // Only set modal to visible
                SecondIconComponent={PlusIcon}
            />
            <BottomNavigationBar selected={selectedBottomBar}/>
            {modalVisible && (
                <ConfirmationModal
                    onConfirm={() => moveToFridge()}
                    onCancel={() => setModalVisible(false)}
                    visible={modalVisible}
                />
            )}
            {editModalVisible && ( // Render the edit modal conditionally
                <EditSetAmountModal
                    visible={editModalVisible}
                    ingredient={selectedIngredient}
                    onClose={() => setEditModalVisible(false)}
                />
            )}
        </View>
    )
};

function ConfirmationModal({ onConfirm, onCancel, visible }) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onCancel}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Move items into fridge?</Text>
                    <Text style={styles.modalMessage}>
                        This will move all selected items from the shopping list into the fridge.
                    </Text>
                    <View style={styles.modalButtonContainer}>
                        <TouchableOpacity onPress={onCancel}>
                            <Text style={styles.modalCancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onConfirm}>
                            <Text style={styles.modalConfirmText}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}



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
    },
    scrolling: {
        alignItems: 'center',
        paddingBottom: 60,
        backgroundColor: "#FEF7FF",
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: for a dimmed background effect
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    buttonContainer: {
        flexDirection: 'row',
        padding: 10,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: "#2196F3",
        marginHorizontal: 10,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dimmed background
    },
    modalContainer: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 28,
        padding: 28,
        width: '80%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalTitle: {
        alignSelf: 'flex-start',
        fontSize: 26,
        fontFamily: 'Roboto-Regular',
        marginBottom: 10,
    },
    modalMessage: {
        alignSelf: 'flex-start',
        fontSize: 16,
        marginBottom: 20,
        fontFamily: 'Roboto-Regular',
    },
    modalButtonContainer: {
        alignSelf: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    modalButton: {
        backgroundColor: '#e5dfe8', // Your color
        borderRadius: 28,
        paddingVertical: 10,
        paddingHorizontal: 20,
        elevation: 2,
    },
    modalCancelText: {
        fontSize: 16,
        fontFamily: 'Roboto-Bold',
        color: '#625b70',
        padding: 10,
    },
    modalConfirmText: {
        fontSize: 16,
        fontFamily: 'Roboto-Bold',
        color: '#6750a3',
        padding: 10,
    },
});

