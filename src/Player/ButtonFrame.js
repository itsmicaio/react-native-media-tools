import React from 'react'
import {
	TouchableOpacity,
	View,
} from 'react-native'
import {boxStyle} from '../commons'

export default ButtonFrame = ({onPress}) => (
    <TouchableOpacity 
        style={boxStyle}
        onPress={onPress}
    >
        <View/>
    </TouchableOpacity>
)