import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Svg, {G, Path} from "react-native-svg";
import {BasketIcon, DiningIcon, EggIcon, FridgeIcon} from "../assets/icons";

export default function TopNavigationBar () {

    return (
        <View style={styles.bottomBar}>
            <TouchableOpacity style={styles.center} onPress={() => {/* Handle onPress */
            }}>
                <View style={styles.bottomBarButton}>
                    <View style={[styles.bottomBarIcon, styles.enabled]}>
                        <EggIcon/>
                    </View>
                    <Text style={[styles.textCenter, styles.fontSmallBold]}>Ingredients</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.center} onPress={() => {/* Handle onPress */
            }}>
                <View style={styles.bottomBarButton}>
                    <View style={styles.bottomBarIcon}>
                        <DiningIcon/>
                    </View>
                    <Text style={styles.fontSmall}>Recipes</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.center} onPress={() => {/* Handle onPress */
            }}>
                <View style={styles.bottomBarButton}>
                    <View style={styles.bottomBarIcon}>
                        <FridgeIcon/>
                    </View>
                    <Text style={styles.fontSmall}>Fridge</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.center} onPress={() => {/* Handle onPress */
            }}>
                <View style={styles.bottomBarButton}>
                    <View style={styles.bottomBarIcon}>
                        <BasketIcon/>
                    </View>
                    <Text style={styles.fontSmall}>Shopping list</Text>
                </View>
            </TouchableOpacity>
        </View>
    )};

const styles = StyleSheet.create({
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
    center: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0)',
        padding: 0,
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

