import React from 'react'
import {
		TouchableOpacity,
		View,
} from 'react-native'

export default ButtonFrame = ({style, onPress}) => (
    <TouchableOpacity 
        style={style}
        onPress={onPress}
    >
        <View/>
    </TouchableOpacity>
)