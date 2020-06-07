import React from 'react'
import {
    View,
    StyleSheet,
} from 'react-native'

import { colors } from '../../commons'

const styles = StyleSheet.create({
    progress: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 3,
        overflow: 'hidden',
        paddingHorizontal: 10
    },
    innerProgressCompleted: {
        height: 20,
        backgroundColor: '#cccccc'
    },
    innerProgressRemaining: {
        height: 20,
        backgroundColor: '#2C2C2C',
    },
});

export default ProgressBar = ({
    currentTime,
    duration,
    setCurrentTime,
}) => {

    function getCurrentTimePercentage(currentTime, duration) {
        if (currentTime > 0) {
            return parseFloat(currentTime) / parseFloat(duration)
        } else {
            return 0
        }
    }

    const flexCompleted = getCurrentTimePercentage(currentTime, duration) * 100;
    const flexRemaining = (1 - getCurrentTimePercentage(currentTime, duration)) * 100;

    return(
        <View style={styles.progress}>
            <View style={[styles.innerProgressCompleted, { flex: flexCompleted }]} />
            <View style={[styles.innerProgressRemaining, { flex: flexRemaining }]} />
        </View>
    )
}