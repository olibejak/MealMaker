import React, {useState} from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, Platform } from 'react-native';
import {BackArrowIcon, CameraIcon, CheckmarkIconBlack, ImageIcon} from "../assets/icons.js";
import BottomRightCornerButton from "../components/BottomRightCornerButton";
import TopNavigationBar from "../components/TopNavigationBar";
import BottomNavigationBar from "../components/BottomNavigationBar";
import PhotoThumbnail from "../components/PhotoThumbnail";

export default function NewDiaryEntryScreen() {
    const title = "New Entry";
    const [photos, setPhotos] = useState([
        require('../assets/testing_images/recipe.jpg'),require('../assets/testing_images/recipe.jpg'), require('../assets/testing_images/recipe.jpg'),require('../assets/testing_images/recipe.jpg'),require('../assets/testing_images/recipe.jpg'),require('../assets/testing_images/recipe.jpg'),require('../assets/testing_images/recipe.jpg')
        // Add more images here
    ]);
    const handleRemovePhoto = (index) => {
        setPhotos(photos => photos.filter((_, i) => i !== index));
    };

    return (
        <View style={styles.screen}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.screen}>
                <TopNavigationBar title={title} LeftIcon={BackArrowIcon} />
                {photos.length > 0 && (
                    <PhotoThumbnail sources={photos} onClose={handleRemovePhoto} />
                )}
                <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            placeholder="Input text"
                            style={styles.inputText}
                            multiline={true}
                        />
                    </View>
                    <BottomRightCornerButton
                        IconComponent={() => <CheckmarkIconBlack />}
                        onPress={() => console.log('Checkmark pressed')}
                    />
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={styles.button}>
                            <CameraIcon color="black" />
                            <Text style={styles.fontButton}>Take a photo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
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
    fontLarge: {
        fontSize: 22,
        fontWeight: 'bold',
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