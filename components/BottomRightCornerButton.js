import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

export default function BottomRightCornerButton({ IconComponent, onPress }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress} style={styles.iconButton}>
                <IconComponent />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        right: 10,
        bottom: 100,
        padding: 15,
        zIndex: 10, // Make sure it's above everything else
    },
    iconButton: {
        // Styles for the touchable opacity
        padding: 10,
        borderRadius: 12,
        backgroundColor: '#E8DDFC',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4, // for Android shadow
        shadowOffset: { width: 2, height: 2 }, // for iOS shadow
        shadowRadius: 1,
        shadowOpacity: 0.5,
    },
    // ... add any other styles you might need here
});
