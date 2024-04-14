import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import BottomNavigationBar from "../components/BottomNavigationBar";
import TopNavigationBar from "../components/TopNavigationBar";
import {BackArrowIcon, PencilIcon} from "../assets/icons";
import {useNavigation} from "@react-navigation/native";
import BottomRightCornerButton from "../components/BottomRightCornerButton";


export default function DiaryEntryDetailScreen() {
    const title = "My first Recipe";
    const navigation = useNavigation();
    const image = require('../assets/testing_images/recipe.jpg')

    return (
        <View style={styles.screen}>
            <TopNavigationBar title={title} LeftIcon={BackArrowIcon}/>
            <ScrollView style={styles.content}>
                <Image source={image} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.heading}>Chicken Fajita Mac and Cheese</Text>
                    <Text style={styles.bodyText}>
                        Today, I dove into making Chicken Fajita Mac and Cheese...
                        {/* Continue with the rest of the content text */}
                    </Text>
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
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        padding: 10,
    },
    image: {
        width: '100%', // Take up all available width
        height: 200, // Set a fixed height for the image
        resizeMode: 'cover' // Cover the frame of the image view by resizing the image
    },
    textContainer: {
        padding: 10,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        // Add any additional styling for the heading
    },
    bodyText: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
        // Add any additional styling for the body text
    },
    // ... other styles as needed
});