import {TouchableOpacity, View, StyleSheet, Text, TextInput} from "react-native";
import Svg, {G, Path} from "react-native-svg";

export default function IngredientsScreen () {

    return (
        <View style={styles.screen}>
            <View style={styles.topBar}>
                <View style={styles.topBarContent}>
                    <TouchableOpacity style={styles.searchIcon}>
                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <G id="Icons/menu_24px">
                                <Path id="icon" fillRule="evenodd" clipRule="evenodd" d="M3 8V6H21V8H3ZM3 13H21V11H3V13ZM3 18H21V16H3V18Z" fill="#1D1B20"/>
                            </G>
                        </Svg>
                    </TouchableOpacity>
                    <Text style={styles.fontLarge}>Ingredients</Text>
                    <TouchableOpacity style={styles.searchIcon}>
                        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <G id="Icon">
                                <Path id="Vector"
                                      d="M18 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V4C20 2.9 19.1 2 18 2ZM9 4H11V9L10 8.25L9 9V4ZM18 20H6V4H7V13L10 10.75L13 13V4H18V20Z"
                                      fill="#1D1B20"/>
                            </G>
                        </Svg>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.scrollableScreen}>
                <TouchableOpacity style={styles.searchBar}>
                    <View style={styles.searchIcon}>
                        <View style={styles.center}>
                            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <G id="Icon">
                                    <Path id="icon" fillRule="evenodd" clipRule="evenodd"
                                          d="M14.76 13.27L20.49 19L19 20.49L13.27 14.76C12.2 15.53 10.91 16 9.5 16C5.91 16 3 13.09 3 9.5C3 5.91 5.91 3 9.5 3C13.09 3 16 5.91 16 9.5C16 10.91 15.53 12.2 14.76 13.27ZM9.5 5C7.01 5 5 7.01 5 9.5C5 11.99 7.01 14 9.5 14C11.99 14 14 11.99 14 9.5C14 7.01 11.99 5 9.5 5Z"
                                          fill="black"/>
                                </G>
                            </Svg>
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
                            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <G id="icon">
                                    <Path id="Vector"
                                          d="M8 5H10V8H8V5ZM8 12H10V17H8V12ZM18 2.01L6 2C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V4C20 2.89 19.1 2.01 18 2.01ZM18 20H6V10.98H18V20ZM18 9H6V4H18V9Z"
                                          fill="#49454F"/>
                                </G>
                            </Svg>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.center, styles.cardButton]}>
                            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <G id="icon">
                                    <Path id="Vector"
                                          d="M22 9.48999H17.21L12.83 2.92999C12.64 2.64999 12.32 2.50999 12 2.50999C11.68 2.50999 11.36 2.64999 11.17 2.93999L6.79 9.48999H2C1.45 9.48999 1 9.93999 1 10.49C1 10.58 1.01 10.67 1.04 10.76L3.58 20.03C3.81 20.87 4.58 21.49 5.5 21.49H18.5C19.42 21.49 20.19 20.87 20.43 20.03L22.97 10.76L23 10.49C23 9.93999 22.55 9.48999 22 9.48999ZM12 5.28999L14.8 9.48999H9.2L12 5.28999ZM18.5 19.49L5.51 19.5L3.31 11.49H20.7L18.5 19.49ZM12 13.49C10.9 13.49 10 14.39 10 15.49C10 16.59 10.9 17.49 12 17.49C13.1 17.49 14 16.59 14 15.49C14 14.39 13.1 13.49 12 13.49Z"
                                          fill="#49454F"/>
                                </G>
                            </Svg>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.bottomBar}>
                <TouchableOpacity style={styles.center} onPress={() => {/* Handle onPress */
                }}>
                    <View style={styles.bottomBarButton}>
                        <View style={[styles.bottomBarIcon, styles.enabled]}>
                            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <G id="Icon">
                                    <G id="Vector">
                                        <Path
                                            d="M12 3C8.5 3 5 9.33 5 14C5 17.87 8.13 21 12 21C15.87 21 19 17.87 19 14C19 9.33 15.5 3 12 3ZM12 19C9.24 19 7 16.76 7 14C7 9.91 10.07 5 12 5C13.93 5 17 9.91 17 14C17 16.76 14.76 19 12 19Z"
                                            fill="black"/>
                                        <Path
                                            d="M13 16C12.42 16 10 15.92 10 13C10 12.45 9.55 12 9 12C8.45 12 8 12.45 8 13C8 16 9.99 18 13 18C13.55 18 14 17.55 14 17C14 16.45 13.55 16 13 16Z"
                                            fill="black"/>
                                    </G>
                                </G>
                            </Svg>
                        </View>
                        <Text style={[styles.textCenter, styles.fontSmallBold]}>Ingredients</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.center} onPress={() => {/* Handle onPress */
                }}>
                    <View style={styles.bottomBarButton}>
                        <View style={styles.bottomBarIcon}>
                            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <G id="local_dining">
                                    <Path id="Vector"
                                          d="M7.79951 13.1283L10.6295 10.2983L3.60951 3.28832C2.04951 4.84832 2.04951 7.37832 3.60951 8.94832L7.79951 13.1283ZM14.5795 11.3183C16.1095 12.0283 18.2595 11.5283 19.8495 9.93832C21.7595 8.02832 22.1295 5.28832 20.6595 3.81832C19.1995 2.35832 16.4595 2.71832 14.5395 4.62832C12.9495 6.21832 12.4495 8.36832 13.1595 9.89832L3.39951 19.6583L4.80951 21.0683L11.6995 14.1983L18.5795 21.0783L19.9895 19.6683L13.1095 12.7883L14.5795 11.3183Z"
                                          fill="black"/>
                                </G>
                            </Svg>
                        </View>
                        <Text style={styles.fontSmall}>Recipes</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.center} onPress={() => {/* Handle onPress */
                }}>
                    <View style={styles.bottomBarButton}>
                        <View style={styles.bottomBarIcon}>
                            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <Path
                                    d="M8 5H10V8H8V5ZM8 12H10V17H8V12ZM18 2.01L6 2C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V4C20 2.89 19.1 2.01 18 2.01ZM18 20H6V10.98H18V20ZM18 9H6V4H18V9Z"
                                    fill="black"/>
                            </Svg>
                        </View>
                        <Text style={styles.fontSmall}>Fridge</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.center} onPress={() => {/* Handle onPress */
                }}>
                    <View style={styles.bottomBarButton}>
                        <View style={styles.bottomBarIcon}>
                            <Svg width="24" height="24" viewBox="0 0 24 24"
                                 fill="none">
                                <Path
                                    d="M22 9.49001H17.21L12.83 2.93001C12.64 2.65001 12.32 2.51001 12 2.51001C11.68 2.51001 11.36 2.65001 11.17 2.94001L6.79 9.49001H2C1.45 9.49001 1 9.94001 1 10.49C1 10.58 1.01 10.67 1.04 10.76L3.58 20.03C3.81 20.87 4.58 21.49 5.5 21.49H18.5C19.42 21.49 20.19 20.87 20.43 20.03L22.97 10.76L23 10.49C23 9.94001 22.55 9.49001 22 9.49001ZM12 5.29001L14.8 9.49001H9.2L12 5.29001ZM18.5 19.49L5.51 19.5L3.31 11.49H20.7L18.5 19.49ZM12 13.49C10.9 13.49 10 14.39 10 15.49C10 16.59 10.9 17.49 12 17.49C13.1 17.49 14 16.59 14 15.49C14 14.39 13.1 13.49 12 13.49Z"
                                    fill="black"/>
                            </Svg>
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
        alignItems: 'flex-start',
        justifyContent: "center",
        textAlign: "left",
        fontSize: 16,
        width: '100%',
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
        width: "100%",
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