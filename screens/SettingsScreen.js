import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import TopNavigationBar from "../components/TopNavigationBar";
import BottomNavigationBar from "../components/BottomNavigationBar";
import SettingsCard from "../components/SettingsCard";
import {BookIcon, HamburgerIcon} from "../assets/icons";

export default function SettingsScreen({ navigation }) {
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const [soundsEnabled, setSoundsEnabled] = useState(false);
    const [vibrationsEnabled, setVibrationsEnabled] = useState(false);
    const [flashingEnabled, setFlashingEnabled] = useState(false);
    const [shakeForRandomRecipeEnabled, setShakeForRandomRecipeEnabled] = useState(false);
    // ... Add other state hooks for each setting

    return (
        <View style={styles.screen}>
            <TopNavigationBar title="Settings" LeftIcon={HamburgerIcon} RightIcon={BookIcon} />
            <ScrollView style={styles.scrollableScreen}>
                <SettingsCard
                    title="Notifications"
                    description="Receive a notification when a timer runs out"
                    value={notificationsEnabled}
                    onValueChange={setNotificationsEnabled}
                />
                <SettingsCard
                    title="Sounds"
                    description="Play a sound when a timer runs out"
                    value={soundsEnabled}
                    onValueChange={setSoundsEnabled}
                />
                <SettingsCard
                    title="Vibrations"
                    description="Vibrate when a timer runs out"
                    value={vibrationsEnabled}
                    onValueChange={setVibrationsEnabled}
                />
                <SettingsCard
                    title="Flashing"
                    description="Flash the screen when timer ends"
                    value={flashingEnabled}
                    onValueChange={setFlashingEnabled}
                />
                <SettingsCard
                    title="Shake for random recipe"
                    description="Shake the phone to receive a random recipe recommendation"
                    value={shakeForRandomRecipeEnabled}
                    onValueChange={setShakeForRandomRecipeEnabled}
                />
                {/* Repeat for each additional setting */}
            </ScrollView>
            <BottomNavigationBar selected="Settings" />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'space-between',
    },
    scrollableScreen: {
        backgroundColor: '#FFF',
    },
    // Add any other styles you might need
});
