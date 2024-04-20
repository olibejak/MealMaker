import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function TopNavigationBar({ title, LeftIcon, RightIcon }) {
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
        }
        // Additional icons and actions can be added here with else if statements
    };

    return (
        <View style={styles.topNavigationBar}>
            <View style={styles.topBarContent}>
                <TouchableOpacity style={styles.icon} onPress={LeftAction}>
                    <LeftIcon />
                </TouchableOpacity>
                <Text style={styles.fontLarge}>{title}</Text>
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
        height: 100,
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
