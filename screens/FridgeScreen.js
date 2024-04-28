import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Modal, Text, TextInput, TouchableOpacity } from "react-native";
import TopNavigationBar from "../components/TopNavigationBar";
import BottomNavigationBar from "../components/BottomNavigationBar";
import BottomRightCornerButton from "../components/BottomRightCornerButton";
import EditSetAmountModal from "../components/EditSetAmountModal";
import IngredientCard from "../components/IngredientCard";
import { BookIcon, HamburgerIcon, PlusIcon } from "../assets/icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";

export default function FridgeScreen({ navigation }) {
    const title = "My fridge";
    const [fridgeContent, setFridgeContent] = useState([]);
    const isFocused = useIsFocused();
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteVisible, setDeleteVisible] = useState(false);
    const [selectedIngredient, setSelectedIngredient] = useState(null);
    const [isNewIngredient, setIsNewIngredient] = useState(false)

    const loadFridgeContent = useCallback(async () => {
        try {
            const content = await AsyncStorage.getItem("fridgeContent");
            if (content !== null) {
                setFridgeContent(JSON.parse(content));
            }
        } catch (error) {
            console.error("Error loading fridge content:", error);
        }
    }, []);

    useEffect(() => {
        if (isFocused) {
            loadFridgeContent();
        }
    }, [isFocused, loadFridgeContent]);

    const persistFridgeContent = async() => {
        if (isNewIngredient && selectedIngredient.name !== "") {
            setFridgeContent([...fridgeContent, selectedIngredient]);
            setIsNewIngredient(false);
        }
        try {
            const content = await AsyncStorage.getItem("fridgeContent");
            if (content !== null) {
                await AsyncStorage.setItem("fridgeContent", JSON.stringify(fridgeContent));
            }
        } catch (error) {
            console.error("Error saving fridge content:", error);
        }
    }

    useEffect(() => {
        if (isFocused)
            persistFridgeContent()
        }, [isFocused, fridgeContent, persistFridgeContent])

    const handleEditPress = (ingredient) => {
        setSelectedIngredient(ingredient);
        setDeleteVisible(true);
        setModalVisible(true);
    };

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
                item.strIngredient && item.strIngredient.toLowerCase() === item.name.toLowerCase() ?
                navigation.navigate("IngredientDetails", { ingredient: item }) : undefined}
            onPressEdit={() => handleEditPress(item)}
        />
    );

    return (
        <View style={styles.screen}>
            <TopNavigationBar title={title} LeftIcon={HamburgerIcon} RightIcon={BookIcon} />
            <FlatList
                data={fridgeContent}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                style={styles.scrollableScreen}
                contentContainerStyle={styles.scrolling}
            />
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
    }
});
