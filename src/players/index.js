import React from 'react'
import VideoPlayer from './video'

const MediaPlayer = ({controls, paused, muted, ...props}) => {
	const unsupportedProps = ['controls', 'paused', 'muted']
	controls && console.warn(
        'react-native-media-tools: Your passed one or more ' + 
        'props that are not supported.\n\nUnsupported props:\n', 
        unsupportedProps
	)

	return (
		<VideoPlayer 
			{...props}
		/>
	)
}

export default MediaPlayer