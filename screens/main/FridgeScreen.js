import React, { useCallback, useEffect, useState } from "react";
import {View, StyleSheet, FlatList, Text} from "react-native";
import TopNavigationBar from "../../components/navigation/TopNavigationBar";
import BottomNavigationBar from "../../components/navigation/BottomNavigationBar";
import BottomRightCornerButton from "../../components/buttons/BottomRightCornerButton";
import EditSetAmountModal from "../../components/modals/EditSetAmountModal";
import IngredientCard from "../../components/cards/IngredientCard";
import { BookIcon, HamburgerIcon, PlusIcon } from "../../assets/icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";
import log from "../../utils/Logger";

export default function FridgeScreen({ navigation }) {
    const title = "My fridge";
    const [fridgeContent, setFridgeContent] = useState([]);
    const isFocused = useIsFocused();
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteVisible, setDeleteVisible] = useState(false);     // Visibility of delete button in modal
    const [selectedIngredient, setSelectedIngredient] = useState(null);     // Ingredient in active modal
    const [isNewIngredient, setIsNewIngredient] = useState(false)  // Whether the ingredient was created from empty modal

    // Get ingredients from AsyncStorage
    const loadFridgeContent = useCallback(async () => {
        const content = await AsyncStorage.getItem("fridgeContent");
        if (content !== null) {
            setFridgeContent(JSON.parse(content));
        }
    }, []);
    useEffect(() => {
        if (isFocused) {
            loadFridgeContent().catch(error => log.error("Error loading fridge content:", error));
        }
    }, [isFocused, loadFridgeContent]);

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

    // Add ingredient
    const persistFridgeContent = async() => {
        if (isNewIngredient && selectedIngredient.name !== "") {
            const duplicateItemIndex = fridgeContent.findIndex(
                item => item.name.toLowerCase().trim() === selectedIngredient.name.toLowerCase().trim());

            // Sum amounts with same units, else join strings
            if (duplicateItemIndex >= 0) {
                fridgeContent[duplicateItemIndex].amount =
                    `${parseAmount(selectedIngredient.amount.trim().toLowerCase(), 
                        fridgeContent[duplicateItemIndex].amount.trim().toLowerCase())}`;
            }
            // Add new ingredient to fridge
            else {
                setFridgeContent([...fridgeContent, selectedIngredient]);
            }
            setIsNewIngredient(false);
        }
        // Add ingredient to AsyncStorage
        const content = await AsyncStorage.getItem("fridgeContent");
        if (content !== null) {
            await AsyncStorage.setItem("fridgeContent", JSON.stringify(fridgeContent));
        }
    }
    useEffect(() => {
        if (isFocused)
            persistFridgeContent().catch(error => log.error("Error saving fridge content:", error));
        }, [isFocused, fridgeContent, persistFridgeContent])

    // "pencil" icon in Ingredient card
    const handleEditPress = (ingredient) => {
        setSelectedIngredient(ingredient);
        setDeleteVisible(true);
        setModalVisible(true);
    };

    // floating "plus" button
    const openEmptyEditModal = () => {
        setSelectedIngredient({name: '', amount: ''});
        setIsNewIngredient(true);
        setDeleteVisible(false);
        setModalVisible(true);
    };

    const renderItem = ({ item }) => (
        <IngredientCard
            text={item.name}
            amount={item.amount}
            editButtonOn={true}
            onPress={() =>
                // strIngredient == name of ingredient in TheMealDB - type: string
                item.strIngredient && item.strIngredient.toLowerCase() === item.name.toLowerCase() ?
                navigation.navigate("IngredientDetails", { ingredient: item }) : undefined}
            onPressEdit={() => handleEditPress(item)}
        />
    );

    return (
        <View style={styles.screen}>
            <TopNavigationBar title={title} LeftIcon={HamburgerIcon} RightIcon={BookIcon} />
            {fridgeContent.length === 0 ? <Text style={styles.emptyText}>No items in the fridge, click + to add some more</Text>
                :
            <FlatList
                data={fridgeContent}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                style={styles.scrollableScreen}
                contentContainerStyle={styles.scrolling}
            />}
            <BottomRightCornerButton IconComponent={PlusIcon} onPress={openEmptyEditModal}/>
            <BottomNavigationBar selected="Fridge" />
            <EditSetAmountModal
                visible={modalVisible}
                ingredient={selectedIngredient}
                onClose={() => setModalVisible(false)}
                deleteIngredient={() =>
                    setFridgeContent(fridgeContent.filter(item => item !== selectedIngredient))}
                showDelete={deleteVisible}
            />
        </View>
    );
}

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
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    scrolling: {
        alignItems: 'stretch',
        paddingBottom: 100,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: "#2196F3",
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
