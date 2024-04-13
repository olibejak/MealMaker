import React from 'react';
import { View, StyleSheet, ScrollView, Text, Image } from "react-native";
import TopNavigationBar from "../components/TopNavigationBar";
import BottomNavigationBar from "../components/BottomNavigationBar";
import DiaryEntry from "../components/DiaryEntry"; // Assume you have a DiaryEntry component

export default function DiaryScreen() {
    const title = "My diary";

    return (
        <View style={styles.screen}>
            <TopNavigationBar title={title} />
            <ScrollView style={styles.scrollableScreen} contentContainerStyle={styles.scrolling}>
                {/* You can map over your diary entries and render them using DiaryEntry component */}
                {/* Example entry: */}
                <DiaryEntry
                    date="10.3.2024"
                    title="My first recipe"
                    excerpt="Today, I dove into making Chicken Fajita Mac and Cheese, a thrilling twist on the classic mac. Gathering the essentials—macaroni..."
                    //image={require('../path-to-your-image.jpg')} // Adjust path as necessary
                />
                {/* Add more diary entries here */}
            </ScrollView>
            <BottomNavigationBar selected="Diary" /> // Adjusted to highlight "Diary" in the BottomNavigationBar
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1, // Use flex instead of absolute positioning
        justifyContent: 'space-between',
        backgroundColor: '#FFF', // Assuming the whole screen has a white background
    },
    scrollableScreen: {
        flex: 1, // Allow the scroll view to expand
        paddingTop: 8,
        paddingBottom: 8,
        paddingHorizontal: 16, // Combined paddingLeft and paddingRight
    },
    scrolling: {
        justifyContent: 'flex-start',
    },
    // ... rest of your styles
});
