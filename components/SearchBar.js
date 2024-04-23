import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { FilterIcon, SearchIcon } from "../assets/icons";
import FilterCategories from './FilterCategories'; // Adjust the path according to your project structure

// The SearchBar component with filter functionality
export default function SearchBar({ onFilterPress, context, setFilter }) {
    const [filtersVisible, setFiltersVisible] = useState(false);

    const placeholder = context === 'ingredients' ? "Search ingredients" : "Search recipes";

    const handleFilterPress = () => {
        setFiltersVisible(!filtersVisible);
        if(onFilterPress) {
            onFilterPress(!filtersVisible);
        }
    };

    const handleCloseFilter = () => {
        setFiltersVisible(false);
    };

    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity style={styles.searchBar}>
                <View style={[styles.searchIcon, styles.center]}>
                    <SearchIcon />
                </View>
                <View style={styles.searchContent}>
                    <TextInput
                        placeholder={placeholder}
                        returnKeyType="search"
                        onChangeText={() => {/* Handle change */}}
                        style={styles.input}
                    />
                </View>
                <TouchableOpacity style={[styles.searchIcon, styles.center]} onPress={handleFilterPress}>
                    <FilterIcon />
                </TouchableOpacity>
            </TouchableOpacity>
            {filtersVisible && (
                <FilterCategories
                    visible={filtersVisible}
                    onSelectCategory={(category) =>
                        setFilter(category) // Placeholder for actual functionality
                    }
                    onClose={handleCloseFilter}
                    context={context}
                />
            )}
        </View>
    );
}

// Updated styles for SearchBar component including main container
const styles = StyleSheet.create({
    mainContainer: {
        paddingBottom: 6, // Adds space below the search bar
    },
    searchBar: {
        height: 60,
        backgroundColor: '#eae5ef',
        borderRadius: 28,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    searchIcon: {
        height: 48,
        width: 48,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchContent: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 8,
    },
    center: {
        alignItems: 'center',
    },
    input: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        letterSpacing: 0.5,
        width: '100%',
        height: '100%',
    },
});
