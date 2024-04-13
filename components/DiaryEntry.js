import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

const DiaryEntry = ({ date, title, excerpt, image, onPressDetails }) => {
    return (
        <View style={styles.entryContainer}>
            <Image source={image} style={styles.entryImage} />
            <View style={styles.textContainer}>
                <Text style={styles.entryTitle}>{title}</Text>
                <Text style={styles.entryDate}>{date}</Text>
                <Text style={styles.entryExcerpt} numberOfLines={2}>{excerpt}</Text>
                <TouchableOpacity style={styles.detailsButton} onPress={onPressDetails}>
                    <Text style={styles.detailsButtonText}>Details</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    entryContainer: {
        borderRadius: 12,
        backgroundColor: '#FFFFFF', // White background, might need changing
        marginBottom: 16,
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    entryImage: {
        width: '100%',
        height: 200, // Height based on your design
        resizeMode: 'cover',
    },
    textContainer: {
        padding: 16,
    },
    entryTitle: {
        fontFamily: 'Roboto-Medium',
        fontSize: 22,
        marginBottom: 4,
    },
    entryDate: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        color: '#6E6E6E',
        marginBottom: 8,
    },
    entryExcerpt: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: '#333',
        marginBottom: 16,
    },
    detailsButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 18,
        backgroundColor: '#6200EE', // Color might need some adjustments
        alignSelf: 'flex-start',
    },
    detailsButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'Roboto-Medium',
    },
});

export default DiaryEntry;
