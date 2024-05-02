import React, {useState, useEffect} from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView, TouchableWithoutFeedback
} from 'react-native';

function EditSetAmountModal({ visible, ingredient, onClose, deleteIngredient, showDelete, onConfirm }) {
    const [amount, setAmount] = useState(ingredient?.amount || '');
    const [title, setTitle] = useState(ingredient?.name || ''); // Default to empty if no name
    const [editableTitle, setTitleEditable] = useState(false);

    useEffect(() => {
        if (ingredient) {
            setTitle(ingredient?.name || '')
            setAmount(ingredient?.amount || '')
            if (!!ingredient.strIngredient && !ingredient.name) {
                setTitle(ingredient.strIngredient)
                setTitleEditable(false)
            } else
                setTitleEditable(true)
        }
        }, [ingredient])

    const handleDelete = () => {
        deleteIngredient();
        onClose();
    }

    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm(amount);
        } else {
            ingredient.name = title;
            ingredient.amount = amount;
        }
        setAmount('');
        onClose(); // You can still use the onClose prop to close the modal after confirming
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
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalBackground}>
                    <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                        <KeyboardAvoidingView style={styles.modalContainer}>
                            <TextInput
                                style={styles.modalText}
                                onChangeText={setTitle}
                                value={title}
                                autoFocus={editableTitle}
                                placeholder="Enter new title"
                                placeholderTextColor={'#625b70'}
                                editable={editableTitle}
                            />
                            <View style={styles.titleSeparator} />
                            <View style={styles.inputContainer}>
                                <Text style={styles.inputTitle}>Amount</Text>
                                <TextInput
                                    style={styles.modalInput}
                                    value={amount}
                                    onChangeText={setAmount}
                                    placeholder="Enter amount"
                                    placeholderTextColor={'#625b70'}
                                    autoFocus={!editableTitle}
                                />
                            </View>
                            <View style={styles.modalButtonContainer}>
                                {showDelete ?
                                    <TouchableOpacity onPress={handleDelete}>
                                        <Text style={styles.modalDeleteText}>Delete</Text>
                                    </TouchableOpacity>
                                    :
                                    <View style={styles.modalDeleteText}></View>}
                                <View style={styles.twoButtonContainer}>
                                    <TouchableOpacity onPress={onClose}>
                                        <Text style={styles.modalCancelText}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={handleConfirm}>
                                        <Text style={styles.modalConfirmText}>Confirm</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </KeyboardAvoidingView>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
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
        elevation: 5,
        bottom: 36,
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
    modalText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 36,
        color: '#1d1b20',
        textAlign: 'left',
        alignSelf: 'flex-start',
        paddingTop: 6,
        paddingBottom: 12,
        paddingLeft: 16,
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
        marginBottom: 3,
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
        marginTop: 8,
        marginBottom: 0,
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
    }
});

export default EditSetAmountModal;
