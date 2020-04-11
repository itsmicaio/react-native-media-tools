import React from 'react'
import {
    View,
    ActivityIndicator
} from 'react-native'
import { colors } from '../../commons'

export default Loading = ({style}) => (
    <View style={style}>
        <ActivityIndicator color={colors.blue} size={'large'}/>
    </View>
)