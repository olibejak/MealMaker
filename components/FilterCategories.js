// FilterCategories.js
import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { StarFilledIcon, CheckmarkIcon } from '../assets/icons';

const FilterCategories = ({ visible, onSelectCategory, context }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    if (!visible) return null;

    let categories;
    if (context === 'ingredients') {
        categories = ["Favourite ingredients"];
    } else {
        categories = [
            "Favourite recipes", "Breakfast", "Starter", "Side", "Dessert",
            "Pasta", "Vegan", "Vegetarian", "Chicken", "Beef", "Pork", "Lamb",
            "Goat", "Seafood", "Miscellaneous"
        ];
    }

    const handleSelectCategory = (category) => {
        if (selectedCategory === category) {
            setSelectedCategory(null);
            onSelectCategory(null);
        } else {
            setSelectedCategory(category);
            onSelectCategory(category);
        }
    };

    return (
        <View style={styles.container}>
            {categories.map((category) => (
                <TouchableOpacity
                    key={category}
                    style={[styles.button, selectedCategory === category && styles.selected]}
                    onPress={() => handleSelectCategory(category)}
                >
                    {selectedCategory === category && <CheckmarkIcon style={styles.icon} />}
                    {(category === "Favourite ingredients" || category === "Favourite recipes") && selectedCategory !== category && (
                        <StarFilledIcon style={styles.star} />
                    )}
                    <Text style={styles.text}>{category}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginVertical: 10,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 4,
        paddingVertical: 4,
        paddingHorizontal: 12,
        backgroundColor: '#eae5ef',
        borderRadius: 8,
        borderColor: 'black',
        borderWidth: 1,
    },
    selected: {
        backgroundColor: '#e7ddf6',
        borderColor: '#e7ddf6'
    },
    text: {
        color: '#333',
        fontSize: 18,
    },
    star: {
        marginRight: 8,
        width: 24,
        height: 24,
    },
    icon: {
        marginRight: 8,
        width: 24,
        height: 24,
    },
});

export default FilterCategories;
