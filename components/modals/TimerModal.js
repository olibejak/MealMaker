import React, { useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View, FlatList, StyleSheet } from "react-native";

function NumberSelector({ onChange, value, max, unit }) {
    const itemHeight = 80; // Height of each item
    const data = Array.from({ length: max + 1 }, (_, i) => ({
        key: `${i}`
    }));
    const flatListRef = React.useRef(null);

    React.useEffect(() => {
        if (flatListRef.current) {
            flatListRef.current.scrollToIndex({
                index: parseInt(value),
                animated: false
            });
        }
    }, [value]);

    const handleScrollEnd = (e) => {
        const offset = e.nativeEvent.contentOffset.y;
        const index = Math.round(offset / itemHeight);
        const selectedItem = data[index].key;
        onChange(parseInt(selectedItem, 10));
    };

    return (
        <View style={styles.numberSelectorContainer}>
            <FlatList
                ref={flatListRef}
                data={data}
                renderItem={({ item }) => (
                    <Text style={styles.numberItem}>{item.key}</Text>
                )}
                keyExtractor={(item, index) => `${item.key}-${index}`}
                showsVerticalScrollIndicator={false}
                getItemLayout={(data, index) => (
                    { length: itemHeight, offset: itemHeight * index, index }
                )}
                snapToInterval={itemHeight}
                onMomentumScrollEnd={handleScrollEnd}
            />
            <Text style={styles.unitStyle}>{unit}</Text>
        </View>
    );
}

export default function TimerModal({ modalVisible, setModalVisible, handleAddTimer }) {
    const [timerLabel, setTimerLabel] = useState('');
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);

    const handleOk = () => {
        handleAddTimer(timerLabel, `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`);
        setModalVisible(false);
        setTimerLabel('');
        setHours(0);
        setMinutes(0);
    };

    const handleCancel = () => {
        setModalVisible(false);
        setTimerLabel('');
        setHours(0);
        setMinutes(0);
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
                        placeholderTextColor={'#625b70'}
                    />
                    <View style={styles.timeSelector}>
                        <NumberSelector onChange={setHours} value={hours.toString()} max={99} unit="m" />
                        <Text style={styles.separator}>:</Text>
                        <NumberSelector onChange={setMinutes} value={minutes.toString()} max={59} unit="s" />
                    </View>
                    <View style={styles.modalButtonContainer}>
                        <TouchableOpacity onPress={handleCancel} style={styles.textButton}>
                            <Text style={styles.modalCancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleOk} style={[styles.textButton, styles.rightButton]}>
                            <Text style={styles.modalConfirmText}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalView: {
        display: 'flex',
        width: '75%',
        margin: 20,
        backgroundColor: '#eae5ef',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        justifyContent: 'center',
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
        height: 50,
        width: '100%',
        textAlignVertical: 'center',
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
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
    },
    numberSelectorContainer: {
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 15,
        height: 80,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e5dfe8',
        flex: 1,
        borderRadius: 10,
    },
    numberItem: {
        height: 80,
        textAlign: 'center',
        lineHeight: 80,
        fontSize: 36,
        fontFamily: 'Roboto-Regular',
        width: 55,
    },
    unitStyle: {
        alignSelf: 'flex-end',
        marginBottom: 22,
        width: 20,
        fontSize: 20,
        color: '#625b70',
        fontFamily: 'Roboto-Regular',
    },
    separator: {
        fontFamily: 'Roboto-Regular',
        textAlign: 'center',
        fontSize: 36,
        padding: 3,
    },
    modalButtonContainer: {
        marginTop: 20,
        display: 'flex',
        alignSelf: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    modalCancelText: {
        fontSize: 16,
        fontFamily: 'Roboto-Bold',
        color: '#625b70',
        padding: 10,
        paddingBottom: 0,
    },
    modalConfirmText: {
        fontSize: 16,
        fontFamily: 'Roboto-Bold',
        color: '#6750a3',
        padding: 10,
        paddingBottom: 0,
        paddingRight: 2,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});