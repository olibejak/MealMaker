import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { CloseIcon } from "../assets/icons"; // Ensure this import is correct

export default function PhotoThumbnail({ sources, onClose }) {
    // Render item function to display each photo and its close button
    const renderItem = ({ item, index }) => (
        <View style={styles.imageContainer}>
            <Image source={item} style={styles.miniature} resizeMode='cover' />
            <TouchableOpacity style={styles.closeButton} onPress={() => onClose(index)}>
                <CloseIcon />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.carouselContainer}>
            <FlatList
                data={sources}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollViewContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    carouselContainer: {
        alignSelf: 'center',
        height: 140, // Increased height to accommodate the top position of the close button
        overflow: 'visible', // This should allow elements to overflow visibly
    },
    scrollViewContent: {
        paddingHorizontal: 15,
        // Ensure items are aligned in a way that allows overflow items to be visible
        alignItems: 'center',
        justifyContent: 'center', // Centering items vertically within the container
    },
    imageContainer: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginRight: 15,
        position: 'relative',
        overflow: 'visible', // Allows overflow for children elements
    },
    miniature: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    closeButton: {
        position: 'absolute',
        top: -12, // Increase the negative offset to ensure visibility
        right: -12, // Increase if necessary to make the button fully visible
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 12,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.8)',
        zIndex: 1, // This ensures it stays on top
    },
});


