import {useState} from "react";
import {TouchableOpacity, View, Text, StyleSheet} from "react-native";
import {ArrowDropDown, CheckmarkIconWhite} from "../assets/icons";

export default function StepCard({stepNum, step}) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const arrowIcon = isCollapsed ? <ArrowDropDown/> : <ArrowDropDown/>;
    const [checked, setChecked] = useState(false);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => checked ? setChecked(false) : setChecked(true)}>
                <View style={checked ? styles.checkBoxChecked : styles.checkBoxUnchecked}>
                    {checked ? <CheckmarkIconWhite /> : null}
                </View>
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>Step {stepNum}</Text>
                {!isCollapsed && <Text style={styles.content}>{step}</Text>}
            </View>
            <TouchableOpacity onPress={() => setIsCollapsed(!isCollapsed)} style={styles.arrow}>
                {arrowIcon}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FEF7FF",
        flexDirection: 'row',
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        paddingVertical: 20,
        borderBottomColor: "#C9C4CF",
        borderBottomWidth: 1,
        paddingRight: 24,
        paddingLeft: 24,
        gap: 16,
    },
    checkBoxUnchecked: {
        backgroundColor: "#FFFFFF",
        borderColor: "#000000",
        width: 22,
        height: 22,
        borderWidth: 2,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 16,
        marginVertical: 16,
        // top: 20,
    },
    checkBoxChecked: {
        backgroundColor: "#6750A4",
        borderColor: "#6750A4",
        width: 22,
        height: 22,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 16,
        marginVertical: 16,
        // top: 20,
    },
    fontRegularMedium: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        letterSpacing: 0.5,
        fontWeight: "400",
    },
    fontRegular: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        letterSpacing: 0.5,
    },
    title: {
        fontFamily: 'Roboto-Regular',
        fontSize: 18,
        marginBottom: 4,
    },
    content: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: '#48454E',
        lineHeight: 24,
    },
});