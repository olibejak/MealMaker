import {View, StyleSheet,ScrollView} from "react-native";
import TopNavigationBar from "../components/TopNavigationBar";
import BottomNavigationBar from "../components/BottomNavigationBar";
import SearchBar from "../components/SearchBar";
import Card from "../components/Card";

export default function IngredientsScreen () {
    const title = "Ingredients";
    const filtersOn = false;
    const selectedBottomBar = "Ingredients";
    const fridgeButtonOn = true;
    const cartButtonOn = true;

    return (
        <View style={styles.screen}>
            <View>
                <TopNavigationBar title={title}/>
            </View>
            <ScrollView style={styles.scrollableScreen} contentContainerStyle={styles.scrolling}>
                <SearchBar filtersOn={filtersOn}/>
                {Array.from({ length: 15 }).map((_, index) => (
                    <Card
                        key={index}
                        text={"White Wine Vinegar"}
                        fridgeButtonOn={fridgeButtonOn}
                        cartButtonOn={cartButtonOn}
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