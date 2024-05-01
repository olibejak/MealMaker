import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import TopNavigationBar from "../../components/navigation/TopNavigationBar";
import BottomNavigationBar from "../../components/navigation/BottomNavigationBar";
import SettingsCard from "../../components/cards/SettingsCard";
import {
    BookIcon,
    FlashlightIcon,
    HamburgerIcon,
    NotificationIcon,
    PhoneLinkIcon,
    VibrationIcon,
    VolumeIcon
} from "../../assets/icons";

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
            <ScrollView style={styles.scrollableScreen} contentContainerStyle={styles.scrollViewContent}>
                <SettingsCard
                    title="Notifications"
                    description="Receive a notification when a timer runs out"
                    value={notificationsEnabled}
                    onValueChange={setNotificationsEnabled}
                    IconComponent={NotificationIcon}
                />
                <SettingsCard
                    title="Sounds"
                    description="Play a sound when a timer runs out"
                    value={soundsEnabled}
                    onValueChange={setSoundsEnabled}
                    IconComponent={VolumeIcon}
                />
                <SettingsCard
                    title="Vibrations"
                    description="Vibrate when a timer runs out"
                    value={vibrationsEnabled}
                    onValueChange={setVibrationsEnabled}
                    IconComponent={VibrationIcon}
                />
                <SettingsCard
                    title="Flashing"
                    description="Flash the screen when timer ends"
                    value={flashingEnabled}
                    onValueChange={setFlashingEnabled}
                    IconComponent={FlashlightIcon}
                />
                <SettingsCard
                    title="Shake for random recipe"
                    description="Shake the phone to receive a random recipe recommendation"
                    value={shakeForRandomRecipeEnabled}
                    onValueChange={setShakeForRandomRecipeEnabled}
                    IconComponent={PhoneLinkIcon}
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
    scrollViewContent: {
        paddingVertical: 16,

    },
});
