import {TouchableOpacity, View, StyleSheet, Image, Text} from "react-native";
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
                    <View style={styles.searchIcon}>
                        <Image source={HamburgerIcon} style={styles.iconSize} />
                    </View>
                    <Text style={styles.topBarFont}>Ingredients</Text>
                    <View style={styles.searchIcon}>
                        <Image source={BookIcon} style={styles.iconSize} />
                    </View>
                </View>
            </View>
            <View style={styles.scrollableScreen}>
                <View style={styles.searchBar}>
                    <View style={styles.searchIcon}>
                        <TouchableOpacity style={styles.center}>
                            <Image source={SearchIcon} style={styles.iconSize} />
                        </TouchableOpacity>
                    </View>
                    {/*<View style={styles.searchContent}>*/}
                    <Text style={styles.searchContent}>Search ingredients</Text>
                    {/*</View>*/}
                </View>
                <View style={styles.card}>
                    <Text style={styles.cardTextContent}>White Wine Vinegar</Text>
                    <View style={styles.cardIcons}>
                        <TouchableOpacity style={styles.center}>
                            <Image source={KitchenIcon} style={styles.iconSize} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.center}>
                            <Image source={ShoppingIcon} style={styles.iconSize} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.center} onPress={() => {/* Handle onPress */}}>
                    <View style={styles.bottomBarButton}>
                        {/*<EggIcon width={24} height={24} />*/}
                        <Text style={[styles.labelText, styles.enabledText]}>Ingredients</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.center} onPress={() => {/* Handle onPress */}}>
                    <View style={styles.bottomBarButton}>
                        {/*<DiningIcon width={24} height={24} />*/}
                        <Text style={styles.labelText}>Recipes</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.center} onPress={() => {/* Handle onPress */}}>
                    <View style={styles.bottomBarButton}>
                        {/*<KitchenIcon width={24} height={24} />*/}
                        <Text style={styles.labelText}>Fridge</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.center} onPress={() => {/* Handle onPress */}}>
                    <View style={styles.bottomBarButton}>
                        {/*<ShoppingIcon width={24} height={24} />*/}
                        <Text style={styles.labelText}>Shopping list</Text>
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
        backgroundColor: '#FEF7FF',
        display: 'flex',
        alignItems: 'flex-end',
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
        height: 56,
        backgroundColor: '#ECE6F0',
        borderRadius: 20,
        display: 'flex',
        alignItems: 'center',
        width: '100%',
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
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    topBarContent: {
        backgroundColor: 'rgba(255,255,255,0)',
        height: 48,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 0,
    },
    iconSize: {
        width: 24,
        height: 24,
        padding: 8,
    },
    topBarFont: {
        fontSize: 22,
        lineHeight: 20,
        fontFamily: 'Roboto',
    },
    card: {
        width: '100%',
        borderRadius: 12,
        backgroundColor: '#E7E7E7',
        height: 80,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardTextContent: {
        width: '100%',
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
        gap: 6, // Note: gap is not directly supported in React Native, you might need to adjust margins manually
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
        backgroundColor: '#E9E4ED',
        height: 116,
        // React Native doesn't use 'overflow', 'display', and 'flexWrap' in the same way as CSS for the web, so these are omitted.
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        // 'gap' is not directly supported. You might need to manage spacing manually with margin or padding in child components.
    },
    bottomBarButton: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: 4, // Note: gap is not directly supported in React Native
        marginRight: 4, // Note: gap is not directly supported in React Native
        paddingTop: 12,
        paddingBottom: 16,
    },
    bottomBarIcon: {
        paddingTop: 4,
        paddingBottom: 4,
        paddingRight: 20,
        paddingLeft: 20,
        width: 24,
        height: 24,
        backgroundColor: 'rgba(243,237,247,0)',
    },
    labelText: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 16,
        textAlign: 'center',
        fontFamily: 'Roboto',
    },
    enabled: {
        borderRadius: 16,
        backgroundColor: '#F3EDF7',
    },
    enabledText: {
        fontWeight: '600',
    },
    roboto: {
        fontFamily: 'Roboto',
    },
});