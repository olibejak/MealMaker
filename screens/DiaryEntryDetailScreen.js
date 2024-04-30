import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import BottomNavigationBar from "../components/BottomNavigationBar";
import TopNavigationBar from "../components/TopNavigationBar";
import {BackArrowIcon, PencilIcon} from "../assets/icons";
import {useNavigation} from "@react-navigation/native";
import BottomRightCornerButton from "../components/BottomRightCornerButton";


export default function DiaryEntryDetailScreen( { route, navigation } ) {
    const {diaryEntry} = route.params;
    const title = "My first Recipe";
    const image = require('../assets/testing_images/recipe.jpg')

    return (
        <View style={styles.screen}>
            <TopNavigationBar title={title} LeftIcon={BackArrowIcon}/>
            <ScrollView style={styles.scrollableScreen} contentContainerStyle={styles.scrolling}>
                <View style={styles.contentContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.cardTitle}>Chicken Fajita Mac and Cheese</Text>
                        <Text style={styles.cardContent}>
                            {`Dear Diary,

Today, I embarked on a culinary adventure, one that I've been planning for weeks: making Chicken Fajita Mac and Cheese from scratch! I must confess, the fusion of spicy fajitas with the creamy, comforting embrace of mac and cheese felt like a gastronomic quest worth penning down.

My kitchen transformed into a vibrant stage as I began. First, I sautéed onions and bell peppers until they were just soft, their sizzling a song of the feast to come. I added strips of seasoned chicken breast, watching them brown, infused with the robust flavors of cumin, paprika, and a hint of lime - a zesty ode to the fajitas' spirit.

Once the chicken was tender and the vegetables were imbued with charred edges, I stirred in a roux, that magical blend of flour and butter, to cradle my concoction in a thick, velvety sauce. The rich aroma of simmering chicken stock filled the air as I poured it in, and I found myself dancing to the rhythm of the bubbling pot.

And then, the cheese - oh, the cheese! Generous handfuls of cheddar melted into the mix, stretching into strings of golden perfection as I stirred. I couldn't resist sneaking a taste, and Diary, it was divine - a creamy symphony that promised indulgence.

I folded the al dente macaroni into the saucy chicken mixture, the pasta absorbing the bold, savory flavors. The final touch was a sprinkle of fresh cilantro and a squeeze of lime, adding a pop of freshness that whispered of summer evenings and laughter.

As the dish baked to a bubbly, golden-topped delight, I set the table, lit candles, and poured a glass of chilled white wine. The first bite was a revelation - a harmonious blend of textures and tastes, each forkful a story of comfort food meeting the zesty kick of Tex-Mex.

I must say, cooking Chicken Fajita Mac and Cheese wasn't just about the flavors; it was about creating a moment, a delicious memory that I'd look back on with a smile. And with that, I close today's entry, with a heart as full as my satisfied stomach.`}
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
        marginBottom: 16,
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