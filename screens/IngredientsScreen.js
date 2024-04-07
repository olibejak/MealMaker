import {TouchableOpacity, View, StyleSheet, Text, TextInput} from "react-native";
import Svg, {G, Path} from "react-native-svg";
import TopNavigationBar from "../components/TopNavigationBar";
import BottomNavigationBar from "../components/BottomNavigationBar";
import {BasketCardIcon, FridgeCardIcon, SearchIcon} from "../assets/icons";

export default function IngredientsScreen () {

    return (
        <View style={styles.screen}>
            <View>
                <TopNavigationBar title={"Ingredientsbzzz"}/>
            </View>
            <View style={styles.scrollableScreen}>
                <TouchableOpacity style={styles.searchBar}>
                    <View style={styles.searchIcon}>
                        <View style={styles.center}>
                            <SearchIcon/>
                        </View>
                    </View>
                    <View style={styles.searchContent}>
                        <TextInput placeholder={"Search ingredients"} returnKeyType="search" onChangeText={() => {/* Handle change */
                        }} style={styles.fontRegular}></TextInput>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card}>
                    <Text style={[styles.cardTextContent, styles.fontRegularMedium]}>White Wine Vinegar</Text>
                    <View style={styles.cardIcons}>
                        <TouchableOpacity style={[styles.center, styles.cardButton]}>
                            <FridgeCardIcon/>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.center, styles.cardButton]}>
                            <BasketCardIcon/>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </View>
            <View>
                <BottomNavigationBar/>
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
        backgroundColor: 'rgba(53,171,53,0)',
        paddingTop: 8,
        paddingBottom: 8,
        paddingRight: 16,
        paddingLeft: 16,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flexGrow: 1,
        margin: 8,
        gap: 8,
        overflow: 'auto',
    },
    searchBar: {
        paddingTop: 8,
        paddingBottom: 8,
        height: 60,
        backgroundColor: '#EBE6EF',
        borderRadius: 28,
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        flexDirection: 'row',
    },
    searchIcon: {
        height: 48,
        backgroundColor: 'rgba(213,89,192,0)',
        width: 48,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
    },
    searchContent: {
        height: 56,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: "center",
        textAlign: "left",
        fontSize: 16,
        width: '100%',
    },
    iconSize: {
        width: 24,
        height: 24,
        padding: 8,
    },
    card: {
        width: '100%',
        borderRadius: 12,
        backgroundColor: '#F6F2F9',
        height: 90,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        //  Shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 2, // Rightward shadow
            height: 2, // Downward shadow
        },
        shadowOpacity: 0.50,
        shadowRadius: 2,
        // Android shadow (uniform, no direction control)
        elevation: 5,
    },
    cardTextContent: {
        // width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 16,
    },
    cardIcons: {
        paddingTop: 20,
        paddingRight: 11,
        paddingBottom: 20,
        paddingLeft: 26,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    cardButton: {
        width: 40,
        height: 40,
        backgroundColor: '#E6DEF6',
        borderRadius: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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