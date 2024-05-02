import React from 'react';
import {Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {StarFilledIcon, StarOutlineIcon} from "../../assets/icons";

export default function TopNavigationBar({ title, LeftIcon, RightIcon, starAction }) {
    const navigation = useNavigation();

    const LeftAction = () => {
        if (LeftIcon.name === 'HamburgerIcon') {
            navigation.openDrawer();  // Opens the drawer when the hamburger icon is pressed
        }
        if (LeftIcon.name === 'BackArrowIcon') {
            navigation.goBack();  // Goes back to the previous screen when the back arrow is pressed
        }
    };

    const RightAction = () => {
        if (RightIcon && RightIcon.name === 'BookIcon') {
            navigation.navigate('Diary');  // Navigates to the Diary screen if the book icon is pressed
        } else if (RightIcon && starAction &&
            (RightIcon.name === "StarFilledIcon" ||  RightIcon.name === "StarOutlineIcon")) {
            starAction();
        }
        // Additional icons and actions can be added here with else if statements
    };

    return (
        <View style={styles.topNavigationBar}>
            <StatusBar translucent={true} backgroundColor="#FDF7FE" barStyle="dark-content" />
            <View style={styles.topBarContent}>
                <TouchableOpacity style={styles.icon} onPress={LeftAction}>
                    <LeftIcon />
                </TouchableOpacity>
                <Text style={styles.fontLarge} numberOfLines={1} ellipsizeMode="tail">{title}</Text>
                {RightIcon ? (
                    <TouchableOpacity style={styles.icon} onPress={RightAction}>
                        <RightIcon />
                    </TouchableOpacity>
                ) : (
                    <View style={styles.icon}></View> // Acts as a spacer when there is no Right Icon
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    topNavigationBar: {
        // The height of the top navigation bar is different on iOS and Android
        ...Platform.select({
                ios: {
                    height: 115,
                },
                android: {
                    height: 100,
                }}),
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
        padding: 32,
    },
    fontLarge: {
        fontFamily: 'Roboto-Regular',
        fontSize: 22,
        flex: 1,
        textAlign: 'center',
        marginLeft: 10,
        marginRight: 10,
        flexShrink: 1, // This allows the text to shrink if necessary to fit into the available space


    }
});
