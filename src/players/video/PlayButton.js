import React from 'react'
import {
    View,
    TouchableOpacity,
    Text
} from 'react-native'

export default PlayButton = ({style, togglePause}) => (
    <View style={style}>
        <TouchableOpacity 
            onPress={togglePause}
        >
            <Text>{'play'}</Text>
        </TouchableOpacity>
    </View>
)