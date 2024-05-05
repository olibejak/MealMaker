import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import {
    View,
    ScrollView,
    StyleSheet,
    Text,
    Vibration
} from 'react-native';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TimerCard from "../../components/cards/TimerCard";
import BottomRightCornerButton from "../../components/buttons/BottomRightCornerButton";
import BottomNavigationBar from "../../components/navigation/BottomNavigationBar";
import TopNavigationBar from "../../components/navigation/TopNavigationBar";
import { BackArrowIcon, PlusIcon } from "../../assets/icons";
import TimerModal from '../../components/modals/TimerModal';
import TimerFinishedModal from '../../components/modals/TimerFinishedModal';
import log from "../../utils/Logger";

export default function TimerScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [finishedModalVisible, setFinishedModalVisible] = useState(false);
    const [finishedTimersQueue, setFinishedTimersQueue] = useState([]);
    const [timers, setTimers] = useState([]);
    const [soundObjects, setSoundObjects] = useState({});
    const VIBRATION_PATTERN = [500, 500];


    useEffect(() => {
        loadTimers();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimers(timers => timers.map(timer => {
                if (!timer.isRunning) return timer;

                const seconds = timeToSeconds(timer.currentTime) - 1;
                if (seconds < 0) {
                    handleTimerFinished(timer);
                    return { ...timer, isRunning: false };
                }
                return { ...timer, currentTime: secondsToTime(seconds) };
            }));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (finishedTimersQueue.length > 0) {
            const currentFinishedTimerId = finishedTimersQueue[0]; // Always work with the first item in the queue
            // Play sound when modal is visible
            const playSound = async () => {
                try {
                    await soundObjects[currentFinishedTimerId].playAsync();
                } catch (error) {
                    console.error('Error playing sound:', error);
                }
            };
            playSound();

            // Start continuous vibration using the pattern
            Vibration.vibrate(VIBRATION_PATTERN, true); // Repeat indefinitely

            // Make the modal visible
            setFinishedModalVisible(true);
        } else {
            // Stop sound for all sound objects when queue is empty
            Object.values(soundObjects).forEach(async (soundObject) => {
                try {
                    await soundObject.stopAsync();
                } catch (error) {
                    console.error('Error stopping sound:', error);
                }
            });
            // Stop vibration when modal is not visible
            Vibration.cancel();
            setFinishedModalVisible(false);
        }

        // Cleanup function to stop vibration when component unmounts
        return () => {
            Vibration.cancel();
        };
    }, [finishedTimersQueue, soundObjects]);

    const loadTimers = async () => {
        try {
            const storedTimers = await AsyncStorage.getItem('timers');
            if (storedTimers !== null) {
                const parsedTimers = JSON.parse(storedTimers);
                const timersWithUniqueIds = parsedTimers.map(timer => ({
                    ...timer,
                    id: timer.id || uuid.v4(),
                    currentTime: timer.currentTime || timer.time,
                    isRunning: timer.isRunning || false
                }));
                setTimers(timersWithUniqueIds);
            }
        } catch (error) {
            log.error('Failed to load timers from AsyncStorage:', error);
        }
    };

    const handleTimerFinished = async (timer) => {
        const soundObject = new Audio.Sound();
        try {
            await soundObject.loadAsync(require('../../assets/sounds/alarm.mp3'));
            await soundObject.setIsLoopingAsync(true);
        } catch (error) {
            console.error('Error loading sound:', error);
        }

        // Update the sound objects state
        setSoundObjects(prev => ({
            ...prev,
            [timer.id]: soundObject
        }));

        // Add to finished timers queue
        setFinishedTimersQueue(prevQueue => [...prevQueue, timer.id]);
    };

    const handleAddTimer = async (label, time) => {
        const newTimer = {
            id: uuid.v4(),
            label,
            time,
            currentTime: time,
            isRunning: false
        };
        const updatedTimers = [...timers, newTimer];
        setTimers(updatedTimers);
        setModalVisible(false);
        try {
            await AsyncStorage.setItem('timers', JSON.stringify(updatedTimers));
        } catch (error) {
            console.error('Failed to save timers:', error);
        }
    };

    const handleAddTime = (id, additionalSeconds) => {
        setTimers(timers => timers.map(timer => {
            if (timer.id === id) {
                const totalSecondsCurrent = timeToSeconds(timer.currentTime) + additionalSeconds;
                const totalSecondsInitial = timeToSeconds(timer.time) + additionalSeconds;
                return {
                    ...timer,
                    currentTime: secondsToTime(totalSecondsCurrent),
                    time: secondsToTime(totalSecondsInitial)
                };
            }
            return timer;
        }));
    };

    const handleStartStop = (id) => {
        setTimers(prevTimers => prevTimers.map(timer => {
            if (timer.id === id) {
                return { ...timer, isRunning: !timer.isRunning };
            }
            return timer;
        }));
    };

    const handleReload = (id) => {
        setTimers(timers => timers.map(timer => {
            if (timer.id === id) {
                return { ...timer, currentTime: timer.time, isRunning: false};
            }
            return timer;
        }));
        setFinishedModalVisible(false);
    };

    const handleRemoveTimer = async (id) => {
        const updatedTimers = timers.filter(timer => timer.id !== id);
        setTimers(updatedTimers);
        try {
            await AsyncStorage.setItem('timers', JSON.stringify(updatedTimers));
        } catch (error) {
            console.error('Failed to remove timer:', error);
        }
    };

    function timeToSeconds(time) {
        const [minutes, seconds] = time.split(":").map(Number);
        return minutes * 60 + seconds;
    }

    function secondsToTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    function addOneMinute(finishedTimerId) {
        // Remove the finished timer from the queue
        setFinishedTimersQueue(queue => queue.filter(id => id !== finishedTimerId));

        // Add the time
        handleAddTime(finishedTimerId, 60);

        // Set the timer to running
        setTimers(timers => timers.map(timer => {
            if (timer.id === finishedTimerId) {
                return { ...timer, isRunning: true };
            }
            return timer;
        }));
    }

    function stopTimer(finishedTimerId) {
        // Remove the finished timer from the queue
        setFinishedTimersQueue(queue => queue.filter(id => id !== finishedTimerId));

        // Reset the timer
        handleReload(finishedTimerId);
    }

    return (
        <View style={styles.screen}>
            <TopNavigationBar title="Timer" LeftIcon={BackArrowIcon} />
            <ScrollView style={styles.scrollableScreen} contentContainerStyle={timers.length === 0 ? styles.emptyScrolling : styles.scrolling}>
                {timers.length > 0 ? (
                    timers.map(timer => (
                        <TimerCard
                            key={`${timer.id}-${timer.currentTime}`} // Ensures re-render if currentTime changes
                            id={timer.id}
                            label={timer.label}
                            currentTime={timer.currentTime}
                            initialTime={timer.time}
                            onAddTime={() => handleAddTime(timer.id, 60)}
                            onStartStop={() => handleStartStop(timer.id)}
                            onClose={() => handleRemoveTimer(timer.id)}
                            reloadTimer={() => handleReload(timer.id)}
                            running={timer.isRunning}
                        />
                    ))
                ) : (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No timers set. Tap + to add a new timer.</Text>
                    </View>
                )}
            </ScrollView>
            <TimerModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                handleAddTimer={handleAddTimer}
            />
            <BottomNavigationBar />
            <BottomRightCornerButton IconComponent={PlusIcon} onPress={() => setModalVisible(true)} />
            <TimerFinishedModal
                label={timers.find(timer => timer.id === finishedTimersQueue[0])?.label || ''}
                timerId={finishedTimersQueue[0]} // Work with the first item in the queue
                visible={finishedModalVisible}
                onStopTimer={() => stopTimer(finishedTimersQueue[0])}
                onAddOneMinute={() => addOneMinute(finishedTimersQueue[0])}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        display: 'flex',
        position: 'absolute',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        top: 0,
        bottom: 0,
    },
    scrollableScreen: {
        backgroundColor: '#FFF',
        paddingVertical: 0,
        paddingHorizontal: 16,
    },
    scrolling: {
        paddingTop: 16,
        paddingBottom: 60,
    },
    emptyScrolling: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    emptyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 18,
        color: '#666',
        textAlign: 'center',
    },
});
