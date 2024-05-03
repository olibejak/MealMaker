import { Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import React from "react";
import { PlusIcon } from "../../assets/icons"; // Adjust the path as necessary

export default function TimerFinishedModal({ label, onStopTimer, onAddOneMinute, visible }) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onStopTimer} // Assuming stopping the timer can also close the modal
            statusBarTranslucent={true}
        >
            <TouchableWithoutFeedback onPress={onStopTimer}>
                <View style={styles.modalBackground}>
                    <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalTitle}>{label} finished</Text>
                            <Text style={styles.modalMessage}>
                                Add more time or stop?
                            </Text>
                            <View style={styles.modalButtonContainer}>
                                <TouchableOpacity onPress={onAddOneMinute} style={styles.modalButtonAdd}>
                                    <PlusIcon style={styles.iconStyle}/>
                                    <Text style={styles.modalAddTimeText}>1:00</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={onStopTimer} style={styles.modalButtonStop}>
                                    <Text style={styles.modalStopText}>Stop</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = {
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 28,
        padding: 28,
        width: '85%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalTitle: {
        alignSelf: 'flex-start',
        fontSize: 26,
        fontFamily: 'Roboto-Regular',
        marginBottom: 16,
    },
    modalMessage: {
        alignSelf: 'flex-start',
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
        marginBottom: 24,
    },
    modalButtonContainer: {
        alignSelf: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    modalButtonAdd: {
        flexDirection: 'row', // Ensures icon and text are in a row
        alignItems: 'center', // Align items vertically
    },
    modalButtonStop: {
        marginHorizontal: 10,
    },
    modalStopText: {
        fontSize: 16,
        fontFamily: 'Roboto-Bold',
        color: '#6750a3',
        padding: 10,
    },
    modalAddTimeText: {
        fontSize: 16,
        fontFamily: 'Roboto-Bold',
        color: '#625b70',
        padding: 0,
    },
    iconStyle: {
        color: '#625b70',
        width: '18',  // Smaller width for a smaller icon
        height: '18', // Smaller height for a smaller icon
    },
};