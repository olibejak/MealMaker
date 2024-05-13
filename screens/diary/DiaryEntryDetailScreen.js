import React from 'react';
import {View, Text, ScrollView, StyleSheet, Image, Dimensions} from 'react-native';
import BottomNavigationBar from "../../components/navigation/BottomNavigationBar";
import TopNavigationBar from "../../components/navigation/TopNavigationBar";
import {BackArrowIcon, PencilIcon} from "../../assets/icons";
import BottomRightCornerButton from "../../components/buttons/BottomRightCornerButton";

export default function DiaryEntryDetailScreen( { route, navigation } ) {
    const {diaryEntry} = route.params;

    function isImageURISource(value) {
        if (typeof value === 'string' || (typeof value === 'object' && value.uri != null && typeof value.uri === 'string'))
            return value;
    }

    return (
        <View style={styles.screen}>
            <TopNavigationBar title={diaryEntry.title} LeftIcon={BackArrowIcon}/>
            <ScrollView style={styles.scrollableScreen} contentContainerStyle={styles.scrolling}>
                <View style={styles.contentContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.cardTitle}>{diaryEntry.title}</Text>
                        <Text style={styles.cardSubtitle}>{diaryEntry.date}</Text>
                        <Text style={styles.cardContent}>{diaryEntry.text}</Text>
                    </View>
                </View>
                <View style={styles.imagesContainer}>
                    {typeof diaryEntry.images == "object" ? diaryEntry.images.map((image, index) => (
                        <Image key={index} source={isImageURISource(image)} style={styles.image} />
                    )) : null}
                </View>
            </ScrollView>
            <BottomRightCornerButton
                IconComponent={PencilIcon}
                onPress={() => navigation.navigate('NewDiaryEntry', { diaryEntry: diaryEntry })}
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
    imagesContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        overflow: 'visible',
        width: '100%',
        margin: 16,
    },
    image: {
        width: Dimensions.get('window').width - 32,
        height: Dimensions.get('window').width - 32,
        resizeMode: 'cover',
        borderRadius: 12,
        marginBottom: 16,
    },
    cardTitle: {
        fontFamily: 'Roboto-Medium',
        fontSize: 18,
        marginBottom: 0,
    },
    cardSubtitle: {
        fontFamily: 'Roboto-Medium',
        fontSize: 14,
        marginBottom: 8,
        color: '#48454E',
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