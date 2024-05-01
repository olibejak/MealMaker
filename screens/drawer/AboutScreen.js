import React from 'react';
import { ScrollView, StyleSheet, Text, View, Linking } from 'react-native';
import TopNavigationBar from "../../components/navigation/TopNavigationBar";
import BottomNavigationBar from "../../components/navigation/BottomNavigationBar";
import { BookIcon, HamburgerIcon } from "../../assets/icons";
import log from "../../utils/Logger";

export default function AboutScreen() {
    const sections = [
        {
            title: 'About the app',
            content: 'Welcome to MealMaker, your ultimate kitchen companion! Whether you\'re a budding chef or a busy professional with a passion for cooking, MealMaker is designed to simplify your culinary journey. Our app offers an extensive collection of recipes complete with ingredients, detailed descriptions to help you whip up delicious meals with ease.'
        },
        {
            title: 'Creation',
            content: 'The app was developed in 2024 by students Barbora Pecháčková, Jan Höfer, and Jakub Oliberius for their project in the subject PDA at CTU FEE.'
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
    // Extract the URL from the content
    const urlMatch = content.match(/https?:\/\/\S+/);
    const url = urlMatch ? urlMatch[0] : null;
    const textBeforeUrl = url ? content.split(url)[0] : content;
    const textAfterUrl = url && content.split(url)[1] ? content.split(url)[1] : '';

    const handlePress = () => {
        if (url) {
            Linking.openURL(url).catch(err => log.error("Failed to open URL:", err));
        }
    };

    return (
        <View style={styles.shadowContainer}>
            <View style={styles.card}>
                <Text style={[styles.cardTitle, styles.fontRegularMedium]}>{title}</Text>
                <Text style={styles.cardContent}>
                    {textBeforeUrl}
                    {url && (
                        <Text onPress={handlePress} style={[styles.cardContent, styles.link]}>
                            {url}
                        </Text>
                    )}
                    {textAfterUrl}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    shadowContainer: {
        padding: 4,
        backgroundColor: 'transparent'
    },
    screen: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    link: {
        color: 'blue', // or any color that indicates tappable links
        textDecorationLine: 'underline',
    },
    scrollViewContent: {
        paddingTop: 4,
        paddingBottom: 8,
        paddingHorizontal: 16,
    },
    card: {
        backgroundColor: '#F6F2F9',
        borderRadius: 12,
        marginTop: 4,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.50,
        shadowRadius: 1,
        elevation: 3,
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
    fontRegularMedium: {
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
        letterSpacing: 0.5,
    },
    // Add any additional styles you may need
});
