import React from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Platform,
} from 'react-native'

import { colors } from '../../commons'

import Icon from 'react-native-media-tools/src/Icon'

const styles = StyleSheet.create({
    bar: {
        position: 'absolute',
        bottom: 0,
        height: 35,
        width: '100%',
        backgroundColor: 'rgba(54, 54, 54, 0.6)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    barButtons: {
        marginLeft: 12
    },
    barSides: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    liveText: {
        color: colors.blue,
        fontWeight: 'bold',
        fontSize: 13,
        marginHorizontal: 10
    },
});

const ControlBar = ({paused, togglePause, muted, toggleMute, reload, orientation, currentTimeFormatted}) => (
    <View 
        style={[styles.bar, {paddingHorizontal: Platform.OS === "ios" && orientation === 'landscape' ? 15 : 0}]}
    >
        <View
            style={styles.barSides}
        >
            <TouchableOpacity
                style={styles.barButtons}
                onPress={togglePause}
            >
                    {paused ? <Icon name='play' /> : <Icon name='pause' />}
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.barButtons}
                onPress={toggleMute}
            >
                {muted ? <Icon name='volume_mute' /> : <Icon name='volume' />}
            </TouchableOpacity>
        </View>
        <View
            style={styles.barSides}
        >
            <Text>{currentTimeFormatted}</Text>
            <TouchableOpacity
                onPress={reload}
                style={styles.barButtons}
            >
                <Icon name='reload' />
            </TouchableOpacity>
        </View>
    </View>
)

export default ControlBar