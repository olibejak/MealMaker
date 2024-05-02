import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, Platform} from 'react-native';
import {BackArrowIcon, CameraIcon, CheckmarkIconBlack, ImageIcon} from "../../assets/icons.js";
import BottomRightCornerButton from "../../components/buttons/BottomRightCornerButton";
import TopNavigationBar from "../../components/navigation/TopNavigationBar";
import BottomNavigationBar from "../../components/navigation/BottomNavigationBar";
import PhotoThumbnail from "../../components/image/PhotoThumbnail";
import * as ImagePicker from "expo-image-picker";
import log from "../../utils/Logger";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {CommonActions} from "@react-navigation/native";

export default function NewDiaryEntryScreen( { route, navigation } ) {
    const [imageUris, setImageUris] = useState([]);
    const [inputText, setInputText] = useState('');

    // Extract diaryEntry from route.params or set it to null if undefined
    const diaryEntry = route.params?.diaryEntry ?? null;

    useEffect(() => {
        if (diaryEntry) {
            setInputText(diaryEntry.text || '');
            setImageUris(diaryEntry.images || []);
        } else {
            setInputText('');
            setImageUris([]);
        }
    }, [diaryEntry]);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const libraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (libraryStatus.status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }

                const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
                if (cameraStatus.status !== 'granted') {
                    alert('Sorry, we need camera permissions to make this work!');
                }
            }
        })();
    }, []);

    const handleAddImage = async (uri) => {
        if (!uri) {
            log.error("No URI provided to handleAddImage" + uri);
            return;
        }

        const fileName = uri.split('/').pop();
        const newPath = FileSystem.documentDirectory + fileName;

        try {
            await FileSystem.copyAsync({
                from: uri,
                to: newPath
            });
            setImageUris(prevUris => [...prevUris, { uri: newPath }]); // Store it as an object with uri property
        } catch (err) {
            log.error('Error saving the image to filesystem', err);
            alert('Failed to save the image. Please try again.');
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            await handleAddImage(result.assets[0].uri);
        }
        else {
            log.info('Image selection cancelled');
        }
    };

    const takePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            await handleAddImage(result.assets[0].uri);
        }
        else {
            log.info('Image selection cancelled');
        }
    }

    const handleRemovePhoto = async (index) => {
        const uri = imageUris[index].uri;
        try {
            const fileExists = await FileSystem.getInfoAsync(uri);
            if (fileExists.exists) {
                await FileSystem.deleteAsync(uri);
                setImageUris(prevUris => prevUris.filter((_, i) => i !== index));
            } else {
                log.warn('File does not exist:', uri);
            }
        } catch (error) {
            log.error('Error removing photo', error);
            alert('Failed to remove the photo. Please try again.');
        }
        imageUris[index] = null;
    };

    const saveEntry = async () => {
        const storage = await AsyncStorage.getItem('diaryContent');
        let diaryContent = storage ? JSON.parse(storage) : [];

        // Extract the first line to use as the title
        const firstLine = inputText.split('\n')[0] || 'Untitled Entry'; // Default title if the first line is empty

        const newEntry = {
            ...diaryEntry,
            title: firstLine, // Set or update the title based on the first line of the input text
            text: inputText,
            images: imageUris,
        };

        if (diaryEntry) {
            // Update the existing entry in diaryContent
            const index = diaryContent.findIndex(item => item.id === diaryEntry.id);
            if (index !== -1) {
                diaryContent[index] = newEntry;
            } else {
                // Handle the case where diaryEntry might not exist in diaryContent
                newEntry.id = diaryContent.length + 1; // Assign a new ID
                diaryContent.push(newEntry);
            }
        } else {
            // Add a new entry
            newEntry.id = diaryContent.length + 1; // Assign a new ID
            diaryContent.push(newEntry);
        }

        await AsyncStorage.setItem('diaryContent', JSON.stringify(diaryContent));

        // Reset the navigation stack to Diary screen and navigate to the new entry
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    { name: 'Diary'},
                ],
            })
        );
        navigation.navigate('DiaryEntryDetail', { diaryEntry: newEntry });
    };


    return (
        <View style={styles.screen}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.screen}>
                <TopNavigationBar title={diaryEntry ? 'Edit Entry' : 'New Entry'} LeftIcon={BackArrowIcon} />
                {imageUris.length > 0 && (
                    <PhotoThumbnail sources={imageUris.map(uri => ({ uri }))} onClose={handleRemovePhoto} />
                )}
                <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            placeholder="Input text"
                            style={styles.inputText}
                            multiline={true}
                            value={inputText}
                            onChangeText={setInputText}
                        />
                    </View>
                    <BottomRightCornerButton
                        IconComponent={() => <CheckmarkIconBlack />}
                        onPress={saveEntry}
                    />
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={styles.button} onPress={takePhoto}>
                            <CameraIcon color="black" />
                            <Text style={styles.fontButton}>Take a photo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={pickImage}>
                            <ImageIcon color="black" />
                            <Text style={styles.fontButton}>Upload photo</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
            <BottomNavigationBar />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#FFF',
    },
    inputContainer: {
        flex: 1,
        padding: 16,

    },
    inputWrapper: {
        position: 'relative',
        flex: 1,
    },
    inputText: {
        flex: 1,
        textAlignVertical: 'top',
        borderRadius: 12,
        marginBottom: 16,
        paddingLeft: 16,
        paddingTop: 8,
        backgroundColor: '#FEF7FF',
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        letterSpacing: 0.5,
    },
    checkButton: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        backgroundColor: '#E8DEF8',
        borderRadius: 15,

    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom: 10,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E6DEF6',
        borderRadius: 25,
        flexDirection: "row",
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    fontButton: {
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
        letterSpacing: 0.5,
        marginLeft: 5,
    },
});