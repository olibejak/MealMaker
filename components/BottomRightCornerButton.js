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
        bottom: 90,
        padding: 15,
        zIndex: 10, // Make sure it's above everything else
    },
    iconButton: {
        // Styles for the touchable opacity
        padding: 10,
        borderRadius: 12,
        backgroundColor: '#E8DEF8',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2, // for Android shadow
        shadowOffset: { width: 0, height: 1 }, // for iOS shadow
        shadowRadius: 2,
        shadowOpacity: 0.1,
    },
    // ... add any other styles you might need here
});
