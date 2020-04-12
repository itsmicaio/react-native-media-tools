import React from 'react'
import {
    View,
    ActivityIndicator
} from 'react-native'
import { colors, boxStyle } from '../../commons'

export default Loading = () => (
    <View style={boxStyle}>
        <ActivityIndicator color={colors.blue} size={'large'}/>
    </View>
)