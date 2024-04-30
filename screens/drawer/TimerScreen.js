import React, { useState } from 'react';
import {
    View,
    ScrollView,
    StyleSheet,

} from 'react-native';
import TimerCard from "../../components/cards/TimerCard";
import BottomRightCornerButton from "../../components/buttons/BottomRightCornerButton";
import BottomNavigationBar from "../../components/navigation/BottomNavigationBar";
import TopNavigationBar from "../../components/navigation/TopNavigationBar";
import { BackArrowIcon, PlusIcon } from "../../assets/icons";
import { useNavigation } from "@react-navigation/native";
import TimerModal from '../../components/modals/TimerModal'
import log from "../../utils/Logger";

export default function TimerScreen() {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const timers = ['20:00', '20:00', '20:00', '20:00', '20:00', '20:00', '20:00'];

    const handleAddTimer = (label, time) => {
        log.info(`Adding new timer: ${label} for ${time}`);
        setModalVisible(false);
        // You can implement adding this new timer to your timers array here
    };

    return (
        <View style={styles.screen}>
            <TopNavigationBar title="Timer" LeftIcon={BackArrowIcon} />
            <ScrollView style={styles.scrollableScreen} contentContainerStyle={styles.scrolling}>
                {timers.map((time, index) => (
                    <TimerCard
                        label={`Timer ${index + 1}`}
                        key={index}
                        time={time}
                        onStartStop={() => log.info('Start/Stop timer')}
                        onReset={() => log.info('Reset timer')}
                    />
                ))}
            </ScrollView>
            <TimerModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                handleAddTimer={handleAddTimer}
            />
            <BottomNavigationBar />
            <BottomRightCornerButton IconComponent={PlusIcon} onPress={() => setModalVisible(true)} />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        display: 'flex',
        position: 'absolute',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        top: 0,
        bottom: 0,
    },
    scrollableScreen: {
        backgroundColor: '#FFF',
        paddingVertical: 0,
        paddingHorizontal: 16,
    },
    scrolling: {
        alignItems: 'stretch',
        paddingTop: 16,
        paddingBottom: 60,
    },
    contentContainer: {
        paddingBottom: 80,
        padding: 16,
    },
});
