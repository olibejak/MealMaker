import {View, Text, StyleSheet, ScrollView, Button, Image} from "react-native";
import TopNavigationBar from "../components/TopNavigationBar";
import BottomNavigationBar from "../components/BottomNavigationBar";
import Card from "../components/Card";
import {useNavigation} from "@react-navigation/native";
import {useEffect, useState} from "react";
import {BookIcon, BackArrowIcon} from "../assets/icons";

export default function IngredientDetailsScreen ({ route, navigation }) {
    const { ingredient } = route.params;
    const [imageUri, setImageData] = useState(null);

    return (
        <View style={styles.screen}>
            <View>
                <TopNavigationBar title={ingredient.strIngredient} LeftIcon={BackArrowIcon} RightIcon={BookIcon} />
            </View>
            <ScrollView style={styles.scrollableScreen} >
                <View style={styles.imageContainer}>
                    <Image source={{uri: `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}.png`,}} style={styles.image} />
                </View>
                <View style={styles.textContainer} style={styles.roundCorners}>
                    <Text style={styles.fontLarge}>Type</Text>
                    <Text style={styles.fontRegular}>{ingredient.strType}</Text>
                </View>
                <View style={styles.textContainer} style={styles.roundCorners}>
                    <Text style={styles.fontLarge}>Description</Text>
                    <Text style={styles.fontRegular}>{ingredient.strDescription}</Text>
                </View>
            </ScrollView>
            <BottomNavigationBar selected={"Ingredients"} />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        display: 'flex',
        position: 'absolute', // Changed from fixed to absolute for React Native
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
        paddingTop: 8,
        paddingBottom: 8,
        paddingRight: 16,
        paddingLeft: 16,
    },
    scrolling: {
        alignItems: 'center',
    },
    textContainer: {
        display: 'flex',
        marginTop: 8,
        flexDirection: 'column',
        alignItems: 'center',
        flexShrink: 0,
        padding: 10,
    },
    iconSize: {
        width: 24,
        height: 24,
        padding: 8,
    },
    center: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0)',
        padding: 0,
    },
    roundCorners: {
        backgroundColor: '#E8DEF8',
        borderRadius: 100,
        padding: 10,
    },
    fontRegular: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        letterSpacing: 0.5,
    },
    fontLarge: {
        fontFamily: 'Roboto-Regular',
        fontSize: 22,
        textAlign: 'left',
    },
    fontSmallBold: {
        fontFamily: 'Roboto-Bold',
        fontSize: 12,
        letterSpacing: 0.5,
    },
    fontRegularMedium: {
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
        letterSpacing: 0.5,
    },
    fontSmall: {
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
        letterSpacing: 0.5,
    },
    textCenter: {
        textAlign: 'center',
    },
    imageContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'stretch',
    },
});