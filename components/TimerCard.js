import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native';
import { PlayIcon, PauseIcon, GarbageIcon } from "../assets/icons";
import { Swipeable } from 'react-native-gesture-handler';

export default function TimerCard({ time, onStartStop, onReset }) {
    const [isRunning, setIsRunning] = useState(false);

    const toggleTimer = () => {
        if (isRunning) {
            onReset();
        } else {
            onStartStop();
        }
        setIsRunning(!isRunning);
    };

    const renderRightActions = (progress, dragX) => {
        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });
        return (
            <TouchableOpacity style={styles.deleteBox} onPress={onReset}>
                <Animated.View style={{ transform: [{ scale }] }}>
                    <GarbageIcon />
                </Animated.View>
            </TouchableOpacity>
        );
    };

    return (
        <Swipeable renderRightActions={renderRightActions}>
            <View style={styles.card}>
                <View style={styles.timeContainer}>
                    <Text style={styles.timeText}>{time}</Text>
                </View>
                <TouchableOpacity style={styles.iconBubble} onPress={toggleTimer}>
                    {isRunning ? <PauseIcon /> : <PlayIcon />}
                </TouchableOpacity>
            </View>
        </Swipeable>
    );
}

const styles = StyleSheet.create({
    deleteBox: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: '100%',
    },
    card: {
        backgroundColor: '#F6F2F9',
        borderRadius: 10,
        paddingVertical: 25,
        paddingHorizontal: 20,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    timeContainer: {
        flex: 1, // This will make the time text more flexible in sizing and positioning
        justifyContent: 'center', // Center the text vertically
        alignItems: 'center', // Center the text horizontally
    },
    timeText: {
        fontSize: 52,
        color: '#333',
    },
    iconBubble: {
        backgroundColor: '#e7ddf6',
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 30, // Further increase horizontal padding to make the bubble wider
        // No need for alignItems and justifyContent here since we removed iconContainer
    },
    // You can remove iconContainer if it's not being used anymore
});

