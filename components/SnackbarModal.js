import { Modal, View, Text, StyleSheet, StatusBar } from 'react-native';
import {useEffect, useState} from "react";

function SnackbarModal({ textToDisplay, visible, onClose }) {
    const [show, setShow] = useState(visible);

    useEffect(() => {
        let timer;
        if (visible) {
            setShow(true);
            timer = setTimeout(() => {
                setShow(false);
                if (onClose) onClose(); // Callback to parent to inform that the modal should be closed
            }, 1000);
        } else {
            setShow(false);
        }

        return () => {
            clearTimeout(timer); // Ensure that we clear the timeout on component unmount or visibility change
        };
    }, [visible, onClose]);

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={show}
            statusBarTranslucent={true}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalText}>{textToDisplay}</Text>
                </View>
            </View>
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
