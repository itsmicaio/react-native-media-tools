import React from 'react'
import VideoPlayer from './video'

const MediaPlayer = ({controls, ...props}) => {
	controls && console.warn('Prop controls not supported for this lib')

	return (
		<VideoPlayer 
			{...props}
		/>
	)
}

export default MediaPlayer