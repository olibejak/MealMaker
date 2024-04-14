import {View, StyleSheet, ScrollView, TouchableOpacity} from "react-native";
import { useNavigation } from '@react-navigation/native';
import TopNavigationBar from "../components/TopNavigationBar";
import BottomNavigationBar from "../components/BottomNavigationBar";
import SearchBar from "../components/SearchBar";
import Card from "../components/Card";
import {useEffect, useState} from "react";

export default function IngredientsScreen () {
    const title = "Ingredients";
    const filtersOn = false;
    const selectedBottomBar = "Ingredients";
    const fridgeButtonOn = true;
    const cartButtonOn = true;
    const navigation = useNavigation();
    const [ingredients, setIngredients] = useState([]);

    const navigateToIngredientDetails = (ingredient) => {
        navigation.navigate("IngredientDetails", { ingredient });
    };

    useEffect(() => {
        const loadIngredients = async () => {
            try {
                const res = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
                const data = await res.json();
                if (data && data.meals) {
                    setIngredients(data.meals);
                }
            } catch (error) {
                console.error('Error loading ingredients:', error);
            }
        };
        loadIngredients();
    }, []);

    return (
        <View style={styles.screen}>
            <View>
                <TopNavigationBar title={title}/>
            </View>
            <ScrollView style={styles.scrollableScreen} contentContainerStyle={styles.scrolling}>
                <SearchBar filtersOn={filtersOn}/>
                {ingredients.map((ingredient, index) => (
                    <Card
                        key={index}
                        text={ingredient.strIngredient}
                        fridgeButtonOn={fridgeButtonOn}
                        cartButtonOn={cartButtonOn}
                        onPress={() => navigateToIngredientDetails(ingredient)}
                    />
                ))}
            </ScrollView>
            <View>
                <BottomNavigationBar selected={selectedBottomBar} />
            </View>
        </View>
    )
};

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
        paddingTop: 8,
        paddingBottom: 8,
        paddingRight: 16,
        paddingLeft: 16,

    },
    scrolling: {
        alignItems: 'center',
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
    },
    fontRegular: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        letterSpacing: 0.5,
    },
    fontLarge: {
        fontFamily: 'Roboto-Regular',
        fontSize: 22,
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
});