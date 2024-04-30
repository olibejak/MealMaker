import React, { useEffect, useState } from 'react';
import {Modal, View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';

function SnackbarModal({ textToDisplay, visible, onDismiss }) {
    const [modalVisible, setModalVisible] = useState(visible);

    useEffect(() => {
        setModalVisible(visible);
    }, [visible]);

    useEffect(() => {
        if (modalVisible) {
            const timeout = setTimeout(() => {
                setModalVisible(false);
                if (onDismiss) {
                    onDismiss();
                }
            }, 1000);
            return () => clearTimeout(timeout);
        }
    }, [modalVisible, onDismiss]);

    const handleBackgroundPress = () => {
        setModalVisible(false);
        if (onDismiss) {
            onDismiss();
        }
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            statusBarTranslucent={true}
            onRequestClose={() => {
                if (onDismiss) {
                    onDismiss();
                }
            }}
        >
            <TouchableWithoutFeedback onPress={handleBackgroundPress}>
                <View style={styles.modalBackground}>
                    <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalText}>{textToDisplay}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 16,
    },
    modalContainer: {
        bottom: 70,
        display: 'flex',
        backgroundColor: '#CAC4D0',
        borderRadius: 8,
        padding: 20,
        width: '100%',
        alignItems: 'flex-start',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        color: '#1d1b20',
        textAlign: 'left',
    },
});

export default SnackbarModal;
