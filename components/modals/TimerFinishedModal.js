import { Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import React from "react";

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
                            <Text style={styles.modalTitle}>Timer Finished</Text>
                            <Text style={styles.modalMessage}>
                                The timer "{label}" has ended. Would you like to stop the timer or add more time?
                            </Text>
                            <View style={styles.modalButtonContainer}>
                                <TouchableOpacity onPress={onStopTimer} style={styles.modalButton}>
                                    <Text style={styles.modalStopText}>Stop Timer</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={onAddOneMinute} style={styles.modalButton}>
                                    <Text style={styles.modalAddTimeText}>Add 1:00</Text>
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dimmed background
    },
    modalContainer: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
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
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    modalMessage: {
        fontSize: 16,
        marginBottom: 24,
        textAlign: 'center',
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    modalButton: {
        backgroundColor: '#e5e5e5', // Your color for buttons
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        elevation: 2,
        marginHorizontal: 10,
    },
    modalStopText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#d9534f', // Color for stop button text
    },
    modalAddTimeText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#5cb85c', // Color for add time button text
    },
};
