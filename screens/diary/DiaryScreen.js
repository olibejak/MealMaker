// MyDiaryScreen.js
import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import BottomRightCornerButton from "../../components/buttons/BottomRightCornerButton";
import RecipeCard from "../../components/cards/RecipeCard";
import BottomNavigationBar from "../../components/navigation/BottomNavigationBar";
import TopNavigationBar from "../../components/navigation/TopNavigationBar";
import {BackArrowIcon, PlusIcon} from "../../assets/icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import log from "../../utils/Logger";
import ConfirmationModal from "../../components/modals/ConfirmationModal";

export default function MyDiaryScreen({navigation}) {

    const [diaryContent, setDiaryContent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDiaryEntry, setSelectedDiaryEntry] = useState(null);

    const loadDiaryContent = useCallback(async () => {
        setLoading(true); // Start loading
        try {
            const content = await AsyncStorage.getItem("diaryContent");
            if (content !== null) {
                setDiaryContent(JSON.parse(content));
            }
            setLoading(false); // Loading done
        } catch (error) {
            log.error("Error loading diary content:", error);
            setLoading(false); // Ensure loading is set to false even if there is an error
        }
    }, []);


    useEffect(() => {
        return navigation.addListener('focus', async () => {
            await loadDiaryContent();
        });
    }, [navigation]);


    const deleteDiaryEntry = async () => {
        try {
            const diaryId = selectedDiaryEntry.id;
            // Filter out the diary entry with the given id
            const updatedDiaryContent = diaryContent.filter(entry => entry.id !== diaryId);

            // Set the updated diary content to state
            setDiaryContent(updatedDiaryContent);

            // Save the updated diary content to AsyncStorage
            await AsyncStorage.setItem('diaryContent', JSON.stringify(updatedDiaryContent));
            log.info('Diary entry deleted successfully');

            // Close the modal
            setModalVisible(false);
        } catch (error) {
            log.error('Error deleting diary entry:', error);
            alert('Failed to delete the diary entry. Please try again.');
        }
    };

    return (
        <View style={styles.screen}>
            <TopNavigationBar title={'My diary'} LeftIcon={BackArrowIcon} />
            <ScrollView style={styles.scrollableScreen} contentContainerStyle={styles.scrolling}>
                {diaryContent.length > 0 ? (
                    diaryContent.map((diaryEntry) => (
                        <RecipeCard
                            key={diaryEntry.id}
                            title={diaryEntry.title}
                            date={diaryEntry.date}
                            image={diaryEntry.images[0]}
                            description={diaryEntry.text}
                            onPressDetails={() => navigation.navigate('DiaryEntryDetail', { diaryEntry: diaryEntry })}
                            onPressSecondary={() => {
                                setSelectedDiaryEntry(diaryEntry);
                                setModalVisible(true);
                            }}
                            actionButton={'delete'}
                        />
                    ))
                ) : !loading ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No diary entries, tap + to add some</Text>
                    </View>
                ) : null}
            </ScrollView>
            {modalVisible && (
                <ConfirmationModal
                    onConfirm={deleteDiaryEntry}  // Here you should directly pass the function reference
                    onCancel={() => setModalVisible(false)}
                    visible={modalVisible}
                    title={'Delete diary entry'}
                    text={'Are you sure you want to delete this diary entry?'}
                />
            )}
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
        flexGrow: 1,
        alignItems: 'stretch',
        paddingTop: 8,
        paddingBottom: 50,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    emptyText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 18,
        color: '#666',
        textAlignVertical: 'center',
        textAlign: 'center',
    },
});
