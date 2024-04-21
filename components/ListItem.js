import React, { useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { ArrowDropDown, CheckmarkIconWhite, ArrowDropUp } from "../assets/icons";

export default function ListItem({ title, content, dividers, IconComponent, onPress, onEditPress, isChecked }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const arrowIcon = isCollapsed ? <ArrowDropUp /> : <ArrowDropDown />;
    const [checked, setChecked] = useState(isChecked);

    const toggleCollapse = () => setIsCollapsed(!isCollapsed);

    return (
        <View style={dividers === 'True' ? [styles.container, styles.divider] : styles.container}>
            <TouchableOpacity onPress={() => {
                setChecked(!checked);
                if (onPress) onPress();
            }}>
                <View style={checked ? styles.checkBoxChecked : styles.checkBoxUnchecked}>
                    {checked ? <CheckmarkIconWhite /> : null}
                </View>
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>{title}</Text>
                {!isCollapsed && <Text style={styles.content}>{content}</Text>}
            </View>
            <RenderTrailingElement
                IconComponent={IconComponent}
                isCollapsed={isCollapsed}
                toggleCollapse={toggleCollapse}
                arrowIcon={arrowIcon}
                onEditPress={onEditPress} />
        </View>
    );
}

function RenderTrailingElement({ IconComponent, isCollapsed, arrowIcon, toggleCollapse, onEditPress }) {
    return IconComponent === undefined ? (
        <TouchableOpacity onPress={toggleCollapse}>
            {arrowIcon}
        </TouchableOpacity>
    ) : (
        <TouchableOpacity style={styles.icon} onPress={onEditPress}>
            <IconComponent />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FEF7FF",
        flexDirection: 'row',
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        paddingVertical: 20,
        paddingRight: 24,
        paddingLeft: 24,
    },
    divider: {
        borderBottomColor: "#C9C4CF",
        borderBottomWidth: 1,
        width: '100%',
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
    },
    icon: {
        alignSelf: 'center',
        padding: 16,
    },
});
