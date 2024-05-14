import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import log from "./Logger";

export const SettingsContext = createContext({
    settings: null,
    isLoading: true,
    updateSettings: () => {},
});

export const SettingsProvider = ({ children }) => {
    // Default settings
    const defaultSettings = {
        soundsEnabled: true,
        selectedSound: 'alarm',
        vibrationsEnabled: true,
        notificationsEnabled: true,
        shakeForRandomRecipeEnabled: true,
    };

    const [settings, setSettings] = useState({...defaultSettings});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const savedSettings = await AsyncStorage.getItem('settings');
                if (savedSettings !== null) {
                    const loadedSettings = JSON.parse(savedSettings);
                    setSettings(prevSettings => ({...prevSettings, ...loadedSettings}));
                }
                log.info("Loaded settings:", savedSettings || "default settings used");
            } catch (error) {
                log.error("Failed to load settings from storage:", error);
            }
            setIsLoading(false); // Set loading to false after settings are loaded
        };
        loadSettings();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            const saveSettings = async () => {
                try {
                    await AsyncStorage.setItem('settings', JSON.stringify(settings));
                    log.info("Settings saved to storage.");
                } catch (error) {
                    log.error("Failed to save settings to storage:", error);
                }
            };
            saveSettings();
        }
    }, [settings]);

    const updateSettings = (newSettings) => {
        setSettings(prevSettings => ({ ...prevSettings, ...newSettings }));
    };

    return (
        <SettingsContext.Provider value={{ settings, updateSettings, isLoading }}>
            {children}
        </SettingsContext.Provider>
    );
};
