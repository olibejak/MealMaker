import React, { useState, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PlayIcon, PlusIcon, CloseIcon, PauseIcon, ReloadIcon } from "../assets/icons"; // Replace with actual icons
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export default function TimerCard({ label, time, onAddTime, onStartStop, onClose, onReload }) {
    const [isRunning, setIsRunning] = useState(false);
    const circularProgressRef = useRef();

    const toggleTimer = () => {
        setIsRunning(!isRunning);
        onStartStop();
        if (circularProgressRef.current) {
            circularProgressRef.current.animate(100, 8000); // Fill the progress to 100% in 8 seconds
        }
    };

    return (
        <View style={styles.card}>
            <View style={styles.leftSection}>
                <Text style={styles.label}>{label}</Text>
                <AnimatedCircularProgress
                    size={180}
                    width={10}
                    fill={100}
                    tintColor="#cfbbfd">
                    {
                        (fill) => (
                            <View style={styles.innerCircle}>
                                <Text style={styles.timeText}>{time}</Text>
                                <TouchableOpacity onPress={onReload} style={styles.reloadIcon}>
                                    <ReloadIcon />
                                </TouchableOpacity>
                            </View>
                        )
                    }
                </AnimatedCircularProgress>
            </View>
            <View style={styles.buttonGroup}>
                <TouchableOpacity onPress={onAddTime} style={[styles.iconBubble, styles.addTimeButton]}>
                    <PlusIcon />
                    <Text style={styles.iconText}>1:00</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleTimer} style={styles.iconBubble}>
                    {isRunning ? <PauseIcon /> : <PlayIcon />}
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <CloseIcon />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#F6F2F9',
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        position: 'relative',
    },
    leftSection: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontSize: 20,
        fontFamily: 'Roboto-Medium',
        color: '#333',
        marginBottom: 15,
        alignSelf: 'flex-start',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: '24'
    },
    timeText: {
        fontSize: 40, // Increased font size for larger text
        fontFamily: 'Roboto-Medium',
        color: '#333',
        textAlign: 'center',
        marginBottom: 20, // Space between the text and the button
    },
    reloadIcon: {
        // Additional styling for the button if needed
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconText: {
        textAlign: 'center',
        color: '#000',
        fontSize: 18,
        fontFamily: 'Roboto-Medium',
    },
    iconBubble: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#cfbbfd',
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 10,
        minWidth: 100,
        marginVertical: 10,
        gap: 5,
    },
    addTimeButton: {
        backgroundColor: '#e7ddf6',
    },
    buttonGroup: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    innerCircle: {
        justifyContent: 'center', // This will push the time text up and the button down
        alignItems: 'center',
        height: '100%', // Ensure the inner circle uses the full height of the circular progress
    },
});
