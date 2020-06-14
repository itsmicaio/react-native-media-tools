import React, { useState, useEffect } from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Platform,
    Animated
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
        paddingRight: 12,
    },
    barButtons: {
        height: 35,
        paddingHorizontal: 12,
        justifyContent: 'center'
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
    timeText:{
        color: '#FFF'
    }
});

export default ControlBar = ({
    paused,
    togglePause,
    muted,
    toggleMute,
    reload,
    orientation,
    currentTimeFormatted,
    toggleFullScreen,
    fullscreen,
    progressBarComponent,
    showControls
}) => {

    useEffect(() => {
        Animated.timing(
            fadeValue,
            {
                toValue: showControls ? 1 : 0,
                duration: showControls ? 400 : 700,
                useNativeDriver: true
            }
        ).start()
    }, [showControls])

    const [fadeValue, setFadeValue] = useState(new Animated.Value(1))


    return(
        <Animated.View
            style={[styles.bar, { 
                paddingHorizontal: Platform.OS === "ios" && orientation === 'landscape' ? 15 : 0,
                opacity: fadeValue
            }]}
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
            {progressBarComponent}
            <View
                style={styles.barSides}
            >
                <Text style={styles.timeText}>{currentTimeFormatted}</Text>
                <TouchableOpacity
                    onPress={reload}
                    style={styles.barButtons}
                >
                    <Icon name='reload' />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={toggleFullScreen}
                    style={styles.barButtons}
                >
                    {fullscreen ? <Icon name='exit_fullscreen' /> : <Icon name='enter_fullscreen' />}
                </TouchableOpacity>
            </View>
        </Animated.View>
    )
}