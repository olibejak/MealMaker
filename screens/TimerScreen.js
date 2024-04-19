// TimerScreen.js
import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import TimerCard from "../components/TimerCard";
import BottomRightCornerButton from "../components/BottomRightCornerButton";
import BottomNavigationBar from "../components/BottomNavigationBar";
import TopNavigationBar from "../components/TopNavigationBar";
import { BackArrowIcon, PlusIcon } from "../assets/icons";
import { useNavigation } from "@react-navigation/native";

export default function TimerScreen() {
    const navigation = useNavigation();
    const timers = ['20:00', '20:00', '20:00', '20:00', '20:00', '20:00', '20:00']; // Example timer values

    return (
        <SafeAreaView style={styles.screen}>
            <TopNavigationBar title="Timer" LeftIcon={BackArrowIcon} /* RightIcon={...} if needed */ />
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.contentContainer}
            >
                {timers.map((time,index) => (
                    <TimerCard
                        label={`Timer ${index + 1}`}
                        key={index}
                        time={time}
                        onStartStop={() => console.log('Start/Stop timer')}
                        onReset={() => console.log('Reset timer')}
                    />
                ))}
            </ScrollView>
            <BottomNavigationBar />
            <BottomRightCornerButton IconComponent={PlusIcon} onPress={() => console.log('Add new timer')} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    scrollView: {
        flex: 1,
    },
    contentContainer: {
        paddingBottom: 80, // Adjust this value so that it matches the height of your BottomNavigationBar
        padding: 16,
    },
    // ... Other styles
});
