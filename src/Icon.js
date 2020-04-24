import React from 'react'
import { Image } from 'react-native'

const icons = {
    play: require('../assets/play.png'),
    pause: require('../assets/pause.png'),
    reload: require('../assets/reload.png'),
    volume: require('../assets/volume.png'),
    volume_mute: require('../assets/volume-mute.png'),
    enter_fullscreen: require('../assets/enter-fullscreen.png'),
    exit_fullscreen: require('../assets/exit-fullscreen.png'),
}

const Icon = ({ name, width = 10, height = 10 }) => <Image
    source={icons[name]}
    style={{ width, height }}
/>

export default Icon