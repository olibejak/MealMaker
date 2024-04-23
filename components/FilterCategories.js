import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { CloseIcon, CheckmarkIcon, StarFilledIcon } from '../assets/icons';

const FilterCategories = ({ visible, onSelectCategory, onClose, context }) => {
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
        <View style={styles.mainContainer}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <CloseIcon />
            </TouchableOpacity>
            <View style={styles.buttonsContainer}>
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
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        paddingTop: 50,
        top: -60,
        backgroundColor: '#ECE6F0',
        borderRadius: 28,
        marginBottom: -60,

    },
    buttonsContainer: {
        borderTopColor: '#79747E',
        borderTopWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginBottom: 10,
        marginTop: 10,
        padding: 10,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 4,
        paddingVertical: 4,
        paddingHorizontal: 12,
        backgroundColor: '#eae5ef',
        borderRadius: 8,
        borderColor: '#79747E',
        borderWidth: 1,
        gap: 4,
    },
    selected: {
        backgroundColor: '#e7ddf6',
        borderColor: '#e7ddf6'
    },
    text: {
        color: '#333',
        fontSize: 16,
    },
    star: {
        width: 24,
        height: 24,
    },
    icon: {
        marginRight: 8,
        width: 24,
        height: 24,
    },
    closeButton: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        padding: 24,
    },
});

export default FilterCategories;
