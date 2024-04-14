// noinspection JSVoidFunctionReturnValueUsed

import React from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons, MaterialIcons, } from '@expo/vector-icons';
import {BackArrowIcon, CheckmarkIcon,} from "../assets/icons.js";
import BottomRightCornerButton from "../components/BottomRightCornerButton";
import TopNavigationBar from "../components/TopNavigationBar";

export default function NewDiaryEntryScreen() {
    const title = "New Entry"
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.screen}>
            <TopNavigationBar title={title} LeftIcon={BackArrowIcon} />
            <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                    <TextInput
                        placeholder="Input text"
                        style={styles.inputText}
                        multiline={true}
                    />
                </View>
                <BottomRightCornerButton
                    IconComponent={() => <Ionicons name="checkmark" size={24} color="black" />}
                    onPress={() => console.log('Checkmark pressed')}
                />
                <View style={styles.photoButtons}>
                    <TouchableOpacity style={styles.photoButton}>
                        <Ionicons name="camera" size={24} color="black" />
                        <Text>Take a photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.photoButton}>
                        <MaterialIcons name="photo-library" size={24} color="black" />
                        <Text>Upload photo</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'space-between',
    },
    fontLarge: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    inputContainer: {
        flex: 1,
        padding: 10,
    },
    inputWrapper: {
        position: 'relative',
        flex: 1,
    },
    inputText: {
        flex: 1,
        borderColor: 'gray',
        textAlignVertical: 'top',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 10,
        paddingTop: 10
    },
    checkButton: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        backgroundColor: '#E8DEF8',
        borderRadius: 15,
    },
    photoButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom: 10,
    },
    photoButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 170,
        height: 50,
        backgroundColor: '#E8DEF8',
        borderRadius: 25,
        flexDirection: "row",
        padding: 5,
    },
});