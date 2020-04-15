import React from 'react'
import {
    View,
    TouchableOpacity,
} from 'react-native'
import { boxStyle } from '../../commons'

import Icon from '../../Icon'

export default PlayButton = ({togglePause}) => (
    <View style={boxStyle}>
        <TouchableOpacity 
            onPress={togglePause}
        >
            <Icon name='play' width={25} height={25} />
        </TouchableOpacity>
    </View>
)