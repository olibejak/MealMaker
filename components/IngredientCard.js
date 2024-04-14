import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {BasketCardIcon, FilterIcon, FridgeCardIcon} from "../assets/icons";


export default function IngredientCard ({ text, fridgeButtonOn, cartButtonOn, onPress }) {

    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Text style={[styles.cardTextContent, styles.fontRegularMedium]}>{text}</Text>
                <RenderButtons fridgeButtonOn={fridgeButtonOn} cartButtonOn={cartButtonOn}/>
        </TouchableOpacity>
    )};

//TODO. fix this, it's not working
function RenderButtons (fridgeButtonOn, cartButtonOn) {
    return (
        <View style={styles.cardIcons}>
            {fridgeButtonOn ? (
                <TouchableOpacity style={[styles.center, styles.cardButton]}>
                    <FridgeCardIcon />
                </TouchableOpacity>
            ) : null}
            {cartButtonOn ? (
                <TouchableOpacity style={[styles.center, styles.cardButton]}>
                    <BasketCardIcon />
                </TouchableOpacity>
            ) : null}
        </View>
)}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        borderRadius: 12,
        backgroundColor: '#F6F2F9',
        height: 90,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 8,

        //  Shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 2, // Rightward shadow
            height: 2, // Downward shadow
        },
        shadowOpacity: 0.50,
        shadowRadius: 2,
        // Android shadow (uniform, no direction control)
        // TODO: fix shadow being cut off on Android
        elevation: 4,
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
    fontRegularMedium: {
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
        letterSpacing: 0.5,
    },
});


