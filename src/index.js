import React from 'react'
import Player from './Player'
import PlayerVideoDefault from './players/VideoDefault'
import PlayerAudioDefault from './players/AudioDefault'

players = {
    video: PlayerVideoDefault,
    audio: PlayerAudioDefault,
}

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

    return (
        <Player
            notHideControls={notHideControls}
            {...components}
            {...props}
        />
    )
}

export default MediaPlayer