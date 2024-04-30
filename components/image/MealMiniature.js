import {StyleSheet, Text, TouchableOpacity, View, Image, Dimensions} from "react-native";

export default function MealMiniature({mealName, mealThumb, onPress}) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.rounded}>
                <Image style={styles.image} source={{uri: `${mealThumb}`}}/>
                <View style={styles.textContainer}>
                    <Text style={styles.text} numberOfLines={3}>{mealName}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FEF7FF',
        boxSizing: 'content-box',
        display: "flex",
        flexDirection: 'column',
        alignItems: "flex-start",
        maxWidth: 160,
        minHeight: 160,
        marginTop: 12,
        marginBottom: 12,
        marginRight: 12,
        borderRadius: 10,
    },

    rounded: {
        borderRadius: 12,
        overflow: "hidden",
    },

    image: {
        resizeMode: 'stretch',
        height: 160,
        width: 160,
    },
    textContainer: {
        width: 160,
        height: 80,
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },

    text: {
        textAlign: 'left',
        fontFamily: 'Roboto-Regular',
        fontSize: 17,
    },
});