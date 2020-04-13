import React from 'react'

function formatTime(currentTime) {
    const formatter = function(num, size) { return ('000' + num).slice(size * -1); },
    time = parseFloat(currentTime).toFixed(3),
    hours = Math.floor(time / 60 / 60),
    minutes = Math.floor(time / 60) % 60,
    seconds = Math.floor(time - minutes * 60)

    const hoursFormatted = formatter(hours, 2) != '00' ? formatter(hours, 2) + ':' : ''
    return `${hoursFormatted}${formatter(minutes, 2)}:${formatter(seconds, 2)}`
}

const ControlBar = ({Component, currentTime, ...props}) => {
    const currentTimeFormatted = formatTime(currentTime)

    return (
        <Component 
            currentTimeFormatted={currentTimeFormatted}
            currentTime={currentTime}
            {...props}
        />
    )
}

export default ControlBar