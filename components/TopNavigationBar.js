import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function TopNavigationBar({ title, LeftIcon, RightIcon }) {
    const navigation = useNavigation();
    const state = navigation.getState();

    const LeftAction = () => {
        // Action for Left Icon
        if (LeftIcon.name === 'HamburgerIcon') {
            // TODO: change to dropdown menu
            navigation.navigate('About');
            //navigation.navigate('Settings');
            //navigation.navigate('Timer');
        }
        if (LeftIcon.name === 'BackArrowIcon') {
            navigation.goBack()
        }
    };

    const RightAction = () => {
        // Action for Right Icon
        if (RightIcon.name === 'BookIcon') {
            navigation.navigate('Diary');
        }
        // More icons can be added with else if statements
    };

    return (
        <View style={styles.topNavigationBar}>
            <View style={styles.topBarContent}>
                {/* Left Icon always exists */}
                <TouchableOpacity style={styles.icon} onPress={LeftAction}>
                    <LeftIcon />
                </TouchableOpacity>
                <Text style={styles.fontLarge}>{title}</Text>
                {/* Conditional rendering for Right Icon or Spacer */}
                {RightIcon ? (
                    <TouchableOpacity style={styles.icon} onPress={RightAction}>
                        <RightIcon />
                    </TouchableOpacity>
                ) : (
                    <View style={styles.icon}></View> // This acts as a spacer when there is no Right Icon
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
