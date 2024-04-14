import {StyleSheet, Text, TouchableOpacity, View, Image, Dimensions} from "react-native";

export default function MealMiniature({mealName, mealThumb, onPress}) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.rounded}>
                <Image style={styles.image} source={{uri: `${mealThumb}`}}/>
                <Text style={styles.text}>{mealName}</Text>
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
        maxWidth: 150,
        minHeight: 150,
        marginTop: 12,
        marginBottom: 100,
        marginHorizontal: 12,
        padding: 0,
        borderRadius: 10,
    },

    rounded: {
        borderRadius: 12,
        overflow: "hidden",
    },

    image: {
        resizeMode: 'stretch',
        height: 150,
        width: 150,
        marginBottom: 8,
    },
    text: {
        textAlign: 'center',
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
    },
});