import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import BottomNavigationBar from "../components/BottomNavigationBar";
import TopNavigationBar from "../components/TopNavigationBar";
import {BackArrowIcon, PencilIcon} from "../assets/icons";
import {useNavigation} from "@react-navigation/native";
import BottomRightCornerButton from "../components/BottomRightCornerButton";


export default function DiaryEntryDetailScreen() {
    const title = "My first Recipe"
    const navigation = useNavigation();

    return (
        <View style={styles.screen}>
            <TopNavigationBar title={title} LeftIcon={BackArrowIcon}/>
            {/* ScrollView and contentContainer should occupy all space above the BottomTabBar */}
            <View style={styles.contentContainer}>
                <ScrollView style={styles.content}>
                    <View>
                        <Text style={styles.heading}>Chicken Fajita Mac and Cheese</Text>
                        <Text style={styles.bodyText}>
                            Today, I dove into making Chicken Fajita Mac and Cheese...
                            {/* Continue with the rest of the content text */}
                        </Text>
                    </View>
                </ScrollView>
            </View>
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
        marginBottom: 100, // Height of the BottomTabBar, adjust accordingly
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
    // Additional styles if needed
});