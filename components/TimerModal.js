import React, {useEffect, useState} from "react";
import {FlatList, Modal, Text, TextInput, TouchableOpacity, View, StyleSheet} from "react-native";

function NumberSelector({ onChange, value, max }) {
    const totalEntries = (max + 1) * 3;
    const middleOfData = Math.floor(totalEntries / 3);
    const itemHeight = 80;
    const [isInputMode, setIsInputMode] = useState(false);

    // Adjust here to ensure single '0' is shown initially
    const [inputValue, setInputValue] = useState(value === '00' ? '0' : value);

    const data = Array.from({ length: totalEntries }, (_, i) => ({
        key: `${i % (max + 1)}`
    }));
    const flatListRef = React.useRef(null);

    useEffect(() => {
        if (flatListRef.current && !isInputMode) {
            flatListRef.current.scrollToIndex({
                index: middleOfData + parseInt(value),
                animated: false
            });
        }
    }, [value, isInputMode]);

    const handleScrollEnd = event => {
        const offset = event.nativeEvent.contentOffset.y;
        const index = Math.round(offset / itemHeight);
        const centeredKey = data[index % (max + 1)].key;

        onChange(centeredKey);
        setInputValue(centeredKey);

        if (index < max + 1 || index > (max + 1) * 2) {
            flatListRef.current.scrollToIndex({
                index: middleOfData + (index % (max + 1)),
                animated: false
            });
        }
    };

    const handleInputConfirm = () => {
        onChange(inputValue.padStart(2, '0'));
        setIsInputMode(false);
    };

    if (isInputMode) {
        return (
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={setInputValue}
                    value={inputValue}
                    keyboardType="numeric"
                    returnKeyType="done"
                    onSubmitEditing={handleInputConfirm}
                    autoFocus={true}
                />
            </View>
        );
    }

    return (
        <TouchableOpacity onPress={() => setIsInputMode(true)} style={styles.numberSelectorContainer}>
            <FlatList
                ref={flatListRef}
                data={data}
                renderItem={({ item }) => (
                    <Text style={styles.numberItem}>
                        {item.key}
                    </Text>
                )}
                keyExtractor={(item, index) => `${item.key}-${index}`}
                showsVerticalScrollIndicator={false}
                getItemLayout={(data, index) => (
                    { length: itemHeight, offset: itemHeight * index, index }
                )}
                snapToInterval={itemHeight}
                decelerationRate="fast"
                onScrollEndDrag={handleScrollEnd}
                onMomentumScrollEnd={handleScrollEnd}
            />
        </TouchableOpacity>
    );
}




export default function TimerModal({ modalVisible, setModalVisible, handleAddTimer }) {
    const [timerLabel, setTimerLabel] = useState('');
    const [hours, setHours] = useState('00');
    const [minutes, setMinutes] = useState('00');

    const onHoursChange = (newHour) => {
        setHours(newHour === "" ? "0" : newHour.padStart(2, '0'));
    };

    const onMinutesChange = (newMinute) => {
        setMinutes(newMinute === "" ? "0" : newMinute.padStart(2, '0'));
    };

    const handleOk = () => {
        handleAddTimer(timerLabel, `${hours}:${minutes}`);
        setModalVisible(false);
        handleCancel();
    };

    const handleCancel = () => {
        setTimerLabel('');
        setModalVisible(false);
        setHours('00');
        setMinutes('00');
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={handleCancel}
            statusBarTranslucent={true}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TextInput
                        placeholder="Enter label"
                        value={timerLabel}
                        onChangeText={setTimerLabel}
                        style={styles.inputText}
                        autoFocus={true}
                    />
                    <View style={styles.timeSelector}>
                        <View style={styles.numberSelectorContainer}>
                            <NumberSelector onChange={onHoursChange} value={hours} max={24} />
                        </View>
                        <Text style={styles.separator}>:</Text>
                        <View style={styles.numberSelectorContainer}>
                            <NumberSelector onChange={onMinutesChange} value={minutes} max={59} />
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={handleCancel} style={styles.textButton}>
                            <Text style={styles.cancelButtonLabel}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleOk} style={[styles.textButton, styles.rightButton]}>
                            <Text style={styles.confirmButtonLabel}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
    height: 80,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '100%',
            height: '100%',
            fontSize: 36,
            textAlign: 'center',
    },
    modalView: {
        width: '70%',
        margin: 20,
        backgroundColor: '#eae5ef',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    inputText: {
        height: 50, // Maintaining the current height
        width: 210, // Total width based on the width of two selectors and the separator
        textAlignVertical: 'center', // Center text vertically
        borderRadius: 12,
        marginBottom: 16,
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 12,
        backgroundColor: '#e5dfe8',
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
        color: 'black'
    },
    timeSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
    },
    numberSelectorContainer: {
        height: 80, // Increased height for the selected number
        width: 100, // Increased width of the rectangle
        overflow: 'hidden', // Ensures that only the area within the container is visible
        alignItems: 'center', // Centers the items horizontally
        justifyContent: 'center', // Centers the items vertically
        backgroundColor: '#e5dfe8', // Background color of the rectangle
        borderRadius: 10, // Optional: Adds rounded corners
    },
    numberItem: {
        height: 80, // Increased height of each number item
        textAlign: 'center',
        lineHeight: 80, // Aligns text vertically within the item
        fontSize: 36, // Larger font size for better visibility
        fontFamily: 'Roboto-Regular',
    },
    separator: {
        fontFamily: 'Roboto-Regular',
        textAlign: 'center',
        fontSize: 36, // Larger font size for the separator
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end', // Align buttons to the right
        alignItems: 'center',
        alignContent: 'center',
        marginTop: 20,
        width: '100%',
    },
    textButtonLabel: {
        color: '#625b70',
        fontSize: 16,
        fontFamily: 'Roboto-Medium',
    },
    textButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    confirmButtonLabel: {
        color: '#6750a3', // Purple color for the "Confirm" button
        fontSize: 16,
        fontFamily: 'Roboto-Bold', // Bold font for emphasis
    },
    cancelButtonLabel: {
        color: '#625b70', // Grey color for the "Cancel" button
        fontSize: 16,
        fontFamily: 'Roboto-Bold', // Bold font for emphasis
    },
    rightButton: {
        marginLeft: 10, // Adds space between the "Cancel" and "Ok" buttons
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
})