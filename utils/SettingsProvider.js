import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import log from "./Logger";
import {ActivityIndicator} from "react-native";

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState();
    const [isLoading, setIsLoading] = useState(true);  // Add a loading state

    const loadSettings = async () => {
        try {
            const savedSettings = await AsyncStorage.getItem('settings');
            if (savedSettings !== null) {
                setSettings(JSON.parse(savedSettings));
            } else {
                // Set default settings if none are stored
                setSettings({
                    soundsEnabled: true,
                    selectedSound: 'alarm',
                    vibrationsEnabled: true,
                    notificationsEnabled: true,
                    shakeForRandomRecipeEnabled: false,
                });
            }
        } catch (error) {
            log.error("Failed to load settings from storage:", error);
            // Fallback to default values in case of error
            setSettings({
                soundsEnabled: true,
                selectedSound: 'alarm',
                vibrationsEnabled: true,
                notificationsEnabled: true,
                shakeForRandomRecipeEnabled: false,
            });
        }
        setIsLoading(false);  // Set loading to false after settings are loaded
    };

    useEffect(() => {
        loadSettings();
    }, []);

    useEffect(() => {
        if (!isLoading) {  // Ensure settings are not undefined before saving
            const saveSettings = async () => {
                try {
                    await AsyncStorage.setItem('settings', JSON.stringify(settings));
                } catch (error) {
                    log.error("Failed to save settings to storage:", error);
                }
            };
            saveSettings();
        }
    }, [settings, isLoading]);

    const updateSettings = (newSettings) => {
        setSettings(prevSettings => ({ ...prevSettings, ...newSettings }));
    };

    if (isLoading) {
        // Optionally return a loading screen or null while settings are loading
        return <ActivityIndicator size={"large"} />;
    }

    return (
        <SettingsContext.Provider value={{ settings, updateSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};
