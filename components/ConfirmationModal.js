import {Modal, StatusBar, Text, TouchableOpacity, View} from "react-native";
import React from "react";

export default function ConfirmationModal ({ onConfirm, onCancel, visible }) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onCancel}
            statusBarTranslucent={true}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Move items into fridge?</Text>
                    <Text style={styles.modalMessage}>
                        This will move all selected items from the shopping list into the fridge.
                    </Text>
                    <View style={styles.modalButtonContainer}>
                        <TouchableOpacity onPress={onCancel}>
                            <Text style={styles.modalCancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onConfirm}>
                            <Text style={styles.modalConfirmText}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
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
        marginBottom: 20,
        fontFamily: 'Roboto-Regular',
    },
    modalButtonContainer: {
        alignSelf: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    modalButton: {
        backgroundColor: '#e5dfe8', // Your color
        borderRadius: 28,
        paddingVertical: 10,
        paddingHorizontal: 20,
        elevation: 2,
    },
    modalCancelText: {
        fontSize: 16,
        fontFamily: 'Roboto-Bold',
        color: '#625b70',
        padding: 10,
    },
    modalConfirmText: {
        fontSize: 16,
        fontFamily: 'Roboto-Bold',
        color: '#6750a3',
        padding: 10,
    },
}