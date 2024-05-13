import React from 'react';
import {TouchableOpacity, View, StyleSheet, Platform} from 'react-native';

export default function BottomRightCornerButton({ IconComponent, SecondIconComponent, onPress, secondOnPress }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress} style={styles.iconButton}>
                <IconComponent />
            </TouchableOpacity>
            {SecondIconComponent ?
                <TouchableOpacity onPress={secondOnPress} style={styles.iconButton}>
                    <SecondIconComponent />
                </TouchableOpacity>
            : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        gap: 12,
        position: 'absolute',
        right: 25,
        ...Platform.select({
            ios: {
                bottom: 105,
            },
            android: {
                bottom: 90,
            },
        }),
        padding: 15,
        zIndex: 10, // Above everything else
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
});
