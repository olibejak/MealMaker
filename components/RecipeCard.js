import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {PotIcon, GarbageIcon} from "../assets/icons";

const RecipeCard = ({
                        title,
                        date,
                        description,
                        image,
                        onPressDetails,
                        onPressSecondary,
                        actionButton // 'cook' or 'delete'
                    }) => {
    const renderActionButton = () => {
        switch (actionButton) {
            case 'cook':
                return (
                    <TouchableOpacity style={styles.detailsButton} onPress={onPressSecondary}>
                        <PotIcon/>
                        <Text style={styles.detailsButtonText}>Cook</Text>
                    </TouchableOpacity>
                );
            case 'delete':
                return (
                    <TouchableOpacity style={styles.detailsButton} onPress={onPressSecondary}>
                        <GarbageIcon/>
                        <Text style={styles.detailsButtonText}>Delete</Text>
                    </TouchableOpacity>
                );
            default:
                // If no action button is specified, return null
                return null;
        }
    };

    return (
        <View style={styles.card}>
            <Image source={image} style={styles.cardImage} />
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.cardDate}>{date}</Text>
                <Text style={styles.cardDescription} numberOfLines={2}>
                    {description}
                </Text>
                <View style={styles.buttonContainer}>
                    {renderActionButton()}
                    <TouchableOpacity style={styles.detailsButton} onPress={onPressDetails}>
                        <Text style={styles.detailsButtonText}>Details</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 20,
        overflow: 'hidden',
        marginTop: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        minHeight: 250,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    cardImage: {
        width: '100%',
        height: 160, // Adjust the height as necessary
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
        backgroundColor: '#F2EDF6',
        borderRadius: 20,
        paddingVertical: 8,
        color: 'black',
        paddingHorizontal: 16,
        alignSelf: 'flex-start',
        marginLeft: 20,
        flexDirection: 'row',
        alignItems: "center"
    },
    detailsButtonText: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
    },
});

export default RecipeCard;
