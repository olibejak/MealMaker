import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import BottomNavigationBar from "../components/BottomNavigationBar";
import TopNavigationBar from "../components/TopNavigationBar";
import {BackArrowIcon, PencilIcon} from "../assets/icons";
import {useNavigation} from "@react-navigation/native";
import BottomRightCornerButton from "../components/BottomRightCornerButton";
import image from "../assets/testing_images/recipe.jpg";


export default function DiaryEntryDetailScreen() {
    const title = "My first Recipe";
    const navigation = useNavigation();
    const image = require('../assets/testing_images/recipe.jpg')

    return (
        <View style={styles.screen}>
            <TopNavigationBar title={title} LeftIcon={BackArrowIcon}/>
            <ScrollView style={styles.scrollableScreen} contentContainerStyle={styles.scrolling}>
                <View style={styles.contentContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.cardTitle}>Chicken Fajita Mac and Cheese</Text>
                        <Text style={styles.cardContent}>
                            Today, I dove into making Chicken Fajita Mac and Cheese...
                            {/* Continue with the rest of the content text */}
                        </Text>
                    </View>
                    <Image source={image} style={styles.image} />
                </View>
            </ScrollView>
            <BottomRightCornerButton
                IconComponent={PencilIcon}
                onPress={() => navigation.navigate('NewDiaryEntry')}
            />
            <BottomNavigationBar />
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
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    scrolling: {
        alignItems: 'center',
        overflow: 'visible',
        paddingBottom: 16,
    },
    image: {
        width: '100%',
        height: 200, // Adjust the height as necessary
        resizeMode: 'cover',
        borderRadius: 12,
    },
    cardTitle: {
        fontFamily: 'Roboto-Medium',
        fontSize: 18,
        marginBottom: 8,
    },
    cardContent: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: '#48454E',
        lineHeight: 24,
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: "justify",
        flexShrink: 0,
        backgroundColor: '#FEF7FF',
        borderRadius: 12,
        padding: 16,
    },
    contentContainer: {
        backgroundColor: '#FEF7FF',
        borderRadius: 12,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        width: '100%',
    }

});