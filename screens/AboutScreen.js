import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import TopNavigationBar from "../components/TopNavigationBar";
import BottomNavigationBar from "../components/BottomNavigationBar";
import { BookIcon, HamburgerIcon } from "../assets/icons";

export default function AboutScreen() {
    const sections = [
        {
            title: 'About the app',
            content: 'Welcome to MealMaker, your ultimate kitchen companion! Whether you\'re a budding chef or a busy professional with a passion for cooking, MealMaker is designed to simplify your culinary journey. Our app offers an extensive collection of recipes complete with ingredients, detailed descriptions to help you whip up delicious meals with ease.'
        },
        {
            title: 'Creation',
            content: 'The app was developed in 2024 by students Barbora Pečachůčková, Jan Höfer, and Jakub Olíberius for their project in the subject PDA at CTU FEE.'
        },
        {
            title: 'API',
            content: 'This app uses the free MealDB API available here: https://www.themealdb.com/api.php'
        },
        {
            title: 'Version',
            content: 'Current version: 1.0.0'
        },
    ];

    return (
        <View style={styles.screen}>
            <TopNavigationBar title="About" LeftIcon={HamburgerIcon} RightIcon={BookIcon} />
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
                {sections.map((section, index) => (
                    <AboutSectionCard key={index} title={section.title} content={section.content} />
                ))}
            </ScrollView>
            <BottomNavigationBar /* other props as needed */ />
        </View>
    );
}

function AboutSectionCard({ title, content }) {
    return (
        <View style={styles.card}>
            <Text style={[styles.cardTitle, styles.fontRegularMedium]}>{title}</Text>
            <Text style={styles.cardContent}>{content}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    scrollView: {
        marginHorizontal: 16,
    },
    scrollViewContent: {
        paddingBottom: 100, // Adjust this as needed to prevent the shadow from being cut off
    },
    card: {
        backgroundColor: '#F6F2F9',
        borderRadius: 12,
        marginTop: 12,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.50,
        shadowRadius: 1,
        elevation: 4,
    },
    cardTitle: {
        fontFamily: 'Roboto-Medium',
        fontSize: 18,
        marginBottom: 8,
    },
    cardContent: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: '#666',
        lineHeight: 24,
    },
    fontRegularMedium: {
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
        letterSpacing: 0.5,
    },
    // Add any additional styles you may need
});
