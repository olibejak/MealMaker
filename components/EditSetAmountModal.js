import React, { useState, useEffect } from 'react';
import {Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar} from 'react-native';

function EditSetAmountModal({ visible, ingredient, onClose, mode }) {
    const [amount, setAmount] = useState(ingredient?.amount || '');
    const [title, setTitle] = useState(ingredient?.name || 'Default Title');
    const [isEditingTitle, setIsEditingTitle] = useState(false);

    useEffect(() => {
        if (ingredient) {
            setAmount(ingredient.amount);
            setTitle(ingredient.name);
        }
    }, [ingredient]);

    const handleTitleEdit = () => {
        setIsEditingTitle(true);
    };

    const handleTitleChange = (text) => {
        setTitle(text);
    };

    const saveTitleEdit = () => {
        setIsEditingTitle(false);
    };

    const handleConfirm = () => {
        console.log(`Title: ${title}, Amount: ${amount}`); // Prints title and amount to the console
        onClose(); // You can still use the onClose prop to close the modal after confirming
    };

    if (!visible) return null;

    return (
        <Modal
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0.5)"/>
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    {isEditingTitle ? (
                        <View style={styles.modalTitleInput}>
                            <TextInput
                                style={styles.modalText}
                                onChangeText={handleTitleChange}
                                value={title}
                                autoFocus={true}
                                onEndEditing={saveTitleEdit}
                                placeholder="Enter new title"
                            />
                        </View>
                    ) : (
                        <View style={styles.modalTitle}>
                            <TouchableOpacity onPress={handleTitleEdit}>
                                <Text style={styles.modalText}>{title}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
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
                        <TouchableOpacity onPress={onClose}>
                            <Text style={styles.modalDeleteText}>Delete</Text>
                        </TouchableOpacity>
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
            </View>
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
        alignSelf: 'stretch', // Stretches to the full width of the container
        height: 2, // Thin line
        backgroundColor: '#d3d3d3', // Light grey color
        marginBottom: 25, // Space after the line
    },
    inputContainer: {
        width: '100%',
        position: 'relative', // Contains the title and the input
        marginBottom: 16, // Space above and below the container
        marginTop: 6,
    },
    modalTitle: {
        alignSelf: "flex-start", // Aligns title to the left within its container
        padding: 10, // Adds padding to the left of the title
        paddingLeft: 0, // Removes padding on the left
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
        borderRadius: 10, // Makes it look more like a bubble
        overflow: 'hidden', // Ensures nothing leaks outside the bubble
        fontFamily: 'Roboto-Medium',
        zIndex: 1, // Ensures the title is rendered above the input
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
        paddingTop: 20, // Ensure padding accommodates the title bubble
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
});

export default EditSetAmountModal;
