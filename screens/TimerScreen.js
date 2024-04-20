import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, Modal, TextInput, Button, Text, FlatList, TouchableOpacity } from 'react-native';
import TimerCard from "../components/TimerCard";
import BottomRightCornerButton from "../components/BottomRightCornerButton";
import BottomNavigationBar from "../components/BottomNavigationBar";
import TopNavigationBar from "../components/TopNavigationBar";
import { BackArrowIcon, PlusIcon } from "../assets/icons";
import { useNavigation } from "@react-navigation/native";

function NumberSelector({ onChange, value, max }) {
    const visibleEntries = 5; // Visible entries before and after the actual visible entry
    const totalEntries = (max + 1) * 3; // Tripling the list to allow more scroll room
    const middleOfData = Math.floor(totalEntries / 3); // Initial middle of the actual data
    const itemHeight = 80; // Updated height of each item to match new styles

    const data = Array.from({ length: totalEntries }, (_, i) => ({
        key: `${i % (max + 1)}`
    }));
    const flatListRef = React.useRef(null);

    // Initial scroll to the middle of the data
    React.useEffect(() => {
        if (flatListRef.current) {
            flatListRef.current.scrollToIndex({
                index: middleOfData + parseInt(value),
                animated: false
            });
        }
    }, [value]);

    const handleScrollEnd = (event) => {
        const offset = event.nativeEvent.contentOffset.y;
        const index = Math.round(offset / itemHeight);
        const centeredKey = data[index % (max + 1)].key;  // Calculate the key at the centered index

        onChange(centeredKey);  // Update the state in the parent component

        // Re-center the view if near the start or end
        if (index < max + 1 || index > (max + 1) * 2) {
            flatListRef.current.scrollToIndex({
                index: middleOfData + (index % (max + 1)),
                animated: false
            });
        }
    };

    return (
        <View style={styles.numberSelectorContainer}>
            <FlatList
                ref={flatListRef}
                data={data}
                renderItem={({ item }) => (
                    <Text style={styles.numberItem} onPress={() => {
                        onChange(item.key);
                    }}>
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
                onScrollEndDrag={handleScrollEnd}  // Called when the user stops dragging
                onMomentumScrollEnd={handleScrollEnd}  // Called when the momentum from dragging has stopped
            />
        </View>
    );
}


function AddTimerModal({ modalVisible, setModalVisible, handleAddTimer }) {
    const [timerLabel, setTimerLabel] = useState('');
    const [hours, setHours] = useState('00');
    const [minutes, setMinutes] = useState('00');


    const onHoursChange = (newHour) => {
        setHours(newHour.padStart(2, '0')); // Ensures two-digit formatting
    };

    const onMinutesChange = (newMinute) => {
        setMinutes(newMinute.padStart(2, '0')); // Ensures two-digit formatting
    };

    const handleOk = () => {
        console.log(`Timer set for: ${hours}:${minutes}`); // Logs the current hours and minutes
        handleAddTimer(timerLabel, `${hours}:${minutes}`);
        setModalVisible(false);
        handleCancel()
    };

    const handleCancel = () => {
        setTimerLabel('');  // Reset the timer label to empty
        setModalVisible(false);
        setHours('00');
        setMinutes('00');
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                handleCancel();  // Use handleCancel here to ensure input is cleared on hardware back press/close gesture on modal
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TextInput
                        placeholder="Enter label"
                        value={timerLabel}
                        onChangeText={setTimerLabel}
                        style={styles.inputText}
                    />
                    <View style={styles.timeSelector}>
                        <View style={styles.numberSelectorContainer}>
                            <NumberSelector onChange={onHoursChange} value={hours} max={24} />
                        </View>
                        <Text style={styles.separator}>:</Text>
                        <View style={styles.numberSelectorContainer}>
                            <NumberSelector onChange={onMinutesChange} value={minutes} max={60} />
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={handleCancel} style={styles.textButton}>
                            <Text style={styles.textButtonLabel}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleOk} style={[styles.textButton, styles.rightButton]}>
                            <Text style={styles.textButtonLabel}>Ok</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

export default function TimerScreen() {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const timers = ['20:00', '20:00', '20:00', '20:00', '20:00', '20:00', '20:00'];

    const handleAddTimer = (label, time) => {
        console.log(`Adding new timer: ${label} for ${time}`);
        setModalVisible(false);
        // You can implement adding this new timer to your timers array here
    };

    return (
        <SafeAreaView style={styles.screen}>
            <TopNavigationBar title="Timer" LeftIcon={BackArrowIcon} />
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.contentContainer}
            >
                {timers.map((time, index) => (
                    <TimerCard
                        label={`Timer ${index + 1}`}
                        key={index}
                        time={time}
                        onStartStop={() => console.log('Start/Stop timer')}
                        onReset={() => console.log('Reset timer')}
                    />
                ))}
            </ScrollView>
            <AddTimerModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                handleAddTimer={handleAddTimer}
            />
            <BottomNavigationBar />
            <BottomRightCornerButton IconComponent={PlusIcon} onPress={() => setModalVisible(true)} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    scrollView: {
        flex: 1,
    },
    contentContainer: {
        paddingBottom: 80,
        padding: 16,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
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
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        letterSpacing: 0.5,
        color: 'black'
    },
    timeSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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
    },
    separator: {
        width: 10, // Width of the separator area
        textAlign: 'center',
        fontSize: 48, // Larger font size for the separator
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end', // Align buttons to the right
        alignItems: 'center',
        marginTop: 20,
        width: '100%',
    },
    textButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    rightButton: {
        marginLeft: 10, // Adds space between the "Cancel" and "Ok" buttons
    },
    textButtonLabel: {
        color: '#6750a3', // Purple color
        fontSize: 16,
        fontWeight: 'bold',
    },
});
