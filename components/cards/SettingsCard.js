import React from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';

const CustomSwitch = ({ value, onValueChange }) => {
    const thumbSize = 24; // Size of the thumb when on
    const thumbSizeOff = 18; // Smaller thumb size when off
    const trackWidth = 48; // Width of the track
    const trackHeight = 30; // Height of the track
    const padding = 6; // Space between thumb and track border
    const animatedValue = new Animated.Value(value ? 1 : 0);

    const thumbTranslateX = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [padding, trackWidth - thumbSize - padding],
    });

    const thumbWidth = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [thumbSizeOff, thumbSize],
    });

    const thumbHeight = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [thumbSizeOff, thumbSize],
    });

    // Adjust the initial position slightly higher if necessary
    const thumbTop = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [((trackHeight - thumbSizeOff) / 2) - 1.5, ((trackHeight - thumbSize) / 2) - 2],
    });

    const toggleSwitch = () => {
        Animated.timing(animatedValue, {
            toValue: value ? 0 : 1,
            duration: 300,
            useNativeDriver: false  // Changed to false because we are animating layout properties
        }).start();
        onValueChange(!value);
    };

    const borderColor = value ? '#5a569f' : '#6a757e';  // Dynamic border color
    const trackColor = value ? '#5a569f' : '#ccc';
    const thumbColor = value ? '#ffffff' : '#6a757e';

    return (
        <TouchableOpacity
            style={[styles.track, { backgroundColor: trackColor, borderColor: borderColor }]}
            activeOpacity={1}
            onPress={toggleSwitch}
        >
            <Animated.View
                style={{
                    backgroundColor: thumbColor,
                    width: thumbWidth,
                    height: thumbHeight,
                    borderRadius: thumbSize / 2,
                    position: 'absolute',
                    top: thumbTop,  // Using the dynamic top positioning
                    transform: [{ translateX: thumbTranslateX }]
                }}
            />
        </TouchableOpacity>
    );
};

const SettingsCard = ({ title, description, value, onValueChange, IconComponent, bottomBorder, topBorder }) => {
    return (
        <View style={[
            styles.cardContainer,
            bottomBorder && styles.bottomBorder,
            topBorder && styles.topBorder
        ]}>
            <View>
                <IconComponent />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.content}>{description}</Text>
            </View>
            <CustomSwitch value={value} onValueChange={onValueChange} />
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#FEF7FF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 24,
        paddingRight: 24,
        paddingVertical: 16,

    },
    bottomBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#E2E2E2',
    },
    topBorder: {
        borderTopWidth: 1,
        borderTopColor: '#E2E2E2',
    },
    textContainer: {
        flex: 1,
        paddingHorizontal: 24
    },
    title: {
        fontFamily: 'Roboto-Regular',
        fontSize: 18,
        marginBottom: 4,
    },
    content: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: '#48454E',
        lineHeight: 24,
    },
    track: {
        width: 48,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        padding: 6,
        borderWidth: 2,
        borderStyle: 'solid',
    },
});

export default SettingsCard;
