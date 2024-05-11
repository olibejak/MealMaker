import React, {useEffect, useState} from 'react';
import {Audio} from 'expo-av';
import {ScrollView, StyleSheet, Text, Vibration, View} from 'react-native';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TimerCard from "../../components/cards/TimerCard";
import BottomRightCornerButton from "../../components/buttons/BottomRightCornerButton";
import BottomNavigationBar from "../../components/navigation/BottomNavigationBar";
import TopNavigationBar from "../../components/navigation/TopNavigationBar";
import {BackArrowIcon, PlusIcon} from "../../assets/icons";
import TimerModal from '../../components/modals/TimerModal';
import TimerFinishedModal from '../../components/modals/TimerFinishedModal';
import log from "../../utils/Logger";
import * as Notifications from "expo-notifications";

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
        const subscription = Notifications.addNotificationResponseReceivedListener(response => {
            const { data } = response.notification.request.content;
        });
        return () => subscription.remove();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimers(timers => timers.map(timer => {
                if (!timer.isRunning) return timer;

                const now = Date.now();
                const timeRemaining = Math.max(timer.endTime - now, 0);

                if (timeRemaining === 0) {
                    handleTimerFinished(timer);
                    return { ...timer, isRunning: false, currentTime: "00:00"};
                }

                return { ...timer, currentTime: secondsToTime(Math.floor(timeRemaining / 1000)) };
            }));
        }, 100);

        return () => clearInterval(interval);
    }, [timers]);

    useEffect(() => {
        if (finishedTimersQueue.length > 0) {
            const timerId = finishedTimersQueue[0];
            setFinishedModalVisible(true);

            const playSoundAndVibrate = async () => {
                if (!soundObjects[timerId]) {
                    const soundObject = new Audio.Sound();
                    try {
                        await soundObject.loadAsync(require('../../assets/sounds/alarm.mp3'));
                        await soundObject.setIsLoopingAsync(true);
                        await soundObject.playAsync();
                        setSoundObjects(prev => ({
                            ...prev,
                            [timerId]: soundObject
                        }));
                    } catch (error) {
                        console.error('Error loading sound:', error);
                    }
                } else {
                    try {
                        await soundObjects[timerId].playAsync();
                    } catch (error) {
                        console.error('Error playing sound:', error);
                    }
                }

                Vibration.vibrate(VIBRATION_PATTERN, true);
            };

            playSoundAndVibrate();
        } else {
            Object.values(soundObjects).forEach(async (soundObject) => {
                try {
                    await soundObject.stopAsync();
                } catch (error) {
                    console.error('Error stopping sound:', error);
                }
            });
            Vibration.cancel();
            setFinishedModalVisible(false);
        }
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
                    isRunning: timer.isRunning || false,
                    endTime: timer.endTime || null
                }));
                setTimers(timersWithUniqueIds);
            }
        } catch (error) {
            log.error('Failed to load timers from AsyncStorage:', error);
        }
    };

    const handleTimerFinished = (timer) => {
        setFinishedTimersQueue(prevQueue => [...prevQueue, timer.id]);
    };

    const handleAddTimer = async (label, time) => {
        const newTimer = {
            id: uuid.v4(),
            label,
            time,
            currentTime: time,
            isRunning: false,
            endTime: null
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

    const handleAddTime = async (id, additionalSeconds) => {
        setTimers(timers => timers.map(timer => {
            if (timer.id === id) {
                const now = Date.now();
                let newEndTime;

                let totalSecondsCurrent;
                let totalSecondsTime = timeToSeconds(timer.time) + additionalSeconds;

                if (timer.isRunning) {
                    newEndTime = (timer.endTime ? timer.endTime : now) + additionalSeconds * 1000;
                    totalSecondsCurrent = timeToSeconds(timer.currentTime) + additionalSeconds;

                    // Update the notification with the new end time if it is running
                    if (timer.notificationId) {
                        Notifications.cancelScheduledNotificationAsync(timer.notificationId); // Cancel the old notification first
                        const newNotificationId = scheduleNotification(timer, totalSecondsCurrent); // Schedule a new notification
                        return {
                            ...timer,
                            currentTime: secondsToTime(totalSecondsCurrent),
                            time: secondsToTime(totalSecondsTime),
                            endTime: newEndTime,
                            notificationId: newNotificationId
                        };
                    }
                } else {
                    // If the timer is not running, reset the endTime and currentTime from now
                    newEndTime = now + totalSecondsTime * 1000;
                    totalSecondsCurrent = totalSecondsTime; // Set currentTime to full new time if stopped
                }

                return {
                    ...timer,
                    currentTime: secondsToTime(totalSecondsCurrent),
                    time: secondsToTime(totalSecondsTime),
                    endTime: newEndTime,
                };
            }
            return timer;
        }));
    };

    const handleStartStop = async (id) => {
        setTimers(prevTimers => prevTimers.map(timer => {
            if (timer.id === id) {
                if (timer.isRunning) {
                    Notifications.cancelScheduledNotificationAsync(timer.notificationId);
                    return { ...timer, isRunning: false, endTime: null, notificationId: null };
                } else {
                    const now = Date.now();
                    const remainingTimeInSeconds = timeToSeconds(timer.currentTime);
                    const endTime = now + remainingTimeInSeconds * 1000;

                    scheduleNotification(timer, remainingTimeInSeconds)
                        .then(notificationId => {
                            // Update the state with the new notificationId after it's scheduled
                            setTimers((currentTimers) => currentTimers.map(t =>
                                t.id === timer.id ? { ...t, isRunning: true, endTime, notificationId } : t
                            ));
                        });

                    // Return the timer with old state because the actual notificationId will be set asynchronously
                    return { ...timer, isRunning: true, endTime };
                }
            }
            return timer;
        }));
    };

    const scheduleNotification = async (timer, seconds) => {
        return await Notifications.scheduleNotificationAsync({
            content: {
                title: "Timer finished",
                body: `${timer.label} has finished`,
                data: {id: timer.id},
            },
            trigger: {seconds: seconds},
        });
    };

    const handleReload = async (id) => {
        setTimers(timers => timers.map(timer => {
            if (timer.id === id) {
                if (timer.notificationId) {
                    Notifications.cancelScheduledNotificationAsync(timer.notificationId);
                }
                return { ...timer, currentTime: timer.time, isRunning: false, endTime: null, notificationId: null };
            }
            return timer;
        }));
        setFinishedModalVisible(false);
    }

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

        // Set the timer to running
        setTimers(timers => timers.map(timer => {
            if (timer.id === finishedTimerId) {
                return { ...timer, isRunning: true };
            }
            return timer;
        }));

        // Add the time
        handleAddTime(finishedTimerId, 60);
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
                timerId={finishedTimersQueue[0]}
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
