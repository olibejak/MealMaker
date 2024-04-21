import {StyleSheet, Text, View, TouchableOpacity} from "react-native";
import {BasketCardIcon, FridgeCardIcon, PencilIcon} from "../assets/icons";

export default function IngredientCard({
                                           text,
                                           amount,
                                           fridgeButtonOn,
                                           cartButtonOn,
                                           editButtonOn,
                                           onPress,
                                           onPressFridge,
                                           onPressCart,
                                           onPressEdit // Add this to capture the edit press
                                       }) {
    return (
        <View style={styles.shadowContainer}>
            <TouchableOpacity onPress={onPress} style={styles.card}>
                <RenderText text={text} amount={amount}/>
                <RenderButtons
                    fridgeButtonOn={fridgeButtonOn}
                    cartButtonOn={cartButtonOn}
                    editButtonOn={editButtonOn}
                    onPressFridge={onPressFridge}
                    onPressCart={onPressCart}
                    onPressEdit={onPressEdit} // Pass this function down to RenderButtons
                />
            </TouchableOpacity>
        </View>
    );
}

function RenderButtons({
                           fridgeButtonOn,
                           cartButtonOn,
                           editButtonOn,
                           onPressFridge,
                           onPressCart,
                           onPressEdit // Make sure to add this parameter
                       }) {
    return (
        <View style={styles.cardIcons}>
            {fridgeButtonOn && (
                <TouchableOpacity onPress={onPressFridge} style={styles.cardButton}>
                    <FridgeCardIcon />
                </TouchableOpacity>
            )}
            {cartButtonOn && (
                <TouchableOpacity onPress={onPressCart} style={styles.cardButton}>
                    <BasketCardIcon />
                </TouchableOpacity>
            )}
            {editButtonOn && (
                <TouchableOpacity onPress={onPressEdit} style={styles.cardButton}>
                    <PencilIcon />
                </TouchableOpacity>
            )}
        </View>
    );
}

function RenderText({text, amount}) {
    return (
        <View style={styles.textContainer}>
            <Text style={[styles.cardTextContent, styles.fontRegularMedium]}>{text}</Text>
            {amount && <Text style={[styles.cardTextContent, styles.fontRegular]}>{amount}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    shadowContainer: {
        paddingHorizontal: 4,
        paddingVertical: 4,
        backgroundColor: 'transparent'
    },
    card: {
        width: '100%',
        borderRadius: 12,
        backgroundColor: '#F6F2F9',
        height: 95,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflow: 'visible',

        //  Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        // Android elevation
        elevation: 3,

    },
    textContainer: {
        maxWidth: "80%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',

    },
    cardTextContent: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 16,
        paddingBottom: 4,
        paddingTop: 4,
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
    fontRegular: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        letterSpacing: 0.5,
    },
});


