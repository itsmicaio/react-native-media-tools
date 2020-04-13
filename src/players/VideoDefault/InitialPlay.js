import React from 'react'
import {
    View,
    TouchableOpacity,
    Text
} from 'react-native'
import { boxStyle } from '../../commons'

export default InitialPlay = ({togglePause}) => (
    <View style={boxStyle}>
        <TouchableOpacity 
            onPress={togglePause}
        >
            <Text>{'play'}</Text>
        </TouchableOpacity>
    </View>
)