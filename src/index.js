import React from 'react'
import Player from './Player'
import PlayerVideoDefault from './players/VideoDefault'

const MediaPlayer = ({
    controls, 
    paused, 
    muted, 
    errorScreenComponent,
    loadingComponent,
    initialPlayComponent,
    controlBarComponent,
    ...props
}) => {

	const unsupportedProps = ['controls', 'paused', 'muted']
	controls && console.warn(
        'react-native-media-tools: Your passed one or more ' + 
        'props that are not supported.\n\nUnsupported props:\n', 
        unsupportedProps
    )
    
    function getComponent(type, propComponent){
        if (propComponent) return propComponent
        return PlayerVideoDefault[type]
    }

    const components = {
        ErrorScreenComponent: getComponent('errorScreenComponent', errorScreenComponent),
        LoadingComponent: getComponent('loadingComponent', loadingComponent),
        InitialPlayComponent: getComponent('initialPlayComponent', initialPlayComponent),
        ControlBarComponent: getComponent('controlBarComponent', controlBarComponent)
    }

	return (
        <Player 
            {...components}
			{...props}
		/>
	)
}

export default MediaPlayer