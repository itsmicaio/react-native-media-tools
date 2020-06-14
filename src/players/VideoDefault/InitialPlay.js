import React from 'react'
import {
    View,
    TouchableOpacity,
} from 'react-native'
import { boxStyle } from '../../commons'

import Icon from '../../Icon'

export default PlayButton = ({togglePause, toggleShowControls}) => {

    const handlePlay = () => {
        togglePause()
        toggleShowControls()
    }

    return (
        <View style={boxStyle}>
            <TouchableOpacity 
                onPress={handlePlay}
            >
                <Icon name='play' width={25} height={25} />
            </TouchableOpacity>
        </View>
    )
} 