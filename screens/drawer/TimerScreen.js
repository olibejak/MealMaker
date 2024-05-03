import React, { useState, useEffect } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
} from 'react-native';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TimerCard from "../../components/cards/TimerCard";
import BottomRightCornerButton from "../../components/buttons/BottomRightCornerButton";
import BottomNavigationBar from "../../components/navigation/BottomNavigationBar";
import TopNavigationBar from "../../components/navigation/TopNavigationBar";
import { BackArrowIcon, PlusIcon } from "../../assets/icons";
import TimerModal from '../../components/modals/TimerModal';
import log from "../../utils/Logger";

export default function TimerScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [timers, setTimers] = useState([]);

    useEffect(() => {
        loadTimers();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimers(timers => timers.map(timer => {
                if (timer.isRunning) {
                    const seconds = timeToSeconds(timer.currentTime) - 1;
                    if (seconds < 0) {
                        clearInterval(interval);
                        return { ...timer, currentTime: "00:00", isRunning: false };
                    }
                    return { ...timer, currentTime: secondsToTime(seconds) };
                }
                return timer;
            }));
        }, 1000);
        return () => clearInterval(interval);
    }, [timers]);

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
            console.error('Failed to load timers from AsyncStorage:', error);
        }
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

    return (
        <View style={styles.screen}>
            <TopNavigationBar title="Timer" LeftIcon={BackArrowIcon} />
            <ScrollView style={styles.scrollableScreen} contentContainerStyle={styles.scrolling}>
                {timers.map(timer => (
                    <TimerCard
                        key={`${timer.id}-${timer.currentTime}`}
                        id={timer.id}
                        label={timer.label}
                        currentTime={timer.currentTime}
                        initialTime={timer.time}
                        onAddTime={() => handleAddTime(timer.id, 60)}
                        onStartStop={() => handleStartStop(timer.id)}
                        onClose={() => handleRemoveTimer(timer.id)}
                        reloadTimer={() => handleReload(timer.id)} // Ensure this matches what is expected in TimerCard
                        running={timer.isRunning}
                    />
                ))}
            </ScrollView>
            <TimerModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                handleAddTimer={handleAddTimer}
            />
            <BottomNavigationBar />
            <BottomRightCornerButton IconComponent={PlusIcon} onPress={() => setModalVisible(true)} />
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
        alignItems: 'stretch',
        paddingTop: 16,
        paddingBottom: 60,
    },
    contentContainer: {
        paddingBottom: 80,
        padding: 16,
    },
});
