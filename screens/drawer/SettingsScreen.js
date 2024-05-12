import React, {useContext, useEffect, useState} from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import TopNavigationBar from "../../components/navigation/TopNavigationBar";
import BottomNavigationBar from "../../components/navigation/BottomNavigationBar";
import SettingsCard from "../../components/cards/SettingsCard";
import {
    BookIcon,
    HamburgerIcon,
    NotificationIcon,
    PhoneLinkIcon,
    VibrationIcon,
    VolumeIcon
} from "../../assets/icons";
import {SettingsContext} from "../../utils/SettingsProvider";
import {Dropdown} from "react-native-element-dropdown";

export default function SettingsScreen({ }) {
    const { settings, updateSettings } = useContext(SettingsContext);

    // Define the sound options
    const data = [
        { label: 'Default', value: 'alarm' },
        { label: 'Radar', value: 'radar' },
        { label: 'Morning Flower', value: 'morning_flower' },
        { label: 'Morning Flower BassBoosted', value: 'morning_flower_bass' }
    ];

    // State to keep track of the currently selected item
    const [selectedItem, setSelectedItem] = useState(() => {
        const foundItem = data.find(item => item.value === settings.selectedSound);
        return foundItem || { label: 'Default', value: 'alarm' };
    });

    // Update the selectedItem when settings.selectedSound changes
    useEffect(() => {
        const foundItem = data.find(item => item.value === settings.selectedSound);
        if (foundItem) {
            setSelectedItem(foundItem);
        }
    }, [settings.selectedSound]);

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
                    topBorder={true}
                    bottomBorder={true}
                />
                <SettingsCard
                    title="Sounds"
                    description="Play a sound when a timer runs out"
                    value={settings.soundsEnabled}
                    onValueChange={(value) => handleSettingChange('soundsEnabled', value)}
                    IconComponent={VolumeIcon}
                    borderLinePosition={"top"}
                />
                <View style={styles.dropdownContainer}>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        label="label"
                        value={selectedItem.label}
                        labelField="label"
                        valueField="value"
                        data={data}
                        placeholder={`Sound: ${selectedItem.label}`}
                        onChange={item => {
                            setSelectedItem(item);
                            handleSettingChange('selectedSound', item.value)
                        }}
                    />
                </View>
                <SettingsCard
                    title="Vibrations"
                    description="Vibrate when a timer runs out"
                    value={settings.vibrationsEnabled}
                    onValueChange={(value) => handleSettingChange('vibrationsEnabled', value)}
                    IconComponent={VibrationIcon}
                    topBorder={true}
                />
                <SettingsCard
                    title="Shake for random recipe"
                    description="Shake the phone to receive a random recipe recommendation"
                    value={settings.shakeForRandomRecipeEnabled}
                    onValueChange={(value) => handleSettingChange('shakeForRandomRecipeEnabled', value)}
                    IconComponent={PhoneLinkIcon}
                    topBorder={true}
                    bottomBorder={true}
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
        paddingTop: 16,
        backgroundColor: '#FEF7FF',
    },
    dropdownContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        backgroundColor: '#FEF7FF',
        paddingTop: 0,
        paddingBottom: 6,
        paddingLeft: 66,
        paddingRight: 16,
        top: -10,
    },
    dropdown: {
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingRight: 8,
        paddingLeft: 12,
        paddingVertical: 8,
    },
    placeholderStyle: {
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
    },
    selectedTextStyle: {
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
    },
});
