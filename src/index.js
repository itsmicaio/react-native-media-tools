import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    Modal,
    View,
    StatusBar,
    Dimensions,
} from 'react-native'
import Player from './Player'
import PlayerVideoDefault from './players/VideoDefault'
import PlayerAudioDefault from './players/AudioDefault'

players = {
    video: PlayerVideoDefault,
    audio: PlayerAudioDefault,
}

const styles = StyleSheet.create({
    fullscreen: {
        width: "100%",
        height: '96%',
        backgroundColor: 'black',
    },
    modal: {
        backgroundColor: "black",
        flex: 1,
        justifyContent: 'center',
    },
})

const MediaPlayer = ({
    controls,
    paused,
    muted,
    errorScreenComponent,
    loadingComponent,
    initialPlayComponent,
    controlBarComponent,
    type = "video",
    ...props
}) => {

    const [fullscreen, setFullscreen] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [isPaused, setIsPaused] = useState(true)
    const [orientation, setOrientation] = useState('portrait')

    useEffect(() => {
        Dimensions.addEventListener('change', () => {
            const orientation = getOrientation()
            setOrientation(orientation)
        })
    }, [])

    const getOrientation = () => {
        const dim = Dimensions.get('screen')
        return dim.height >= dim.width ? 'portrait' : 'landscape'
    }

    const unsupportedProps = ['controls', 'paused', 'muted']
    controls && console.warn(
        'react-native-media-tools: Your passed one or more ' +
        'props that are not supported.\n\nUnsupported props:\n',
        unsupportedProps
    )

    const player = players[type]

    function getComponent(componentType, propComponent) {
        if (propComponent) return propComponent
        return player[componentType]
    }

    const components = {
        ErrorScreenComponent: getComponent('errorScreenComponent', errorScreenComponent),
        LoadingComponent: getComponent('loadingComponent', loadingComponent),
        InitialPlayComponent: getComponent('initialPlayComponent', initialPlayComponent),
        ControlBarComponent: getComponent('controlBarComponent', controlBarComponent)
    }

    const notHideControls = type === 'audio'

    const toggleFullScreen = (time) => {
        setFullscreen(!fullscreen)
        setCurrentTime(time)
    }

    const renderPlayer = !fullscreen && <Player
        notHideControls={notHideControls}
        toggleFullScreen={toggleFullScreen}
        fullscreen={fullscreen}
        currentTime={currentTime}
        setCurrentTime={setCurrentTime}
        isPaused={isPaused}
        setIsPaused={setIsPaused}
        orientation={orientation}
        {...components}
        {...props}
    />


    const renderPlayerFullscreen = fullscreen && <Modal
        visible={fullscreen}
        transparent={false}
        onRequestClose={() => toggleFullScreen(currentTime)}
    >
        <View style={styles.modal} >
            <StatusBar hidden={fullscreen} />
            <Player
                notHideControls={notHideControls}
                toggleFullScreen={toggleFullScreen}
                fullscreen={fullscreen}
                currentTime={currentTime}
                style={styles.fullscreen}
                setCurrentTime={setCurrentTime}
                isPaused={isPaused}
                setIsPaused={setIsPaused}
                orientation={orientation}
                {...components}
                {...props}
            />
        </View>
    </Modal>

    return (
        <>
            {renderPlayer}
            {renderPlayerFullscreen}
        </>
    )
}

export default MediaPlayer