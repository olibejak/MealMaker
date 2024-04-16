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
                <Text style={styles.fontRegularMedium}>Step {stepNum}</Text>
                {!isCollapsed && <Text style={styles.fontRegular}>{step}</Text>}
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
        alignItems: 'center',
        alignSelf: 'stretch',
        paddingVertical: 20,
        borderBottomColor: "#000000",
        borderBottomWidth: 1,
        paddingRight: 20,
        paddingLeft: 20,
        gap: 20,
    },
    checkBoxUnchecked: {
        backgroundColor: "#FFFFFF",
        borderColor: "#000000",
        width: 20,
        height: 20,
        borderWidth: 1,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    checkBoxChecked: {
        backgroundColor: "#6750A4",
        width: 20,
        height: 20,
        borderWidth: 1,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
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
    arrow: {
    }
});