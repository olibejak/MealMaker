import React, { useState } from "react";
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {CloseIcon, FilterIcon, SearchIcon} from "../../assets/icons";
import FilterCategoriesModal from '../modals/FilterCategoriesModal';

// The SearchBar component with filter functionality
export default function SearchBar({ onFilterPress, context, setFilter, search, activeFilter }) {
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

    const clearFilter = () => {
        setFilter(null); // Assuming setFilter can handle null to clear filters
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
                        onChangeText={(text) => search(text)}
                        style={styles.input}
                    />
                </View>
                <TouchableOpacity style={[styles.searchIcon, styles.center]} onPress={handleFilterPress}>
                    <FilterIcon />
                </TouchableOpacity>
            </TouchableOpacity>
            {filtersVisible && (
                <FilterCategoriesModal
                    visible={filtersVisible}
                    onSelectCategory={(category) =>
                        setFilter(category) // Placeholder for actual functionality
                    }
                    onClose={handleCloseFilter}
                    context={context}
                    activeFilter={activeFilter}
                />
            )}
            {activeFilter && (
                <View style={styles.filterContainer}>
                    <View style={styles.filter}>
                        <Text style={styles.filterText}>{activeFilter}</Text>
                        <TouchableOpacity onPress={clearFilter}>
                            <CloseIcon />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
}

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
    filterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginBottom: 3,
        marginTop: 10,

    },
    filter: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 4,
        paddingVertical: 4,
        paddingHorizontal: 12,
        backgroundColor: '#e7ddf6',
        borderRadius: 8,
        borderColor: '#e7ddf6',
        borderWidth: 1,
        gap: 4,
    },
    filterText: {
        color: '#333',
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
    },
});
