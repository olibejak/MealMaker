import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const RecipeCard = ({ title, date, description, image, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image source={{ uri: image }} style={styles.cardImage} />
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.cardDate}>{date}</Text>
                <Text style={styles.cardDescription} numberOfLines={2}>
                    {description}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    cardImage: {
        width: '100%',
        height: 200, // Adjust the height as necessary
        resizeMode: 'cover',
    },
    cardContent: {
        padding: 16,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    cardDate: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    cardDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 16,
    },
    detailsButton: {
        backgroundColor: '#6200EE', // Use your app's theme color here
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 16,
        alignSelf: 'flex-start',
    },
    detailsButtonText: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default RecipeCard;
