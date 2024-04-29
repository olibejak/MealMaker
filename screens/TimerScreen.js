import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
                setTimers(JSON.parse(storedTimers));
            }
        } catch (error) {
            console.error('Failed to load timers from AsyncStorage:', error);
        }
    };

    const handleAddTimer = async (label, time) => {
        const newTimer = { label, time };
        const updatedTimers = [...timers, newTimer];
        setTimers(updatedTimers);
        setModalVisible(false);
        try {
            await AsyncStorage.setItem('timers', JSON.stringify(updatedTimers));
        } catch (error) {
            console.error('Failed to save timers:', error);
        }
    };

    const handleRemoveTimer = async (label) => {
        const updatedTimers = timers.filter(timer => timer.label !== label);
        setTimers(updatedTimers);
        try {
            await AsyncStorage.setItem('timers', JSON.stringify(updatedTimers));
        } catch (error) {
            console.error('Failed to remove timer:', error);
        }
    };

    return (
        <View style={styles.screen}>
            <TopNavigationBar title="Timer" LeftIcon={BackArrowIcon} />
            <ScrollView style={styles.scrollableScreen} contentContainerStyle={styles.scrolling}>
                {timers.map((timer, index) => (
                    <TimerCard
                        key={index}
                        label={timer.label}
                        time={timer.time}
                        onStartStop={() => console.log('Start/Stop timer')}
                        onReset={() => console.log('Reset timer')}
                        onClose={handleRemoveTimer}
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
