import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PlayIcon, PlusIcon, CloseIcon, PauseIcon, ReloadIcon } from "../../assets/icons";
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export default function TimerCard({ label, currentTime, initialTime, onAddTime, onStartStop, onClose, running, reloadTimer }) {
    // Helper function to convert time string to total seconds
    function timeToSeconds(time) {
        const [minutes, seconds] = time.split(":").map(Number);
        return minutes * 60 + seconds;
    }

    // Calculate fill percentage for progress circle
    const fill = (timeToSeconds(currentTime) / timeToSeconds(initialTime)) * 100;

    return (
        <View style={styles.shadowContainer}>
            <View style={styles.card}>
                <View style={styles.leftSection}>
                    <Text style={styles.label}>{label}</Text>
                    <AnimatedCircularProgress
                        size={180}
                        width={10}
                        fill={fill}
                        tintColor="#cfbbfd"
                        backgroundColor="#F6F2F9"
                        rotation={0}
                        duration={0}
                    >
                        {
                            () => (
                                <View style={styles.innerCircle}>
                                    <Text style={styles.timeText}>{currentTime}</Text>
                                    <TouchableOpacity onPress={reloadTimer} style={styles.reloadIcon}>
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
                    <TouchableOpacity onPress={onStartStop} style={styles.iconBubble}>
                        {running ? <PauseIcon /> : <PlayIcon />}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <CloseIcon />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    shadowContainer: {
        paddingHorizontal: 4,
        paddingVertical: 4,
        backgroundColor: 'transparent'
    },
    card: {
        backgroundColor: '#F6F2F9',
        borderRadius: 20,
        paddingVertical: 26,
        paddingHorizontal: 20,
        marginBottom: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        //  Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        // Android elevation
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
    },
    timeText: {
        fontSize: 40,
        fontFamily: 'Roboto-Medium',
        color: '#333',
        textAlign: 'center',
    },
    reloadIcon: {
        // Additional styling for the button if needed
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
    },
    iconText: {
        textAlign: 'center',
        color: '#000',
        fontSize: 17,
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
        marginVertical: 5,
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
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
});
