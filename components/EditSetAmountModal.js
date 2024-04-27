import React, { useState, useEffect } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Platform,
    KeyboardAvoidingView
} from 'react-native';

function EditSetAmountModal({ visible, ingredient, onClose, showDelete }) {
    const [amount, setAmount] = useState(ingredient?.amount || '');
    const [title, setTitle] = useState(ingredient?.name || ''); // Default to empty if no name

    useEffect(() => {
        if (ingredient) {
            setAmount(ingredient.amount);
            setTitle(ingredient.name);
        }
    }, [ingredient]);

    const handleTitleChange = (text) => {
        setTitle(text);
    };

    const handleConfirm = () => {
        console.log(`Title: ${title}, Amount: ${amount}`); // Prints title and amount to the console
        onClose(); // Close the modal after confirming
    };

    if (!visible) return null;

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
            statusBarTranslucent={true}
        >
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalTitleInput}>
                        <TextInput
                            style={styles.modalText}
                            onChangeText={handleTitleChange}
                            value={title}
                            autoFocus={true}
                            placeholder="Enter new title"
                        />
                    </View>
                    <View style={styles.titleSeparator} />
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputTitle}>Amount</Text>
                        <TextInput
                            style={styles.modalInput}
                            value={amount}
                            onChangeText={setAmount}
                            placeholder="Enter amount"
                        />
                    </View>
                    <View style={styles.modalButtonContainer}>
                        {showDelete ? (
                            <TouchableOpacity onPress={onClose}>
                                <Text style={styles.modalDeleteText}>Delete</Text>
                            </TouchableOpacity>
                        ) : <View style={styles.placeholderButton}></View>}
                        <View style={styles.twoButtonContainer}>
                            <TouchableOpacity onPress={onClose}>
                                <Text style={styles.modalCancelText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleConfirm}>
                                <Text style={styles.modalConfirmText}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        display: 'flex',
        backgroundColor: 'white',
        borderRadius: 28,
        padding: 28,
        width: '85%',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    titleSeparator: {
        alignSelf: 'stretch',
        height: 2, // Thin line
        backgroundColor: '#d3d3d3',
        marginBottom: 25,
    },
    inputContainer: {
        width: '100%',
        position: 'relative',
        marginBottom: 16,
        marginTop: 6,
    },
    modalTitle: {
        alignSelf: "flex-start",
        padding: 10,
    },
    modalTitleInput: {
        alignSelf: "flex-start",
        width: '100%', // Make sure it occupies the whole line
        padding: 10, // Padding for easier text entry
        paddingLeft: 0, // Remove padding on the left
        marginBottom: 4, // Space to separator
    },
    modalText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 36,
        color: '#1d1b20',
        textAlign: 'left',
    },
    inputTitle: {
        position: 'absolute',
        top: -14,
        left: 10,
        backgroundColor: 'white',
        paddingHorizontal: 8,
        paddingVertical: 3,
        fontSize: 14,
        color: '#6750a3',
        borderRadius: 10,
        overflow: 'hidden',
        fontFamily: 'Roboto-Medium',
        zIndex: 1,
    },
    modalInput: {
        borderWidth: 2,
        borderColor: "#6750a3",
        borderRadius: 5,
        width: '100%',
        marginBottom: 15,
        fontSize: 18,
        padding: 12,
        textAlign: 'center',
        textAlignVertical: 'center',
        paddingTop: 20,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    twoButtonContainer: {
        flexDirection: 'row',
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
        paddingLeft: 5,
    },
    modalDeleteText: {
        fontSize: 16,
        fontFamily: 'Roboto-Bold',
        color: '#B3261E',
        padding: 10,
        paddingRight: 5,
    },
    placeholderButton: {
        opacity: 0, // Invisible
        paddingHorizontal: 10, // Same padding as the Delete button
        paddingVertical: 10, // Same padding as the Delete button
    },
});

export default EditSetAmountModal;
