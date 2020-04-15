import React from 'react'
import {
    View,
    TouchableOpacity,
} from 'react-native'
import { boxStyle } from '../../commons'

<<<<<<< HEAD
import Icon from '../../Icon'

export default PlayButton = ({togglePause}) => (
=======
export default InitialPlay = ({togglePause}) => (
>>>>>>> 8c08668d698ffd59761c0d6274070b7ca64c436e
    <View style={boxStyle}>
        <TouchableOpacity 
            onPress={togglePause}
        >
            <Icon name='play' width={25} height={25} />
        </TouchableOpacity>
    </View>
)