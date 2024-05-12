import React, {useContext} from 'react';
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
import {SettingsContext} from "../../utils/SettingsProvider";

export default function SettingsScreen({ }) {
    const { settings, updateSettings } = useContext(SettingsContext);

    // Helper function to handle setting changes
    const handleSettingChange = (settingKey, value) => {
        updateSettings({ [settingKey]: value });
    };

    return (
        <View style={styles.screen}>
            <TopNavigationBar title="Settings" LeftIcon={HamburgerIcon} RightIcon={BookIcon} />
            <ScrollView style={styles.scrollableScreen} contentContainerStyle={styles.scrollViewContent}>
                <SettingsCard
                    title="Notifications"
                    description="Receive a notification when a timer runs out"
                    value={settings.notificationsEnabled}
                    onValueChange={(value) => handleSettingChange('notificationsEnabled', value)}
                    IconComponent={NotificationIcon}
                />
                <SettingsCard
                    title="Sounds"
                    description="Play a sound when a timer runs out"
                    value={settings.soundsEnabled}
                    onValueChange={(value) => handleSettingChange('soundsEnabled', value)}
                    IconComponent={VolumeIcon}
                />
                <SettingsCard
                    title="Vibrations"
                    description="Vibrate when a timer runs out"
                    value={settings.vibrationsEnabled}
                    onValueChange={(value) => handleSettingChange('vibrationsEnabled', value)}
                    IconComponent={VibrationIcon}
                />
                <SettingsCard
                    title="Flashing"
                    description="Flash the screen when timer ends"
                    value={settings.flashingEnabled}
                    onValueChange={(value) => handleSettingChange('flashingEnabled', value)}
                    IconComponent={FlashlightIcon}
                />
                <SettingsCard
                    title="Shake for random recipe"
                    description="Shake the phone to receive a random recipe recommendation"
                    value={settings.shakeForRandomRecipeEnabled}
                    onValueChange={(value) => handleSettingChange('shakeForRandomRecipeEnabled', value)}
                    IconComponent={PhoneLinkIcon}
                />
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
