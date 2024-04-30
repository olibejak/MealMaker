// MyDiaryScreen.js
import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import BottomRightCornerButton from "../components/BottomRightCornerButton";
import RecipeCard from "../components/RecipeCard";
import BottomNavigationBar from "../components/BottomNavigationBar";
import TopNavigationBar from "../components/TopNavigationBar";
import {BackArrowIcon, PlusIcon} from "../assets/icons";
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import log from "../utils/Logger";

export default function MyDiaryScreen() {
    const navigation = useNavigation();
    const state = navigation.getState();
    const [isFocused, setIsFocused] = useState(false);
    const [diaryContent, setDiaryContent] = useState([]);

    const loadDiaryContent = useCallback (async () => {
        try {
            // Load fridge content
            const content = await AsyncStorage.getItem("diaryContent");
            if (content !== null) {
                setDiaryContent(JSON.parse(content));
            }
        } catch (error) {
            log.error("Error loading diary content:", error);
        }
    }, []);

    useEffect(() => {
        return navigation.addListener('focus', () => {
            setIsFocused(true);
            loadDiaryContent();
        });
    }, [navigation]);


    const deleteDiaryEntry = async (diaryId) => {
        try {
            // Filter out the diary entry with the given id
            const updatedDiaryContent = diaryContent.filter(entry => entry.id !== diaryId);

            // Set the updated diary content to state
            setDiaryContent(updatedDiaryContent);

            // Save the updated diary content to AsyncStorage
            await AsyncStorage.setItem('diaryContent', JSON.stringify(updatedDiaryContent));
            log.info('Diary entry deleted successfully');
        } catch (error) {
            log.error('Error deleting diary entry:', error);
            alert('Failed to delete the diary entry. Please try again.');
        }
    };



    return (
        <View style={styles.screen}>
            <TopNavigationBar title={'My diary'} LeftIcon={BackArrowIcon} />
            <ScrollView style={styles.scrollableScreen} contentContainerStyle={styles.scrolling}>
                {diaryContent.map((diaryEntry) => (
                    <RecipeCard
                        key={diaryEntry.id}
                        title={diaryEntry.title}
                        date={diaryEntry.date}
                        image={diaryEntry.images[0]}
                        description={diaryEntry.text}
                        onPressDetails={() => navigation.navigate('DiaryEntryDetail', { diaryId: diaryEntry.id })}
                        onPressSecondary={() => deleteDiaryEntry(diaryEntry.id)}
                        actionButton={'delete'}
                    />
                ))}
            </ScrollView>
            <BottomNavigationBar/>
            <BottomRightCornerButton IconComponent={PlusIcon} onPress={() => navigation.navigate('NewDiaryEntry')} />
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
        paddingTop: 8,
        paddingBottom: 50,
    },
});
