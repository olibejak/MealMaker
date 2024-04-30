import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import TimerCard from "../components/TimerCard";
import BottomRightCornerButton from "../components/BottomRightCornerButton";
import BottomNavigationBar from "../components/BottomNavigationBar";
import TopNavigationBar from "../components/TopNavigationBar";
import { BackArrowIcon, PlusIcon } from "../assets/icons";
import TimerModal from '../components/TimerModal';

export default function TimerScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [timers, setTimers] = useState([]);

    useEffect(() => {
        loadTimers();
    }, []);

    const loadTimers = async () => {
        try {
            const storedTimers = await AsyncStorage.getItem('timers');
            if (storedTimers !== null) {
                const parsedTimers = JSON.parse(storedTimers);
                // Ensure all loaded timers have a unique ID
                const timersWithUniqueIds = parsedTimers.map(timer => ({...timer, id: timer.id || uuid.v4()}));
                setTimers(timersWithUniqueIds);
            }
        } catch (error) {
            console.error('Failed to load timers from AsyncStorage:', error);
        }
    };

    const handleAddTimer = async (label, time) => {
        const newTimer = { id: uuid.v4(), label, time };
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
        const updatedTimers = timers.map(timer => {
            if (timer.id === id) {
                const totalSeconds = timeToSeconds(timer.time) + additionalSeconds;
                const newTime = secondsToTime(totalSeconds);
                return { ...timer, time: newTime };
            }
            return timer;
        });
        setTimers(updatedTimers);
        try {
            await AsyncStorage.setItem('timers', JSON.stringify(updatedTimers));
        } catch (error) {
            console.error('Failed to update timer time:', error);
        }
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
                        key={timer.id}
                        label={timer.label}
                        time={timer.time}
                        onAddTime={() => handleAddTime(timer.id, 60)} // Adding 60 seconds, representing one minute
                        onStartStop={() => console.log('Start/Stop timer')}
                        onReset={() => console.log('Reset timer')}
                        onClose={() => handleRemoveTimer(timer.id)}
                        running={false}
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
