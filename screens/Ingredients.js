import {TouchableOpacity, View, StyleSheet, Image, Text, Touchable} from "react-native";
import HamburgerIcon from '../assets/myassets/hamburger.svg';
import BookIcon from '../assets/myassets/book.svg';
import SearchIcon from '../assets/myassets/search.svg';
import KitchenIcon from '../assets/myassets/kitchen.svg';
import ShoppingIcon from '../assets/myassets/shopping.svg';
import EggIcon from '../assets/myassets/egg.svg';
import DiningIcon from '../assets/myassets/dining.svg';

export default function IngredientsScreen () {

    return (
        <View style={styles.screen}>
            <View style={styles.topBar}>
                <View style={styles.topBarContent}>
                    <TouchableOpacity style={styles.searchIcon}>
                        <Image source={require('../assets/myassets/hamburger_menu.png')} style={styles.iconSize} />
                    </TouchableOpacity>
                    <Text style={styles.fontLarge}>Ingredients</Text>
                    <TouchableOpacity style={styles.searchIcon}>
                        <Image source={require('../assets/myassets/book.png')} style={styles.iconSize} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.scrollableScreen}>
                <TouchableOpacity style={styles.searchBar}>
                    <View style={styles.searchIcon}>
                        <View style={styles.center}>
                            <Image source={require('../assets/myassets/search.png')} style={styles.iconSize} />
                        </View>
                    </View>
                    <View style={styles.searchContent}>
                        <Text style={styles.fontRegular}>Search ingredients</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card}>
                    <Text style={[styles.cardTextContent, styles.fontRegularMedium]}>White Wine Vinegar</Text>
                    <View style={styles.cardIcons}>
                        <TouchableOpacity style={[styles.center, styles.cardButton]}>
                            <Image source={require('../assets/myassets/kitchen.png')} style={styles.iconSize} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.center, styles.cardButton]}>
                            <Image source={require('../assets/myassets/shopping.png')} style={styles.iconSize} />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.center} onPress={() => {/* Handle onPress */}}>
                    <View style={styles.bottomBarButton}>
                        <View style={[styles.bottomBarIcon, styles.enabled]}>
                            <Image source={require('../assets/myassets/egg.png')}/>
                        </View>
                        <Text style={[styles.textCenter, styles.fontSmallBold]}>Ingredients</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.center} onPress={() => {/* Handle onPress */}}>
                    <View style={styles.bottomBarButton}>
                        <View style={styles.bottomBarIcon}>
                        <Image source={require('../assets/myassets/dining.png')}/>
                        </View>
                        <Text style={styles.fontSmall}>Recipes</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.center} onPress={() => {/* Handle onPress */}}>
                    <View style={styles.bottomBarButton}>
                        <View style={styles.bottomBarIcon}>
                            <Image source={require('../assets/myassets/kitchen.png')}/>
                        </View>
                        <Text style={styles.fontSmall}>Fridge</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.center} onPress={() => {/* Handle onPress */}}>
                    <View style={styles.bottomBarButton}>
                        <View style={styles.bottomBarIcon}>
                            <Image source={require('../assets/myassets/shopping.png')}/>
                        </View>
                        <Text style={styles.fontSmall}>Shopping list</Text>
                    </View>
                </TouchableOpacity>
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
    topBar: {
        height: 116,
        backgroundColor: '#FDF7FE',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingTop: 8,
        paddingBottom: 8,
        paddingRight: 0,
        paddingLeft: 0,
        overflow: 'visible',
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
        alignItems: 'center',
        justifyContent: "center",
        textAlign: "center",
        fontSize: 16,
    },
    topBarContent: {
        backgroundColor: 'rgba(255,255,255,0)',
        height: 48,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 0,
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
        shadowRadius: 3.84,
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
    bottomBar: {
        backgroundColor: '#F2EDF6',
        height: 116,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
    },
    bottomBarButton: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: 4,
        marginRight: 4,
        paddingTop: 4,
        paddingBottom: 16,
    },
    bottomBarIcon: {
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 20,
        paddingRight: 20,
        // width: 24,
        width: "100%",
        // height: 24,
        height: 30,
        backgroundColor: 'rgba(243,237,247,0)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
        marginBottom: 4,
    },
    enabled: {
        borderRadius: 16,
        backgroundColor: '#E6DEF6',
    },
    fontRegular: {
        fontFamily: 'Roboto-Regular',
        letterSpacing: 0.6,
        fontSize: 16,
    },
    fontLarge: {
        fontFamily: 'Roboto-Regular',
        letterSpacing: 0.6,
        fontSize: 22,
    },
    fontSmallBold: {
        fontFamily: 'Roboto-Bold',
        letterSpacing: 0.6,
        fontSize: 12,
    },
    fontRegularMedium: {
        fontFamily: 'Roboto-Medium',
        letterSpacing: 0.6,
        fontSize: 16,
    },
    fontSmall: {
        fontFamily: 'Roboto-Regular',
        letterSpacing: 0.6,
        fontSize: 12,
    },
    textCenter: {
        textAlign: 'center',
    },
});