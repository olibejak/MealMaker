import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {BackArrowIcon} from "../assets/icons";
import { useNavigation } from '@react-navigation/native';

export default function TopNavigationBackArrowBar ({ title }) {
    const navigation = useNavigation();
    const state = navigation.getState();

    return (
        <View style={styles.topNavigationBar}>
            <View style={styles.topBarContent}>
                <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Ingredients')}>
                    <BackArrowIcon/>
                </TouchableOpacity>
                <Text style={styles.fontLarge}>{title}</Text>
                <View width={48}></View>
            </View>
        </View>
    )};

const styles = StyleSheet.create({
    topNavigationBar: {
        height: 116,
        backgroundColor: '#FDF7FE',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingTop: 8,
        paddingBottom: 8,
        paddingRight: 0,
        paddingLeft: 0,
        overflow: 'visible',
    },
    topBarContent: {
        backgroundColor: 'rgba(255,255,255,0)',
        height: 48,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 0,
    },
    icon: {
        height: 48,
        backgroundColor: 'rgba(213,89,192,0)',
        width: 48,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
    },
    fontLarge: {
        fontFamily: 'Roboto-Regular',
        fontSize: 22,
    }
});


