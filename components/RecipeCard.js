import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {PotIcon, GarbageIcon, FridgeCardIcon, BasketCardIcon} from "../assets/icons";

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
                    <TouchableOpacity style={styles.buttonSecondary} onPress={onPressSecondary}>
                        <PotIcon/>
                        <Text style={styles.fontButton}>Cook</Text>
                    </TouchableOpacity>
                );
            case 'delete':
                return (
                    <TouchableOpacity style={styles.buttonSecondary} onPress={onPressSecondary}>
                        <GarbageIcon/>
                        <Text style={styles.fontButton}>Delete</Text>
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
            <View style={styles.cardContainer}>
                <Text style={styles.cardTitle}>{title}</Text>
                {date ? <Text style={styles.cardDate}>{date}</Text> : null}
                <Text style={styles.cardDescription} numberOfLines={2} ellipsizeMode="tail">
                    {description}
                </Text>
                <View style={styles.buttonContainer}>
                    {renderActionButton()}
                    <TouchableOpacity style={styles.buttonPrimary} onPress={onPressDetails}>
                        <Text style={styles.fontButton}>Details</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

// <View style={styles.addToButtonsContainer}>
//     <TouchableOpacity style={styles.addToButton}>
//         <Text style={styles.fontButton}>Add to</Text>
//         <FridgeCardIcon/>
//     </TouchableOpacity>
//     <TouchableOpacity style={styles.addToButton}>
//         <Text style={styles.fontButton}>Add to</Text>
//         <BasketCardIcon />
//     </TouchableOpacity>
// </View>


const styles = StyleSheet.create({
    card: {
        backgroundColor: '#F7F2FA',
        borderRadius: 20,
        overflow: 'visible',
        marginBottom: 8,
        marginTop: 3,
        minHeight: 250,
    },
    buttonContainer: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 8,
    },
    cardImage: {
        width: '100%',
        height: 200, // Adjust the height as necessary
        resizeMode: 'cover',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    cardContainer: {
        padding: 16,
    },
    cardTitle: {
        fontSize: 20,
        marginBottom: 4,
        fontFamily: 'Roboto-Regular',
    },
    cardDate: {
        fontSize: 16,
        color: '#48454E',
        marginBottom: 16,
        fontFamily: 'Roboto-Regular',
    },
    cardDescription: {
        fontSize: 16,
        color: '#48454E',
        marginBottom: 16,
        fontFamily: 'Roboto-Regular',
    },
    detailsButton: {
        backgroundColor: '#E8DEF8',
        borderRadius: 20,
        paddingVertical: 8,
        color: 'black',
        paddingHorizontal: 16,
        alignSelf: 'flex-start',
        marginLeft: 20,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        width: 100,
    },
    fontButton: {
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
        letterSpacing: 0.5,
    },
    buttonPrimary: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#E6DEF6',
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 12,
        gap: 6,
    },
    buttonSecondary: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'transparent',
        borderRadius: 25,
        paddingLeft: 16,
        paddingRight: 20,
        paddingVertical: 10,
        marginTop: 12,
        gap: 6,
        borderStyle: 'solid',
        borderColor: 'rgba(0,0,0,0.6)',
        borderWidth: 1,
    },
});

export default RecipeCard;
